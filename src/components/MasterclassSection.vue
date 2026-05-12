<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

const sectionRef = ref<HTMLElement | null>(null);
const lifelineRef = ref<HTMLElement | null>(null);
const terminalRefs = ref<HTMLElement[]>([]);

const scrollToShowcase = (name: string) => {
  const index = milestones.findIndex(m => m.title === name);
  const st = ScrollTrigger.getById('cylinder-st');
  
  if (st && index !== -1) {
    // Calculamos el punto exacto de scroll dentro del pin del cilindro
    // Basado en la proporción del índice sobre el total de proyectos
    const totalProjects = milestones.length;
    const projectProgress = index / totalProjects;
    const targetScroll = st.start + (projectProgress * (st.end - st.start));
    
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: targetScroll, autoKill: true },
      ease: "power3.inOut"
    });
  } else {
    // Fallback por si el ST no está listo
    const target = document.querySelector('#cylinder-showcase-section');
    if (target) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: target, autoKill: true },
        ease: "power3.inOut"
      });
    }
  }
};

const setTerminalRef = (el: any) => {
  if (el && !terminalRefs.value.includes(el)) {
    terminalRefs.value.push(el);
  }
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
    
    gsap.fromTo(el, 
      { text: "" },
      {
        duration: 1.5,
        text: text,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        delay: index * 0.1
      }
    );
  });
});

const milestones = [
  { year: "2026", title: "kodanHUB", desc: "Orquestación Centralizada de APIs. Hub agnóstico para la gestión inteligente de modelos de IA, control de tokens y conectividad empresarial de alta disponibilidad." },
  { year: "2026", title: "SmartCook", desc: "Inteligencia Visual Multimodal. Motor de Visión Computacional que decodifica heladeras, alacenas y capturas múltiples para transformar cualquier inventario visual en una experiencia gastronómica de precisión." },
  { year: "2025", title: "TimeTracker Mobile", desc: "La extensión móvil de TimeTracker traslada la complejidad de nuestra arquitectura de datos a una interfaz de alta fidelidad. Diseñada para una interacción de baja fricción, permite el monitoreo de KPIs críticos y la validación de desvíos operativos." },
  { year: "2025", title: "TimeTracker", desc: "Observabilidad de Recursos y Data Intelligence. Arquitectura multi-tenant diseñada para la analítica predictiva de costos y la optimización granular de capital humano." },
  { year: "2023", title: "simpleID", desc: "Inmutabilidad y Criptografía Aplicada. Protocolos de identidad descentralizada (DLT) con integración de biometría avanzada para la seguridad en el borde de la red." },
];
</script>

<template>
  <section ref="sectionRef" class="masterclass-container">
    <div class="platinum-lifeline" ref="lifelineRef"></div>

    <div class="masterclass-content">
      <header class="masterclass-header">
        <span class="mono-tag">Trazabilidad de Ingeniería</span>
        <h2>Un registro de soluciones críticas y arquitecturas escalables.</h2>
      </header>

      <div class="milestones-list">
        <div v-for="(milestone, index) in milestones" :key="index" class="milestone-item">
          <div class="milestone-marker"></div>
          <div class="milestone-body">
            <span class="milestone-year">{{ milestone.year }}</span>
            <h3 
              :ref="setTerminalRef" 
              :data-text="milestone.title" 
              class="mono-title clickable"
              @click="scrollToShowcase(milestone.title)"
            >_</h3>
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
  right: 5vw;
  top: 10rem;
  width: 2px;
  height: 0%;
  background: linear-gradient(to bottom, #BFC1C2, #E0E0E0, transparent);
  box-shadow: 0 0 15px rgba(191, 193, 194, 0.3);
  z-index: 1;
}

.masterclass-content {
  padding-right: 5vw;
  position: relative;
  z-index: 2;
  text-align: right;
}

.masterclass-header {
  margin-bottom: 6rem;
}

.mono-tag {
  font-size: clamp(1.9rem, 3.8vw, 3.4rem);
  font-weight: 900;
  line-height: 1.1;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -2px;
  display: block;
  margin-bottom: 1rem;
}

h2 {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.77rem;
  color: var(--color-mint);
  letter-spacing: 2px;
  display: block;
  margin-bottom: 6rem;
  opacity: 0.7;
  text-transform: uppercase;
}

.milestones-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.milestone-item {
  position: relative;
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  flex-direction: row-reverse;
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

.milestone-body {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Alineación a la derecha como el resto de la sección */
  text-align: right;
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

.mono-title.clickable {
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

.mono-title.clickable:hover {
  color: var(--color-mint);
  transform: translateX(-10px);
}

p {
  color: var(--text-body);
  max-width: 400px;
  line-height: 1.6;
  margin-left: auto;
}

@media (max-width: 768px) {
  .masterclass-container { padding: 5rem 5vw; }
  .platinum-lifeline { right: 20px; }
  .masterclass-content { padding-right: 30px; }
}
</style>
