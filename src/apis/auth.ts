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
export const login = async ({ id, password }: ILoginProps) => {
  const url = '/auth/signin/';
  const response = await client.post<IUser>(url, {
    id,
    password,
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
