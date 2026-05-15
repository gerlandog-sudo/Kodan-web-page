<script setup>
import { ref, shallowRef, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';

const projects = [
  { 
    name: "kodanHUB", 
    category: "Orquestación de APIs", 
    description: "Hub agnóstico para la gestión centralizada de modelos de IA, control de tokens y conectividad empresarial de alta disponibilidad.",
    img: "/kodanhub.png" 
  },
  { 
    name: "SmartCook", 
    category: "Inteligencia Culinaria IA", 
    description: "Visión Artificial Multimodal: De la heladera o la alacena al plato perfecto. Análisis inteligente de capturas múltiples.",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    name: "TimeTracker Mobile", 
    category: "Arquitectura Móvil", 
    description: "Monitoreo de KPIs críticos y validación de desvíos operativos en interfaces de alta fidelidad.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
  },
  { 
    name: "TimeTracker", 
    category: "Métricas de Ingeniería", 
    description: "Trazabilidad de alta precisión para ciclos de desarrollo complejos y ecosistemas reactivos.",
    img: "/timetracker.png"
  },
  { 
    name: "SimpleID", 
    category: "Protocolo de Identidad", 
    description: "Soberanía digital mediante protocolos de identidad minimalistas y descentralizados.",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200" 
  }
];

const sectionRef = ref(null);
const cylinderGroup = shallowRef(null);
const isReady = ref(false);

const textureLoader = new THREE.TextureLoader();
const projectTextures = projects.map(p => textureLoader.load(p.img));

const panelAngle = (Math.PI * 2) / projects.length;
const arcLength = panelAngle * 0.85;

const createTextTexture = (project) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1024;
  canvas.height = 512;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(0.2, 'rgba(0, 0, 0, 0.4)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.6)');
  grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.4)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.font = '700 30px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(0, 255, 194, 0.9)';
  ctx.textAlign = 'center';
  ctx.fillText(project.category.toUpperCase(), canvas.width / 2, 60);
  
  ctx.font = '900 85px Inter, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 5;
  ctx.fillText(project.name.toUpperCase(), canvas.width / 2, 160);
  
  ctx.font = '300 32px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  const words = project.description.split(' ');
  let line = '';
  let y = 240;
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    if (metrics.width > 850 && n > 0) {
      ctx.fillText(line, canvas.width / 2, y);
      line = words[n] + ' ';
      y += 45;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, canvas.width / 2, y);
  
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.font = '700 30px "JetBrains Mono", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('EXPLORAR ARQUITECTURA', canvas.width / 2, 440);
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(canvas.width / 2 - 220, 400, 440, 60);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
};

const projectLabelTextures = projects.map(p => createTextTexture(p));

let tickerCallback = () => {
  if (cylinderGroup.value && cylinderGroup.value.rotation) {
    cylinderGroup.value.rotation.y -= 0.005; // Rotación constante
  }
};

onMounted(() => {
  if (!sectionRef.value) return;
  isReady.value = true;
  gsap.ticker.add(tickerCallback);
});

onUnmounted(() => {
  gsap.ticker.remove(tickerCallback);
});
</script>

<template>
  <section id="cylinder-showcase-section" ref="sectionRef" class="tres-showcase">
    <div class="ui-layer">
      <h2 class="title">Casos de Éxito</h2>
      <p class="subtitle">Core Assets — Despliegue de soluciones robustas y microservicios visuales.</p>
    </div>

    <div class="canvas-container">
      <TresCanvas v-if="isReady" clear-color="#020202" power-preference="high-performance">
        <TresPerspectiveCamera :position="[0, 0, 10]" :fov="45" />
        <TresAmbientLight :intensity="2.5" />
        <TresPointLight :position="[10, 10, 10]" :intensity="8" />
        <TresPointLight :position="[-10, -10, 10]" :intensity="4" color="#00ffc2" />

        <TresGroup :rotation="[0.45, 0, 0]" :scale="[1.3, 0.85, 0.65]" :position="[0, -0.2, 0]">
          <TresGroup ref="cylinderGroup">
            <TresGroup v-for="(project, i) in projects" :key="i" :rotation="[0, i * panelAngle, 0]">
              <TresMesh>
                <TresCylinderGeometry :args="[4, 4, 5, 64, 1, true, -arcLength/2, arcLength]" />
                <TresMeshStandardMaterial 
                  :map="projectTextures[i]" 
                  :side="2" 
                  :transparent="true"
                  :opacity="0.8"
                  :roughness="0.5"
                />
              </TresMesh>

              <TresMesh :position="[0, 0, 0.08]">
                <TresCylinderGeometry :args="[4.15, 4.15, 2.5, 64, 1, true, -arcLength/2.5, arcLength/1.25]" />
                <TresMeshStandardMaterial 
                  :map="projectLabelTextures[i]" 
                  :transparent="true" 
                  :side="2"
                  :opacity="1"
                  :emissive="[0, 1, 0.7]"
                  :emissiveIntensity="0.1"
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
  top: 8vh;
  right: 5vw;
  z-index: 10;
  pointer-events: none;
  text-align: right;
}

.title {
  font-size: clamp(2rem, 5vw, 3.15rem);
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin: 0;
}

.subtitle {
  font-family: var(--font-mono);
  color: var(--color-mint);
  letter-spacing: 4px;
  text-transform: uppercase;
  font-size: 0.77rem;
  opacity: 0.8;
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
