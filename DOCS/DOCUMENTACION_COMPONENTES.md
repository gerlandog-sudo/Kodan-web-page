# Documentación de Componentes KODAN

Este documento enumera los componentes disponibles en el directorio `src/components`, su función principal y su caso de uso para facilitar su reutilización en el desarrollo.

## 1. BentoGrid.vue
- **Descripción**: Cuadrícula de servicios con diseño "Bento". Implementa animaciones de entrada en espiral y efectos de brillo interactivos (cyan glow) al hacer hover.
- **Reutilización**: Usar para enumerar características, servicios o pilares tecnológicos de forma estructurada.

## 2. ContactFooter.vue
- **Descripción**: Pie de página de alto impacto. Cuenta con un botón magnético que reacciona al movimiento del ratón y emite un evento global (`open-contact`) para desplegar el formulario.
- **Reutilización**: Colocar al final de vistas principales para forzar la conversión o inicio de contacto.

## 3. ContactSystem.vue
- **Descripción**: Modal interactivo flotante para captación de leads. Funciona mediante un formulario paso a paso (nombre, email, presupuesto, etc.) y redirige los datos estructurados a WhatsApp.
- **Reutilización**: Mantener global (ej. en `App.vue`) para que el usuario pueda interactuar desde cualquier parte del sitio.

## 4. DesignShowcase.vue
- **Descripción**: Carrusel de scroll horizontal vinculado al scroll vertical (GSAP ScrollTrigger). Muestra tarjetas de proyectos grandes con animaciones parallax.
- **Reutilización**: Emplear para presentar portafolios, casos de estudio o productos destacados.

## 5. HeroSection.vue
- **Descripción**: Encabezado minimalista. Carga el logo de la plataforma y un título con una animación sutil de aparición (fade-in).
- **Reutilización**: Usar como cabecera introductoria rápida para páginas secundarias o de contenido estático.

## 6. KodanLogo.vue
- **Descripción**: Logotipo principal en formato SVG interactivo. Incluye efectos de resplandor de neón, rotación basada en el scroll y un efecto marquesina de texto al hacer hover.
- **Reutilización**: Elemento de identidad visual principal. Usar sobre fondos oscuros absolutos.

## 7. MasterclassSection.vue
- **Descripción**: Línea de tiempo vertical ("Línea de vida platino") con revelación de texto estilo máquina de escribir en terminal.
- **Reutilización**: Ideal para mostrar historias de la empresa, evolución temporal o un listado cronológico de hitos.

## 8. NotificationSystem.vue
- **Descripción**: Sistema global de notificaciones en pantalla (Toasts). Conectado a un Store (Pinia/Vuex), muestra alertas de éxito, error o advertencia con barras de progreso de tiempo.
- **Reutilización**: Invocar a través de su Store para emitir respuestas del sistema al usuario (ej. formulario enviado, error de red).

## 9. ParallaxSection.vue
- **Descripción**: Sección de profundidad 3D inmersiva. Mueve capas de fondo y tarjetas de datos a diferentes velocidades según el scroll.
- **Reutilización**: Usar como transición visual fuerte entre dos secciones densas de información.

## 10. PreLoader.vue
- **Descripción**: Pantalla de carga inicial (Overlay). Bloquea la vista con el logotipo animado y una barra de progreso de simulación hasta que los recursos estén listos.
- **Reutilización**: Renderizar primero en el montaje de la aplicación para ocultar saltos visuales durante la carga de componentes 3D o imágenes pesadas.

## 11. StorytellingSection.vue
- **Descripción**: Sección de texto de lectura inmersiva. Presenta un fondo reactivo al ratón, texto tipo terminal cayendo y revelación de párrafos palabra por palabra.
- **Reutilización**: Utilizar para exponer la filosofía, el manifiesto o la visión central de la plataforma.

## 12. VerticalProgress.vue
- **Descripción**: Indicador de lectura lateral. Barra fija a la derecha de la pantalla que muestra el porcentaje (0-100%) de desplazamiento vertical realizado en la página.
- **Reutilización**: Colocar en vistas largas o landings para indicar al usuario cuánto contenido resta.

## 13. cylindershowcase.vue
- **Descripción**: Entorno WebGL 3D renderizado con TresJS. Construye un anillo cilíndrico formado por imágenes de proyectos que el usuario rota al hacer scroll.
- **Reutilización**: Desplegar como elemento experimental o "Wow Factor" en reemplazo del showcase tradicional. Requiere alto rendimiento gráfico.

## 14. kodanLogoDark.vue
- **Descripción**: Variante del logotipo interactivo adaptada y recalibrada. Utiliza filtros e intensidades diferentes en el resplandor para contrastar adecuadamente.
- **Reutilización**: Utilizar exclusivamente en interfaces de carga o sobre contenedores donde el logotipo principal no logre buen contraste.
