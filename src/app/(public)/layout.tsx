// ============================================
// Public Layout — Navbar + Footer + WhatsApp
// ============================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "72px", minHeight: "100vh" }}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
