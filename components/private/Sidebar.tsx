"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ── Icons ──────────────────────────────────────────────────────────────────
const I = {
  Grid: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Users: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Folder: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>,
  Calendar: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  CalDays: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><circle cx="9" cy="16" r="1" fill="currentColor" /><circle cx="12" cy="16" r="1" fill="currentColor" /><circle cx="15" cy="16" r="1" fill="currentColor" /></svg>,
  Video: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  Brain: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  Building: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  Card: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Chart: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  UserCog: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Settings: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>,
  Shield: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Clipboard: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  Robot: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2m-4-5a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
  User: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Logout: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
};

// ── Types ──────────────────────────────────────────────────────────────────
type NavItem = { href: string; label: string; icon: React.ReactNode };
type NavGroup = { label?: string; items: NavItem[] };

interface SidebarProps {
  role: "admin" | "psicologo" | "recepcion" | "paciente";
  userName: string;
  userEmail: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

// ── Nav config ─────────────────────────────────────────────────────────────
const navGroups: Record<string, NavGroup[]> = {
  admin: [
    {
      items: [
        { href: "/admin/dashboard", label: "Inicio", icon: <I.Grid /> },
        { href: "/admin/pacientes", label: "Pacientes", icon: <I.Users /> },
        { href: "/admin/informes", label: "Informes", icon: <I.Folder /> },
        { href: "/admin/citas", label: "Citas", icon: <I.Calendar /> },
        { href: "/admin/calendario", label: "Calendario", icon: <I.CalDays /> },
        { href: "/admin/videoconsulta", label: "Videoconsulta", icon: <I.Video /> },
      ],
    },
    {
      label: "Gestión",
      items: [
        { href: "/admin/psicologos", label: "Psicólogos", icon: <I.Brain /> },
        { href: "/admin/consultorios", label: "Consultorios", icon: <I.Building /> },
        { href: "/admin/pagos", label: "Pagos", icon: <I.Card /> },
        { href: "/admin/reportes", label: "Reportes", icon: <I.Chart /> },
      ],
    },
    {
      label: "Sistema",
      items: [
        { href: "/admin/usuarios", label: "Usuarios", icon: <I.UserCog /> },
        { href: "/admin/configuracion", label: "Configuración", icon: <I.Settings /> },
        { href: "/admin/auditoria", label: "Auditoría", icon: <I.Shield /> },
        { href: "/admin/papelera", label: "Papelera", icon: <I.Trash /> },
      ],
    },
  ],
  psicologo: [
    {
      items: [
        { href: "/psicologo/dashboard", label: "Mi agenda", icon: <I.Grid /> },
        { href: "/psicologo/pacientes", label: "Mis pacientes", icon: <I.Users /> },
        { href: "/psicologo/agentes", label: "Agentes IA", icon: <I.Robot /> },
      ],
    },
  ],
  recepcion: [
    {
      items: [
        { href: "/recepcion/dashboard", label: "Dashboard", icon: <I.Grid /> },
        { href: "/recepcion/nueva-cita", label: "Nueva cita", icon: <I.Calendar /> },
        { href: "/recepcion/consultorios", label: "Consultorios", icon: <I.Building /> },
        { href: "/recepcion/pagos", label: "Pagos", icon: <I.Card /> },
      ],
    },
  ],
  paciente: [
    {
      items: [
        { href: "/paciente/dashboard", label: "Mi portal", icon: <I.Grid /> },
        { href: "/paciente/citas", label: "Mis citas", icon: <I.Calendar /> },
        { href: "/paciente/resultados", label: "Resultados", icon: <I.Clipboard /> },
        { href: "/paciente/perfil", label: "Mi perfil", icon: <I.User /> },
      ],
    },
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

// ── Nav renderer (shared) ─────────────────────────────────────────────────
function NavContent({
  groups,
  pathname,
  collapsed,
}: {
  groups: NavGroup[];
  pathname: string;
  collapsed: boolean;
}) {
  return (
    <nav className="flex-1 px-2 py-3 overflow-y-auto">
      {groups.map((group, gi) => (
        <div key={gi} className={gi > 0 ? "mt-4" : ""}>
          {group.label && !collapsed && (
            <div className="px-3 mb-1.5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{group.label}</span>
            </div>
          )}
          {group.label && !collapsed && gi > 0 && (
            <div className="border-t border-white/10 mb-3" />
          )}
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center ${collapsed ? "justify-center px-2" : "gap-3 px-3"} py-2.5 rounded-xl transition-all duration-150 text-sm font-medium group ${
                    active ? "bg-white/15 text-white font-semibold" : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}>
                  <span className={`shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-white"} transition-colors`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Sidebar({ role, userName, userEmail, mobileOpen = false, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const groups = navGroups[role];

  useEffect(() => { onMobileClose?.(); }, [pathname]);

  const Footer = ({ c }: { c: boolean }) => (
    <div className="border-t border-white/10 p-3">
      {c ? (
        <Link href="/login" className="flex justify-center p-2 text-slate-400 hover:text-white" title="Salir">
          <I.Logout />
        </Link>
      ) : (
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleColors[role]} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
            {userName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">{userName}</div>
            <div className="text-slate-400 text-[11px] truncate">{roleLabels[role]}</div>
          </div>
          <Link href="/login" className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Salir">
            <I.Logout />
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className={`hidden lg:flex flex-col ${collapsed ? "w-16" : "w-60"} min-h-screen bg-[#0C2B60] shrink-0 transition-all duration-300`}>
        {/* Header */}
        <div className={`flex items-center ${collapsed ? "justify-center px-2" : "gap-2 px-4"} h-[60px] border-b border-white/10 shrink-0`}>
          {!collapsed && (
            <Link href="/" className="flex items-center flex-1 min-w-0">
              <Image src="/images/logo.png" alt="Emotiva" width={110} height={34} className="object-contain brightness-0 invert" />
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {collapsed
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />}
            </svg>
          </button>
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div className="px-4 pt-3 pb-1">
            <span className={`inline-flex text-[10px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r ${roleColors[role]} text-white uppercase tracking-wider`}>
              {roleLabels[role]}
            </span>
          </div>
        )}

        <NavContent groups={groups} pathname={pathname} collapsed={collapsed} />
        <Footer c={collapsed} />
      </aside>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileClose} />
          <aside
            className="relative z-10 w-64 flex flex-col bg-[#0C2B60] min-h-screen"
            style={{ animation: "slideInLeft 0.2s ease-out" }}>
            {/* Header */}
            <div className="flex items-center gap-2 px-4 h-[60px] border-b border-white/10 shrink-0">
              <Link href="/" className="flex-1">
                <Image src="/images/logo.png" alt="Emotiva" width={110} height={34} className="object-contain brightness-0 invert" />
              </Link>
              <button onClick={onMobileClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 pt-3 pb-1">
              <span className={`inline-flex text-[10px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r ${roleColors[role]} text-white uppercase tracking-wider`}>
                {roleLabels[role]}
              </span>
            </div>
            <NavContent groups={groups} pathname={pathname} collapsed={false} />
            <Footer c={false} />
          </aside>
        </div>
      )}

      <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
    </>
  );
}
