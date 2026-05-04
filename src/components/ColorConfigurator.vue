<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const activeColor = ref('#00FFC2');
const isContacting = ref(false);

const colors = [
  { name: 'Cyan', hex: '#00FFC2' },
  { name: 'Persimmon', hex: '#FF6B6B' },
  { name: 'Neon Green', hex: '#32FF7E' },
  { name: 'Electric Blue', hex: '#18DCFF' }
];

const updateColor = (hex: string) => {
  activeColor.value = hex;
  document.documentElement.style.setProperty('--color-mint', hex);
};

const toggleContact = () => {
  isContacting.value = !isContacting.value;
  
  // Animación Morphing del botón
  const btn = document.querySelector('.morph-btn');
  if (isContacting.value) {
    gsap.to(btn, {
      borderRadius: '12px',
      width: '200px',
      duration: 0.6,
      ease: 'elastic.out(1, 0.6)'
    });
  } else {
    gsap.to(btn, {
      borderRadius: '50px',
      width: '140px',
      duration: 0.4,
      ease: 'power2.inOut'
    });
  }
};
</script>

<template>
  <footer class="vibe-check-container">
    <div class="configurator glass-premium">
      <span class="config-label">Ajustar Vibra:</span>
      <div class="color-options">
        <button 
          v-for="color in colors" 
          :key="color.hex"
          class="color-dot"
          :style="{ backgroundColor: color.hex }"
          :class="{ active: activeColor === color.hex }"
          @click="updateColor(color.hex)"
          :title="color.name"
        ></button>
      </div>
    </div>

    <div class="contact-section">
      <button 
        class="morph-btn" 
        @click="toggleContact"
        :class="{ active: isContacting }"
      >
        <span v-if="!isContacting">Contacto</span>
        <span v-else>hola@kodan.dev</span>
      </button>
    </div>
  </footer>
</template>

<style scoped>
.vibe-check-container {
  padding: 4rem 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  background: #000;
  border-top: 1px solid rgba(255,255,255,0.05);
}

.configurator {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
}

.config-label {
  font-family: monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-body);
}

.color-options {
  display: flex;
  gap: 1rem;
}

.color-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.color-dot:hover {
  transform: scale(1.2);
}

.color-dot.active {
  border-color: #fff;
  transform: scale(1.1);
}

.contact-section {
  display: flex;
  justify-content: center;
}

.morph-btn {
  width: 140px;
  height: 50px;
  background: var(--color-mint);
  border: none;
  border-radius: 50px;
  color: #000;
  font-weight: 700;
  font-family: "Aptos Display", sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s ease;
  overflow: hidden;
  white-space: nowrap;
}

.morph-btn.active {
  background: #fff;
}
</style>
