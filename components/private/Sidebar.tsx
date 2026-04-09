"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; icon: React.ReactNode };

interface SidebarProps {
  role: "admin" | "psicologo" | "recepcion" | "paciente";
  userName: string;
  userEmail: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const UsersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const BrainIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const BuildingIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const CreditCardIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);
const ChartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const GridIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);
const ClipboardIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);
const RobotIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2m-4-5a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const LogoutIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const navItems: Record<string, NavItem[]> = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: <GridIcon /> },
    { href: "/admin/citas", label: "Citas", icon: <CalendarIcon /> },
    { href: "/admin/pacientes", label: "Pacientes", icon: <UsersIcon /> },
    { href: "/admin/psicologos", label: "Psicólogos", icon: <BrainIcon /> },
    { href: "/admin/consultorios", label: "Consultorios", icon: <BuildingIcon /> },
    { href: "/admin/pagos", label: "Pagos", icon: <CreditCardIcon /> },
    { href: "/admin/reportes", label: "Reportes", icon: <ChartIcon /> },
  ],
  psicologo: [
    { href: "/psicologo/dashboard", label: "Mi agenda", icon: <GridIcon /> },
    { href: "/psicologo/pacientes", label: "Mis pacientes", icon: <UsersIcon /> },
    { href: "/psicologo/agentes", label: "Agentes IA", icon: <RobotIcon /> },
  ],
  recepcion: [
    { href: "/recepcion/dashboard", label: "Dashboard", icon: <GridIcon /> },
    { href: "/recepcion/nueva-cita", label: "Nueva cita", icon: <CalendarIcon /> },
    { href: "/recepcion/consultorios", label: "Consultorios", icon: <BuildingIcon /> },
    { href: "/recepcion/pagos", label: "Pagos", icon: <CreditCardIcon /> },
  ],
  paciente: [
    { href: "/paciente/dashboard", label: "Mi portal", icon: <GridIcon /> },
    { href: "/paciente/citas", label: "Mis citas", icon: <CalendarIcon /> },
    { href: "/paciente/resultados", label: "Resultados", icon: <ClipboardIcon /> },
    { href: "/paciente/perfil", label: "Mi perfil", icon: <UserIcon /> },
  ],
};

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  psicologo: "Psicólogo/a",
  recepcion: "Recepcionista",
  paciente: "Paciente",
};

const roleColors: Record<string, string> = {
  admin: "from-violet-500 to-purple-600",
  psicologo: "from-[#1A56A0] to-[#2D6CC0]",
  recepcion: "from-emerald-500 to-teal-600",
  paciente: "from-orange-400 to-rose-500",
};

export default function Sidebar({ role, userName, userEmail, mobileOpen = false, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const items = navItems[role];

  // Close mobile sidebar on route change
  useEffect(() => {
    onMobileClose?.();
  }, [pathname]);

  const sidebarContent = (
    <aside className={`${collapsed ? "w-16" : "w-64"} min-h-screen bg-[#0C2B60] flex flex-col shrink-0 transition-all duration-300`}>
      {/* Header */}
      <div className={`flex items-center ${collapsed ? "justify-center px-2" : "gap-2 px-4"} h-16 border-b border-white/10`}>
        {!collapsed && (
          <Link href="/" className="flex items-center flex-1 min-w-0">
            <Image src="/images/logo.png" alt="Emotiva" width={120} height={38} className="object-contain brightness-0 invert" />
          </Link>
        )}
        <button
          onClick={() => {
            if (mobileOpen) {
              onMobileClose?.();
            } else {
              setCollapsed(!collapsed);
            }
          }}
          className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : collapsed
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            }
          </svg>
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/10">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${roleColors[role]} text-white`}>
            {roleLabels[role]}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center ${collapsed ? "justify-center px-2" : "gap-3 px-3"} py-2.5 rounded-xl transition-all duration-150 text-sm font-medium group ${
                active
                  ? "bg-white/15 text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}>
              <span className={`shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer usuario */}
      <div className={`border-t border-white/10 p-3`}>
        {collapsed ? (
          <Link href="/login" className="flex justify-center p-2 text-slate-400 hover:text-white transition-colors" title="Cerrar sesión">
            <LogoutIcon />
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleColors[role]} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
              {userName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">{userName}</div>
              <div className="text-slate-400 text-xs truncate">{userEmail}</div>
            </div>
            <Link href="/login" title="Cerrar sesión"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
              <LogoutIcon />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">{sidebarContent}</div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          {/* Sidebar panel */}
          <div className="relative z-10 w-64 flex flex-col"
            style={{ animation: "slideInLeft 0.2s ease-out" }}>
            <aside className="w-64 min-h-screen bg-[#0C2B60] flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 h-16 border-b border-white/10">
                <Link href="/" className="flex items-center flex-1 min-w-0">
                  <Image src="/images/logo.png" alt="Emotiva" width={120} height={38} className="object-contain brightness-0 invert" />
                </Link>
                <button onClick={onMobileClose}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Role badge */}
              <div className="px-4 py-3 border-b border-white/10">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${roleColors[role]} text-white`}>
                  {roleLabels[role]}
                </span>
              </div>

              {/* Nav */}
              <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
                {items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link key={item.href} href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm font-medium group ${
                        active ? "bg-white/15 text-white font-semibold" : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}>
                      <span className={`shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="border-t border-white/10 p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleColors[role]} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                    {userName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-semibold truncate">{userName}</div>
                    <div className="text-slate-400 text-xs truncate">{userEmail}</div>
                  </div>
                  <Link href="/login" className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                    <LogoutIcon />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
