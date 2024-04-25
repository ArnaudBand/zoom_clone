"use client";

import React, { useState } from "react";
import Image from "next/image";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";

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

  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();

      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create a call');

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

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting Created" })
    } catch (error) {
      toast({ title: "Failed to create meeting" })
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
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-300">
              Add a description
            </label>
            <Textarea 
              className='border-none bg-black/50 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => {
                setValues({...values, description: e.target.value})
              }}
              />
          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className="text-base text-normal leading-[22px] text-sky-300">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({...values, dateTime: date!})}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="w-full rounded bg-black/20 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting created"
          handleClick={() => {
            // navigator.clipboard.writeText(meetingLink);
            // toast({title: "Link copied"})
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
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