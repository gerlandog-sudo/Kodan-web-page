# Kodan Software · Brand Spec
> Fecha de extracción: 2026-05-15
> Origen: Auditoría de código (src/components/kodanLogoDark.vue)
> Estado: Completo (basado en implementación actual)

## 🎯 Activos Críticos

### Logo (Símbolo Técnico)
- **Componente**: `src/components/kodanLogoDark.vue`
- **Geometría**: Brackets `<` `>` con barra diagonal `/`.
- **Comportamiento**: 
    - **Hover**: Marquesina con texto "kodan software".
    - **Breathe**: Animación sutil de los brackets.
- **Color de Trazo**: `#00FFC2` (Digital Mint).
- **Filtro**: Neon Glow (`feGaussianBlur` + `feFlood`).

### Identidad Visual
- **Fondo Principal**: Radial gradient `#0A0A0A` a `#050505`.
- **Acento**: Digital Mint `#00FFC2`.
- **Fuentes**: 
    - JetBrains Mono (Technical context)
    - Aptos Display / Inter (Corporate context)

## 🎨 Especificaciones Técnicas

### Colores (HEX)
- **Primary**: `#00FFC2`
- **Secondary**: `#635BFF`
- **Thermal**: `#8A00FF`
- **Surface**: `#161616`
- **Border**: `#333333`

### Tipografía
- **Body**: `Inter`, sans-serif.
- **Mono**: `JetBrains Mono`.

### Firma de Diseño
- **Efecto Mecha (Fuse)**: Botones con animación de chispa perimetral (`.fuse-button`).
- **Seda Digital**: Uso de `backdrop-filter: blur(20px)` en superficies `.glass-premium`.
- **Efecto de Escaneo**: Subtítulos con línea de escaneo dinámica.

## 🚫 Restricciones
- No utilizar sombras suaves (usar glows o glows térmicos).
- Evitar bordes redondeados agresivos (mantener estética "Mecha" de 4px o similar).
- Prohibido el uso de colores cálidos (Naranja/Rojo) excepto para estados de error.
