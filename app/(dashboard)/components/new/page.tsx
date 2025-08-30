import React from 'react'
import CreateComponentForm from './new-component'
import TopBar from '@/components/TopBar'

const NewComponent = () => {
  return (
    <div className='bg-[#FFF] border-l h-full'>
      <TopBar title="Add New Component" />
      <CreateComponentForm />
    </div>
  )
}

export default NewComponent
