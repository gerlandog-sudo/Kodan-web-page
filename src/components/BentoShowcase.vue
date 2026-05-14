<script setup lang="ts">
import { ref } from 'vue';
import ShowcaseCard from './ShowcaseCard.vue';

const artifacts = [
  { src: '/assets/animations/hero-power-ai-preview-BqpSbx41.gif', size: 'large' },
  { src: '/assets/animations/animated_01.webp', size: 'medium' },
  { src: '/assets/animations/animated_02.webp', size: 'small' },
  { src: '/assets/animations/hero-luminex-preview-CxOP7ce6.gif', size: 'medium' },
  { src: '/assets/animations/animated_03.webp', size: 'small' },
  { src: '/assets/animations/animated_04.webp', size: 'small' },
  { src: '/assets/animations/hero-vex-ventures-preview-BczMFIiw.gif', size: 'large' },
  { src: '/assets/animations/animated_05.webp', size: 'medium' },
  { src: '/assets/animations/hero-wealth-preview-B70idl_u.gif', size: 'small' },
  { src: '/assets/animations/animated_06.webp', size: 'small' },
  { src: '/assets/animations/hero-deck-preview-CbidQJxW.gif', size: 'medium' },
  { src: '/assets/animations/hero-hr-saas-preview-Cf365Y1O.gif', size: 'small' },
  { src: '/assets/animations/hero-nexacore-preview-DtWEu8_f.gif', size: 'medium' },
  { src: '/assets/animations/hero-rivr-preview-DcS3pjx4.gif', size: 'small' },
  { src: '/assets/animations/hero-shamoni-preview-DfbPWZl9.gif', size: 'small' },
  { src: '/assets/animations/hero-skyelite-preview-DHaZIgUv.gif', size: 'medium' },
  { src: '/assets/animations/hero-synapse-preview-CP83ds5W.gif', size: 'small' },
];
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
