"use client";
import { useState } from "react";
import auditoria from "@/data/auditoria.json";

const moduloStyle: Record<string, string> = {
  "Autenticación": "bg-gray-100 text-gray-600",
  "Citas": "bg-blue-100 text-blue-700",
  "Notas": "bg-violet-100 text-violet-700",
  "Usuarios": "bg-orange-100 text-orange-700",
  "Informes": "bg-[#E8F0FB] text-[#1A56A0]",
  "Pacientes": "bg-emerald-100 text-emerald-700",
  "Pagos": "bg-yellow-100 text-yellow-700",
  "Papelera": "bg-red-100 text-red-700",
  "Evaluaciones": "bg-pink-100 text-pink-700",
};

export default function AdminAuditoriaPage() {
  const [busq, setBusq] = useState("");
  const [filtroModulo, setFiltroModulo] = useState("all");

  const modulos = [...new Set(auditoria.map((a) => a.modulo))];

  const filtrados = auditoria.filter((a) => {
    const matchBusq = busq === "" || a.usuario.toLowerCase().includes(busq.toLowerCase()) || a.accion.toLowerCase().includes(busq.toLowerCase()) || a.detalle.toLowerCase().includes(busq.toLowerCase());
    const matchMod = filtroModulo === "all" || a.modulo === filtroModulo;
    return matchBusq && matchMod;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[#666] text-sm">{auditoria.length} eventos registrados</p>
        <button className="px-4 py-2 border border-gray-200 text-[#666] text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
          Exportar log
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total eventos", val: auditoria.length, color: "text-[#1A56A0]", bg: "bg-[#E8F0FB]" },
          { label: "Hoy", val: auditoria.filter((a) => a.fecha === "2026-04-08").length, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Usuarios activos", val: new Set(auditoria.map((a) => a.usuario)).size, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Módulos", val: modulos.length, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
            <div className="text-xs text-[#666] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Buscar en el log..." value={busq} onChange={(e) => setBusq(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]" />
        </div>
        <select value={filtroModulo} onChange={(e) => setFiltroModulo(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30">
          <option value="all">Todos los módulos</option>
          {modulos.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Log table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{["Fecha / Hora", "Usuario", "Acción", "Módulo", "Detalle"].map((h) => (
              <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-[#666] uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtrados.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <div className="text-xs font-bold text-[#0C2B60]">{a.fecha}</div>
                  <div className="text-xs text-gray-400">{a.hora}</div>
                </td>
                <td className="px-5 py-3.5 text-sm font-semibold text-[#333]">{a.usuario}</td>
                <td className="px-5 py-3.5 text-sm text-[#666]">{a.accion}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${moduloStyle[a.modulo] ?? "bg-gray-100 text-gray-600"}`}>
                    {a.modulo}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs text-[#666] max-w-[240px] truncate">{a.detalle}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrados.length === 0 && <div className="p-10 text-center text-[#666]">Sin eventos</div>}
      </div>
    </div>
  );
}
