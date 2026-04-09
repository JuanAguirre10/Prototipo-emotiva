import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import AnimateIn from "@/components/public/AnimateIn";
import Carousel from "@/components/public/Carousel";

const proyectos = [
  {
    titulo: "PSICOLOGÍA PARA TODOS",
    subtitulo: "Programa de atención gratuita comunitaria",
    desc: "Somos una ONG comprometida con que la psicología esté al alcance de todos. Contamos con aliados en más de 35 instituciones educativas, con el Programa Barrio Seguro del Ministerio del Interior y la Municipalidad Metropolitana de Lima, reconocidas a nivel nacional.",
    img: "/images/proy-psicologia-todos.jpeg",
  },
  {
    titulo: "BARRIO SEGURO",
    subtitulo: "Ministerio del Interior — Talleres Socioemocionales para todas las Escuelas",
    desc: "En alianza con el Ministerio del Interior, implementamos talleres socioemocionales en escuelas e instituciones de zonas vulnerables, promoviendo la prevención de violencia y el fortalecimiento emocional.",
    img: "/images/proy-barrio-seguro.jpeg",
  },
  {
    titulo: "AULAS LIBRES SIN VIOLENCIA",
    subtitulo: "Municipalidad de Lima",
    desc: "En colaboración con la Municipalidad Metropolitana de Lima, llevamos charlas y talleres a instituciones educativas para promover ambientes escolares seguros, libres de violencia, y fortalecer el bienestar emocional de estudiantes y docentes.",
    img: "/images/proy-foto3.jpeg",
  },
];

const logros = [
  { numero: "25 mil", label: "Familias impactadas" },
  { numero: "18 mil", label: "Estudiantes de zonas vulnerables" },
  { numero: "18 mil", label: "Docentes capacitados" },
  { numero: "70%", label: "de estudiantes en ferias vocacionales" },
  { numero: "75%", label: "impactados bajo Aulas Libres sin Violencia" },
  { numero: "85 I.E.", label: "Focalizadas, públicas y privadas" },
];

const escuelas = [
  { src: "/images/proy-escuela3.jpeg", alt: "Inicial Buenos Aires de Villa" },
  { src: "/images/proy-adultos.jpeg", alt: "Taller adultos mayores" },
  { src: "/images/proy-escuela1.jpeg", alt: "I.E. Inicial Buenos Aires — Escuela de Padres" },
  { src: "/images/proy-escuela2.jpeg", alt: "I.E. San Genaro Inicial" },
];

