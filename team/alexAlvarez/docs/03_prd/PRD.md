# Product Requirements Document (PRD) — SIGESA / AcredIA

> **Propósito del PRD**: definir qué debe hacer SIGESA para cumplir los requerimientos del BRD y MRD, aterrizando alcance, metas y dependencias para diseño, ingeniería y QA.
>
> *Nota: el glosario canónico disponible en este repo es `context/03_domain_glossary.md`; el archivo `docs/04_fsd/glosario.md` no existe en la copia actual.*

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA / AcredIA — Sistema de gestión y seguimiento de acreditaciones (UMSS) |
| Grupo | AcredIA |
| Versión | v0.1 |
| Fecha | 14/05/2026 |
| Product Manager / Autor | Alex Álvarez |
| Revisores | Docente + Tech Lead + QA |
| Estado | Borrador |
| BRD de referencia | `team/alexAlvarez/docs/01_brd/BRD.md` |
| MRD de referencia | `team/alexAlvarez/docs/02_mrd/MRD.md` |
| Insumos M2 (UI/UX) | `team/alexAlvarez/docs/context/`, `team/alexAlvarez/docs/README.md` |
| Fase Spec Kit cubierta | Specify ✅ / Plan ⬜ / Tasks ⬜ / Implement ⬜ |
| Prompts utilizados | — |

## 1. Resumen del producto

SIGESA es la plataforma institucional diseñada para digitalizar el ciclo de acreditación de la DUEA en la UMSS, gestionando **Procesos**, **Fases**, **Dimensiones**, **Criterios**, **Indicadores** y cada **Evidencia** normativa con trazabilidad auditada. Resuelve la dispersión documental actual y el uso de Excel/WhatsApp/USBs, habilitando búsquedas en menos de 5 segundos para Coordinadores, un dashboard mobile para [CC] y una visión de auditoría potente para [TD].

El producto entrega valor a tres segmentos clave: Coordinadores de Carrera, Técnicos DUEA y el público externo (estudiantes y empleadores). Su objetivo es garantizar que cada evidencia esté disponible, versionada e inmutable, mientras soporta la operación de la DUEA y cumplimiento CEUB/ARCU-SUR.

## 2. Objetivos del producto

| ID | Objetivo del producto | BRD vinculado | Métrica | Meta |
|----|------------------------|----------------|---------|------|
| PRD-OP-01 | Reducir el tiempo de localización de evidencia documental | BRD-OBJ-01 | tiempo por búsqueda | ≤ 2 min |
| PRD-OP-02 | Asegurar la trazabilidad completa de evidencias por Indicador y Fase | BRD-OBJ-04 | % de fases con cadena completa | 100% |
| PRD-OP-03 | Habilitar un dashboard mobile para Coordinadores | BRD-CST-02 | adopción mobile | ≥ 70% de CC activos |
| PRD-OP-04 | Facilitar la auditoría y revisión de indicadores con justificación estructurada | BRD-OBJ-02 | % de rechazos con justificación válida | ≥ 95% |

## 3. Alcance (Scope)

### 3.1 Dentro del alcance (release v1.0)

- Gestión de **Proceso** de acreditación con estructura CEUB/ARCU-SUR.
- Registro de **Evidencias** por **Indicador** con versionado automático y política **append-only**.
- Flujos de carga, revisión, rechazo y subsanación entre [CC] y [TD].
- Dashboard mobile para [CC] y panel de auditoría de escritorio para [TD].
- Portal público de consulta básico de estados de acreditación y certificados.
- Notificaciones de observaciones y aprobaciones.
- Reportes ejecutivos de avance por Fase y estado de Indicadores.

### 3.2 Fuera del alcance (backlog)

- Integración nativa con sistemas ERP / SIS UMSS en tiempo real.
- Pagos en línea o cobros por certificación.
- Analítica avanzada tipo ranking internacional.
- Configuración de flujos fuera del estándar CEUB/ARCU-SUR.

### 3.3 Roadmap de versiones (Delivery track)

| Versión | Contenido | Fecha objetivo |
|---------|-----------|----------------|
| v1.0 | MVP de evidencias, dashboard CC, revisión TD, portal público básico | Q4 2026 |
| v1.1 | Mejoras de búsquedas, filtros avanzados para TD y reportes ejecutivos | Q1 2027 |
| v2.0 | Integraciones institucionales y ampliación de publicación pública | Q2 2027 |

### 3.4 Roadmap de validación (Discovery track)

| Sprint / Semana | Hipótesis a validar | Método | Criterio de éxito | Estado |
|-----------------|---------------------|--------|-------------------|--------|
| S1 | El CC encuentra evidencia en <5 segundos | prueba con prototipo de búsqueda | ≥ 80% búsquedas exitosas | abierta |
| S2 | El dashboard mobile reduce el esfuerzo visual del CC | test de usabilidad + encuesta | ≥ 4/5 satisfacción | abierta |
| S3 | El TD valida más rápido con filtros por Indicador/Fase | observación de sesión de auditoría | reducción del 25% en tiempo de revisión | abierta |

## 4. Personas y user journeys

### 4.1 Personas (resumen)

- **Coordinador de Carrera [CC]**: necesita subsanar evidencias cerca de fechas límite con búsquedas rápidas.
- **Técnico DUEA [TD]**: necesita auditar cientos de evidencias con una interfaz de escritorio potente.
- **Público [P]**: estudiantes y empleadores que buscan transparencia y certificados instantáneos.

### 4.2 User journeys principales

- `team/alexAlvarez/docs/03_prd/user_journeys.md`

## 5. User stories y criterios de aceptación

- `team/alexAlvarez/docs/03_prd/user_stories.md`

## 6. Priorización

| Método | Ranking |
|--------|---------|
| MoSCoW | Must > Should > Could > Won't |
| RICE | Reach × Impact × Confidence ÷ Effort |

### Top 5 historias RICE

| ID | Reach | Impact | Confidence | Effort | RICE |
|----|-------|--------|------------|--------|------|
| PRD-US-001 | 300 | 3 | 80 | 5 | 1440 |
| PRD-US-002 | 300 | 2.5 | 75 | 4 | 1406 |
| PRD-US-007 | 50 | 3 | 75 | 4 | 844 |
| PRD-US-010 | 50 | 2.5 | 80 | 3 | 666 |
| PRD-US-012 | 1000 | 2 | 70 | 4 | 350 |

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
| Subsanación de evidencia | PRD-US-003 | ✅ cubierto |
| Dashboard mobile CC | PRD-US-006 | ✅ cubierto |
| Auditoría de indicadores | PRD-US-007 | ✅ cubierto |

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
