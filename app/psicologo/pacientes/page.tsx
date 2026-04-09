import Link from "next/link";
import pacientes from "@/data/pacientes.json";

const misPacientes = pacientes.filter((p) => p.psicologoId === "ps1");

const riesgoConfig: Record<string, { color: string; bg: string }> = {
  bajo: { color: "text-emerald-700", bg: "bg-emerald-100" },
  medio: { color: "text-yellow-700", bg: "bg-yellow-100" },
  alto: { color: "text-red-700", bg: "bg-red-100" },
};

export default function PsicologoPacientesPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-dark">Mis Pacientes</h1>
        <p className="text-[#666666] text-sm mt-0.5">{misPacientes.filter((p) => p.estado === "activo").length} activos · {misPacientes.filter((p) => p.estado === "pausado").length} pausados</p>
      </div>

      <div className="space-y-3">
        {misPacientes.map((p) => {
          const rc = riesgoConfig[p.riesgoAbandono];
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex items-center gap-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-bold shrink-0">
                {p.nombre.split(" ")[0][0]}{p.nombre.split(" ")[1][0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-dark">{p.nombre}</div>
                <div className="text-[#666666] text-xs mt-0.5">{p.edad} años · {p.sesionesRealizadas} sesiones realizadas · Última: {p.ultimaSesion}</div>
                <div className="text-[#666666] text-xs mt-0.5 truncate">{p.motivoConsulta}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`${rc.bg} ${rc.color} text-xs font-bold px-2.5 py-1 rounded-full`}>
                  {p.riesgoAbandono === "alto" ? "⚠️ " : ""}{p.riesgoAbandono}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.estado === "activo" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                  {p.estado}
                </span>
                <Link href={`/psicologo/historial/${p.id}`}
                  className="px-3 py-1.5 bg-[#E8F0FB] text-[#1A56A0] font-bold text-xs rounded-lg hover:bg-[#1A56A0] hover:text-white transition-all">
                  Historial →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
