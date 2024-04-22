import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import MobileNav from './MobileNav';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href={'/'} className='flex items-center gap-1'>
        <Image src='/icons/logo.svg' alt='logo' width={40} height={40} className='max-sm:size-10' />
        <span className='text-white text-[26px] font-extrabold max-sm:hidden'>Boom</span>
      </Link>
      <div className='flex justify-between gap-5'>
        {/* Clerk - User Management */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar;