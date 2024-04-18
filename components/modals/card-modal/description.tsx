'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { CardWithLists } from '@/types';

interface DescriptionProps {
  data: CardWithLists;
}

export const Description = ({ data }: DescriptionProps) => {
  return <div>{data.title}</div>;
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
        <Skeleton className='w-full h-[78px] bg-neutral-200' />
      </div>
    </div>
  );
};
