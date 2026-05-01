<template>
  <section class="masterclass-section">
    <div class="header">
      <span class="label">Soluciones Estratégicas</span>
      <h2>Nuestras Masterclasses</h2>
      <p>Transformamos herramientas en activos intelectuales y operativos.</p>
    </div>

    <div class="masterclass-grid">
      <article class="masterclass-card timetracker">
        <div class="card-content">
          <span class="tag">Módulo 01</span>
          <h3>Masterclass: Eficiencia Operativa con TimeTracker</h3>
          <p>No es solo seguimiento de tiempo; es la optimización de la energía corporativa. Aprenda a identificar cuellos de botella y potenciar la productividad mediante análisis predictivo.</p>
          <div class="footer">
            <span class="duration">45 min de lectura estratégica</span>
            <button class="access-btn">Acceder al White Paper</button>
          </div>
        </div>
      </article>

      <article class="masterclass-card smartcook">
        <div class="card-content">
          <span class="tag">Módulo 02</span>
          <h3>Masterclass: Gastronomía Inteligente con SmartCook</h3>
          <p>La digitalización de la cocina como ventaja competitiva. Descubra cómo la inteligencia artificial redefine la gestión de recursos y la experiencia del cliente.</p>
          <div class="footer">
            <span class="duration">30 min de visión técnica</span>
            <button class="access-btn">Acceder al White Paper</button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.from(".masterclass-card", {
    scrollTrigger: {
      trigger: ".masterclass-grid",
      start: "top 70%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out"
  });
});
</script>

<style scoped>
.masterclass-section {
  padding: 8rem 2rem;
  background: var(--color-bg);
}

.header {
  text-align: center;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--color-primary);
  display: block;
  margin-bottom: 1rem;
}

.header h2 {
  font-family: var(--font-serif);
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
}

.masterclass-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.masterclass-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 32px;
  overflow: hidden;
  position: relative;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.masterclass-card:hover {
  transform: translateY(-10px);
  border-color: var(--color-primary);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
}

.card-content {
  padding: 3.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tag {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  background: var(--color-primary);
  padding: 4px 12px;
  border-radius: 4px;
  width: fit-content;
  margin-bottom: 2rem;
}

.masterclass-card h3 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.masterclass-card p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 3rem;
  flex-grow: 1;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border);
  padding-top: 2rem;
}

.duration {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.access-btn {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.access-btn:hover {
  background: var(--color-primary);
  color: white;
}

@media (max-width: 1024px) {
  .masterclass-grid { grid-template-columns: 1fr; }
  .header h2 { font-size: 2.5rem; }
}
</style>
