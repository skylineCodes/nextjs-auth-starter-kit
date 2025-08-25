'use client';

import Sidebar from "@/components/Sidebar";
import Payments from "@/components/Payments";

export default function PaymentsPage() {
  return (
    <main className="grid gap-0 grid-cols-[220px_1fr] h-[100vh]">
      <Sidebar />
      <Payments />
    </main>
  );
}
