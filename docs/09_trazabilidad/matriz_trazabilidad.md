# Matriz de trazabilidad extremo a extremo — SIGESA / AcredIA

## Control de versión

| Campo | Valor |
|-------|-------|
| **Versión** | **Dorada v1.5** |
| **Timestamp** | `2026-05-17T18:00:00-04:00` |
| **Cambio** | Re-auditoría alineación Golden Folder (`docs/06`–`08`); corrección enlaces relativos; cobertura PRD-US 25/25. |
| **Fuentes** | BRD v2.2 · MRD v1.1 · PRD v1.0 · FSD Dorado · NFR v1.1 · DTI · [`docs/08_agents/AGENTS.md`](../08_agents/AGENTS.md) |
| **Informe** | [`report_findings.md`](report_findings.md) |
| **Métricas IA** | [`metricas_ai_sdlc.md`](metricas_ai_sdlc.md) |
| **ADRs** | [`../adr/README.md`](../adr/README.md) — ADR-0001…0009 |
| **Gobernanza IA** | [`../08_agents/`](../08_agents/README.md) · [`../06_prompt_contracts/`](../06_prompt_contracts/prompt_contracts.md) |
| **Diagramas** | [`../07_diagramas/`](../07_diagramas/README.md) |

---

## 1. Convención de identificadores

| Prefijo | Uso |
|---------|-----|
| `BRD-REQ-*` | Requerimiento de negocio |
| `MRD-N-*` | Necesidad de mercado |
| `PRD-REQ-*` / `PRD-US-*` | Producto (canónico en user stories) |
| `FSD-UC-*` / `FSD-BR-*` | Funcional / regla de negocio |
| `NFR-*` | No funcional (`docs/05_nfr/NFR_ISO25010.md`) |
| `TC-*` / `TC-SAD-*` | Casos de prueba |
| `ADR-*` | Decisión arquitectónica |
| `MOD-*` | Módulo lógico |

**Estado implementación:** `PLAN` | `EN_CURSO` | `DONE` | `N/A`  
**Release:** `P1` v1.0 · `P2` v1.1 · `P3` v2.0 / F5

Las tablas siguientes incluyen una columna **Descripción** por fila (texto canónico del documento fuente). Los IDs enlazados en otras columnas usan formato abreviado `ID — etiqueta corta` cuando hay varios por celda.

---

## 2. Matriz PRD-REQ → BRD → FSD (vista producto)

Fuente autoritativa: `docs/03_prd/PRD.md` §7. Corregida en auditoría v1.1 (sustituye tabla errónea del PRD §14).

