import React from 'react'
import Search from '../Sidebar/Search';
import { FaBell } from 'react-icons/fa';
import { MdHelp } from 'react-icons/md';

interface ITopBar {
  title: string;
}

const TopBar = ({ title }: ITopBar) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b px-4 py-2 border-stone-200">
      <div className="flex items-center gap-2">

        {/* Title */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold w-full text-center sm:w-auto sm:text-left">
          {title}
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Show full search bar on md+ screens */}
          <div className="hidden md:block">
            <Search placeholder="Search components..." />
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100">
            <FaBell className="text-gray-500" size={18} />
          </button>

          <button className="hidden md:block p-2 rounded-lg hover:bg-gray-100">
            <MdHelp className="text-gray-500" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopBar;
