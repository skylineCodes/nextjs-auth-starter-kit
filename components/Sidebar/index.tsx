import React from 'react'
import { RouteSelect } from './RouteSelect'
import AccountToggle from './AccountToggle'
import Account from './Account'

const Sidebar = () => {
  return (
    <div className="">
      <div className='sticky top-0 h-[calc(100vh-32px-48px)]'>
        <AccountToggle />
        <RouteSelect />
      </div>

      <Account />
    </div>
  )
}

export default Sidebar
