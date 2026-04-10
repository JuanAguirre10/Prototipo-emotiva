"use client";
import { useState } from "react";
import Sidebar from "@/components/private/Sidebar";
import TopBar from "@/components/private/TopBar";

export default function PacienteLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="paciente" userName="Ana García López" userEmail="paciente@emotiva.pe"
        mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col overflow-auto">
        <TopBar onMenuOpen={() => setMobileOpen(true)} userName="Ana García López"
          userInitials="AG" userGradient="from-orange-400 to-rose-500" />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
