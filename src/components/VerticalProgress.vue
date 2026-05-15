<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);

const updateProgress = () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight > 0) {
    progress.value = (window.scrollY / scrollHeight) * 100;
  }
};

onMounted(() => {
  window.addEventListener('scroll', updateProgress);
  updateProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress);
});
</script>

<template>
  <div class="vertical-progress-container">
    <div class="progress-track">
      <div 
        class="progress-thumb" 
        :style="{ transform: `scaleY(${progress / 100})` }"
      ></div>
    </div>
    <div class="progress-info">
      <span class="percentage">{{ Math.round(progress) }}%</span>
    </div>
  </div>
</template>

<style scoped>
.vertical-progress-container {
  position: fixed;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 100;
  pointer-events: none;
}

.progress-track {
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  border-radius: 2px;
  overflow: hidden;
}

.progress-thumb {
  width: 100%;
  height: 100%;
  background: var(--color-mint);
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top;
  will-change: transform;
  box-shadow: 0 0 10px var(--color-mint);
}

.progress-info {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.percentage {
  font-family: monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: var(--color-mint);
  opacity: 0.6;
}
</style>
