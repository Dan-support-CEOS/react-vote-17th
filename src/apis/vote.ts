import client from './client';

export const votePartLeader = async (info: any) => {
  const response = await client.post(
    `/vote/part-leader/${info.part}`,
    {
      name: info.name,
    },
    {
      headers: {
        Authorization: `Bearer ${info.accessToken}`,
      },
    },
  );
  return response.data;
};
