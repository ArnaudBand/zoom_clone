"use client";

import { useState } from "react";
import Image from "next/image";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingTypeList = () => {

    const router = useRouter();

    const [meetingState, setMeetingState] = useState<
        'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })

    const [callDetails, setCallDetails] = useState<Call>();

    const { user } = useUser();
    const client = useStreamVideoClient();

    const createMeeting = async () => {
        if(!client || !user) return;

        try {
            const id = crypto.randomUUID();

            const call = client.call('default', id);

            if(!call) throw new Error('Failed to create a call');

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();

            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            if(!values.description) {
                router.push(`/meeting/${call.id}`);
            }
        } catch (error) {
            
        }
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