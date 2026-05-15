<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ShowcaseCard from './ShowcaseCard.vue';

const artifacts = ref<{ src: string; size: string }[]>([]);

// Lista de respaldo (Fallback) para entornos sin PHP o fallos de red
const staticFallback = [
  '/assets/animations/hero-power-ai-preview-BqpSbx41.gif',
  '/assets/animations/animated_01.webp',
  '/assets/animations/animated_02.webp',
  '/assets/animations/hero-luminex-preview-CxOP7ce6.gif',
  '/assets/animations/animated_03.webp',
  '/assets/animations/animated_04.webp',
  '/assets/animations/hero-vex-ventures-preview-BczMFIiw.gif',
  '/assets/animations/animated_05.webp',
  '/assets/animations/hero-wealth-preview-B70idl_u.gif',
  '/assets/animations/animated_06.webp',
  '/assets/animations/hero-deck-preview-CbidQJxW.gif',
  '/assets/animations/hero-hr-saas-preview-Cf365Y1O.gif',
  '/assets/animations/hero-nexacore-preview-DtWEu8_f.gif',
  '/assets/animations/hero-rivr-preview-DcS3pjx4.gif',
  '/assets/animations/hero-shamoni-preview-DfbPWZl9.gif',
  '/assets/animations/hero-skyelite-preview-DHaZIgUv.gif',
  '/assets/animations/hero-synapse-preview-CP83ds5W.gif'
];

const emit = defineEmits(['ready']);

// Lógica de obtención y selección aleatoria (Hybrid: API -> Fallback)
const refreshArtifacts = async () => {
  let allAnimations = [];
  let source = '';
  
  try {
    const response = await fetch('/api/animations');
    const contentType = response.headers.get('content-type');
    
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      throw new Error(`Invalid API Response: ${response.status} (${contentType})`);
    }
    
    allAnimations = await response.json();
    
    if (!Array.isArray(allAnimations) || allAnimations.length === 0) {
      throw new Error('API returned empty or invalid data');
    }
    
    source = 'REAL-TIME API';
  } catch (error) {
    source = 'RESILIENCE FALLBACK';
    allAnimations = staticFallback;
  }

  const shuffled = [...allAnimations].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 6);
  
  const sizes = ['large', 'medium', 'small', 'medium', 'small', 'small'];
  
  artifacts.value = selected.map((src, index) => ({
    src,
    size: sizes[index] || 'small'
  }));
  
  // Notificar al padre que el layout se ha estabilizado
  setTimeout(() => {
    emit('ready');
  }, 100);
};

onMounted(() => {
  refreshArtifacts();
});
</script>

<template>
  <section class="bento-showcase">
    <div class="grid-container">
      <ShowcaseCard 
        v-for="(item, index) in artifacts" 
        :key="index" 
        :src="item.src" 
        :size="item.size"
      />
    </div>
  </section>
</template>

<style scoped>
.bento-showcase {
  width: 100%;
  padding: 0 5vw 10vh;
  background: #000;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(220px, auto);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
