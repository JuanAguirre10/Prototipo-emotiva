"use client";
import { useState } from "react";
import consultorios from "@/data/consultorios.json";

type Estado = "disponible" | "ocupado" | "en_limpieza" | "mantenimiento";

const estadoConfig: Record<Estado, { label: string; color: string; bg: string; dot: string }> = {
  disponible: { label: "Disponible", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  ocupado: { label: "Ocupado", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", dot: "bg-blue-500 animate-pulse" },
  en_limpieza: { label: "En limpieza", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", dot: "bg-yellow-500" },
  mantenimiento: { label: "Mantenimiento", color: "text-red-700", bg: "bg-red-50 border-red-200", dot: "bg-red-500" },
};

export default function AdminConsultoriosPage() {
  const [estados, setEstados] = useState<Record<string, Estado>>(
    Object.fromEntries(consultorios.map((c) => [c.id, c.estado as Estado]))
  );

  const cicloEstado = (id: string) => {
    const ciclo: Estado[] = ["disponible", "ocupado", "en_limpieza", "mantenimiento"];
    const actual = estados[id];
    const idx = ciclo.indexOf(actual);
    setEstados({ ...estados, [id]: ciclo[(idx + 1) % ciclo.length] });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-dark">Consultorios</h1>
        <p className="text-[#666666] text-sm mt-0.5">Estado en tiempo real de todos los espacios del centro</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-4 gap-3 mb-7">
        {(Object.keys(estadoConfig) as Estado[]).map((e) => {
          const count = Object.values(estados).filter((s) => s === e).length;
          const cfg = estadoConfig[e];
          return (
            <div key={e} className={`rounded-2xl p-4 border ${cfg.bg}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span className={`text-xs font-bold ${cfg.color}`}>{cfg.label}</span>
              </div>
              <div className={`text-2xl font-black ${cfg.color}`}>{count}</div>
            </div>
          );
        })}
      </div>

      {/* Grid de consultorios */}
      <div className="grid sm:grid-cols-2 gap-5">
        {consultorios.map((c) => {
          const estado = estados[c.id];
          const cfg = estadoConfig[estado];
          return (
            <div key={c.id} className={`rounded-3xl border-2 p-6 transition-all ${cfg.bg}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                  <h2 className="text-lg font-black text-dark">{c.nombre}</h2>
                </div>
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
              </div>

              {estado === "ocupado" && c.sesionActiva && (
                <div className="bg-white/60 rounded-xl p-3 mb-4 text-sm text-dark">
                  <div className="text-xs text-[#666666] mb-0.5">Sesión activa:</div>
                  <div className="font-semibold">{c.sesionActiva}</div>
                </div>
              )}

              <div className="mb-4">
                <div className="text-xs text-[#666666] mb-2 font-semibold">Equipamiento</div>
                <div className="flex flex-wrap gap-1.5">
                  {c.equipamiento.map((e) => (
                    <span key={e} className="bg-white/60 text-dark text-xs px-2.5 py-1 rounded-lg">{e}</span>
                  ))}
                </div>
              </div>

              {c.historialHoy.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-[#666666] mb-2 font-semibold">Actividad hoy</div>
                  {c.historialHoy.map((h) => (
                    <div key={h} className="text-xs text-dark py-1 border-b border-black/5 last:border-0">{h}</div>
                  ))}
                </div>
              )}

              <button onClick={() => cicloEstado(c.id)}
                className="w-full py-2.5 rounded-xl text-sm font-bold bg-white/60 hover:bg-white/80 text-dark transition-colors border border-black/10">
                Cambiar estado →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
