<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue';
import KodanLogo from './KodanLogo.vue';

const props = defineProps({
  title: { type: String, default: '' },
  backgroundColor: { type: String, default: 'transparent' },
  textColor: { type: String, default: 'inherit' },
  borderRadius: { type: [Number, String], default: 0 },
  padding: { type: [Number, String], default: 4 }
});

onMounted(() => {
  gsap.from(".hero-content", {
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    ease: "power3.out"
  });
});
</script>

<template>
  <header 
    class="hero"
    :style="{
      backgroundColor: backgroundColor,
      color: textColor,
      paddingTop: padding + 'rem',
      paddingBottom: padding + 'rem',
      borderRadius: borderRadius + 'px'
    }"
  >
    <div class="hero-content">
      <KodanLogo :size="400" />
      <h1 v-if="title" class="accent mt-8">{{ title }}</h1>
    </div>
  </header>
</template>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: 4rem;
  transition: all 0.3s ease;
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
</style>
