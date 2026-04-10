"use client";
import { useState } from "react";
import Sidebar from "@/components/private/Sidebar";
import TopBar from "@/components/private/TopBar";

export default function RecepcionLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="recepcion" userName="Recepción Emotiva" userEmail="recepcion@emotiva.pe"
        mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col overflow-auto">
        <TopBar onMenuOpen={() => setMobileOpen(true)} userName="Recepción Emotiva"
          userInitials="RE" userGradient="from-emerald-500 to-teal-600" />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
