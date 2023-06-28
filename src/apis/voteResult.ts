import client from './client';

//파트장 투표 결과
export const getPartLeaderResult = async (part: string) => {
  const response = await client.get(`/votes/candidates/${part}/`);
  return response.data;
};

//데모데이 투표 결과
export const getDemoDayResult = async () => {
  const response = await client.get('/votes/teams/result/');
  return response.data;
};
