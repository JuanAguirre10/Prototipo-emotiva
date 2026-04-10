"use client";
import { useState } from "react";

const papelera = [
  { id: "del1", nombre: "Informe borrador (eliminado)", tipo: "Informe", eliminadoPor: "Cuenta Admin", fecha: "2026-04-04", detalle: "Informe sin título — sin asignar" },
  { id: "del2", nombre: "Luis Fernández Campos", tipo: "Paciente", eliminadoPor: "Cuenta Admin", fecha: "2026-03-20", detalle: "Registro duplicado" },
  { id: "del3", nombre: "Cita cancelada 28/02", tipo: "Cita", eliminadoPor: "Recepción Emotiva", fecha: "2026-03-01", detalle: "Cita no realizada — paciente no se presentó" },
  { id: "del4", nombre: "Nota borrador incompleta", tipo: "Nota", eliminadoPor: "Dra. Camila Torres", fecha: "2026-03-15", detalle: "Nota vacía eliminada" },
];

const tipoStyle: Record<string, string> = {
  Informe: "bg-[#E8F0FB] text-[#1A56A0]",
  Paciente: "bg-orange-100 text-orange-700",
  Cita: "bg-blue-100 text-blue-700",
  Nota: "bg-violet-100 text-violet-700",
};

export default function AdminPapeleraPage() {
  const [items, setItems] = useState(papelera);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const restaurar = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const eliminarDef = (id: string) => { setItems((prev) => prev.filter((i) => i.id !== id)); setConfirmDelete(null); };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[#666] text-sm">{items.length} elemento{items.length !== 1 ? "s" : ""} en papelera</p>
        {items.length > 0 && (
          <button onClick={() => setItems([])}
            className="px-4 py-2 border border-red-200 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors">
            Vaciar papelera
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <p className="text-[#666] font-semibold">La papelera está vacía</p>
          <p className="text-sm text-gray-400 mt-1">Los elementos eliminados aparecerán aquí</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="font-semibold text-[#0C2B60] text-sm">{item.nombre}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tipoStyle[item.tipo]}`}>{item.tipo}</span>
                  </div>
                  <p className="text-xs text-[#666]">{item.detalle}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Eliminado por {item.eliminadoPor} · {item.fecha}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => restaurar(item.id)}
                  className="px-4 py-2 border-2 border-[#1A56A0]/20 text-[#1A56A0] font-bold text-xs rounded-xl hover:border-[#1A56A0] hover:bg-[#E8F0FB] transition-all">
                  Restaurar
                </button>
                {confirmDelete === item.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => eliminarDef(item.id)} className="px-3 py-2 bg-red-500 text-white font-bold text-xs rounded-xl hover:bg-red-600 transition-colors">
                      Confirmar
                    </button>
                    <button onClick={() => setConfirmDelete(null)} className="px-3 py-2 bg-gray-100 text-[#666] font-bold text-xs rounded-xl hover:bg-gray-200 transition-colors">
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(item.id)}
                    className="px-4 py-2 bg-red-50 text-red-500 font-bold text-xs rounded-xl hover:bg-red-100 transition-all border border-red-200">
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-700">
        <strong>Nota:</strong> Los elementos en papelera se eliminan permanentemente tras 30 días. Esta acción no se puede deshacer.
      </div>
    </div>
  );
}
