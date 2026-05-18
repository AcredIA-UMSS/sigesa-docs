# AGENTS.md — Arquitectura de agentes IA y operación AI-SDLC

## SIGESA / AcredIA · Universidad Mayor de San Simón (UMSS)

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Documentos canónicos** | `docs/LFSD.md`, `matriz_trazabilidad.md`, `metricas_ai_sdlc.md`, `08_mermaid/ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md` |
| **Audiencia** | Analistas, arquitectos, desarrolladores, QA, DevOps, oficiales de cumplimiento, DUEA |

---

## 1. Propósito

Definir cómo los **agentes de IA** (Cursor Agent, asistentes en CI, revisores automáticos) colaboran con equipos humanos en el ciclo de vida de **SIGESA**, preservando **trazabilidad**, **seguridad**, **calidad normativa** (CEUB / ARCU-SUR) y **supervisión humana** en línea con `RB-11` y el plan de pruebas del LFSD.

---

## 2. Arquitectura de agentes (vista lógica)

```text
                    ┌─────────────────────┐
                    │   Humano sponsor    │
                    │   (JD / DUEA)       │
                    └──────────┬──────────┘
                               │ políticas / aprobación release
                               ▼
┌──────────────┐     orquestación      ┌──────────────┐
│ @ProductAgent│◄──────────────────────►│ @ArchAgent   │
│ (PRD, UX)    │                       │ (FSD, NFR)   │
└──────┬───────┘                       └──────┬───────┘
       │                                      │
       │         ┌────────────────────────────┤
       ▼         ▼                            ▼
┌──────────────┐     ┌──────────────┐   ┌──────────────┐
│ @DevAgent    │◄───►│ @QaAgent      │◄─►│ @DevOpsAgent │
│ (código)     │     │ (Gherkin, TC) │   │ (CI/CD, SRE) │
└──────────────┘     └──────────────┘   └──────────────┘
       │                     │
       └──────────┬──────────┘
                  ▼
         ┌─────────────────┐
         │ Skills (§5)     │
         │ ejecutables     │
         └─────────────────┘
```

**Principio:** ningún agente **persiste** dictámenes de acreditación ni modifica evidencias aprobadas sin flujo humano explícito (`RB-02`, `RB-04`, `RB-07`).

---

## 3. Roles de agentes IA

| Agente | Rol principal | Responsabilidades | Límites (no hacer) |
|--------|---------------|-------------------|---------------------|
| **@ProductAgent** | Product Manager / UX | Priorización, INVEST stories, alineación BRD/PRD, criterios de aceptación | No definir esquema BD definitivo sin @ArchAgent |
| **@ArchAgent** | Arquitectura software | ADR, APIs lógicas, NFR ISO 25010, diagramas Mermaid, modelo datos | No merge a `main`; no credenciales |
| **@DevAgent** | Implementación | Código según LFSD, tests, contratos API | No “inventar” reglas CEUB no documentadas |
| **@QaAgent** | Calidad / trazabilidad | Gherkin, casos TC-xxx, cobertura, matrices | No aprobar release productivo |
| **@DevOpsAgent** | Plataforma | Pipelines, observabilidad, secretos, IaC | No exponer keys en logs o prompts |
| **@GovernanceAgent** (opcional) | Cumplimiento / IA | Checklist RB-11, DPIA ligera, revisión PII | No sustituye legal institucional |

---

## 4. Jerarquía y orquestación

| Nivel | Autoridad | Ejemplo |
|-------|-----------|---------|
| **L0** | Política institucional UMSS / DUEA | Dominio @umss.edu.bo (`RB-06`) |
| **L1** | Jefatura DUEA ([JD]) | Autorización distribución externa reportes (`RB-07`) |
| **L2** | Tech Lead AcredIA | Merge, excepciones técnicas documentadas (ADR) |
| **L3** | Agentes IA | Borradores, sugerencias, PR automáticos en rama |
| **L4** | Operación diaria [CC] / [TD] | Carga evidencia, dictamen TD |

**Orquestación recomendada (Git / Cursor):**

1. Issue o Notion task con IDs `PRD-REQ-*`, `FSD-UC-*`.  
2. `@ArchAgent` valida impacto en NFR y actualiza diagramas si aplica.  
3. `@DevAgent` implementa en feature branch; `@QaAgent` amplía Gherkin/TC.  
4. CI ejecuta tests + linters + escaneo secretos.  
5. PR con revisión humana obligatoria ([TD] o Tech Lead según criticidad `C1`).  
6. `@ProductAgent` confirma criterios de aceptación antes de squash merge.

---

## 5. Skills accionables (catálogo mínimo v1.0)

Cada skill es invocable como **instrucción explícita** a un agente (p. ej. en Cursor) y debe citar `docs/LFSD.md` cuando el dominio sea normativo.

---

### SKILL-SIG-01 — Validación de coherencia acreditación (CEUB / ARCU-SUR)

| Campo | Contenido |
|-------|-------------|
| **Objetivo** | Detectar inconsistencias entre tipo de proceso, fase y requisitos previos (p. ej. ARCU-SUR sin CEUB vigente, `RB-01`). |
| **Inputs** | `carrera_id`, `tipo_acreditacion`, `resoluciones[]`, extracto LFSD §5. |
| **Outputs** | Informe `{ ok: bool, violaciones: [{rb, mensaje, severidad}] }`. |
| **Restricciones** | No crear resoluciones ficticias; no fechas de convocatoria inventadas (`RB-05`). |
| **Validaciones** | Si `tipo=ARCU-SUR` entonces existe CEUB vigente documentado en BD. |
| **Failure modes** | Falso “ok” por datos incompletos → mitigación: estado `UNKNOWN` explícito. |
| **Métricas de calidad** | Precisión ≥ 99 % en casos sintéticos RB-01; cero falsos negativos en bloqueo. |
| **Gobernanza IA** | Salida revisada por [TD] si `severidad=C1`; log en auditoría si persiste sugerencia. |

---

### SKILL-SIG-02 — Análisis documental (evidencia vs indicador)

| Campo | Contenido |
|-------|-------------|
| **Objetivo** | Resumir si el metadato de carga (indicador, versión, hash) es coherente con plantilla de indicador. |
| **Inputs** | Metadatos `documento`, `indicador`, historial versiones, texto descriptivo CC. |
| **Outputs** | Resumen estructurado + lista de comprobaciones (`BR-015` criterio asociado). |
| **Restricciones** | No sustituir dictamen TD; no aprobar/rechazar automáticamente en v1. |
| **Validaciones** | `indicador_id` obligatorio; formato MIME permitido (`RB-02` vía sistema). |
| **Failure modes** | Alucinación de contenido PDF → mitigación: solo metadatos + OCR on-prem si política lo permite. |
| **Métricas de calidad** | M-AI-002 (precisión factual); HER (M-AI-015) monitoreado. |
| **Gobernanza IA** | RB-11: campo `rationale` obligatorio; enlace a versión documento. |

---

### SKILL-SIG-03 — Generación asistida de reportes ejecutivos

| Campo | Contenido |
|-------|-------------|
| **Objetivo** | Proponer estructura secciones PDF interno alineada `FSD-UC-005` y `RB-07`. |
| **Inputs** | Agregados dashboard (semáforos, % avance), parámetros JD, plantilla institucional. |
| **Outputs** | Outline JSON + textos borrador marcados `BORRADOR — NO DISTRIBUIR`. |
| **Restricciones** | Marca de agua uso interno; sin datos personales estudiantiles. |
| **Validaciones** | JD confirmación explícita antes de exportar fuera de DUEA. |
| **Failure modes** | Cifras desactualizadas → mitigación: timestamp `generated_at` y fuente query. |
| **Métricas de calidad** | M-AI-002; cumplimiento NFR-002 en pipeline productivo (no solo LLM). |
| **Gobernanza IA** | RB-07; registro en `LOG_AUDITORIA` al generar PDF final (humano). |

---

### SKILL-SIG-04 — Verificación normativa (checklist Must BR-013–015)

| Campo | Contenido |
|-------|-------------|
| **Objetivo** | Verificar reglas estructurales antes de cerrar subfase o proceso. |
| **Inputs** | Estado indicadores, tareas pendientes, proceso activo mismo tipo. |
| **Outputs** | `{ puede_cerrar: bool, motivos[] }`. |
| **Restricciones** | No omitir lista de indicadores pendientes (`BR-014`). |
| **Validaciones** | Todos indicadores requeridos en estado aprobado para cierre subfase (`RB-03`). |
| **Failure modes** | Lista incompleta en UI → skill debe pedir datos faltantes explícitamente. |
| **Métricas de calidad** | 0 escapes en TC-08; M-AI-005 en entradas malformadas. |
| **Gobernanza IA** | Confirmación humana [TD] obligatoria para transición de estado. |

---

### SKILL-SIG-05 — Clasificación automática de observaciones (v2 / bandera)

| Campo | Contenido |
|-------|-------------|
| **Objetivo** | Sugerir categoría de observación TD (documental, metodológica, fechas) para priorizar respuesta CC. |
| **Inputs** | Texto justificación rechazo, taxonomía DUEA aprobada. |
| **Outputs** | `{ categoria_sugerida, confianza, rationale }`. |
| **Restricciones** | Bajo feature flag; no enviar a CC sin revisión TD si `confianza < τ`. |
| **Validaciones** | τ calibrado con JD; HER monitoreado. |
| **Failure modes** | Sesgo por carrera/facultad → mitigación: auditoría per categoria por facultad. |
| **Métricas de calidad** | M-AI-007, M-AI-008; M-AI-013 explainability. |
| **Gobernanza IA** | RB-11; posibilidad de apelación humana CC→TD en UI. |

---

### SKILL-SIG-06 — Análisis de indicadores académicos (semáforo explicado)

| Campo | Contenido |
|-------|-------------|
| **Objetivo** | Explicar por qué una carrera está en rojo/amarillo/verde según `RB-09`. |
| **Inputs** | KPI agregados, pesos de criterios configurados. |
| **Outputs** | Narrativa corta + lista de top 3 cuellos de botella. |
| **Restricciones** | No modificar pesos; solo lectura. |
| **Validaciones** | Coherencia con fórmula oficial en código (fuente verdad = backend). |
| **Failure modes** | Explicación contradictoria con número → usar mismos valores API. |
| **Métricas de calidad** | Discrepancia explicación vs datos = 0 en tests de regresión. |
| **Gobernanza IA** | JD revisa antes de usar en acta externa. |

---

### SKILL-SIG-07 — Generación de observaciones sugeridas (borrador TD)

| Campo | Contenido |
|-------|-------------|
| **Objetivo** | Proponer texto borrador de observación respetuosa y accionable (`RB-10`). |
| **Inputs** | Plantilla tono institucional UMSS, hallazgos checklist SKILL-SIG-02. |
| **Outputs** | Texto marcado `BORRADOR`; requiere edición TD. |
| **Restricciones** | Sin datos personales; sin lenguaje sancionador no aprobado. |
| **Validaciones** | Longitud mín/máx; lectura Flesch en español opcional. |
| **Failure modes** | Tono inadecuado → lista negra términos; revisión JD spot-check. |
| **Métricas de calidad** | CSAT TD ≥ umbral en muestreo mensual. |
| **Gobernanza IA** | Siempre humano en el loop antes de enviar notificación a CC. |

---

## 6. Políticas de seguridad

| Política | Descripción |
|----------|-------------|
| **P-S01** | Sin secretos en prompts, reglas o issues públicos. |
| **P-S02** | JWT y datos personales mínimos en contexto del agente. |
| **P-S03** | Dependencias IA escaneadas en CI (véase `M-AI-011`). |
| **P-S04** | Entornos `prod` y `staging` con IAM distintos; agentes sin acceso directo `prod` DB. |

---

## 7. Privacidad

- Datos de carrera y documentos son **institucionales sensibles**: minimizar contenido en logs de terceros.  
- Portal público solo expone lo definido por JD (`RB-07`, alcance LFSD §2.1).  
- Cualquier uso de modelo cloud: revisión de **DPIA** institucional UMSS antes de tráfico de datos identificables.

---

## 8. Trazabilidad y explainability

- Toda sugerencia IA persistida: `prompt_hash`, `model_id`, `trace_id`, autor humano que aceptó/rechazó.  
- Explicaciones cortas obligatorias (`M-AI-013`).  
- Correlación con `matriz_trazabilidad.md` (IDs PRD-REQ, FSD-UC).

---

## 9. Auditoría

- Eventos de aceptación/rechazo de sugerencias IA en misma tabla append-only que acciones humanas (conceptualmente alineado `NFR-013`).  
- Revisiones trimestrales conjuntas DUEA + AcredIA con muestreo HER.

---

## 10. Gestión de riesgos (IA)

| Riesgo | Control |
|--------|---------|
| Alucinación normativa | Golden set + RAG corpus aprobado |
| Automatismo indebido | RB-11 + transiciones de estado solo con rol humano |
| Fuga de datos | P-S01–P04 + kill-switch feature flag |

---

## 11. Flujo operativo humano–IA

| Paso | Humano | Agente |
|------|--------|--------|
| 1 | Define alcance con IDs trazables | — |
| 2 | — | Genera borrador (código/spec) |
| 3 | Revisa diff | — |
| 4 | Aprueba o solicita cambios | Incorpora feedback |
| 5 | QA ejecuta TC / E2E | Apoya análisis fallos |
| 6 | JD/Tech Lead merge | — |

**Escalamiento de errores:** S3 fallo SMTP → `@DevOpsAgent` + runbook; incoherencia normativa → `@ProductAgent` + JD; bug crítico → rollback + postmortem en 48 h.

**Validación manual:** obligatoria `C1` (dictamen, cierre subfase, publicación portal, PDF externo).

**Controles de calidad:** PR checklist (tests, ADR si aplica, actualización `matriz_trazabilidad.md`).

---

## 12. Cursor Rules especializadas (dominio UMSS / acreditación)

Las siguientes reglas deben implementarse como archivos bajo `.cursor/rules/` (o equivalente) y **copiarse textualmente** el bloque “Regla exacta” en el cuerpo del rule file.

**Documentos consolidados (paquete Marlene):** `team/Marlene/rules/domain_rules.md` (DR-01…07) · `team/Marlene/rules/ai_rules.md` (AR-AI-01…12, HITL) · `team/Marlene/rules/coding_rules.md`.

---

### CR-SIG-01 — Consistencia criterio de acreditación ↔ evidencia

| Campo | Contenido |
|-------|-------------|
| **Nombre** | `sigesa-criterio-evidencia` |
| **Objetivo** | Garantizar que toda evidencia quede asociada a un indicador/criterio evaluable (`BR-015`) y que no se generen cargas huérfanas en documentación ni código. |
| **Regla exacta** | *Antes de proponer o fusionar cambios que afecten carga o visualización de evidencias, el agente debe verificar en `docs/LFSD.md` §4.2 y §5 que: (1) existe `indicador_id` obligatorio; (2) no se introduce eliminación física de documentos aprobados; (3) los textos de UI usan los mismos nombres de estados que el LFSD (Pendiente, En revisión, Aprobado, Rechazado). Si falta información, el agente debe detenerse y solicitarla en lugar de inventar IDs o criterios.* |
| **Ejemplo válido** | PR que añade validación `400 EVIDENCE_CRITERION_REQUIRED` citando `BR-015` en mensaje de error y test unitario. |
| **Ejemplo inválido** | PR que permite `POST /documentos` sin `indicador_id` “para prototipo”. |
| **Impacto técnico** | Contratos API y migraciones BD coherentes con modelo ER LFSD §6. |
| **Impacto funcional** | Cumplimiento auditoría CEUB y trazabilidad por criterio. |

---

### CR-SIG-02 — Trazabilidad obligatoria PRD-REQ / FSD-UC / TC

| Campo | Contenido |
|-------|-------------|
| **Nombre** | `sigesa-trazabilidad-ids` |
| **Objetivo** | Forzar que cada feature, bugfix o prompt-contrato declare IDs explícitos para mantener la matriz de trazabilidad. |
| **Regla exacta** | *Toda descripción de cambio (PR, commit convencional extendido o issue) debe incluir al menos: un `PRD-REQ-xxx` **o** `FSD-UC-xxx` afectado, y el `TC-xx` actualizado o creado cuando el cambio toque lógica de negocio. Si el agente no encuentra el ID, debe proponer actualización de `matriz_trazabilidad.md` en el mismo PR o rechazar el alcance.* |
| **Ejemplo válido** | Issue: “Ajuste rechazo TD — FSD-UC-003 — actualiza TC-07”. |
| **Ejemplo inválido** | PR: “fix stuff dashboard” sin UC ni TC. |
| **Impacto técnico** | Mejor cobertura de tests dirigidos por riesgo. |
| **Impacto funcional** | Demostrable ante DUEA qué requisito certifica cada entrega. |

---

### CR-SIG-03 — Nomenclatura institucional UMSS y roles

| Campo | Contenido |
|-------|-------------|
| **Nombre** | `sigesa-nomenclatura-umss` |
| **Objetivo** | Preservar lenguaje institucional y roles `[CC]`, `[TD]`, `[JD]`, `[P]` como en LFSD §3; evitar sinónimos confusos (“admin” por “JD”). |
| **Regla exacta** | *En textos de UI, documentación técnica y mensajes de error generados o editados por el agente: usar “DUEA”, “UMSS”, “CEUB”, “ARCU-SUR” tal como en `docs/LFSD.md` §14; referir roles con la notación entre corchetes; no renombrar actores a jerga anglosajera (“Reviewer”) en strings visibles al usuario final.* |
| **Ejemplo válido** | Mensaje: “El [TD] debe revisar la evidencia antes del cierre de subfase.” |
| **Ejemplo inválido** | Mensaje: “Admin approves your upload” en producción Bolivia. |
| **Impacto técnico** | Archivos i18n / constantes centralizadas. |
| **Impacto funcional** | Alineación con glosario aprobado y RB-10 (mensajes claros). |

---

### CR-SIG-04 — Integridad documental (sin datos sintéticos)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | `sigesa-no-datos-ficticios` |
| **Objetivo** | Evitar carreras, resoluciones CEUB o fechas de convocatoria inventadas en seeds, fixtures y ejemplos de documentación. |
| **Regla exacta** | *Prohibido introducir en el repositorio datos de ejemplo que puedan interpretarse como hechos institucionales reales (nombres de carrera, resoluciones, fechas de visita) salvo que estén marcados explícitamente como `FICTIONAL_EXAMPLE` y aprobados en el mismo PR por un humano. Para tests, usar prefijos `TEST_` y dominios `example.invalid`.* |
| **Ejemplo válido** | Fixture `carrera_nombre = "TEST_IngenieriaFicticia"` |
| **Ejemplo inválido** | “Resolución CEUB 045/2026” inventada sin etiqueta fictional. |
| **Impacto técnico** | Seeds y documentación reproducibles sin contaminación semántica. |
| **Impacto funcional** | Protección reputacional UMSS y cumplimiento ético de comunicación. |

---

## 13. Registro de cambios

| Versión | Fecha | Nota |
|---------|-------|------|
| v1.0 | 14/05/2026 | Versión inicial unificada SIGESA |

---

*Nota: existe documentación complementaria histórica en `agents/AGENTS.md`; la versión **v1.0** canónica para gobierno ampliado es este archivo en la raíz del repositorio.*
