import client from './client';

/*
export const register = async ( 인자 받아옴 ) => {
  return client
    .post('/user/register', {
      id: id,
      name: name,
      email: email,
      password: pwd,
      part: part,
      team: team,
    })
    .then(res => res.data);
};

export const login = async ( 인자 받아옴 ) => {
  return client
    .post('/user/login', {
      id: id,
      password: pwd,
    })
    .then(res => res.data);
};
*/

/* 넷플릭스 예시
export const getNowPlayingMovies = async () => {
  return httpClient.get('/movie/now_playing').then(res => res.data.results);
};

export const getHorrorMovies = async () => {
  return httpClient
    .get('/discover/movie', { params: { with_genres: 27 } })
    .then(res => res.data.results);
};
*/
