<template>
  <div class="notification-container">
    <TransitionGroup name="notification">
      <div 
        v-for="n in store.notifications" 
        :key="n.id" 
        :class="['notification-item', n.type]"
      >
        <div class="content">
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
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
  width: auto;
  min-width: 320px;
  pointer-events: none;
}

.notification-item {
  pointer-events: auto;
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem; /* Diseño cápsula */
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  position: relative;
}

.content {
  padding: 1rem 2rem;
  text-align: center;
}

.message {
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.5px;
}

.progress-bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
  width: 100%;
  position: absolute;
  bottom: 0;
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

.success .fill { background: var(--color-mint); }
.error .fill { background: var(--error); }
.warning .fill { background: var(--warning); }

/* Animación Industrial (Precisión) */
.notification-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); /* easeOutExpo */
}
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.7, 0, 0.84, 0); /* easeInExpo */
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(50px) scale(0.9);
}
.notification-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}
</style>
