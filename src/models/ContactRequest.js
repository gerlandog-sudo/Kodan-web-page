/**
 * Capa de Dominio: Modelo ContactRequest
 * Define la estructura de datos y lógica de transformación.
 */
export default class ContactRequest {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.message = data.message || '';
    this.createdAt = data.created_at ? new Date(data.created_at) : new Date();
  }

  // Método para validar el modelo antes de enviar al backend
  isValid() {
    return this.name.length > 0 && this.email.includes('@');
  }
}
