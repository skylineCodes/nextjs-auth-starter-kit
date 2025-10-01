import React from 'react'
import CustomButton from '../CustomButton';
import { FaPlus, FaTags, FaUpload } from 'react-icons/fa6';
import RecentLoginsDataTable from './RecentLoginsDataTable';

const RecentLoginsOverview = () => {
  return (
    <div className='px-4 flex flex-col gap-6 mt-[1rem]'>
      <div className="">
        <RecentLoginsDataTable />
      </div>
    </div>
  )
}

export default RecentLoginsOverview;
