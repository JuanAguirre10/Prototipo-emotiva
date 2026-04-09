"use client";
import { useState } from "react";
import pagos from "@/data/pagos.json";
import pacientes from "@/data/pacientes.json";

export default function RecepcionPagosPage() {
  const [busqPac, setBusqPac] = useState("");
  const [confirmado, setConfirmado] = useState<string | null>(null);

  const pacientesFiltrados = busqPac.length > 1
    ? pacientes.filter((p) => p.nombre.toLowerCase().includes(busqPac.toLowerCase()))
    : [];

  const pendientesBusq = busqPac.length > 1
    ? pagos.filter((p) => p.paciente.toLowerCase().includes(busqPac.toLowerCase()) && p.estado === "pendiente")
    : pagos.filter((p) => p.estado === "pendiente");

  const totalHoy = pagos.filter((p) => p.fecha === "2026-04-08" && p.estado === "pagado").reduce((s, p) => s + p.monto, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-dark">Pagos</h1>
          <p className="text-[#666666] text-sm mt-0.5">Registro y cobro de sesiones</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 text-center">
          <div className="text-xl font-black text-emerald-600">S/ {totalHoy}</div>
          <div className="text-xs text-[#666666]">Cobrado hoy</div>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <label className="block text-sm font-bold text-dark mb-2">Buscar paciente para cobrar</label>
        <input type="text" value={busqPac} onChange={(e) => setBusqPac(e.target.value)}
          placeholder="Nombre del paciente..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]" />
      </div>

      {/* Pendientes */}
      {pendientesBusq.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-dark text-sm">Sesiones pendientes de cobro ({pendientesBusq.length})</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {pendientesBusq.map((p) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-dark text-sm">{p.paciente}</div>
                  <div className="text-[#666666] text-xs mt-0.5 truncate">{p.concepto}</div>
                  <div className="text-[#666666] text-xs">{p.fecha}</div>
                </div>
                <div className="text-[#1A56A0] font-black text-lg shrink-0">S/ {p.monto}</div>
                {confirmado === p.id ? (
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-2 rounded-xl shrink-0">✓ Cobrado</span>
                ) : (
                  <div className="flex gap-2 shrink-0">
                    {["efectivo", "yape", "transferencia"].map((m) => (
                      <button key={m} onClick={() => setConfirmado(p.id)}
                        className="px-3 py-1.5 bg-[#1A56A0] text-white font-bold text-xs rounded-xl hover:bg-[#2D6CC0] transition-all capitalize">
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {pendientesBusq.length === 0 && busqPac.length <= 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="text-4xl mb-3">💳</div>
          <p className="text-[#666666] text-sm">Busca un paciente para ver sus sesiones pendientes de cobro</p>
        </div>
      )}

      {pendientesBusq.length === 0 && busqPac.length > 1 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">✅</div>
          <p className="text-emerald-700 font-semibold text-sm">Sin pagos pendientes para &ldquo;{busqPac}&rdquo;</p>
        </div>
      )}

      {/* Historial del día */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-5">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-dark text-sm">Cobros registrados hoy</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {pagos.filter((p) => p.fecha === "2026-04-08").map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-dark">{p.paciente}</div>
                <div className="text-xs text-[#666666] truncate">{p.concepto}</div>
              </div>
              <span className="text-sm font-black text-[#1A56A0] shrink-0">S/ {p.monto}</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${p.estado === "pagado" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                {p.estado}
              </span>
              <button className="text-xs font-semibold text-[#1A56A0] hover:underline shrink-0">PDF</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
