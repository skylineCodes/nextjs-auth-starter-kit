import Devices from '@/components/Devices';
import React from 'react'

const ActiveDevicesPage = () => {
  return (
    <main className="grid gap-0 h-[100vh] grid-cols-1 md:grid-cols-[1fr]">
      <Devices />
    </main>
  )
}

export default ActiveDevicesPage;
