import React from 'react'
import CustomButton from '../CustomButton';
import { FaPlus, FaTags, FaUpload } from 'react-icons/fa6';
import { Types } from './Types';
import { Status } from './Status';
import ComponentsDataTable from './ComponentsDataTable';

const ComponentOverview = () => {
  return (
    <div className='px-4 flex flex-col gap-6 mt-[1rem]'>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <CustomButton title="Add Component" link="/add-component" icon={<FaPlus />} className='!h-[38px]' />
          <CustomButton title="Bulk Upload" link="/add-component" icon={<FaUpload />} className='!h-[38px] !bg-white border border-[#D1D5DB] !text-[#374151] hover:opacity-50' />
          <CustomButton title="Bulk Tag" link="/add-component" icon={<FaTags />} className='!h-[38px] !bg-white border border-[#D1D5DB] !text-[#374151] hover:opacity-50' />
        </div>
        <div className="flex gap-4 items-center justify-end">
          <Types />
          <Status />
        </div>
      </div>
      <div className="">
        <ComponentsDataTable />
      </div>
    </div>
  )
}

export default ComponentOverview;
