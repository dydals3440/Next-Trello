'use server';

import { z } from 'zod';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateBoard = z.object({
  title: z
    .string()
    .min(3, { message: 'Minimum length of 3 letters is required' }),
});

export async function create(prevState: State, formData: FormData) {
  // parse는 throw error breake app, safeParse는 그렇지않음.
  const validateFields = CreateBoard.safeParse({
    title: formData.get('title'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields',
    };
  }

  const { title } = validateFields.data;

  try {
    // POST API REQUEST
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error',
    };
  }

  // revalidatePath를 통해 서버사이드여도, 바로 업데이팅 되게 해줌.
  revalidatePath('/organization/org_2f6AZ1ttszww6r49alM8v9DQolF');
  // 에러가 다사라짐
  redirect('/organization/org_2f6AZ1ttszww6r49alM8v9DQolF');
}
