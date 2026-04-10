"use client";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Inicio",
  "/admin/pacientes": "Pacientes",
  "/admin/informes": "Informes",
  "/admin/citas": "Citas",
  "/admin/calendario": "Calendario",
  "/admin/videoconsulta": "Videoconsulta",
  "/admin/psicologos": "Psicólogos",
  "/admin/consultorios": "Consultorios",
  "/admin/pagos": "Pagos",
  "/admin/reportes": "Reportes",
  "/admin/usuarios": "Usuarios",
  "/admin/configuracion": "Configuración",
  "/admin/auditoria": "Auditoría",
  "/admin/papelera": "Papelera",
  "/psicologo/dashboard": "Mi agenda",
  "/psicologo/pacientes": "Mis pacientes",
  "/psicologo/agentes": "Agentes IA",
  "/recepcion/dashboard": "Dashboard",
  "/recepcion/nueva-cita": "Nueva cita",
  "/recepcion/consultorios": "Consultorios",
  "/recepcion/pagos": "Pagos",
  "/paciente/dashboard": "Mi portal",
  "/paciente/citas": "Mis citas",
  "/paciente/resultados": "Resultados",
  "/paciente/perfil": "Mi perfil",
};

interface TopBarProps {
  onMenuOpen: () => void;
  userName?: string;
  userInitials?: string;
  userGradient?: string;
}

export default function TopBar({
  onMenuOpen,
  userName = "Cuenta Admin",
  userInitials = "CA",
  userGradient = "from-violet-500 to-purple-600",
}: TopBarProps) {
  const pathname = usePathname();

  const title = Object.keys(pageTitles)
    .filter((p) => pathname === p || pathname.startsWith(p + "/"))
    .sort((a, b) => b.length - a.length)[0];

  const pageTitle = title ? pageTitles[title] : "Panel";

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 bg-white border-b border-gray-200 px-4 sm:px-6 h-[60px] shrink-0 shadow-sm">
      {/* Hamburger (mobile only) */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-xl text-[#0C2B60] hover:bg-gray-100 transition-colors shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page title */}
      <span className="font-black text-[#0C2B60] text-lg leading-none lg:w-44 shrink-0">{pageTitle}</span>

      {/* Search bar — visible on desktop */}
      <div className="hidden lg:flex flex-1 max-w-sm">
        <div className="relative w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar paciente, informe o cita..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] bg-gray-50 transition-all"
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* Notification bell */}
      <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-rose-500 rounded-full text-white text-[10px] font-black flex items-center justify-center leading-none">3</span>
      </button>

      {/* User pill */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 cursor-pointer hover:border-gray-300 transition-colors">
        <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${userGradient} flex items-center justify-center text-white font-bold text-[10px] shrink-0`}>
          {userInitials}
        </div>
        <span className="text-xs font-semibold text-[#0C2B60] hidden sm:block max-w-[120px] truncate">
          {userName.split(" ").slice(0, 2).join(" ")}
        </span>
        <svg className="w-3 h-3 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </header>
  );
}