| PRD-REQ | Descripción (PRD) | Pri. | BRD-REQ | Descripción (BRD) | MRD-N | Descripción (MRD) | PRD-US | FSD-UC | NFR | ADR | MOD | Release |
|---------|-------------------|------|---------|-------------------|-------|-------------------|--------|--------|-----|-----|-----|---------|
| PRD-REQ-001 | Autenticación y RBAC por rol | Must | 001 | Autenticación y autorización por roles | N-09 | RBAC [JD]/[TD]/[CC]/[EE]/[P] con correo UMSS | 001 Inicio sesión · 002 Gestión usuarios · 003 Sin sesión | UC-001 Autenticación · UC-002 Gestión usuarios | 006 TLS · 008 RBAC | **0003** Auth adapter | MOD-AUTH | P1 |
| PRD-REQ-002 | Gestión de Proceso CEUB/ARCU-SUR por carrera | Must | 002 | Gestión de Proceso por carrera y facultad | N-01 | Flujos y taxonomía CEUB/ARCU-SUR nativos | 023 Plantillas normativas | UC-003 Plantillas y Proceso | — | 0002 Monolito modular | MOD-PROCESS | P1 |
| PRD-REQ-003 | Configuración de Fases y cierre con reglas | Must | 003 | Fases configurables; cierre según reglas | N-01 | (mismo) Taxonomía y flujos normativos | 011 Avance/cierre Fase | UC-003 · UC-010 Avanzar/cerrar Fase | 018 Máquina de estados | — | MOD-WORKFLOW | P1 |
| PRD-REQ-004 | Taxonomía Dimensión→Criterio→Indicador | Must | 004 | Taxonomía parametrizable sin Evidencia huérfana | N-01 | (mismo) | 023 Plantillas normativas | UC-003 Plantillas y Proceso | — | — | MOD-PROCESS | P1 |
| PRD-REQ-005 | Carga Evidencia solo [CC] (salvo delegación) | Must | 005 | Carga solo [CC]; [TD] valida | N-02 | Repositorio único de Evidencia con versionado | 005 Carga Evidencia | UC-004 Cargar Evidencia | 010 Validación formularios · 011 Progreso >5 MB | 0001 Append-only | MOD-EVIDENCE | P1 |
| PRD-REQ-006 | Versionado con autor y fecha | Must | 006 | Versionado con autor, fecha e historial | N-02 | (mismo) Repositorio y versionado | 006 Subsanación · 007 Historial versiones | UC-005 Versionado · UC-006 Subsanar | 007 Cifrado reposo | 0001 | MOD-EVIDENCE | P1 |
| PRD-REQ-007 | Append-only / sin borrado aprobados | Must | 007 | Append-only; sin eliminación física | N-03 | Política append-only; subsanación por versión | 008 Bloqueo eliminación | UC-005 Versionado append-only | 007 · 017 Inmutabilidad | 0001 | MOD-EVIDENCE | P1 |
| PRD-REQ-008 | Observaciones y subsanación enlazada | Must | 008 | Observaciones [TD]→[CC] con subsanación | N-04 | Flujo observaciones con subsanación enlazada | 006 Subsanación · 009 Rechazo · 015 Observaciones abiertas | UC-006 · UC-008 · UC-011 | — | — | MOD-WORKFLOW | P1 |
| PRD-REQ-009 | Aprobar/rechazar Indicador; estados | Must | 009 | Máquina de estados; [TD] autoriza avance | N-05 | Validación [TD] sin saltos ilegales | 009 Rechazo · 010 Aprobación | UC-008 Rechazar · UC-009 Aprobar | 018 Máquina de estados | — | MOD-WORKFLOW | P1 |
| PRD-REQ-010 | Máquina de estados Fase/Indicador | Must | 009 | (mismo) Máquina de estados | N-05 | (mismo) | 011 Avance/cierre Fase | UC-010 Avanzar/cerrar Fase | 018 | — | MOD-WORKFLOW | P1 |
| PRD-REQ-011 | Panel semáforo [JD] | Must | 010 | Panel semáforo por carrera/facultad | N-06 | Panel semáforo para [JD] | 013 Panel semáforo | UC-013 Panel semáforo [JD] | 001 Latencia API | — | MOD-DASH | P1 |
| PRD-REQ-012 | Dashboard [CC]/[TD] | Must | **026** | Paneles operativos [CC] y bandeja [TD] | N-06 | (mismo) Visibilidad gerencial | 012 Dashboard [CC] · 014 Bandeja [TD] | UC-011 Dashboard [CC] · UC-012 Bandeja [TD] | 001 · 009 Aislamiento carrera | — | MOD-DASH | P1 |
| PRD-REQ-013 | Alertas correo institucional | Must | 011 | Alertas automáticas plazos y eventos | N-07 | Alertas automáticas | 017 Notif. aprob/rechazo · 018 Plazos · 019 Nueva Evidencia [TD] | UC-015 Notificaciones | 004 Notificación ≤15 min | — | MOD-NOTIFY | P1 |
| PRD-REQ-014 | Reporte ejecutivo PDF | Must | 012 | Reporte ejecutivo PDF ≤2 clics / ≤5 min | N-08 | Reporte ejecutivo PDF | 021 Reporte PDF | UC-014 Reporte ejecutivo | 003 PDF P95 ≤5 min | — | MOD-REPORT | P1 |
| PRD-REQ-015 | Búsqueda de Evidencia | Must | 020 | Búsqueda por título, carrera, facultad, gestión | N-13 | Búsqueda — tarea ≤2 min | 004 Búsqueda Evidencia | UC-007 Buscar Evidencia | 002 Búsqueda E2E ≤2 min | — | MOD-EVIDENCE | P1 |
| PRD-REQ-016 | Un Proceso activo por tipo/periodo | Must | 013 | Un Proceso activo por tipo/carrera/periodo | N-10 | Un Proceso activo por tipo/carrera/periodo | 023 Plantillas normativas | UC-003 Plantillas y Proceso | — | — | MOD-PROCESS | P1 |
| PRD-REQ-017 | Cronograma y bloqueo de cierre | Must | 014 | Cronograma coherente; cierre sin pendientes | N-11 | Cronograma; cierre bloqueado con pendientes | 011 Avance/cierre Fase | UC-010 Avanzar/cerrar Fase | 018 | — | MOD-WORKFLOW | P1 |
| PRD-REQ-018 | Bitácora de auditoría | Should | 015 | Bitácora inmutable de acciones relevantes | N-12 | Bitácora de auditoría exportable | 022 Bitácora exportable | UC-017 Bitácora de auditoría | 014 Trazabilidad tests | — | MOD-AUDIT | P1 |
| PRD-REQ-019 | Portal [P] solo publicados | Should | 016 | Portal [P] solo contenido publicado | N-18 | Portal [P] solo publicado por [JD] | 016 Consulta estado sin login | UC-016 Portal público | 005 Cifrado / publicación | — | MOD-PUBLIC | P2 |
| PRD-REQ-020 | Importación planilla | Must | 019 | Carga masiva / planilla para [CC] | N-14 | Importación masiva / planilla | 024 Importación desde planilla | UC-018 Importación masiva | — | — | MOD-EVIDENCE | P2 |
| PRD-REQ-021 | Respaldo diario verificable | Must | 021 | Respaldo automático diario verificable | N-15 | Respaldo automático diario | — | DTI-ops (runbook) | 015 Respaldo diario | — | MOD-OPS | P1 |
| PRD-REQ-022 | UX progreso y errores accionables | Should | 025 | Retroalimentación en cargas largas | N-16 | UX mensajes accionables; progreso cargas | 025 Barra progreso cargas pesadas | UC-004 Cargar Evidencia | 010 · 011 | — | MOD-EVIDENCE | P2 |
| PRD-REQ-023 | Responsive [CC]: lectura P1; carga móvil P2 | Must lectura / P2 carga | §21.1 Q-04 | Responsive lectura Must v1.0; carga v1.1 | N-17 | Experiencia responsive consulta/carga [CC] | 012 Dashboard [CC] | UC-011 Dashboard [CC] | 012 WCAG | — | MOD-DASH | P1 lectura |
| PRD-REQ-024 | Planes de mejora | Should | 022 | Planes de mejora vinculados al Proceso | N-19 | Planes de mejora vinculados al Proceso | — | **N/A v2** | — | — | — | P3 |
| PRD-REQ-025 | Exportación PDF/Excel ampliada | Could | 017 | Exportación PDF/Excel por carrera/facultad | N-20 | Exportación consolidada PDF/Excel | 021 Reporte PDF | UC-014 Reporte ejecutivo | 003 | — | MOD-REPORT | P3 |
| PRD-REQ-026 | Certificados publicados | Could | 023 | Emisión/descarga certificados publicados | N-21 | Certificados de acreditación descargables | 020 Descarga certificado [P] | UC-016 Portal público | — | — | MOD-PUBLIC | P3 |
| PRD-REQ-027 | IA explicable (sugerencias) | Could | 018 | IA explicable y supervisada | N-22 | IA explicable + chatbot FAQ | — | **N/A v2** | — | — | — | P3 |
| PRD-REQ-028 | Chatbot FAQ normativo | Could | 024 | Chatbot informacional FAQ DUEA | N-22 | (mismo) | — | **N/A v2** | — | — | — | P3 |

