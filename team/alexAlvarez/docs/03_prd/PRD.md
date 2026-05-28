# Product Requirements Document (PRD) — SIGESA / AcredIA

> **Propósito del PRD**: Este documento actúa como el índice maestro y resumen ejecutivo del producto SIGESA, definiendo las Épicas principales y enlazando conceptualmente a los otros documentos de la suite PRD. Basado en el BRD, MRD y glosario de dominio.

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA / AcredIA — Sistema de gestión y seguimiento de acreditaciones (UMSS) |
| Grupo | AcredIA |
| Versión | v2.0 (Nivel Excelente) |
| Fecha | 14/05/2026 |
| Product Manager / Autor | Alex Álvarez |
| Revisores | Docente + Tech Lead + QA |
| Estado | Aprobado |
| BRD de referencia | `team/alexAlvarez/docs/01_brd/BRD.md` |
| MRD de referencia | `team/alexAlvarez/docs/02_mrd/MRD.md` |
| Overview / definición producto | `team/alexAlvarez/docs/00_overview/definicion_producto.md` |
| Glosario de dominio | `team/alexAlvarez/docs/context/03_domain_glossary.md` |
| Fase Spec Kit cubierta | Specify ✅ / Plan ✅ / Tasks ✅ / Implement ⬜ |
| Prompts utilizados | [PC-SIG-03] Generador de PRD Multipropósito |

## 1. Resumen ejecutivo del producto

SIGESA es la plataforma institucional que digitaliza el ciclo completo de acreditación de la DUEA en la UMSS, gestionando **Procesos**, **Fases**, **Dimensiones**, **Criterios**, **Indicadores** y **Evidencias** con trazabilidad inmutable y auditada. Resuelve la dispersión documental actual (Excel, WhatsApp, USBs) mediante una fuente única de verdad, habilitando búsquedas en ≤ 2 minutos, dashboard mobile para [CC] y auditoría potente para [TD].

El producto entrega valor a cuatro segmentos internos/externos: **[CC]** (gestión operativa), **[TD]** (validación técnica), **[JD]** (gobierno y visibilidad ejecutiva) y **[P]** (transparencia). Garantiza cumplimiento CEUB/ARCU-SUR con Máquina de Estados estricta y política append-only en **Evidencias**.

### 1.1 Mapa de actores y ciclo de fases

Diagramas canónicos en [`../07_diagramas/`](../07_diagramas/) y FSD [`../04_fsd/`](../04_fsd/FSD.md).

| Diagrama | Archivo |
|----------|---------|
| Actores ↔ dominio | Ver [`er-006-diagrama.mmd`](../07_diagramas/er-006-diagrama.mmd) |
| Subsanación (secuencia) | [`seq-001-01-secuencia.mmd`](../07_diagramas/seq-001-01-secuencia.mmd) |
| Estados del Indicador | [`state-001-01-estado.mmd`](../07_diagramas/state-001-01-estado.mmd) · [`user_stories.md`](user_stories.md) |
| Cierre de Fase | [`state-003-03-estado.mmd`](../07_diagramas/state-003-03-estado.mmd) |

> Transiciones: `context/04_state_machine.md`

## 2. Épicas principales

### Épica 1: Gestión de Evidencias y Versionado
Centraliza la carga, almacenamiento y versionado de Evidencias por Indicador, asegurando inmutabilidad y trazabilidad completa. Incluye subsanación sin borrado físico.

### Épica 2: Dashboard y Experiencia de Usuario
Proporciona interfaces diferenciadas: mobile para [CC] con búsquedas rápidas y notificaciones; escritorio para [TD] con filtros avanzados y justificación de rechazos.

### Épica 3: Auditoría y Control de Fases
Implementa la Máquina de Estados para transiciones de Fase basadas en aprobación de Indicadores, con bloqueos automáticos y reportes ejecutivos.

### Épica 4: Portal Público y Transparencia
Ofrece acceso read-only a estados de acreditación y certificados para estudiantes y empleadores, sin autenticación.

### Épica 5: Notificaciones y Comunicación
Envía alertas automáticas de rechazos, aprobaciones y fechas límite, integrando canales institucionales.

### 2.1 Dependencias entre épicas (orden de entrega)

Ver oleadas en [`roadmap.md`](roadmap.md) y [`../07_diagramas/gantt-005-diagrama.mmd`](../07_diagramas/gantt-005-diagrama.mmd).

| Épica | Depende de | Entrega mínima |
|-------|------------|----------------|
| 1 | — | Repositorio **Evidencia** append-only |
| 3 | 1 | Máquina de estados del **Indicador** |
| 2 | 1, 3 | Dashboards [CC]/[TD]/[JD] |
| 5 | 1, 3 | Eventos de observación y aprobación |
| 4 | 2, 3 | Datos publicados por [JD] |