export default function ProyectosPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#1A56A0] text-center relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-white opacity-10 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white opacity-10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Nuestros proyectos</h1>
          <p className="text-white/75 text-lg leading-relaxed">
            Trabajamos para generar un impacto real y duradero en la comunidad peruana a través de proyectos de salud mental accesibles para todos.
          </p>
        </div>
      </section>

      {/* Proyectos principales */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {proyectos.map((p, i) => (
            <AnimateIn key={p.titulo} animation={i % 2 === 0 ? "fade-left" : "fade-right"}>
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className={`relative h-80 rounded-2xl overflow-hidden shadow-lg ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <Image src={p.img} alt={p.titulo} fill className="object-cover" />
                </div>
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-2">Proyecto:</span>
                  <h2 className="text-2xl md:text-3xl font-black text-[#0C2B60] mb-2">{p.titulo}</h2>
                  <p className="text-sm font-semibold text-[#1A56A0] mb-4">{p.subtitulo}</p>
                  <p className="text-[#666] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Principales Logros */}
      <section className="py-20 bg-[#EEF4FF]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="text-center mb-12">
            <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-3">Nuestro impacto</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0C2B60]">Principales Logros</h2>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {logros.map((l, i) => (
              <AnimateIn key={l.label} animation="fade-up" delay={i * 70}>
                <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center mb-5">
                    {i === 0 && <svg className="w-6 h-6 text-[#1A56A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4 6v-2m0 0a4 4 0 100-8 4 4 0 000 8zm6-10a3 3 0 11-6 0 3 3 0 016 0zM5 10a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                    {i === 1 && <svg className="w-6 h-6 text-[#1A56A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>}
                    {i === 2 && <svg className="w-6 h-6 text-[#1A56A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>}
                    {i === 3 && <svg className="w-6 h-6 text-[#1A56A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
                    {i === 4 && <svg className="w-6 h-6 text-[#1A56A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
                    {i === 5 && <svg className="w-6 h-6 text-[#1A56A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>}
                  </div>
                  <p className="text-3xl md:text-4xl font-black text-[#1A56A0] mb-1 leading-none">{l.numero}</p>
                  <div className="w-8 h-0.5 bg-[#1A56A0] opacity-30 my-2" />
                  <p className="text-[#555] text-sm leading-snug mt-auto">{l.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Reconocimientos */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-3">Trayectoria</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0C2B60]">Reconocimientos y participaciones</h2>
          </AnimateIn>

          {/* Premio Kunan */}
          <AnimateIn animation="fade-left" className="mb-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/proy-taller-motivacional.jpeg" alt="Premio Kunan Emotiva" fill className="object-cover" />
              </div>
              <div>
                <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-3">Reconocimiento</span>
                <h3 className="text-2xl font-black text-[#0C2B60] mb-4">Participantes del Premio Kunan</h3>
                <p className="text-[#666] leading-relaxed">
                  Somos una ONG comprometida con que la psicología esté al alcance de todos. Contamos con aliados en más de 35 instituciones educativas, con el Programa Barrio Seguro del Ministerio del Interior y la Municipalidad Metropolitana de Lima, reconocidas a nivel nacional.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Finalistas Movistar */}
          <AnimateIn animation="fade-right">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Imágenes cuadradas 1024x1024 — se muestran completas */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image src="/images/proy-movistar-cert.jpeg" alt="Certificado Movistar Emotiva" fill className="object-contain bg-white" />
                </div>
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image src="/images/proy-mujer.jpg" alt="Mujer Emprendedora Emotiva" fill className="object-contain bg-white" />
                </div>
              </div>
              {/* Texto + video */}
              <div>
                <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-3">Reconocimiento</span>
                <h3 className="text-2xl font-black text-[#0C2B60] mb-4">Finalistas "Conectarse para Crecer" de Movistar</h3>
                <p className="text-[#666] leading-relaxed mb-4">
                  Finalistas en los Premios Movistar en la categoría Mujer Emprendedora, Emotiva ha logrado alcanzar a más de 20,000 familias, brindando atención psicológica gratuita en zonas rurales gracias al uso de TICs como teleconsultas, superando así barreras geográficas.
                </p>
                <p className="text-[#666] leading-relaxed mb-4">
                  Nuestro compromiso incluye capacitaciones para docentes y talleres para alumnos, todos totalmente gratuitos, con el objetivo de promover el bienestar psicológico integral y crear un impacto duradero en las comunidades, especialmente en las más vulnerables.
                </p>
                <p className="text-[#666] leading-relaxed mb-6">
                  Emotiva continúa trabajando para llevar la psicología a todos, sin importar la ubicación, y estamos orgullosos de ser reconocidos por nuestros esfuerzos en mejorar la salud mental de las personas y las familias en todo el país.
                </p>
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/cW1pKng-irg"
                    title="EMOTIVA - Conectarse para Crecer 2024"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full min-h-[220px]"
                  />
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Instituciones Educativas — carrusel */}
      <section className="py-16 bg-[#F8FAFF]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#0C2B60]">Instituciones Educativas Atendidas</h2>
          </AnimateIn>
          <AnimateIn animation="fade-up">
            <Carousel items={escuelas} />
          </AnimateIn>
        </div>
      </section>

      {/* 3 flip cards: Talleres, Charlas, Premios */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                titulo: "Talleres gratuitos para adolescentes",
                hint: "Pasa el cursor para ver más",
                desc: "Sabemos que la adolescencia es una etapa crucial. Hemos diseñado talleres gratuitos enfocados en fortalecer habilidades sociales, autorregulación emocional y autoestima, brindando herramientas prácticas para afrontar los desafíos de su vida diaria.",
              },
              {
                titulo: "Charlas en instituciones educativas",
                hint: "Pasa el cursor para ver más",
                desc: "Las instituciones educativas son clave para la promoción de la salud mental. Llevamos charlas a estudiantes, padres y docentes abordando manejo del estrés, prevención de violencia, comunicación efectiva y ambientes escolares saludables.",
              },
              {
                titulo: "Premios y reconocimientos",
                hint: "Pasa el cursor para ver más",
                desc: "Nos llena de orgullo haber sido finalistas en los PREMIOS CONECTA PARA CRECER DE MOVISTAR. Este logro destaca el impacto social de nuestros proyectos y el compromiso de nuestro equipo para transformar vidas a través de la psicología.",
              },
            ].map((card, i) => (
              <AnimateIn key={card.titulo} animation="fade-up" delay={i * 80}>
                <div className="flip-card h-56 cursor-pointer">
                  <div className="flip-inner h-full">
                    {/* Frente */}
                    <div className="flip-front bg-[#1A56A0] p-7 flex flex-col justify-between">
                      <h3 className="font-black text-white text-lg leading-snug">{card.titulo}</h3>
                      <span className="text-sky-200 text-xs font-medium">{card.hint} →</span>
                    </div>
                    {/* Dorso */}
                    <div className="flip-back bg-[#0C2B60] p-7 flex items-center">
                      <p className="text-white/85 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateIn animation="fade-up">
            <div className="bg-[#1A56A0] rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-sky-200 font-semibold text-sm mb-2">¡EMOTIVA por ti y para ti!</p>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  Conoce nuestros beneficios gratuitos<br className="hidden md:block" /> para ti y tu familia
                </h2>
              </div>
              <div className="shrink-0">
                <a href="https://wa.me/51981834387" target="_blank" rel="noopener noreferrer" className="block bg-white text-[#1A56A0] font-bold text-sm text-center px-8 py-4 rounded-xl hover:bg-[#E8F0FB] transition-all shadow-lg whitespace-nowrap">
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
