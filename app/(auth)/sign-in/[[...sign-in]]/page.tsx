import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className='flex w-full items-center justify-center h-screen'>
      <SignIn path="/sign-in" routing='path' />
    </div>
  );
}