import React from 'react'
import TopBar from '../TopBar';
import DevicesOverview from './DevicesOverview';

const Devices = () => {
  return (
    <div className='bg-[#F9FAFB] border-l'>
      <TopBar title="Session Devices" />
      <DevicesOverview />
    </div>
  )
}

export default Devices;
