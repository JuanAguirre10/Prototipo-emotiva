"use client";
import { useState } from "react";

const datosIniciales = {
  nombre: "Ana García López",
  telefono: "987654321",
  correo: "ana.garcia@email.com",
  direccion: "Av. Brasil 1234, Breña",
};

export default function PacientePerfilPage() {
  const [datos, setDatos] = useState(datosIniciales);
  const [guardado, setGuardado] = useState(false);
  const [pass, setPass] = useState({ actual: "", nueva: "", confirmar: "" });

  const handleGuardar = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-dark">Mi Perfil</h1>
        <p className="text-[#666666] text-sm mt-0.5">Administra tu información personal</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-black text-2xl shrink-0">
          AG
        </div>
        <div>
          <div className="font-black text-dark text-lg">{datos.nombre}</div>
          <div className="text-[#666666] text-sm">{datos.correo}</div>
          <div className="text-xs text-[#1A56A0] font-semibold mt-0.5">Paciente activa</div>
        </div>
      </div>

      {/* Datos personales */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <h2 className="font-bold text-dark mb-5">Datos personales</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Nombre completo</label>
            <input type="text" value={datos.nombre} onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Teléfono</label>
            <input type="tel" value={datos.telefono} onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Correo electrónico</label>
            <input type="email" value={datos.correo} onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Dirección</label>
            <input type="text" value={datos.direccion} onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all" />
          </div>
        </div>
        <button onClick={handleGuardar}
          className={`mt-5 w-full py-3.5 font-bold text-sm rounded-xl transition-all ${guardado ? "bg-emerald-500 text-white" : "bg-[#1A56A0] text-white hover:bg-[#2D6CC0] hover:-translate-y-0.5 shadow-md hover:shadow-lg"}`}>
          {guardado ? "✓ Cambios guardados" : "Guardar cambios"}
        </button>
      </div>

      {/* Cambio de contraseña */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-dark mb-5">Cambiar contraseña</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Contraseña actual</label>
            <input type="password" value={pass.actual} onChange={(e) => setPass({ ...pass, actual: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Nueva contraseña</label>
            <input type="password" value={pass.nueva} onChange={(e) => setPass({ ...pass, nueva: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Confirmar nueva contraseña</label>
            <input type="password" value={pass.confirmar} onChange={(e) => setPass({ ...pass, confirmar: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] transition-all" placeholder="••••••••" />
          </div>
        </div>
        <button className="mt-5 w-full py-3.5 border-2 border-[#1A56A0] text-[#1A56A0] font-bold text-sm rounded-xl hover:bg-[#E8F0FB] transition-colors">
          Actualizar contraseña
        </button>
      </div>
    </div>
  );
}
