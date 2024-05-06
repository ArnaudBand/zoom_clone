"use client";

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

const Table = ({ title, description }: { title: string; description: string | undefined }) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className='text-base font-medium text-sky-100 lg:text-xl xl:min-w-32'>{title}:</h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
  </div>
)

const PersonalRoom = () => {

  const { user } = useUser();
  const meetingId = user?.id;

  const { toast } = useToast();

  const client = useStreamVideoClient();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const { call } = useGetCallById(meetingId!);

  const router = useRouter();

  const startRoom = async () => {
    if (!user || !client) return;

    const newCall = client.call('default', meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  };

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Personal Room</h1>
        <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
          <Table title='Topic' description={`${user?.username}'s meeting Room`} />
          <Table title='Meeting Id' description={meetingId} />
          <Table title='Invite Link' description={meetingLink} />
        </div>
        <div className='flex gap-5'>
          <Button className='bg-blue-500' onClick={startRoom}>
            Start Room
          </Button>
          <Button className='bg-gray-500' onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({title: 'Link Copied'});
          }}>
            Copy Invitation
          </Button>
        </div>
    </section>
  )
}

export default PersonalRoom;