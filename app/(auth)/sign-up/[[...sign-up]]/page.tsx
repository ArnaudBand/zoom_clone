import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className='flex w-full items-center justify-center h-screen'>
      <SignUp path="/sign-up" routing='path' />
    </div>
  );
}