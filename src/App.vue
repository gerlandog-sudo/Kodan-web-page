<script setup>
import KodanLogo from './components/KodanLogo.vue';
import BentoGrid from './components/BentoGrid.vue';

import StorytellingSection from './components/StorytellingSection.vue';
import MasterclassSection from './components/MasterclassSection.vue';
import NotificationSystem from './components/NotificationSystem.vue';
import ColorConfigurator from './components/ColorConfigurator.vue';
import { useNotificationStore } from './stores/notificationStore';
import { onMounted } from 'vue';
import gsap from 'gsap';

const notificationStore = useNotificationStore();

onMounted(() => {
  notificationStore.notify('KODAN Architecture inicializado con éxito', 'success');

  // Animación de entrada para el Hero
  gsap.from(".hero", {
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    ease: "power3.out"
  });
});

const bentoItems = [
  { title: 'Innovación Digital', description: 'Transformamos ideas en productos digitales de alto impacto.', size: '2x2' },
  { title: 'Arquitectura Cloud', description: 'Infraestructura escalable y segura.', size: '1x1' },
  { title: 'IA Generativa', description: 'Modelos personalizados para su negocio.', size: '2x1' },
  { title: 'Experiencia de Usuario', description: 'Interfaces que cautivan y convierten.', size: '1x1' },
  { title: 'Consultoría Estratégica', description: 'Acompañamos su crecimiento tecnológico.', size: '2x1' }
];
</script>

<template>
  <main class="app-container">
    <header class="hero">
      <KodanLogo :size="400" class="mx-auto mb-4" />
      <p class="mt-4">Desarrollo Institucional de Próxima Generación</p>

    </header>

    <BentoGrid :items="bentoItems" />
    
    <StorytellingSection />

    <MasterclassSection />

    <div class="spacer"></div>
    <NotificationSystem />
    <ColorConfigurator />
  </main>
</template>

<style>
.app-container {
  min-height: 100vh;
  padding: 4rem 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero h1 {
  font-family: var(--font-serif);
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: -3px;
  margin-bottom: 1rem;
}

.hero .accent {
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 1.25rem;
  color: var(--color-text-muted);
}

.spacer {
  height: 50vh;
}
</style>
