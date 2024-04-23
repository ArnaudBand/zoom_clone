"use client";

import { useState } from "react";
import Image from "next/image";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {

    const router = useRouter();

    const [meetingState, setMeetingState] = useState<
        'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const createMeeting = () => {
        
    };

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
            <HomeCard
                title="New Meeting"
                description="Start an instant meeting"
                icon="/icons/add-meeting.svg"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-orange-600'
            />
            <HomeCard
                title="Schedule Meeting"
                description="Plan your meeting"
                icon="/icons/schedule.svg"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className='bg-blue-600'
            />
            <HomeCard
                title="View Recordings"
                description="Check out your recordings"
                icon="/icons/recordings.svg"
                handleClick={() => router.push('/recordings')}
                className='bg-purple-600'
            />
            <HomeCard
                title="Join Meeting"
                description="Via invitation link"
                icon="/icons/join-meetings.svg"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className='bg-yellow-600'
            />
            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList;