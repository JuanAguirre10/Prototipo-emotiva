"use client";
import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import pacientes from "@/data/pacientes.json";
import psicologos from "@/data/psicologos.json";
import notas from "@/data/notas.json";
import evaluaciones from "@/data/evaluaciones.json";
import citas from "@/data/citas.json";

type Tab = "general" | "notas" | "evaluaciones" | "citas";

const riesgoStyle: Record<string, string> = {
  bajo: "bg-emerald-100 text-emerald-700",
  medio: "bg-yellow-100 text-yellow-700",
  alto: "bg-red-100 text-red-700",
};
const estadoStyle: Record<string, string> = {
  activo: "bg-emerald-100 text-emerald-700",
  pausado: "bg-yellow-100 text-yellow-700",
  pasivo: "bg-gray-100 text-gray-500",
};
const citaStyle: Record<string, string> = {
  confirmada: "bg-blue-100 text-blue-700",
  pendiente: "bg-yellow-100 text-yellow-700",
  completada: "bg-emerald-100 text-emerald-700",
  cancelada: "bg-red-100 text-red-700",
};

export default function FichaPacientePage({ params }: { params: { id: string } }) {
  const [tab, setTab] = useState<Tab>("general");
  const pac = pacientes.find((p) => p.id === params.id);
  if (!pac) notFound();

  const ps = psicologos.find((p) => p.id === pac.psicologoId);
  const psNombre = ps?.nombre ?? "—";
  const notasPac = notas.filter((n) => n.pacienteId === pac.id);
  const evalsPac = evaluaciones.filter((e) => e.pacienteId === pac.id);
  const citasPac = citas.filter((c) => c.paciente === pac.nombre).sort((a, b) => b.fecha.localeCompare(a.fecha));

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "general", label: "Datos generales" },
    { key: "notas", label: "Notas clínicas", count: notasPac.length },
    { key: "evaluaciones", label: "Evaluaciones", count: evalsPac.length },
    { key: "citas", label: "Citas", count: citasPac.length },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#666] mb-5">
        <Link href="/admin/pacientes" className="hover:text-[#1A56A0] transition-colors">Pacientes</Link>
        <span className="text-gray-300">/</span>
        <span className="text-[#0C2B60] font-semibold truncate">{pac.nombre}</span>
      </div>

      {/* Patient header card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="h-1.5 bg-gradient-to-r from-[#1A56A0] to-[#2D6CC0]" />
        <div className="p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md">
              {pac.nombre.split(" ")[0][0]}{pac.nombre.split(" ")[1]?.[0] ?? ""}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-black text-[#0C2B60]">{pac.nombre}</h1>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${estadoStyle[pac.estado]}`}>
                  {pac.estado === "activo" ? "Activo" : pac.estado === "pausado" ? "Pausa" : "Pasivo"}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${riesgoStyle[pac.riesgoAbandono]}`}>
                  Riesgo {pac.riesgoAbandono}
                </span>
              </div>
              <p className="text-[#666] text-sm mb-3">{pac.motivoConsulta}</p>
              <div className="flex flex-wrap gap-3 text-sm text-[#666]">
                <span>📧 {pac.correo}</span>
                <span>📞 {pac.telefono}</span>
                <span>📍 {pac.direccion}</span>
              </div>
            </div>
            {/* Stats */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              <div className="bg-[#E8F0FB] rounded-xl p-3 text-center min-w-[80px]">
                <div className="text-2xl font-black text-[#1A56A0]">{pac.sesionesRealizadas}</div>
                <div className="text-xs text-[#666]">Sesiones</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center min-w-[80px]">
                <div className="text-sm font-black text-[#0C2B60]">{pac.ultimaSesion}</div>
                <div className="text-xs text-[#666]">Últ. sesión</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              tab === t.key ? "bg-white text-[#1A56A0] shadow-sm" : "text-[#666] hover:text-[#333]"
            }`}>
            {t.label}
            {t.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? "bg-[#E8F0FB] text-[#1A56A0]" : "bg-gray-200 text-[#666]"}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "general" && (
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-black text-[#0C2B60] mb-4">Datos personales</h3>
            <dl className="space-y-3 text-sm">
              {[
                { label: "DNI", val: pac.dni },
                { label: "Edad", val: pac.edad > 0 ? `${pac.edad} años` : "—" },
                { label: "Teléfono", val: pac.telefono },
                { label: "Correo", val: pac.correo },
                { label: "Dirección", val: pac.direccion },
                { label: "Tipo", val: pac.tipo },
                { label: "Fecha de alta", val: pac.fechaAlta },
              ].map(({ label, val }) => (
                <div key={label} className="flex gap-3">
                  <dt className="text-gray-400 font-medium w-28 shrink-0">{label}</dt>
                  <dd className="text-[#0C2B60] font-semibold capitalize">{String(val)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-black text-[#0C2B60] mb-4">Información clínica</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="text-gray-400 font-medium w-28 shrink-0">Psicólogo</dt>
                <dd className="text-[#0C2B60] font-semibold">{psNombre}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-gray-400 font-medium w-28 shrink-0">Especialidad</dt>
                <dd className="text-[#0C2B60] font-semibold">{ps?.especialidad ?? "—"}</dd>
              </div>
            </dl>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400 font-medium mb-2">Motivo de consulta</div>
              <p className="text-sm text-[#333] leading-relaxed bg-gray-50 rounded-xl p-3">{pac.motivoConsulta}</p>
            </div>
          </div>
        </div>
      )}

      {tab === "notas" && (
        <div className="space-y-4">
          {notasPac.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-[#666]">No hay notas clínicas registradas.</div>
          ) : notasPac.map((n) => (
            <div key={n.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-100 bg-gray-50">
                <span className="font-bold text-[#0C2B60] text-sm">Sesión — {n.fecha}</span>
                <span className="text-xs text-gray-400">Nota estructurada (IA)</span>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Texto libre</div>
                  <p className="text-sm text-[#555] leading-relaxed">{n.textoLibre}</p>
                </div>
                <div>
                  <div className="text-xs text-[#1A56A0] font-bold mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" /></svg>
                    Nota SOAP (IA)
                  </div>
                  <pre className="text-xs text-[#555] leading-relaxed whitespace-pre-wrap font-mono bg-[#F8FAFF] rounded-xl p-3 border border-[#E8F0FB]">{n.notaEstructurada}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "evaluaciones" && (
        <div className="space-y-4">
          {evalsPac.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-[#666]">No hay evaluaciones registradas.</div>
          ) : evalsPac.map((ev) => {
            const vals = ev.resultados.filter((v) => v !== null) as number[];
            const max = vals.length > 0 ? Math.max(...vals) : 1;
            return (
              <div key={ev.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-black text-[#0C2B60]">{ev.tipo}</h3>
                    <p className="text-sm text-[#666] mt-1">{ev.interpretacion}</p>
                  </div>
                  <span className="bg-[#E8F0FB] text-[#1A56A0] text-xs font-bold px-3 py-1.5 rounded-xl shrink-0">
                    {ev.fechas.length} mediciones
                  </span>
                </div>
                <div className="flex items-end gap-2 h-24">
                  {ev.fechas.map((f, i) => {
                    const v = ev.resultados[i];
                    const pct = v !== null ? (v / (max || 1)) * 100 : 0;
                    return (
                      <div key={f} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-[#1A56A0]">{v ?? "—"}</span>
                        <div className="w-full rounded-t-lg bg-gradient-to-t from-[#1A56A0] to-[#2D6CC0]"
                          style={{ height: `${pct}%`, minHeight: v !== null ? "6px" : "0" }} />
                        <span className="text-[10px] text-gray-400 text-center">{f.slice(5)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "citas" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {citasPac.length === 0 ? (
            <div className="p-10 text-center text-[#666]">No hay citas registradas.</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{["Fecha", "Hora", "Psicólogo", "Consultorio", "Tipo", "Estado"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold text-[#666] uppercase tracking-wider">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {citasPac.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#0C2B60]">{c.fecha}</td>
                    <td className="px-5 py-3.5"><span className="bg-[#E8F0FB] text-[#1A56A0] font-bold text-xs px-2.5 py-1.5 rounded-lg">{c.hora}</span></td>
                    <td className="px-5 py-3.5 text-sm text-[#333]">{c.psicologo.split(" ").slice(0, 2).join(" ")}</td>
                    <td className="px-5 py-3.5 text-sm text-[#666]">{c.consultorio}</td>
                    <td className="px-5 py-3.5 text-xs text-[#666]">{c.tipo}</td>
                    <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${citaStyle[c.estado]}`}>{c.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
