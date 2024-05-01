"use client";

import { useUser } from '@clerk/nextjs';
import React from 'react';

const Table = ({ title, description }: { title: string; description: string | undefined }) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className='text-base font-medium text-sky-100 lg:text-xl xl:min-w-32'>{title}:</h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
  </div>
)

const PersonalRoom = () => {

  const { user } = useUser();
  const meetingId = user?.id;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Personal Room</h1>
        <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
          <Table title='Topic' description={`${user?.username}'s meeting Room`} />
          <Table title='Meeting Id' description={meetingId} />
          <Table title='Invite Link' description={meetingLink} />
        </div>
    </section>
  )
}

export default PersonalRoom;