> **PRD-REQ-012** respaldado por **BRD-REQ-026** (v1.2). **PRD-REQ-023:** lectura responsive P1; carga móvil P2 (BRD §21.1 Q-04).

---

## 3. Matriz BRD-REQ → cadena (vista negocio)

| BRD-REQ | Descripción (BRD) | PRD-REQ | Descripción (PRD) | FSD-UC | FSD-BR | NFR | TC |
|---------|-------------------|---------|-------------------|--------|--------|-----|-----|
| BRD-REQ-001 | Autenticación y autorización por roles | 001 | Autenticación y RBAC | UC-001 Autenticación · UC-002 Gestión usuarios | BR-12 Correo @umss.edu.bo | 006 TLS · 008 RBAC | TC-01 Login · TC-02 Usuarios |
| BRD-REQ-002 | Gestión de Proceso CEUB/ARCU-SUR | 002 | Gestión de Proceso por carrera | UC-003 Plantillas y Proceso | BR-08 Un Proceso activo | — | TC-03 Plantilla/proceso |
| BRD-REQ-003 | Fases configurables y cierre con reglas | 003, 010 | Config. Fases · Máquina de estados | UC-003 · UC-010 | BR-07 Cierre solo si APROBADO · BR-17 Plazos no editables [CC] | 018 Máquina estados | TC-08 Avance fase |
| BRD-REQ-004 | Taxonomía Dimensión→Criterio→Indicador | 004 | Taxonomía parametrizable | UC-003 | — | — | TC-03b Taxonomía |
| BRD-REQ-005 | Carga Evidencia solo [CC] | 005 | Carga Evidencia solo [CC] | UC-004 | BR-01 Evidencia ligada a Indicador · BR-03 Solo [CC] carga | 010 · 011 UX carga | TC-04 Carga evidencia |
| BRD-REQ-006 | Versionado con autor y fecha | 006 | Versionado autor/fecha | UC-005 · UC-006 | BR-06 Subsanación con observationId | 007 Cifrado | TC-05 Versionado · TC-06 Subsanación |
| BRD-REQ-007 | Append-only sin borrado aprobados | 007 | Append-only | UC-005 | BR-02 Append-only · BR-15 DELETE en auditoría | 017 Inmutabilidad | TC-05b DELETE bloqueado · TC-SAD-001 |
| BRD-REQ-008 | Observaciones y subsanación enlazada | 008 | Observaciones y subsanación | UC-006 · UC-008 · UC-011 | BR-05 Rechazo con justificación · BR-06 Subsanación | — | TC-06 · TC-07 Rechazo |
| BRD-REQ-009 | Máquina de estados indicador/fase | 009, 010 | Aprobar/rechazar · Máquina estados | UC-008 · UC-009 · UC-010 | BR-04 Solo [TD] aprueba/rechaza · BR-07 | 018 | TC-07 · TC-08 · TC-SAD-002 |
| BRD-REQ-010 | Panel semáforo [JD] | 011 | Panel semáforo [JD] | UC-011 · UC-013 | BR-09 [CC] solo ve su carrera | 001 · 009 | TC-09 Semáforo |
| BRD-REQ-011 | Alertas automáticas | 013 | Alertas correo institucional | UC-015 | BR-13 Notificación ≤15 min | 004 SLA notificación | TC-10 Alertas |
| BRD-REQ-012 | Reporte ejecutivo PDF | 014, 025 | Reporte PDF · Exportación | UC-014 | BR-14 Reporte solo con autorización [JD] | 003 PDF P95 | TC-11 Reporte PDF |
| BRD-REQ-013 | Un Proceso activo por tipo/periodo | 016 | Un Proceso activo | UC-003 | BR-08 Un Proceso activo | — | TC-03c Proceso único |
| BRD-REQ-014 | Cronograma coherente | 017 | Cronograma y bloqueo cierre | UC-010 | BR-07 Cierre Fase | 018 | TC-08b Cronograma |
| BRD-REQ-015 | Bitácora de auditoría | 018 | Bitácora de auditoría | UC-017 | — | 014 Trazabilidad | TC-12 Bitácora |
| BRD-REQ-016 | Portal [P] solo publicados | 019 | Portal [P] | UC-016 | BR-10 Portal sin borradores | 005 | TC-PUB Portal |
| BRD-REQ-017 | Exportación PDF/Excel | 025 | Exportación ampliada | UC-014 | — | — | TC-11b Exportación |
| BRD-REQ-018 | IA explicable supervisada | 027 | IA explicable | N/A P3 | BR-11 Dictamen solo humano | — | TC-IA Sugerencias IA |
| BRD-REQ-019 | Carga masiva / planilla | 020 | Importación planilla | UC-018 | — | — | TC-15 Importación |
| BRD-REQ-020 | Búsqueda de Evidencia | 015 | Búsqueda Evidencia | UC-007 | — | 002 Búsqueda ≤2 min | TC-14 Búsqueda |
| BRD-REQ-021 | Respaldo diario verificable | 021 | Respaldo diario | DTI ops | — | 015 Respaldo | TC-BKP Restore |
| BRD-REQ-022 | Planes de mejora | 024 | Planes de mejora | N/A P3 | — | — | TC-PM Plan mejora |
| BRD-REQ-023 | Certificados publicados | 026 | Certificados | UC-016 | BR-10 | — | TC-PUB2 Certificado |
| BRD-REQ-024 | Chatbot FAQ normativo | 028 | Chatbot FAQ | N/A P3 | — | — | TC-CHAT FAQ |
| BRD-REQ-025 | UX progreso y errores accionables | 022 | UX progreso cargas | UC-004 | BR-18 Progreso > umbral | 010 · 011 | TC-04b Progreso carga |
| BRD-REQ-026 | Paneles [CC] y bandeja [TD] | 012 | Dashboard [CC]/[TD] | UC-011 · UC-012 | BR-09 | 001 · 009 | TC-09a Dashboard CC · TC-09b Bandeja TD |

