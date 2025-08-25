import Components from '@/components/Components';
import Sidebar from '@/components/Sidebar'
import React from 'react'

const ComponentsPage = () => {
  return (
    <main className="grid gap-0 grid-cols-[220px_1fr] h-[100vh]">
      <Sidebar />
      <Components />
    </main>
  )
}

export default ComponentsPage;
