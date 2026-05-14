<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  src: string;
  size?: 'small' | 'medium' | 'large';
}>();

const isHovered = ref(false);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const imgRef = ref<HTMLImageElement | null>(null);
const isReady = ref(false);

const captureFrame = () => {
  const canvas = canvasRef.value;
  const img = imgRef.value;
  if (canvas && img && img.complete && img.naturalWidth > 0) {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      isReady.value = true;
    }
  }
};

const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
};
</script>

<template>
  <div 
    class="showcase-card glass-premium"
    :class="[size || 'small', { 'is-active': isHovered }]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="card-inner">
      <!-- Asset Real (Visible en Hover) -->
      <img 
        ref="imgRef"
        :src="src" 
        class="animation-asset" 
        :class="{ 'is-visible': isHovered }"
        @load="captureFrame"
        alt="Kodan Artifact"
        crossorigin="anonymous"
      />
      
      <!-- Frame Estático (Canvas) -->
      <canvas 
        ref="canvasRef" 
        class="static-frame"
        :class="{ 'is-hidden': isHovered, 'is-loaded': isReady }"
      ></canvas>

      <!-- Loader State -->
      <div v-if="!isReady" class="loader-state">
        <div class="scanner-line"></div>
      </div>

      <!-- Efectos de Borde Mint -->
      <div class="mint-glow"></div>
    </div>
  </div>
</template>

<style scoped>
.showcase-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: #050505;
}

.showcase-card:hover {
  transform: scale(1.02);
  border-color: var(--color-mint);
  box-shadow: 0 0 40px rgba(0, 255, 194, 0.15);
  z-index: 10;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.animation-asset {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.animation-asset.is-visible {
  opacity: 1;
}

.static-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  filter: grayscale(0.5) contrast(1.1);
  transition: opacity 0.5s ease;
  z-index: 1;
}

.static-frame.is-loaded {
  opacity: 0.6;
}

.static-frame.is-hidden {
  opacity: 0;
}

.loader-state {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
}

.scanner-line {
  width: 100%;
  height: 2px;
  background: var(--color-mint);
  box-shadow: 0 0 15px var(--color-mint);
  animation: scan 2s infinite ease-in-out;
}

.mint-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border: 1px solid var(--color-mint);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 3;
}

.is-active .mint-glow {
  opacity: 0.4;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* Tamaños Bento */
.small { grid-column: span 1; grid-row: span 1; min-height: 220px; }
.medium { grid-column: span 2; grid-row: span 1; min-height: 220px; }
.large { grid-column: span 2; grid-row: span 2; min-height: 460px; }

@media (max-width: 640px) {
  .small, .medium, .large { grid-column: span 1; grid-row: span 1; min-height: 250px; }
}
</style>
