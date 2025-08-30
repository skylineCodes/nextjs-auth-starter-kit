import React from 'react'
import StatCards from './StatCards';
import { HiRefresh } from "react-icons/hi";
import { useDateTime } from '@/hooks/useDateTime';
import TopComponents from '../TopComponents';
import SearchQueryDataTable from '../SearchQueryDataTable';

const DashboardOverview = () => {
  const { formattedDate, formattedTime } = useDateTime();

  return (
    <div className="px-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-start md:justify-between mb-4 mt-[1rem] gap-2">
        <span className="text-[12px] text-[#6B7280] font-medium sm:text-left">
          Last updated: {formattedDate} • {formattedTime}
        </span>
        <div className="flex gap-1 cursor-pointer items-center text-[14px] text-[#0284C7] font-bold justify-end md:justify-center hover:opacity-50">
          <HiRefresh className="text-[#0284C7] text-[14px]" /> Refresh Data
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 mb-4">
        <StatCards />
      </div>

      {/* Components grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_59%] gap-4 mb-4">
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
