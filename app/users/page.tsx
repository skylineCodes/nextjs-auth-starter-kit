import Users from '@/components/Users';
import Sidebar from '@/components/Sidebar'
import React from 'react'

const UsersPage = () => {
  return (
    <main className="grid gap-0 grid-cols-[220px_1fr] h-[100vh]">
      <Sidebar />
      <Users />
    </main>
  )
}

export default UsersPage;
