import type { ReactNode } from "react";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto flex max-w-7xl gap-8 px-8 pb-20 pt-36">
        <AdminSidebar />

        <section className="flex-1">
          <AdminHeader />
          {children}
        </section>
      </main>
    </>
  );
}