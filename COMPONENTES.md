# Ecosistema de Componentes - KodanWEB

Este documento detalla el inventario de componentes del proyecto. Los elementos en **negrita** representan el stack activo en producción.

## Core & Layout
- **[App.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/App.vue)**: Orquestador principal y punto de entrada de la SPA.

## Componentes de Interfaz (`src/components`)

### Narrativa y Estructura
- **[NarrativeReveal.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/NarrativeReveal.vue)**: Sección de manifiesto con interacción de cursor y flujo de datos.
- **[ParallaxSection.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/ParallaxSection.vue)**: Visualización técnica con profundidad 3D y botones reactivos.
- **[SequentialTraceability.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/SequentialTraceability.vue)**: Timeline de trazabilidad de ingeniería con efecto typewriter.
- **[VerticalProgress.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/VerticalProgress.vue)**: Indicador de scroll lateral de alta fidelidad.

### Visualización y Showcase
- **[CylinderShowCase.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/CylinderShowCase.vue)**: Hub de ingeniería 3D (Three.js) con anillo rotatorio.
- **[AtmosphericEntrance.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/AtmosphericEntrance.vue)**: Cabecera técnica de la sección de artefactos.
- **[BentoGridShowCase.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/BentoGridShowCase.vue)**: Galería bento optimizada para visualización de activos.
- **[ShowcaseCard.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/ShowcaseCard.vue)**: Unidad atómica de visualización dentro de la galería bento.
- [DesignShowCase.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/DesignShowCase.vue): Prototipo de scroll horizontal (Legado/Inactivo).

### Sistemas Globales y Branding
- **[PreLoader.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/PreLoader.vue)**: Pantalla de carga con lógica de escaneo y branding.
- **[kodanLogoDark.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/kodanLogoDark.vue)**: Identidad visual primaria para fondos oscuros.
- [kodanLogoLight.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/kodanLogoLight.vue): Variante clara institucional (Inactivo).
- **[ContactFooter.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/ContactFooter.vue)**: Cierre monumental con interacción de contacto.
- **[ContactSystem.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/ContactSystem.vue)**: Lógica y UI del modal de contacto profesional.
- **[NotificationSystem.vue](file:///c:/Proyectos%20Antigravity/kodanWEB/src/components/NotificationSystem.vue)**: Orquestador de notificaciones y feedback de usuario.

---
*Última actualización: 2026-05-14 - Refactorización semántica y unificación de Case.*
