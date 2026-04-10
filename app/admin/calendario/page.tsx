"use client";
import { useState } from "react";
import citas from "@/data/citas.json";

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const statusStyle: Record<string, string> = {
  confirmada: "bg-blue-100 text-blue-700 border-blue-200",
  pendiente: "bg-yellow-100 text-yellow-700 border-yellow-200",
  completada: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelada: "bg-red-100 text-red-700 border-red-200",
};

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // 0=Lun
  const days: { date: Date; currentMonth: boolean }[] = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month, -i), currentMonth: false });
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: new Date(year, month, i), currentMonth: true });
  }
  while (days.length < 42) {
    days.push({ date: new Date(year, month + 1, days.length - lastDay.getDate() - startOffset + 1), currentMonth: false });
  }
  return days;
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function AdminCalendarioPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(3); // April = 3
  const [selected, setSelected] = useState<string | null>("2026-04-08");

  const days = getCalendarDays(year, month);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const citasDelDia = selected ? citas.filter((c) => c.fecha === selected).sort((a, b) => a.hora.localeCompare(b.hora)) : [];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <p className="text-[#666] text-sm">{citas.length} citas en el sistema</p>
        <button className="self-start sm:self-auto px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:-translate-y-0.5">
          + Nueva cita
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Month nav */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-[#666]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="font-black text-[#0C2B60] text-lg">{MESES[month]} {year}</h2>
            <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-[#666]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DIAS.map((d) => (
              <div key={d} className="py-2.5 text-center text-xs font-bold text-[#666] uppercase tracking-wider">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {days.map(({ date, currentMonth }, idx) => {
              const iso = toISO(date);
              const daysCitas = citas.filter((c) => c.fecha === iso);
              const isSelected = iso === selected;
              const isToday = iso === "2026-04-08";
              return (
                <button
                  key={idx}
                  onClick={() => setSelected(iso)}
                  className={`min-h-[72px] p-1.5 border-b border-r border-gray-100 text-left transition-colors ${
                    isSelected ? "bg-[#E8F0FB]" : currentMonth ? "hover:bg-gray-50" : "bg-gray-50/50"
                  }`}>
                  <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-semibold mb-1 ${
                    isToday ? "bg-[#1A56A0] text-white font-black" : currentMonth ? "text-[#0C2B60]" : "text-gray-300"
                  }`}>
                    {date.getDate()}
                  </span>
                  <div className="space-y-0.5">
                    {daysCitas.slice(0, 2).map((c) => (
                      <div key={c.id} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded truncate border ${statusStyle[c.estado]}`}>
                        {c.hora} {c.paciente.split(" ")[0]}
                      </div>
                    ))}
                    {daysCitas.length > 2 && (
                      <div className="text-[10px] text-[#1A56A0] font-bold pl-1">+{daysCitas.length - 2} más</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day detail */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden self-start">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-[#0C2B60] text-sm">
              {selected ? `Citas del ${selected}` : "Selecciona un día"}
            </h3>
            <p className="text-xs text-[#666] mt-0.5">{citasDelDia.length} cita{citasDelDia.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="divide-y divide-gray-50">
            {citasDelDia.length === 0 ? (
              <div className="p-8 text-center text-[#666] text-sm">Sin citas ese día</div>
            ) : citasDelDia.map((c) => (
              <div key={c.id} className="px-5 py-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#E8F0FB] text-[#1A56A0] font-black text-xs px-2 py-1 rounded-lg">{c.hora}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[c.estado]}`}>{c.estado}</span>
                </div>
                <div className="font-semibold text-[#0C2B60] text-sm">{c.paciente}</div>
                <div className="text-xs text-[#666]">{c.psicologo.split(" ").slice(0, 2).join(" ")} · {c.consultorio}</div>
                <div className="text-xs text-gray-400 mt-0.5">{c.tipo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
