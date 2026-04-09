import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import AnimateIn from "@/components/public/AnimateIn";
import psicologos from "@/data/psicologos.json";

export default function EquipoPage() {
  return (
    <>
      <Navbar />

      {/* ═══ HERO — Fotos circulares flanqueando el título ════════════════════ */}
      <section className="pt-16 bg-[#1A56A0] relative overflow-hidden pb-28">
        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-12">

            {/* Foto izquierda */}
            <AnimateIn animation="fade-right" className="hidden lg:block">
              <div className="relative w-[286px] h-[286px] sm:w-[330px] sm:h-[330px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shrink-0">
                <Image src="/images/staff-equipo2.png" alt="Staff Emotiva" fill className="object-cover" priority />
              </div>
            </AnimateIn>

            {/* Centro — texto */}
            <AnimateIn animation="fade-up" className="text-center flex-1">
              <span className="inline-block text-sky-300 text-xs font-bold uppercase tracking-widest mb-5">Centro Psicológico Emotiva</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
                Un equipo,<br />una misión
              </h1>
              <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
                Profesionales comprometidos con transformar vidas a través de la psicología, la empatía y el compromiso social.
              </p>
            </AnimateIn>

            {/* Foto derecha */}
            <AnimateIn animation="fade-left" className="hidden lg:block">
              <div className="relative w-[286px] h-[286px] sm:w-[330px] sm:h-[330px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shrink-0">
                <Image src="/images/equipo.png" alt="Equipo Emotiva" fill className="object-cover" />
              </div>
            </AnimateIn>
          </div>

          {/* Fotos visibles en mobile */}
          <div className="flex justify-center gap-4 mt-8 lg:hidden">
            <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
              <Image src="/images/staff-equipo2.png" alt="Staff Emotiva" fill className="object-cover" priority />
            </div>
            <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
              <Image src="/images/equipo.png" alt="Equipo Emotiva" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DESCRIPCIÓN DEL EQUIPO ════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimateIn animation="fade-up">
            <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-4">¿Quiénes somos?</span>
            <h2 className="text-3xl font-black text-[#0C2B60] mb-5">Una misma pasión</h2>
            <p className="text-[#555] text-base leading-relaxed mb-4">
              Cada miembro de nuestro equipo comparte la misma pasión por generar un impacto positivo. Trabajamos con empatía, compromiso y profesionalismo, asegurando que cada niño, adolescente y adulto que acude a nosotros reciba el apoyo que necesita para crecer, aprender y superar sus desafíos emocionales.
            </p>
            <p className="text-[#555] text-base leading-relaxed">
              Nuestro equipo no solo brinda servicios, sino que también se capacita continuamente para estar a la vanguardia en técnicas y estrategias psicológicas, asegurando un enfoque integral y actualizado en cada intervención.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ CARDS DE PSICÓLOGOS ════════════════════════════════════════════ */}
      <section className="py-16 bg-[#F8FAFF]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="text-center mb-12">
            <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-3">Equipo clínico</span>
            <h2 className="text-3xl font-black text-[#0C2B60]">Nuestros psicólogos</h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-6">
            {psicologos.map((p, i) => (
              <AnimateIn key={p.id} animation="fade-up" delay={i * 100}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                  {/* Barra de color en la parte superior */}
                  <div className="h-1.5 bg-gradient-to-r from-[#1A56A0] to-[#2D6CC0]" />
                  <div className="p-7">
                    <div className="flex items-start gap-5 mb-4">
                      {/* Avatar con iniciales */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md">
                        {p.nombre.split(" ")[1]?.[0] ?? ""}{p.nombre.split(" ")[2]?.[0] ?? ""}
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-[#0C2B60]">{p.nombre}</h2>
                        <span className="inline-block mt-1 bg-[#EEF4FF] text-[#1A56A0] text-xs font-bold px-3 py-1 rounded-full">
                          {p.especialidad}
                        </span>
                        <p className="text-[#bbb] text-xs mt-1.5">{p.colegiatura}</p>
                      </div>
                    </div>

                    <p className="text-[#666] text-sm leading-relaxed mb-5 border-l-2 border-[#EEF4FF] pl-4">{p.descripcion}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#1A56A0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <span className="text-[#666]">{p.formacion}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#1A56A0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span className="text-[#666]">Enfoque: <strong className="text-[#0C2B60]">{p.enfoque}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateIn animation="fade-up">
            <div className="relative bg-gradient-to-br from-[#0C2B60] to-[#1A56A0] rounded-3xl overflow-hidden px-10 py-12">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <p className="text-sky-300 font-semibold text-sm mb-2">¿Eres psicólogo/a?</p>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                    Únete a nuestro equipo y ayuda<br className="hidden md:block" /> a transformar vidas
                  </h2>
                </div>
                <div className="shrink-0">
                  <Link href="/unete"
                    className="block bg-white text-[#1A56A0] font-bold text-sm text-center px-8 py-4 rounded-xl hover:bg-[#E8F0FB] transition-all shadow-lg whitespace-nowrap hover:-translate-y-0.5">
                    Postular ahora →
                  </Link>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
