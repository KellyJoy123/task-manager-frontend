import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
     if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      // Si no estamos ya en la página de login, redirigir
      if (!window.location.pathname.includes('/auth')) {
        window.location.href = '/';
      }
    }
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Ocurrió un error inesperado';
    
    const errorMessage = Array.isArray(message) ? message.join(', ') : message;
    
    return Promise.reject(new Error(errorMessage))
  }
);

export default apiClient