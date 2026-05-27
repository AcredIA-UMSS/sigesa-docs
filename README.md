# SIGESA: Sistema Gestor de Acreditaciones UMSS

**Documentación oficial del proyecto SIGESA:** Business Requirements Document (BRD), Architecture Decision Records (ADR), Functional Specification Documents (FSD) y otros artefactos técnicos. Elaborado con apoyo de herramientas de IA como Claude, Copilot y NotebookLM.

---

## 📖 Visión General

**SIGESA** (Sistema Gestor de Acreditaciones) es una plataforma web diseñada para orquestar, monitorear y auditar todo el ciclo de vida de los procesos de acreditación universitaria de la Universidad Mayor de San Simón (UMSS). 

El sistema soporta dinámicamente dos normativas de evaluación: **CEUB** (Nacional) y **ARCU-SUR** (Internacional). 

### Propósito Principal
Transformar un proceso históricamente fragmentado y ambiguo en un **flujo de trabajo lineal, orientado a procesos y estrictamente trazable**. Elimina el problema de los "archivos huérfanos" obligando a que cada pieza de evidencia documental y cada subsanación viva exactamente dentro de la fase, dimensión e indicador normativo que le corresponde.

---

## 🎯 El Problema que Resuelve

En versiones y enfoques anteriores, el proceso se estancaba en "cuellos de botella" de comunicación:
- Los documentos se perdían en formatos dispersos (físico, Excel, Drive, correo)
- Las observaciones de auditoría no se emparejaban con las correcciones
- El estado real de una carrera era invisible para la Jefatura
- No existía un mecanismo centralizado para hacer seguimiento en tiempo real

**SIGESA resuelve esto mediante:**

1. **Arquitectura Orientada a Procesos:** La navegación y la subida de archivos ocurren dentro de una Máquina de Estados estricta, no en un vacío.
2. **Trazabilidad Absoluta:** Un documento rechazado no se borra, se observa. La corrección se ancla directamente a la observación, manteniendo el historial inmutable.
3. **Automatización de Plantillas:** Al seleccionar una normativa (CEUB o ARCU-SUR), el sistema carga automáticamente las Dimensiones, Criterios e Indicadores aplicables.
4. **Filtro de Contexto Global:** Los usuarios no navegan por carpetas de facultades; el sistema adapta la vista automáticamente según los permisos de la carrera asignada.

---

## 👥 Actores Principales (Roles)

El sistema reconoce **4 actores fundamentales** con niveles de visibilidad y permisos distintos:

### [CC] Coordinador de Carrera
- **Rol:** Actor operativo
- **Objetivo:** Cumplir con el framework de evaluación normativo
- **Responsabilidades:**
  - Carga de evidencias documentales
  - Respuesta a observaciones del Técnico DUEA
  - Corrección de indicadores rechazados
  - Seguimiento del progreso de su carrera
- **Visibilidad:** Limitada a su propia carrera

### [TD] Técnico DUEA (Auditor)
- **Rol:** Actor auditor y orquestador
- **Objetivo:** Validar la calidad técnica y completitud de las evidencias
- **Responsabilidades:**
  - Revisión de evidencia técnica
  - Aprobación o rechazo de indicadores (con justificación obligatoria)
  - Generación de observaciones vinculadas
  - Autorización del avance de fases
- **Visibilidad:** Global (todas las carreras y facultades)

### [JD] Jefatura DUEA (Administrador)
- **Rol:** Actor estratégico
- **Objetivo:** Supervisar velocidad de procesos y garantizar continuidad institucional
- **Responsabilidades:**
  - Monitoreo de cuellos de botella
  - Configuración del sistema (usuarios, facultades, plantillas normativas)
  - Aprobación de dictámenes finales
  - Auditoría de historial de acreditaciones
- **Visibilidad:** Total del sistema

### [P] Público (Portal de Transparencia)
- **Rol:** Actor externo
- **Acceso:** Estudiantes, empleadores, organismos de acreditación
- **Responsabilidades:** Consultar estados y descargar certificados institucionales sin fricciones

---

## 🏗️ Flujo de Trabajo Crítico (The Core Loop)

El motor de SIGESA empuja a las carreras a través de un ciclo de vida iterativo. 

> **Nota Estructural:** Dentro de cada fase de evaluación, el análisis de la carrera se desglosa en múltiples **Dimensiones** (ej. Contexto Institucional, Proyecto Académico, Comunidad Universitaria), las cuales agrupan los criterios e indicadores específicos a evaluar.

### Etapas Clave

1. **Preparación**
   - JD/TD crean el proceso y asignan la normativa (CEUB/ARCU-SUR)
   - El sistema carga automáticamente las Dimensiones y estructura normativa aplicable

2. **Fase 1: Autoevaluación**
   - CC sube evidencias navegando a través de Dimensiones e Indicadores
   - TD audita y genera observaciones
   - Sistema bloquea avance si existen indicadores pendientes/rechazados

