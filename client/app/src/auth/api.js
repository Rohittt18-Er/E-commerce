// auth/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-1-76i4.onrender.com/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = ` ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
