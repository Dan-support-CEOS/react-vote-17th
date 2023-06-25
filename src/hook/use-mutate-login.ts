import { ILoginProps, IUser } from '@/interface/interface';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';

export const useMutateLogin = (
  mutateFunction: ({ id, password }: ILoginProps) => Promise<IUser>,
) => {
  const router = useRouter();
  const { mutate, data } = useMutation(mutateFunction, {
    onSuccess: data => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer' + data.accessToken; //accessToken을 받으면 바로 axios header의 default값으로 넣어줘서 api 호출 시마다 유효성을 체크하는 방식이기 때문에 성공시에 header에 담아줌
      router.push('/');
    },
    onError: error => {
      alert('로그인에 실패했습니다');
    },
  });

  return { mutate, data };
};
