"use client";
import { useState } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false);

  return (
    <>
      <Navbar />

      {/* ═══ LAYOUT SPLIT — Dark info + White form ════════════════════════ */}
      <main className="min-h-screen pt-16 grid lg:grid-cols-2">

        {/* Panel izquierdo — Oscuro */}
        <div className="bg-[#1A56A0] flex flex-col justify-between py-16 px-10 relative overflow-hidden">
          {/* Decorativos */}
          <div className="absolute -left-20 top-1/4 w-64 h-64 rounded-full bg-white opacity-10 pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-48 h-48 rounded-full bg-white opacity-8 translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative">
            <span className="inline-block text-sky-300 text-xs font-bold uppercase tracking-widest mb-6">Contáctanos</span>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
              Estamos aquí<br />para ayudarte
            </h1>
            <p className="text-white/65 text-base leading-relaxed mb-12 max-w-sm">
              Nuestro equipo está disponible de lunes a domingo. No estás solo — un primer paso puede cambiarlo todo.
            </p>

            {/* Info de contacto */}
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">Ubicaciones</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Lima Sur: Av. Guardia Peruana 1216, Chorrillos<br />
                    Lima Centro: Av. Alfonso Ugarte 1228, Breña
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">Correo</p>
                  <p className="text-white/60 text-sm">centropsicologicoemotiva@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">Teléfono</p>
                  <p className="text-white/60 text-sm">981 834 387</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">Horario de atención</p>
                  <p className="text-white/60 text-sm">Lunes a Domingo · 8:00 am – 8:00 pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp button */}
          <div className="relative mt-12">
            <a href="https://wa.me/51981834387" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-all shadow-xl hover:-translate-y-0.5 text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chatear por WhatsApp
            </a>
          </div>
        </div>

        {/* Panel derecho — Formulario */}
        <div className="bg-white py-16 px-8 lg:px-14 flex items-center">
          <div className="max-w-lg w-full mx-auto">
            {enviado ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#0D7C6E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-[#0C2B60] mb-3">¡Mensaje enviado!</h2>
                <p className="text-[#666] text-sm mb-6">Nos comunicaremos contigo a la brevedad posible.</p>
                <button onClick={() => setEnviado(false)}
                  className="px-8 py-3 bg-[#1A56A0] text-white font-bold rounded-full hover:bg-[#2D6CC0] transition-all text-sm">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-black text-[#0C2B60] mb-2">¿Tienes alguna duda?</h2>
                <p className="text-[#999] text-sm mb-8">Cuéntanos en qué podemos ayudarte y te responderemos pronto.</p>

                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setEnviado(true); }}>
                  <div>
                    <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">
                      Nombres y Apellidos <span className="text-red-500">*</span>
                    </label>
                    <input type="text" required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm bg-[#FAFBFF]"
                      placeholder="Tu nombre completo" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">
                      Correo Electrónico <span className="text-red-500">*</span>
                    </label>
                    <input type="email" required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm bg-[#FAFBFF]"
                      placeholder="tu@email.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">
                      Teléfono
                    </label>
                    <input type="tel"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm bg-[#FAFBFF]"
                      placeholder="+51 987 654 321" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">
                      Tu Consulta <span className="text-red-500">*</span>
                    </label>
                    <textarea rows={5} required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all resize-none text-sm bg-[#FAFBFF]"
                      placeholder="¿En qué podemos ayudarte?" />
                  </div>

                  <button type="submit"
                    className="w-full py-4 bg-[#1A56A0] text-white font-bold rounded-full hover:bg-[#2D6CC0] transition-all shadow-lg hover:-translate-y-0.5 text-sm uppercase tracking-wide">
                    Enviar mensaje →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
