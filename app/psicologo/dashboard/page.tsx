import citas from "@/data/citas.json";
import pacientes from "@/data/pacientes.json";

const misPsCitas = citas.filter((c) => c.psicologoId === "ps1").sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));
const citasHoy = misPsCitas.filter((c) => c.fecha === "2026-04-08");
const proxima = citasHoy.find((c) => c.estado !== "completada") ?? misPsCitas.find((c) => c.fecha > "2026-04-08");
const misPacientes = pacientes.filter((p) => p.psicologoId === "ps1");
const riesgoAlto = misPacientes.filter((p) => p.riesgoAbandono === "alto");

const statusStyle: Record<string, string> = {
  confirmada: "bg-blue-100 text-blue-700",
  pendiente: "bg-yellow-100 text-yellow-700",
  completada: "bg-emerald-100 text-emerald-700",
};

export default function PsicologoDashboard() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-dark">Buenas tardes, Dra. Camila 👋</h1>
        <p className="text-[#666666] text-sm mt-0.5">Martes, 8 de abril de 2026 · {citasHoy.length} citas programadas hoy</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Próxima cita */}
        {proxima && (
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] rounded-3xl p-6 text-white">
            <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">Próxima cita</div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-black">{proxima.paciente}</h2>
                <p className="text-white/70 text-sm">{proxima.tipo}</p>
              </div>
              <div className="bg-white/20 rounded-2xl px-4 py-3 text-center">
                <div className="text-2xl font-black">{proxima.hora}</div>
                <div className="text-xs text-white/60">{proxima.consultorio}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 bg-white text-[#1A56A0] font-bold text-sm rounded-xl hover:bg-[#E8F0FB] transition-colors">
                Abrir historial
              </button>
              <button className="flex-1 py-2.5 bg-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                Iniciar sesión
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="space-y-3">
          {[
            { label: "Pacientes activos", val: misPacientes.filter((p) => p.estado === "activo").length, icon: "👥", color: "text-[#1A56A0]" },
            { label: "Citas esta semana", val: misPsCitas.filter((c) => c.fecha >= "2026-04-07" && c.fecha <= "2026-04-11").length, icon: "📅", color: "text-violet-600" },
            { label: "Riesgo de abandono", val: riesgoAlto.length, icon: "⚠️", color: "text-red-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className={`text-xl font-black ${s.color}`}>{s.val}</div>
                <div className="text-xs text-[#666666]">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agenda del día */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-dark">Agenda de hoy</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {citasHoy.length === 0 ? (
            <div className="px-6 py-8 text-center text-[#666666] text-sm">No hay citas programadas para hoy</div>
          ) : citasHoy.map((c) => (
            <div key={c.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="w-14 text-center shrink-0">
                <div className="text-sm font-black text-[#1A56A0]">{c.hora}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-dark text-sm">{c.paciente}</div>
                <div className="text-[#666666] text-xs">{c.tipo} · {c.consultorio}</div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${statusStyle[c.estado] ?? "bg-gray-100 text-gray-600"}`}>
                {c.estado}
              </span>
              <button className="text-xs font-semibold text-[#1A56A0] hover:underline shrink-0">
                Historial
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas IA */}
      {riesgoAlto.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-xl">🤖</span>
            <div>
              <h3 className="font-bold text-amber-800 text-sm mb-1">Agente IA — Riesgo de abandono detectado</h3>
              <p className="text-amber-700 text-xs mb-2">{riesgoAlto.length} paciente(s) presentan patrones de posible abandono terapéutico.</p>
              <div className="flex flex-wrap gap-2">
                {riesgoAlto.map((p) => (
                  <span key={p.id} className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {p.nombre} · {p.ultimaSesion}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
