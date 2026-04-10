"use client";
import { useState } from "react";
import Link from "next/link";
import pacientes from "@/data/pacientes.json";
import psicologos from "@/data/psicologos.json";

type TipoFiltro = "todos" | "adulto" | "adolescente" | "nino" | "pareja" | "familia";
type EstadoFiltro = "todos" | "activo" | "pausado" | "pasivo";

const tipoLabel: Record<TipoFiltro, string> = {
  todos: "Todos", adulto: "Adultos", adolescente: "Adolescentes",
  nino: "Niños", pareja: "Parejas", familia: "Familias",
};

const tipoStyle: Record<string, string> = {
  adulto: "bg-[#E8F0FB] text-[#1A56A0]",
  adolescente: "bg-violet-100 text-violet-700",
  nino: "bg-orange-100 text-orange-700",
  pareja: "bg-rose-100 text-rose-700",
  familia: "bg-amber-100 text-amber-700",
};

const estadoStyle: Record<string, string> = {
  activo: "bg-emerald-100 text-emerald-700",
  pausado: "bg-yellow-100 text-yellow-700",
  pasivo: "bg-gray-100 text-gray-500",
};

const riesgoStyle: Record<string, string> = {
  bajo: "bg-emerald-100 text-emerald-700",
  medio: "bg-yellow-100 text-yellow-700",
  alto: "bg-red-100 text-red-700",
};

