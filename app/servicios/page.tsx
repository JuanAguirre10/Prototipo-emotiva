import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import AnimateIn from "@/components/public/AnimateIn";

const servicios = [
  {
    title: "Terapia psicológica individual",
    desc: "Apoyo emocional personalizado para niños, adolescentes y adultos.",
    img: "/images/srv-individual.png",
    detail: "Nuestro servicio de terapia individual está orientado a brindar un espacio seguro y confidencial donde niños, adolescentes y adultos puedan explorar sus emociones, superar desafíos y trabajar en su crecimiento personal. Utilizamos técnicas terapéuticas basadas en evidencia para tratar ansiedad, depresión, estrés, dificultades emocionales y otros problemas que afectan la calidad de vida. Cada plan de intervención es adaptado a las necesidades particulares de la persona, fomentando su bienestar integral.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Terapia familiar",
    desc: "Mejoramos la comunicación y los vínculos dentro de tu familia.",
    img: "/images/srv-familiar.png",
    detail: "Nuestra terapia familiar y de pareja está diseñada para fortalecer los vínculos afectivos, mejorar la comunicación y resolver conflictos que afectan la dinámica del hogar. Trabajamos con familias en situaciones de crisis, separación, duelo o dificultades en la crianza, así como con parejas que buscan mejorar su relación o atraviesan momentos difíciles. Nuestro equipo acompaña a cada familia con empatía y sin juicios, promoviendo un ambiente de respeto y entendimiento mutuo para construir relaciones más sanas y duraderas.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Talleres grupales",
    desc: "Espacios seguros para desarrollar habilidades sociales y emocionales.",
    img: "/images/srv-grupales.png",
    detail: "Los talleres grupales de Emotiva son espacios seguros y estructurados donde niños, adolescentes y adultos aprenden a gestionar sus emociones, desarrollar habilidades sociales y fortalecer su autoestima en un entorno de apoyo mutuo. Cada taller está diseñado con metodologías dinámicas y participativas, adaptadas a la etapa de vida de cada grupo. Abordamos temáticas como manejo del estrés, inteligencia emocional, habilidades de comunicación, autoconfianza y prevención de violencia, fomentando el crecimiento personal en comunidad.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Charlas educativas",
    desc: "Talleres sobre salud mental dirigidos a colegios, empresas e instituciones.",
    img: "/images/srv-charlas.png",
    detail: "Las charlas educativas de Emotiva llevan la salud mental a colegios, empresas e instituciones con el objetivo de concientizar, prevenir y promover el bienestar emocional en la comunidad. Nuestros psicólogos desarrollan sesiones dinámicas e interactivas sobre temas como manejo del estrés, prevención del bullying, inteligencia emocional, crianza positiva y salud mental en el trabajo. Estas actividades están diseñadas para generar un impacto real en los participantes, brindándoles herramientas prácticas que pueden aplicar en su vida cotidiana. Nos adaptamos al público y al contexto de cada institución para garantizar una experiencia significativa y transformadora.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export default function ServiciosPage() {
  return (
    <>
      <Navbar />

      {/* ═══ HERO — Dark con wave ════════════════════════════════════════════ */}
      <section className="pt-28 pb-24 bg-[#1A56A0] relative overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-white opacity-10 translate-x-1/2 -translate-y-1/3 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-56 h-56 rounded-full bg-white opacity-8 -translate-x-1/2 translate-y-1/3 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-sky-300 text-xs font-bold uppercase tracking-widest mb-5">Nuestros servicios</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
            Apoyo psicológico<br />para toda tu familia
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto mb-8">
            Atención integral de lunes a domingo · Presencial y online · Lima Sur y Lima Centro
          </p>
          <p className="text-white font-bold text-xs uppercase tracking-widest bg-white/20 border border-white/30 inline-block px-5 py-2 rounded-full mb-10">
            ÚNICO CENTRO CON LÍNEA DE EMERGENCIA · TALLERES GRATUITOS PARA TODOS
          </p>

          {/* Anchors de servicios */}
          <div className="flex flex-wrap justify-center gap-3">
            {servicios.map((s, i) => (
              <a key={s.title} href={`#srv-${i}`}
                className="px-5 py-2.5 bg-white/10 border border-white/20 rounded-full text-white text-sm font-semibold hover:bg-white/20 transition-all hover:-translate-y-0.5">
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ═══ CARDS DE SERVICIOS ════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {servicios.map((s, i) => (
              <AnimateIn key={s.title} animation="fade-up" delay={i * 80}>
                <div className="bg-[#F8FAFF] border border-gray-100 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center text-[#1A56A0] mb-5 group-hover:bg-[#1A56A0] group-hover:text-white transition-all duration-300 shrink-0">
                    {s.icon}
                  </div>
                  <h2 className="text-lg font-black text-[#0C2B60] mb-2">{s.title}</h2>
                  <p className="text-[#666] text-sm leading-relaxed flex-1">{s.desc}</p>
                  <a href={`#srv-${i}`}
                    className="mt-5 inline-block text-center px-6 py-3 bg-[#1A56A0] text-white font-bold rounded-full hover:bg-[#2D6CC0] transition-all text-sm hover:-translate-y-0.5 shadow-md">
                    Ver más →
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DETALLE POR SERVICIO ════════════════════════════════════════════ */}
      <section className="py-12 bg-[#F8FAFF]">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          {servicios.map((s, i) => (
            <AnimateIn key={`detail-${s.title}`} animation={i % 2 === 0 ? "fade-left" : "fade-right"}>
              <div id={`srv-${i}`} className="grid md:grid-cols-2 gap-0 items-center bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`relative ${i % 2 !== 0 ? "md:order-2" : ""}`} style={{ height: "17.6rem" }}>
                  <Image src={s.img} alt={s.title} fill className="object-cover" />
                </div>
                <div className={`p-8 ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#1A56A0] shrink-0">
                      {s.icon}
                    </div>
                    <h3 className="text-xl font-black text-[#0C2B60]">{s.title}</h3>
                  </div>
                  <p className="text-[#666] text-sm leading-relaxed mb-5">{s.detail}</p>
                  <a href="https://wa.me/51981834387" target="_blank" rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-[#1A56A0] text-white font-bold rounded-full hover:bg-[#2D6CC0] transition-all text-sm shadow-md">
                    Agendar por WhatsApp →
                  </a>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateIn animation="fade-up">
            <div className="bg-[#1A56A0] rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-sky-200 font-semibold text-sm mb-2">Cambia tu vida</p>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  Conoce nuestros beneficios gratuitos<br className="hidden md:block" /> para ti y tu familia
                </h2>
              </div>
              <div className="shrink-0">
                <a href="https://wa.me/51981834387" target="_blank" rel="noopener noreferrer"
                  className="block bg-white text-[#1A56A0] font-bold text-sm text-center px-8 py-4 rounded-xl hover:bg-[#E8F0FB] transition-all shadow-lg whitespace-nowrap">
                  Agendar cita<br />por WhatsApp
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
