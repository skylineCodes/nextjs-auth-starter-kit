'use client';

import Dashboard from "@/components/Dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <main className="grid gap-0 h-[100vh] grid-cols-1 md:grid-cols-[1fr]">
      <Dashboard />
    </main>
  );
}
