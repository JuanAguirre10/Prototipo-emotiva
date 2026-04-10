"use client";
import { useState } from "react";
import videoconsultas from "@/data/videoconsultas.json";

const estadoConfig: Record<string, { label: string; cls: string; barColor: string }> = {
  programada: { label: "Programada", cls: "bg-blue-100 text-blue-700", barColor: "from-[#1A56A0] to-[#2D6CC0]" },
  completada:  { label: "Completada",  cls: "bg-emerald-100 text-emerald-700", barColor: "from-emerald-500 to-teal-500" },
  cancelada:   { label: "Cancelada",   cls: "bg-red-100 text-red-700",         barColor: "from-red-400 to-rose-500" },
};

const proximas = videoconsultas
  .filter((v) => v.estado === "programada")
  .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));

const historial = videoconsultas
  .filter((v) => v.estado !== "programada")
  .sort((a, b) => b.fecha.localeCompare(a.fecha));

function initials(nombre: string) {
  const p = nombre.split(" ");
  return (p[0]?.[0] ?? "") + (p[1]?.[0] ?? "");
}

export default function AdminVideoconsultaPage() {
  const [sesionActiva, setSesionActiva] = useState<typeof proximas[number] | null>(proximas[0] ?? null);
  const [copied, setCopied] = useState(false);

  const roomName = sesionActiva ? `emotiva-sesion-${sesionActiva.id}` : "emotiva-sala-general";
  const jitsiUrl = `https://meet.jit.si/${roomName}`;

  const copyLink = () => {
    navigator.clipboard.writeText(jitsiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col">

      {/* ── Barra superior ── */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Telepsicología activa
          </div>
          {sesionActiva ? (
            <span className="text-sm text-[#666]">
              {sesionActiva.paciente} · {sesionActiva.fecha} · {sesionActiva.hora}
            </span>
          ) : (
            <span className="text-sm text-[#999]">Sin sesión confirmada</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {proximas.length > 1 && (
            <select
              className="text-xs border border-gray-200 rounded-xl px-3 py-2 text-[#444] focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30"
              value={sesionActiva?.id ?? ""}
              onChange={(e) => setSesionActiva(proximas.find((v) => v.id === e.target.value) ?? null)}
            >
              {proximas.map((v) => (
                <option key={v.id} value={v.id}>{v.paciente} — {v.fecha} {v.hora}</option>
              ))}
            </select>
          )}
          <button onClick={copyLink}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-[#444] text-xs font-semibold rounded-xl hover:border-[#1A56A0] hover:text-[#1A56A0] transition-all">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? "¡Copiado!" : "Copiar enlace"}
          </button>
          <a href={jitsiUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1A56A0] text-white text-xs font-bold rounded-xl hover:bg-[#2D6CC0] transition-all">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Abrir fuera
          </a>
        </div>
      </div>

      {/* ── Aviso iframe ── */}
      <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200 shrink-0">
        <p className="text-xs text-amber-700">
          <strong>Nota:</strong> Esta videoconsulta funciona con integración básica de Jitsi. Si el iframe se queda en blanco o carga mal, usa <strong>Abrir fuera</strong>. La sala queda asociada a la cita.
        </p>
      </div>

      {/* ── Jitsi iframe ── */}
      <iframe
        key={roomName}
        src={`${jitsiUrl}#config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=false&userInfo.displayName=Dr.+Emotiva&config.toolbarButtons=["microphone","camera","desktop","chat","participants-pane","tileview","fullscreen","hangup"]`}
        className="w-full border-0 shrink-0"
        style={{ height: "calc(100vh - 160px)" }}
        allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write"
        allowFullScreen
        title="Videoconsulta Emotiva"
      />

      {/* ── Sesiones programadas ── */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-black text-[#666] uppercase tracking-widest">Próximas sesiones</h2>
          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {proximas.length} programadas
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {proximas.map((v) => {
            const cfg = estadoConfig[v.estado];
            const isActive = sesionActiva?.id === v.id;
            return (
              <div key={v.id}
                className={`bg-white rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden ${isActive ? "border-[#1A56A0] ring-2 ring-[#1A56A0]/20" : "border-gray-100"}`}>
                <div className={`h-1.5 bg-gradient-to-r ${cfg.barColor}`} />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-black text-sm shrink-0">
                      {initials(v.paciente).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-[#0C2B60] text-sm truncate">{v.paciente}</div>
                      <div className="text-xs text-[#666] truncate">{v.psicologo.split(" ").slice(0, 2).join(" ")}</div>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${cfg.cls}`}>{cfg.label}</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-[10px] text-gray-400 font-medium uppercase">Fecha</div>
                      <div className="text-sm font-black text-[#0C2B60]">{v.fecha}</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <div className="text-[10px] text-gray-400 font-medium uppercase">Hora</div>
                      <div className="text-sm font-black text-[#1A56A0]">{v.hora}</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <div className="text-[10px] text-gray-400 font-medium uppercase">Duración</div>
                      <div className="text-sm font-black text-[#0C2B60]">{v.duracion} min</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSesionActiva(v); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-full py-3 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${isActive ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-[#1A56A0] hover:bg-[#2D6CC0] text-white"}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {isActive ? "En sesión activa" : "Unirse a sesión"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Historial ── */}
        <h2 className="text-xs font-black text-[#666] uppercase tracking-widest mb-3">Historial de sesiones</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Paciente", "Psicólogo", "Fecha", "Hora", "Duración", "Estado", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-[#666] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {historial.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                        {initials(v.paciente).toUpperCase()}
                      </div>
                      <span className="font-semibold text-[#0C2B60] text-sm">{v.paciente}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#666]">{v.psicologo.split(" ").slice(0, 2).join(" ")}</td>
                  <td className="px-5 py-4 text-sm text-[#666]">{v.fecha}</td>
                  <td className="px-5 py-4">
                    <span className="bg-[#E8F0FB] text-[#1A56A0] font-bold text-xs px-2.5 py-1 rounded-lg">{v.hora}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#666]">{v.duracion} min</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoConfig[v.estado].cls}`}>
                      {estadoConfig[v.estado].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-xs font-semibold text-[#1A56A0] hover:underline">Ver resumen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
