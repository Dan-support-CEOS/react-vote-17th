import client from './client';

export const register = async (input: any) => {
  const response = await client.post('/user/register', {
    name: input.name,
    id: input.id,
    password: input.password,
    email: input.email,
    part: input.part,
    team: input.team,
  });
  return response.data;
};

export const login = async (input: any) => {
  const response = await client.post('/user/login', {
    id: input.id,
    password: input.password,
  });
  return response.data;
};

//id,email 중복 확인
export const checkId = async (id: string) => {
  const response = await client.post('/user/register/id', {
    id: id,
  });
  return response.data;
};

export const checkEmail = async (email: string) => {
  const response = await client.post('/user/register/email', {
    email: email,
  });
  return response.data;
};
