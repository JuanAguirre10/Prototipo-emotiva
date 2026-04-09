import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import paquetes from "@/data/paquetes.json";

export default function PaquetesPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#1A56A0] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-sky-300 font-bold text-sm uppercase tracking-widest mb-4">Paquetes y Tarifas</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">Elige el plan perfecto para ti</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Ahorra hasta un 20% con nuestros paquetes. Invierte en tu bienestar emocional con tarifas justas y accesibles.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      {/* Paquetes */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paquetes.map((p) => (
              <div key={p.id} className={`rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${p.popular ? "shadow-2xl ring-2 ring-[#1A56A0]" : "shadow-sm hover:shadow-xl border border-gray-100"}`}>
                {p.popular && (
                  <div className="bg-[#1A56A0] text-white text-center py-2.5 text-xs font-bold tracking-widest uppercase">
                    ⭐ El más elegido
                  </div>
                )}
                <div className="p-8 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-black text-[#0C2B60]">{p.nombre}</h2>
                      {p.sesiones && <p className="text-[#1A56A0] text-sm font-semibold mt-0.5">{p.sesiones} sesiones</p>}
                    </div>
                    {p.ahorro && (
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
                        Ahorras S/ {p.ahorro}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <span className="text-5xl font-black text-[#1A56A0]">S/ {p.precio}</span>
                    {p.precioOriginal && (
                      <span className="ml-2 text-lg text-[#aaa] line-through">S/ {p.precioOriginal}</span>
                    )}
                  </div>

                  <p className="text-[#666] text-sm mb-6 leading-relaxed">{p.descripcion}</p>

                  <ul className="space-y-3 mb-7">
                    {p.beneficios.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-[#444]">
                        <svg className="w-5 h-5 text-[#0D7C6E] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <a href="https://wa.me/51981834387" target="_blank" rel="noopener noreferrer"
                    className={`block text-center py-4 rounded-full font-bold text-sm transition-all ${p.popular ? "bg-[#1A56A0] text-white hover:bg-[#2D6CC0] shadow-lg hover:-translate-y-0.5" : "border-2 border-[#1A56A0] text-[#1A56A0] hover:bg-[#1A56A0] hover:text-white"}`}>
                    Consultar por WhatsApp →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Convenios */}
          <div className="mt-10 p-8 bg-[#E8F0FB] rounded-3xl">
            <h3 className="text-xl font-black text-[#0C2B60] mb-2">💼 Convenios corporativos</h3>
            <p className="text-[#666] text-sm mb-4">¿Tu empresa cuida la salud mental de sus colaboradores? Tenemos planes especiales con tarifas preferenciales para empresas y organizaciones.</p>
            <Link href="/contacto"
              className="inline-flex items-center gap-2 text-[#1A56A0] font-bold text-sm hover:gap-4 transition-all">
              Consultar convenios empresariales →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
