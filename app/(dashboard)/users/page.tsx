import React from 'react';
import Users from '@/components/Users';

const UsersPage = () => {
  return (
    <main className="grid gap-0 h-[100vh] grid-cols-1 md:grid-cols-[1fr]">
      <Users />
    </main>
  )
}

export default UsersPage;
