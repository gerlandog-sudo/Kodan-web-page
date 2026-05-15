<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';

const titleRef = ref(null);
const manifestoRef = ref(null);

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".showcase-hero",
      start: "top 80%",
    }
  });

  tl.from(titleRef.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
  })
  .from(manifestoRef.value, {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.5")
  .from(".spec-item", {
    opacity: 0,
    stagger: 0.1,
    duration: 0.5
  }, "-=0.3");
});
</script>

<template>
  <header class="showcase-hero">
    <div class="hero-content">
      <h1 ref="titleRef" class="glitch-title">KODAN / ARTIFACTS</h1>
      <p ref="manifestoRef" class="manifesto">
        Sistemas resilientes, interfaces de alta fidelidad y lógica de grado industrial. 
        Esta es la bitácora visual de nuestra búsqueda por la excelencia técnica, 
        capturada en fragmentos de ejecución.
      </p>
      <div class="tech-specs">
        <span class="spec-item">STABILITY: <span class="pulse-value">100%</span></span>
        <span class="spec-item">CORE: VUE/GSAP</span>
        <span class="spec-item">STATUS: DEPLOYED</span>
      </div>
    </div>
    
    <!-- Decoración técnica de fondo -->
    <div class="tech-grid-bg"></div>
  </header>
</template>

<style scoped>
.showcase-hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 15vh 5vw 10vh;
  background: #000;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 900px;
  position: relative;
  z-index: 2;
}

.glitch-title {
  font-size: clamp(1.9rem, 3.8vw, 3.4rem);
  font-weight: 900;
  letter-spacing: -2px;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.manifesto {
  font-family: var(--font-mono);
  font-size: 0.77rem;
  color: var(--color-mint);
  letter-spacing: 2px;
  line-height: 1.6;
  max-width: 500px;
  opacity: 0.7;
  text-transform: uppercase;
}

.tech-specs {
  margin-top: 4rem;
  display: flex;
  gap: 3rem;
  border-top: 1px solid rgba(0, 255, 194, 0.15);
  padding-top: 2rem;
}

.spec-item {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #666;
  letter-spacing: 3px;
  display: flex;
  align-items: center;
}

.pulse-value {
  color: var(--color-mint);
  animation: soft-pulse 2s infinite alternate;
}

@keyframes soft-pulse {
  from { opacity: 0.7; filter: brightness(0.8); }
  to { opacity: 1; filter: brightness(1.2); }
}

.spec-item::before {
  content: "";
  width: 6px;
  height: 6px;
  background: var(--color-mint);
  margin-right: 12px;
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-mint);
}

.tech-grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 194, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 194, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 1;
}

@media (max-width: 768px) {
  .tech-specs {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
