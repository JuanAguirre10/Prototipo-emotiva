"use client";
import { useState } from "react";
import pagos from "@/data/pagos.json";

export default function AdminPagosPage() {
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroModal, setFiltroModal] = useState("all");
  const [filtroEst, setFiltroEst] = useState("all");

  const filtrados = pagos.filter((p) => {
    const mf = filtroFecha === "" || p.fecha === filtroFecha;
    const mm = filtroModal === "all" || p.modalidad === filtroModal;
    const me = filtroEst === "all" || p.estado === filtroEst;
    return mf && mm && me;
  });

  const totalDia = pagos.filter((p) => p.fecha === "2026-04-08" && p.estado === "pagado").reduce((s, p) => s + p.monto, 0);
  const totalMes = pagos.filter((p) => p.estado === "pagado").reduce((s, p) => s + p.monto, 0);
  const pendientes = pagos.filter((p) => p.estado === "pendiente").length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-dark">Pagos</h1>
          <p className="text-[#666666] text-sm mt-0.5">Registro de cobros y comprobantes</p>
        </div>
        <button className="px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          + Registrar pago
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-2xl font-black text-emerald-600">S/ {totalDia.toLocaleString()}</div>
          <div className="text-xs text-[#666666] mt-0.5">Ingresos de hoy</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-2xl font-black text-[#1A56A0]">S/ {totalMes.toLocaleString()}</div>
          <div className="text-xs text-[#666666] mt-0.5">Total del período</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-2xl font-black text-yellow-600">{pendientes}</div>
          <div className="text-xs text-[#666666] mt-0.5">Pagos pendientes</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 flex flex-wrap gap-3">
        <input type="date" value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 bg-white text-dark" />
        <select value={filtroModal} onChange={(e) => setFiltroModal(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-dark focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30">
          <option value="all">Todas las modalidades</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="yape">Yape/Plin</option>
        </select>
        <select value={filtroEst} onChange={(e) => setFiltroEst(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-dark focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30">
          <option value="all">Todos los estados</option>
          <option value="pagado">Pagado</option>
          <option value="pendiente">Pendiente</option>
        </select>
        {filtroFecha && <button onClick={() => setFiltroFecha("")} className="text-xs text-[#666666] hover:text-red-500">✕ Limpiar</button>}
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Paciente", "Concepto", "Monto", "Modalidad", "Fecha", "Estado", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-[#666666] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtrados.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-semibold text-dark text-sm">{p.paciente}</td>
                <td className="px-5 py-4 text-sm text-[#666666] max-w-[200px] truncate">{p.concepto}</td>
                <td className="px-5 py-4 font-black text-[#1A56A0] text-sm">S/ {p.monto}</td>
                <td className="px-5 py-4">
                  <span className="bg-gray-100 text-dark text-xs font-semibold px-2.5 py-1 rounded-lg capitalize">{p.modalidad}</span>
                </td>
                <td className="px-5 py-4 text-sm text-[#666666]">{p.fecha}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.estado === "pagado" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {p.estado}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-xs font-semibold text-[#1A56A0] hover:underline">PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
