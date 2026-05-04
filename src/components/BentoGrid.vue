<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const gridRef = ref<HTMLElement | null>(null);
const cards = ref<HTMLElement[]>([]);

const setCardRef = (el: any) => {
  if (el) cards.value.push(el);
};

onMounted(() => {
  if (!gridRef.value) return;

  // 1. Revelado en Espiral (Staggered Reveal)
  gsap.from(cards.value, {
    scrollTrigger: {
      trigger: gridRef.value,
      start: "top 75%",
    },
    opacity: 0,
    scale: 0.8,
    y: 100,
    rotate: -5,
    stagger: {
      amount: 0.8,
      from: "center", // Simula efecto espiral/expansivo desde el centro
    },
    duration: 1.2,
    ease: "power4.out"
  });

  // 2. Activación de Brillo Cian al entrar al Viewport
  cards.value.forEach((card) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      "--glow-opacity": 1,
      duration: 1
    });
  });
});

const bentoItems = [
  { title: "AI Integration", size: "large", desc: "Sistemas cognitivos de alta precisión." },
  { title: "Legacy", size: "small", desc: "Modernización sin fricción." },
  { title: "Cloud Ops", size: "medium", desc: "Infraestructura elástica." },
  { title: "UI/UX", size: "medium", desc: "Interfaces disruptivas." },
  { title: "Security", size: "small", desc: "Protocolos de grado militar." },
  { title: "Optimization", size: "large", desc: "Refactorización de alto rendimiento." },
];
</script>

<template>
  <section class="bento-container" ref="gridRef">
    <div class="bento-grid">
      <div 
        v-for="(item, index) in bentoItems" 
        :key="index"
        :ref="setCardRef"
        class="bento-card glass-premium border-glow"
        :class="item.size"
      >
        <div class="card-content">
          <span class="card-tag">Service // 0{{ index + 1 }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
        <!-- Capa de Brillo Cian Dinámico -->
        <div class="cyan-glow"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento-container {
  padding: 10vh 5vw;
  background: var(--bg-global);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.bento-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
  --glow-opacity: 0;
}

/* Tactile Maximalism Hover */
.bento-card:hover {
  transform: scale(1.03) translateY(-5px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    inset 0 0 20px rgba(0, 229, 229, 0.1);
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-tag {
  font-family: monospace;
  font-size: 0.7rem;
  color: var(--color-mint);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  display: block;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

p {
  font-size: 0.9rem;
  color: var(--text-body);
  line-height: 1.4;
}

/* Brillo Cian Viewport */
.cyan-glow {
  position: absolute;
  inset: 0;
  border: 1px solid #00E5E5;
  border-radius: inherit;
  opacity: var(--glow-opacity);
  pointer-events: none;
  transition: opacity 1s ease;
  box-shadow: inset 0 0 15px rgba(0, 229, 229, 0.2);
}

/* Bento Sizing */
.large { grid-column: span 2; grid-row: span 2; }
.medium { grid-column: span 2; grid-row: span 1; }
.small { grid-column: span 1; grid-row: span 1; }

@media (max-width: 1024px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .bento-grid { display: flex; flex-direction: column; }
}
</style>
