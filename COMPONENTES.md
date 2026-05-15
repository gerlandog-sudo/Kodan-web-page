# Ecosistema de Componentes - KodanWEB (v1.1.000)

Inventario técnico de componentes basado en comportamiento. Los elementos en **negrita** representan el stack activo en producción.

## Core & Backend
| Componente | Descripción / Comportamiento |
| :--- | :--- |
| **App.vue** | Orquestador principal y punto de entrada de la SPA. Controla la jerarquía de secciones. |
| **api/index.php** | Endpoint maestro con lógica de scanner de disco en tiempo real para activos. |
| **api/.htaccess** | Gateway de enrutamiento para asegurar la integridad de las peticiones al backend. |

## Interfaz de Usuario (`src/components`)

### Narrativa y Estructura
| Componente | Descripción / Comportamiento |
| :--- | :--- |
| **NarrativeReveal.vue** | Sección de manifiesto con interacción de cursor y flujo de datos secuencial. |
| **ParallaxSection.vue** | Capa de visualización técnica con profundidad 3D y elementos reactivos. |
| **SequentialTraceability.vue** | Timeline de ingeniería con efecto typewriter y trazabilidad de eventos. |
| **VerticalProgress.vue** | Indicador de navegación lateral de alta fidelidad (Scroll Progress). |

### Visualización y Showcase (Bento Engine)
| Componente | Descripción / Comportamiento |
| :--- | :--- |
| **CylinderShowCase.vue** | Hub de ingeniería 3D (Three.js) con anillo rotatorio y pinning optimizado. |
| **AtmosphericEntrance.vue** | Cabecera técnica inmersiva para la sección de artefactos. |
| **BentoGridShowCase.vue** | Galería dinámica con selección aleatoria y scanner de disco (Real-Time). |
| **ShowcaseCard.vue** | Unidad atómica de visualización reactiva para la grilla Bento. |
| [DesignShowcase.vue](file:///c:/Proyectos_Antigravity/kodanWEB/src/components/DesignShowcase.vue) | Galería de activos estáticos y recursos visuales (Legado/Inactivo). |

### Sistemas Globales y Branding
| Componente | Descripción / Comportamiento |
| :--- | :--- |
| **PreLoader.vue** | Pantalla de carga con lógica de escaneo de sistema y branding. |
| **kodanLogoDark.vue** | Identidad visual primaria optimizada para entornos oscuros. |
| [kodanLogoLight.vue](file:///c:/Proyectos_Antigravity/kodanWEB/src/components/kodanLogoLight.vue) | Variante clara institucional (Inactivo). |
| **ContactFooter.vue** | Cierre monumental con interacción de contacto y branding de salida. |
| **ContactSystem.vue** | Lógica y UI del modal de contacto y validación de datos. |
| **NotificationSystem.vue** | Orquestador central de notificaciones y feedback de usuario. |

---
*Última actualización: 2026-05-15 - Consolidación de Milestone 1.1.000 con soporte Real-Time Backend.*
