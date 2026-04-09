"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const quienesSomos = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/equipo", label: "Staff" },
  { href: "/aliados", label: "Nuestros Aliados" },
];

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos sociales" },
  { href: "/contacto", label: "Contáctanos" },
  { href: "/unete", label: "Únete a EMOTIVA" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isQuienesSomosActive = quienesSomos.some((q) => pathname === q.href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Emotiva"
              width={150}
              height={48}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">

            {/* Quiénes Somos — dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isQuienesSomosActive
                    ? "text-[#1A56A0] bg-[#E8F0FB]"
                    : "text-[#333] hover:text-[#1A56A0] hover:bg-[#E8F0FB]/60"
                }`}
              >
                ¿Quiénes Somos?
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                  {quienesSomos.map((q) => (
                    <Link
                      key={q.href}
                      href={q.href}
                      onClick={() => setDropdownOpen(false)}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#E8F0FB] hover:text-[#1A56A0] ${
                        pathname === q.href ? "text-[#1A56A0] bg-[#E8F0FB]" : "text-[#333]"
                      }`}
                    >
                      {q.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resto de links */}
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === l.href
                    ? "text-[#1A56A0] bg-[#E8F0FB]"
                    : "text-[#333] hover:text-[#1A56A0] hover:bg-[#E8F0FB]/60"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA derecha */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold px-4 py-2 rounded-full text-[#1A56A0] hover:bg-[#E8F0FB] transition-all duration-200"
            >
              Iniciar sesión
            </Link>
            <a
              href="https://wa.me/51981834387"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold px-5 py-2.5 rounded-full bg-[#1A56A0] text-white hover:bg-[#2D6CC0] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              Agendar cita
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-[#333] hover:bg-gray-100 transition-colors"
            aria-label="Menú"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl px-4 pb-4 pt-2">
          {/* Quiénes Somos expandido en mobile */}
          <div className="mb-1">
            <p className="px-4 py-2 text-xs font-bold text-[#999] uppercase tracking-wider">¿Quiénes Somos?</p>
            {quienesSomos.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                onClick={() => setOpen(false)}
                className={`block px-6 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-colors ${
                  pathname === q.href ? "bg-[#E8F0FB] text-[#1A56A0]" : "text-[#444] hover:bg-gray-50"
                }`}
              >
                {q.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-1 mb-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium mb-0.5 transition-colors ${
                  pathname === l.href ? "bg-[#E8F0FB] text-[#1A56A0]" : "text-[#333] hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
            <Link href="/login" onClick={() => setOpen(false)}
              className="text-center px-4 py-3 rounded-full text-sm font-semibold text-[#1A56A0] hover:bg-[#E8F0FB] transition-colors">
              Iniciar sesión
            </Link>
            <a href="https://wa.me/51981834387" target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="text-center px-4 py-3 rounded-full text-sm font-semibold bg-[#1A56A0] text-white hover:bg-[#2D6CC0] transition-colors">
              Agendar cita
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
