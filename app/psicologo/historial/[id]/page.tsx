import Link from "next/link";
import pacientes from "@/data/pacientes.json";
import notas from "@/data/notas.json";
import citas from "@/data/citas.json";
import evaluaciones from "@/data/evaluaciones.json";

export default function HistorialPage({ params }: { params: { id: string } }) {
  const paciente = pacientes.find((p) => p.id === params.id);
  if (!paciente) return <div className="p-6 text-[#666666]">Paciente no encontrado.</div>;

  const notasPac = notas.filter((n) => n.pacienteId === params.id).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const citasPac = citas.filter((c) => c.pacienteId === params.id).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const evalsPac = evaluaciones.filter((e) => e.pacienteId === params.id);

  const riesgoConfig: Record<string, string> = {
    bajo: "bg-emerald-100 text-emerald-700",
    medio: "bg-yellow-100 text-yellow-700",
    alto: "bg-red-100 text-red-700",
  };

  const statusStyle: Record<string, string> = {
    confirmada: "bg-blue-100 text-blue-700",
    pendiente: "bg-yellow-100 text-yellow-700",
    completada: "bg-emerald-100 text-emerald-700",
    cancelada: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#666666] mb-6">
        <Link href="/psicologo/pacientes" className="hover:text-[#1A56A0] transition-colors">Mis pacientes</Link>
        <span>/</span>
        <span className="text-dark font-semibold">{paciente.nombre}</span>
      </div>

      {/* Header del paciente */}
      <div className="bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] rounded-3xl p-6 text-white mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-black text-xl border border-white/30">
              {paciente.nombre.split(" ")[0][0]}{paciente.nombre.split(" ")[1][0]}
            </div>
            <div>
              <h1 className="text-2xl font-black">{paciente.nombre}</h1>
              <p className="text-white/70 text-sm">{paciente.edad} años · DNI {paciente.dni}</p>
              <p className="text-white/70 text-sm">{paciente.telefono} · {paciente.correo}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${paciente.estado === "activo" ? "bg-emerald-400/30 text-white border border-white/20" : "bg-white/20 text-white/70"}`}>
              {paciente.estado}
            </span>
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold bg-white/20 text-white border border-white/20`}>
              Riesgo: {paciente.riesgoAbandono}
            </span>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-white/20">
          <div className="text-xs text-white/60 mb-1">Motivo de consulta</div>
          <p className="text-white/90 text-sm">{paciente.motivoConsulta}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: "Sesiones realizadas", val: paciente.sesionesRealizadas },
            { label: "Última sesión", val: paciente.ultimaSesion },
            { label: "Total citas", val: citasPac.length },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <div className="text-lg font-black">{s.val}</div>
              <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Notas clínicas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-dark">Notas de sesión</h2>
            <button className="px-4 py-2 bg-[#1A56A0] text-white font-bold text-xs rounded-xl hover:bg-[#2D6CC0] transition-all hover:-translate-y-0.5">
              + Registrar nota
            </button>
          </div>

          {notasPac.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-[#666666] text-sm">
              No hay notas registradas aún.
            </div>
          ) : notasPac.map((n) => (
            <div key={n.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1A56A0]" />
                  <span className="text-sm font-bold text-dark">Sesión del {n.fecha}</span>
                </div>
                <span className="text-xs text-[#666666]">Nota SOAP</span>
              </div>
              <div className="p-5">
                <div className="mb-3">
                  <div className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-1.5">Observación libre</div>
                  <p className="text-sm text-dark leading-relaxed bg-[#E8F0FB] rounded-xl p-3">{n.textoLibre}</p>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-1.5">Nota estructurada (IA)</div>
                  <pre className="text-xs text-dark whitespace-pre-wrap font-sans leading-relaxed bg-gray-50 rounded-xl p-3 border border-gray-100">
                    {n.notaEstructurada}
                  </pre>
                </div>
              </div>
            </div>
          ))}

          {/* Agentes IA inline */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">🤖</span>
              <h3 className="font-bold text-dark text-sm">Asistentes IA para este paciente</h3>
            </div>
            <div className="flex gap-3">
              <Link href="/psicologo/agentes"
                className="flex-1 py-2.5 bg-[#E8F0FB] text-[#1A56A0] font-bold text-xs rounded-xl hover:bg-[#1A56A0] hover:text-white transition-all text-center">
                Analizar evolución →
              </Link>
              <Link href="/psicologo/agentes"
                className="flex-1 py-2.5 bg-violet-50 text-violet-700 font-bold text-xs rounded-xl hover:bg-violet-600 hover:text-white transition-all text-center">
                Estructurar nota →
              </Link>
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-4">
          {/* Evolución */}
          {evalsPac.map((ev) => (
            <div key={ev.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-dark text-sm mb-3">{ev.tipo}</h3>
              {ev.resultados.filter(Boolean).length > 0 && (
                <div className="flex items-end gap-1 h-16 mb-2">
                  {(ev.resultados.filter((r) => r !== null) as number[]).map((r, i) => {
                    const max = Math.max(...(ev.resultados.filter((r) => r !== null) as number[]));
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                        <div className="text-xs font-bold text-[#1A56A0]">{r}</div>
                        <div className="w-full rounded-t bg-gradient-to-t from-[#1A56A0] to-sky-400"
                          style={{ height: `${(r / max) * 48}px`, minHeight: "4px" }} />
                      </div>
                    );
                  })}
                </div>
              )}
              <p className="text-xs text-[#666666] leading-relaxed">{ev.interpretacion}</p>
            </div>
          ))}

          {/* Historial de citas */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-dark text-sm mb-3">Historial de citas</h3>
            <div className="space-y-2">
              {citasPac.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-xs font-semibold text-dark">{c.fecha}</div>
                    <div className="text-xs text-[#666666]">{c.hora} · {c.tipo.split(" ")[0]}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle[c.estado]}`}>
                    {c.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Documentos */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-dark text-sm mb-3">Documentos adjuntos</h3>
            <div className="space-y-2">
              {["Anamnesis inicial.pdf", "Evaluación psicológica.pdf"].map((d) => (
                <div key={d} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="text-lg">📄</span>
                  <span className="text-xs text-dark font-medium">{d}</span>
                </div>
              ))}
            </div>
            <button className="mt-2 w-full py-2 border border-dashed border-gray-300 rounded-xl text-xs text-[#666666] hover:border-[#1A56A0] hover:text-[#1A56A0] transition-colors">
              + Adjuntar documento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
