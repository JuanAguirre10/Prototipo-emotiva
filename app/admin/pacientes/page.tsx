"use client";
import { useState } from "react";
import Link from "next/link";
import pacientes from "@/data/pacientes.json";
import psicologos from "@/data/psicologos.json";

export default function AdminPacientesPage() {
  const [busq, setBusq] = useState("");
  const [filtroPs, setFiltroPs] = useState("all");
  const [filtroEst, setFiltroEst] = useState("all");

  const filtrados = pacientes.filter((p) => {
    const matchBusq = busq === "" || p.nombre.toLowerCase().includes(busq.toLowerCase()) || p.dni.includes(busq);
    const matchPs = filtroPs === "all" || p.psicologoId === filtroPs;
    const matchEst = filtroEst === "all" || p.estado === filtroEst;
    return matchBusq && matchPs && matchEst;
  });

  const psNombre = (id: string) => psicologos.find((p) => p.id === id)?.nombre.split(" ").slice(0, 2).join(" ") ?? "—";

  const riesgoColor: Record<string, string> = {
    bajo: "bg-emerald-100 text-emerald-700",
    medio: "bg-yellow-100 text-yellow-700",
    alto: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-dark">Pacientes</h1>
          <p className="text-[#666666] text-sm mt-0.5">{pacientes.length} pacientes registrados</p>
        </div>
        <button className="px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          + Nuevo paciente
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Buscar por nombre o DNI..." value={busq} onChange={(e) => setBusq(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]" />
        </div>
        <select value={filtroPs} onChange={(e) => setFiltroPs(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 bg-white text-dark">
          <option value="all">Todos los psicólogos</option>
          {psicologos.map((p) => <option key={p.id} value={p.id}>{p.nombre.split(" ").slice(0, 2).join(" ")}</option>)}
        </select>
        <select value={filtroEst} onChange={(e) => setFiltroEst(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 bg-white text-dark">
          <option value="all">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="pausado">Pausado</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Paciente", "DNI", "Psicólogo asignado", "Sesiones", "Última sesión", "Riesgo", "Estado", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-[#666666] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtrados.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {p.nombre.split(" ")[0][0]}{p.nombre.split(" ")[1][0]}
                    </div>
                    <div>
                      <div className="font-semibold text-dark text-sm">{p.nombre}</div>
                      <div className="text-[#666666] text-xs">{p.edad} años · {p.telefono}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-dark">{p.dni}</td>
                <td className="px-5 py-4 text-sm text-dark">{psNombre(p.psicologoId)}</td>
                <td className="px-5 py-4 text-sm font-semibold text-dark">{p.sesionesRealizadas}</td>
                <td className="px-5 py-4 text-sm text-[#666666]">{p.ultimaSesion}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${riesgoColor[p.riesgoAbandono]}`}>
                    {p.riesgoAbandono}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.estado === "activo" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                    {p.estado}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-xs font-semibold text-[#1A56A0] hover:underline">Ver ficha</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <div className="text-center py-12 text-[#666666]">No se encontraron pacientes</div>
        )}
      </div>
    </div>
  );
}
