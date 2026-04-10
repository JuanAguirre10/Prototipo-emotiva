"use client";
import { useState } from "react";
import usuarios from "@/data/usuarios.json";

const rolStyle: Record<string, string> = {
  admin: "bg-violet-100 text-violet-700",
  psicologo: "bg-[#E8F0FB] text-[#1A56A0]",
  recepcionista: "bg-emerald-100 text-emerald-700",
  paciente: "bg-orange-100 text-orange-700",
};

const rolLabel: Record<string, string> = {
  admin: "Administrador",
  psicologo: "Psicólogo/a",
  recepcionista: "Recepcionista",
  paciente: "Paciente",
};

const rolGrad: Record<string, string> = {
  admin: "from-violet-500 to-purple-600",
  psicologo: "from-[#1A56A0] to-[#2D6CC0]",
  recepcionista: "from-emerald-500 to-teal-600",
  paciente: "from-orange-400 to-rose-500",
};

export default function AdminUsuariosPage() {
  const [filtroRol, setFiltroRol] = useState("all");
  const [busq, setBusq] = useState("");

  const filtrados = usuarios.filter((u) => {
    const matchRol = filtroRol === "all" || u.rol === filtroRol;
    const matchBusq = busq === "" || u.nombre.toLowerCase().includes(busq.toLowerCase()) || u.correo.toLowerCase().includes(busq.toLowerCase());
    return matchRol && matchBusq;
  });

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <p className="text-[#666] text-sm">{usuarios.length} usuarios registrados</p>
        <button className="self-start sm:self-auto px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:-translate-y-0.5">
          + Nuevo usuario
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Buscar por nombre o correo..." value={busq} onChange={(e) => setBusq(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]" />
        </div>
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {["all", "admin", "psicologo", "recepcionista", "paciente"].map((r) => (
            <button key={r} onClick={() => setFiltroRol(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filtroRol === r ? "bg-white text-[#1A56A0] shadow-sm" : "text-[#666] hover:text-[#333]"
              }`}>
              {r === "all" ? "Todos" : rolLabel[r]}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtrados.map((u) => (
          <div key={u.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${rolGrad[u.rol]}`} />
            <div className="p-5 flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rolGrad[u.rol]} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                {u.nombre.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h3 className="font-black text-[#0C2B60] text-sm">{u.nombre}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rolStyle[u.rol]}`}>{rolLabel[u.rol]}</span>
                </div>
                <p className="text-xs text-[#666] truncate mb-2">{u.correo}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Último acceso: {u.ultimoAcceso}</span>
                  <span className={`font-semibold ${u.estado === "activo" ? "text-emerald-600" : "text-red-500"}`}>
                    {u.estado === "activo" ? "● Activo" : "● Inactivo"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex border-t border-gray-100">
              <button className="flex-1 py-2.5 text-xs font-semibold text-[#666] hover:text-[#1A56A0] hover:bg-gray-50 transition-colors">Editar</button>
              <div className="w-px bg-gray-100" />
              <button className="flex-1 py-2.5 text-xs font-semibold text-[#666] hover:text-[#1A56A0] hover:bg-gray-50 transition-colors">Permisos</button>
              <div className="w-px bg-gray-100" />
              <button className="flex-1 py-2.5 text-xs font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">Desactivar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
