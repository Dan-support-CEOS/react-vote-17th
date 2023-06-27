import { headers } from 'next/dist/client/components/headers';
import client from './client';
import { ILoginProps, IUser } from '@/interface/interface';

export const register = async (input: any) => {
  const response = await client.post('/auth/signup/', {
    name: input.name,
    id: input.id,
    password: input.password,
    email: input.email,
    part: input.part,
    team: input.team,
  });
  return response.data;
};

//login
export const login = async (input: ILoginProps) => {
  const url = '/auth/signin/';
  const response = await client.post(url, {
    login_id: input.id,
    password: input.password,
  });
  return response.data;
};

//refreshToken, accessToken 재발급
export const mutateRefreshing = async () => {
  const url = '/auth/token/refresh/';
  return client.post<IUser>(url).then(response => {
    return response.data;
  });
};

//logout
export const logout = async () => {
  const url = '/auth/signout/';
  return client.get<IUser>(url).then(response => {
    //body가 필요없어서 get으로
    return response.data;
  });
};

//id,email 중복 확인
export const checkId = async (id: string) => {
  const response = await client.post('/auth/id/check/', {
    id: id,
  });
  return response.data;
};

export const checkEmail = async (email: string) => {
  const response = await client.post('/auth/email/check/', {
    email: email,
  });
  return response.data;
};

//데모데이 투표
export const demoDayVote = async (info: any) => {
  const response = await client.post(
    '/votes/teams/',
    {
      tname: info.tname,
    },
    {
      headers: {
        Authorization: `Bearer ${info.accessToken}`,
      },
    },
  );
  return response.data;
};

//데모데이 결과
export const getDemoDayResult = async () => {
  const response = await client.get('/votes/teams/result/');
  return response.data;
};
