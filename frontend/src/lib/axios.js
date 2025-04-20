import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/', // Base URL for your Flask API
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
  withCredentials: true,
});

