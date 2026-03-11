// 📁 src/axios.js
import axios from 'axios';
import { URL_API } from './env'; // تأكد إن المسار ده صح عندك
import router from './router'; // تأكد إن المسار ده صح عندك

const api = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request Interceptor: حط التوكن تلقائيًا لو موجود
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// ✅ Response Interceptor: لو في 401 امسح localStorage وروّح المستخدم على login
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401||error.response.status === 403)) {
      localStorage.clear();
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
