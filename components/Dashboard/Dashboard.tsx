import React from 'react'
import DashboardOverview from './DashboardOverview'
import TopBar from '../TopBar'

const Dashboard = () => {
  return (
    <div className='bg-[#F9FAFB] border-l'>
      <TopBar title="Dashboard Overview" />
      <DashboardOverview />
    </div>
  )
}

export default Dashboard
