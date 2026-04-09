"use client";
import { useState } from "react";
import pacientes from "@/data/pacientes.json";

const misPacientes = pacientes.filter((p) => p.psicologoId === "ps1");

const respuestasSimuladas: Record<string, string> = {
  evolucion: `**Análisis de evolución clínica — Ana García López**

📊 **Resumen de progreso (8 sesiones)**
La paciente muestra una **mejora significativa** en los indicadores principales:

• **Ansiedad (GAD-7)**: Reducción de 18 → 7 puntos (severidad: de severa a leve)
• **Depresión (PHQ-9)**: Reducción de 12 → 5 puntos (de moderada a mínima)
• **Autoregulación emocional**: Mejoría notable en aplicación de técnicas

🎯 **Patrones identificados**
- Episodios de ansiedad relacionados principalmente con entorno laboral
- Pensamientos automáticos negativos en proceso de reestructuración exitosa
- Fortalecimiento progresivo de estrategias de afrontamiento

⚡ **Recomendaciones**
Continuar con fase 3 del proceso cognitivo-conductual. Considerar reducción gradual de frecuencia de sesiones en próximas 4-6 semanas si el progreso se mantiene.`,

  abandono: `**Reporte de Riesgo de Abandono — Mis Pacientes**

🔴 **Alto riesgo**
• **Carlos Mendoza Riva** — Última sesión: 20 Mar 2026 (19 días)
  Indicadores: irregular asistencia, cancelación previa, depresión severa sin tratamiento estabilizado

⚠️ **Riesgo medio**
• **Miguel Torres Cueva** — Última sesión: 1 Abr 2026 (7 días)
  Indicadores: familia con baja adherencia, dificultades logísticas

🟢 **Bajo riesgo**
• **Ana García López** — Asistencia regular, alta motivación
• **Valeria Huanca Soto** — Progreso consistente, buena alianza terapéutica

💡 **Acciones sugeridas**: Contactar proactivamente a Carlos Mendoza. Confirmar cita de Miguel Torres.`,

  nota: `**Nota clínica estructurada (SOAP)**

**S — SUBJETIVO:**
Paciente refiere disminución en intensidad de episodios de ansiedad durante la semana (frecuencia: 3 vs 7 episodios previos). Aplicó técnicas de respiración diafragmática con resultado positivo en 2 ocasiones. Verbaliza sentirse "más en control". Persisten pensamientos automáticos relacionados al entorno laboral.

**O — OBJETIVO:**
Paciente se presenta con apariencia cuidada, actitud relajada y lenguaje corporal abierto. Contacto visual fluido. Discurso coherente, organizado y sin presión del habla. Afecto eutímico con adecuada resonancia.

**A — EVALUACIÓN:**
Progreso favorable en fase 2 del proceso TCC. Consolidación de técnicas de autoregulación emocional. Insight en aumento respecto a distorsiones cognitivas.

**P — PLAN:**
1. Continuar con reestructuración cognitiva (flecha descendente)
2. Asignar registro de pensamientos automáticos como tarea
3. Introducir exposición gradual al entorno laboral en próxima sesión
4. Próxima cita: martes 15 de abril, 09:00`,
};

