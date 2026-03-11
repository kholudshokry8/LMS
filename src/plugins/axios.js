import axios from "axios";
import { URL_API } from "@/env"; // زي ما كنتي عاملاه

// إنشاء نسخة مخصصة من axios
const api = axios.create({
  baseURL: URL_API,
});

// إضافة التوكن تلقائيا لكل الريكوستات
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
