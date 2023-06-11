import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  //withCredentials: true,
  //예시 - params: { api_key: process.env.NEXT_PUBLIC_MOVIEDB_API_KEY },
});

export default client;
