<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
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

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

const milestones: Milestone[] = [
  { year: "2026", title: "kodanHUB", desc: "Orquestación Centralizada de APIs. Hub agnóstico para la gestión inteligente de modelos de IA, control de tokens y conectividad empresarial de alta disponibilidad." },
  { year: "2026", title: "SmartCook", desc: "Inteligencia Visual Multimodal. Motor de Visión Computacional que decodifica heladeras, alacenas y capturas múltiples para transformar cualquier inventario visual en una experiencia gastronómica de precisión." },
  { year: "2025", title: "TimeTracker Mobile", desc: "La extensión móvil de TimeTracker traslada la complejidad de nuestra arquitectura de datos a una interfaz de alta fidelidad. Diseñada para una interacción de baja fricción, permite el monitoreo de KPIs críticos y la validación de desvíos operativos." },
  { year: "2025", title: "TimeTracker", desc: "Observabilidad de Recursos y Data Intelligence. Arquitectura multi-tenant diseñada para la analítica predictiva de costos y la optimización granular de capital humano." },
  { year: "2023", title: "simpleID", desc: "Inmutabilidad y Criptografía Aplicada. Protocolos de identidad descentralizada (DLT) con integración de biometría avanzada para la seguridad en el borde de la red." },
];

// Agrupar milestones por año
const groupedMilestones = computed(() => {
  const groups: Record<string, Milestone[]> = {};
  milestones.forEach(m => {
    if (!groups[m.year]) groups[m.year] = [];
    groups[m.year].push(m);
  });
  return groups;
});

// Obtener años ordenados descendente
const sortedYears = computed(() => {
  return Object.keys(groupedMilestones.value).sort((a, b) => b > a ? 1 : -1);
});
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
        <div v-for="year in sortedYears" :key="year" class="milestone-year-row">
          <div class="year-marker-container">
            <span class="milestone-year">{{ year }}</span>
            <div class="milestone-marker"></div>
          </div>
          
          <div class="products-grid">
            <div v-for="(milestone, idx) in groupedMilestones[year]" :key="idx" class="product-column">
              <h3 
                :ref="setTerminalRef" 
                :data-text="milestone.title" 
                class="mono-title clickable"
                role="button"
                tabindex="0"
                :aria-label="`Ver detalle de ${milestone.title}`"
                @click="scrollToShowcase(milestone.title)"
                @keyup.enter="scrollToShowcase(milestone.title)"
              >_</h3>
              <p class="description">{{ milestone.desc }}</p>
            </div>
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
  padding: 10rem 0; /* Sin padding horizontal para unificar ejes */
  min-height: 150vh;
  width: 100%;
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
  width: 100%;
  padding: 0 12vw 0 10vw; /* Compactado a la derecha */
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
  font-family: var(--font-mono);
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
  gap: 8rem;
}

.milestone-year-row {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.year-marker-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
  position: absolute;
  /* Contenido termina en 12vw. Linea en 5vw. 
     Distancia = 7vw. */
  right: calc(-7vw - 7px); 
  top: 0;
  height: 2.8rem;
  z-index: 10;
}

.milestone-marker {
  width: 14px;
  height: 14px;
  background: #BFC1C2;
  border-radius: 50%;
  box-shadow: 0 0 12px #BFC1C2;
  flex-shrink: 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 5rem;
  justify-content: flex-end;
  direction: rtl; 
  margin-right: 5rem; /* Homogeneizado con el gap de 5rem entre columnas */
}

.product-column {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  direction: ltr; /* Texto normal dentro de celdas RTL */
}

.milestone-year {
  font-family: var(--font-mono);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  white-space: nowrap;
}

.mono-title {
  font-family: var(--font-mono);
  font-size: 1.8rem;
  color: var(--color-mint);
  margin: 0.5rem 0;
}

.mono-title.clickable {
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

.mono-title.clickable:hover {
  color: #fff;
  transform: translateX(-10px) scale(1.02);
  text-shadow: 0 0 15px var(--color-mint);
}

.description {
  color: var(--text-body);
  max-width: 450px;
  line-height: 1.6;
  margin-left: auto;
  font-size: 0.95rem;
  opacity: 0.8;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .masterclass-container { padding: 5rem 5vw; }
  .platinum-lifeline { right: 20px; }
  .masterclass-content { padding-right: 30px; }
}
</style>
