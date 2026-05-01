<template>
  <div class="bento-container">
    <div 
      v-for="(item, index) in items" 
      :key="index" 
      :class="['bento-item', 'size-' + item.size]"
      ref="bentoItems"
    >
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const bentoItems = ref([]);

onMounted(() => {
  gsap.from(".bento-item", {
    scrollTrigger: {
      trigger: ".bento-container",
      start: "top 80%",
    },
    opacity: 0,
    scale: 0.8,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.7)"
  });
});
</script>

<style scoped>
.bento-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 1.5rem;
  padding: 2rem;
}

.bento-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform 0.3s ease;
}

.bento-item h3 {
  font-family: var(--font-sans);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.bento-item:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.3);
}

.bento-item.size-1x1 { grid-column: span 1; grid-row: span 1; }
.bento-item.size-2x1 { grid-column: span 2; grid-row: span 1; }
.bento-item.size-2x2 { grid-column: span 2; grid-row: span 2; }

@media (max-width: 1024px) {
  .bento-container { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .bento-container { grid-template-columns: 1fr; grid-auto-rows: minmax(150px, auto); }
  .bento-item.size-2x1, .bento-item.size-2x2 { grid-column: span 1; }
}
</style>
