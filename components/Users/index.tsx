import React from 'react'
import TopBar from '../TopBar';
import UsersOverview from './UsersOverview';

const Users = () => {
  return (
    <div className='bg-[#F9FAFB] border-l'>
      <TopBar title="Users & Access" />
      <UsersOverview />
    </div>
  )
}

export default Users;
