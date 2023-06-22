import client from './client';

export const getPartLeaderResult = async (part: string) => {
  const response = await client.get(`/vote/part-leader/${part}`);
  return response.data;
};
