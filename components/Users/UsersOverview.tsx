import React from 'react';
import { Plans } from './Plans';
import { Status } from './Status';
import CustomButton from '../CustomButton';
import { FaDownload } from 'react-icons/fa6';
import UsersDataTable from './UsersDataTable';

const ComponentOverview = () => {
  return (
    <div className='px-4 flex flex-col mt-[1rem] gap-6'>
      <div className="flex justify-between items-center bg-white p-4 rounded-md border border-[#E5E7EB]">
        <div className="flex justify-start items-center gap-4">
          <div className="flex gap-3 items-center">
            <span>Plan:</span>
            <Plans />
          </div>
          <div className="flex gap-3 items-center">
            <span>Status:</span>
            <Status />
          </div>
        </div>
        <div className="flex gap-4 items-center justify-end">
          <CustomButton title="Export Users" link="/export-component" icon={<FaDownload />} className='!h-[38px] !text-white border border-[#D1D5DB] hover:!text-[#374151]' />
        </div>
      </div>
      <div className="mb-10">
        <UsersDataTable />
      </div>
    </div>
  )
}

export default ComponentOverview;
