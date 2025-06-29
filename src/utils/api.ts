import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

interface RequestOptions extends Omit<AxiosRequestConfig, 'headers'> {
  requiresAuth?: boolean;
  headers?: Record<string, string>;
  data?: any;
}

// Create axios instance with default config
const axiosInstance = axios.create({
  withCredentials: true, // Important for CORS
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:3000', // your API base URL
});

export const api = {
  fetch: async (url: string, options: RequestOptions = {}) => {
    const { tokens } = useAuthStore.getState();
    const { requiresAuth = true, headers = {}, data, ...rest } = options;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    };

    if (requiresAuth && tokens?.access?.token) {
      requestHeaders['Authorization'] = `Bearer ${tokens.access.token}`;
    }

    const requestOptions: AxiosRequestConfig = {
      url,
      headers: requestHeaders,
      data,
      ...rest,
    };

    console.log('Request Headers:', requestHeaders); // Debug log
    console.log('Full Request Options:', requestOptions); // Debug log

    try {
      // Use axiosInstance instead of axios
      const response = await axiosInstance(requestOptions);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data); // Debug log
        if (error.response?.status === 401) {
          // Handle unauthorized access
          useAuthStore.getState().logout();
        }
        throw new Error(error.response?.data?.message || 'An error occurred');
      }
      throw error;
    }
  },

  // Convenience methods
  post: (url: string, data: any, options: RequestOptions = {}) => {
    return api.fetch(url, {
      method: 'POST',
      data,
      ...options,
    });
  },

  get: (url: string, options: RequestOptions = {}) => {
    return api.fetch(url, {
      method: 'GET',
      ...options,
    });
  },

  // New delete method
  delete: (url: string, options: RequestOptions = {}) => {
    return api.fetch(url, {
      method: 'DELETE',
      ...options,
    });
  },

  // New put method
  put: (url: string, data: any, options: RequestOptions = {}) => {
    return api.fetch(url, {
      method: 'PUT',
      data,
      ...options,
    });
  },
};
// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response Interceptor:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);
