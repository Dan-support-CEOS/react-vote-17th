import client from './client';

export const register = async (input: any) => {
  const response = await client.post('/auth/signup/', {
    name: input.name,
    login_id: input.id,
    password: input.password,
    email: input.email,
    part: input.part,
    team: input.team,
  });
  return response.data;
};

export const login = async (input: any) => {
  const response = await client.post('/auth/signin/', {
    login_id: input.id,
    password: input.password,
  });
  return response.data;
};

//id,email 중복 확인
export const checkId = async (id: string) => {
  const response = await client.post('/auth/id/check/', {
    login_id: id,
  });
  return response.data;
};

export const checkEmail = async (email: string) => {
  const response = await client.post('/auth/email/check/', {
    email: email,
  });
  return response.data;
};

export const logout = async (accessToken: string) => {
  const response = await client.get('/auth/signout/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const tokenRefresh = async () => {
  const response = await client.get('/auth/token/refresh/');
  return response.data;
};