*Columna `FSD-BR`: ID completo `FSD-BR-01`…`18`. Catálogo TC ampliado en [`../05_nfr/NFR_ISO25010.md`](../05_nfr/NFR_ISO25010.md) §5.*

---

## 4. User stories → casos de uso

| PRD-US | Descripción (historia) | FSD-UC | Descripción (caso de uso) | TC | Gherkin PRD | Release |
|--------|------------------------|--------|---------------------------|-----|-------------|---------|
| PRD-US-001 | Inicio de sesión con correo UMSS según rol | UC-001 | Autenticación y sesión | TC-01 Login exitoso | Sí | P1 |
| PRD-US-002 | [JD] crea usuarios y asigna roles | UC-002 | Gestión de usuarios [JD] | TC-02 Alta/revocación usuarios | Sí | P1 |
| PRD-US-003 | Sistema rechaza acciones sin sesión válida | UC-001 | Autenticación y sesión | TC-01b · TC-SAD-005 Sin sesión 401 | Sí | P1 |
| PRD-US-004 | [CC]/[TD] busca Evidencia por carrera, Fase, Indicador | UC-007 | Buscar Evidencia | TC-14 Búsqueda ≤2 min | Sí | P1 |
| PRD-US-005 | [CC] carga Evidencia vinculada a Indicador | UC-004 | Cargar Evidencia | TC-04 Carga exitosa | Sí | P1 |
| PRD-US-006 | [CC] subsana tras observación (versión enlazada) | UC-006 | Subsanar Evidencia | TC-06 Subsanación | Sí | P1 |
| PRD-US-007 | [CC]/[TD] ve historial de versiones | UC-005 | Versionado append-only | TC-05 Historial versiones | Sí | P1 |
| PRD-US-008 | Bloqueo eliminación Evidencia aprobada (append-only) | UC-005 | Versionado append-only | TC-05b · TC-SAD-001 DELETE bloqueado | Sí | P1 |
| PRD-US-009 | [TD] rechaza Indicador con justificación obligatoria | UC-008 | Rechazar Indicador | TC-07 · TC-SAD-003 Sin justificación | Sí (sad) | P1 |
| PRD-US-010 | [TD] aprueba Indicador | UC-009 | Aprobar Indicador | TC-07b Aprobación | Sí | P1 |
| PRD-US-011 | [TD] autoriza avance Fase solo si indicadores resueltos | UC-010 | Avanzar/cerrar Fase | TC-08 · TC-SAD-002 Cierre bloqueado | Sí (sad) | P1 |
| PRD-US-012 | [CC] dashboard de carrera con fases y observaciones | UC-011 | Dashboard [CC] y observaciones | TC-09a Dashboard CC | Sí | P1 |
| PRD-US-013 | [JD] panel semáforo por carrera y facultad | UC-013 | Panel semáforo [JD] | TC-09 Semáforo ejecutivo | Sí | P1 |
| PRD-US-014 | [TD] filtra bandeja por carrera, Fase, estado | UC-012 | Bandeja auditoría [TD] | TC-09b Bandeja TD | Sí | P1 |
| PRD-US-015 | [CC] ve observaciones abiertas ordenadas por plazo | UC-011 | Dashboard [CC] y observaciones | TC-09c Observaciones abiertas | Sí | P1 |
| PRD-US-016 | [P] consulta estado de acreditación sin login | UC-016 | Portal público | TC-PUB Sin borradores | Sí | P2 |
| PRD-US-017 | [CC] notificación aprobación/rechazo Indicador | UC-015 | Notificaciones y alertas | TC-10a Notif. aprob/rechazo | Sí | P1 |
| PRD-US-018 | [CC] alertas de plazos próximos | UC-015 | Notificaciones y alertas | TC-10b Alerta plazo | Sí | P1 |
| PRD-US-019 | [TD] notificación nueva Evidencia cargada | UC-015 | Notificaciones y alertas | TC-10c Nueva evidencia TD | Sí | P1 |
| PRD-US-020 | [P] descarga certificado publicado por [JD] | UC-016 | Portal público | TC-PUB2 Certificado | Sí | P3 |
| PRD-US-021 | [JD] genera reporte ejecutivo PDF en ≤2 clics | UC-014 | Reporte ejecutivo PDF | TC-11 PDF P95 | Sí | P1 |
| PRD-US-022 | [JD] consulta bitácora de auditoría exportable | UC-017 | Bitácora de auditoría | TC-12 Bitácora | Sí | P1 |
| PRD-US-023 | [JD] configura plantillas CEUB/ARCU-SUR | UC-003 | Plantillas y Proceso | TC-03 Plantilla CEUB | Sí | P1 |
| PRD-US-024 | [CC] importa actividades/evidencias desde planilla | UC-018 | Importación masiva | TC-15 Importación CSV | Sí | P2 |
| PRD-US-025 | [CC] barra de progreso en cargas pesadas | UC-004 | Cargar Evidencia | TC-04b Progreso >5 MB | Sí | P2 |

