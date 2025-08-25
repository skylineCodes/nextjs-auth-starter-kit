import React from 'react'
import TopSearch from './TopSearch';
import { DaysFilter } from './DaysFilter';
import CustomButton from '../CustomButton';
import { FaDownload } from 'react-icons/fa6';
import ComponentCopyCountsAnalytics from './ComponentCopyCountsAnalytics';
import ZeroSearch from './ZeroSearch';

const SearchInsightsOverview = () => {
  return (
    <div className='px-4 flex flex-col gap-6 mt-[1rem] mb-[20rem]'>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <DaysFilter />
          <CustomButton title="Export" link="/add-component" icon={<FaDownload />} className='!h-[38px] !bg-white border border-[#D1D5DB] !text-[#374151] hover:opacity-50' />
        </div>
      </div>
      <div className="grid grid-cols-[49%_49%] gap-4 mb-4">
        <div className="w-full">
          <TopSearch />
        </div>
        <div className="w-full">
          <ComponentCopyCountsAnalytics />
        </div>
        <div className="w-full">
          <ZeroSearch />
        </div>
      </div>
    </div>
  )
}

export default SearchInsightsOverview;
