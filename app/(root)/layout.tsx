import type { Metadata } from "next";
import React, { ReactNode } from 'react';
import StreamVideoProvider from '@/providers/StreamClientProvider';

export const metadata: Metadata = {
  title: "BOOM",
  description: "Video calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({children} : {children : ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout;