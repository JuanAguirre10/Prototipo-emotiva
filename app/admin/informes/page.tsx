"use client";
import { useState } from "react";
import Link from "next/link";
import informes from "@/data/informes.json";

type TipoFiltro = "todos" | "evolucion" | "evaluacion_inicial" | "alta" | "peritaje";
type EstadoFiltro = "todos" | "completado" | "borrador" | "revision";

const tipoLabel: Record<string, string> = {
  evolucion: "Evolución",
  evaluacion_inicial: "Eval. inicial",
  alta: "Alta",
  peritaje: "Peritaje",
};
const tipoStyle: Record<string, string> = {
  evolucion: "bg-[#E8F0FB] text-[#1A56A0]",
  evaluacion_inicial: "bg-violet-100 text-violet-700",
  alta: "bg-emerald-100 text-emerald-700",
  peritaje: "bg-orange-100 text-orange-700",
};
const estadoStyle: Record<string, string> = {
  completado: "bg-emerald-100 text-emerald-700",
  borrador: "bg-gray-100 text-gray-500",
  revision: "bg-yellow-100 text-yellow-700",
};

export default function AdminInformesPage() {
  const [tipo, setTipo] = useState<TipoFiltro>("todos");
  const [estado, setEstado] = useState<EstadoFiltro>("todos");
  const [busq, setBusq] = useState("");

  const filtrados = informes.filter((inf) => {
    const matchTipo = tipo === "todos" || inf.tipo === tipo;
    const matchEstado = estado === "todos" || inf.estado === estado;
    const matchBusq = busq === "" || inf.titulo.toLowerCase().includes(busq.toLowerCase()) || inf.paciente.toLowerCase().includes(busq.toLowerCase());
    return matchTipo && matchEstado && matchBusq;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <p className="text-[#666] text-sm">{filtrados.length} informes</p>
        <button className="self-start sm:self-auto px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:-translate-y-0.5">
          + Nuevo informe
        </button>
      </div>

      {/* Tipo tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["todos", "evolucion", "evaluacion_inicial", "alta", "peritaje"] as TipoFiltro[]).map((t) => {
          const count = t === "todos" ? informes.length : informes.filter((i) => i.tipo === t).length;
          return (
            <button key={t} onClick={() => setTipo(t)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold border transition-all ${
                tipo === t ? "bg-[#1A56A0] text-white border-[#1A56A0] shadow-sm" : "bg-white text-[#666] border-gray-200 hover:border-[#1A56A0]/40 hover:text-[#1A56A0]"
              }`}>
              {t === "todos" ? "Todos" : tipoLabel[t]}
              <span className={`ml-1.5 text-xs ${tipo === t ? "text-white/70" : "text-gray-400"}`}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Buscar por título o paciente..." value={busq} onChange={(e) => setBusq(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]" />
        </div>
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {(["todos", "completado", "revision", "borrador"] as EstadoFiltro[]).map((e) => (
            <button key={e} onClick={() => setEstado(e)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                estado === e ? "bg-white text-[#1A56A0] shadow-sm" : "text-[#666] hover:text-[#333]"
              }`}>
              {e === "todos" ? "Todos" : e === "completado" ? "Completado" : e === "revision" ? "Revisión" : "Borrador"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{["Informe", "Paciente", "Psicólogo", "Fecha", "Estado", ""].map((h) => (
              <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-[#666] uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtrados.map((inf) => (
              <tr key={inf.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-semibold text-[#0C2B60] text-sm">{inf.titulo}</div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tipoStyle[inf.tipo]}`}>
                    {tipoLabel[inf.tipo]}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#333]">{inf.paciente}</td>
                <td className="px-5 py-4 text-sm text-[#666]">{inf.psicologo.split(" ").slice(0, 2).join(" ")}</td>
                <td className="px-5 py-4 text-sm text-[#666]">{inf.fecha}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${estadoStyle[inf.estado]}`}>
                    {inf.estado}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="text-xs font-semibold text-[#1A56A0] hover:underline">Ver</button>
                    <button className="text-xs font-semibold text-gray-400 hover:text-[#666]">PDF</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <div className="p-10 text-center text-[#666]">No se encontraron informes</div>
        )}
      </div>
    </div>
  );
}
