import axios from 'axios';

const client = axios.create({
  baseURL: 'https://takgyun.shop',
  withCredentials: true,
});

export default client;
