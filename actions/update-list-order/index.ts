'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateListOrder } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { items, boardId } = data;
  let lists;

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );
    // DB의 작업이 여러개일 떄 그 작업들을 하나로 묶어줌, 여러개의 작업이 한개의 로직을 구성하고 있을떄 사용. 모든 작업들이 성공적으로 실행을 마쳐야만 디비에 저장.
    // 1~4번까지 있다면 1,2번 성공후 3번실패시. 1,2번에 대한 데이터는 반영이 될 것이다. 트랜잭션 처리하면, 롤백하여 이전 상태로 되돌린다. 낙관적업데이트랑 비슷한 느낌.
    lists = await db.$transaction(transaction);
    console.log(lists);
  } catch (error) {
    return {
      error: 'Failed to update',
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
