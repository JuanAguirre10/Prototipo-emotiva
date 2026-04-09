import Link from "next/link";
import citas from "@/data/citas.json";
import pagos from "@/data/pagos.json";
import consultorios from "@/data/consultorios.json";

const citasHoy = citas.filter((c) => c.fecha === "2026-04-08").sort((a, b) => a.hora.localeCompare(b.hora));
const pagosPendientes = pagos.filter((p) => p.fecha === "2026-04-08" && p.estado === "pendiente");
const consultoriosLibres = consultorios.filter((c) => c.estado === "disponible");

const statusStyle: Record<string, string> = {
  confirmada: "bg-blue-100 text-blue-700",
  pendiente: "bg-yellow-100 text-yellow-700",
  completada: "bg-emerald-100 text-emerald-700",
  cancelada: "bg-red-100 text-red-700",
};

export default function RecepcionDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-dark">Recepción</h1>
          <p className="text-[#666666] text-sm mt-0.5">Martes, 8 de abril de 2026</p>
        </div>
        <div className="flex gap-3">
          <Link href="/recepcion/pagos"
            className="px-4 py-2.5 border-2 border-[#1A56A0] text-[#1A56A0] font-bold text-sm rounded-xl hover:bg-[#E8F0FB] transition-colors">
            Registrar pago
          </Link>
          <Link href="/recepcion/nueva-cita"
            className="px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            + Nueva cita
          </Link>
        </div>
      </div>

      {/* Stats rápidos */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-3xl font-black text-[#1A56A0]">{citasHoy.length}</div>
          <div className="text-xs text-[#666666] mt-0.5">Citas programadas hoy</div>
        </div>
        <div className={`rounded-2xl p-5 border shadow-sm ${pagosPendientes.length > 0 ? "bg-yellow-50 border-yellow-200" : "bg-white border-gray-100"}`}>
          <div className={`text-3xl font-black ${pagosPendientes.length > 0 ? "text-yellow-600" : "text-emerald-600"}`}>{pagosPendientes.length}</div>
          <div className="text-xs text-[#666666] mt-0.5">Pagos pendientes hoy</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-3xl font-black text-emerald-600">{consultoriosLibres.length}</div>
          <div className="text-xs text-[#666666] mt-0.5">Consultorios disponibles</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Citas del día */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-dark">Citas de hoy</h2>
            <Link href="/recepcion/nueva-cita" className="text-xs text-[#1A56A0] font-semibold hover:underline">+ Nueva</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {citasHoy.map((c) => (
              <div key={c.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-14 text-center shrink-0">
                  <span className="bg-[#E8F0FB] text-[#1A56A0] font-black text-sm px-2 py-1 rounded-lg">{c.hora}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-dark text-sm">{c.paciente}</div>
                  <div className="text-[#666666] text-xs">{c.psicologo.split(" ").slice(0, 2).join(" ")} · {c.consultorio}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${statusStyle[c.estado]}`}>{c.estado}</span>
                <button className="text-xs font-semibold text-[#1A56A0] hover:underline shrink-0">Cobrar</button>
              </div>
            ))}
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-4">
          {/* Consultorios */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-dark text-sm mb-3">Estado de consultorios</h3>
            <div className="space-y-2">
              {consultorios.map((co) => {
                const cfg: Record<string, string> = {
                  disponible: "text-emerald-600",
                  ocupado: "text-blue-600",
                  en_limpieza: "text-yellow-600",
                  mantenimiento: "text-red-600",
                };
                const dot: Record<string, string> = {
                  disponible: "bg-emerald-500",
                  ocupado: "bg-blue-500 animate-pulse",
                  en_limpieza: "bg-yellow-500",
                  mantenimiento: "bg-red-500",
                };
                return (
                  <div key={co.id} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${dot[co.estado] ?? "bg-gray-400"}`} />
                      <span className="text-sm font-medium text-dark">{co.nombre}</span>
                    </div>
                    <span className={`text-xs font-semibold capitalize ${cfg[co.estado] ?? "text-gray-600"}`}>
                      {co.estado.replace("_", " ")}
                    </span>
                  </div>
                );
              })}
            </div>
            <Link href="/recepcion/consultorios" className="mt-3 block text-center text-xs font-semibold text-[#1A56A0] hover:underline">
              Ver detalle →
            </Link>
          </div>

          {/* Pagos pendientes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-dark text-sm mb-3">Cobros pendientes hoy</h3>
            {pagosPendientes.length === 0 ? (
              <p className="text-xs text-emerald-600 font-medium">✓ Todo al día</p>
            ) : (
              <div className="space-y-2">
                {pagosPendientes.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <div>
                      <div className="text-xs font-semibold text-dark">{p.paciente.split(" ")[0]}</div>
                      <div className="text-xs text-[#666666]">S/ {p.monto}</div>
                    </div>
                    <button className="px-3 py-1 bg-[#1A56A0] text-white font-bold text-xs rounded-lg hover:bg-[#2D6CC0] transition-colors">
                      Cobrar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
