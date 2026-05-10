<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const horizontalRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!sectionRef.value || !horizontalRef.value) return;

  const cards = horizontalRef.value.querySelectorAll('.project-card');
  
  // 1. Pinning y Scroll Horizontal Maestro con Labels
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top top",
      end: () => `+=${horizontalRef.value!.scrollWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });

  tl.to(horizontalRef.value, {
    x: () => -(horizontalRef.value!.scrollWidth - window.innerWidth),
    ease: "none",
    duration: 1, // Duración base para el mapeo de labels
  });

  // Agregar labels para cada proyecto
  projects.forEach((project, index) => {
    const label = `project-${project.name.toLowerCase().replace(/\s+/g, '')}`;
    // El label se coloca proporcionalmente en el timeline (0 a 1)
    tl.addLabel(label, (index / (projects.length - 1)));
  });

  const horizontalScroll = tl;

  // 2. Animaciones por tarjeta sincronizadas con el scroll horizontal
  cards.forEach((card) => {
    const img = card.querySelector('.project-img');
    const title = card.querySelector('.project-title');
    const info = card.querySelector('.project-info');

    // Recuperación de color y Escala
    gsap.to(img, {
      scrollTrigger: {
        trigger: card,
        containerAnimation: horizontalScroll,
        start: "left 80%",
        end: "center center",
        scrub: true,
      },
      filter: "grayscale(0%) saturate(140%) contrast(110%)",
      scale: 1.15,
      ease: "power2.out"
    });

    // Parallax del título y aparición
    gsap.fromTo(title, 
      { x: -50, opacity: 0 },
      {
        x: 50,
        opacity: 1,
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontalScroll,
          start: "left 90%",
          end: "center center",
          scrub: true,
        }
      }
    );

    // Revelación de info
    gsap.fromTo(info,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontalScroll,
          start: "left 70%",
          end: "center center",
          scrub: true,
        }
      }
    );
  });
});

const projects = [
  { 
    name: "SmartCook", 
    category: "Inteligencia Culinaria IA", 
    description: "Visión Artificial Multimodal: De la heladera o la alacena al plato perfecto. Análisis inteligente de capturas múltiples para la orquestación culinaria sin fricciones.",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    name: "TimeTracker Mobile", 
    category: "Arquitectura Móvil", 
    description: "Monitoreo de KPIs críticos y validación de desvíos operativos en interfaces de alta fidelidad.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
  },
  { 
    name: "TimeTracker", 
    category: "Métricas de Ingeniería", 
    description: "Trazabilidad de alta precisión para ciclos de desarrollo complejos.",
    img: "/timetracker.png"
  },
  { 
    name: "SimpleID", 
    category: "Protocolo de Identidad", 
    description: "Soberanía digital mediante protocolos de identidad minimalistas.",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200" 
  },
];
</script>

<template>
  <section ref="sectionRef" class="showcase-section">
    <div class="showcase-header">
      <div class="header-content">
        <h2 class="section-title">Casos de Éxito</h2>
        <span class="section-subtitle">Hitos de Ingeniería</span>
      </div>
    </div>

    <div ref="horizontalRef" class="horizontal-container">
      <div v-for="(project, index) in projects" :key="index" :id="'showcase-' + project.name.toLowerCase().replace(/\s+/g, '')" class="project-card">
        <div class="card-inner">
          <div class="img-container">
            <img :src="project.img" :alt="project.name" class="project-img">
            <div class="img-vignette"></div>
            <div class="project-number">{{ (index + 1).toString().padStart(2, '0') }}</div>
          </div>
          
          <div class="project-info">
            <span class="project-category">{{ project.category }}</span>
            <h3 class="project-title">{{ project.name }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-cta">Explorar Arquitectura</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase-section {
  background: #050505;
  width: 100%;
  overflow: hidden;
  position: relative;
  min-height: 100vh;
}

.showcase-header {
  padding: 4rem 5vw 0;
  background: linear-gradient(to bottom, #000, transparent);
  position: relative;
  z-index: 10;
  text-align: right;
}

.section-title {
  font-size: clamp(1.9rem, 3.8vw, 3.4rem);
  font-weight: 900;
  line-height: 1.1;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.77rem;
  color: var(--color-mint);
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
  opacity: 0.7;
}

.horizontal-container {
  display: flex;
  height: 80vh;
  width: fit-content;
  align-items: center;
  padding: 0 15vw 0 15vw; /* Aumentamos el padding derecho para el hito final */
  padding-right: 40vw; 
  gap: 20vw;
  will-change: transform;
}

.project-card {
  width: 65vw;
  max-width: 1100px;
  flex-shrink: 0;
  position: relative;
}

.card-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
}

.img-container {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 30px 60px -12px rgba(0,0,0,0.5);
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(110%);
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.img-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
}

.project-number {
  position: absolute;
  top: -1rem;
  right: -1rem;
  font-family: 'Outfit', sans-serif;
  font-size: 5rem;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.1);
  z-index: 1;
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.project-category {
  color: var(--color-mint);
  font-family: monospace;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  opacity: 0.8;
}

.project-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  color: #fff;
  line-height: 1.1;
}

.project-description {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.6;
  max-width: 380px;
}

.project-cta {
  margin-top: 1rem;
  font-family: monospace;
  font-size: 0.75rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  width: fit-content;
  cursor: pointer;
  transition: all 0.4s ease;
}

.project-cta:hover {
  color: var(--color-mint);
  border-color: var(--color-mint);
  padding-right: 1.5rem;
}

@media (max-width: 1024px) {
  .card-inner {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .horizontal-container {
    height: auto;
    padding: 5vh 10vw;
  }
  .project-card { width: 80vw; }
  .project-title { font-size: 2rem; }
  .project-number { font-size: 3.5rem; }
}
</style>
