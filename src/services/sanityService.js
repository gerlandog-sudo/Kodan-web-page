import { createClient } from '@sanity/client';

/**
 * Capa de Servicio: Sanity Client
 * Gestiona la conexión con el Headless CMS.
 */
const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'tu_id_aqui',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // `false` si quieres los datos más frescos siempre
  apiVersion: '2023-05-03',
});

export const cmsService = {
  /**
   * Obtiene el contenido de la página de inicio
   */
  async getHomeContent() {
    const query = `*[_type == "home"][0]{
      title,
      heroImage,
      bentoGrid
    }`;
    return await sanityClient.fetch(query);
  },

  /**
   * Obtiene una masterclass específica
   */
  async getMasterclass(slug) {
    const query = `*[_type == "masterclass" && slug.current == $slug][0]`;
    return await sanityClient.fetch(query, { slug });
  }
};

export default sanityClient;
