"use client";
import { useState } from "react";

type Tab = "centro" | "cuenta" | "notificaciones" | "seguridad";

export default function AdminConfiguracionPage() {
  const [tab, setTab] = useState<Tab>("centro");
  const [guardado, setGuardado] = useState(false);

  const guardar = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2500);
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "centro", label: "Centro", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg> },
    { key: "cuenta", label: "Mi cuenta", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { key: "notificaciones", label: "Notificaciones", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
    { key: "seguridad", label: "Seguridad", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  ];

  const Field = ({ label, defaultValue, type = "text", placeholder = "" }: { label: string; defaultValue?: string; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">{label}</label>
      <input type={type} defaultValue={defaultValue} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] bg-white" />
    </div>
  );

  const Toggle = ({ label, desc, defaultChecked = false }: { label: string; desc?: string; defaultChecked?: boolean }) => {
    const [on, setOn] = useState(defaultChecked);
    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
        <div>
          <div className="text-sm font-semibold text-[#0C2B60]">{label}</div>
          {desc && <div className="text-xs text-[#666] mt-0.5">{desc}</div>}
        </div>
        <button onClick={() => setOn(!on)} className={`relative w-11 h-6 rounded-full transition-colors ${on ? "bg-[#1A56A0]" : "bg-gray-200"}`}>
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              tab === t.key ? "bg-white text-[#1A56A0] shadow-sm" : "text-[#666] hover:text-[#333]"
            }`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {tab === "centro" && (
          <div className="space-y-5">
            <h3 className="font-black text-[#0C2B60] mb-2">Información del centro</h3>
            <Field label="Nombre del centro" defaultValue="Centro Psicológico Emotiva" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="RUC / Identificación" defaultValue="20512345678" />
              <Field label="Teléfono" defaultValue="981 834 387" />
            </div>
            <Field label="Dirección" defaultValue="Av. Brasil 1234, Lima, Perú" />
            <Field label="Correo de contacto" defaultValue="contacto@emotiva.pe" type="email" />
            <Field label="Sitio web" defaultValue="https://emotiva.pe" />
            <div>
              <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Descripción breve</label>
              <textarea rows={3} defaultValue="Centro psicológico especializado en atención integral para niños, adolescentes, adultos, parejas y familias."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30 focus:border-[#1A56A0] resize-none" />
            </div>
          </div>
        )}

        {tab === "cuenta" && (
          <div className="space-y-5">
            <h3 className="font-black text-[#0C2B60] mb-2">Mi perfil</h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-black text-xl">CA</div>
              <div>
                <div className="font-black text-[#0C2B60]">Cuenta Admin</div>
                <div className="text-sm text-[#666]">Administrador</div>
                <button className="text-xs text-[#1A56A0] font-semibold mt-1 hover:underline">Cambiar foto</button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nombre" defaultValue="Cuenta Admin" />
              <Field label="Correo" defaultValue="admin@emotiva.pe" type="email" />
            </div>
            <Field label="Nueva contraseña" placeholder="Dejar en blanco para no cambiar" type="password" />
            <Field label="Confirmar contraseña" placeholder="Repetir nueva contraseña" type="password" />
            <div>
              <label className="block text-sm font-semibold text-[#0C2B60] mb-1.5">Idioma</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30">
                <option>Español (Perú)</option>
                <option>Español (España)</option>
                <option>English</option>
              </select>
            </div>
          </div>
        )}

        {tab === "notificaciones" && (
          <div>
            <h3 className="font-black text-[#0C2B60] mb-4">Preferencias de notificaciones</h3>
            <div className="space-y-0">
              <Toggle label="Notificaciones por correo" desc="Recibir alertas y recordatorios por email" defaultChecked={true} />
              <Toggle label="Recordatorio de citas" desc="Alertas 24h antes de cada cita" defaultChecked={true} />
              <Toggle label="Alertas de riesgo de abandono" desc="Notificar cuando un paciente tenga riesgo alto" defaultChecked={true} />
              <Toggle label="Nuevos pagos registrados" desc="Confirmar cada pago vía email" defaultChecked={false} />
              <Toggle label="Informes completados" desc="Aviso cuando un informe esté listo" defaultChecked={true} />
              <Toggle label="Notificaciones del sistema" desc="Actualizaciones y mantenimientos" defaultChecked={false} />
            </div>
          </div>
        )}

        {tab === "seguridad" && (
          <div>
            <h3 className="font-black text-[#0C2B60] mb-4">Seguridad y acceso</h3>
            <div className="space-y-0 mb-6">
              <Toggle label="Autenticación de dos factores (2FA)" desc="Mayor seguridad al iniciar sesión" defaultChecked={false} />
              <Toggle label="Cerrar sesión automática" desc="Cerrar sesión tras 30 min de inactividad" defaultChecked={true} />
              <Toggle label="Registro de accesos" desc="Guardar log de todos los inicios de sesión" defaultChecked={true} />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="font-bold text-amber-800 text-sm mb-1">Sesiones activas</div>
              <div className="text-xs text-amber-700">1 sesión activa · Última actividad: ahora · Chrome — Windows</div>
              <button className="mt-2 text-xs font-semibold text-amber-700 hover:underline">Cerrar todas las demás sesiones</button>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-gray-100">
          {guardado && (
            <span className="text-sm text-emerald-600 font-semibold flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Guardado
            </span>
          )}
          <button onClick={guardar}
            className="px-6 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
