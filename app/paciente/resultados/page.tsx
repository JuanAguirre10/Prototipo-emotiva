import evaluaciones from "@/data/evaluaciones.json";

const misEvals = evaluaciones.filter((e) => e.pacienteId === "pac1");

export default function PacienteResultadosPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-dark">Mis Resultados</h1>
        <p className="text-[#666666] text-sm mt-0.5">Evolución de tus evaluaciones psicológicas</p>
      </div>

      {/* Evaluaciones */}
      <div className="space-y-5 mb-8">
        {misEvals.map((ev) => {
          const resultados = ev.resultados.filter((r) => r !== null) as number[];
          const max = Math.max(...resultados, 1);
          const ultimo = resultados[resultados.length - 1];
          const primero = resultados[0];
          const mejora = primero > ultimo;

          return (
            <div key={ev.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <h2 className="font-bold text-dark">{ev.tipo}</h2>
                {resultados.length > 1 && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${mejora ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                    {mejora ? `↓ Mejora (${primero} → ${ultimo})` : `↑ Aumento (${primero} → ${ultimo})`}
                  </span>
                )}
              </div>

              {resultados.length > 0 ? (
                <>
                  {/* Gráfica */}
                  <div className="flex items-end gap-2 h-20 mb-3">
                    {resultados.map((r, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="text-xs font-bold text-[#1A56A0]">{r}</div>
                        <div className="w-full rounded-t-lg transition-all"
                          style={{
                            height: `${(r / max) * 56}px`,
                            minHeight: "4px",
                            background: i === resultados.length - 1
                              ? mejora ? "#0D7C6E" : "#C0392B"
                              : "#1A56A0",
                          }} />
                        <div className="text-xs text-[#666666] truncate w-full text-center">
                          {ev.fechas[i]?.split("-")[2]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-[#666666] leading-relaxed bg-gray-50 rounded-xl p-3">{ev.interpretacion}</p>
                </>
              ) : (
                <p className="text-sm text-[#666666]">{ev.interpretacion}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Documentos compartidos */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-dark text-sm mb-4">Documentos compartidos por tu psicólogo/a</h3>
        <div className="space-y-2">
          {["Informe de evolución — Sesión 6.pdf", "Material de técnicas de respiración.pdf", "Registro de pensamientos automáticos.pdf"].map((d) => (
            <div key={d} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
              <span className="text-xl">📄</span>
              <span className="text-sm text-dark font-medium flex-1">{d}</span>
              <button className="text-xs font-semibold text-[#1A56A0] hover:underline shrink-0">Ver</button>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#666666] mt-3">Solo puedes ver los documentos que tu psicólogo/a ha compartido contigo.</p>
      </div>
    </div>
  );
}
