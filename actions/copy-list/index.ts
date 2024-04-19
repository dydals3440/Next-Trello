'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CopyList } from './schema';
import { redirect } from 'next/navigation';
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    //  우리가 카피할 리스트 찾음
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: { orgId },
      },
      // list를 카피해도 그 안에 릴레이션 연결해놓은 cards또한 다 가져오기.
      include: {
        cards: true,
      },
    });
    if (!listToCopy) {
      return { error: 'List not found!' };
    }
    // 어떤게 라스트 리스트인지 찾음.
    // boardId 매칭, order프로퍼티 descending 모드, 그리고 order 프로퍼티만 꺼내옴.
    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      // 카드를 포함해서 내보냄.
      include: {
        cards: true,
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: 'Failed to copy',
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
