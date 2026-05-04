<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const sectionRef = ref<HTMLElement | null>(null);
const lifelineRef = ref<HTMLElement | null>(null);
const terminalRefs = ref<HTMLElement[]>([]);

const setTerminalRef = (el: any) => {
  if (el) terminalRefs.value.push(el);
};

onMounted(() => {
  if (!sectionRef.value || !lifelineRef.value) return;

  // 1. Línea de Vida Platino (Scroll-linked)
  gsap.to(lifelineRef.value, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 20%",
      end: "bottom 80%",
      scrub: 0.5,
    }
  });

  // 2. Terminal Typewriter Effect
  terminalRefs.value.forEach((el, index) => {
    const text = el.getAttribute('data-text') || "";
    el.innerText = ""; // Limpiar para el efecto

    gsap.to(el, {
      duration: 2,
      text: text,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      delay: index * 0.2
    });
  });
});

const milestones = [
  { year: "2024", title: "KODAN Protocol V1", desc: "Despliegue de arquitectura escalable." },
  { year: "2023", title: "Legacy Forge", desc: "Refactorización de sistemas críticos." },
  { year: "2022", title: "Digital Silk Foundation", desc: "Lanzamiento del motor visual." },
  { year: "2021", title: "Quantum Genesis", desc: "Investigación en algoritmos adaptativos." },
];
</script>

<template>
  <section ref="sectionRef" class="masterclass-container">
    <div class="platinum-lifeline" ref="lifelineRef"></div>

    <div class="masterclass-content">
      <header class="masterclass-header">
        <span class="mono-tag">Core Technical / Masterclass</span>
        <h2>El Núcleo Técnico</h2>
      </header>

      <div class="milestones-list">
        <div v-for="(milestone, index) in milestones" :key="index" class="milestone-item">
          <div class="milestone-marker"></div>
          <div class="milestone-body">
            <span class="milestone-year">{{ milestone.year }}</span>
            <h3 :ref="setTerminalRef" :data-text="milestone.title" class="mono-title">_</h3>
            <p>{{ milestone.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.masterclass-container {
  background: #121212;
  position: relative;
  padding: 10rem 10vw;
  min-height: 150vh;
}

.platinum-lifeline {
  position: absolute;
  left: 5vw;
  top: 10rem;
  width: 2px;
  height: 0%;
  background: linear-gradient(to bottom, #BFC1C2, #E0E0E0, transparent);
  box-shadow: 0 0 15px rgba(191, 193, 194, 0.3);
  z-index: 1;
}

.masterclass-content {
  padding-left: 5vw;
  position: relative;
  z-index: 2;
}

.masterclass-header {
  margin-bottom: 6rem;
}

.mono-tag {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  color: var(--color-mint);
  letter-spacing: 2px;
  font-size: 0.9rem;
}

h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  margin-top: 1rem;
}

.milestones-list {
  display: flex;
  flex-direction: column;
  gap: 8rem;
}

.milestone-item {
  position: relative;
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.milestone-marker {
  width: 12px;
  height: 12px;
  background: #BFC1C2;
  border-radius: 50%;
  margin-top: 0.8rem;
  box-shadow: 0 0 10px #BFC1C2;
  flex-shrink: 0;
}

.milestone-year {
  font-family: 'JetBrains Mono', monospace;
  color: var(--text-body);
  font-size: 1.1rem;
  opacity: 0.6;
}

.mono-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.8rem;
  color: #fff;
  margin: 0.5rem 0;
}

p {
  color: var(--text-body);
  max-width: 400px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .masterclass-container { padding: 5rem 5vw; }
  .platinum-lifeline { left: 20px; }
  .masterclass-content { padding-left: 30px; }
}
</style>
