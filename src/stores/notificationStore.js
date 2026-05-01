import { defineStore } from 'pinia';

/**
 * Store de Notificaciones Premium
 */
export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),
  actions: {
    notify(message, type = 'info', duration = 5000) {
      const id = Date.now();
      this.notifications.push({ id, message, type, duration });
      
      setTimeout(() => {
        this.remove(id);
      }, duration);
    },
    remove(id) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    }
  }
});
