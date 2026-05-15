<template>
  <section class="parallax-wrapper" ref="wrapper">
    <!-- CAPA 0: FONDO (MICRO-ARQUITECTURA) -->
    <div class="layer-bg" ref="bgLayer">
      <div class="bg-overlay"></div>
      <img src="@/assets/parallax_bg.png" alt="Micro-Architecture" class="parallax-img">
    </div>

    <!-- CAPA 1: DATOS FLOTANTES -->
    <div class="layer-content" ref="contentLayer">
      <div class="floating-grid">
        <!-- Bloque Lateral Izquierdo: Modelos -->
        <div class="data-card left" ref="cardLeft">
          <span class="tech-tag highlight-mint">Modelos y Arquitectura</span>
          <p>Microservicios desacoplados y Clean Architecture como estándar. Diseñamos sistemas preparados para la evolución constante.</p>
        </div>

        <!-- Bloque Central: Headline -->
        <div class="headline-container" ref="headline">
          <h2 class="main-title">Ingeniería de vanguardia, <span class="highlight">ejecutada con rigor.</span></h2>
        </div>

        <!-- Bloque Lateral Derecho: Stack -->
        <div class="data-card right" ref="cardRight">
          <span class="tech-tag highlight-mint">Stack & Performance</span>
          <p>Dominio en ecosistemas Reactivos y Cloud-Native. Optimizamos cada línea de código para lograr latencias mínimas y escalabilidad infinita.</p>
        </div>
      </div>
    </div>

    <!-- CAPA 2: FOOTER DE SECCIÓN (INVITACIÓN) -->
    <div class="section-footer" ref="footerLayer">
      <div class="footer-content max-w-4xl mx-auto">
        <p class="mission-critical-text">
          <span class="highlight-mint">Sistemas de Misión Crítica:</span> Desplegamos soluciones agnósticas al stack, centradas en la resiliencia y la inmutabilidad del código. Desde la modernización de <span class="highlight-mint">Legacy Systems</span> hasta la creación de productos <span class="highlight-mint">Cloud-Native</span>, aplicamos patrones de diseño avanzados para garantizar activos digitales de alta fidelidad y mantenimiento nulo.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wrapper = ref(null);
const bgLayer = ref(null);
const contentLayer = ref(null);
const headline = ref(null);
const cardLeft = ref(null);
const cardRight = ref(null);
const footerLayer = ref(null);
const fuseBtn = ref(null);

const handleFuseClick = () => {
  const btn = fuseBtn.value;
  if (!btn || btn.classList.contains('is-firing')) return;

  // Reset para permitir re-disparo si ya estaba consumido
  btn.classList.remove('is-consumed');
  btn.classList.add('is-firing');
  gsap.set(btn, { '--fuse-angle': '0deg' });
  
  // Animación de la "mecha" recorriendo el borde
  gsap.to(btn, {
    '--fuse-angle': '360deg',
    duration: 1.5,
    ease: "power2.inOut",
    onComplete: () => {
      btn.classList.remove('is-firing');
      btn.classList.add('is-consumed');
    }
  });
};

onMounted(() => {
  // Movimiento de Fondo (Aumentado para mayor profundidad)
  gsap.to(bgLayer.value, {
    scrollTrigger: {
      trigger: wrapper.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    },
    y: "35%",
    scale: 1.2,
    ease: "none"
  });

  // Movimiento de Contenido (Inversión fuerte para efecto 3D)
  gsap.to(contentLayer.value, {
    scrollTrigger: {
      trigger: wrapper.value,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2
    },
    y: "-300px",
    ease: "power1.inOut"
  });

  // Animaciones de los bloques laterales (Sutil inclinación/float)
  const tlCards = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper.value,
      start: "top center",
      end: "bottom center",
      scrub: 2
    }
  });

  tlCards.from(cardLeft.value, { x: -50, opacity: 0.5, rotateY: 10 }, 0);
  tlCards.from(cardRight.value, { x: 50, opacity: 0.5, rotateY: -10 }, 0);

  // Revelado del Footer
  gsap.from(footerLayer.value, {
    scrollTrigger: {
      trigger: footerLayer.value,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "expo.out"
  });
});
</script>

<style scoped>
.parallax-wrapper {
  position: relative;
  width: 100%;
  min-height: 150vh; /* Aumentado para mayor recorrido parallax */
  overflow: hidden;
  background: #050505;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15vh 5vw;
  perspective: 2000px; /* Profundidad global */
}

/* CAPA 0: BACKGROUND */
.layer-bg {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: 1;
}

.parallax-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.3) contrast(1.1);
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    #050505 0%, 
    transparent 20%, 
    transparent 80%, 
    #050505 100%
  );
  z-index: 2;
}

/* CAPA 1: CONTENT */
.layer-content {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.floating-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 2rem;
  align-items: center;
}

/* Headline Central */
.headline-container {
  text-align: center;
  perspective: 1000px;
}

.main-title {
  font-size: clamp(1.9rem, 3.8vw, 3.4rem); /* Reducido 10% extra */
  font-weight: 900;
  line-height: 1.1;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.highlight {
  color: var(--color-mint);
  display: block;
}

/* Data Cards Laterales */
.data-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.2rem; /* Aumentado 10% */
  border-radius: 4px; 
  transition: border-color 0.4s ease;
}

.data-card:hover {
  border-color: var(--color-mint);
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: 0.77rem; /* Aumentado 10% */
  color: var(--color-mint);
  letter-spacing: 2px;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.data-card h3 {
  font-size: 1.32rem; /* Aumentado 10% */
  color: #fff;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.data-card p {
  font-size: 1.05rem; /* Aumentado ~10% */
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

/* CAPA 2: FOOTER */
.section-footer {
  position: relative;
  z-index: 4;
  margin-top: 15vh;
  text-align: center;
}

.footer-text {
  font-family: var(--font-mono);
  color: var(--color-mint);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.mission-critical-text {
  font-family: var(--font-main);
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  line-height: 1.8;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.highlight-mint {
  color: var(--color-mint);
  font-weight: 700;
}

.fuse-button {
  margin-top: 2rem;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .floating-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .headline-container {
    order: -1;
  }

  .data-card {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .parallax-wrapper {
    padding: 5vh 5vw;
  }
}
</style>
