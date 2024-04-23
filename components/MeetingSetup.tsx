"use client";

import React, { useState, useEffect } from 'react';
import { VideoPreview, useCall, DeviceSettings } from '@stream-io/video-react-sdk';

import { Button } from "@/components/ui/button";

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {

  const [isMicCamTogleOn, setIsMicCamTogleOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error('UseCall must be used within StreamCall Component')
  }

  useEffect(() => {
    if (isMicCamTogleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamTogleOn, call?.camera, call?.microphone])


    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className='flex h-16 items-center justify-center gap-3'>
              <label className='flex-center gap-2 font-medium'>
                <input
                  type="checkbox"
                  checked={isMicCamTogleOn}
                  onChange={(e) => setIsMicCamTogleOn(e.target.checked)}
                />
                Join with mic and camera off
              </label>
              <DeviceSettings />
            </div>
            <Button
                className='rounded-md bg-green-500 px-4 py-2.5'
                onClick={() => {
                  call.join();
                  setIsSetupComplete(true);
                }}
              >
              Join meeting
            </Button>
        </div>
    )
}

export default MeetingSetup;