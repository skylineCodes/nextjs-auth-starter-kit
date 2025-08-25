import React from 'react'
import Sidebar from '@/components/Sidebar'
import SearchInsights from '@/components/SearchInsights';

const SightIsightsPage = () => {
  return (
    <main className="grid gap-0 grid-cols-[220px_1fr] h-[100vh]">
      <Sidebar />
      <SearchInsights />
    </main>
  )
}

export default SightIsightsPage;
