import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
// 컴포넌트에는 export Default X layout과 page에만 default
export const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full p-4 border-t bg-slate-100'>
      {/* md 속성을 통해 Desktop일떄 너무 커졌을때, stop resizing하게 해줌 */}
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <Button size='sm' variant='ghost'>
            Privacy Policy
          </Button>
          <Button size='sm' variant='ghost'>
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
