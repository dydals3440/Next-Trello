import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
// 컴포넌트에는 export Default X layout과 page에만 default
export const Navbar = () => {
  return (
    <div className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
      {/* md 속성을 통해 Desktop일떄 너무 커졌을때, stop resizing하게 해줌 */}
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <Button size='sm' variant='outline' asChild>
            <Link href='/sign-in'>Login</Link>
          </Button>
          <Button>
            <Link href='/sign-up'>Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
