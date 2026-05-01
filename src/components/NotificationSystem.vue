<template>
  <div class="notification-container">
    <TransitionGroup name="notification">
      <div 
        v-for="n in store.notifications" 
        :key="n.id" 
        :class="['notification-item', n.type]"
      >
        <div class="content">
          <div class="icon"></div>
          <span class="message">{{ n.message }}</span>
        </div>
        <div class="progress-bar">
          <div 
            class="fill" 
            :style="{ animationDuration: n.duration + 'ms' }"
          ></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useNotificationStore } from '../stores/notificationStore';
const store = useNotificationStore();
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 350px;
}

.notification-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.content {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.message {
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
}

.progress-bar {
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
}

.fill {
  height: 100%;
  width: 100%;
  transform-origin: left;
  animation: shrink linear forwards;
}

@keyframes shrink {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

/* Colores Funcionales */
.success .fill { background: #22c55e; }
.error .fill { background: #ef4444; }
.warning .fill { background: #f59e0b; }
.info .fill { background: #8b5cf6; }

.success { border-color: rgba(34, 197, 94, 0.3); }
.error { border-color: rgba(239, 68, 68, 0.3); }
.warning { border-color: rgba(245, 158, 11, 0.3); }
.info { border-color: rgba(139, 92, 246, 0.3); }

/* Animaciones Vue */
.notification-enter-active, .notification-leave-active {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.notification-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}
.notification-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
