"use client";
import { useState } from "react";
import consultorios from "@/data/consultorios.json";

type Estado = "disponible" | "en_limpieza";

const estadoConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  disponible: { label: "Disponible", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  ocupado: { label: "Ocupado", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", dot: "bg-blue-500 animate-pulse" },
  en_limpieza: { label: "En limpieza", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", dot: "bg-yellow-500" },
  mantenimiento: { label: "Mantenimiento", color: "text-red-700", bg: "bg-red-50 border-red-200", dot: "bg-red-500" },
};

export default function RecepcionConsultoriosPage() {
  const [estados, setEstados] = useState<Record<string, string>>(
    Object.fromEntries(consultorios.map((c) => [c.id, c.estado]))
  );

  const toggle = (id: string) => {
    const actual = estados[id];
    const siguiente = actual === "disponible" ? "en_limpieza" : "disponible";
    setEstados({ ...estados, [id]: siguiente });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-dark">Consultorios</h1>
        <p className="text-[#666666] text-sm mt-0.5">Visualización y cambio de estado básico</p>
        <div className="mt-2 text-xs text-amber-600 font-medium bg-amber-50 border border-amber-200 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full">
          ℹ️ Modo recepcionista — Solo puedes cambiar entre "disponible" y "en limpieza"
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {consultorios.map((c) => {
          const estado = estados[c.id];
          const cfg = estadoConfig[estado] ?? estadoConfig.disponible;
          const puedeToggle = estado === "disponible" || estado === "en_limpieza";

          return (
            <div key={c.id} className={`rounded-3xl border-2 p-6 transition-all ${cfg.bg}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                  <h2 className="text-lg font-black text-dark">{c.nombre}</h2>
                </div>
                <span className={`px-3 py-1 rounded-xl text-xs font-bold ${cfg.bg} ${cfg.color} border`}>{cfg.label}</span>
              </div>

              {estado === "ocupado" && c.sesionActiva && (
                <div className="bg-white/60 rounded-xl p-3 mb-4 text-sm text-dark">
                  <div className="text-xs text-[#666666] mb-0.5">Sesión en curso:</div>
                  <div className="font-semibold">{c.sesionActiva}</div>
                </div>
              )}

              <div className="mb-4">
                <div className="text-xs text-[#666666] font-semibold mb-1.5">Actividad hoy</div>
                {c.historialHoy.map((h) => (
                  <div key={h} className="text-xs text-dark py-1 border-b border-black/5 last:border-0">{h}</div>
                ))}
              </div>

              {puedeToggle ? (
                <button onClick={() => toggle(c.id)}
                  className="w-full py-2.5 rounded-xl text-sm font-bold bg-white/60 hover:bg-white/80 text-dark transition-colors border border-black/10">
                  Marcar como {estado === "disponible" ? "en limpieza" : "disponible"}
                </button>
              ) : (
                <div className="w-full py-2.5 rounded-xl text-sm font-medium text-center bg-white/40 text-[#666666] border border-black/10">
                  Solo admin puede cambiar este estado
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
