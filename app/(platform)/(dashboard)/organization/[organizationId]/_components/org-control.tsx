'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useOrganizationList } from '@clerk/nextjs';

export const OrgControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();
  // sidebar 클릭시, setActive를 통해 route.push를 해서, 기업이동할 수 있게함.
  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId]);
  return null;
};
