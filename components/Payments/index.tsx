import React from 'react'
import PaymentsOverview from './PaymentsOverview';
import TopBar from '../TopBar';

const Payments = () => {
  return (
    <div className='bg-[#F9FAFB] border-l'>
      <TopBar title='Payments' />
      <PaymentsOverview />
    </div>
  )
}

export default Payments;
