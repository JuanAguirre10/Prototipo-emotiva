import Link from "next/link";
import citas from "@/data/citas.json";
import pacientes from "@/data/pacientes.json";
import pagos from "@/data/pagos.json";

const citasHoy = citas.filter((c) => c.fecha === "2026-04-08");
const pacientesActivos = pacientes.filter((p) => p.estado === "activo").length;
const ingresosHoy = pagos
  .filter((p) => p.fecha === "2026-04-08" && p.estado === "pagado")
  .reduce((s, p) => s + p.monto, 0);
const ingresosMes = pagos
  .filter((p) => p.fecha.startsWith("2026-04") && p.estado === "pagado")
  .reduce((s, p) => s + p.monto, 0);

const pacientesRiesgo = pacientes.filter((p) => p.riesgoAbandono === "alto");

const barData = [
  { sem: "Sem 1", val: 1240 },
  { sem: "Sem 2", val: 1850 },
  { sem: "Sem 3", val: 1430 },
  { sem: "Sem 4", val: 920 },
];
const maxBar = Math.max(...barData.map((b) => b.val));

const statusStyle: Record<string, string> = {
  confirmada: "bg-blue-100 text-blue-700",
  pendiente: "bg-yellow-100 text-yellow-700",
  completada: "bg-emerald-100 text-emerald-700",
  cancelada: "bg-red-100 text-red-700",
};

const statsCards = [
  {
    label: "Citas hoy",
    val: citasHoy.length,
    sub: `${citasHoy.filter((c) => c.estado === "confirmada").length} confirmadas`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "text-[#1A56A0]",
    bg: "bg-[#E8F0FB]",
    href: "/admin/citas",
  },
  {
    label: "Ingresos hoy",
    val: `S/ ${ingresosHoy}`,
    sub: "Pagos registrados",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    href: "/admin/pagos",
  },
  {
    label: "Pacientes activos",
    val: pacientesActivos,
    sub: `${pacientesRiesgo.length} con riesgo alto`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "text-violet-600",
    bg: "bg-violet-50",
    href: "/admin/pacientes",
  },
  {
    label: "Ingresos del mes",
    val: `S/ ${ingresosMes.toLocaleString()}`,
    sub: "Abril 2026",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "text-orange-600",
    bg: "bg-orange-50",
    href: "/admin/reportes",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0C2B60]">Panel Administrador</h1>
          <p className="text-[#666666] text-sm mt-0.5">Miércoles, 8 de abril de 2026</p>
        </div>
        <Link
          href="/admin/citas"
          className="self-start sm:self-auto px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:-translate-y-0.5">
          + Nueva cita
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {statsCards.map((s) => (
          <Link key={s.label} href={s.href}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color} mb-3 group-hover:scale-110 transition-transform`}>
              {s.icon}
            </div>
            <div className={`text-xl sm:text-2xl font-black ${s.color}`}>{s.val}</div>
            <div className="text-[#333] text-xs sm:text-sm font-semibold mt-0.5">{s.label}</div>
            <div className="text-gray-400 text-xs mt-0.5">{s.sub}</div>
          </Link>
        ))}
      </div>

      {/* Alerta IA */}
      {pacientesRiesgo.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 mb-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2m-4-5a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-amber-800 mb-1 text-sm">Alerta IA — Riesgo de abandono</h3>
              <p className="text-amber-700 text-xs sm:text-sm mb-3">
                {pacientesRiesgo.length} paciente{pacientesRiesgo.length > 1 ? "s" : ""} con alto riesgo. Se recomienda contacto proactivo.
              </p>
              <div className="flex flex-wrap gap-2">
                {pacientesRiesgo.map((p) => (
                  <span key={p.id} className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {p.nombre.split(" ").slice(0, 2).join(" ")} · {p.ultimaSesion}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Citas de hoy */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-[#0C2B60] text-sm sm:text-base">Citas de hoy ({citasHoy.length})</h2>
            <Link href="/admin/citas" className="text-xs text-[#1A56A0] font-semibold hover:underline">
              Ver todo →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {citasHoy.length === 0 ? (
              <div className="px-6 py-8 text-center text-[#666666] text-sm">No hay citas programadas para hoy</div>
            ) : (
              citasHoy.map((c) => (
                <div key={c.id} className="flex items-center justify-between px-5 sm:px-6 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E8F0FB] flex items-center justify-center text-[#1A56A0] font-black text-xs shrink-0">
                      {c.hora}
                    </div>
                    <div>
                      <div className="text-[#0C2B60] font-semibold text-sm">{c.paciente}</div>
                      <div className="text-[#666666] text-xs">{c.psicologo.split(" ").slice(0,2).join(" ")} · {c.consultorio}</div>
                    </div>
                  </div>
                  <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[c.estado]}`}>
                    {c.estado}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Gráfica ingresos */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <h2 className="font-bold text-[#0C2B60] mb-5 text-sm sm:text-base">Ingresos · Abril 2026</h2>
          <div className="space-y-3">
            {barData.map((b) => (
              <div key={b.sem}>
                <div className="flex justify-between text-xs text-[#666666] mb-1.5">
                  <span>{b.sem}</span>
                  <span className="font-bold text-[#0C2B60]">S/ {b.val.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#1A56A0] to-[#2D6CC0]"
                    style={{ width: `${(b.val / maxBar) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between">
            <div>
              <div className="text-xs text-[#666666]">Total del mes</div>
              <div className="text-2xl font-black text-[#1A56A0]">
                S/ {barData.reduce((s, b) => s + b.val, 0).toLocaleString()}
              </div>
            </div>
            <Link href="/admin/reportes" className="text-xs text-[#1A56A0] font-semibold hover:underline">
              Ver reportes →
            </Link>
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div>
        <h2 className="text-sm font-bold text-[#666666] uppercase tracking-wider mb-3">Accesos rápidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/admin/pacientes", label: "Gestionar pacientes", sub: `${pacientesActivos} activos`,
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
              color: "text-[#1A56A0] bg-[#E8F0FB]" },
            { href: "/admin/psicologos", label: "Psicólogos", sub: "4 profesionales",
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
              color: "text-violet-600 bg-violet-50" },
            { href: "/admin/consultorios", label: "Consultorios", sub: "Estado en vivo",
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
              color: "text-emerald-600 bg-emerald-50" },
            { href: "/admin/reportes", label: "Reportes", sub: "Análisis mensual",
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
              color: "text-orange-600 bg-orange-50" },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#1A56A0]/30 hover:shadow-md transition-all group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${l.color} group-hover:scale-110 transition-transform`}>
                {l.icon}
              </div>
              <div className="text-sm font-bold text-[#0C2B60] group-hover:text-[#1A56A0] transition-colors">{l.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{l.sub}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
