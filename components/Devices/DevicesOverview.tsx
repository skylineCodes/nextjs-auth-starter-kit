import React from 'react'
import DevicesDataTable from './DevicesDataTable';

const DevicesOverview = () => {
  return (
    <div className='px-4 flex flex-col gap-6 mt-[1rem]'>
      <div className="">
        <DevicesDataTable />
      </div>
    </div>
  )
}

export default DevicesOverview;
