import React from 'react'
import Search from '../Sidebar/Search';
import { FaBell } from 'react-icons/fa6';
import { MdHelp } from 'react-icons/md';

interface ITopBar {
  title: string;
}

const TopBar = ({ title }: ITopBar) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b px-4 py-2 border-stone-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold">{title}</h1>
        </div> 
        <div className="flex items-center gap-4">
          <Search placeholder="Search components..." />
          <FaBell className="text-[#6B7280]" size={20} />
          <MdHelp className="text-[#6B7280]" size={20} />
        </div>
      </div>
    </div>
  )
}

export default TopBar;
