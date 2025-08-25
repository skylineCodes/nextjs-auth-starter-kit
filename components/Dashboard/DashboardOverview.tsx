import React from 'react'
import StatCards from './StatCards';
import { HiRefresh } from "react-icons/hi";
import { useDateTime } from '@/hooks/useDateTime';
import TopComponents from '../TopComponents';
import SearchQueryDataTable from '../SearchQueryDataTable';

const DashboardOverview = () => {
  const { greeting, emoji, formattedDate, formattedTime } = useDateTime();

  return (
    <div className='px-4'>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[14px] block text-[#6B7280] font-medium">
          Last updated: {formattedDate} • {formattedTime}
        </span>
        <div className="flex gap-1 cursor-pointer items-center text-[14px] text-[#0284C7] font-bold block hover:opacity-50"><HiRefresh className='text-[#0284C7] text-[14px]' /> Refresh Data</div>
      </div>
      <div className='grid gap-3 grid-cols-12 mb-4'>
        <StatCards />
      </div>
      <div className="grid grid-cols-[40%_59%] gap-4 mb-4">
        <div className="w-full">
          <TopComponents />
        </div>
        <div className="w-full">
          <SearchQueryDataTable />
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
