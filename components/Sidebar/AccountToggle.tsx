import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UIButterLogo from '../../assets/images/uiButterLogo.png';

const AccountToggle = () => {
  return (
    <div className='border-b px-4 py-2 border-stone-300'>
      <Link href="/">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold w-full text-center sm:w-auto sm:text-left">
          Menu
        </h3>
      </Link>
    </div>
  )
}

export default AccountToggle
