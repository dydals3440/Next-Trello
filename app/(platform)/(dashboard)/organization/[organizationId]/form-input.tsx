'use client';

import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';

interface FormInputProps {
  errors?: {
    title?: string[];
  };
}

export const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Input
        id='title'
        name='title'
        required
        placeholder='보드 제목을 입력해주세요!'
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((error: string) => (
            <p key={error} className='text-rose-500'>
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};
