import client from './client';

export const votePartLeader = async (info: any) => {
  const response = await client.post(
    '/votes/candidates/',
    {
      cname: info.name,
      part: info.part,
    },
    {
      headers: {
        Authorization: `Bearer ${info.accessToken}`,
      },
    },
  );
  return response.data;
};

export const checkPartLeaderVoteAuthority = async (accessToken: string) => {
  const response = await client.post('/votes/candidates/authority/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
