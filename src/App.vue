<script setup>
import { onMounted, onUnmounted, ref, defineAsyncComponent } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KodanLogoDark from './components/kodanLogoDark.vue';
import PreLoader from './components/PreLoader.vue';
import NotificationSystem from './components/NotificationSystem.vue';
import VerticalProgress from './components/VerticalProgress.vue';
import ContactSystem from './components/ContactSystem.vue';

// Async Components para Optimización de Performance
const NarrativeReveal = defineAsyncComponent(() => import('./components/NarrativeReveal.vue'));
const ParallaxSection = defineAsyncComponent(() => import('./components/ParallaxSection.vue'));
const SequentialTraceability = defineAsyncComponent(() => import('./components/SequentialTraceability.vue'));
const DesignShowCase = defineAsyncComponent(() => import('./components/DesignShowCase.vue'));
const CylinderShowCase = defineAsyncComponent(() => import('./components/cylindershowcase.vue'));
const AtmosphericEntrance = defineAsyncComponent(() => import('./components/AtmosphericEntrance.vue'));
const BentoGridShowCase = defineAsyncComponent(() => import('./components/BentoGridShowCase.vue'));
const ContactFooter = defineAsyncComponent(() => import('./components/ContactFooter.vue'));
import { useNotificationStore } from './stores/notificationStore';

gsap.registerPlugin(ScrollTrigger);

const notificationStore = useNotificationStore();
const logoWrapper = ref(null);
const logoInner = ref(null);
const scrollPrompt = ref(null);
const isLoaded = ref(false);

let logoObserver = null;
let isLogoRight = false;

const navShortcuts = (e) => {
  // Ignorar si el usuario está escribiendo en un input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const anchors = {
    '1': '#hero',
    '2': '#mission',
    '3': '#traceability',
    '4': '#artifacts',
    '5': '#contact'
  };
  
  const target = anchors[e.key];
  if (target) {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      notificationStore.addNotification(`Navegando a: ${target.replace('#', '')}`, 'success', 2000);
    }
  }
};

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
  window.addEventListener('keydown', navShortcuts);

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

onUnmounted(() => {
  window.removeEventListener('keydown', navShortcuts);
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
      <section id="hero" class="hero-spacer">
        <div ref="scrollPrompt" class="scroll-prompt">Scroll para iniciar</div>
      </section>

      <!-- 2. Brand Story + Parallax (Mission Group) -->
      <div id="mission">
        <NarrativeReveal />
        <ParallaxSection />
      </div>

      <!-- 4. Engineering Timeline -->
      <SequentialTraceability id="traceability" />

      <!-- 4. Artifacts Group (Cylinder + Bento) -->
      <div id="artifacts">
        <CylinderShowCase />
        <div id="showcase-anchor" class="showcase-portal">
          <AtmosphericEntrance />
          <BentoGridShowCase />
        </div>
      </div>

      <!-- 8. Footer Premium -->
      <ContactFooter id="contact" />

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
