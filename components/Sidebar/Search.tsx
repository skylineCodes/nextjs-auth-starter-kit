"use client";

import CommandMenu from './CommandMenu';
import React, { useState } from 'react';
import { FiCommand, FiSearch } from 'react-icons/fi';

interface ISearch {
  placeholder?: string;
}

const Search = ({ placeholder }: ISearch) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-[#E5E7EB] relative rounded flex items-center px-2 py-1.5 text-sm">
        <FiSearch className='mr-2 text-[#6B7280]' />
        <input 
          onFocus={(e) => {
            e.target.blur();
            setOpen(true);
          }}
          type="text"
          placeholder={placeholder ? placeholder : 'Search...'}
          className='w-full bg-transparent placeholder:text-stone-400 focus:outline-none'
        />

        <span className='p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2'>
          <FiCommand />K
        </span>
      </div>

      <CommandMenu open={open} setOpen={setOpen} />
    </>
  )
}

export default Search
