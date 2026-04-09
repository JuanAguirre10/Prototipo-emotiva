"use client";
import { useState } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import servicios from "@/data/servicios.json";
import psicologos from "@/data/psicologos.json";

const pasos = ["Servicio", "Psicólogo", "Fecha y Hora", "Tus datos", "Confirmar"];
const horas = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
const dias = ["Lun 7 Abr", "Mar 8 Abr", "Mié 9 Abr", "Jue 10 Abr", "Vie 11 Abr"];

export default function ReservarPage() {
  const [paso, setPaso] = useState(0);
  const [selServicio, setSelServicio] = useState("");
  const [selPsicologo, setSelPsicologo] = useState("");
  const [selDia, setSelDia] = useState("");
  const [selHora, setSelHora] = useState("");
  const [confirmado, setConfirmado] = useState(false);
  const [datos, setDatos] = useState({ nombre: "", dni: "", telefono: "", correo: "" });

  const numeroCita = `EMO-2026-${Math.floor(Math.random() * 9000) + 1000}`;
  const psicSeleccionado = psicologos.find((p) => p.id === selPsicologo);
  const servSeleccionado = servicios.find((s) => s.id === selServicio);

  const resetear = () => {
    setConfirmado(false); setPaso(0); setSelServicio(""); setSelPsicologo("");
    setSelDia(""); setSelHora(""); setDatos({ nombre: "", dni: "", telefono: "", correo: "" });
  };

  if (confirmado) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#E8F0FB] to-white flex items-center justify-center pt-20">
          <div className="max-w-lg mx-auto px-4 text-center py-20">
            <div className="w-20 h-20 bg-[#0D7C6E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-[#0C2B60] mb-3">¡Cita reservada!</h1>
            <p className="text-[#666] mb-6">Te enviaremos la confirmación a tu correo. Tu número de cita:</p>
            <div className="bg-[#1A56A0] text-white text-2xl font-black py-4 px-8 rounded-2xl mb-6 inline-block shadow-lg">{numeroCita}</div>
            <div className="bg-white rounded-3xl border border-gray-100 p-7 text-left space-y-3 mb-8 shadow-sm">
              {[
                { label: "Servicio", val: servSeleccionado?.nombre },
                { label: "Psicólogo/a", val: psicSeleccionado?.nombre },
                { label: "Fecha", val: selDia },
                { label: "Hora", val: selHora },
                { label: "Paciente", val: datos.nombre },
              ].map((r) => r.val && (
                <div key={r.label} className="flex justify-between text-sm">
                  <span className="text-[#666]">{r.label}</span>
                  <span className="font-semibold text-[#0C2B60]">{r.val}</span>
                </div>
              ))}
            </div>
            <button onClick={resetear}
              className="px-7 py-3.5 bg-[#1A56A0] text-white font-bold rounded-full hover:bg-[#2D6CC0] transition-all shadow-lg hover:-translate-y-0.5 text-sm">
              Reservar otra cita
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#1A56A0] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-sky-300 font-bold text-sm uppercase tracking-widest mb-4">Reserva online</span>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-5">Reserva tu cita en minutos</h1>
          <p className="text-white/70 text-lg">Proceso simple, claro y sin complicaciones.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Stepper */}
          <div className="flex items-center justify-between mb-12 overflow-x-auto pb-2">
            {pasos.map((p, i) => (
              <div key={p} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${i < paso ? "bg-[#0D7C6E] border-[#0D7C6E] text-white" : i === paso ? "bg-[#1A56A0] border-[#1A56A0] text-white" : "bg-white border-gray-200 text-[#999]"}`}>
                    {i < paso ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${i === paso ? "text-[#1A56A0] font-bold" : "text-[#999]"}`}>{p}</span>
                </div>
                {i < pasos.length - 1 && (
                  <div className={`h-0.5 w-8 sm:w-12 mx-1 rounded-full ${i < paso ? "bg-[#0D7C6E]" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Paso 1: Servicio */}
          {paso === 0 && (
            <div>
              <h2 className="text-xl font-black text-[#0C2B60] mb-6">¿Qué tipo de servicio necesitas?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicios.map((s) => (
                  <button key={s.id} onClick={() => setSelServicio(s.id)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all hover:shadow-md ${selServicio === s.id ? "border-[#1A56A0] bg-[#E8F0FB]" : "border-gray-100 bg-white hover:border-gray-200"}`}>
                    <div className="text-3xl mb-2">{s.icono}</div>
                    <div className="font-bold text-[#0C2B60] text-sm">{s.nombre}</div>
                    <div className="text-[#666] text-xs mt-1">{s.duracion} · {s.precio.split(" - ")[0]}</div>
                  </button>
                ))}
              </div>
              <div className="mt-7 flex justify-end">
                <button onClick={() => setPaso(1)} disabled={!selServicio}
                  className="px-7 py-3.5 bg-[#1A56A0] text-white font-bold rounded-full disabled:opacity-40 hover:bg-[#2D6CC0] transition-all shadow-lg text-sm">
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Paso 2: Psicólogo */}
          {paso === 1 && (
            <div>
              <h2 className="text-xl font-black text-[#0C2B60] mb-6">Elige tu psicólogo/a</h2>
              <div className="space-y-3">
                {psicologos.map((p) => (
                  <button key={p.id} onClick={() => setSelPsicologo(p.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all hover:shadow-md flex items-center gap-4 ${selPsicologo === p.id ? "border-[#1A56A0] bg-[#E8F0FB]" : "border-gray-100 bg-white hover:border-gray-200"}`}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-bold shrink-0">
                      {p.nombre.split(" ")[1][0]}{p.nombre.split(" ")[2][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#0C2B60] text-sm">{p.nombre}</div>
                      <div className="text-[#1A56A0] text-xs">{p.especialidad}</div>
                      <div className="text-[#666] text-xs mt-0.5">{p.enfoque}</div>
                    </div>
                    {selPsicologo === p.id && (
                      <div className="w-5 h-5 rounded-full bg-[#1A56A0] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-7 flex justify-between">
                <button onClick={() => setPaso(0)} className="px-6 py-3 border-2 border-gray-200 text-[#666] font-semibold rounded-full hover:bg-gray-50 transition-all text-sm">← Atrás</button>
                <button onClick={() => setPaso(2)} disabled={!selPsicologo}
                  className="px-7 py-3.5 bg-[#1A56A0] text-white font-bold rounded-full disabled:opacity-40 hover:bg-[#2D6CC0] transition-all shadow-lg text-sm">
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: Fecha y Hora */}
          {paso === 2 && (
            <div>
              <h2 className="text-xl font-black text-[#0C2B60] mb-6">Selecciona fecha y hora</h2>
              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0C2B60] mb-3">Día disponible</p>
                <div className="flex flex-wrap gap-2">
                  {dias.map((d) => (
                    <button key={d} onClick={() => setSelDia(d)}
                      className={`px-4 py-2.5 rounded-full border-2 font-semibold text-sm transition-all ${selDia === d ? "border-[#1A56A0] bg-[#E8F0FB] text-[#1A56A0]" : "border-gray-200 text-[#666] hover:border-gray-300"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0C2B60] mb-3">Hora disponible</p>
                <div className="flex flex-wrap gap-2">
                  {horas.map((h) => (
                    <button key={h} onClick={() => setSelHora(h)}
                      className={`px-4 py-2.5 rounded-full border-2 font-semibold text-sm transition-all ${selHora === h ? "border-[#1A56A0] bg-[#E8F0FB] text-[#1A56A0]" : "border-gray-200 text-[#666] hover:border-gray-300"}`}>
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-7 flex justify-between">
                <button onClick={() => setPaso(1)} className="px-6 py-3 border-2 border-gray-200 text-[#666] font-semibold rounded-full hover:bg-gray-50 transition-all text-sm">← Atrás</button>
                <button onClick={() => setPaso(3)} disabled={!selDia || !selHora}
                  className="px-7 py-3.5 bg-[#1A56A0] text-white font-bold rounded-full disabled:opacity-40 hover:bg-[#2D6CC0] transition-all shadow-lg text-sm">
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Paso 4: Datos */}
          {paso === 3 && (
            <div>
              <h2 className="text-xl font-black text-[#0C2B60] mb-6">Tus datos de contacto</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Nombre completo</label>
                  <input type="text" value={datos.nombre} onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm" placeholder="Tu nombre completo" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">DNI</label>
                  <input type="text" value={datos.dni} onChange={(e) => setDatos({ ...datos, dni: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm" placeholder="12345678" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Teléfono</label>
                  <input type="tel" value={datos.telefono} onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm" placeholder="+51 987 654 321" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Correo electrónico</label>
                  <input type="email" value={datos.correo} onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm" placeholder="tu@email.com" />
                </div>
              </div>
              <div className="mt-7 flex justify-between">
                <button onClick={() => setPaso(2)} className="px-6 py-3 border-2 border-gray-200 text-[#666] font-semibold rounded-full hover:bg-gray-50 transition-all text-sm">← Atrás</button>
                <button onClick={() => setPaso(4)} disabled={!datos.nombre || !datos.correo}
                  className="px-7 py-3.5 bg-[#1A56A0] text-white font-bold rounded-full disabled:opacity-40 hover:bg-[#2D6CC0] transition-all shadow-lg text-sm">
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Paso 5: Confirmar */}
          {paso === 4 && (
            <div>
              <h2 className="text-xl font-black text-[#0C2B60] mb-6">Confirma tu cita</h2>
              <div className="bg-[#E8F0FB] rounded-3xl p-7 mb-6 space-y-4">
                {[
                  { label: "Servicio", val: servSeleccionado?.nombre, icon: "🧠" },
                  { label: "Psicólogo/a", val: psicSeleccionado?.nombre, icon: "👤" },
                  { label: "Fecha", val: selDia, icon: "📅" },
                  { label: "Hora", val: selHora, icon: "🕐" },
                  { label: "Paciente", val: datos.nombre, icon: "✏️" },
                  { label: "Contacto", val: datos.correo, icon: "✉️" },
                ].map((r) => r.val && (
                  <div key={r.label} className="flex items-center gap-3 text-sm">
                    <span className="text-lg">{r.icon}</span>
                    <span className="text-[#666] w-24 shrink-0">{r.label}</span>
                    <span className="font-semibold text-[#0C2B60]">{r.val}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-7 text-sm text-amber-800">
                <strong>Nota:</strong> Recibirás la confirmación en tu correo. Si no puedes asistir, cancela con 24h de anticipación.
              </div>
              <div className="flex justify-between">
                <button onClick={() => setPaso(3)} className="px-6 py-3 border-2 border-gray-200 text-[#666] font-semibold rounded-full hover:bg-gray-50 transition-all text-sm">← Atrás</button>
                <button onClick={() => setConfirmado(true)}
                  className="px-8 py-3.5 bg-[#0D7C6E] text-white font-bold rounded-full hover:bg-[#0a6459] transition-all shadow-lg hover:-translate-y-0.5 text-sm">
                  ✓ Confirmar cita
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
