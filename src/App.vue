<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KodanLogoDark from './components/kodanLogoDark.vue';
import StorytellingSection from './components/StorytellingSection.vue';
import MasterclassSection from './components/MasterclassSection.vue';
import ColorConfigurator from './components/ColorConfigurator.vue';
import NotificationSystem from './components/NotificationSystem.vue';
import { useNotificationStore } from './stores/notificationStore';

gsap.registerPlugin(ScrollTrigger);

const notificationStore = useNotificationStore();
const logoWrapper = ref(null);
const scrollPrompt = ref(null);

onMounted(() => {
  // 1. Estado Inicial Absoluto (Control total GSAP)
  gsap.set(logoWrapper.value, {
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    scale: 1.1,
    opacity: 1
  });

  // 2. Animación Maestra: Transición de Hero a Nav (Cinemática Seda)
  gsap.to(logoWrapper.value, {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "600px top", // Recorrido calibrado para fluidez
      scrub: 2, // Inercia premium
      invalidateOnRefresh: true
    },
    top: "2.5rem",
    left: "2.5rem",
    xPercent: 0,
    yPercent: 0,
    scale: 0.75,
    ease: "power2.inOut"
  });

  // 3. Conmutación Binaria del Prompt
  gsap.to(scrollPrompt.value, {
    scrollTrigger: {
      trigger: "body",
      start: "10px top",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.inOut"
  });
});
</script>

<template>
  <main class="app-container">
    <!-- Capa de Marca Dinámica (Persistente) -->
    <div ref="logoWrapper" class="logo-dynamic-wrapper">
      <KodanLogoDark :size="400" />
    </div>

    <!-- Secuenciación Narrativa -->
    <div class="page-content">
      <!-- 1. Hero / Intro -->
      <section class="hero-spacer">
        <div ref="scrollPrompt" class="scroll-prompt">Scroll para iniciar</div>
      </section>

      <!-- 2. Storytelling Section -->
      <StorytellingSection />

      <!-- 3. Masterclass Section -->
      <MasterclassSection />

      <!-- 4. Footer & Configurator -->
      <ColorConfigurator />
    </div>

    <NotificationSystem />
  </main>
</template>

<style>
.app-container {
  background: var(--bg-global);
  color: var(--text-body);
  min-height: 300vh;
}

.logo-dynamic-wrapper {
  position: fixed;
  z-index: 1000;
  will-change: transform, top, left;
  pointer-events: none;
}

.logo-dynamic-wrapper > * {
  pointer-events: auto;
}

.page-content {
  position: relative;
  z-index: 1;
}

.hero-spacer {
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 5rem;
}

.scroll-prompt {
  font-family: monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: var(--color-mint);
  opacity: 0.5; /* Opacidad Base Estable */
  animation: bounce 2s infinite ease-in-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
