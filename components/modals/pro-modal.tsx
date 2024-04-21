'use client';

import { useProModal } from '@/hooks/use-pro-modal';
import { Dialog, DialogContent } from '../ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const ProModal = () => {
  const proModal = useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className='max-w-md p-0 overflow-hidden'>
        <div className='aspect-video relative flex items-center justify-center'>
          <Image src='/hero.svg' alt='Hero' className='object-cover' fill />
        </div>
        <div className='text-neutral-700 mx-auto space-y-6 p-6'>
          <h2 className='font-semibold text-xl'>Upgrade to YOLO Pro Today!</h2>
          <p className='text-xs font-semibold text-neutral-600'>
            Explore the best of YOLO
          </p>
          <div className='text-sm list-disc'>
            <li>Unlimited boards</li>
            <li>Advanced checklists</li>
            <li>Admin and security features</li>
            <li>And more!</li>
          </div>
        </div>
        <Button className='w-full' variant={'primary'}>
          Upgrade
        </Button>
      </DialogContent>
    </Dialog>
  );
};

// 11:16:49