3. **Fase 2: Subsanaciones (Evaluación Interna)**
   - CC sube correcciones específicas ancladas a observaciones previas
   - TD valida y aprueba
   - Sistema obliga emparejamiento exacto entre problema y solución

4. **Fase 3: Evaluación Externa**
   - Visita de pares externos
   - Evaluación del comité externo
   - Dictamen y emisión de certificación pública
   - Portal de transparencia actualizado

---

## ⚙️ Características Críticas (Priorizadas)

### P1 — CRÍTICO (sin esto el sistema no funciona)
- **Autenticación y Control de Acceso:** Registro y autenticación con roles diferenciados que controlan qué puede ver y hacer cada usuario
- **Gestión de Fases:** Registro de avances, observaciones y cambios de estado a través del ciclo de acreditación
- **Versionamiento de Evidencia:** Carga, organización y versioning de documentos vinculados a indicadores específicos

### P2 — IMPORTANTE (diferencia el sistema del proceso manual)
- **Dashboard Centralizado:** Panel con el estado actualizado de cada carrera (etapa actual, porcentaje de avance, fechas clave)
- **Alertas Automáticas:** Notificaciones sobre fechas límite, vencimientos de acreditación e hitos críticos
- **Sistema de Observaciones:** Rechazos con comentarios obligatorios que generan bloqueos hasta subsanación

### P3 — VALIOSO (agrega valor estratégico)
- **Reportes Exportables:** Métricas de cumplimiento por carrera, facultad y periodo en PDF/Excel
- **Auditoría Histórica:** Consulta de ciclos anteriores y continuidad institucional
- **Portal de Transparencia:** Acceso público a certificados y estados

---

## 🔐 Reglas de Negocio Críticas

| Regla | Descripción |
|-------|-------------|
| **Roles** | Un coordinador de carrera solo puede visualizar y cargar evidencia; no puede crear, editar ni aprobar fases (exclusivas del administrador DUEA) |
| **Máquina de Estados** | Flujo: Pendiente → Con Observaciones → Aprobado/Rechazado. No puede cerrarse hasta aprobación explícita. Permite versiones iterativas. |
| **Bloqueo de Avance** | El sistema NO permite avanzar a la siguiente etapa si existe al menos un indicador Pendiente o Rechazado |
| **Plantillas Normativas** | Al seleccionar CEUB o ARCUSUR, se cargan automáticamente las fases, dimensiones e indicadores predefinidos |
| **Trazabilidad Inmutable** | Documentos rechazados nunca se borran; se archivan con motivo de rechazo y fecha de observación |
| **Emparejamiento Exacto** | Correcciones deben estar vinculadas directamente a la observación que las generó |

---

## 📊 Métricas de Éxito

El sistema funciona si se logra:

- ✅ **≥ 90%** de fases completadas antes de fecha límite
- ✅ **≥ 95%** de carreras con documentación completa cargada
- ✅ **< 5 minutos** de configuración inicial gracias a plantillas automáticas
- ✅ **≥ 85%** satisfacción de usuarios en tareas esenciales sin capacitación previa
- ✅ **Reducción drástica** de llamadas/emails informales sobre estado de procesos
- ✅ **0%** procesos paralizados por errores de comunicación

---

## 🤖 Notas para Agentes de IA (AI Knowledge Base Context)

Si eres un agente (Cursor, Copilot, etc.) en este repositorio, **lee primero** el manifiesto [`docs/08_agents/AGENTS.md`](docs/08_agents/AGENTS.md) y el catálogo de skills [`docs/08_agents/skills.md`](docs/08_agents/skills.md). Las skills runtime viven en [`.cursor/skills/`](.cursor/skills/).

### Skills por tipo de tarea

| Tarea | Skill (`.cursor/skills/`) | Agente |
|-------|---------------------------|--------|
| BRD / MRD / PRD | `sigesa-generacion-documentos-negocio` | @ProductAgent |
| DTI / ADR / FSD técnico | `sigesa-generacion-documentos-tecnicos`, `sigesa-dti-author`, `sigesa-arquitectura-tecnica-ia` | @ArchAgent |
| Contratos REST | `sigesa-api-contract-designer` | @ArchAgent |
| DDL append-only | `sigesa-db-architect-append-only` | @DBAgent |
| UI Next.js | `sigesa-frontend-engineer` | @DevAgent |
| Backend hexagonal + eventos | `sigesa-backend-engineer` | @DevAgent |
| CQRS / Saga / Outbox | `sigesa-distributed-architect` | @ArchAgent |
| Trazabilidad Dorada | `sigesa-auditor-trazabilidad-dti` | @QaAgent |
| Auditoría `team/` (rúbrica Excelente) | `sigesa-auditoria-excelente-equipo` | @QaAgent |
| Diagramas Mermaid | `mermaid-expert-architect` | @VisualAgent |

**Código de aplicación:** `app/sigesa-front/` (frontend) y `app/sigesa-backend/` (backend). No inventar stack: leer [`docs/05_dti/hybrid_architecture.md`](docs/05_dti/hybrid_architecture.md) y ADRs en `docs/05_dti/adrs/`.

