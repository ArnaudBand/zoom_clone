"use client";

import React, { useState } from 'react';
import { PaginatedGridLayout, SpeakerLayout, CallParticipantsList, CallControls } from '@stream-io/video-react-sdk';
import { cn } from "@/lib/utils";

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');

    const [showParticipants, setShowParticipants] = useState<boolean>(false);

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
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block': showParticipants })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
                <CallControls />
            </div>
        </div>
    )
}

export default MeetingRoom;