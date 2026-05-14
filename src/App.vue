<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KodanLogoDark from './components/kodanLogoDark.vue';
import StorytellingSection from './components/StorytellingSection.vue';
import ParallaxSection from './components/ParallaxSection.vue';
import MasterclassSection from './components/MasterclassSection.vue';
import DesignShowcase from './components/DesignShowcase.vue';
import CylinderShowcase from './components/CylinderShowcase.vue';
import ContactFooter from './components/ContactFooter.vue';
import ContactSystem from './components/ContactSystem.vue';
import NotificationSystem from './components/NotificationSystem.vue';
import PreLoader from './components/PreLoader.vue';
import VerticalProgress from './components/VerticalProgress.vue';
import ShowcaseHero from './components/ShowcaseHero.vue';
import BentoShowcase from './components/BentoShowcase.vue';
import { useNotificationStore } from './stores/notificationStore';

gsap.registerPlugin(ScrollTrigger);

const notificationStore = useNotificationStore();
const logoWrapper = ref(null);
const scrollPrompt = ref(null);
const isLoaded = ref(false);

const handleLoaded = () => {
  isLoaded.value = true;
  // Refrescar ScrollTrigger después de que el DOM sea visible y el preloader se retire
  // Damos más tiempo (500ms) para que el layout de Masterclass se estabilice
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
};

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

  // 3. Animación Intro Logo (Hero → Header)
  gsap.to(logoWrapper.value, {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "500px top",
      scrub: true, // Sincronía instantánea sin inercia para evitar saltos al volver al TOP
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        if (self.progress === 0) {
          gsap.set(logoWrapper.value, { 
            scale: 1, 
            top: "50%", 
            left: "50%", 
            xPercent: -50, 
            yPercent: -50 
          });
        }
      }
    },
    top: "2.5rem",
    left: "2.5rem",
    xPercent: 0,
    yPercent: 0,
    scale: 0.75,
    ease: "none" // Lineal para el scrub
  });

  // 4. Logo ↔ Portal: Viaje lateral usando transform (X) para no romper el scrub de 'left'
  const resetLogoX = () => {
    gsap.to(logoWrapper.value, {
      x: 0,
      duration: 1.2,
      ease: "power3.inOut",
      overwrite: "auto",
      onComplete: () => {
        // Limpiamos estrictamente 'x' para que el scrub de la intro (que usa xPercent) no tenga offsets residuales
        if (window.scrollY < 1200) {
          gsap.set(logoWrapper.value, { clearProps: "x" });
        }
      }
    });
  };

  ScrollTrigger.create({
    trigger: "#cylinder-showcase-section",
    start: "bottom 30%",
    onEnter: () => {
      gsap.to(logoWrapper.value, {
        x: "70vw", // Desplazamiento lateral sin tocar 'left'
        duration: 1.2,
        ease: "power3.inOut",
        overwrite: "auto"
      });
    },
    onEnterBack: resetLogoX,
    onLeaveBack: resetLogoX
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
  <PreLoader @loaded="handleLoaded" />
  
  <main class="app-container" :class="{ 'is-visible': isLoaded }">
    <VerticalProgress v-if="isLoaded" />
    
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

      <!-- 3. Parallax Section (Capa de Validación Técnica) -->
      <ParallaxSection />

      <!-- 4. Masterclass Section -->
      <MasterclassSection />

      <!-- 6. Cylinder Showcase (3D Ring) -->
      <CylinderShowcase />

      <!-- 7. Portal al Showcase (Ancla de Transición) -->
      <div id="showcase-anchor" class="showcase-portal">
        <ShowcaseHero />
        <BentoShowcase />
      </div>

      <!-- 8. Footer Premium -->
      <ContactFooter />

      <!-- Espaciador Final removido para clavar el footer al fondo -->
    </div>

    <ContactSystem />
    <NotificationSystem />
  </main>
</template>

<style>
.app-container {
  background: var(--bg-global);
  color: var(--text-body);
  min-height: 300vh;
  opacity: 0;
  transition: opacity 1s ease-out;
}

.app-container.is-visible {
  opacity: 1;
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
