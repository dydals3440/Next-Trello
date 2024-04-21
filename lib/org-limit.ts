import { auth } from '@clerk/nextjs';

import { db } from './db';
import { MAX_FREE_BOARDS } from '@/constants/board';

export const incrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error('Unauthorized');
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  // orgLimit이 있다면 db기존데이터에 카운트를 업데이트 해주고
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
    // 없다면, db에 새로 만들어주고, orgId와 카운트를 등록해줌.
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const decreaseAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error('Unauthorized');
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  // orgLimit이 있다면 db기존데이터에 카운트를 업데이트 해주고
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      // 0보다 작아지지 않게 예외처리
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
    // 없다면, db에 새로 만들어주고, orgId와 카운트를 등록해줌.
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error('Unauthorized');
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  // orgLimit이 없거나 5보다 적으면 create할 수 있게 해줌.
  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    // 아니면 못하게 막아버림
    return false;
  }
};

export const getAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};
