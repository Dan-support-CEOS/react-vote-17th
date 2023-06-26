import { IUser } from '@/interface/interface';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';

export const useMutateRefreshing = (mutateFunction: () => Promise<IUser>) => {
  const router = useRouter();
  const { mutate, data } = useMutation(mutateFunction, {
    onSuccess: data => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer' + data.accessToken;
    },
    onError: () => {
      axios.defaults.headers.common['Authorization'] = '';
      router.push('/');
    },
  });
  return { mutate, data };
};

export const useMutateLogout = (mutateFunction: () => Promise<IUser>) => {
  const router = useRouter();
  const { mutate, data } = useMutation(mutateFunction, {
    onSuccess: data => {
      axios.defaults.headers.common['Authorization'] = '';
      router.push('/');
    },
    onError: () => {},
  });
  return { mutate, data };
};