**Cobertura:** 25/25 US → UC (100 %). Gherkin: 25/25 en `docs/03_prd/PRD.md` §5 y [`docs/04_fsd/gherkin.md`](../04_fsd/gherkin.md).

---

## 5. Objetivos BRD → KPI → UC

| BRD-OBJ | Descripción (objetivo) | BRD-KPI | Descripción (métrica) | FSD-UC | Descripción (UC) |
|---------|------------------------|---------|----------------------|--------|------------------|
| BRD-OBJ-01 | Reducir tiempo de localización de Evidencia | BRD-KPI-01 | Tiempo localización Evidencia (≤2 min) | UC-007 | Buscar Evidencia |
| BRD-OBJ-02 | Eliminar pérdida de Evidencia en procesos SIGESA | BRD-KPI-06 | Incidentes pérdida/versión incorrecta (0 críticos) | UC-008 · UC-015 | Rechazar Indicador · Notificaciones |
| BRD-OBJ-03 | Mejorar cumplimiento de hitos de Fase | BRD-KPI-03 | Cumplimiento hitos Fase en fecha (+20 pp) | UC-010 · UC-015 | Avanzar/cerrar Fase · Notificaciones |
| BRD-OBJ-04 | Trazabilidad completa Proceso→Indicador→Evidencia | BRD-KPI-07 | % fases con trazabilidad completa (100 %) | UC-005 · UC-006 | Versionado · Subsanar Evidencia |
| BRD-OBJ-06 | Automatizar reporte ejecutivo estándar | BRD-KPI-04 | Tiempo generación reporte P95 (≤5 min) | UC-014 | Reporte ejecutivo PDF |
| BRD-OBJ-07 | Adopción activa actores clave | BRD-KPI-05 | Adopción actores (% ≥80) | UC-001 · UC-011 | Autenticación · Dashboard [CC] |

