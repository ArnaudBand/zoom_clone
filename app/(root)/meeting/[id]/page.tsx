"use client";

import {useUser} from '@clerk/nextjs';

const Meeting = ({ params } : { params: { id: string}}) => {
  const {user, isLoaded}  = useUser();
  return (
    <div>Meeting Room: #{params.id}</div>
  )
}

export default Meeting;