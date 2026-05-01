import { defineStore } from 'pinia';
import { cmsService } from '../services/sanityService';

/**
 * Capa de Negocio: CmsStore
 * Sincroniza los datos del CMS con el estado reactivo de la aplicación.
 */
export const useCmsStore = defineStore('cms', {
  state: () => ({
    home: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchHome() {
      this.loading = true;
      this.error = null;
      try {
        const data = await cmsService.getHomeContent();
        this.home = data;
        return data;
      } catch (err) {
        this.error = 'Error al cargar contenido desde Sanity';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
});