## 3. Enlaces a documentos complementarios

- **[User Journeys](user_journeys.md)**: Narrativas visuales de viajes críticos de usuario con diagramas Mermaid.
- **[User Stories](user_stories.md)**: 26 historias con Gherkin, máquina de estados Mermaid y caminos tristes en operaciones críticas.
- **[Roadmap](roadmap.md)**: Planificación visual de entregas con diagrama Gantt.

## 4. Objetivos y métricas clave

| Épica | Objetivo | Métrica | Meta |
|-------|----------|---------|------|
| 1 | Trazabilidad completa | % de Fases con cadena Indicador→Evidencia | 100% |
| 2 | Velocidad de búsqueda | Tiempo promedio por consulta | ≤ 2 min |
| 3 | Cumplimiento de hitos | % de Fases cerradas a tiempo | ≥ 80% |
| 4 | Transparencia pública | % de consultas públicas resueltas | ≥ 95% |
| 5 | Eficiencia operativa | Reducción en tiempo de comunicación | ≥ 50% |

## 5. Alcance y restricciones

### Dentro del alcance (v2.0)
- Todas las Épicas 1-5 para MVP completo.
- Integración básica con notificaciones institucionales.
- Soporte para CEUB y ARCU-SUR.

### Fuera del alcance
- Integraciones ERP/SIS en tiempo real.
- Pagos o cobros.
- Rankings internacionales.

### Restricciones inquebrantables
- Append-only en Evidencias (subsanación via versionado).
- Lenguaje ubicuo: Fase, Evidencia, Indicador; roles [CC], [TD], [JD].
- Máquina de Estados: Fases avanzan solo si Indicadores aprobados.

| ID | Reach | Impact | Confidence | Effort | RICE |
|----|-------|--------|------------|--------|------|
| PRD-US-001 | 300 | 3 | 80 | 5 | 1440 |
| PRD-US-002 | 300 | 2.5 | 75 | 4 | 1406 |
| PRD-US-007 | 50 | 3 | 75 | 4 | 844 |
| PRD-US-010 | 50 | 2.5 | 80 | 3 | 666 |
| PRD-US-012 | 1000 | 2 | 70 | 4 | 350 |

## 6. Priorización MoSCoW (resumen)

| Prioridad | Épicas / capacidades | Historias representativas |
|-----------|----------------------|---------------------------|
| **Must** | 1, 3, 5 (núcleo) | PRD-US-002, PRD-US-003, PRD-US-007, PRD-US-009 |
| **Should** | 2, 4 | PRD-US-006, PRD-US-012, PRD-US-016 |
| **Could** | 4 ampliado, exportaciones | PRD-US-021, PRD-US-022 |
| **Won't (v2.0)** | ERP, pagos, rankings | Ver BRD OUT-OF-SCOPE |

## 7. Requerimientos funcionales (alto nivel)

| ID | Requisito | Historia(s) | Prioridad |
|----|-----------|-------------|-----------|
| PRD-REQ-001 | El sistema debe permitir búsqueda de evidencia por Fase, Indicador y carrera en menos de 5 segundos. | PRD-US-001 | Must |
| PRD-REQ-002 | El sistema debe registrar cada Evidence con versionado inmutable y relacionarlo a un Indicador. | PRD-US-002, PRD-US-003 | Must |
| PRD-REQ-003 | El sistema debe permitir que [TD] rechace un Indicador con justificación obligatoria. | PRD-US-009 | Must |
| PRD-REQ-004 | El sistema debe mostrar un dashboard mobile para [CC] con status de fases y observaciones. | PRD-US-006 | Must |
| PRD-REQ-005 | El sistema debe ofrecer una vista de auditoría de escritorio para [TD] con filtros por Fase/Indicador. | PRD-US-007, PRD-US-008 | Must |
| PRD-REQ-006 | El sistema debe publicar el estado de acreditación y certificados en un portal público. | PRD-US-012, PRD-US-013 | Should |
| PRD-REQ-007 | El sistema debe notificar a [CC] en menos de 15 minutos tras rechazo o aprobación. | PRD-US-005, PRD-US-010 | Must |

## 8. Requerimientos no funcionales (alto nivel)

| ID | Categoría | Requerimiento | Métrica | Umbral |
|----|-----------|---------------|---------|--------|
| PRD-NFR-001 | Rendimiento | Tiempo de respuesta de búsqueda | p95 | < 500 ms |
| PRD-NFR-002 | Escalabilidad | Concurrencia de usuarios en dashboard | | 200 usuarios simultáneos |
| PRD-NFR-003 | Seguridad | Protección de datos personales | | cifrado en tránsito y reposo |
| PRD-NFR-004 | Disponibilidad | Dashboard | | 99.5% uptime en horario operativo |
| PRD-NFR-005 | Usabilidad | Tareas clave en el dashboard mobile | | completables en ≤ 3 pasos |

