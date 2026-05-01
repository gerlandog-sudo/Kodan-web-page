import axios from 'axios';

/**
 * Capa de Servicio: Cliente API Base
 * Encapsula la configuración de red y manejo de errores globales.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost/kodan/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

// Interceptor para manejo de errores global
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en Capa de Servicio:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
