import React from 'react'
import TopBar from '../TopBar';
import DevicesOverview from '../Devices/DevicesOverview';

const RecentLogins = () => {
  return (
    <div className='bg-[#F9FAFB] border-l'>
      <TopBar title="Recent Logins" />
      <DevicesOverview />
    </div>
  )
}

export default RecentLogins;
