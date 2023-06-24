import axios from 'axios';

const client = axios.create({
  baseURL: 'https://takgyun.shop/swagger/?format=openapi',
  withCredentials: true,
});

export default client;
