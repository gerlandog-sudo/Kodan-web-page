<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const footerRef = ref(null);
const fuseBtn = ref(null);

const handleFuseClick = () => {
  const btn = fuseBtn.value;
  if (!btn || btn.classList.contains('is-firing')) return;

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
      window.dispatchEvent(new CustomEvent('open-contact'));
    }
  });
};

let observer;

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    window.dispatchEvent(new CustomEvent('footer-visibility', { detail: entry.isIntersecting }));
  });
  if (footerRef.value) {
    observer.observe(footerRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <footer ref="footerRef" class="contact-footer">
    <div class="glow-bg"></div>
    <div class="content">
      <div class="text-container">
        <h2 class="monumental-text">DISEÑA</h2>
        <h2 class="monumental-text accent">TU FUTURO.</h2>
      </div>
    </div>
    
    <div class="footer-interaction">
      <button 
        class="fuse-button rectangular-btn" 
        @click="handleFuseClick"
        ref="fuseBtn"
      >
        INICIAR CONTACTO
      </button>
    </div>

    <div class="elite-contact-grid">
      <div class="elite-item left">
        <span class="elite-label">SOCIAL</span>
        <a href="https://www.linkedin.com/company/pmaasglobal/" target="_blank" class="elite-value link">LINKEDIN</a>
      </div>
      <div class="elite-item center">
        <span class="elite-label">CONTACTO</span>
        <div class="contact-details">
          <a href="mailto:studio@kodan.software" class="elite-value link">studio@kodan.software</a>
          <a href="https://wa.me/541144488277" target="_blank" class="elite-value link">+54 11 4448 8277</a>
        </div>
      </div>
      <div class="elite-item right">
        <span class="elite-label">UBICACIÓN</span>
        <span class="elite-value">BUENOS AIRES, ARG</span>
      </div>
    </div>
    
    <div class="bottom-bar">
      <span>© 2026 kodan software. Todos los derechos reservados.</span>
      <div class="tech-stack">
        <span>VUE 3</span> // <span>TRESJS</span> // <span>GSAP</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.contact-footer {
  position: relative;
  height: 100vh;
  width: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: white;
}

.glow-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80vw;
  height: 80vw;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(0, 255, 194, 0.05) 0%, rgba(0,0,0,0) 70%);
  z-index: 0;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  width: 100%;
}

.text-container {
  text-align: center;
  pointer-events: none;
}

.monumental-text {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.9rem, 3.8vw, 3.4rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -2px;
  margin: 0;
  text-transform: uppercase;
  color: #ffffff;
}

.monumental-text.accent {
  color: transparent;
  -webkit-text-stroke: 2px rgba(255,255,255,0.1);
  background-image: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0) 100%);
  background-clip: text;
  -webkit-background-clip: text;
}

.elite-item.left {
  align-items: flex-start;
  text-align: left;
}

.elite-item.center {
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.footer-interaction {
  position: absolute;
  bottom: 12rem;
  z-index: 10;
}

.rectangular-btn {
  /* Reset de estilos para integrarse con fuse-button */
  background: rgba(0, 255, 194, 0.03) !important;
}

.elite-item.right {
  align-items: flex-end;
  text-align: right;
}

.rectangular-btn {
  padding: 1rem 3rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}

.rectangular-btn:hover {
  background: rgba(0, 255, 194, 0.05);
  border-color: rgba(0, 255, 194, 0.3);
  box-shadow: 0 10px 30px rgba(0, 255, 194, 0.15), inset 0 0 20px rgba(0, 255, 194, 0.1);
  transform: translateY(-2px);
}

.btn-text {
  font-family: monospace;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: var(--color-mint, #00ffc2);
  text-align: center;
}

.bottom-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem 4rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.05);
  font-family: monospace;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.3);
  z-index: 10;
}

.elite-contact-grid {
  position: absolute;
  bottom: 5rem;
  width: 100%;
  padding: 0 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  z-index: 10;
}

.elite-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.elite-label {
  font-family: monospace;
  font-size: 0.65rem;
  color: var(--color-mint);
  letter-spacing: 2px;
  opacity: 0.7;
}

.elite-value {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s ease;
}

.elite-value.link:hover {
  color: #fff;
}

.tech-stack span {
  color: rgba(255,255,255,0.5);
}

@media (max-width: 768px) {
  .monumental-text {
    font-size: 2.5rem;
    letter-spacing: -1px;
  }
  
  .rectangular-btn {
    padding: 0.8rem 2rem;
    font-size: 0.9rem;
  }
  
  .bottom-bar {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    text-align: center;
  }
  
  .elite-contact-grid {
    bottom: 7rem;
    grid-template-columns: 1fr;
    text-align: center;
    padding: 0 2rem;
    gap: 1.5rem;
  }
  
  .elite-item.left, .elite-item.center, .elite-item.right {
    align-items: center;
    text-align: center;
  }
}
</style>
