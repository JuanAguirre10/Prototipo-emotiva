import Link from "next/link";
import citas from "@/data/citas.json";
import psicologos from "@/data/psicologos.json";

const misCitas = citas.filter((c) => c.pacienteId === "pac1").sort((a, b) => a.fecha.localeCompare(b.fecha));
const proxima = misCitas.find((c) => c.fecha >= "2026-04-08" && c.estado !== "cancelada");
const realizadas = misCitas.filter((c) => c.estado === "completada").length;
const pendientes = misCitas.filter((c) => c.estado !== "completada" && c.estado !== "cancelada").length;
const mipsicologo = psicologos.find((p) => p.id === "ps1");

export default function PacienteDashboard() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-black text-dark">Hola, Ana 👋</h1>
        <p className="text-[#666666] text-sm mt-0.5">Bienvenida a tu portal de salud mental</p>
      </div>

      {/* Próxima cita */}
      {proxima && (
        <div className="bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] rounded-3xl p-6 text-white mb-6 shadow-lg">
          <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">Tu próxima cita</div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">{proxima.fecha}</h2>
              <p className="text-white/75 text-sm">{proxima.psicologo}</p>
              <p className="text-white/60 text-xs mt-0.5">{proxima.tipo} · {proxima.consultorio}</p>
            </div>
            <div className="bg-white/20 rounded-2xl px-5 py-3 text-center border border-white/20">
              <div className="text-3xl font-black">{proxima.hora}</div>
              <div className="text-xs text-white/60">hora</div>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Link href="/paciente/citas"
              className="flex-1 py-2.5 bg-white text-[#1A56A0] font-bold text-sm rounded-xl hover:bg-[#E8F0FB] transition-colors text-center">
              Ver mis citas
            </Link>
            <button className="flex-1 py-2.5 bg-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/30 transition-colors border border-white/30">
              Cancelar cita
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Sesiones realizadas", val: realizadas, icon: "✅", color: "text-emerald-600" },
          { label: "Citas pendientes", val: pendientes, icon: "📅", color: "text-[#1A56A0]" },
          { label: "Mi psicólogo/a", val: mipsicologo?.nombre.split(" ")[0], icon: "🧠", color: "text-violet-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`font-black text-lg ${s.color}`}>{s.val}</div>
            <div className="text-xs text-[#666666] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mi psicólogo */}
      {mipsicologo && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <h3 className="font-bold text-dark text-sm mb-4">Mi psicólogo/a asignado/a</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-black">
              {mipsicologo.nombre.split(" ")[1][0]}{mipsicologo.nombre.split(" ")[2][0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-dark">{mipsicologo.nombre}</div>
              <div className="text-[#1A56A0] text-xs font-semibold">{mipsicologo.especialidad}</div>
              <div className="text-[#666666] text-xs">{mipsicologo.enfoque}</div>
            </div>
          </div>
        </div>
      )}

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { href: "/reservar", label: "Solicitar nueva cita", icon: "📅", color: "bg-[#E8F0FB] text-[#1A56A0]" },
          { href: "/paciente/resultados", label: "Ver mis resultados", icon: "📊", color: "bg-violet-50 text-violet-700" },
          { href: "/paciente/perfil", label: "Editar mi perfil", icon: "👤", color: "bg-gray-50 text-dark" },
          { href: "/contacto", label: "Contactar al centro", icon: "💬", color: "bg-emerald-50 text-emerald-700" },
        ].map((a) => (
          <Link key={a.href} href={a.href}
            className={`${a.color} rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow border border-current/10`}>
            <span className="text-2xl">{a.icon}</span>
            <span className="font-semibold text-sm">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
