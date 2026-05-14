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

    <!-- Terminal Pulse: Flujo de Datos Lateral (Restaurado a la izquierda) -->
    <div class="terminal-pulse">
      <div class="pulse-line" v-for="n in 6" :key="n">
        <code>{{ codeSnippets[(n-1) % codeSnippets.length] }}</code>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- Headline con Efecto de Escaneo Técnico (Tamaño Optimizado) -->
      <div class="headline-container">
        <h2 class="title-reveal" ref="titleRef">
          La arquitectura de lo invisible: donde la precisión técnica se encuentra con la visión de negocio.
        </h2>
        <div class="scanline" ref="scanlineRef"></div>
      </div>

      <!-- Manifiesto con Animación de Surgimiento (Words Stagger) -->
      <p class="manifesto-text" ref="manifestoRef">
        <span 
          v-for="(word, index) in manifestoWords" 
          :key="index"
          class="word"
        >
          <template v-if="word.includes('<kodan/>')">
            <span class="bracket">&lt;</span><span class="brand-name">kodan</span><span class="bracket">/&gt;</span>{{ word.replace('<kodan/>', '') }}
          </template>
          <template v-else>
            {{ word }}
          </template>
          &nbsp;
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
const scanlineRef = ref(null);
const manifestoRef = ref(null);

const mouseX = ref(0);
const mouseY = ref(0);
const parallaxY = ref(0);

const fullText = "En <kodan/>, no simplemente escribimos código; diseñamos ecosistemas digitales bajo una filosofía de sintaxis reactiva. Creemos que un software excepcional no es aquel que solo funciona, sino aquel que está construido con la economía de recursos y la elegancia estructural de una pieza de ingeniería de precisión. Integramos agilidad y pensamiento sistémico para transformar problemas complejos en interfaces intuitivas y arquitecturas escalables. No buscamos ser un proveedor masivo, sino el aliado estratégico para quienes entienden que, en el desarrollo boutique, la excelencia técnica es la única métrica que garantiza la trascendencia.";
const manifestoWords = fullText.split(' ');

const codeSnippets = [
  "const architecture = 'invisible';",
  "gsap.to(system, { precision: 1.0 });",
  "// Boutique Development Protocol",
  "interface ScalableEcosystem { ... }",
  "return excellence.guarantee();",
  "sys.analyze(legacy_codebase);"
];

const handleMouseMove = (e) => {
  if (!sectionRef.value) return;
  const rect = sectionRef.value.getBoundingClientRect();
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;
  mouseX.value = x - rect.left;
  mouseY.value = y - rect.top;
};

let headlineTL = null;
let manifestoAnim = null;

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('touchmove', handleMouseMove, { passive: true });

  // 1. Animación del Headline (Scanline + Gradient Reveal)
  headlineTL = gsap.timeline({
    scrollTrigger: {
      trigger: titleRef.value,
      start: "top 95%",
      toggleActions: "play none none none"
    }
  });

  headlineTL.fromTo(scanlineRef.value, 
    { left: "-15%" },
    { left: "115%", duration: 0.8, ease: "power2.out" }
  );

  headlineTL.fromTo(titleRef.value,
    { backgroundPosition: "100% 0%", opacity: 0.3 },
    { backgroundPosition: "0% 0%", opacity: 1, duration: 0.8, ease: "power2.out" },
    "<"
  );

  // 2. Animación del Manifiesto (Staggered Word Reveal - "Lo que estaba muy bueno")
  const words = manifestoRef.value.querySelectorAll('.word');
  manifestoAnim = gsap.from(words, {
    scrollTrigger: {
      trigger: manifestoRef.value,
      start: "top 95%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    filter: "blur(8px)",
    y: 15,
    stagger: 0.008,
    duration: 0.5,
    ease: "power2.out"
  });

  // 3. Reset Lógico para Re-entrada
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    onToggle: (self) => {
      if (self.isActive) {
        if (headlineTL) headlineTL.pause(0);
        if (manifestoAnim) manifestoAnim.pause(0);
      }
    }
  });

  // 4. Parallax del Fondo
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
  window.removeEventListener('touchmove', handleMouseMove);
  ScrollTrigger.getAll().forEach(t => t.kill());
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
  align-items: flex-end;
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
  opacity: 0.45; /* Aumentado para mayor presencia */
  pointer-events: none;
  -webkit-mask-image: radial-gradient(
    circle 400px at var(--mask-x) var(--mask-y),
    black 0%,
    transparent 100%
  );
  mask-image: radial-gradient(
    circle 400px at var(--mask-x) var(--mask-y),
    black 0%,
    transparent 100%
  );
}

.ghost-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.4);
}

.terminal-pulse {
  position: absolute;
  left: 2rem; /* Vuelve a la izquierda */
  top: 0;
  bottom: 0;
  width: 250px;
  opacity: 0.35; /* Aumentado para mayor visibilidad */
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  color: var(--color-mint);
  text-shadow: 0 0 10px rgba(0, 255, 194, 0.4); /* Sutil resplandor técnico */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 2;
  pointer-events: none;
}

.pulse-line {
  animation: scrollData 25s linear infinite;
}

@keyframes scrollData {
  from { transform: translateY(100vh); }
  to { transform: translateY(-100vh); }
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1000px; /* Aumentado ligeramente para ayudar al flujo */
  text-align: right;
}

.headline-container {
  position: relative;
  overflow: hidden;
  margin-bottom: 4rem;
  display: inline-block;
  text-align: right;
}

.title-reveal {
  font-size: clamp(1.25rem, 2.8vw, 1.98rem); /* Reducción final para 2 líneas */
  line-height: 1.2;
  font-weight: 900;
  color: var(--text-h);
  letter-spacing: -0.02em;
  
  /* Efecto Gradiente Técnico */
  background: linear-gradient(90deg, 
    #FFFFFF 0%, 
    #FFFFFF 48%, 
    rgba(255, 255, 255, 0.2) 52%, 
    rgba(255, 255, 255, 0.2) 100%);
  background-size: 200% 100%;
  background-position: 100% 0%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.scanline {
  position: absolute;
  top: 0;
  left: -15%;
  width: 20%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 194, 0.3), transparent);
  pointer-events: none;
  z-index: 1;
}

.manifesto-text {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  line-height: 1.8; /* Aumentado para legibilidad */
  color: var(--text-body);
  font-weight: 300;
  max-width: 800px;
  text-wrap: balance;
  margin-left: auto;
  letter-spacing: 0.01em; /* Ajuste fino técnico */
}

.word {
  display: inline-block;
}

.bracket {
  color: var(--color-mint);
  font-weight: 500;
}

.brand-name {
  color: #FFFFFF;
  font-weight: 300;
}

@media (max-width: 768px) {
  .storytelling-container {
    padding: 6rem 5%;
  }
}
</style>
