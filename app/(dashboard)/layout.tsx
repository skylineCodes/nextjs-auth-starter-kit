// app/(dashboard)/layout.tsx
import Sidebar from "@/components/Sidebar"
import MobileSidebar from "@/components/MobileSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[220px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (hamburger/drawer) */}
      <div className="block md:hidden">
        <MobileSidebar />
      </div>

      {/* Page content */}
      <div className="min-h-screen">{children}</div>
    </main>
  )
}
