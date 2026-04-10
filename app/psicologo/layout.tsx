"use client";
import { useState } from "react";
import Sidebar from "@/components/private/Sidebar";
import TopBar from "@/components/private/TopBar";

export default function PsicologoLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="psicologo" userName="Dra. Camila Torres" userEmail="psicologo@emotiva.pe"
        mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col overflow-auto">
        <TopBar onMenuOpen={() => setMobileOpen(true)} userName="Dra. Camila Torres"
          userInitials="CT" userGradient="from-[#1A56A0] to-[#2D6CC0]" />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
