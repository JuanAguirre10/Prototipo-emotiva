import Sidebar from "@/components/private/Sidebar";

export default function RecepcionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="recepcion" userName="Recepción Emotiva" userEmail="recepcion@emotiva.pe" />
      <div className="flex-1 min-w-0 overflow-auto">{children}</div>
    </div>
  );
}
