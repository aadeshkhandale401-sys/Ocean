// ============================================
// Admin — Enquiries Inbox
// ============================================

"use client";

import { useState } from "react";
import { MessageSquare, Mail, Phone, Building2, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { updateDocument } from "@/lib/firestore";
import { Enquiry } from "@/types";
import toast from "react-hot-toast";

export default function AdminEnquiriesPage() {
  const { data: enquiries, loading, refetch } = useFirestore<Enquiry>("enquiries");
  const [expanded, setExpanded] = useState<string | null>(null);

  const updateStatus = async (id: string, status: "read" | "replied") => {
    try {
      await updateDocument("enquiries", id, { status });
      toast.success(`Marked as ${status}`);
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const sorted = [...enquiries].sort((a, b) => {
    const dateA = a.createdAt instanceof Date ? a.createdAt : (a.createdAt as { toDate: () => Date })?.toDate?.() || new Date();
    const dateB = b.createdAt instanceof Date ? b.createdAt : (b.createdAt as { toDate: () => Date })?.toDate?.() || new Date();
    return dateB.getTime() - dateA.getTime();
  });

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Enquiries
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage customer messages and project requests.</p>
        </div>
        {newCount > 0 && <span className="badge badge-blue">{newCount} new</span>}
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-16 text-center">
          <span className="spinner spinner-md" />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <MessageSquare size={40} className="mx-auto text-slate-300" />
          <p className="font-semibold text-slate-700">No enquiries received yet</p>
          <p className="text-xs text-slate-500">Messages sent via website contact forms will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((enq) => (
            <div
              key={enq.id}
              className={`bg-white rounded-xl border transition-all overflow-hidden shadow-xs ${
                enq.status === "new" ? "border-blue-500 ring-2 ring-blue-50/50" : "border-slate-200"
              }`}
            >
              <div
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {enq.name?.charAt(0)?.toUpperCase() || "E"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{enq.name}</h3>
                    <p className="text-xs text-slate-500 truncate">{enq.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`badge ${
                      enq.status === "new" ? "badge-blue" : enq.status === "replied" ? "badge-green" : "badge-amber"
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
              </div>

              {expanded === enq.id && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" /> {enq.phone || "N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-slate-400" /> {enq.organization || "N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" /> Service: {enq.serviceInterest || "General"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-400" />{" "}
                      {enq.createdAt instanceof Date ? enq.createdAt.toLocaleDateString() : "Recent"}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 text-xs sm:text-sm text-slate-800 leading-relaxed border border-slate-100">
                    {enq.message}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {enq.status !== "read" && (
                      <button onClick={() => updateStatus(enq.id, "read")} className="btn btn-ghost btn-sm text-xs">
                        Mark as Read
                      </button>
                    )}
                    {enq.status !== "replied" && (
                      <button onClick={() => updateStatus(enq.id, "replied")} className="btn btn-primary btn-sm text-xs">
                        <CheckCircle size={14} /> Mark as Replied
                      </button>
                    )}
                    <a href={`mailto:${enq.email}?subject=Re: Your Enquiry — Ocean MGPS`} className="btn btn-outline btn-sm text-xs">
                      <Mail size={14} /> Email Client
                    </a>
                    {enq.phone && (
                      <a
                        href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline btn-sm text-xs text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                      >
                        <ExternalLink size={14} /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
