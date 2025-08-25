'use client';

import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <main className="grid gap-0 grid-cols-[220px_1fr] h-[100vh]">
      <Sidebar />
      <Dashboard />
    </main>
  );
}
