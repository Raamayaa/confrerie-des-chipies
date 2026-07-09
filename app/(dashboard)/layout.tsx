import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/admin/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Background />
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-8 px-8 pt-28 pb-10">
        <Sidebar />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
}