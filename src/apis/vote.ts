import client from './client';

//파트장 투표
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

//파트장 투표 중복 제한
export const checkPartLeaderVoteAuthority = async (accessToken: string) => {
  const response = await client.post('/votes/candidates/authority/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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

//데모데이 투표 중복 제한
export const demoDayAuthority = async (accessToken: any) => {
  const response = await client.post('/votes/teams/authority/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
