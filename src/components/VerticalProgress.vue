<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);
const activeSection = ref('');

const waypoints = [
  { id: 'hero', label: '01', icon: '○' },
  { id: 'mission', label: '02', icon: '○' },
  { id: 'traceability', label: '03', icon: '○' },
  { id: 'artifacts', label: '04', icon: '○' },
  { id: 'contact', label: '05', icon: '○' }
];

const updateProgress = () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight > 0) {
    progress.value = (window.scrollY / scrollHeight) * 100;
  }
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, { threshold: 0.15 });

  waypoints.forEach(wp => {
    const el = document.getElementById(wp.id);
    if (el) observer?.observe(el);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress);
  observer?.disconnect();
});
</script>

<template>
  <div class="vertical-progress-container">
    <!-- Waypoints Laterales -->
    <div class="waypoints">
      <button 
        v-for="wp in waypoints" 
        :key="wp.id"
        :class="['waypoint-dot', { active: activeSection === wp.id }]"
        @click="scrollToSection(wp.id)"
        :aria-label="`Ir a ${wp.id}`"
      >
        <span class="dot-inner"></span>
        <span class="dot-label">{{ wp.label }}</span>
      </button>
    </div>

    <div class="progress-track">
      <div 
        class="progress-thumb" 
        :style="{ transform: `scaleY(${progress / 100})` }"
      ></div>
    </div>
    
    <div class="progress-info">
      <span class="percentage">{{ Math.round(progress).toString().padStart(2, '0') }}</span>
    </div>
  </div>
</template>

<style scoped>
.vertical-progress-container {
  position: fixed;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.waypoints {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0;
  z-index: 10;
  pointer-events: none;
}

.waypoint-dot {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: relative;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.dot-inner {
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.dot-label {
  position: absolute;
  right: 2rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: #fff;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.waypoint-dot:hover .dot-inner {
  background: var(--color-mint);
  box-shadow: 0 0 10px var(--color-mint);
  transform: scale(1.5);
}

.waypoint-dot:hover .dot-label {
  opacity: 0.5;
  transform: translateX(0);
}

.waypoint-dot.active .dot-inner {
  background: var(--color-mint);
  box-shadow: 0 0 15px var(--color-mint);
  transform: scale(2);
}

.waypoint-dot.active .dot-label {
  opacity: 1;
  transform: translateX(0);
  color: var(--color-mint);
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
  position: absolute;
  bottom: -2.5rem;
}

.percentage {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: var(--color-mint);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .vertical-progress-container {
    display: none;
  }
}
</style>
