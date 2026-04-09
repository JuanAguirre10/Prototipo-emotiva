import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import AnimateIn from "@/components/public/AnimateIn";

const collageBottom = [
  { src: "/images/nos-taller-hab1.jpeg", alt: "Taller habilidades 1" },
  { src: "/images/nos-taller-sensorial2.jpeg", alt: "Taller sensorial 2" },
  { src: "/images/nos-terapia-ninos.jpeg", alt: "Terapia para niños" },
  { src: "/images/nos-taller-hab4.jpeg", alt: "Taller habilidades 4" },
  { src: "/images/nos-taller-hab5.jpeg", alt: "Taller habilidades 5" },
  { src: "/images/nos-taller-hab6.jpeg", alt: "Taller habilidades 6" },
];

const ods = [
  { num: "3",  color: "bg-green-500",  border: "border-green-500",  text: "text-green-600",  bg: "bg-green-50",  label: "Salud y Bienestar",         desc: "Promovemos el bienestar emocional y la salud mental para todas las edades, con servicios accesibles y gratuitos." },
  { num: "4",  color: "bg-red-500",    border: "border-red-500",    text: "text-red-600",    bg: "bg-red-50",    label: "Educación de Calidad",       desc: "Desarrollamos programas psicoeducativos, talleres de habilidades sociales y capacitaciones para docentes y padres." },
  { num: "5",  color: "bg-orange-500", border: "border-orange-500", text: "text-orange-600", bg: "bg-orange-50", label: "Igualdad de Género",         desc: "Garantizamos acceso equitativo a la salud mental sin distinción de género, con programas específicos para mujeres." },
  { num: "10", color: "bg-pink-600",   border: "border-pink-600",   text: "text-pink-700",   bg: "bg-pink-50",   label: "Reducción de Desigualdades", desc: "Eliminamos barreras económicas y sociales para que todas las personas accedan a atención psicológica de calidad." },
];

const valores = [
  { icon: "🤝", title: "Empatía", desc: "Escuchamos sin juzgar y acompañamos con genuino compromiso." },
  { icon: "🎯", title: "Profesionalismo", desc: "Evidencia científica, ética y formación continua en cada sesión." },
  { icon: "🌍", title: "Accesibilidad", desc: "Creemos que la salud mental debe estar al alcance de todos." },
  { icon: "💪", title: "Compromiso", desc: "Trabajamos para generar cambios reales y duraderos." },
  { icon: "🔒", title: "Confidencialidad", desc: "Tu privacidad es sagrada. Todo lo que compartes, permanece entre nosotros." },
  { icon: "✨", title: "Innovación", desc: "Integramos tecnología y nuevas técnicas para una atención más efectiva." },
];

