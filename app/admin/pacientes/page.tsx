"use client";
import { useState } from "react";
import pacientes from "@/data/pacientes.json";
import psicologos from "@/data/psicologos.json";

type TipoFiltro = "todos" | "ninos" | "adolescentes" | "adultos";
type EstadoFiltro = "todos" | "activo" | "pausado";

const tipoLabel: Record<TipoFiltro, string> = {
  todos: "Todos",
  ninos: "Niños",
  adolescentes: "Adolescentes",
  adultos: "Adultos",
};

const tipoColor: Record<string, string> = {
  Niño: "bg-orange-100 text-orange-700",
  Adolescente: "bg-violet-100 text-violet-700",
  Adulto: "bg-[#E8F0FB] text-[#1A56A0]",
};

function getTipo(edad: number): string {
  if (edad <= 12) return "Niño";
  if (edad <= 17) return "Adolescente";
  return "Adulto";
}

const riesgoConfig: Record<string, { label: string; cls: string }> = {
  bajo: { label: "Riesgo bajo", cls: "bg-emerald-100 text-emerald-700" },
  medio: { label: "Riesgo medio", cls: "bg-yellow-100 text-yellow-700" },
  alto: { label: "Riesgo alto", cls: "bg-red-100 text-red-700" },
};

export default function AdminPacientesPage() {
  const [busq, setBusq] = useState("");
  const [tipo, setTipo] = useState<TipoFiltro>("todos");
  const [estado, setEstado] = useState<EstadoFiltro>("todos");
  const [filtroPs, setFiltroPs] = useState("all");

  const psNombre = (id: string) =>
    psicologos.find((p) => p.id === id)?.nombre.split(" ").slice(0, 2).join(" ") ?? "—";

  const filtrados = pacientes.filter((p) => {
    const matchBusq =
      busq === "" ||
      p.nombre.toLowerCase().includes(busq.toLowerCase()) ||
      p.dni.includes(busq);
    const matchTipo =
      tipo === "todos" ||
      (tipo === "ninos" && p.edad <= 12) ||
      (tipo === "adolescentes" && p.edad >= 13 && p.edad <= 17) ||
      (tipo === "adultos" && p.edad >= 18);
    const matchEstado = estado === "todos" || p.estado === estado;
    const matchPs = filtroPs === "all" || p.psicologoId === filtroPs;
    return matchBusq && matchTipo && matchEstado && matchPs;
  });

  const countTipo = (t: TipoFiltro) => {
    if (t === "todos") return pacientes.length;
    return pacientes.filter((p) =>
      t === "ninos" ? p.edad <= 12 : t === "adolescentes" ? (p.edad >= 13 && p.edad <= 17) : p.edad >= 18
    ).length;
  };

  const initials = (nombre: string) => {
    const parts = nombre.split(" ");
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0C2B60]">Pacientes</h1>
          <p className="text-[#666666] text-sm mt-0.5">
            {filtrados.length} de {pacientes.length} pacientes
          </p>
        </div>
        <button className="self-start sm:self-auto px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:-translate-y-0.5">
          + Nuevo paciente
        </button>
      </div>

      {/* Filtros tipo (tabs) */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["todos", "ninos", "adolescentes", "adultos"] as TipoFiltro[]).map((t) => (
          <button
            key={t}
            onClick={() => setTipo(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              tipo === t
                ? "bg-[#1A56A0] text-white border-[#1A56A0] shadow-sm"
                : "bg-white text-[#666666] border-gray-200 hover:border-[#1A56A0]/40 hover:text-[#1A56A0]"
            }`}>
            {tipoLabel[t]}
            <span className={`ml-1.5 text-xs ${tipo === t ? "text-white/70" : "text-[#999]"}`}>
              ({countTipo(t)})
            </span>
          </button>
        ))}
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={busq}
            onChange={(e) => setBusq(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]"
          />
        </div>

        <select
          value={filtroPs}
          onChange={(e) => setFiltroPs(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30">
          <option value="all">Todos los psicólogos</option>
          {psicologos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre.split(" ").slice(0, 2).join(" ")}
            </option>
          ))}
        </select>

        {/* Estado tabs inline */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {(["todos", "activo", "pausado"] as EstadoFiltro[]).map((e) => (
            <button
              key={e}
              onClick={() => setEstado(e)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                estado === e ? "bg-white text-[#1A56A0] shadow-sm" : "text-[#666666] hover:text-[#333]"
              }`}>
              {e === "todos" ? "Todos" : e === "activo" ? "Activos" : "Pausados"}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      {filtrados.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-[#666666] font-medium">No se encontraron pacientes</p>
          <p className="text-sm text-gray-400 mt-1">Prueba con otros filtros</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtrados.map((p) => {
            const tipoPaciente = getTipo(p.edad);
            const riesgo = riesgoConfig[p.riesgoAbandono];
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
                {/* Top accent */}
                <div className={`h-1 ${p.estado === "activo" ? "bg-gradient-to-r from-[#1A56A0] to-[#2D6CC0]" : "bg-gray-200"}`} />

                <div className="p-5">
                  {/* Header row */}
                  <div className="flex items-start gap-3 mb-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm">
                      {initials(p.nombre)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-black text-[#0C2B60] text-sm leading-tight truncate">{p.nombre}</h2>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tipoColor[tipoPaciente]}`}>
                          {tipoPaciente}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          p.estado === "activo" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {p.estado === "activo" ? "Activo" : "Pausado"}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${riesgo.cls}`}>
                      {p.riesgoAbandono}
                    </span>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-xs">
                    <div>
                      <span className="text-gray-400 font-medium">DNI</span>
                      <div className="font-semibold text-[#333]">{p.dni}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Edad</span>
                      <div className="font-semibold text-[#333]">{p.edad} años</div>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Teléfono</span>
                      <div className="font-semibold text-[#333]">{p.telefono}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Sesiones</span>
                      <div className="font-semibold text-[#333]">{p.sesionesRealizadas} realizadas</div>
                    </div>
                  </div>

                  {/* Motivo */}
                  <div className="text-xs text-[#666] bg-gray-50 rounded-xl px-3 py-2 mb-4 border border-gray-100">
                    <span className="text-gray-400 font-medium">Motivo: </span>
                    {p.motivoConsulta}
                  </div>

                  {/* Psicólogo + última sesión */}
                  <div className="flex items-center justify-between text-xs text-[#666] mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#E8F0FB] flex items-center justify-center text-[#1A56A0] font-bold text-xs">
                        {psNombre(p.psicologoId)[0]}
                      </div>
                      <span className="font-medium">{psNombre(p.psicologoId)}</span>
                    </div>
                    <span className="text-gray-400">Última: {p.ultimaSesion}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl border-2 border-[#1A56A0]/20 text-[#1A56A0] font-bold text-xs hover:border-[#1A56A0] hover:bg-[#E8F0FB] transition-all">
                      Historial
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-[#1A56A0] text-white font-bold text-xs hover:bg-[#2D6CC0] transition-all shadow-sm">
                      Abrir ficha →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
