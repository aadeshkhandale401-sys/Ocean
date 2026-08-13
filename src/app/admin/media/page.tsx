// ============================================
// Admin — Media Gallery (Photos & Videos)
// ============================================

"use client";

import { useState } from "react";
import { Upload, Trash2, ImageIcon, Copy, Check, Video } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { deleteDocument } from "@/lib/firestore";
import { deleteFile } from "@/lib/storage";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { MediaItem } from "@/types";
import toast from "react-hot-toast";

export default function AdminMediaPage() {
  const { data: media, loading, refetch } = useFirestore<MediaItem>("media");
  const { upload, uploading, progress } = useMediaUpload();
  const [copied, setCopied] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");

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
          <p className="text-xs text-slate-500">Supports JPG, PNG, WebP, MP4, WEBM</p>
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
            <div key={item.id} className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all">
              <div className="aspect-square relative bg-slate-900 overflow-hidden">
                {item.type === "image" ? (
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full relative flex items-center justify-center bg-slate-950">
                    <video src={item.url} className="w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600/80 text-white flex items-center justify-center shadow-lg">
                        <Video size={18} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover Action Buttons */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="w-9 h-9 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-md hover:bg-slate-100 transition-all cursor-pointer"
                    title="Copy File URL"
                  >
                    {copied === item.url ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
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
          ))}
        </div>
      )}
    </div>
  );
}
