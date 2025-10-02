import React from 'react';
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