export default function AgentesIAPage() {
  const [agente, setAgente] = useState<"evolucion" | "abandono" | "nota" | null>(null);
  const [pacSelec, setPacSelec] = useState("pac1");
  const [textoNota, setTextoNota] = useState("");
  const [loading, setLoading] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  const ejecutarAgente = async (tipo: "evolucion" | "abandono" | "nota") => {
    setAgente(tipo);
    setLoading(true);
    setRespuesta("");
    await new Promise((r) => setTimeout(r, 1500));
    setRespuesta(respuestasSimuladas[tipo]);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-dark">Agentes de IA</h1>
        <p className="text-[#666666] text-sm mt-0.5">Asistentes inteligentes para tu práctica clínica</p>
        <div className="mt-2 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Modo prototipo — Respuestas simuladas
        </div>
      </div>

      <div className="space-y-5">
        {/* Agente 1: Análisis de evolución */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F0FB] flex items-center justify-center text-xl shrink-0">📈</div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-dark">Análisis de evolución clínica</h2>
                <p className="text-[#666666] text-sm mt-0.5">Genera un resumen automático de patrones y progreso entre sesiones.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <select value={pacSelec} onChange={(e) => setPacSelec(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-dark focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30">
                {misPacientes.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
              <button onClick={() => ejecutarAgente("evolucion")}
                className="px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all hover:-translate-y-0.5">
                Analizar →
              </button>
            </div>
          </div>
          {agente === "evolucion" && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              {loading ? (
                <div className="flex items-center gap-3 text-[#666666] text-sm">
                  <svg className="w-4 h-4 animate-spin text-[#1A56A0]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analizando historial clínico...
                </div>
              ) : (
                <pre className="text-sm text-dark whitespace-pre-wrap font-sans leading-relaxed">{respuesta}</pre>
              )}
            </div>
          )}
        </div>

        {/* Agente 2: Riesgo de abandono */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl shrink-0">⚠️</div>
              <div className="flex-1">
                <h2 className="font-bold text-dark">Riesgo de abandono terapéutico</h2>
                <p className="text-[#666666] text-sm mt-0.5">Evalúa el riesgo de abandono de todos tus pacientes con nivel alto, medio y bajo.</p>
              </div>
            </div>
            <button onClick={() => ejecutarAgente("abandono")}
              className="px-5 py-2.5 bg-amber-500 text-white font-bold text-sm rounded-xl hover:bg-amber-600 transition-all hover:-translate-y-0.5">
              Evaluar mis pacientes →
            </button>
          </div>
          {agente === "abandono" && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              {loading ? (
                <div className="flex items-center gap-3 text-[#666666] text-sm">
                  <svg className="w-4 h-4 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Evaluando patrones de adherencia...
                </div>
              ) : (
                <pre className="text-sm text-dark whitespace-pre-wrap font-sans leading-relaxed">{respuesta}</pre>
              )}
            </div>
          )}
        </div>

        {/* Agente 3: Estructurar nota */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-xl shrink-0">📝</div>
              <div className="flex-1">
                <h2 className="font-bold text-dark">Estructurar nota clínica</h2>
                <p className="text-[#666666] text-sm mt-0.5">Escribe tus observaciones en texto libre y el agente genera la nota en formato SOAP.</p>
              </div>
            </div>
            <textarea
              value={textoNota}
              onChange={(e) => setTextoNota(e.target.value)}
              rows={4}
              placeholder="Ej: La paciente llegó más tranquila hoy. Aplicó técnicas de respiración durante los episodios de ansiedad del martes. Mejora en autoregulación. Trabajamos pensamientos automáticos negativos sobre el trabajo..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-all resize-none mb-3"
            />
            <button onClick={() => ejecutarAgente("nota")} disabled={textoNota.length < 10}
              className="px-5 py-2.5 bg-violet-600 text-white font-bold text-sm rounded-xl hover:bg-violet-700 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:translate-y-0">
              Estructurar nota SOAP →
            </button>
          </div>
          {agente === "nota" && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              {loading ? (
                <div className="flex items-center gap-3 text-[#666666] text-sm">
                  <svg className="w-4 h-4 animate-spin text-violet-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Estructurando nota en formato SOAP...
                </div>
              ) : (
                <div>
                  <pre className="text-sm text-dark whitespace-pre-wrap font-sans leading-relaxed mb-4">{respuesta}</pre>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#1A56A0] text-white font-bold text-xs rounded-xl hover:bg-[#2D6CC0] transition-colors">
                      Guardar en historial
                    </button>
                    <button onClick={() => setRespuesta("")} className="px-4 py-2 border border-gray-200 text-[#666666] font-semibold text-xs rounded-xl hover:bg-gray-50 transition-colors">
                      Descartar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
