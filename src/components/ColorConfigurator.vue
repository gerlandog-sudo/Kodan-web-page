<template>
  <div v-if="isVisible" class="color-configurator">
    <div class="header">
      <h3>Configurador de Marca</h3>
      <button @click="isVisible = false">×</button>
    </div>
    
    <div class="scroll-area">
      <div v-for="(value, key) in colors" :key="key" class="color-group">
        <label :for="key">{{ formatLabel(key) }}</label>
        <div class="input-wrapper">
          <input 
            type="color" 
            :id="key" 
            v-model="colors[key]" 
            @input="updateColor(key)"
          />
          <input type="text" v-model="colors[key]" @input="updateColor(key)" />
        </div>
      </div>
    </div>

    <div class="actions">
      <button @click="exportCSS" class="export-btn">Exportar CSS</button>
      <button @click="resetColors" class="reset-btn">Reset</button>
    </div>
  </div>
  
  <button v-else @click="isVisible = true" class="toggle-btn">
    🎨 Paleta
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

const defaultColors = {
  '--color-primary': '#6366f1',
  '--color-secondary': '#ec4899',
  '--color-accent': '#8b5cf6',
  '--color-bg': '#0f172a',
  '--color-surface': '#1e293b',
  '--color-text': '#f8fafc',
  '--color-text-muted': '#94a3b8'
};

const colors = ref({ ...defaultColors });

onMounted(() => {
  // Cargar desde localStorage si existe
  const saved = localStorage.getItem('kodan-colors');
  if (saved) {
    colors.value = JSON.parse(saved);
    Object.keys(colors.value).forEach(key => {
      document.documentElement.style.setProperty(key, colors.value[key]);
    });
  }
});

const formatLabel = (key) => {
  return key.replace('--color-', '').replace('-', ' ').toUpperCase();
};

const updateColor = (key) => {
  document.documentElement.style.setProperty(key, colors.value[key]);
  localStorage.setItem('kodan-colors', JSON.stringify(colors.value));
};

const resetColors = () => {
  colors.value = { ...defaultColors };
  Object.keys(colors.value).forEach(key => {
    document.documentElement.style.setProperty(key, colors.value[key]);
  });
  localStorage.removeItem('kodan-colors');
};

const exportCSS = () => {
  let css = ':root {\n';
  Object.keys(colors.value).forEach(key => {
    css += `  ${key}: ${colors.value[key]};\n`;
  });
  css += '}';
  
  navigator.clipboard.writeText(css);
  alert('CSS copiado al portapapeles. Pégalo en tokens.css para persistir los cambios.');
};
</script>

<style scoped>
.color-configurator {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: sans-serif;
}

.header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header h3 { margin: 0; font-size: 1rem; }
.header button { background: none; border: none; color: white; cursor: pointer; font-size: 1.5rem; }

.scroll-area {
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.color-group {
  margin-bottom: 1rem;
}

.color-group label {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
}

input[type="color"] {
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: none;
}

input[type="text"] {
  flex: 1;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.actions {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.export-btn, .reset-btn {
  flex: 1;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.export-btn { background: #6366f1; color: white; }
.reset-btn { background: #334155; color: white; }

.toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 0.75rem 1.5rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 9999;
}
</style>
