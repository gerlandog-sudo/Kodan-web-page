<template>
  <div 
    ref="container"
    class="brand-badge select-none transition-all duration-500"
    :style="{ width: size + 'px' }"
    role="img"
    aria-label="Kodan Brand Identity"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- SVG del Logo Recortado -->
    <svg 
      viewBox="60 0 380 120" 
      xmlns="http://www.w3.org/2000/svg"
      class="logo-svg"
    >
      <defs>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" :stdDeviation="isHovered ? 4 : 2" result="blur" />
          <feFlood flood-color="#00FFC2" flood-opacity="0.8" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <!-- Ventana de visualización para el efecto scroll -->
        <clipPath id="logo-mask">
          <rect x="110" y="0" width="250" height="120" />
        </clipPath>
      </defs>

      <path 
        ref="leftBracket"
        d="M 100.75 40 L 70.75 60 L 100.75 80" 
        fill="none" 
        stroke="#00FFC2" 
        stroke-width="10" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        filter="url(#neon-glow)"
      />

      <!-- Grupo con Clip-Path para el efecto scroll -->
      <g clip-path="url(#logo-mask)">
        <g ref="textGroup">
          <text 
            x="234.5" 
            y="60" 
            text-anchor="middle" 
            dominant-baseline="middle"
            class="kodan-text"
            :style="textStyle"
          >
            kodan
          </text>
          <text 
            x="484.5" 
            y="60" 
            text-anchor="middle" 
            dominant-baseline="middle"
            class="kodan-text"
            :style="textStyle"
          >
            kodan
          </text>
        </g>
      </g>

      <path 
        ref="slash"
        d="M 384.25 30 L 368.25 90" 
        fill="none" 
        stroke="#00FFC2" 
        stroke-width="10" 
        stroke-linecap="round"
        filter="url(#neon-glow)"
      />

      <path 
        ref="rightBracket"
        d="M 399.25 40 L 429.25 60 L 399.25 80" 
        fill="none" 
        stroke="#00FFC2" 
        stroke-width="10" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        filter="url(#neon-glow)"
      />
    </svg>

    <!-- Eslogan con Micro-impresión -->
    <p class="brand-subtitle">Custom Development & Legacy Modernization</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  size: {
    type: Number,
    default: 400
  }
});

const isHovered = ref(false);
const leftBracket = ref<SVGPathElement | null>(null);
const rightBracket = ref<SVGPathElement | null>(null);
const slash = ref<SVGLineElement | null>(null);
const textGroup = ref<SVGGElement | null>(null);

const textStyle = computed(() => ({
  fontFamily: '\"Aptos Display\", \"Aptos\", \"Inter\", sans-serif',
  fontSize: '80px',
  fill: 'var(--text-h)',
  fontWeight: '300' /* Restaurado a Light */
}));

let breatheAnim: gsap.core.Timeline | null = null;
let marqueeAnim: gsap.core.Tween | null = null;
let glowAnim: gsap.core.Timeline | null = null;

const handleMouseEnter = () => {
  isHovered.value = true;
  if (marqueeAnim) marqueeAnim.restart();
  
  // Iniciamos el destello de la frase
  glowAnim = gsap.timeline({ repeat: -1, yoyo: true });
  glowAnim.to(".brand-subtitle", {
    opacity: 1,
    textShadow: "0 0 8px rgba(0, 255, 194, 0.5)",
    duration: 0.6,
    ease: "sine.inOut"
  });
};

const handleMouseLeave = () => {
  isHovered.value = false;
  if (marqueeAnim) {
    marqueeAnim.pause();
    gsap.to(textGroup.value, { x: 0, duration: 0.5, ease: "power2.out" });
  }
  
  // Detenemos el destello
  if (glowAnim) {
    glowAnim.kill();
    gsap.to(".brand-subtitle", {
      opacity: 0.8,
      textShadow: "none",
      duration: 0.3
    });
  }
};

onMounted(() => {
  breatheAnim = gsap.timeline({ repeat: -1, yoyo: true });
  breatheAnim.to(leftBracket.value, { x: -1, duration: 1.5, ease: "sine.inOut" }, 0);
  breatheAnim.to(rightBracket.value, { x: 1, duration: 1.5, ease: "sine.inOut" }, 0);

  // Animación de Marquee (Pausada por defecto)
  marqueeAnim = gsap.to(textGroup.value, {
    x: -250,
    duration: 2.5,
    repeat: -1,
    ease: "none",
    paused: true
  });

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
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
  if (marqueeAnim) marqueeAnim.kill();
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<style scoped>
.brand-badge {
  container-type: inline-size; /* Define el recuadro como referencia de escala */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 0.6cqw 1cqw; /* Ajuste para evitar expansión visual en escalas medias */
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 0.25cqw solid rgba(255, 255, 255, 0.1);
  border-radius: 0.6cqw;
  box-shadow: 0 2cqw 6cqw rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
}

.logo-svg {
  width: 100%;
  height: auto;
  display: block;
}

.brand-subtitle {
  width: 100%;
  font-family: "Aptos Display", "Aptos", "Inter", sans-serif;
  font-size: 4.25cqw; /* Magia: escala siempre al 4.25% del ancho */
  font-weight: 500;
  text-transform: none;
  letter-spacing: -0.1cqw;
  color: var(--text-body);
  margin-top: -0.8cqw; /* Proximidad extrema calibrada */
  white-space: nowrap;
  text-align: center;
  opacity: 0.9;
  display: block;
}

.kodan-text {
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
