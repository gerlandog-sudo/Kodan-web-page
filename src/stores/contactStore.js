import { defineStore } from 'pinia';
import apiClient from '../services/apiClient';
import ContactRequest from '../models/ContactRequest';

/**
 * Capa de Negocio/Estado: ContactStore
 * Orquestación de datos y lógica reactiva.
 */
export const useContactStore = defineStore('contact', {
  state: () => ({
    requests: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchStatus() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.get('/status');
        return response.data;
      } catch (err) {
        this.error = 'Error al conectar con la API de KODAN';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async sendRequest(formData) {
      const model = new ContactRequest(formData);
      if (!model.isValid()) {
        throw new Error('Datos de contacto inválidos');
      }
      
      try {
        const response = await apiClient.post('/contact', formData);
        return response.data;
      } catch (err) {
        this.error = 'No se pudo enviar el mensaje';
        throw err;
      }
    }
  }
});
