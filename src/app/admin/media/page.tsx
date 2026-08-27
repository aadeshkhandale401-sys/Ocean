// ============================================
// Admin — Media Gallery (Photos & Videos)
// ============================================

"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, ImageIcon, Copy, Check, Video, Play, X } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { deleteDocument } from "@/lib/firestore";
import { deleteFile } from "@/lib/storage";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { MediaItem } from "@/types";
import VideoPlayer, { formatEmbedVideoUrl } from "@/components/ui/VideoPlayer";
import { resolveMediaBlobUrl } from "@/lib/indexedDbMedia";
import toast from "react-hot-toast";

function MediaItemCard({
  item,
  copied,
  onCopy,
  onDelete,
  onPreview,
}: {
  item: MediaItem;
  copied: string | null;
  onCopy: (url: string) => void;
  onDelete: (item: MediaItem) => void;
  onPreview: (item: MediaItem) => void;
}) {
  const [resolvedUrl, setResolvedUrl] = useState<string>(item.url);
  const isVideo = item.type === "video";
  const { isEmbed } = formatEmbedVideoUrl(item.url);

  useEffect(() => {
    let isMounted = true;
    resolveMediaBlobUrl(item.url).then((res) => {
      if (isMounted && res) setResolvedUrl(res);
    });
    return () => {
      isMounted = false;
    };
  }, [item.url]);

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all">
      <div className="aspect-square relative bg-slate-900 overflow-hidden">
        {!isVideo ? (
          <img src={resolvedUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div
            onClick={() => onPreview(item)}
            className="w-full h-full relative flex items-center justify-center bg-slate-950 cursor-pointer"
          >
            {!isEmbed ? (
              <video src={resolvedUrl} className="w-full h-full object-cover opacity-60" preload="metadata" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-950/50" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play size={18} className="fill-white translate-x-0.5" />
              </div>
            </div>
          </div>
        )}

        {/* Hover Action Buttons */}
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
          {isVideo && (
            <button
              type="button"
              onClick={() => onPreview(item)}
              className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md hover:bg-indigo-700 transition-all cursor-pointer"
              title="Play Video Preview"
            >
              <Play size={14} className="fill-white" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onCopy(item.url)}
            className="w-9 h-9 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-md hover:bg-slate-100 transition-all cursor-pointer"
            title="Copy File URL"
          >
            {copied === item.url ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
          </button>
          <button
            type="button"
            onClick={() => onDelete(item)}
            className="w-9 h-9 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-md hover:bg-rose-50 transition-all cursor-pointer"
            title="Delete File"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="p-2.5">
        <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
        <span className="text-[10px] text-slate-400 font-medium block mt-0.5 capitalize">
          {item.type} asset
        </span>
      </div>
    </div>
  );
}

export default function AdminMediaPage() {
  const { data: media, loading, refetch } = useFirestore<MediaItem>("media");
  const { upload, uploading, progress } = useMediaUpload();
  const [copied, setCopied] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [previewVideo, setPreviewVideo] = useState<MediaItem | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const filesArray = Array.from(e.target.files);
    for (const file of filesArray) {
      try {
        await upload(file, "general");
        toast.success(`Uploaded: ${file.name}`);
      } catch (err) {
        console.error("Upload failed for:", file.name, err);
        toast.error(`Upload failed: ${file.name}`);
      }
    }
    e.target.value = "";
    refetch();
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await deleteFile(item.url);
      await deleteDocument("media", item.id);
      toast.success("File deleted");
      refetch();
    } catch {
      toast.error("Failed to delete file");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    toast.success("Media URL copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredMedia = media.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Media Gallery
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Upload and manage site photos & video assets.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({media.length})
          </button>
          <button
            onClick={() => setFilterType("image")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === "image" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Photos ({media.filter((m) => m.type === "image").length})
          </button>
          <button
            onClick={() => setFilterType("video")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === "video" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Videos ({media.filter((m) => m.type === "video").length})
          </button>
        </div>
      </div>

      {/* Upload Drag & Drop Area */}
      <label className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed border-slate-200 bg-white transition-all hover:border-blue-500 hover:bg-blue-50/20 cursor-pointer shadow-2xs">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Upload size={24} />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-slate-800">
            {uploading ? `Uploading file... ${Math.round(progress)}%` : "Click or drag files here to upload photos or videos"}
          </p>
          <p className="text-xs text-slate-500">Supports JPG, PNG, WebP, MP4, WEBM & YouTube/Vimeo URLs</p>
        </div>
        <input type="file" accept="image/*,video/*" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
      </label>

      {/* Media Grid */}
      {loading && media.length === 0 ? (
        <div className="p-16 text-center">
          <span className="spinner spinner-md" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <ImageIcon size={40} className="mx-auto text-slate-300" />
          <p className="font-semibold text-slate-700">No media files found</p>
          <p className="text-xs text-slate-500">Upload photos or videos using the panel above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <MediaItemCard
              key={item.id}
              item={item}
              copied={copied}
              onCopy={copyUrl}
              onDelete={handleDelete}
              onPreview={setPreviewVideo}
            />
          ))}
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative p-6 space-y-4 border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video size={18} className="text-indigo-400" />
                <h3 className="font-bold text-sm truncate max-w-md">{previewVideo.name}</h3>
              </div>
              <button
                onClick={() => setPreviewVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
              <VideoPlayer src={previewVideo.url} title={previewVideo.name} />
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewVideo(null)}
                className="btn btn-outline btn-sm font-bold text-xs py-2 px-5 rounded-xl border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
