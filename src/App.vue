<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KodanLogoDark from './components/kodanLogoDark.vue';
import NarrativeReveal from './components/NarrativeReveal.vue';
import ParallaxSection from './components/ParallaxSection.vue';
import SequentialTraceability from './components/SequentialTraceability.vue';
import DesignShowCase from './components/DesignShowCase.vue';
import CylinderShowCase from './components/CylinderShowCase.vue';
import ContactFooter from './components/ContactFooter.vue';
import ContactSystem from './components/ContactSystem.vue';
import NotificationSystem from './components/NotificationSystem.vue';
import PreLoader from './components/PreLoader.vue';
import VerticalProgress from './components/VerticalProgress.vue';
import AtmosphericEntrance from './components/AtmosphericEntrance.vue';
import BentoGridShowCase from './components/BentoGridShowCase.vue';
import { useNotificationStore } from './stores/notificationStore';

gsap.registerPlugin(ScrollTrigger);

const notificationStore = useNotificationStore();
const logoWrapper = ref(null);
const logoInner = ref(null);
const scrollPrompt = ref(null);
const isLoaded = ref(false);

let logoObserver = null;
let isLogoRight = false;

const handleLogoSync = () => {
  const cylinderSection = document.getElementById('cylinder-showcase-section');
  if (!cylinderSection || !logoInner.value) return;

  if (logoObserver) logoObserver.disconnect();

  logoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        
        // El cilindro está FUERA del viewport por arriba (usuario bajó al bento)
        if (!entry.isIntersecting && rect.top < 0) {
          if (!isLogoRight) {
            isLogoRight = true;
            gsap.to(logoInner.value, {
              x: window.innerWidth - 300 - 80,
              duration: 1.2,
              ease: "expo.out",
              overwrite: "auto"
            });
          }
        } 
        // El cilindro está ENTRANDO o es VISIBLE (usuario está en Cylinder o subiendo)
        else if (entry.isIntersecting) {
          if (isLogoRight) {
            isLogoRight = false;
            gsap.to(logoInner.value, {
              x: 0,
              duration: 1.0,
              ease: "expo.out",
              overwrite: "auto"
            });
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px"
    }
  );

  logoObserver.observe(cylinderSection);
};

const handleLoaded = () => {
  isLoaded.value = true;
  setTimeout(() => {
    ScrollTrigger.refresh();
    handleLogoSync(); // Sincronizamos el logo al cargar
  }, 1000);
};

onMounted(() => {
  // 1. Estado Inicial Absoluto
  gsap.set(logoWrapper.value, {
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    scale: 1.1,
    opacity: 1
  });

  // 2. Animación Intro Logo (Hero → Header)
  gsap.to(logoWrapper.value, {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "500px top",
      scrub: true,
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
    ease: "none"
  });

  // 3. Prompt de Scroll
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
      <div ref="logoInner" class="logo-inner-travel">
        <KodanLogoDark :size="400" />
      </div>
    </div>

    <!-- Secuenciación Narrativa -->
    <div class="page-content">
      <!-- 1. Hero / Intro -->
      <section class="hero-spacer">
        <div ref="scrollPrompt" class="scroll-prompt">Scroll para iniciar</div>
      </section>

      <!-- 2. Brand Story / Manifesto -->
      <NarrativeReveal />

      <!-- 3. Parallax Section (Capa de Validación Técnica) -->
      <ParallaxSection />

      <!-- 4. Engineering Timeline -->
      <SequentialTraceability />

      <!-- 6. Cylinder Showcase (3D Ring) -->
      <CylinderShowCase />

      <!-- 7. Portal al Showcase (Ancla de Transición) -->
      <div id="showcase-anchor" class="showcase-portal">
        <AtmosphericEntrance />
        <BentoGridShowCase />
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
  width: 400px;
}

.logo-inner-travel {
  width: 100%;
  will-change: transform;
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
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: var(--color-mint);
  opacity: 0.5; /* Opacidad Base Estable */
  animation: drift 3s infinite ease-in-out;
}

@keyframes drift {
  0%, 100% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-8px); opacity: 0.7; }
}


</style>