function initials(nombre: string, tipo: string): string {
  const parts = nombre.split(" ");
  if (tipo === "familia") return "F" + (parts[1]?.[0] ?? "");
  if (tipo === "pareja") {
    const yIdx = parts.findIndex((p) => p.toLowerCase() === "y");
    return (parts[0]?.[0] ?? "") + (yIdx > 0 ? parts[yIdx + 1]?.[0] ?? "" : parts[2]?.[0] ?? "");
  }
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

const avatarGrad: Record<string, string> = {
  adulto: "from-[#1A56A0] to-[#2D6CC0]",
  adolescente: "from-violet-500 to-purple-600",
  nino: "from-orange-400 to-rose-400",
  pareja: "from-rose-500 to-pink-600",
  familia: "from-amber-500 to-orange-500",
};

export default function AdminPacientesPage() {
  const [busq, setBusq] = useState("");
  const [tipo, setTipo] = useState<TipoFiltro>("todos");
  const [estado, setEstado] = useState<EstadoFiltro>("todos");
  const [filtroPs, setFiltroPs] = useState("all");

  const psNombre = (id: string) =>
    psicologos.find((p) => p.id === id)?.nombre.split(" ").slice(0, 2).join(" ") ?? "—";

  const filtrados = pacientes.filter((p) => {
    const matchBusq = busq === "" || p.nombre.toLowerCase().includes(busq.toLowerCase()) || p.dni.includes(busq);
    const matchTipo = tipo === "todos" || p.tipo === tipo;
    const matchEstado = estado === "todos" || p.estado === estado;
    const matchPs = filtroPs === "all" || p.psicologoId === filtroPs;
    return matchBusq && matchTipo && matchEstado && matchPs;
  });

  const countTipo = (t: TipoFiltro) => t === "todos" ? pacientes.length : pacientes.filter((p) => p.tipo === t).length;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <p className="text-[#666] text-sm">{filtrados.length} de {pacientes.length} pacientes</p>
        <button className="self-start sm:self-auto px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:-translate-y-0.5">
          + Añadir paciente
        </button>
      </div>

      {/* Tipo tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["todos", "adulto", "adolescente", "nino", "pareja", "familia"] as TipoFiltro[]).map((t) => (
          <button key={t} onClick={() => setTipo(t)}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold border transition-all ${
              tipo === t ? "bg-[#1A56A0] text-white border-[#1A56A0] shadow-sm" : "bg-white text-[#666] border-gray-200 hover:border-[#1A56A0]/40 hover:text-[#1A56A0]"
            }`}>
            {tipoLabel[t]}
            <span className={`ml-1.5 text-xs ${tipo === t ? "text-white/70" : "text-gray-400"}`}>({countTipo(t)})</span>
          </button>
        ))}
      </div>

      {/* Filters bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Buscar por nombre o DNI..." value={busq} onChange={(e) => setBusq(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]" />
        </div>
        <select value={filtroPs} onChange={(e) => setFiltroPs(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30">
          <option value="all">Todos los psicólogos</option>
          {psicologos.map((p) => <option key={p.id} value={p.id}>{p.nombre.split(" ").slice(0, 2).join(" ")}</option>)}
        </select>
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {(["todos", "activo", "pausado", "pasivo"] as EstadoFiltro[]).map((e) => (
            <button key={e} onClick={() => setEstado(e)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                estado === e ? "bg-white text-[#1A56A0] shadow-sm" : "text-[#666] hover:text-[#333]"
              }`}>
              {e === "todos" ? "Todos" : e === "activo" ? "Activos" : e === "pausado" ? "Pausa" : "Pasivos"}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {filtrados.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-[#666] font-medium">No se encontraron pacientes</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtrados.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${p.estado === "activo" ? "from-[#1A56A0] to-[#2D6CC0]" : p.estado === "pausado" ? "from-yellow-400 to-orange-400" : "from-gray-300 to-gray-400"}`} />
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avatarGrad[p.tipo]} flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm`}>
                    {initials(p.nombre, p.tipo).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-black text-[#0C2B60] text-sm leading-tight truncate">{p.nombre}</h2>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tipoStyle[p.tipo]}`}>
                        {p.tipo === "nino" ? "Niño" : p.tipo === "pareja" ? "Pareja" : p.tipo === "familia" ? "Familia" : p.tipo === "adolescente" ? "Adolescente" : "Adulto"}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${estadoStyle[p.estado]}`}>
                        {p.estado === "activo" ? "Activo" : p.estado === "pausado" ? "Pausa" : "Pasivo"}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${riesgoStyle[p.riesgoAbandono]}`}>
                    {p.riesgoAbandono}
                  </span>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3 text-xs">
                  <div><span className="text-gray-400">DNI</span><div className="font-semibold text-[#333]">{p.dni}</div></div>
                  <div>
                    <span className="text-gray-400">{p.tipo === "familia" || p.tipo === "pareja" ? "Alta" : "Edad"}</span>
                    <div className="font-semibold text-[#333]">{p.tipo === "familia" || p.tipo === "pareja" ? p.fechaAlta : `${p.edad} años`}</div>
                  </div>
                  <div><span className="text-gray-400">Sesiones</span><div className="font-semibold text-[#333]">{p.sesionesRealizadas}</div></div>
                  <div><span className="text-gray-400">Alta</span><div className="font-semibold text-[#333]">{p.fechaAlta}</div></div>
                </div>

                {/* Motivo */}
                <div className="text-xs text-[#666] bg-gray-50 rounded-xl px-3 py-2 mb-3 border border-gray-100 leading-relaxed line-clamp-2">
                  {p.motivoConsulta}
                </div>

                {/* Psicólogo + última sesión */}
                <div className="flex items-center justify-between text-xs text-[#666] mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#E8F0FB] flex items-center justify-center text-[#1A56A0] font-bold text-[10px]">
                      {psNombre(p.psicologoId)[0]}
                    </div>
                    <span className="font-medium">{psNombre(p.psicologoId)}</span>
                  </div>
                  <span className="text-gray-400">Últ: {p.ultimaSesion}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl border-2 border-[#1A56A0]/20 text-[#1A56A0] font-bold text-xs hover:border-[#1A56A0] hover:bg-[#E8F0FB] transition-all">
                    Historial
                  </button>
                  <Link href={`/admin/pacientes/${p.id}`}
                    className="flex-1 py-2 rounded-xl bg-[#1A56A0] text-white font-bold text-xs hover:bg-[#2D6CC0] transition-all shadow-sm text-center">
                    Abrir ficha →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
