<template>
  <section class="storytelling-container" ref="sectionRef">
    <div class="content-wrapper">
      <div class="text-block" ref="textRef">
        <h2>Arquitectura que cobra vida</h2>
        <p>Desplazamos los límites de la interacción digital mediante experiencias tridimensionales inmersivas.</p>
      </div>

      <div class="visual-assets">
        <div class="card card-1" ref="card1">
          <div class="inner"><span>Estructura</span></div>
        </div>
        <div class="card card-2" ref="card2">
          <div class="inner"><span>Dinámica</span></div>
        </div>
        <div class="card card-3" ref="card3">
          <div class="inner"><span>Escala</span></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const textRef = ref(null);
const card1 = ref(null);
const card2 = ref(null);
const card3 = ref(null);

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      pin: false
    }
  });

  tl.from(textRef.value, {
    opacity: 0,
    y: 100,
    duration: 1
  })
  .from(card1.value, {
    x: -200,
    y: 100,
    rotationZ: -45,
    rotationY: -45,
    opacity: 0,
    duration: 2
  }, "-=0.5")
  .from(card2.value, {
    y: 200,
    rotationX: 45,
    opacity: 0,
    duration: 2
  }, "-=1.5")
  .from(card3.value, {
    x: 200,
    y: 100,
    rotationZ: 45,
    rotationY: 45,
    opacity: 0,
    duration: 2
  }, "-=1.5");
});
</script>

<style scoped>
.storytelling-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  background: var(--color-bg);
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
}

.text-block {
  text-align: center;
  z-index: 10;
}

.text-block h2 {
  font-family: var(--font-serif);
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: -2px;
  margin-bottom: 1rem;
}

.visual-assets {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  position: absolute;
  width: 280px;
  height: 380px;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.card .inner {
  background: var(--color-surface);
  width: 100%;
  height: 100%;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
}

.card-1 { transform: translateX(-150px) rotateY(-20deg); z-index: 1; }
.card-2 { transform: translateZ(100px); z-index: 2; }
.card-3 { transform: translateX(150px) rotateY(20deg); z-index: 1; }

@media (max-width: 768px) {
  .text-block h2 { font-size: 2.5rem; }
  .card { width: 200px; height: 280px; }
  .card-1 { transform: translateX(-80px) rotateY(-20deg); }
  .card-3 { transform: translateX(80px) rotateY(20deg); }
}
</style>
