<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isVisible = ref(false);
const isOpen = ref(false);
const currentStep = ref(0);
const isFooterVisible = ref(false);

const form = ref({
  name: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: ''
});

const steps = [
  { id: 'name', question: '¿Cómo deberíamos llamarte?', placeholder: 'Tu nombre...', field: 'name' },
  { id: 'email', question: '¿A qué email te contactamos?', placeholder: 'nombre@empresa.com', field: 'email' },
  { id: 'projectType', question: '¿Qué tipo de arquitectura necesitas?', placeholder: 'Web, Mobile, AI Core...', field: 'projectType' },
  { id: 'budget', question: '¿Presupuesto estimado?', placeholder: 'Opcional...', field: 'budget' },
  { id: 'timeline', question: '¿Para cuándo lo necesitas?', placeholder: 'Fecha o urgencia...', field: 'timeline' }
];

onMounted(() => {
  // Aparecer cuando el logo se ancla (600px según App.vue)
  ScrollTrigger.create({
    trigger: "body",
    start: "500px top",
    onEnter: () => { isVisible.value = true; },
    onLeaveBack: () => { isVisible.value = false; }
  });

  window.addEventListener('footer-visibility', (e) => {
    isFooterVisible.value = (e as CustomEvent).detail;
  });

  window.addEventListener('open-contact', openContact);
});

onUnmounted(() => {
  window.removeEventListener('open-contact', openContact);
});

const openContact = () => {
  isOpen.value = true;
  currentStep.value = 0;
  gsap.from(".modal-glass", {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out"
  });
};

const closeContact = () => {
  gsap.to(".modal-glass", {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power3.in",
    onComplete: () => {
      isOpen.value = false;
    }
  });
};

const handleNextClick = (e: MouseEvent) => {
  const btn = e.currentTarget as HTMLElement;
  if (btn.classList.contains('is-firing')) return;

  btn.classList.remove('is-consumed');
  btn.classList.add('is-firing');
  gsap.set(btn, { '--fuse-angle': '0deg' });
  
  gsap.to(btn, {
    '--fuse-angle': '360deg',
    duration: 1.1,
    ease: "power2.inOut",
    onComplete: () => {
      btn.classList.remove('is-firing');
      btn.classList.add('is-consumed');
      
      setTimeout(() => {
        nextStep();
        // NOTA: No reseteamos aquí porque al cambiar de step el componente se actualiza o el botón cambia.
      }, 400);
    }
  });
};

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    gsap.to(".step-content", {
      x: -20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        currentStep.value++;
        gsap.fromTo(".step-content", { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
      }
    });
  } else {
    sendWhatsApp();
  }
};

const sendWhatsApp = () => {
  const phone = "541144488277";
  const message = `¡Hola kodan! Me contacto desde la web.%0A%0A` +
    `*Nombre:* ${form.value.name || 'No especificado'}%0A` +
    `*Email:* ${form.value.email || 'No especificado'}%0A` +
    `*Proyecto:* ${form.value.projectType || 'No especificado'}%0A` +
    `*Presupuesto:* ${form.value.budget || 'No especificado'}%0A` +
    `*Timeline:* ${form.value.timeline || 'No especificado'}`;
  
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  closeContact();
};

const progress = computed(() => ((currentStep.value + 1) / steps.length) * 100);
</script>

<template>
  <div class="contact-system" :class="{ 'is-active': isVisible }">
    <!-- Floating Trigger -->
    <button class="orb-trigger" @click="openContact" v-if="!isOpen && !isFooterVisible">
      <div class="orb-core"></div>
      <div class="orb-pulse pulse-1"></div>
      <div class="orb-pulse pulse-2"></div>
      <span class="orb-label">CONTACTO</span>
    </button>

    <!-- Chat-Step Modal -->
    <Teleport to="body">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeContact">
        <div class="modal-glass">
          <button class="close-btn" @click="closeContact">✕</button>
          
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>

          <div class="step-content">
            <span class="step-number">PASO 0{{ currentStep + 1 }}</span>
            <h2 class="step-question">{{ steps[currentStep].question }}</h2>
            
            <input 
              v-model="form[steps[currentStep].field as keyof typeof form]"
              :placeholder="steps[currentStep].placeholder"
              class="step-input"
              @keyup.enter="nextStep"
              autofocus
            />

            <div class="step-footer">
              <span class="hint">Presiona ENTER para continuar</span>
              <button 
                class="next-btn fuse-button" 
                @click="handleNextClick"
              >
                {{ currentStep === steps.length - 1 ? 'FINALIZAR' : 'SIGUIENTE' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.contact-system {
  position: fixed;
  bottom: 2.5rem;
  left: 2.5rem; /* Movido a la izquierda */
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.contact-system.is-active {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

/* Floating Orb Styles */
.orb-trigger {
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orb-core {
  width: 14px; /* Un poco más grande */
  height: 14px;
  background: var(--color-mint);
  border-radius: 50%;
  box-shadow: 0 0 25px var(--color-mint);
  z-index: 2;
}

.orb-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--color-mint);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.pulse-1 {
  animation: pulse 3s infinite;
}

.pulse-2 {
  animation: pulse 3s infinite 1.5s;
}

.orb-label {
  position: absolute;
  left: 100%; /* Ahora a la derecha del orbe */
  margin-left: 1.5rem;
  font-family: monospace;
  font-size: 0.7rem;
  letter-spacing: 3px;
  color: var(--color-mint);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.orb-trigger:hover .orb-label {
  opacity: 0.9;
  transform: translateX(0);
}

@keyframes pulse {
  0% { transform: scale(0.6); opacity: 0; }
  30% { opacity: 0.8; } /* Pico de visibilidad más alto */
  100% { transform: scale(2.2); opacity: 0; } /* Expansión mayor */
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4); /* Fondo más ligero para no tapar todo si está en una esquina */
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-end; /* Abajo */
  justify-content: flex-start; /* Izquierda */
  padding: 25px; /* El gap solicitado */
  z-index: 2100;
}

.modal-glass {
  background: #0a0a0a;
  border: 1px solid rgba(0, 255, 194, 0.2);
  padding: 2.5rem;
  width: 100%;
  max-width: 450px; /* Un poco más compacto para la esquina */
  position: relative;
  box-shadow: 0 0 40px rgba(0, 255, 194, 0.1);
  text-align: left; /* Alineación a la izquierda dentro del form */
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.3);
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,0.05);
}

.progress-fill {
  height: 100%;
  background: var(--color-mint);
  transition: width 0.4s ease;
}

.step-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 1rem;
}

.step-number {
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--color-mint);
  letter-spacing: 3px;
  opacity: 0.6;
}

.step-question {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 300;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 1rem;
  text-align: left;
}

.step-input {
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1.2rem;
  font-size: 1.1rem;
  color: var(--color-mint);
  outline: none;
  border-radius: 4px;
  text-align: left;
  transition: all 0.3s ease;
}

.step-input:focus {
  border-color: var(--color-mint);
  background: rgba(255,255,255,0.05);
  box-shadow: 0 0 15px rgba(0, 255, 194, 0.1);
}

.step-footer {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.next-btn {
  width: 100%;
  margin-top: 1rem;
}

.next-btn:hover {
  transform: translateY(-2px);
}

.hint {
  font-family: monospace;
  font-size: 0.6rem;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 480px) {
  .modal-glass { padding: 2rem 1.5rem; }
  .step-question { font-size: 1.3rem; }
}
</style>