### Lenguaje de dominio

- Glosario canónico: [`context/03_domain_glossary.md`](context/03_domain_glossary.md)
- Jerarquía: `Proceso → Fase → Dimensión → Criterio → Indicador → Evidencia`
- No mezclar `File` (archivo técnico) con `Evidence` (artefacto normativo)

### Máquina de estados y contratos

- Transiciones del `Indicator`: [`context/04_state_machine.md`](context/04_state_machine.md) (y referencias en FSD/DTI)
- API REST (cloud): [`docs/05_dti/api_contracts_cloud.md`](docs/05_dti/api_contracts_cloud.md)
- API REST (FSD): [`docs/04_fsd/api_contracts.md`](docs/04_fsd/api_contracts.md)

### Mutabilidad (append-only)

- **Prohibido** `UPDATE`/`DELETE` destructivos sobre Evidencia normativa e historial de estados; usar `INSERT` con versionado
- Esquema y reglas: [`docs/05_dti/ddl_sigesa_append_only.sql`](docs/05_dti/ddl_sigesa_append_only.sql) (cuando aplique), skill `sigesa-db-architect-append-only`
- Comportamiento de subsanación: [`context/06_bdd_fase2_subsanaciones.md`](context/06_bdd_fase2_subsanaciones.md)

### Comunicación entre servicios

- Integración **asíncrona** (EventBridge, SQS FIFO); no HTTP síncrono servicio-a-servicio para flujos de negocio (véase ADR_010 en `docs/05_dti/adrs/`)

---

## 📁 Estructura de la documentación

### Golden Folder (`docs/`)

| Capa | Ruta |
|------|------|
| Negocio | [`docs/01_brd/`](docs/01_brd/), [`docs/02_mrd/`](docs/02_mrd/) |
| Producto | [`docs/03_prd/`](docs/03_prd/) |
| Funcional | [`docs/04_fsd/`](docs/04_fsd/) |
| Técnica | [`docs/05_dti/`](docs/05_dti/), [`docs/05_nfr/`](docs/05_nfr/), [`docs/adr/`](docs/adr/) |
| Agentes IA | [`docs/08_agents/`](docs/08_agents/) |
| Trazabilidad | [`docs/09_trazabilidad/`](docs/09_trazabilidad/) |
| Diagramas | [`docs/07_diagramas/`](docs/07_diagramas/) |

### Contexto transversal (`context/`)

- [`context/01_vision_negocio.txt`](context/01_vision_negocio.txt) — Usuarios, problemas y tareas
- [`context/02_parte_dificil.txt`](context/02_parte_dificil.txt) — Flujos críticos y restricciones
- [`context/03_domain_glossary.md`](context/03_domain_glossary.md) — Lenguaje ubicuo
- [`context/04_state_machine.md`](context/04_state_machine.md) — Máquina de estados
- [`context/05_data_schema.md`](context/05_data_schema.md) — Modelo de datos
- [`context/06_bdd_fase2_subsanaciones.md`](context/06_bdd_fase2_subsanaciones.md) — BDD subsanaciones

### Entregas por integrante

- `team/<integrante>/docs/` — borradores de curso; promover a `docs/` tras auditoría Excelente (`sigesa-auditoria-excelente-equipo`)

---

## 🚀 Tecnologías base (DTI v1.0 — referencia)

Stack **oficial** según DTI y ADRs (detalle en [`docs/05_dti/hybrid_architecture.md`](docs/05_dti/hybrid_architecture.md)):

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js, React, TypeScript, Tailwind (piloto en `app/sigesa-front/`) |
| Backend API | Node.js 20 LTS + Express 4 ([ADR_009](docs/05_dti/adrs/ADR_009_backend_nodejs_express.md)) |
| Base de datos | PostgreSQL 16 ([ADR_006](docs/05_dti/adrs/ADR_006_postgresql_16.md)) |
| Evidencias (blob) | AWS S3 |
| Mensajería | AWS EventBridge ([ADR_010](docs/05_dti/adrs/ADR_010_event_driven_choreography.md)); SQS FIFO para cierre de Phase ([ADR_011](docs/05_dti/adrs/ADR_011_sqs_fifo_phase_closure.md)) |
| Auth | JWT + RBAC ([ADR_007](docs/05_dti/adrs/ADR_007_jwt_rbac.md)) |

Cualquier cambio de stack requiere **ADR nuevo** antes de implementar.

---

## 🧾 Plantilla de mensajes de commit

Este repositorio incluye una plantilla de Git para mantener buenas prácticas en los logs de commit.
Usa el archivo `.gitmessage.txt` en la raíz del proyecto y configura tu repositorio local con:

```bash
git config commit.template .gitmessage.txt
```

Luego de configurar, cada `git commit` abrirá un mensaje con secciones claras de tipo, descripción, referencias y pruebas.

---

## 📝 Licencia

Proyecto de la Universidad Mayor de San Simón (UMSS). Contacto: DUEA (Dirección de Asuntos Universitarios y Acreditación)
