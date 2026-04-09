"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import faq from "@/data/faq.json";

const categorias = [
  { id: "all", label: "Todas" },
  { id: "terapia", label: "Terapia" },
  { id: "citas", label: "Citas" },
  { id: "pagos", label: "Pagos" },
  { id: "confidencialidad", label: "Confidencialidad" },
];

export default function FAQPage() {
  const [abierto, setAbierto] = useState<number | null>(null);
  const [cat, setCat] = useState("all");
  const [busqueda, setBusqueda] = useState("");

  const filtradas = faq.filter((f) => {
    const matchCat = cat === "all" || f.categoria === cat;
    const matchBusq = busqueda === "" || f.pregunta.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchBusq;
  });

  return (
    <>
      <Navbar />
      <section className="relative pt-32 pb-24 bg-[#1A56A0] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-sky-300 font-bold text-sm uppercase tracking-widest mb-4">FAQ</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">Preguntas frecuentes</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Resolvemos tus dudas más comunes sobre nuestros servicios, citas y terapias.
          </p>
          <div className="relative max-w-xl mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar pregunta..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categorias.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${cat === c.id ? "bg-[#1A56A0] text-white shadow-md" : "bg-gray-100 text-[#666] hover:bg-[#E8F0FB] hover:text-[#1A56A0]"}`}>
                {c.label}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="space-y-3">
            {filtradas.length === 0 ? (
              <p className="text-center text-[#666666] py-10">No se encontraron preguntas. Intenta con otros términos.</p>
            ) : (
              filtradas.map((f) => (
                <div key={f.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-[#1A56A0]/30 transition-colors">
                  <button
                    onClick={() => setAbierto(abierto === f.id ? null : f.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-dark text-sm">{f.pregunta}</span>
                    <svg className={`w-5 h-5 text-[#1A56A0] shrink-0 transition-transform duration-200 ${abierto === f.id ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {abierto === f.id && (
                    <div className="px-5 pb-5 border-t border-gray-100">
                      <p className="text-[#666666] text-sm leading-relaxed pt-4">{f.respuesta}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* No encontró respuesta */}
          <div className="mt-12 p-8 bg-[#E8F0FB] rounded-3xl text-center">
            <h3 className="font-bold text-dark mb-2">¿No encontraste tu respuesta?</h3>
            <p className="text-[#666666] text-sm mb-4">Nuestro equipo está disponible para resolver cualquier duda que tengas.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contacto" className="px-6 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-full hover:bg-[#2D6CC0] transition-all">
                Contactar ahora
              </Link>
              <a href="https://wa.me/51987929320" target="_blank" rel="noopener noreferrer"
                className="px-6 py-2.5 border-2 border-[#1A56A0] text-[#1A56A0] font-bold text-sm rounded-full hover:bg-[#E8F0FB] transition-all">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
