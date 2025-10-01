import RecentLogins from '@/components/RecentLogins';
import React from 'react'

const RecentLoginsPage = () => {
  return (
    <main className="grid gap-0 h-[100vh] grid-cols-1 md:grid-cols-[1fr]">
      <RecentLogins />
    </main>
  )
}

export default RecentLoginsPage;
