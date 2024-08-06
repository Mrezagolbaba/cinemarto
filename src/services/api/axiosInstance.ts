import axios from 'axios';

const TOKEN = import.meta.env.VITE_APP_TMDB_API_TOKEN;
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  validateStatus: function (status: number) {
    return status >= 200 && status < 300;
  },
  headers: {
    accept: 'application/json',
    Authorization:`Bearer ${TOKEN}`
  },
});