---

## 6. Componentes y ADR

| MOD | Descripción (módulo) | FSD-UC | ADR | Descripción (ADR) |
|-----|------------------------|--------|-----|-------------------|
| MOD-AUTH | Identidad, sesión y RBAC | UC-001 Autenticación · UC-002 Gestión usuarios | ADR-0003, ADR-0007 | Adapter auth local→LDAP; JWT + RBAC |
| MOD-PROCESS | Proceso, plantillas CEUB/ARCU-SUR, taxonomía | UC-003 Plantillas y Proceso | ADR-0002, ADR-0008 | Monolito modular; taxonomías en BD |
| MOD-EVIDENCE | Carga, versionado, búsqueda, importación | UC-004–007 · UC-018 | ADR-0001, ADR-0004 | Versiones append-only; blobs Docker |
| MOD-WORKFLOW | Validación [TD], estados, observaciones, fases | UC-008–010 | — | — |
| MOD-DASH | Dashboard [CC], bandeja [TD], semáforo [JD] | UC-011–013 | — | — |
| MOD-NOTIFY | Alertas y notificaciones correo UMSS | UC-015 | — | — |
| MOD-REPORT | Reportes ejecutivos y exportación | UC-014 | — | — |
| MOD-PUBLIC | Portal transparencia y certificados [P] | UC-016 | — | — |
| MOD-AUDIT | Bitácora de auditoría inmutable | UC-017 | ADR-0005 | Log append-only PostgreSQL |
| MOD-OPS | Respaldo, despliegue y operaciones (DTI) | PRD-REQ-021 Respaldo diario | ADR-0006, ADR-0009 | PostgreSQL 16; runtime Node/Express |

