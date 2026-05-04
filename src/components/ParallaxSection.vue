<template>
  <section class="parallax-container" ref="parallaxContainer">
    <!-- Capa de Fondo (La Imagen) -->
    <div class="parallax-bg" ref="parallaxBg">
      <img :src="bgImage" alt="Background" class="bg-image">
      <div class="overlay"></div>
    </div>

    <!-- Capa de Frente (El Texto) -->
    <div class="parallax-content" ref="parallaxText">
      <h2 class="tech-data">{{ title }}</h2>
      <p class="parallax-slogan">{{ subtitle }}</p>
      <button class="btn-mint neon-shadow">{{ buttonText }}</button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps({
  bgImage: { type: String, default: '/src/assets/fondo.jpg' },
  title: { type: String, default: 'Modernización Disruptiva' },
  subtitle: { type: String, default: 'Transformamos sistemas legados en arquitecturas de alto rendimiento.' },
  buttonText: { type: String, default: 'Iniciar Consultoría' }
});

defineOptions({
  cmsConfig: {
    label: 'Parallax Section',
    icon: 'image',
    fields: {
      bgImage: 'string',
      title: 'string',
      subtitle: 'string',
      buttonText: 'string'
    }
  }
});

gsap.registerPlugin(ScrollTrigger);

const parallaxContainer = ref(null);
const parallaxBg = ref(null);
const parallaxText = ref(null);

onMounted(() => {
  // Efecto Parallax: La imagen se mueve más lento (y)
  gsap.to(parallaxBg.value, {
    scrollTrigger: {
      trigger: parallaxContainer.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    },
    y: "20%", // Se desplaza hacia abajo mientras scrolleamos
    ease: "none"
  });

  // Efecto Parallax: El texto se mueve más rápido hacia arriba
  gsap.to(parallaxText.value, {
    scrollTrigger: {
      trigger: parallaxContainer.value,
      start: "top bottom",
      end: "bottom top",
      scrub: 1 // Suavizado
    },
    y: "-50px", 
    opacity: 1,
    ease: "power1.out"
  });
});
</script>

<style scoped>
.parallax-container {
  position: relative;
  height: 80vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0;
  border-radius: 12px;
  background: var(--bg-global);
}

.parallax-bg {
  position: absolute;
  top: -20%; /* Margen para el movimiento */
  left: 0;
  width: 100%;
  height: 140%;
  z-index: 1;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4) saturate(1.2);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--bg-global), transparent 20%, transparent 80%, var(--bg-global));
}

.parallax-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  opacity: 0.8; /* Empezamos un poco menos opacos para la animación */
}

.parallax-content h2 {
  font-size: 4rem;
  font-weight: 900;
  color: var(--color-mint);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.parallax-slogan {
  font-size: 1.5rem;
  color: var(--text-h);
  margin-bottom: 2rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .parallax-content h2 { font-size: 2.5rem; }
  .parallax-slogan { font-size: 1.1rem; }
}
</style>
