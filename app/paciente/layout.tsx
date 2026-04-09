import Sidebar from "@/components/private/Sidebar";

export default function PacienteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="paciente" userName="Ana García López" userEmail="paciente@emotiva.pe" />
      <div className="flex-1 min-w-0 overflow-auto">{children}</div>
    </div>
  );
}
