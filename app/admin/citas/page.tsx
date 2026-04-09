"use client";
import { useState } from "react";
import citas from "@/data/citas.json";

const statusStyle: Record<string, string> = {
  confirmada: "bg-blue-100 text-blue-700",
  pendiente: "bg-yellow-100 text-yellow-700",
  completada: "bg-emerald-100 text-emerald-700",
  cancelada: "bg-red-100 text-red-700",
};

export default function AdminCitasPage() {
  const [vista, setVista] = useState<"lista" | "calendario">("lista");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroEst, setFiltroEst] = useState("all");

  const citasFiltradas = citas.filter((c) => {
    const matchFecha = filtroFecha === "" || c.fecha === filtroFecha;
    const matchEst = filtroEst === "all" || c.estado === filtroEst;
    return matchFecha && matchEst;
  }).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));

  const dias = [...new Set(citas.map((c) => c.fecha))].sort();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-dark">Citas</h1>
          <p className="text-[#666666] text-sm mt-0.5">{citas.length} citas en el sistema</p>
        </div>
        <button className="px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          + Nueva cita
        </button>
      </div>

      {/* Vista toggle + filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {(["lista", "calendario"] as const).map((v) => (
            <button key={v} onClick={() => setVista(v)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize ${vista === v ? "bg-white text-[#1A56A0] shadow-sm" : "text-[#666666] hover:text-dark"}`}>
              {v === "lista" ? "Lista" : "Semana"}
            </button>
          ))}
        </div>
        <input type="date" value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 bg-white text-dark" />
        <select value={filtroEst} onChange={(e) => setFiltroEst(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 bg-white text-dark">
          <option value="all">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
        {filtroFecha && <button onClick={() => setFiltroFecha("")} className="text-xs text-[#666666] hover:text-red-500 transition-colors">✕ Limpiar</button>}
      </div>

      {vista === "lista" ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Fecha", "Hora", "Paciente", "Psicólogo", "Consultorio", "Tipo", "Estado", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-[#666666] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {citasFiltradas.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-semibold text-dark">{c.fecha}</td>
                  <td className="px-5 py-4">
                    <span className="bg-[#E8F0FB] text-[#1A56A0] font-bold text-xs px-2.5 py-1.5 rounded-lg">{c.hora}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-dark">{c.paciente}</td>
                  <td className="px-5 py-4 text-sm text-dark">{c.psicologo.split(" ").slice(0, 2).join(" ")}</td>
                  <td className="px-5 py-4 text-sm text-[#666666]">{c.consultorio}</td>
                  <td className="px-5 py-4 text-xs text-[#666666]">{c.tipo}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[c.estado]}`}>{c.estado}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-xs font-semibold text-[#1A56A0] hover:underline">Detalles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-5 divide-x divide-gray-100">
            {dias.slice(0, 5).map((dia) => {
              const citasDia = citas.filter((c) => c.fecha === dia).sort((a, b) => a.hora.localeCompare(b.hora));
              return (
                <div key={dia}>
                  <div className="p-3 text-center border-b border-gray-100 bg-gray-50">
                    <div className="text-xs font-bold text-[#666666]">{new Date(dia + "T12:00:00").toLocaleDateString("es", { weekday: "short" }).toUpperCase()}</div>
                    <div className="text-lg font-black text-dark">{dia.split("-")[2]}</div>
                  </div>
                  <div className="p-2 min-h-[300px] space-y-1.5">
                    {citasDia.map((c) => (
                      <div key={c.id} className={`p-2 rounded-lg text-xs ${statusStyle[c.estado]} border border-current/20`}>
                        <div className="font-bold">{c.hora}</div>
                        <div className="truncate">{c.paciente.split(" ")[0]}</div>
                        <div className="truncate opacity-75">{c.psicologo.split(" ")[1]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
