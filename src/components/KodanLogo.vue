<template>
  <div 
    ref="container"
    class="kodan-logo-container select-none cursor-pointer transition-all duration-500"
    :style="{ width: size + 'px' }"
    role="img"
    aria-label="Kodan Software Factory"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <svg 
      viewBox="0 0 500 120" 
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-auto overflow-visible"
    >
      <defs>
        <!-- Glow Filter for Neon Elements -->
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" :stdDeviation="isHovered ? 4 : 2" result="blur" />
          <feFlood flood-color="#00FFC2" flood-opacity="0.8" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Left Bracket < -->
      <path 
        ref="leftBracket"
        d="M 130 40 L 100 60 L 130 80" 
        fill="none" 
        stroke="#00FFC2" 
        stroke-width="10" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        filter="url(#neon-glow)"
      />

      <!-- Text: kodan -->
      <text 
        x="240" 
        y="60" 
        text-anchor="middle" 
        dominant-baseline="central"
        class="kodan-text select-none"
        :style="textStyle"
      >
        kodan
      </text>

      <!-- Slash / -->
      <path 
        ref="slash"
        d="M 366 30 L 350 90" 
        fill="none" 
        stroke="#00FFC2" 
        stroke-width="10" 
        stroke-linecap="round"
        filter="url(#neon-glow)"
      />

      <!-- Right Bracket > -->
      <path 
        ref="rightBracket"
        d="M 381 40 L 411 60 L 381 80" 
        fill="none" 
        stroke="#00FFC2" 
        stroke-width="10" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        filter="url(#neon-glow)"
      />
    </svg>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar Plugin
gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  size: {
    type: Number,
    default: 300
  }
});

const isHovered = ref(false);
const container = ref<HTMLElement | null>(null);
const leftBracket = ref<SVGPathElement | null>(null);
const rightBracket = ref<SVGPathElement | null>(null);
const slash = ref<SVGLineElement | null>(null);

const textStyle = computed(() => ({
  fontFamily: '\"Aptos Display\", \"Aptos\", \"Inter\", sans-serif',
  fontSize: '64px',
  fill: '#2D3436',
  fontWeight: isHovered.value ? '700' : '300',
  transition: 'all 0.4s ease'
}));

let breatheAnim: gsap.core.Timeline | null = null;

onMounted(() => {
  // 1. Animación de Respiración Lateral (1px)
  breatheAnim = gsap.timeline({ repeat: -1, yoyo: true });
  breatheAnim.to(leftBracket.value, { x: -1, duration: 1.5, ease: "sine.inOut" }, 0);
  breatheAnim.to(rightBracket.value, { x: 1, duration: 1.5, ease: "sine.inOut" }, 0);

  // 2. Scroll Sync para el Slash
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      // El path ya tiene una inclinación de 15deg. 
      // Oscilamos +/- 2deg basándonos en el scroll para estar entre 13 y 17.
      const rotationOffset = Math.sin(self.progress * 20) * 2;
      
      gsap.to(slash.value, {
        rotation: rotationOffset,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power1.out"
      });
    }
  });
});

onUnmounted(() => {
  if (breatheAnim) breatheAnim.kill();
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<style scoped>
.kodan-logo-container {
  display: inline-block;
}

.kodan-text {
  /* Soporte para variable fonts */
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