export default function NosotrosPage() {
  return (
    <>
      <Navbar />

      {/* ═══ HERO — Split: texto izquierda + collage derecha ═══════════════ */}
      <section className="min-h-[85vh] grid lg:grid-cols-2 pt-16">

        {/* Panel izquierdo — oscuro */}
        <div className="bg-[#1A56A0] flex items-center justify-center py-20 px-10 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-white opacity-10 pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full bg-white opacity-8 pointer-events-none" />

          <AnimateIn animation="fade-right" className="relative max-w-lg">
            <span className="inline-block text-sky-300 text-xs font-bold uppercase tracking-widest mb-6">Centro Psicológico</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Somos<br />Emotiva
            </h1>
            <p className="text-white/70 leading-relaxed mb-10 text-base">
              Un centro psicológico comprometido con la salud mental y el bienestar emocional de la comunidad peruana, reduciendo las barreras económicas y sociales que separan a las personas del apoyo que merecen.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "+25K", label: "Familias" },
                { num: "+17K", label: "Horas" },
                { num: "+35", label: "Voluntarios" },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-black text-white">{s.num}</div>
                  <div className="text-sky-300 text-xs font-semibold mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>

        {/* Panel derecho — collage de fotos */}
        <AnimateIn animation="fade-left" className="relative overflow-hidden bg-[#EEF4FF] min-h-[480px]">
          <div className="grid grid-cols-3 h-full gap-1 p-1" style={{ gridTemplateRows: "repeat(3, 1fr)" }}>
            {/* Grande: 2 cols × 2 rows */}
            <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden">
              <Image src="/images/nos-taller-hab2.jpeg" alt="Taller habilidades" fill className="object-cover" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/nos-dia-madre.jpeg" alt="Día de la madre" fill className="object-cover" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/nos-taller-ninos.jpeg" alt="Taller niños" fill className="object-cover" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/nos-taller-autoestima.jpeg" alt="Taller autoestima" fill className="object-cover" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/nos-adulto-mayor.jpeg" alt="Adulto mayor" fill className="object-cover" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/nos-taller-sensorial1.jpeg" alt="Taller sensorial" fill className="object-cover" />
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ═══ NUESTRO SUEÑO ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimateIn animation="fade-up">
            <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-4">Nuestra historia</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A56A0] leading-tight mb-8">
              Conoce Nuestro Sueño
            </h2>
            <p className="text-[#555] leading-relaxed text-base mb-5 max-w-2xl mx-auto">
              Sabemos que la pandemia dejó una huella profunda en las poblaciones más vulnerables, afectándolas económica y emocionalmente. Por eso, trabajamos para cerrar esa brecha y garantizar que el apoyo psicológico esté al alcance de todos.
            </p>
            <p className="text-[#555] leading-relaxed text-base max-w-2xl mx-auto">
              Nuestras intervenciones y proyectos en EMOTIVA contribuyen al diseño e implementación de políticas de prevención e intervención enfocadas en el bienestar emocional y psicoeducativo, especialmente para las poblaciones más vulnerables y rurales.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Strip de fotos — ancho completo */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn animation="fade-up">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2" style={{ height: "200px" }}>
              {collageBottom.map((img) => (
                <div key={img.src} className="rounded-xl overflow-hidden relative h-full">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ MISIÓN Y VISIÓN ════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFF] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-3">Quiénes somos</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0C2B60]">Lo que nos mueve</h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Misión */}
            <AnimateIn animation="fade-left">
              <div className="relative rounded-3xl overflow-hidden h-full min-h-[280px] group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0C2B60] to-[#1A56A0]" />
                <div className="absolute -right-12 -top-12 w-52 h-52 rounded-full bg-white/5" />
                <div className="absolute -left-8 -bottom-8 w-36 h-36 rounded-full bg-white/5" />
                <div className="relative p-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-xs font-bold text-sky-300 uppercase tracking-widest mb-4">Misión</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-5">
                      Salud mental<br />accesible para todos
                    </h3>
                    <p className="text-white/75 leading-relaxed text-sm">
                      Ofrecer apoyo psicológico asequible y gratuito, creando un espacio seguro y comprensivo para quienes buscan ayuda. Reducir las barreras económicas y sociales que impiden el acceso a la salud mental.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3">
                    <div className="w-8 h-0.5 bg-sky-300" />
                    <span className="text-sky-300 text-xs font-semibold uppercase tracking-wider">Centro Psicológico Emotiva</span>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Visión */}
            <AnimateIn animation="fade-right">
              <div className="relative rounded-3xl overflow-hidden h-full min-h-[280px] group border border-gray-100 bg-white">
                <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#EEF4FF]" />
                <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-[#EEF4FF]" />
                <div className="relative p-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-4">Visión</span>
                    <h3 className="text-2xl md:text-3xl font-black text-[#0C2B60] leading-tight mb-5">
                      Un Perú donde el bienestar<br />sea para todos
                    </h3>
                    <p className="text-[#555] leading-relaxed text-sm">
                      Trabajamos cada día para construir un país donde la salud mental esté al alcance de todos, sin importar su situación económica o social, garantizando atención de calidad en cada comunidad.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-0.5 bg-[#1A56A0]" />
                    <span className="text-[#1A56A0] text-xs font-semibold uppercase tracking-wider">Desde Lima para el Perú</span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ═══ ODS ════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            <AnimateIn animation="fade-left" className="lg:sticky lg:top-24">
              <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-4">Compromiso global</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0C2B60] leading-tight mb-6">
                Alineados con los Objetivos de Desarrollo Sostenible
              </h2>
              <p className="text-[#666] leading-relaxed text-base mb-8">
                Cada proyecto que desarrollamos está diseñado para generar un impacto medible y duradero, contribuyendo directamente a la agenda global de bienestar y equidad.
              </p>
              <div className="flex flex-wrap gap-3">
                {ods.map((o) => (
                  <span key={o.num} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${o.bg} border ${o.border}`}>
                    <span className={`text-xs font-black text-white px-2 py-0.5 rounded-md ${o.color}`}>ODS {o.num}</span>
                    <span className={`text-sm font-semibold ${o.text}`}>{o.label}</span>
                  </span>
                ))}
              </div>
            </AnimateIn>

            <div className="space-y-4">
              {ods.map((o, i) => (
                <AnimateIn key={o.num} animation="fade-right" delay={i * 100}>
                  <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${o.color}`} />
                    <div className="pl-7 pr-6 py-6 flex items-start gap-5">
                      <div className={`shrink-0 w-14 h-14 ${o.bg} border-2 ${o.border} rounded-xl flex flex-col items-center justify-center`}>
                        <span className={`text-[10px] font-black ${o.text} leading-none`}>ODS</span>
                        <span className={`text-xl font-black ${o.text} leading-none`}>{o.num}</span>
                      </div>
                      <div>
                        <h3 className="font-black text-[#0C2B60] text-base mb-1 group-hover:text-[#1A56A0] transition-colors">{o.label}</h3>
                        <p className="text-[#666] text-sm leading-relaxed">{o.desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALORES ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0C2B60] overflow-hidden relative">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full bg-[#1A56A0] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full bg-[#1A56A0] opacity-20 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="mb-16">
            <span className="inline-block text-sky-300 text-xs font-bold uppercase tracking-widest mb-4">Lo que nos define</span>
            <h2 className="text-3xl md:text-4xl font-black text-white">Nuestros valores</h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {valores.map((v, i) => (
              <AnimateIn key={v.title} animation="fade-up" delay={i * 60}>
                <div className="bg-[#0C2B60] p-8 hover:bg-[#1A56A0] transition-colors duration-300 group h-full">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="font-black text-white text-lg mb-3">{v.title}</h3>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors text-sm leading-relaxed">{v.desc}</p>
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
            <div className="bg-[#1A56A0] rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-sky-200 font-semibold text-sm mb-2">¡EMOTIVA por ti y para ti!</p>
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
