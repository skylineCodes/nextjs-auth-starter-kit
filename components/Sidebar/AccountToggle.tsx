import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UIButterLogo from '../../assets/images/uiButterLogo.png';

const AccountToggle = () => {
  return (
    <div className='border-b px-4 py-2 border-stone-300'>
      <Link href="/">
        <Image src={UIButterLogo} alt="uiButter" className='w-[120px]' />
      </Link>
    </div>
  )
}

export default AccountToggle
