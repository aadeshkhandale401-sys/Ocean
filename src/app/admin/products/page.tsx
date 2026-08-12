// ============================================
// Admin — Products List + Search + Delete
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Trash2, Edit, Package } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { deleteDocument } from "@/lib/firestore";
import { Product } from "@/types";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const { data: products, loading, refetch } = useFirestore<Product>("products");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteDocument("products", id);
      toast.success("Product deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Products
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">{products.length} items in catalog</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        {loading && products.length === 0 ? (
          <div className="p-16 text-center">
            <span className="spinner spinner-md" />
            <p className="mt-3 text-sm text-slate-400">Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Package size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="font-semibold text-slate-700">
              {products.length === 0 ? "No products yet" : "No matching products"}
            </p>
            {products.length === 0 && (
              <Link href="/admin/products/new" className="btn btn-primary btn-sm mt-4">
                <Plus size={14} /> Add Your First Product
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60">
                    <th className="text-xs font-bold uppercase tracking-wider text-slate-500 px-5 py-3">Product</th>
                    <th className="text-xs font-bold uppercase tracking-wider text-slate-500 px-5 py-3">Category</th>
                    <th className="text-xs font-bold uppercase tracking-wider text-slate-500 px-5 py-3">Status</th>
                    <th className="text-right text-xs font-bold uppercase tracking-wider text-slate-500 px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filtered.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                            ) : (
                              <Package size={18} />
                            )}
                          </div>
                          <span className="font-semibold text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="badge badge-blue">{product.category || "Uncategorized"}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`badge ${product.status === "draft" ? "badge-amber" : "badge-green"}`}>
                          {product.status || "Published"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            disabled={deleting === product.id}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            style={{ background: "transparent", border: "none" }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filtered.map((product) => (
                <div key={product.id} className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <Package size={18} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{product.name}</h4>
                      <span className="badge badge-blue mt-1 text-[10px]">{product.category || "Uncategorized"}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className={`badge ${product.status === "draft" ? "badge-amber" : "badge-green"}`}>
                      {product.status || "Published"}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}`} className="btn btn-outline btn-sm text-xs">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deleting === product.id}
                        className="btn btn-danger btn-sm text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
