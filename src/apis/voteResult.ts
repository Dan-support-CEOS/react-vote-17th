import client from './client';

export const getPartLeaderResult = async (part: string) => {
  const response = await client.get(`/votes/candidates/${part}/`);
  return response.data;
};