## 9. Dependencias e integraciones

| Sistema | Tipo | Propósito | Riesgo |
|---------|------|-----------|--------|
| Infraestructura UMSS | Soporte | Hosting institucional, autenticación | alto |
| Correo institucional | Envío | Notificaciones de rechazo/aprobación | medio |
| Portal público UMSS | Publicación | Exposición de estado de acreditación | medio |
| Motor de reportes | Interna | Generación de informes ejecutivos | medio |

## 10. Supuestos y restricciones

### Supuestos

- La DUEA entregará datos maestros de carreras y plantillas de proceso.
- Los usuarios [CC]/[TD]/[JD] contarán con acceso institucional y dispositivos adecuados.
- La normativa CEUB/ARCU-SUR no cambiará significativamente durante el piloto.
- SIGESA será reconocido como canal oficial para registrar Evidence en el piloto.

### Restricciones

- **Append-only**: no está permitido borrar físicamente ninguna Evidence registrada; las correcciones son nuevas versiones.
- Toda Evidence debe asociarse a un Indicador y su Criterio correspondiente.
- [CC] solo ve su carrera, [TD] tiene visibilidad global según rol.
- No se describen tecnologías concretas en este PRD.

## 11. Experiencia de usuario

- Apoyado en los flujos UX de la MRD y en hallazgos que exigen búsquedas rápidas y reducción de esfuerzo visual.
- Referencia de user journeys en `team/alexAlvarez/docs/03_prd/user_journeys.md`.
- El diseño debe priorizar un dashboard mobile ligero para [CC] y una vista de escritorio con filtros avanzados para [TD].

### 11.1 Trazabilidad con M2 (UI/UX)

| Use Case M2 | User Story PRD | Estado |
|-------------|----------------|--------|
| Búsqueda de evidencias | PRD-US-001 | ✅ cubierto |
| Subsanación de evidencia | PRD-US-003, PRD-US-025 | ✅ cubierto |
| Dashboard mobile CC | PRD-US-006 | ✅ cubierto |
| Auditoría de indicadores | PRD-US-007, PRD-US-026 | ✅ cubierto |
| Apertura proceso / plantillas | PRD-US-024 | ✅ cubierto |
| Aprobación indicador | PRD-US-023 | ✅ cubierto |

## 12. Métricas de éxito del producto

- **North Star**: porcentaje de indicadores resueltos con evidencia aprobada antes de la fecha límite.
- KPI 1: Tiempo medio de búsqueda de Evidence < 5 segundos.
- KPI 2: Tiempo medio de subsanación tras rechazo < 24 horas.
- KPI 3: Adopción mobile de [CC] ≥ 70%.
- KPI 4: % de rechazos con justificación válida ≥ 95%.

## 13. Riesgos del producto

| Riesgo | Prob. | Impacto | Mitigación |
|--------|-------|---------|------------|
| Baja adopción del dashboard mobile | Media | Alto | Capacitación, UX simplificada y rollout progresivo |
| Dependencia de TI institucional | Alto | Alto | Coordinación temprana y pruebas de infraestructura |
| Rechazos sin justificación correcta | Media | Medio | Obligación de campo de texto y validación en UI |
| Falta de reconocimiento de SIGESA como canal oficial | Alta | Crítico | Aprobación explícita de la DUEA y comunicación de gobernanza |

## 14. Trazabilidad

| PRD ID | BRD | MRD | FSD (próximo) |
|--------|-----|-----|----------------|
| PRD-REQ-001 | BRD-OBJ-01 | MRD-N-01 | FSD-UC-001 |
| PRD-REQ-002 | BRD-OBJ-04 | MRD-N-05 | FSD-UC-002 |
| PRD-REQ-003 | BRD-OBJ-02 | MRD-N-02 | FSD-UC-003 |
| PRD-REQ-004 | BRD-CST-02 | MRD-N-02 | FSD-UC-004 |
| PRD-REQ-006 | BRD-OBJ-03 | MRD-N-04 | FSD-UC-005 |

## 15. Anexos

- `team/alexAlvarez/docs/01_brd/BRD.md`
- `team/alexAlvarez/docs/02_mrd/MRD.md`
- `context/03_domain_glossary.md`
- `team/alexAlvarez/docs/03_prd/user_stories.md`
- `team/alexAlvarez/docs/03_prd/user_journeys.md`
- `team/alexAlvarez/docs/03_prd/roadmap.md`

## 16. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v0.1 | 14/05/2026 | Alex Álvarez | Creación inicial del PRD maestro con trazabilidad al BRD y MRD |
| v2.1 | 17/05/2026 | Alex Álvarez | Diagramas Mermaid (actores, fases, épicas); §6 MoSCoW; alineación [JD] y overview |
