<template>
  <section ref="sectionRef" class="storytelling-container">
    <!-- Capa de Textura: Ruido Granulado (Grainy Noise) -->
    <div class="grain-overlay"></div>

    <!-- The Ghost Background: Parallax + Máscara Radial de Cursor -->
    <div 
      class="ghost-bg" 
      :style="{ 
        transform: `translateY(${parallaxY}px)`,
        '--mask-x': `${mouseX}px`,
        '--mask-y': `${mouseY}px`
      }"
    >
      <img src="/kodan_ghost_bg.png" alt="Digital Silk Genesis" />
    </div>

    <!-- Terminal Pulse: Flujo de Datos Lateral -->
    <div class="terminal-pulse">
      <div class="pulse-line" v-for="n in 5" :key="n">
        <code>{{ codeSnippets[n-1] }}</code>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- Titular GSAP Reveal -->
      <h2 class="title-reveal" ref="titleRef">Unraveling the Invisible.</h2>

      <!-- Manifiesto Scrollytelling con Text Splitting -->
      <p class="manifesto-text" ref="manifestoRef">
        <span 
          v-for="(word, index) in manifestoWords" 
          :key="index"
          class="word"
          :class="{ 'keyword': isKeyword(word) }"
        >
          {{ word }}&nbsp;
        </span>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);
const manifestoRef = ref(null);

const mouseX = ref(0);
const mouseY = ref(0);
const parallaxY = ref(0);

const text = "Más allá de la sintaxis, existe una arquitectura que respira. En el silencio de los sistemas legados, detectamos los nudos técnicos que otros ignoran. No solo refactorizamos código; sintetizamos seda digital desde el abismo de la complejidad. Operamos en la frontera donde el desarrollo a medida se encuentra con la preservación del legado, transformando cajas negras en infraestructuras líquidas y escalables. El futuro no se construye, se teje con precisión quirúrgica.";
const manifestoWords = text.split(' ');

const keywords = ['legados', 'seda', 'abismo', 'precisión', 'líquidas', 'sintetizamos'];

const codeSnippets = [
  "const logo = ref(null);",
  "gsap.to(logo.value, { scale: 0.75 });",
  "ScrollTrigger.create({ scrub: true });",
  "// System synchronized.",
  "returnAnim = gsap.to(text, { x: 0 });"
];

const isKeyword = (word) => {
  const cleanWord = word.toLowerCase().replace(/[,.;]/g, '');
  return keywords.includes(cleanWord);
};

const handleMouseMove = (e) => {
  const rect = sectionRef.value.getBoundingClientRect();
  mouseX.value = e.clientX - rect.left;
  mouseY.value = e.clientY - rect.top;
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);

  const words = manifestoRef.value.querySelectorAll('.word');

  // 1. Reveal del Titular
  const titleAnim = gsap.from(titleRef.value, {
    scrollTrigger: {
      trigger: titleRef.value,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power4.out"
  });

  // 2. Animación del Manifiesto
  const manifestoAnim = gsap.from(words, {
    scrollTrigger: {
      trigger: manifestoRef.value,
      start: "top 70%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    filter: "blur(20px)",
    stagger: 0.05,
    duration: 0.8,
    ease: "power2.out"
  });

  // 3. Reset Lógico al alcanzar el tope (Hero)
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    onToggle: (self) => {
      if (self.isActive) {
        // Al volver al tope absoluto, reseteamos ambas animaciones para permitir re-revelado
        titleAnim.pause(0);
        manifestoAnim.pause(0);
      }
    }
  });

  // 4. Parallax sutil del Ghost Background
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      parallaxY.value = self.progress * 150;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
.storytelling-container {
  position: relative;
  min-height: 120vh;
  background-color: #050505;
  padding: 10rem 10%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.grain-overlay {
  position: absolute;
  inset: 0;
  background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
  opacity: 0.05;
  pointer-events: none;
  z-index: 5;
}

.ghost-bg {
  position: absolute;
  inset: -10% -5%;
  z-index: 1;
  opacity: 0.4;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(
    circle 300px at var(--mask-x) var(--mask-y),
    black 0%,
    transparent 100%
  );
  mask-image: radial-gradient(
    circle 300px at var(--mask-x) var(--mask-y),
    black 0%,
    transparent 100%
  );
}

.ghost-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.6);
}

.terminal-pulse {
  position: absolute;
  left: 2rem;
  top: 0;
  bottom: 0;
  width: 200px;
  opacity: 0.15;
  font-family: monospace;
  font-size: 0.7rem;
  color: var(--color-mint);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 2;
  pointer-events: none;
}

.pulse-line {
  animation: scrollData 20s linear infinite;
}

@keyframes scrollData {
  from { transform: translateY(100vh); }
  to { transform: translateY(-100vh); }
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 900px;
}

.title-reveal {
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 3rem;
  color: var(--text-h);
}

.manifesto-text {
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  line-height: 1.6;
  color: #888888;
  font-weight: 300;
}

.word {
  display: inline-block;
  transition: color 0.3s ease;
}

.keyword {
  color: #00E5E5;
  font-weight: 500;
  cursor: help;
}

.keyword:hover {
  text-shadow: 0 0 15px rgba(0, 229, 225, 0.6);
}
</style>
