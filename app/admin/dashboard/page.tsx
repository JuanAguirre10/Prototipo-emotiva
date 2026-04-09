import Link from "next/link";
import citas from "@/data/citas.json";
import pacientes from "@/data/pacientes.json";
import pagos from "@/data/pagos.json";

const citasHoy = citas.filter((c) => c.fecha === "2026-04-08");
const pacientesActivos = pacientes.filter((p) => p.estado === "activo").length;
const ingresosHoy = pagos.filter((p) => p.fecha === "2026-04-08" && p.estado === "pagado").reduce((s, p) => s + p.monto, 0);
const ingresosMes = pagos.filter((p) => p.fecha.startsWith("2026-04") && p.estado === "pagado").reduce((s, p) => s + p.monto, 0);

const pacientesRiesgo = pacientes.filter((p) => p.riesgoAbandono === "alto");

const barData = [
  { sem: "Sem 1", val: 1240 },
  { sem: "Sem 2", val: 1850 },
  { sem: "Sem 3", val: 1430 },
  { sem: "Sem 4 (hoy)", val: 920 },
];
const maxBar = Math.max(...barData.map((b) => b.val));

function StatusBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    confirmada: "bg-blue-100 text-blue-700",
    pendiente: "bg-yellow-100 text-yellow-700",
    completada: "bg-emerald-100 text-emerald-700",
    cancelada: "bg-red-100 text-red-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[estado] ?? "bg-gray-100 text-gray-600"}`}>{estado}</span>;
}

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-dark">Panel Administrador</h1>
          <p className="text-[#666666] text-sm mt-0.5">Martes, 8 de abril de 2026</p>
        </div>
        <Link href="/admin/citas"
          className="px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          + Nueva cita
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {[
          { label: "Citas hoy", val: citasHoy.length, icon: "📅", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Ingresos hoy", val: `S/ ${ingresosHoy}`, icon: "💰", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pacientes activos", val: pacientesActivos, icon: "👥", color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Ingresos del mes", val: `S/ ${ingresosMes.toLocaleString()}`, icon: "📈", color: "text-orange-600", bg: "bg-orange-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
            <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
            <div className="text-[#666666] text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Citas de hoy */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-dark">Citas de hoy ({citasHoy.length})</h2>
            <Link href="/admin/citas" className="text-xs text-[#1A56A0] font-semibold hover:underline">Ver todo</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {citasHoy.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0FB] flex items-center justify-center text-[#1A56A0] font-bold text-xs shrink-0">
                    {c.hora.replace(":", "")}
                  </div>
                  <div>
                    <div className="text-dark font-semibold text-sm">{c.paciente}</div>
                    <div className="text-[#666666] text-xs">{c.psicologo} · {c.consultorio}</div>
                  </div>
                </div>
                <StatusBadge estado={c.estado} />
              </div>
            ))}
          </div>
        </div>

        {/* Gráfica ingresos */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-dark mb-5">Ingresos por semana (Abril)</h2>
          <div className="space-y-3">
            {barData.map((b) => (
              <div key={b.sem}>
                <div className="flex justify-between text-xs text-[#666666] mb-1">
                  <span>{b.sem}</span>
                  <span className="font-semibold text-dark">S/ {b.val.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#1A56A0] to-[#2D6CC0] transition-all"
                    style={{ width: `${(b.val / maxBar) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="text-xs text-[#666666]">Total del mes</div>
            <div className="text-2xl font-black text-[#1A56A0]">S/ {(barData.reduce((s, b) => s + b.val, 0)).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Alerta IA */}
      {pacientesRiesgo.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="text-2xl">🤖</div>
            <div>
              <h3 className="font-bold text-amber-800 mb-1">Alerta de agente IA — Riesgo de abandono</h3>
              <p className="text-amber-700 text-sm mb-3">
                Se detectaron <strong>{pacientesRiesgo.length} pacientes</strong> con alto riesgo de abandono terapéutico. Se recomienda contacto proactivo.
              </p>
              <div className="flex flex-wrap gap-2">
                {pacientesRiesgo.map((p) => (
                  <span key={p.id} className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {p.nombre} · Última sesión: {p.ultimaSesion}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Links rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/admin/pacientes", label: "Gestionar pacientes", icon: "👥" },
          { href: "/admin/psicologos", label: "Ver psicólogos", icon: "🧠" },
          { href: "/admin/consultorios", label: "Estado consultorios", icon: "🏥" },
          { href: "/admin/reportes", label: "Ver reportes", icon: "📊" },
        ].map((l) => (
          <Link key={l.href} href={l.href}
            className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#1A56A0]/30 hover:shadow-md transition-all group flex items-center gap-3">
            <span className="text-xl">{l.icon}</span>
            <span className="text-sm font-semibold text-dark group-hover:text-[#1A56A0] transition-colors">{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
