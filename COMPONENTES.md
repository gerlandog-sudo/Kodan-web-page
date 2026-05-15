# Ecosistema de Componentes - KodanWEB (v1.1.000)

Inventario técnico bajo arquitectura de **Refactorización Semántica**. El sistema prioriza el comportamiento agnóstico al contenido y la resiliencia operativa.

## Core & Estructura Global

| Nombre | Detalle Técnico / Comportamental |
| :--- | :--- |
| **App.vue** | Orquestador de ciclo de vida global. Gestiona la secuenciación narrativa y la telemetría de scroll mediante GSAP/ScrollTrigger. |
| **PreLoader.vue** | Inicialización de activos y simulación de arranque (System Boot). Gestiona el estado de entrada a la aplicación. |
| **VerticalProgress.vue** | Componente de telemetría lateral. Muestra el progreso relativo del usuario en el eje Y. |

## Capa de Narrativa y Validación

| Nombre | Detalle Técnico / Comportamental |
| :--- | :--- |
| **NarrativeReveal.vue** | Comportamiento de revelación progresiva. Sincroniza el manifiesto de marca con el scroll del usuario. |
| **ParallaxSection.vue** | Enfoque de profundidad técnica. Utiliza capas de parallax para validación visual de rigor de ingeniería. |
| **SequentialTraceability.vue** | Comportamiento de trazabilidad lineal. Renderizado secuencial de hitos con efectos de entrada tipo typewriter. |

## Capa de Visualización (Real-Time Engine)

| Nombre | Detalle Técnico / Comportamental |
| :--- | :--- |
| **CylinderShowCase.vue** | Hub 3D orbital. Implementa un motor Three.js para la visualización inmersiva de proyectos core. |
| **AtmosphericEntrance.vue** | Transición de atmósfera. Genera un puente visual y técnico hacia el área de artefactos. |
| **BentoGridShowCase.vue** | Motor de visualización dinámica. Consulta la API en tiempo real y gestiona un sistema de fallback resiliente. |
| **ShowcaseCard.vue** | Unidad atómica de representación visual. Maneja el escalado y carga de assets individuales. |
| DesignShowCase.vue | Slider horizontal legado. Comportamiento de desplazamiento lateral (Inactivo). |

## Sistemas de Identidad e Interacción

| Nombre | Detalle Técnico / Comportamental |
| :--- | :--- |
| **kodanLogoDark.vue** | Núcleo de identidad visual persistente optimizado para fondos de alto contraste. |
| kodanLogoLight.vue | Variante de identidad visual clara. Preservado para contextos institucionales (Inactivo). |
| **ContactFooter.vue** | Ancla de interacción final. Define el punto de cierre monumental de la experiencia de usuario. |
| **ContactSystem.vue** | Procesador de interacción. Maneja el flujo de entrada de datos y validación de formularios. |
| **NotificationSystem.vue** | Puente de feedback (FeedbackBridge). Orquesta las notificaciones de estado del sistema. |

## Capa de Backend API

| Nombre | Detalle Técnico / Comportamental |
| :--- | :--- |
| **api/index.php** | Orquestador de backend. Realiza escaneo de disco en tiempo real para el descubrimiento de activos. |
| **api/.htaccess** | Controlador de enrutamiento. Asegura la resolución de endpoints de API en entornos Apache/Nginx. |

---
*Documentación técnica consolidada - Milestone v1.1.000.*
