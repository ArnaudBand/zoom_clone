'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';


const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Image src={'/icons/hamburger.svg'} alt={'menu'} width={24} height={24} className='cursor-pointer sm:hidden' />
                </SheetTrigger>
                <SheetContent side={'left'} className='border-none bg-dark-1'>
                    <Link href={'/'} className='flex items-center gap-1'>
                        <Image src='/icons/logo.svg' alt='logo' width={40} height={40} className='max-sm:size-10' />
                        <span className='text-white text-[26px] font-extrabold'>Boom</span>
                    </Link>
                    <div className='flex h-[calc(100vh-72px )] flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col pt-16 text-white gap-6'>
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.route;

                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                key={link.label}
                                                href={link.route}
                                                className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', { 'bg-blue-500': isActive, })}
                                            >
                                                <Image src={link.imgUrl} alt={link.label} width={20} height={24} />
                                                <span className='font-semibold'>{link.label}</span>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav;