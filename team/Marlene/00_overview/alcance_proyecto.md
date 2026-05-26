# Alcance del proyecto — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Ubicación** | `team/Marlene/00_overview/alcance_proyecto.md` |
| **Documentos relacionados** | `README.md` (overview) · `02_vision_negocio_v2.md` · `03_prd/PRD.md` · `04_fsd/FSD.md` · `10_aportes/release-1.0.0.md` |

---

## 1. Propósito de este documento

Define los **límites del proyecto** SIGESA en dos dimensiones complementarias:

| Dimensión | Qué delimita |
|-----------|--------------|
| **A — Producto digital** | Capacidades del sistema web que la UMSS operará (contrato con DUEA) |
| **B — Paquete documental** | Artefactos en `team/Marlene/` y gobernanza AI-SDLC en `sigesa-docs` |

Evita ambigüedad entre “especificar” y “implementar”, y entre v1.0 de **documentación** y v1.0 de **software en producción**.

---

## 2. Contexto y objetivo del proyecto

### 2.1 Problema que aborda SIGESA

La acreditación de carreras (CEUB / ARCU-SUR) en la UMSS depende hoy de canales dispersos (correo, Excel, almacenamiento informal), lo que genera:

- Evidencias sin vínculo claro al indicador normativo.
- Observaciones del [TD] desemparejadas de las correcciones del [CC].
- Poca visibilidad gerencial del avance real por carrera/facultad.
- Riesgo reputacional y de cumplimiento en auditorías externas.

### 2.2 Objetivo general

Implementar una **plataforma web institucional** que sea la **fuente única de verdad** para evidencias, dictámenes técnicos, reporting interno y consulta pública controlada, con **trazabilidad auditable** y **supervisión humana** en decisiones críticas.

### 2.3 Objetivos medibles (SMART — resumen)

| ID | Objetivo | Indicador orientativo |
|----|----------|------------------------|
| OBJ-P1 | Reducir tiempo de localización de evidencia vigente | De >20 min a <5 min (UAT) |
| OBJ-P2 | Trazabilidad de dictámenes [TD] | 100 % acciones críticas en log (NFR-013) |
| OBJ-P3 | Visibilidad [JD] | Dashboard ≤ 2 min experiencia; PDF ≤ 5 min |
| OBJ-P4 | Transparencia controlada | Solo datos publicados por [JD] en portal |
| OBJ-D1 | Línea base documental trazable | Matriz E2E + UC-001…012 especificados |

Detalle: `03_prd/PRD.md` §3 y §14.

---

## 3. Dimensión A — Alcance del producto digital

### 3.1 Dentro del alcance v1.0 (Must / Should)

| # | Capacidad | Actor principal | FSD-UC | Prioridad |
|---|-----------|-----------------|--------|-----------|
| 1 | Autenticación dominio `@umss.edu.bo`, JWT, RBAC | Todos internos | UC-001 | P0 |
| 2 | Administración usuarios y asignación [CC] ↔ carrera | [JD] | UC-001 | P0 |
| 3 | Proceso acreditación CEUB/ARCU-SUR por carrera y gestión | [JD] | UC-010 | P1 |
| 4 | Plantillas: fases, subfases, indicadores (taxonomía T-012) | [JD] | UC-010 | P1 |
| 5 | Carga y **versionado** de evidencias por indicador | [CC] | UC-002 | P0 |
| 6 | Dictamen [TD]: aprobar/rechazar con justificación | [TD] | UC-003 | P0 |
| 7 | Avance de subfase con validación RB-03 / BR-014 | [TD] | UC-003 | P0 |
| 8 | Dashboard semáforos y filtros facultad/carrera | [JD] | UC-004 | P0 |
| 9 | Reporte ejecutivo PDF uso interno | [JD] | UC-005 | P0 |
| 10 | Notificaciones SMTP (carga, dictamen, plazos) | Sistema | UC-006 | P0 |
| 11 | Buscador global documentos/metadatos | [TD], [JD] | UC-007 | P0 |
| 12 | Log de auditoría consultable | [JD] | UC-009 | P0 |
| 13 | Portal público estado acreditación (alcance publicado) | [P] | UC-008 | P1 |
| 14 | Supervisión respaldos automáticos | [JD] | UC-011 | P0 |
| 15 | Plan de mejora vinculado a indicador | [CC], [TD] | UC-012 | P1 |

**Reglas de negocio ineludibles en v1:** RB-01 … RB-12, BR-013 … BR-015 (`04_fsd/reglas_negocio.md`).

**Integraciones incluidas en diseño v1:**

| Integración | Alcance |
|-------------|---------|
| SMTP institucional UMSS | Envío notificaciones (cola outbox) |
| Almacenamiento objeto S3-compatible | Binarios evidencia y PDF temporales |
| PostgreSQL | Datos transaccionales y auditoría |

### 3.2 Fuera del alcance v1.0 (Won’t / diferido)

| # | Exclusión | Motivo | Horizonte |
|---|-----------|--------|-----------|
| E1 | Integración **tiempo real** SIIS / RRHH / ERP | Complejidad institucional; datos maestros manuales o batch | v2.0+ |
| E2 | Single Sign-On institucional (sustituto completo JWT) | Evaluación técnica DTI pendiente | v1.1 / v2 |
| E3 | **IA autónoma** (aprobación/rechazo sin [TD]) | RB-11; riesgo normativo | v2 bajo DPIA |
| E4 | Clasificación automática de evidencias (ML) | Feature flag; golden set | v2 |
| E5 | Pagos en línea, facturación | No es dominio DUEA | — |
| E6 | Rankings internacionales (QS, THE, etc.) | Fuera misión institucional | — |
| E7 | Data warehouse / BI analítico avanzado | Dashboard operativo suficiente v1 | v1.2+ |
| E8 | PII estudiantil masiva en SIGESA | Solo metadatos documentales de carrera | Política UMSS |
| E9 | App móvil nativa | Web responsive (NFR-012) | — |
| E10 | Evaluador externo [EE] con espacio propio | Rol evolutivo LFSD | v2 |
| E11 | Firma digital avanzada / QR certificados | Evolución US-017 | v1.2+ |
| E12 | Exportación Excel masiva | US-012 | v1.2 |

### 3.3 Alcance por fase de despliegue (producto)

| Fase | Alcance resumido | Criterio de salida |
|------|------------------|-------------------|
| **Fase 0 — Descubrimiento** | Datos maestros facultades/carreras; taxonomías CEUB; política SMTP | Acta datos maestros |
| **MVP / Piloto** | UC-001, 002, 003, 006 en 1–2 facultades | UAT firmado DUEA |
| **v1.0 institucional** | + UC-004, 005, 007, 009, 010, 011; portal acotado | Despliegue multi-facultad |
| **v1.1** | Portal endurecido, k6 formal, métricas HER | Post-piloto |
| **v2.0** | SIIS lectura, IA asistida gobernada, [EE] | Roadmap `03_prd/roadmap.md` |

Cronograma orientativo: `07_diagramas/gantt.mmd` (ejemplo ilustrativo).

### 3.4 Alcance no funcional (v1)

Resumen; detalle en `05_nfr/NFR_ISO25010.md`:

| Área | Compromiso v1 |
|------|----------------|
| Seguridad | TLS 1.2+, JWT, RBAC, dominio UMSS |
| Rendimiento | Buscador P95 ≤ 3 s; PDF job ≤ 5 min; notif ≤ 15 min |
| Disponibilidad | ≥ 99 % horario hábil UMSS |
| Auditoría | Log append-only; 100 % acciones críticas |
| Accesibilidad | WCAG A mínimo v1.0; AA objetivo flujos [CC] |
| Escalabilidad | API stateless; objetos en S3 |

---

## 4. Dimensión B — Alcance del paquete documental (`sigesa-docs`)

### 4.1 Dentro del alcance v1.0.0 (documentación)

| Entregable | Ubicación |
|------------|-----------|
| BRD / MRD / PRD / user stories / roadmap | `01_brd` … `03_prd` |
| FSD: UC, Gherkin, API, modelo datos, reglas | `04_fsd` |
| NFR ISO 25010 | `05_nfr` |
| Prompt contracts | `06_prompt_contracts` |
| Diagramas Mermaid (UC01–03, ER, Gantt) | `07_diagramas` |
| Agentes, skills, trazabilidad diagramas | `08_agents` |
| Matriz trazabilidad + métricas AI-SDLC | `09_trazabilidad` |
| Release notes v1.0.0 | `10_aportes` |
| Reglas dominio / código / IA | `rules/` |
| Plantillas documentales | `templates/` |

**Release documental:** `10_aportes/release-1.0.0.md` (estado **DOC_DONE**).

### 4.2 Fuera del alcance del paquete documental

| Exclusión | Nota |
|----------|------|
| Código fuente de la aplicación SIGESA | Repositorio aplicativo separado |
| Instalación en servidores UMSS | Runbooks futuros en DevOps |
| Capacitación presencial masiva [CC] | Material derivado; no curso completo |
| Traducción a otros idiomas | Español institucional v1 |
| Acta legal de acreditación CEUB | Documentos oficiales DUEA, no este repo |

### 4.3 Relación documentación ↔ implementación

```text
sigesa-docs (este repo)     →  Especifica QUÉ y CÓMO debe comportarse el sistema
repositorio aplicativo     →  Implementa según FSD + matriz + reglas
```

La **implementación** no se considera “Done” por cerrar solo la documentación; requiere TC ejecutados y UAT DUEA.

---

## 5. Actores y responsabilidades en el alcance

| Actor | Dentro de alcance | Fuera de alcance |
|-------|-------------------|------------------|
| **[CC]** | Carga, subsanación, consulta estado propia carrera | Dictamen, config global |
| **[TD]** | Dictamen, avance subfase, búsqueda | Carga en nombre de carrera ajena |
| **[JD]** | Dashboard, reportes, usuarios, procesos, publicación | Operación diaria por indicador |
| **[P]** | Lectura portal publicado | Datos internos o borradores |
| **DTI UMSS** | Infra, TLS, políticas (colaboración) | Definición normativa CEUB |
| **AcredIA** | Especificación, desarrollo, QA | Decisión institucional final acreditación |

---

## 6. Supuestos y dependencias

### 6.1 Supuestos

| ID | Supuesto |
|----|----------|
| S1 | Existencia de catálogo facultad/carrera validado por DUEA antes del MVP |
| S2 | SMTP institucional operativo con política de reintentos |
| S3 | Plantillas CEUB/ARCU-SUR versionadas y aprobadas por [JD] |
| S4 | Usuarios internos con cuenta `@umss.edu.bo` |
| S5 | Convocatorias y plazos externos registrados en `fecha_limite_externa` (RB-05) |

### 6.2 Dependencias externas

| Dependencia | Impacto si falla |
|-------------|------------------|
| `docs/LFSD.md` (normativa base) | Bloqueo validación UC |
| Política seguridad DTI | Retraso go-live |
| Calendario académico / CEUB | Priorización facultades piloto |

---

## 7. Criterios de aceptación del alcance (v1.0)

### 7.1 Producto (cuando exista código)

- [ ] FSD-UC-001 … UC-003 operativos en piloto con TC-01 … TC-08 en verde.
- [ ] Cero dictámenes persistidos sin usuario [TD] humano.
- [ ] Evidencias sin `indicador_id` rechazadas en API (BR-015).
- [ ] NFR críticos medidos en staging (NFR-001, 002, 003, 013).

### 7.2 Documentación (release 1.0.0)

- [x] Matriz trazabilidad publicada (`09_trazabilidad/matriz_trazabilidad.md`).
- [x] Métricas AI-SDLC definidas (`09_trazabilidad/metricas_ai_sdlc.md`).
- [x] Reglas `domain_rules`, `coding_rules`, `ai_rules`.
- [x] Release notes `10_aportes/release-1.0.0.md`.

---

## 8. Gestión de cambios de alcance

| Tipo de cambio | Autoridad | Artefacto a actualizar |
|----------------|-----------|------------------------|
| Nuevo UC o REQ | Comité cambio DUEA + PM | PRD, FSD, matriz, casos_uso |
| Excepción RB | [JD] + Tech Lead + ADR | `reglas_negocio.md`, código |
| Ampliación v2 (SIIS, IA) | JD sponsor | PRD roadmap, LFSD §2.2 |
| Solo documentación | Tech Lead AcredIA | Paquete Marlene + tag Git |

**Regla:** cambios que afecten C1 (dictamen, cierre subfase, portal externo, PDF externo) requieren firma explícita [JD].

---

## 9. Matriz rápida MoSCoW (producto v1)

| MoSCoW | Capacidades |
|--------|-------------|
| **Must** | Ítems 1–12 de §3.1 (excepto portal si política difiere) |
| **Should** | Portal público, plan de mejora, plantillas avanzadas |
| **Could** | Excel, rol [DC] lectura, certificado QR |
| **Won’t** | §3.2 E1–E12 |

---

## 10. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Alcance unificado producto + paquete documental Marlene |

---

*Visión: `02_vision_negocio_v2.md`. Contrato de backlog: `03_prd/PRD.md` §7. Especificación técnica: `04_fsd/FSD.md` §4.*
