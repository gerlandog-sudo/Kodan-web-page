<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import KodanLogoDark from './kodanLogoDark.vue';

const emit = defineEmits(['loaded']);
const loaderRef = ref(null);
const contentRef = ref(null);

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      emit('loaded');
    }
  });

  // Animación de entrada
  tl.from(contentRef.value, {
    opacity: 0,
    scale: 0.9,
    duration: 1.5,
    ease: "power3.out"
  });

  // Efecto de escaneo técnico
  tl.to(".scan-bar", {
    top: "100%",
    duration: 1.5,
    ease: "none",
    repeat: 1,
    yoyo: true
  }, "-=1");

  // Salida
  tl.to(loaderRef.value, {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut",
    delay: 0.5,
    onComplete: () => {
      if (loaderRef.value) {
        loaderRef.value.style.display = 'none';
      }
    }
  });
});
</script>

<template>
  <div ref="loaderRef" class="preloader-overlay">
    <div ref="contentRef" class="loader-content">
      <div class="logo-container">
        <KodanLogoDark :size="250" />
        <div class="scan-bar"></div>
      </div>
      <div class="status-container">
        <span class="status-text">CARGANDO...</span>
        <div class="loading-bar">
          <div class="loading-fill"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader-overlay {
  position: fixed;
  inset: 0;
  background: #050505;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.logo-container {
  position: relative;
  padding: 20px;
}

.scan-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-mint);
  box-shadow: 0 0 15px var(--color-mint);
  opacity: 0.5;
  pointer-events: none;
}

.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.status-text {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 4px;
  color: var(--color-mint);
  opacity: 0.8;
  animation: blink 1s infinite;
}

.loading-bar {
  width: 200px;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.loading-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background: var(--color-mint);
  animation: load 2.5s ease-in-out forwards;
}

@keyframes load {
  0% { width: 0%; }
  30% { width: 40%; }
  60% { width: 45%; }
  100% { width: 100%; }
}

@keyframes blink {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.3; }
}
</style>
