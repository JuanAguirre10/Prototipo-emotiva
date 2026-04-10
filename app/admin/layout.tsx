"use client";
import { useState } from "react";
import Sidebar from "@/components/private/Sidebar";
import TopBar from "@/components/private/TopBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" userName="Cuenta Admin" userEmail="admin@emotiva.pe"
        mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col overflow-auto">
        <TopBar onMenuOpen={() => setMobileOpen(true)} userName="Cuenta Admin"
          userInitials="CA" userGradient="from-violet-500 to-purple-600" />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
