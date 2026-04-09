import psicologos from "@/data/psicologos.json";
import pacientes from "@/data/pacientes.json";

export default function AdminPsicologosPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-dark">Psicólogos</h1>
          <p className="text-[#666666] text-sm mt-0.5">{psicologos.length} profesionales activos</p>
        </div>
        <button className="px-5 py-2.5 bg-[#1A56A0] text-white font-bold text-sm rounded-xl hover:bg-[#2D6CC0] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          + Agregar psicólogo
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {psicologos.map((ps) => {
          const pacsAsignados = pacientes.filter((p) => p.psicologoId === ps.id);
          const activos = pacsAsignados.filter((p) => p.estado === "activo").length;
          const riesgoAlto = pacsAsignados.filter((p) => p.riesgoAbandono === "alto").length;
          return (
            <div key={ps.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-1.5 bg-gradient-to-r from-[#1A56A0] to-[#2D6CC0]" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A56A0] to-[#2D6CC0] flex items-center justify-center text-white font-black shrink-0">
                      {ps.nombre.split(" ")[1][0]}{ps.nombre.split(" ")[2][0]}
                    </div>
                    <div>
                      <h2 className="font-black text-dark">{ps.nombre}</h2>
                      <p className="text-[#1A56A0] text-sm font-semibold">{ps.especialidad}</p>
                      <p className="text-[#666666] text-xs">{ps.colegiatura}</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">Activo</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-[#E8F0FB] rounded-xl p-3 text-center">
                    <div className="text-xl font-black text-[#1A56A0]">{activos}</div>
                    <div className="text-xs text-[#666666]">Pacientes activos</div>
                  </div>
                  <div className="bg-[#E8F0FB] rounded-xl p-3 text-center">
                    <div className="text-xl font-black text-[#1A56A0]">{ps.citasEstaSemana}</div>
                    <div className="text-xs text-[#666666]">Citas semana</div>
                  </div>
                  <div className={`rounded-xl p-3 text-center ${riesgoAlto > 0 ? "bg-red-50" : "bg-[#E8F0FB]"}`}>
                    <div className={`text-xl font-black ${riesgoAlto > 0 ? "text-red-600" : "text-[#1A56A0]"}`}>{riesgoAlto}</div>
                    <div className="text-xs text-[#666666]">Riesgo alto</div>
                  </div>
                </div>

                <p className="text-[#666666] text-xs leading-relaxed mb-4">{ps.descripcion}</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl border-2 border-[#1A56A0] text-[#1A56A0] font-bold text-xs hover:bg-[#E8F0FB] transition-colors">
                    Ver perfil
                  </button>
                  <button className="flex-1 py-2 rounded-xl bg-[#1A56A0] text-white font-bold text-xs hover:bg-[#2D6CC0] transition-colors">
                    Ver pacientes
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
