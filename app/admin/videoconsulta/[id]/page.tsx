"use client";
import { useState } from "react";
import Link from "next/link";
import videoconsultas from "@/data/videoconsultas.json";

export default function SesionVideoPage({ params }: { params: { id: string } }) {
  const session = videoconsultas.find((v) => v.id === params.id);
  const [copied, setCopied] = useState(false);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-60px)]">
        <div className="text-center">
          <p className="font-bold text-[#0C2B60] mb-3">Sesión no encontrada</p>
          <Link href="/admin/videoconsulta" className="text-[#1A56A0] underline text-sm">Volver</Link>
        </div>
      </div>
    );
  }

  const roomName = `emotiva-sesion-${session.id}`;
  const jitsiUrl = `https://meet.jit.si/${roomName}`;

  const copyLink = () => {
    navigator.clipboard.writeText(jitsiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 60px)" }}>

      {/* ── Barra superior ── */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Telepsicología activa
          </div>
          <span className="text-sm text-[#666]">
            {session.paciente} · {session.fecha} · {session.hora}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-[#444] text-xs font-semibold rounded-xl hover:border-[#1A56A0] hover:text-[#1A56A0] transition-all">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? "¡Copiado!" : "Copiar enlace"}
          </button>
          <a
            href={jitsiUrl}
            target="_blank"
            rel="noreferrer"
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
          <strong>Nota:</strong> Esta videoconsulta funciona con integración básica de Jitsi. Si el iframe se queda en blanco o carga mal, usa <strong>Abrir fuera</strong>. La sala queda asociada a la cita cuando accedes desde calendario o dashboard.
        </p>
      </div>

      {/* ── Jitsi iframe ── */}
      <iframe
        src={`${jitsiUrl}#config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=false&userInfo.displayName=Dr.+Emotiva&config.toolbarButtons=["microphone","camera","desktop","chat","participants-pane","tileview","fullscreen","hangup"]`}
        className="flex-1 w-full border-0"
        allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write"
        allowFullScreen
        title="Videoconsulta Emotiva"
      />
    </div>
  );
}
