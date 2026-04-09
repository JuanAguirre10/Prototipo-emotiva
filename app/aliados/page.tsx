import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import AnimateIn from "@/components/public/AnimateIn";

const aliados = [
  { src: "/images/aliado-mininter.png", alt: "Ministerio del Interior" },
  { src: "/images/aliado-muni-lima.jpeg", alt: "Municipalidad de Lima" },
  { src: "/images/aliado-muni-barranco.png", alt: "Municipalidad de Barranco" },
  { src: "/images/aliado-barrio-seguro.jpeg", alt: "Programa Barrio Seguro" },
];

const feedbacks = [
  { src: "/images/fb-1.jpg", texto: "Emotiva cambió mi vida. El apoyo que recibí fue invaluable para superar momentos difíciles." },
  { src: "/images/fb-2.jpg", texto: "El equipo de psicólogos es increíble. Me sentí escuchada y apoyada en cada sesión." },
  { src: "/images/fb-3.jpg", texto: "Gracias a Emotiva pude aprender a manejar mis emociones. Los talleres son excelentes." },
];

export default function AliadosPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#1A56A0] text-center relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-white opacity-10 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white opacity-10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Nuestros Aliados</h1>
          <p className="text-white/75 text-lg leading-relaxed">
            En el Centro Psicológico EMOTIVA, sabemos que la colaboración es clave para generar un impacto sostenible y significativo en nuestra sociedad.
          </p>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateIn animation="fade-up">
            <p className="text-[#555] text-base leading-relaxed mb-4 text-center">
              Nuestras alianzas con instituciones gubernamentales, municipales y educativas nos permiten llevar charlas y talleres a estudiantes, padres y profesores, promoviendo espacios de aprendizaje y apoyo emocional.
            </p>
            <p className="text-[#555] text-base leading-relaxed text-center">
              Creemos firmemente que, al unir esfuerzos, podemos transformar vidas y construir un futuro donde la salud mental sea una prioridad para todos.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Logos de aliados */}
      <section className="py-16 bg-[#F8FAFF]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#0C2B60]">Instituciones aliadas</h2>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {aliados.map((a, i) => (
              <AnimateIn key={a.src} animation="zoom-in" delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex items-center justify-center h-32">
                  <div className="relative w-full h-full">
                    <Image src={a.src} alt={a.alt} fill className="object-contain" />
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios / Feedback */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateIn animation="fade-up" className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#0C2B60]">Lo que dicen nuestros pacientes</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {feedbacks.map((f, i) => (
              <AnimateIn key={f.src} animation="fade-up" delay={i * 100}>
                <div className="bg-[#EEF4FF] rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 mx-auto">
                    <Image src={f.src} alt="Paciente" fill className="object-cover" />
                  </div>
                  <p className="text-[#555] text-sm leading-relaxed text-center italic">"{f.texto}"</p>
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
