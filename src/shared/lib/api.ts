import axios from 'axios';
import { getAuthToken } from '@/shared/lib/auth';

const api = axios.create({
  baseURL: 'https://your-api-endpoint.com', // URL
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
