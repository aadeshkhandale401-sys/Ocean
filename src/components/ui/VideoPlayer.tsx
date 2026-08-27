// ============================================
// Ocean MGPS — Universal Video Player Component
// Parses YouTube, Vimeo, Google Drive, Loom, Dailymotion, Dropbox, MP4, WebM & Base64 URLs
// ============================================

"use client";

import { useState, useEffect, useRef } from "react";
import { AlertCircle, ExternalLink, RefreshCw, Loader2 } from "lucide-react";
import { resolveMediaBlobUrl } from "@/lib/indexedDbMedia";

export interface VideoInfo {
  isEmbed: boolean;
  formattedUrl: string;
  videoType: "youtube" | "vimeo" | "gdrive" | "loom" | "dailymotion" | "direct" | "unknown";
}

export function formatEmbedVideoUrl(url: string): VideoInfo {
  if (!url) return { isEmbed: false, formattedUrl: "", videoType: "unknown" };

  let trimmed = url.trim();

  // If user pasted a full <iframe> embed tag, extract the src URL
  if (trimmed.startsWith("<iframe") || trimmed.includes("<iframe")) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      trimmed = srcMatch[1].trim();
    }
  }

  // 1. YouTube Matchers
  // Supports: watch?v=, youtu.be/, embed/, shorts/, live/, m.youtube.com, etc.
  const ytRegex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/|live\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = trimmed.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return {
      isEmbed: true,
      formattedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`,
      videoType: "youtube",
    };
  }

  // 2. Google Drive Matchers
  // Supports: /file/d/{id}/view, /open?id={id}, /uc?id={id}, docs.google.com/file/d/{id}
  if (trimmed.includes("drive.google.com") || trimmed.includes("docs.google.com")) {
    const driveFileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    const driveIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    const fileId = (driveFileMatch && driveFileMatch[1]) || (driveIdMatch && driveIdMatch[1]);
    if (fileId) {
      return {
        isEmbed: true,
        formattedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        videoType: "gdrive",
      };
    }
  }

  // 3. Vimeo Matchers
  // Supports: vimeo.com/{id}, player.vimeo.com/video/{id}, channels, groups
  const vimeoRegex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|video\/|)|player\.vimeo\.com\/video\/)(\d+)/i;
  const vimeoMatch = trimmed.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      isEmbed: true,
      formattedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?badge=0&autopause=0&player_id=0`,
      videoType: "vimeo",
    };
  }

  // 4. Loom Matchers
  // Supports: loom.com/share/{id}, loom.com/embed/{id}
  const loomMatch = trimmed.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9_-]+)/i);
  if (loomMatch && loomMatch[1]) {
    return {
      isEmbed: true,
      formattedUrl: `https://www.loom.com/embed/${loomMatch[1]}`,
      videoType: "loom",
    };
  }

  // 5. Dailymotion Matchers
  // Supports: dailymotion.com/video/{id}, dai.ly/{id}
  const dailyMatch = trimmed.match(/(?:dailymotion\.com\/video\/|dai\.ly\/)([a-zA-Z0-9]+)/i);
  if (dailyMatch && dailyMatch[1]) {
    return {
      isEmbed: true,
      formattedUrl: `https://www.dailymotion.com/embed/video/${dailyMatch[1]}`,
      videoType: "dailymotion",
    };
  }

  // 6. Dropbox direct stream converter
  if (trimmed.includes("dropbox.com")) {
    const dropboxDirect = trimmed.replace(/[?&]dl=0/, "").concat(trimmed.includes("?") ? "&raw=1" : "?raw=1");
    return {
      isEmbed: false,
      formattedUrl: dropboxDirect,
      videoType: "direct",
    };
  }

  return { isEmbed: false, formattedUrl: trimmed, videoType: "direct" };
}

function getMimeType(url: string): string | undefined {
  if (url.includes(".webm") || url.startsWith("data:video/webm")) return "video/webm";
  if (url.includes(".ogg") || url.includes(".ogv") || url.startsWith("data:video/ogg")) return "video/ogg";
  if (url.includes(".mp4") || url.includes(".m4v") || url.startsWith("data:video/mp4")) return "video/mp4";
  if (url.includes(".mov") || url.startsWith("data:video/quicktime")) return "video/quicktime";
  return undefined;
}

interface VideoPlayerProps {
  src: string;
  className?: string;
  controls?: boolean;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  poster?: string;
}

