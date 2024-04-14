'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useMobileSidebar } from '@/hooks/use-mobile-sidbar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sidebar } from './sidebar';

export const MobileSidebar = () => {
  const pathname = usePathname();
  // hydration error zustand state과 모달이나, sheet컴포넌트 사용시
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  // next.js에서 use client로 적으면, SSR이 아니라는 것, 모달이나 시트를 쓸때, 클라이언트 사이드에서 하이드레이션 에러나옴.
  // useEffect를 쓰면, Client 사이드에서만 동작하게 보장한다.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // url이 변경될떄마다, 모바일 사이드바는 닫힐것이다.
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* 모바일일때만 보이게 */}
      <Button
        onClick={onOpen}
        className='block md:hidden mr-2'
        variant='ghost'
        size='sm'
      >
        <Menu className='h-4 w-4' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side='left' className='p-2 pt-10'>
          <Sidebar storageKey='t-sidebar-mobile-state' />
        </SheetContent>
      </Sheet>
    </>
  );
};
