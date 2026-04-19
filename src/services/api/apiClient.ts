import axios, { AxiosHeaders, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { getAuth, getIdToken } from '@react-native-firebase/auth';
import { Config } from 'react-native-config';

const API_BASE_URL = Config.API_BASE_URL;
const HTTP_TIMEOUT_MS = 15_000;

// Create a single axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: HTTP_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

// Attach Firebase ID token on each request (Firebase SDK refreshes it when needed)
apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const user = getAuth().currentUser;
  if (user) {
    const idToken = await getIdToken(user);
    if (idToken) {
      if (!config.headers) config.headers = new AxiosHeaders();
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${idToken}`);
      // optional default content type
      (config.headers as AxiosHeaders).set('Content-Type', 'application/json');
    }
  }
  return config;
});

// Optional: normalize common network errors a bit
apiClient.interceptors.response.use(
  res => res,
  error => {
    // You can add Sentry or custom mapping here later
    return Promise.reject(error);
  },
);
