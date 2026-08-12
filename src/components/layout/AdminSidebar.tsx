// ============================================
// Admin Sidebar — 7-Item Nav + Mobile Drawer
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Wrench,
  ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Logo from "@/components/ui/Logo";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: FolderOpen, label: "Projects", href: "/admin/projects" },
  { icon: Wrench, label: "Services", href: "/admin/services" },
  { icon: ImageIcon, label: "Media Gallery", href: "/admin/media" },
  { icon: MessageSquare, label: "Enquiries", href: "/admin/enquiries" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    localStorage.removeItem("ocean_admin_logged_in");
    await signOut();
    toast.success("Signed out");
    window.location.href = "/admin/login";
  };

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Logo variant="light" size="md" href="/admin/dashboard" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-all duration-200"
              style={{
                color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                borderLeft: isActive ? "3px solid var(--color-accent)" : "3px solid transparent",
              }}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <ExternalLink size={18} />
          View Website
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.5)", background: "transparent", border: "none" }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 admin-sidebar text-white shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex-shrink-0 cursor-pointer"
            style={{ border: "none" }}
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="truncate">
            <Logo variant="light" size="sm" href="/admin/dashboard" />
          </div>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 whitespace-nowrap flex-shrink-0">
          Admin
        </span>
      </header>

      {/* Desktop Sidebar — occupies grid column */}
      <aside className="hidden lg:block admin-sidebar h-screen sticky top-0 overflow-y-auto">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 z-50 w-64 h-screen admin-sidebar shadow-2xl"
            >
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
