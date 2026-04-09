import Link from "next/link";
import citas from "@/data/citas.json";

const misCitas = citas.filter((c) => c.pacienteId === "pac1").sort((a, b) => b.fecha.localeCompare(a.fecha));
const proximas = misCitas.filter((c) => c.fecha >= "2026-04-08" && c.estado !== "cancelada");
const pasadas = misCitas.filter((c) => c.fecha < "2026-04-08" || c.estado === "completada" || c.estado === "cancelada");

const statusStyle: Record<string, string> = {
  confirmada: "bg-blue-100 text-blue-700",
  pendiente: "bg-yellow-100 text-yellow-700",
  completada: "bg-emerald-100 text-emerald-700",
  cancelada: "bg-red-100 text-red-700",
};

export default function PacienteCitasPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-black text-dark">Mis Citas</h1>
        <Link href="/reservar"
          className="px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          + Nueva cita
        </Link>
      </div>

      {/* Próximas */}
      <div className="mb-8">
        <h2 className="font-bold text-dark mb-3">Próximas citas ({proximas.length})</h2>
        {proximas.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-[#666666] text-sm mb-4">No tienes citas próximas programadas</p>
            <Link href="/reservar" className="px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-colors">
              Reservar cita
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {proximas.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border-2 border-[#1A56A0]/20 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-black text-dark">{c.fecha}</div>
                    <div className="text-[#1A56A0] font-bold text-sm">{c.hora}</div>
                    <div className="text-[#666666] text-xs mt-0.5">{c.tipo}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${statusStyle[c.estado]}`}>{c.estado}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-dark mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white text-xs font-bold">
                    {c.psicologo.split(" ")[1][0]}
                  </div>
                  <span>{c.psicologo}</span>
                  <span className="text-[#666666]">·</span>
                  <span className="text-[#666666] text-xs">{c.consultorio}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 border-2 border-red-200 text-red-600 font-bold text-xs rounded-xl hover:bg-red-50 transition-colors">
                    Cancelar
                  </button>
                  <button className="flex-1 py-2 bg-[#E8F0FB] text-[#1A56A0] font-bold text-xs rounded-xl hover:bg-[#1A56A0] hover:text-white transition-all">
                    Reagendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historial */}
      <div>
        <h2 className="font-bold text-dark mb-3">Historial ({pasadas.length})</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
          {pasadas.map((c) => (
            <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="text-center shrink-0 w-14">
                <div className="text-xs text-[#666666]">{c.fecha}</div>
                <div className="text-sm font-bold text-dark">{c.hora}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-dark truncate">{c.tipo}</div>
                <div className="text-xs text-[#666666] truncate">{c.psicologo.split(" ").slice(0, 2).join(" ")}</div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${statusStyle[c.estado]}`}>{c.estado}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
