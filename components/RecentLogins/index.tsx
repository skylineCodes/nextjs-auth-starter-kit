import React from 'react'
import TopBar from '../TopBar';
import RecentLoginsOverview from './RecentLoginsOverview';

const RecentLogins = () => {
  return (
    <div className='bg-[#F9FAFB] border-l'>
      <TopBar title="Recent Logins" />
      <RecentLoginsOverview />
    </div>
  )
}

export default RecentLogins;
