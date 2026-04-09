import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import AnimateIn from "@/components/public/AnimateIn";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-16">
        {/* Gradient background blob */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF4FF] via-white to-white pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#E8F0FB] opacity-60 translate-x-1/3 -translate-y-1/4 pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[88vh]">

            {/* Texto */}
            <AnimateIn animation="fade-left" className="py-12 lg:py-0 z-10">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 bg-[#E8F0FB] text-[#1A56A0] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#1A56A0] animate-pulse" />
                Centro Psicológico — Lima, Perú
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0C2B60] leading-[1.05] mb-6">
                Transforma<br />
                tu{" "}
                <span className="relative inline-block">
                  <span className="text-[#1A56A0]">bienestar</span>
                  <svg className="absolute -bottom-2 left-0 w-full overflow-visible" viewBox="0 0 300 10" fill="none" preserveAspectRatio="none">
                    <path d="M2,6 C50,1 100,9 150,5 C200,1 250,9 298,4" stroke="#1A56A0" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />
                  </svg>
                </span>
                <br />emocional
              </h1>

              <p className="text-[#666] text-lg leading-relaxed mb-8 max-w-md">
                Somos más de 35 voluntarios unidos para hacer que la psicología sea accesible para todos — niños, adolescentes y familias.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/51981834387" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A56A0] text-white font-bold rounded-full hover:bg-[#2D6CC0] transition-all shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-widest">
                  Pre-evaluación gratis
                </a>
                <a href="/servicios"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1A56A0] text-[#1A56A0] font-bold rounded-full hover:bg-[#EEF4FF] transition-all text-sm">
                  Ver servicios →
                </a>
              </div>

              {/* Mini stats */}
            </AnimateIn>

            {/* Imagen */}
            <AnimateIn animation="zoom-in" className="relative flex justify-center lg:justify-end items-center">
              {/* Círculo grande azul con foto */}
              <div className="relative w-[418px] h-[418px] sm:w-[506px] sm:h-[506px] lg:w-[572px] lg:h-[572px]">
                <div className="absolute inset-0 rounded-full bg-[#1A56A0]" />
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image src="/images/hero-nina.png" alt="Niña — Centro Psicológico Emotiva" fill className="object-cover object-center" priority />
                </div>
                {/* Badge flotante */}
                <div className="absolute -bottom-3 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#0D7C6E] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#0C2B60]">+25,000</div>
                    <div className="text-[10px] text-[#999]">familias ayudadas</div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ═══ POR QUÉ EMOTIVA ════════════════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <AnimateIn animation="zoom-in" className="flex justify-center">
              <div className="relative w-[396px] h-[396px] sm:w-[484px] sm:h-[484px]">
                <div className="absolute -left-8 -bottom-8 w-[200px] h-[200px] opacity-25 pointer-events-none select-none">
                  <Image src="/images/bg-deco.png" alt="" width={200} height={200} aria-hidden />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#1A56A0]" />
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image src="/images/impacto-familias.png" alt="Impacto en familias — Emotiva" fill className="object-cover" />
                </div>
              </div>
            </AnimateIn>

            <AnimateIn animation="fade-right">
              <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-4">¿Por qué elegirnos?</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0C2B60] mb-5 leading-tight">
                El centro EMOTIVA: psicología para todos
              </h2>
              <p className="text-[#666] text-base leading-relaxed mb-8">
                Hemos acompañado a más de 25,000 familias logrando un impacto real en su bienestar emocional y psicoeducativo, eliminando las barreras económicas que separan a las personas del apoyo que merecen.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Atención accesible", desc: "Servicios asequibles y gratuitos para quienes más lo necesitan." },
                  { title: "Equipo certificado", desc: "Psicólogos colegiados con formación continua y supervisión clínica." },
                  { title: "Atención integral", desc: "Niños, adolescentes, adultos y familias en un solo lugar." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#1A56A0] flex items-center justify-center mt-0.5 shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-[#0C2B60] text-sm">{item.title}: </span>
                      <span className="text-[#666] text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ═══ SERVICIOS ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFF] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#E8F0FB] opacity-80 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-48 h-48 rounded-full bg-[#E8F0FB] opacity-80 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-3">Lo que ofrecemos</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0C2B60] leading-tight">
              Apoyo psicológico para cada etapa de tu vida
            </h2>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Terapia individual",
                desc: "Terapia conductual, emocional, de lenguaje y ocupacional para niños, adolescentes y adultos.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: "Terapia de pareja / familiar",
                desc: "Fortalecemos los vínculos familiares con técnicas efectivas y terapias adaptadas a parejas.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: "Talleres grupales",
                desc: "Fomentamos habilidades sociales, autoestima, y manejo emocional en cada etapa de la vida.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
              },
              {
                title: "Charlas educativas",
                desc: "Tratamos temas clave sobre salud mental, estrés y prevención de violencia familiar y social.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
              },
            ].map((s, i) => (
              <AnimateIn key={s.title} animation="fade-up" delay={i * 80}>
                <div className="bg-white rounded-2xl p-7 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border border-gray-100">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center text-[#1A56A0] mb-5 group-hover:bg-[#1A56A0] group-hover:text-white transition-all duration-300">
                    {s.icon}
                  </div>
                  <h3 className="text-base font-black text-[#0C2B60] mb-2">{s.title}</h3>
                  <p className="text-[#777] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn animation="fade-up" className="text-center mt-10">
            <a href="/servicios" className="inline-block px-8 py-3.5 border-2 border-[#1A56A0] text-[#1A56A0] font-bold rounded-full hover:bg-[#1A56A0] hover:text-white transition-all text-sm">
              Ver todos los servicios →
            </a>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ EQUIPO ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <AnimateIn animation="fade-left">
              <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-4">Más de 35 voluntarios activos</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0C2B60] mb-3 leading-tight">
                Un equipo, una familia
              </h2>
              <p className="text-[#666] leading-relaxed text-base mb-8">
                Contamos con un equipo altamente capacitado de psicólogos, voluntarios y especialistas que comparten la pasión por el cambio. Trabajamos con empatía, compromiso y profesionalismo para generar un impacto positivo en cada persona.
              </p>
              <a href="https://wa.me/51987929320" target="_blank" rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-[#1A56A0] text-white font-bold rounded-full hover:bg-[#2D6CC0] transition-all shadow-lg hover:-translate-y-0.5 text-sm">
                Contáctanos
              </a>
            </AnimateIn>

            <AnimateIn animation="zoom-in" className="relative flex justify-center lg:justify-end">
              <div className="relative w-[396px] h-[396px] sm:w-[484px] sm:h-[484px]">
                <div className="absolute -right-6 -top-6 w-[180px] h-[180px] opacity-25 pointer-events-none select-none">
                  <Image src="/images/bg-deco-2.png" alt="" width={180} height={180} aria-hidden />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#1A56A0]" />
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image src="/images/equipo.png" alt="Equipo del Centro Psicológico Emotiva" fill className="object-cover" />
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ═══ VIDEOS ══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 bg-[#1A56A0] overflow-hidden">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative">
          <AnimateIn animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white">Conoce un poco de Nosotros</h2>
            <p className="text-white/75 mt-3">La Familia EMOTIVA está entregada a sus pacientes, a la comunidad y a su equipo.</p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimateIn animation="fade-left" delay={100}>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/Ay3_6ETEXVA"
                  title="EMOTIVA - RETO RURALIA 2024"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </AnimateIn>
            <AnimateIn animation="fade-right" delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/cW1pKng-irg"
                  title="EMOTIVA - Conectarse para Crecer 2024"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </AnimateIn>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateIn animation="fade-up">
            <div className="relative bg-gradient-to-br from-[#0C2B60] to-[#1A56A0] rounded-3xl overflow-hidden px-10 py-14 text-center">
              {/* Deco */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 -translate-x-1/3 translate-y-1/3" />

              <div className="relative">
                <p className="text-sky-300 font-bold text-sm uppercase tracking-widest mb-3">¡EMOTIVA por ti y para ti!</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                  Conoce nuestros beneficios<br className="hidden md:block" /> gratuitos para ti y tu familia
                </h2>
                <p className="text-white/60 text-base mb-8">Atención de lunes a domingo · Lima Sur y Lima Centro</p>
                <a href="https://wa.me/51981834387" target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-white text-[#1A56A0] font-bold text-sm px-10 py-4 rounded-full hover:bg-[#E8F0FB] transition-all shadow-xl hover:-translate-y-0.5">
                  Agendar cita por WhatsApp →
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
