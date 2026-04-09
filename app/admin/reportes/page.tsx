import citas from "@/data/citas.json";
import pacientes from "@/data/pacientes.json";
import pagos from "@/data/pagos.json";

const meses = ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr"];
const sesionesData = [28, 34, 29, 40, 38, 45, 12];
const ingresosData = [3200, 4100, 3500, 4800, 4500, 5400, 1440];
const maxSes = Math.max(...sesionesData);
const maxIng = Math.max(...ingresosData);

const completadas = citas.filter((c) => c.estado === "completada").length;
const canceladas = citas.filter((c) => c.estado === "cancelada").length;
const total = citas.length;

export default function AdminReportesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-dark">Reportes</h1>
          <p className="text-[#666666] text-sm mt-0.5">Análisis de actividad y rendimiento del centro</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 text-[#666666] font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors">
            📊 Exportar Excel
          </button>
          <button className="px-4 py-2 bg-[#1A56A0] text-white font-semibold text-sm rounded-xl hover:bg-[#2D6CC0] transition-colors">
            📄 Exportar PDF
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {[
          { label: "Tasa de asistencia", val: `${Math.round((completadas / total) * 100)}%`, color: "text-emerald-600", icon: "✅" },
          { label: "Cancelaciones", val: `${Math.round((canceladas / total) * 100)}%`, color: "text-red-500", icon: "❌" },
          { label: "Pacientes nuevos (mes)", val: "4", color: "text-[#1A56A0]", icon: "👤" },
          { label: "Pacientes recurrentes", val: "6", color: "text-violet-600", icon: "🔄" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-1">{k.icon}</div>
            <div className={`text-2xl font-black ${k.color}`}>{k.val}</div>
            <div className="text-xs text-[#666666] mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sesiones por mes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-dark mb-5">Sesiones por mes (últimos 7 meses)</h2>
          <div className="flex items-end gap-2 h-40">
            {sesionesData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-bold text-[#1A56A0]">{v}</div>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-[#1A56A0] to-[#2D6CC0] transition-all"
                  style={{ height: `${(v / maxSes) * 100}%`, minHeight: "4px" }} />
                <div className="text-xs text-[#666666]">{meses[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingresos por mes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-dark mb-5">Ingresos por mes (S/)</h2>
          <div className="space-y-3">
            {meses.map((m, i) => (
              <div key={m}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#666666]">{m}</span>
                  <span className="font-bold text-dark">S/ {ingresosData[i].toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#0D7C6E] to-emerald-400"
                    style={{ width: `${(ingresosData[i] / maxIng) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de servicio */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-dark mb-5">Servicios más solicitados</h2>
          {[
            { tipo: "Terapia individual", count: 45, color: "bg-[#1A56A0]" },
            { tipo: "Terapia de pareja", count: 18, color: "bg-[#2D6CC0]" },
            { tipo: "Psicología infantil", count: 22, color: "bg-violet-500" },
            { tipo: "Evaluación psicológica", count: 12, color: "bg-emerald-500" },
            { tipo: "Talleres grupales", count: 8, color: "bg-orange-400" },
          ].map((s) => {
            const pct = Math.round((s.count / 105) * 100);
            return (
              <div key={s.tipo} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dark font-medium">{s.tipo}</span>
                  <span className="text-[#666666]">{s.count} sesiones ({pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Pacientes nuevos vs recurrentes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-dark mb-5">Nuevos vs Recurrentes</h2>
          <div className="space-y-3">
            {meses.slice(-4).map((m, i) => {
              const nuevos = [3, 5, 4, 4][i];
              const rec = [8, 9, 8, 6][i];
              const tot = nuevos + rec;
              return (
                <div key={m}>
                  <div className="flex justify-between text-xs text-[#666666] mb-1">
                    <span>{m}</span>
                    <span>{nuevos} nuevos · {rec} recurrentes</span>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
                    <div className="bg-[#1A56A0] transition-all" style={{ width: `${(nuevos / tot) * 100}%` }} />
                    <div className="bg-sky-300 transition-all" style={{ width: `${(rec / tot) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#1A56A0] inline-block" /> Nuevos</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-sky-300 inline-block" /> Recurrentes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
