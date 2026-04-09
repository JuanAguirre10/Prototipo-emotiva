import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import AnimateIn from "@/components/public/AnimateIn";

const beneficios = [
  { num: "01", title: "Impacto real", desc: "Trabaja con propósito. Cada sesión cambia una vida." },
  { num: "02", title: "Formación continua", desc: "Supervisión clínica, talleres y capacitaciones mensuales." },
  { num: "03", title: "Tecnología de punta", desc: "Sistema de gestión clínica con IA. Sin papeleo." },
  { num: "04", title: "Horarios flexibles", desc: "Agenda tu disponibilidad. Sesiones presenciales y online." },
  { num: "05", title: "Ingresos justos", desc: "Comisiones competitivas y bonos por captación de pacientes." },
  { num: "06", title: "Comunidad profesional", desc: "Equipo colaborativo y diverso con visión compartida." },
];

const requisitos = [
  "Título profesional en Psicología",
  "Colegiatura vigente en el CPsP",
  "Mínimo 1 año de experiencia clínica",
  "Disponibilidad mínima de 10 horas semanales",
  "Habilidades de comunicación empática",
];

export default function UnetePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#1A56A0] text-center relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-white opacity-10 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white opacity-10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Únete a Emotiva</h1>
          <p className="text-white/75 text-lg leading-relaxed">
            Somos más de 35 voluntarios unidos con el fin de ayudar a más niños, adolescentes y padres de familia en todas las I.E. y lograr que la psicología sea para todos.
          </p>
        </div>
      </section>

      {/* Galería de fotos — proporciones reales */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn animation="fade-up">
            {/* Grid 3 columnas, cada celda con aspect-ratio exacto de la imagen → sin recorte */}
            <div className="grid gap-3 items-start" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>

              {/* portrait 3:4 */}
              <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "3/4" }}>
                <Image src="/images/unete-2.jpeg" alt="Equipo Emotiva" fill className="object-cover" />
              </div>

              {/* landscape 4:3 ocupa 2 cols */}
              <div className="relative rounded-2xl overflow-hidden shadow-md col-span-2" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/unete-1.jpeg" alt="Voluntarios Emotiva" fill className="object-cover" />
              </div>

              {/* portrait 3:4 */}
              <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "3/4" }}>
                <Image src="/images/unete-3.jpeg" alt="Staff Emotiva" fill className="object-cover" />
              </div>

              {/* landscape 4:3 */}
              <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/unete-4.jpeg" alt="Psicólogos Emotiva" fill className="object-cover" />
              </div>

              {/* landscape 4:3 */}
              <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/unete-5.jpeg" alt="Equipo Emotiva actividad" fill className="object-cover" />
              </div>

            </div>

            {/* Tarjeta motivacional debajo */}
            <div className="mt-3 rounded-2xl bg-[#1A56A0] px-8 py-6 flex items-center justify-between gap-6">
              <div>
                <p className="text-sky-200 text-xs font-bold uppercase tracking-widest mb-1">#emotiva</p>
                <h3 className="text-lg font-black text-white">Un trabajo con propósito real</h3>
              </div>
              <a href="mailto:centropsicologicoemotiva@gmail.com"
                 className="shrink-0 text-sm font-bold text-white border border-white/40 px-5 py-2.5 rounded-full hover:bg-white hover:text-[#1A56A0] transition-all">
                Enviar CV →
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Por qué trabajar en Emotiva */}
      <section className="py-20 bg-[#0C2B60] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#1A56A0] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-72 h-72 rounded-full bg-[#1A56A0] opacity-20 -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="mb-14">
            <span className="inline-block text-sky-300 text-xs font-bold uppercase tracking-widest mb-3">Beneficios</span>
            <h2 className="text-3xl md:text-4xl font-black text-white">¿Por qué trabajar en Emotiva?</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {beneficios.map((b, i) => (
              <AnimateIn key={b.num} animation="fade-up" delay={i * 60}>
                <div className="bg-[#0C2B60] hover:bg-[#1A56A0] transition-colors duration-300 group p-8 h-full">
                  <span className="block text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors mb-4 select-none leading-none">
                    {b.num}
                  </span>
                  <h3 className="font-black text-white text-base mb-2">{b.title}</h3>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors text-sm leading-relaxed">{b.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos + Formulario */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Requisitos */}
            <AnimateIn animation="fade-left">
              <span className="inline-block text-xs font-bold text-[#1A56A0] uppercase tracking-widest mb-4">Perfil buscado</span>
              <h2 className="text-3xl font-black text-[#0C2B60] mb-8">Requisitos mínimos</h2>
              <ul className="space-y-4">
                {requisitos.map((r, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-[#1A56A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#444] text-sm leading-relaxed pt-0.5">{r}</span>
                  </li>
                ))}
              </ul>
            </AnimateIn>

            {/* Formulario */}
            <AnimateIn animation="fade-right">
              <div className="bg-[#F8FAFF] border border-gray-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-black text-[#0C2B60] mb-6">Postula ahora</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Nombre completo</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm bg-white" placeholder="Tu nombre completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Especialidad principal</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all bg-white text-sm">
                      <option value="">Selecciona tu especialidad</option>
                      <option>Psicología Clínica — Adultos</option>
                      <option>Psicología Infantil / Adolescente</option>
                      <option>Terapia de Pareja y Familia</option>
                      <option>Neuropsicología</option>
                      <option>Psicología Educativa</option>
                      <option>Evaluación y Psicodiagnóstico</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Años de experiencia</label>
                      <input type="number" min="0" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm bg-white" placeholder="1" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Teléfono</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm bg-white" placeholder="+51 987..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Correo electrónico</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm bg-white" placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Link de CV o LinkedIn</label>
                    <input type="url" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all text-sm bg-white" placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">¿Por qué quieres unirte a Emotiva?</label>
                    <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all resize-none text-sm bg-white" placeholder="Cuéntanos en pocas palabras..." />
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#1A56A0] text-white font-bold rounded-full hover:bg-[#2D6CC0] transition-all shadow-lg hover:-translate-y-0.5 text-sm uppercase tracking-wide">
                    Enviar postulación →
                  </button>
                </form>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
