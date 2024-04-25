"use client";

import React, { useState } from 'react';
import {
    PaginatedGridLayout, SpeakerLayout, CallParticipantsList, CallControls, CallStatsButton
} from '@stream-io/video-react-sdk';
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');

    const [showParticipants, setShowParticipants] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left' />
            default:
                return <SpeakerLayout participantsBarPosition='right' />
        }
    }

    return (
        <div className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className='relative flex-center size-full'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout />
                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showParticipants })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
                <CallControls />
                <DropdownMenu>
                    <div className='flex items-center'>
                        <DropdownMenuTrigger className='rounded-2xl cursor-pointer bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                            <LayoutList size={20} className='text-white' />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-black/60 bg-black/20 text-white/80'>
                        {['Grid', 'Speaker-Left', 'Speaker-right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => {
                                    setLayout(item.toLowerCase() as CallLayoutType)
                                }}>
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className='border-black/20' />
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button
                    className='
                        rounded-2xl cursor-pointer bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'
                    onClick={() => setShowParticipants((prev) => !prev)}
                >
                    <User />
                </button>
                {!isPersonalRoom && <EndCallButton />}
            </div>
        </div>
    )
}

export default MeetingRoom;