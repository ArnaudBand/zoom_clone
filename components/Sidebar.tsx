'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section
    className='
    sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'
    >
        <div className='flex flex-col gap-6'>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

            return (
              <Link
                key={link.label}
                href={link.route}
                className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {'bg-blue-500': isActive,})}
                >
                  <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
                  <span className='text-lg font-semibold max-lg:hidden'>{link.label}</span>
                </Link>
            )
          })}
        </div>
    </section>
  )
}

export default Sidebar;