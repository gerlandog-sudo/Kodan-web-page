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
  
  // 1. Pinning y Scroll Horizontal
  gsap.to(horizontalRef.value, {
    x: () => -(horizontalRef.value!.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top top",
      end: () => `+=${horizontalRef.value!.scrollWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });

  // 2. Parallax y Desaturación individual por tarjeta
  cards.forEach((card) => {
    const img = card.querySelector('.project-img');
    const title = card.querySelector('.project-title');

    // Recuperación de color (Dopamine colors)
    gsap.to(img, {
      scrollTrigger: {
        trigger: card,
        containerAnimation: gsap.getById('horizontalScroll'), // Necesitaría ID o referencia
        start: "left center",
        end: "right center",
        scrub: true,
      },
      filter: "grayscale(0%) saturate(120%)",
      scale: 1.1
    });

    // Parallax Extremo: El título se mueve a diferente velocidad
    gsap.to(title, {
      x: 100,
      scrollTrigger: {
        trigger: card,
        start: "left right",
        end: "right left",
        scrub: true,
      }
    });
  });
});

const projects = [
  { name: "Neural Nexus", category: "AI Architecture", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800" },
  { name: "Digital Silk", category: "UI System", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
  { name: "Quantum Core", category: "Backend Engine", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" },
  { name: "Ether Portal", category: "Web3 Protocol", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800" },
];
</script>

<template>
  <section ref="sectionRef" class="abyss-container">
    <div class="abyss-header">
      <span class="abyss-tag">Design Showcase</span>
      <h2 class="abyss-title">El Abismo Digital</h2>
    </div>

    <div ref="horizontalRef" class="horizontal-track">
      <div v-for="(project, index) in projects" :key="index" class="project-card">
        <div class="img-wrapper">
          <img :src="project.img" :alt="project.name" class="project-img">
          <div class="img-overlay"></div>
        </div>
        <div class="project-info">
          <p class="project-category">{{ project.category }}</p>
          <h3 class="project-title">{{ project.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.abyss-container {
  background: #000; /* Negro profundo */
  overflow: hidden;
  width: 100%;
}

.abyss-header {
  padding: 8rem 5vw 2rem;
  text-align: left;
}

.abyss-tag {
  color: var(--color-thermal);
  font-family: monospace;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.abyss-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  margin-top: 1rem;
}

.horizontal-track {
  display: flex;
  height: 100vh;
  width: fit-content;
  align-items: center;
  padding: 0 10vw;
  gap: 15vw;
}

.project-card {
  position: relative;
  width: 60vw;
  max-width: 800px;
  flex-shrink: 0;
}

.img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 4px;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) saturate(0%); /* Desaturación inicial */
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
}

.project-info {
  margin-top: 2rem;
}

.project-category {
  color: var(--color-mint);
  font-family: monospace;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: 3rem;
  font-weight: 400;
  color: #fff;
  will-change: transform;
}

@media (max-width: 768px) {
  .project-card { width: 85vw; }
  .project-title { font-size: 2rem; }
}
</style>
