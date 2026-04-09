"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const roles = [
  { id: "admin", label: "Administrador", icon: "⚙️", desc: "Gestión completa del centro", correo: "admin@emotiva.pe", pass: "admin123", ruta: "/admin/dashboard" },
  { id: "psicologo", label: "Psicólogo/a", icon: "🧠", desc: "Panel clínico y pacientes", correo: "psicologo@emotiva.pe", pass: "psico123", ruta: "/psicologo/dashboard" },
  { id: "recepcion", label: "Recepcionista", icon: "📋", desc: "Citas, pagos y consultorios", correo: "recepcion@emotiva.pe", pass: "recep123", ruta: "/recepcion/dashboard" },
  { id: "paciente", label: "Paciente", icon: "👤", desc: "Mis citas y resultados", correo: "paciente@emotiva.pe", pass: "paciente123", ruta: "/paciente/dashboard" },
];

export default function LoginPage() {
  const router = useRouter();
  const [rolSel, setRolSel] = useState("admin");
  const [correo, setCorreo] = useState("admin@emotiva.pe");
  const [pass, setPass] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rolData = roles.find((r) => r.id === rolSel)!;

  const handleRolChange = (id: string) => {
    const r = roles.find((r) => r.id === id)!;
    setRolSel(id);
    setCorreo(r.correo);
    setPass(r.pass);
    setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    if (correo === rolData.correo && pass === rolData.pass) {
      router.push(rolData.ruta);
    } else {
      setError("Credenciales incorrectas. Usa las cuentas de prueba.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C2B60] via-[#1A56A0] to-[#2D6CC0] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <Image src="/images/logo.png" alt="Emotiva" width={160} height={50} className="object-contain brightness-0 invert" />
          </Link>
          <p className="text-white/60 text-sm mt-2">Sistema de Gestión Clínica</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Cuentas de prueba */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Cuentas de prueba</p>
            <div className="space-y-2">
              {roles.map((r) => (
                <button key={r.id} onClick={() => handleRolChange(r.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${rolSel === r.id ? "bg-white/20 border-white/40" : "border-transparent hover:bg-white/10"}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{r.icon}</span>
                    <div>
                      <div className="text-white font-bold text-sm">{r.label}</div>
                      <div className="text-white/50 text-xs">{r.correo}</div>
                    </div>
                    {rolSel === r.id && (
                      <div className="ml-auto w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                        <svg className="w-2.5 h-2.5 text-[#1A56A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="md:col-span-3 bg-white rounded-3xl p-8 shadow-2xl">
            <h1 className="text-2xl font-black text-dark mb-1">Iniciar sesión</h1>
            <p className="text-[#666666] text-sm mb-6">Accede como <strong className="text-[#1A56A0]">{rolData.label}</strong></p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">Correo electrónico</label>
                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">Contraseña</label>
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all" />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
              )}

              <button onClick={handleLogin} disabled={loading}
                className="w-full py-4 bg-[#1A56A0] text-white font-bold rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Ingresando...
                  </span>
                ) : "Ingresar al sistema →"}
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <Link href="/" className="text-sm text-[#666666] hover:text-[#1A56A0] transition-colors">
                ← Volver al sitio público
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
