'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  });
  // revalidatePath를 통해 서버사이드여도, 바로 업데이팅 되게 해줌.
  revalidatePath('/organization/org_2f6AZ1ttszww6r49alM8v9DQolF');
}
