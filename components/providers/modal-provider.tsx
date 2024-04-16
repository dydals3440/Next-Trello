'use client';

import { useEffect, useState } from 'react';
import { CardModal } from '../modals/card-modal';

export const ModalProvider = () => {
  // protect hydration error
  const [isMounted, setIsMounted] = useState(false);

  // useEffect는 클라이언트 때만 실행되므로, 무조건 모달은 클라이언트 환경에서만 뜨게.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
    </>
  );
};