| Artefacto | Ruta |
|-----------|------|
| Modelo físico | [`../05_dti/modelo_datos.md`](../05_dti/modelo_datos.md) |
| DDL | [`../05_dti/ddl_sigesa_append_only.sql`](../05_dti/ddl_sigesa_append_only.sql) |

---

## 7. Catálogo NFR (referencia rápida)

| NFR | Descripción |
|-----|-------------|
| NFR-001 | Latencia API lecturas frecuentes (p95 < 500 ms) |
| NFR-002 | Tarea E2E localizar y abrir Evidencia (≤ 2 min) |
| NFR-003 | Generación reporte PDF ejecutivo (P95 ≤ 5 min) |
| NFR-004 | Notificación evento crítico (≤ 15 min) |
| NFR-005 | Uptime servicio piloto (≥ 99 %) |
| NFR-006 | TLS en tránsito (TLS 1.2+) |
| NFR-007 | Cifrado en reposo blobs Evidencia (AES-256) |
| NFR-008 | RBAC en endpoints sensibles (100 %) |
| NFR-009 | Aislamiento datos [CC] por carrera (0 incidentes) |
| NFR-010 | Validación formularios críticos (100 % campos) |
| NFR-011 | Barra progreso cargas > 5 MB (100 % UI) |
| NFR-012 | WCAG 2.2 AA componentes críticos (0 críticos) |
| NFR-013 | Navegadores Chrome, Firefox, Edge (últ. 2) |
| NFR-014 | Trazabilidad tests ↔ PRD-US / FSD-UC (100 % Must) |
| NFR-015 | Respaldo diario + restore trimestral |
| NFR-016 | No-ERP: sin módulos SIIS/RRHH en v1 |
| NFR-017 | Append-only: rechazo DELETE Evidencia aprobada |
| NFR-018 | Máquina de estados: sin saltos ilegales |

