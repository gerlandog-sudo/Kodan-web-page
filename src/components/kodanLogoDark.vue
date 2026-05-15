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
        <filter :id="filterId" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" :stdDeviation="isHovered ? 4 : 2" result="blur" />
          <feFlood flood-color="#00FFC2" flood-opacity="0.8" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <!-- Ventana de visualización para el efecto scroll -->
        <clipPath :id="maskId">
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
        :filter="`url(#${filterId})`"
      />

      <!-- Grupo con Clip-Path para el efecto scroll -->
      <g :clip-path="`url(#${maskId})`">
        <!-- CAPA ESTÁTICA: REPOSO (Alineación Técnica 121) -->
        <text 
          v-if="!isHovered"
          x="121" 
          y="60" 
          text-anchor="start" 
          dominant-baseline="middle"
          class="kodan-text static-text"
          :style="textStyle"
        >
          kodan
        </text>

        <!-- CAPA DINÁMICA: MARQUESINA (Hover) -->
        <g v-show="isHovered" ref="textGroup">
          <text 
            x="121" 
            y="60" 
            text-anchor="start" 
            dominant-baseline="middle"
            class="kodan-text"
            :style="textStyle"
          >
            kodan software
          </text>
          <text 
            x="771" 
            y="60" 
            text-anchor="start" 
            dominant-baseline="middle"
            class="kodan-text"
            :style="textStyle"
          >
            kodan software
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
        :filter="`url(#${filterId})`"
      />

      <path 
        ref="rightBracket"
        d="M 399.25 40 L 429.25 60 L 399.25 80" 
        fill="none" 
        stroke="#00FFC2" 
        stroke-width="10" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        :filter="`url(#${filterId})`"
      />
    </svg>

    <!-- Eslogan con Efecto de Escaneo -->
    <div class="subtitle-container">
      <p class="brand-subtitle" ref="subtitle">Custom Development & Legacy Modernization</p>
      <div class="scanline" ref="scanline"></div>
    </div>
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
const brandText = ref("kodan"); // Estado inicial de marca
const leftBracket = ref<SVGPathElement | null>(null);
const rightBracket = ref<SVGPathElement | null>(null);
const slash = ref<SVGLineElement | null>(null);
const textGroup = ref<SVGGElement | null>(null);
const subtitle = ref<HTMLElement | null>(null);
const scanline = ref<HTMLElement | null>(null);

const instanceId = Math.random().toString(36).substring(2, 9);
const maskId = computed(() => `logo-mask-dark-${instanceId}`);
const filterId = computed(() => `neon-glow-dark-${instanceId}`);

const textStyle = computed(() => ({
  fontFamily: '\"Aptos Display\", \"Aptos\", \"Inter\", sans-serif',
  fontSize: '80px',
  fill: '#FFFFFF',
  fontWeight: '300'
}));

let breatheAnim: gsap.core.Timeline | null = null;
let marqueeAnim: gsap.core.Tween | null = null;
let scanAnim: gsap.core.Timeline | null = null;
let returnAnim: gsap.core.Tween | null = null;

const handleMouseEnter = () => {
  // Cancelar cualquier retorno activo
  if (returnAnim) {
    returnAnim.kill();
    returnAnim = null;
  }

  isHovered.value = true;
  
  if (marqueeAnim) {
    marqueeAnim.restart(); // Reinicia el avance desde cero
  }
  
  scanAnim = gsap.timeline();
  scanAnim.to(subtitle.value, {
    opacity: 0.4,
    duration: 0.05,
    repeat: 3,
    yoyo: true,
    ease: "none"
  });
  
  scanAnim.to(scanline.value, {
    left: "110%",
    opacity: 1,
    duration: 1.8,
    ease: "power2.inOut"
  }, "+=0.1");

  scanAnim.to(subtitle.value, {
    backgroundPosition: "0% 0%",
    opacity: 1,
    duration: 1.8,
    ease: "power2.inOut"
  }, "<");

  scanAnim.to(subtitle.value, {
    textShadow: "0 0 15px rgba(224, 224, 224, 0.4)",
    duration: 0.4
  }, "-=0.5");
};

const handleMouseLeave = () => {
  if (marqueeAnim) {
    marqueeAnim.pause();
  }

  // Lanzar animación de retorno con inercia (Rewind)
  returnAnim = gsap.to(textGroup.value, {
    x: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => {
      isHovered.value = false;
      returnAnim = null;
    }
  });
  
  if (scanAnim) {
    scanAnim.kill();
    gsap.to(subtitle.value, {
      opacity: 0.7,
      backgroundPosition: "100% 0%",
      textShadow: "none",
      duration: 0.3
    });
    gsap.set(scanline.value, { left: "-15%", opacity: 0 });
  }
};

onMounted(() => {
  breatheAnim = gsap.timeline({ repeat: -1, yoyo: true });
  breatheAnim.to(leftBracket.value, { x: -1, duration: 1.5, ease: "sine.inOut" }, 0);
  breatheAnim.to(rightBracket.value, { x: 1, duration: 1.5, ease: "sine.inOut" }, 0);

  marqueeAnim = gsap.to(textGroup.value, {
    x: -650,
    duration: 5,
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
  container-type: inline-size;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 0.6cqw 1cqw;
  background: transparent; /* Fondo manejado por el wrapper en App.vue */
  border: none;
  box-sizing: border-box;
}

.logo-svg {
  width: 100%;
  height: auto;
  display: block;
}

.subtitle-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: -0.8cqw;
}

.brand-subtitle {
  width: 100%;
  font-family: var(--font-main);
  font-size: 4.25cqw;
  font-weight: 500;
  text-transform: none;
  letter-spacing: -0.1cqw;
  
  /* Sistema de Gradiente Persistente */
  background: linear-gradient(90deg, 
    #E0E0E0 0%, 
    #E0E0E0 48%, 
    rgba(255, 255, 255, 0.4) 52%, 
    rgba(255, 255, 255, 0.4) 100%);
  background-size: 200% 100%;
  background-position: 100% 0%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  white-space: nowrap;
  text-align: center;
  opacity: 0.7;
  display: block;
}

.scanline {
  position: absolute;
  top: 0;
  left: -15%;
  width: 20%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(224, 224, 224, 0.6), transparent);
  pointer-events: none;
  opacity: 0;
}

.kodan-text {
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
