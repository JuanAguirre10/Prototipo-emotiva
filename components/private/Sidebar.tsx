"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; icon: string };

interface SidebarProps {
  role: "admin" | "psicologo" | "recepcion" | "paciente";
  userName: string;
  userEmail: string;
}

const navItems: Record<string, NavItem[]> = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: "⊞" },
    { href: "/admin/citas", label: "Citas", icon: "📅" },
    { href: "/admin/pacientes", label: "Pacientes", icon: "👥" },
    { href: "/admin/psicologos", label: "Psicólogos", icon: "🧠" },
    { href: "/admin/consultorios", label: "Consultorios", icon: "🏥" },
    { href: "/admin/pagos", label: "Pagos", icon: "💳" },
    { href: "/admin/reportes", label: "Reportes", icon: "📊" },
  ],
  psicologo: [
    { href: "/psicologo/dashboard", label: "Mi agenda", icon: "⊞" },
    { href: "/psicologo/pacientes", label: "Mis pacientes", icon: "👥" },
    { href: "/psicologo/agentes", label: "Agentes IA", icon: "🤖" },
  ],
  recepcion: [
    { href: "/recepcion/dashboard", label: "Dashboard", icon: "⊞" },
    { href: "/recepcion/nueva-cita", label: "Nueva cita", icon: "📅" },
    { href: "/recepcion/consultorios", label: "Consultorios", icon: "🏥" },
    { href: "/recepcion/pagos", label: "Pagos", icon: "💳" },
  ],
  paciente: [
    { href: "/paciente/dashboard", label: "Mi portal", icon: "⊞" },
    { href: "/paciente/citas", label: "Mis citas", icon: "📅" },
    { href: "/paciente/resultados", label: "Resultados", icon: "📋" },
    { href: "/paciente/perfil", label: "Mi perfil", icon: "👤" },
  ],
};

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  psicologo: "Psicólogo/a",
  recepcion: "Recepcionista",
  paciente: "Paciente",
};

export default function Sidebar({ role, userName, userEmail }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const items = navItems[role];

  return (
    <aside className={`${collapsed ? "w-16" : "w-64"} min-h-screen bg-[#0C2B60] flex flex-col shrink-0 transition-all duration-300`}>
      {/* Header */}
      <div className={`flex items-center ${collapsed ? "justify-center px-2" : "gap-2 px-4"} h-16 border-b border-white/10`}>
        {!collapsed && (
          <Link href="/" className="flex items-center flex-1 min-w-0">
            <Image src="/images/logo.png" alt="Emotiva" width={120} height={38} className="object-contain brightness-0 invert" />
          </Link>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {collapsed
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />}
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center ${collapsed ? "justify-center px-2" : "gap-3 px-3"} py-2.5 rounded-xl transition-all duration-150 text-sm font-medium ${
                active
                  ? "bg-white/15 text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}>
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer usuario */}
      <div className={`border-t border-white/10 p-3 ${collapsed ? "" : ""}`}>
        {collapsed ? (
          <Link href="/login" className="flex justify-center p-2 text-slate-400 hover:text-white transition-colors" title="Cerrar sesión">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {userName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">{userName}</div>
              <div className="text-slate-400 text-xs truncate">{roleLabels[role]}</div>
            </div>
            <Link href="/login" title="Cerrar sesión"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
