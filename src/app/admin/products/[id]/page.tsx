// ============================================
// Admin — Edit Product
// ============================================

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Trash2 } from "lucide-react";
import { getDocument, updateDocument, deleteDocument } from "@/lib/firestore";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { Product } from "@/types";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { upload, uploading, progress } = useMediaUpload();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    specifications: "",
    featured: false,
    status: "published" as "published" | "draft",
  });

  useEffect(() => {
    async function load() {
      const product = await getDocument<Product>("products", id);
      if (product) {
        setForm({
          name: product.name || "",
          category: product.category || "",
          description: product.description || "",
          specifications: product.specifications || "",
          featured: Boolean(product.featured),
          status: product.status || "published",
        });
        setImages(product.images || []);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    for (const file of Array.from(e.target.files)) {
      try {
        const url = await upload(file, "products");
        setImages((prev) => [...prev, url]);
        toast.success(`Uploaded ${file.name}`);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Product name is required");
    setSaving(true);
    try {
      await updateDocument("products", id, { ...form, images });
      toast.success("Product updated!");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product permanently?")) return;
    try {
      await deleteDocument("products", id);
      toast.success("Product deleted");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="spinner spinner-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Edit Product
          </h1>
        </div>
        <button onClick={handleDelete} className="btn btn-danger btn-sm">
          <Trash2 size={14} /> Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
            <div className="input-group">
              <label>Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required className="input-field" />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="input-field" />
            </div>
            <div className="input-group">
              <label>Specifications</label>
              <textarea name="specifications" value={form.specifications} onChange={handleChange} rows={3} className="input-field" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
            <label className="text-sm font-semibold block mb-3 text-slate-900">Product Images</label>
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center bg-red-500 text-white cursor-pointer"
                      style={{ border: "none" }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-colors">
              <Upload size={24} className="text-slate-400" />
              <span className="text-sm font-medium text-slate-500">
                {uploading ? `Uploading... ${Math.round(progress)}%` : "Add more images"}
              </span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
            <div className="input-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field">
                <option value="">Select</option>
                {PRODUCT_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="input-field">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
              <span className="text-sm font-medium text-slate-700">Featured on homepage</span>
            </label>
          </div>
          <button type="submit" disabled={saving} className="btn btn-primary w-full">
            {saving ? <><span className="spinner spinner-sm" /> Updating...</> : <><Save size={16} /> Update Product</>}
          </button>
        </div>
      </form>
    </div>
  );
}