export default function VideoPlayer({
  src,
  className = "w-full h-full object-cover",
  controls = true,
  title = "Project Site Video",
  autoPlay = false,
  muted = false,
  poster,
}: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryKey, setRetryKey] = useState(0);
  const [activeMediaUrl, setActiveMediaUrl] = useState<string>("");
  const [isStaleRef, setIsStaleRef] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { isEmbed, formattedUrl, videoType } = formatEmbedVideoUrl(src);

  // Resolve Blob / IndexedDB / Data URLs for direct streaming
  useEffect(() => {
    let isMounted = true;
    setHasError(false);
    setIsLoading(true);
    setIsStaleRef(false);

    if (!isEmbed && formattedUrl) {
      const isLocalRef = formattedUrl.startsWith("idb://") || formattedUrl.startsWith("blob:") || formattedUrl.startsWith("data:");
      resolveMediaBlobUrl(formattedUrl)
        .then((resolved) => {
          if (!isMounted) return;
          if (!resolved && isLocalRef) {
            // Data is gone (stale blob URL or missing IDB entry)
            setIsStaleRef(true);
            setHasError(true);
            setIsLoading(false);
          } else {
            setActiveMediaUrl(resolved || formattedUrl);
          }
        })
        .catch(() => {
          if (isMounted) {
            setActiveMediaUrl(formattedUrl);
          }
        });
    } else {
      setActiveMediaUrl(formattedUrl);
    }

    return () => {
      isMounted = false;
    };
  }, [src, formattedUrl, isEmbed, retryKey]);

  const mimeType = getMimeType(activeMediaUrl || formattedUrl);

  if (!src || !formattedUrl) {
    return (
      <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-6 text-center rounded-2xl border border-slate-800">
        <AlertCircle size={28} className="mb-2 text-slate-500" />
        <p className="text-xs font-semibold text-slate-300">No video source provided</p>
        <p className="text-[11px] text-slate-500 mt-1">Please provide a valid YouTube, Vimeo, Google Drive, or MP4 URL.</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center rounded-2xl border border-slate-800 space-y-3">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <AlertCircle size={24} />
        </div>
        <div className="space-y-1 max-w-sm">
          <p className="text-xs font-bold text-slate-200">
            {isStaleRef ? "Video data has expired" : "Unable to play video directly in browser"}
          </p>
          <p className="text-[11px] text-slate-400">
            {isStaleRef
              ? "This video was stored in a previous browser session and the data is no longer available. Please re-upload the file."
              : "The video format may require opening directly or verifying browser permissions."}
          </p>
        </div>
        <div className="flex items-center gap-2 pt-1 flex-wrap justify-center">
          <button
            type="button"
            onClick={() => setRetryKey((k) => k + 1)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
          >
            <RefreshCw size={12} /> Retry Playback
          </button>
          {!src.startsWith("data:") && !src.startsWith("idb://") && (
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Open Video Link <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    );
  }

  // Embed Mode (YouTube, Vimeo, Google Drive, Loom, Dailymotion)
  if (isEmbed) {
    return (
      <div className="relative w-full h-full min-h-[200px] bg-slate-950 rounded-2xl overflow-hidden group">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 z-10 pointer-events-none">
            <Loader2 size={28} className="animate-spin text-blue-500 mb-2" />
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">
              Loading {videoType === "youtube" ? "YouTube" : videoType} video...
            </span>
          </div>
        )}
        <iframe
          key={`${formattedUrl}-${retryKey}`}
          src={formattedUrl}
          className={`w-full h-full border-0 rounded-2xl ${className}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      </div>
    );
  }

  // Direct Video Mode (MP4, WebM, OGG, Direct Links, Blobs, Data URLs)
  return (
    <div className="relative w-full h-full min-h-[200px] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center group">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 z-10 pointer-events-none">
          <Loader2 size={28} className="animate-spin text-blue-500 mb-2" />
          <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">Buffering video stream...</span>
        </div>
      )}
      {activeMediaUrl && (
        <video
          ref={videoRef}
          key={`${activeMediaUrl}-${retryKey}`}
          src={activeMediaUrl}
          controls={controls}
          playsInline
          autoPlay={autoPlay}
          muted={muted}
          poster={poster}
          preload="auto"
          onLoadedMetadata={() => setIsLoading(false)}
          onLoadedData={() => setIsLoading(false)}
          onCanPlay={() => setIsLoading(false)}
          onError={(e) => {
            console.warn("Video playback error event:", e);
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full rounded-2xl object-contain bg-black ${className}`}
        >
          {mimeType && <source src={activeMediaUrl} type={mimeType} />}
          Your browser does not support video playback.
        </video>
      )}
    </div>
  );
}
