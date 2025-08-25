import React from 'react'
import CustomButton from '../CustomButton';
import { FaDownload } from 'react-icons/fa6';
import { PaymentTabs } from './PaymentTabs';

const PaymentsOverview = () => {
  return (
    <div className='px-4 flex flex-col gap-6 mt-[1rem] mb-[20rem]'>
      <PaymentTabs />
    </div>
  )
}

export default PaymentsOverview;
