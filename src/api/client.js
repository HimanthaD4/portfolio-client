// src/api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  withCredentials: true
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle token expiration
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;