Fuente completa: [`../05_nfr/NFR_ISO25010.md`](../05_nfr/NFR_ISO25010.md).

---

## 8. Alineación Golden Folder (`docs/`)

Cadena documental verificada contra la pirámide Dorada del repositorio (post-consolidación 2026-05-17).

| Carpeta | Contenido | Enlace trazabilidad | IDs / artefactos |
|---------|-----------|---------------------|------------------|
| `docs/01_brd/` | BRD institucional | BRD-REQ-001…026, BRD-OBJ-01…07 | Negocio |
| `docs/02_mrd/` | MRD mercado | MRD-N-01…22 | Mercado |
| `docs/03_prd/` | PRD + journeys + roadmap | PRD-REQ-001…028, PRD-US-001…025 | Producto |
| `docs/04_fsd/` | FSD descompuesto | FSD-UC-001…018, FSD-BR-01…18 | Funcional |
| `docs/05_dti/` | DTI + ADRs numerados | ADR_001…009, MOD-* | Técnico |
| `docs/05_nfr/` | NFR ISO 25010 | NFR-001…018 | Calidad |
| `docs/06_prompt_contracts/` | Catálogo PCs consolidado | 58 contratos (SDLC, IA runtime, NFR verify) | AI-SDLC |
| `docs/07_diagramas/` | Mermaid canónico | 92 entradas `.mmd` (vistas por capa en `*/07_diagramas/`) | Visual |
| `docs/08_agents/` | Manifiesto agéntico | 8 skills, 5 rules `.mdc` | Gobernanza |
| `docs/09_trazabilidad/` | Este paquete | Matriz, métricas, informe | Auditoría |

**Coherencia FSD:** `docs/04_fsd/casos_uso.md` define 18 UC; `docs/04_fsd/gherkin.md` declara cobertura 18/18 UC y 24/24 US en PRD (matriz extiende a 25 US incluyendo bloques §5 del PRD). Diagramas UC enlazados vía [`docs/04_fsd/07_diagramas/`](../04_fsd/07_diagramas/README.md) → [`../07_diagramas/`](../07_diagramas/README.md).

---

## 9. Registro de cambios

| Versión | Timestamp | Cambio |
|---------|-----------|--------|
| Dorada v1.0 | 2026-05-16T15:51:39-04:00 | Matriz inicial |
| Dorada v1.1 | 2026-05-16T16:22:00-04:00 | Auditoría: matriz PRD-REQ, IDs normalizados, ADR/NFR/TC |
| Dorada v1.2 | 2026-05-16T16:30:00-04:00 | Q-01…Q-04: BRD-REQ-026, ADR-0003, 5 MB, responsive |
| Dorada v1.3 | 2026-05-16T18:00:00-04:00 | Columnas Descripción en matrices; catálogo NFR resumido |
| Dorada v1.4 | 2026-05-16T20:00:00-04:00 | Carpeta canónica `docs/09_trazabilidad/`; validación bidireccional sin ERROR |
| **Dorada v1.5** | 2026-05-17T18:00:00-04:00 | Golden Folder 06–08; enlaces relativos corregidos; US 25/25 |
