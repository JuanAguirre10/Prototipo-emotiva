"use client";
import { useState } from "react";
import servicios from "@/data/servicios.json";
import psicologos from "@/data/psicologos.json";
import consultorios from "@/data/consultorios.json";
import pacientes from "@/data/pacientes.json";

const pasos = ["Paciente", "Servicio", "Psicólogo", "Fecha/Hora", "Confirmar"];
const horas = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export default function RecepcionNuevaCitaPage() {
  const [paso, setPaso] = useState(0);
  const [modoPac, setModoPac] = useState<"buscar" | "nuevo">("buscar");
  const [pacBusq, setPacBusq] = useState("");
  const [pacSelec, setPacSelec] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoDni, setNuevoDni] = useState("");
  const [servicioSel, setServicioSel] = useState("");
  const [psicoSel, setPsicoSel] = useState("");
  const [consultorioSel, setConsultorioSel] = useState("");
  const [fecha, setFecha] = useState("2026-04-08");
  const [hora, setHora] = useState("");
  const [tipoPago, setTipoPago] = useState("efectivo");
  const [confirmado, setConfirmado] = useState(false);

  const pacientesFiltrados = pacientes.filter((p) => pacBusq.length > 1 && p.nombre.toLowerCase().includes(pacBusq.toLowerCase()));
  const pacNombre = pacSelec ? pacientes.find((p) => p.id === pacSelec)?.nombre : nuevoNombre;
  const servNombre = servicios.find((s) => s.id === servicioSel)?.nombre;
  const psicoNombre = psicologos.find((p) => p.id === psicoSel)?.nombre;
  const consNombre = consultorios.find((c) => c.id === consultorioSel)?.nombre;

  if (confirmado) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 bg-[#0D7C6E] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-dark mb-2">¡Cita registrada!</h2>
        <p className="text-[#666666] mb-6">La cita fue creada correctamente en el sistema.</p>
        <div className="bg-[#E8F0FB] rounded-2xl p-5 text-left space-y-2 mb-6">
          {[
            { l: "Paciente", v: pacNombre },
            { l: "Servicio", v: servNombre },
            { l: "Psicólogo/a", v: psicoNombre },
            { l: "Consultorio", v: consNombre },
            { l: "Fecha", v: fecha },
            { l: "Hora", v: hora },
            { l: "Pago", v: tipoPago },
          ].filter((r) => r.v).map((r) => (
            <div key={r.l} className="flex justify-between text-sm">
              <span className="text-[#666666]">{r.l}</span>
              <span className="font-semibold text-dark capitalize">{r.v}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setConfirmado(false); setPaso(0); setPacSelec(""); setServicioSel(""); setPsicoSel(""); setHora(""); }}
          className="px-6 py-3 bg-[#1A56A0] text-white font-bold rounded-xl hover:bg-[#2D6CC0] transition-colors">
          Nueva cita
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-dark">Nueva cita</h1>
        <p className="text-[#666666] text-sm mt-0.5">Registro interno con opciones extendidas</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8 overflow-x-auto pb-1">
        {pasos.map((p, i) => (
          <div key={p} className="flex items-center">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all ${i < paso ? "bg-[#0D7C6E] border-[#0D7C6E] text-white" : i === paso ? "bg-[#1A56A0] border-[#1A56A0] text-white" : "bg-white border-gray-200 text-[#666666]"}`}>
                {i < paso ? "✓" : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap ${i === paso ? "text-[#1A56A0] font-bold" : "text-[#666666]"}`}>{p}</span>
            </div>
            {i < pasos.length - 1 && <div className={`h-0.5 w-8 mx-1 ${i < paso ? "bg-[#0D7C6E]" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {/* Paso 0: Paciente */}
        {paso === 0 && (
          <div>
            <h2 className="font-bold text-dark mb-4">¿Quién es el paciente?</h2>
            <div className="flex gap-2 mb-4">
              {(["buscar", "nuevo"] as const).map((m) => (
                <button key={m} onClick={() => setModoPac(m)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${modoPac === m ? "bg-[#1A56A0] text-white" : "bg-gray-100 text-[#666666] hover:bg-gray-200"}`}>
                  {m === "buscar" ? "Paciente existente" : "Paciente nuevo"}
                </button>
              ))}
            </div>
            {modoPac === "buscar" ? (
              <div>
                <input type="text" value={pacBusq} onChange={(e) => setPacBusq(e.target.value)} placeholder="Buscar por nombre..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] mb-2" />
                {pacientesFiltrados.length > 0 && (
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    {pacientesFiltrados.map((p) => (
                      <button key={p.id} onClick={() => { setPacSelec(p.id); setPacBusq(p.nombre); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors ${pacSelec === p.id ? "bg-[#E8F0FB]" : ""}`}>
                        <span className="font-semibold text-dark">{p.nombre}</span>
                        <span className="text-[#666666] ml-2">DNI: {p.dni}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Nombre completo</label>
                  <input type="text" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">DNI</label>
                  <input type="text" value={nuevoDni} onChange={(e) => setNuevoDni(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]" />
                </div>
              </div>
            )}
            <div className="flex justify-end mt-5">
              <button onClick={() => setPaso(1)} disabled={!pacSelec && !nuevoNombre}
                className="px-6 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl disabled:opacity-40 hover:bg-[#2D6CC0] transition-colors">
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Paso 1: Servicio */}
        {paso === 1 && (
          <div>
            <h2 className="font-bold text-dark mb-4">Tipo de servicio</h2>
            <div className="grid grid-cols-2 gap-3">
              {servicios.map((s) => (
                <button key={s.id} onClick={() => setServicioSel(s.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all ${servicioSel === s.id ? "border-[#1A56A0] bg-[#E8F0FB]" : "border-gray-100 hover:border-gray-200"}`}>
                  <div className="text-2xl mb-1">{s.icono}</div>
                  <div className="font-semibold text-dark text-sm">{s.nombre}</div>
                  <div className="text-[#1A56A0] text-xs font-bold mt-0.5">{s.precio.split(" - ")[0]}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-5">
              <button onClick={() => setPaso(0)} className="px-5 py-2.5 border-2 border-gray-200 text-[#666666] font-semibold text-sm rounded-xl hover:bg-gray-50">← Atrás</button>
              <button onClick={() => setPaso(2)} disabled={!servicioSel}
                className="px-6 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl disabled:opacity-40 hover:bg-[#2D6CC0] transition-colors">
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Psicólogo + Consultorio */}
        {paso === 2 && (
          <div>
            <h2 className="font-bold text-dark mb-4">Psicólogo y consultorio</h2>
            <div className="space-y-3 mb-4">
              {psicologos.map((p) => (
                <button key={p.id} onClick={() => setPsicoSel(p.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${psicoSel === p.id ? "border-[#1A56A0] bg-[#E8F0FB]" : "border-gray-100 hover:border-gray-200"}`}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {p.nombre.split(" ")[1][0]}{p.nombre.split(" ")[2][0]}
                  </div>
                  <div>
                    <div className="font-semibold text-dark text-sm">{p.nombre}</div>
                    <div className="text-[#666666] text-xs">{p.especialidad}</div>
                  </div>
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Consultorio</label>
              <div className="grid grid-cols-2 gap-2">
                {consultorios.map((c) => (
                  <button key={c.id} onClick={() => setConsultorioSel(c.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${consultorioSel === c.id ? "border-[#1A56A0] bg-[#E8F0FB]" : "border-gray-100 hover:border-gray-200"} ${c.estado === "ocupado" ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={c.estado === "ocupado"}>
                    <div className="text-sm font-bold text-dark">{c.nombre}</div>
                    <div className={`text-xs capitalize ${c.estado === "disponible" ? "text-emerald-600" : "text-yellow-600"}`}>{c.estado.replace("_", " ")}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <button onClick={() => setPaso(1)} className="px-5 py-2.5 border-2 border-gray-200 text-[#666666] font-semibold text-sm rounded-xl hover:bg-gray-50">← Atrás</button>
              <button onClick={() => setPaso(3)} disabled={!psicoSel || !consultorioSel}
                className="px-6 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl disabled:opacity-40 hover:bg-[#2D6CC0] transition-colors">
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Fecha y hora */}
        {paso === 3 && (
          <div>
            <h2 className="font-bold text-dark mb-4">Fecha y hora</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-dark mb-1.5">Fecha</label>
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0]" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-dark mb-2">Hora disponible</label>
              <div className="flex flex-wrap gap-2">
                {horas.map((h) => (
                  <button key={h} onClick={() => setHora(h)}
                    className={`px-4 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all ${hora === h ? "border-[#1A56A0] bg-[#E8F0FB] text-[#1A56A0]" : "border-gray-200 text-[#666666] hover:border-gray-300"}`}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Tipo de pago</label>
              <div className="flex gap-2">
                {["efectivo", "transferencia", "yape"].map((t) => (
                  <button key={t} onClick={() => setTipoPago(t)}
                    className={`px-4 py-2 rounded-xl border-2 font-semibold text-sm capitalize transition-all ${tipoPago === t ? "border-[#1A56A0] bg-[#E8F0FB] text-[#1A56A0]" : "border-gray-200 text-[#666666] hover:border-gray-300"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <button onClick={() => setPaso(2)} className="px-5 py-2.5 border-2 border-gray-200 text-[#666666] font-semibold text-sm rounded-xl hover:bg-gray-50">← Atrás</button>
              <button onClick={() => setPaso(4)} disabled={!fecha || !hora}
                className="px-6 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl disabled:opacity-40 hover:bg-[#2D6CC0] transition-colors">
                Revisar →
              </button>
            </div>
          </div>
        )}

        {/* Paso 4: Confirmar */}
        {paso === 4 && (
          <div>
            <h2 className="font-bold text-dark mb-5">Confirmar cita</h2>
            <div className="bg-[#E8F0FB] rounded-2xl p-5 space-y-3 mb-5">
              {[
                { l: "Paciente", v: pacNombre },
                { l: "Servicio", v: servNombre },
                { l: "Psicólogo/a", v: psicoNombre },
                { l: "Consultorio", v: consNombre },
                { l: "Fecha", v: fecha },
                { l: "Hora", v: hora },
                { l: "Modalidad pago", v: tipoPago },
              ].filter((r) => r.v).map((r) => (
                <div key={r.l} className="flex justify-between text-sm py-1 border-b border-[#1A56A0]/10 last:border-0">
                  <span className="text-[#666666]">{r.l}</span>
                  <span className="font-semibold text-dark capitalize">{r.v}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setPaso(3)} className="px-5 py-2.5 border-2 border-gray-200 text-[#666666] font-semibold text-sm rounded-xl hover:bg-gray-50">← Atrás</button>
              <button onClick={() => setConfirmado(true)}
                className="px-6 py-2.5 bg-[#0D7C6E] text-white font-bold text-sm rounded-xl hover:bg-[#0a6459] transition-all shadow-md hover:-translate-y-0.5">
                ✓ Registrar cita
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
