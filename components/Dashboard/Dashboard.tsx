import React from 'react'
import TopBar from './TopBar'
import DashboardOverview from './DashboardOverview'

const Dashboard = () => {
  return (
    <div className='bg-[#F9FAFB] border-l'>
      <TopBar />
      <DashboardOverview />
    </div>
  )
}

export default Dashboard
