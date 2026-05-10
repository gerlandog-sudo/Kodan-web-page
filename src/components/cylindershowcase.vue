<script setup>
import { ref, shallowRef, onMounted, onUnmounted, computed } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { name: "SmartCook", category: "AI Culinary Intelligence", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200" },
  { name: "TimeTracker Mobile", category: "Mobile Architecture", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200" },
  { name: "TimeTracker", category: "Engineering Metrics", img: "/timetracker.png" },
  { name: "SimpleID", category: "Identity Protocol", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200" }
];

const sectionRef = ref(null);
const cylinderGroup = shallowRef(null);
const isReady = ref(false);

const textureLoader = new THREE.TextureLoader();
const projectTextures = projects.map(p => textureLoader.load(p.img));

const panelAngle = (Math.PI * 2) / projects.length;
const arcLength = panelAngle * 0.85;

const currentRotation = ref(0);
const activeIndex = computed(() => {
  let normalized = currentRotation.value % (Math.PI * 2);
  if (normalized < 0) normalized += Math.PI * 2;
  
  let closestIdx = 0;
  let minDiff = Infinity;
  
  projects.forEach((_, i) => {
    const worldAngle = (i * panelAngle + normalized) % (Math.PI * 2);
    const diff = Math.min(worldAngle, Math.PI * 2 - worldAngle);
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = i;
    }
  });
  
  return closestIdx;
});

let tickerCallback = () => {
  if (cylinderGroup.value && cylinderGroup.value.rotation) {
    if (!ScrollTrigger.isScrolling()) {
      cylinderGroup.value.rotation.y -= 0.002;
    }
    currentRotation.value = cylinderGroup.value.rotation.y;
  }
};

onMounted(() => {
  if (!sectionRef.value) return;
  isReady.value = true;

  gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top top",
      end: "+=2000",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        if (cylinderGroup.value && cylinderGroup.value.rotation) {
          cylinderGroup.value.rotation.y = -(self.progress * Math.PI * 2);
          currentRotation.value = cylinderGroup.value.rotation.y;
        }
      }
    }
  });

  gsap.ticker.add(tickerCallback);
});

onUnmounted(() => {
  gsap.ticker.remove(tickerCallback);
});
</script>

<template>
  <section id="cylinder-showcase-section" ref="sectionRef" class="tres-showcase">
    <div class="ui-layer">
      <h2 class="title">Hub de Ingeniería 3D</h2>
      <p class="subtitle">Arquitectura de Anillo Industrial TresJS</p>
    </div>

    <!-- Textos Nativos Flotantes Sincronizados -->
    <div class="html-text-overlay">
      <transition name="fade" mode="out-in">
        <div :key="activeIndex" class="active-project-info">
          <span class="project-category">{{ projects[activeIndex].category }}</span>
          <h3 class="project-name">{{ projects[activeIndex].name }}</h3>
        </div>
      </transition>
    </div>

    <div class="canvas-container">
      <TresCanvas v-if="isReady" clear-color="#020202" power-preference="high-performance">
        <TresPerspectiveCamera :position="[0, 0, 10]" :fov="45" />
        <TresAmbientLight :intensity="2.5" />
        <TresPointLight :position="[10, 10, 10]" :intensity="8" />
        <TresPointLight :position="[-10, -10, 10]" :intensity="4" color="#00ffc2" />

        <TresGroup :rotation="[0.45, 0, 0]" :scale="[0.85, 0.85, 0.85]">
          <TresGroup ref="cylinderGroup">
            <TresGroup v-for="(project, i) in projects" :key="i" :rotation="[0, i * panelAngle, 0]">
              <TresMesh>
                <TresCylinderGeometry :args="[4, 4, 5, 64, 1, true, -arcLength/2, arcLength]" />
                <TresMeshStandardMaterial 
                  :map="projectTextures[i]" 
                  :side="2" 
                  :transparent="true"
                  :opacity="0.9"
                  :roughness="0.3"
                  :metalness="0.7"
                />
              </TresMesh>
            </TresGroup>
          </TresGroup>
        </TresGroup>
      </TresCanvas>
    </div>
  </section>
</template>

<style scoped>
.tres-showcase {
  height: 100vh;
  width: 100%;
  position: relative;
  background: #000;
  overflow: hidden;
}

.ui-layer {
  position: absolute;
  top: 5vh;
  right: 5vw;
  z-index: 10;
  pointer-events: none;
  text-align: right;
}

.title {
  font-size: 3.15rem;
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin: 0;
}

.subtitle {
  font-family: monospace;
  color: var(--color-mint);
  letter-spacing: 4px;
  text-transform: uppercase;
  font-size: 0.9rem;
  opacity: 0.8;
}

.html-text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  pointer-events: none;
  text-align: center;
  width: 100%;
}

.active-project-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.project-category {
  font-family: monospace;
  color: var(--color-mint);
  font-size: 1rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  background: rgba(0,0,0,0.5);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

.project-name {
  font-size: 4.25rem;
  font-weight: 900;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin: 0;
  text-shadow: 0 10px 30px rgba(0,0,0,0.8);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.canvas-container {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.canvas-container :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
  outline: none;
}
</style>
