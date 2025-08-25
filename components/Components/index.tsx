import React from 'react'
import ComponentOverview from './ComponentOverview';
import TopBar from '../TopBar';

const Components = () => {
  return (
    <div className='bg-[#F9FAFB] border-l'>
      <TopBar title="Components" />
      <ComponentOverview />
    </div>
  )
}

export default Components;
