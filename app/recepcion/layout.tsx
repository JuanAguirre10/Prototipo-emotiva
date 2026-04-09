"use client";
import { useState } from "react";
import Sidebar from "@/components/private/Sidebar";

export default function RecepcionLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="recepcion" userName="Recepción Emotiva" userEmail="recepcion@emotiva.pe"
        mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col overflow-auto">
        <header className="lg:hidden sticky top-0 z-40 flex items-center gap-3 bg-white border-b border-gray-200 px-4 h-14 shadow-sm">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-xl text-[#0C2B60] hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-xs">E</div>
            <span className="font-bold text-[#0C2B60] text-sm">Emotiva</span>
            <span className="text-gray-300 mx-1">·</span>
            <span className="text-xs text-gray-500">Recepcionista</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs">RE</div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
