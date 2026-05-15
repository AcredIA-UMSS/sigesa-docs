# AGENTS.md — Arquitectura de agentes IA y operación AI-SDLC

## SIGESA / AcredIA · Universidad Mayor de San Simón (UMSS)

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.1 |
| **Fecha** | 15/05/2026 |
| **Documentos canónicos** | `docs/LFSD.md`, `matriz_trazabilidad.md`, `metricas_ai_sdlc.md`, `08_mermaid/ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md` |
| **Audiencia** | Analistas, arquitectos, desarrolladores, QA, DevOps, oficiales de cumplimiento, DUEA |

---

## 1. Propósito

Definir el ecosistema de agentes de IA que soporta el ciclo de vida SIGESA, asegurando que la automatización coopere con la trazabilidad normativa, la inmutabilidad de la evidencia y la supervisión humana.

Este manifiesto documenta las skills activas y las reglas globales que se encuentran físicamente en `.claude/skills/` y `.claude/rules/` (copias en `.cursor/rules/`).

---

## 2. Arquitectura de agentes (vista lógica)

```mermaid
flowchart TD
  HS["Humano sponsor\n(JD / DUEA)"]
  PA[@ProductAgent<br/>(BRD/MRD)]
  AA[@ArchAgent<br/>(DTI/NFR)]
  DB[@DBAgent<br/>(BD/DDL)]
  QA[@QaAgent<br/>(trazabilidad)]
  VA[@VisualAgent<br/>(diagrams)]
  GR[/Guardrails globales/]

  HS -->|políticas / aprobación release| PA
  PA <--> AA
  PA --> DB
  AA --> QA
  QA --> DB
  VA --> AA
  GR -.-> PA
  GR -.-> AA
  GR -.-> QA
```

**Principio:** ningún agente persiste dictámenes de acreditación ni modifica evidencias aprobadas sin flujo humano explícito (`RB-02`, `RB-04`, `RB-07`).

---

## 3. Roles de agentes IA

| Agente | Rol principal | Responsabilidades | Límites (no hacer) |
|--------|---------------|-------------------|---------------------|
| **@ProductAgent** | Product Manager / UX | Generación de BRD/MRD, definición de objetivos, mapeo de necesidades | No diseñar la arquitectura técnica final |
| **@ArchAgent** | Arquitectura técnica | Generación de ADR/DTI, NFRs, contratos API, modelado de dominio | No aprobar entregas sin validación QA |
| **@DBAgent** | Arquitecto de datos | Esquemas append-only, integridad referencial, versionado de evidencias | No proponer eliminaciones físicas de evidencia |
| **@QaAgent** | Auditor de trazabilidad | Matriz de trazabilidad, cobertura PRD→FSD, detección de huérfanos | No aprobar release productivo |
| **@VisualAgent** | Arquitecto visual | Diagramas Mermaid, flujos y modelos claros | No generar diagramas sin fuente de negocio o contexto válido |

---

## 4. Catálogo de Skills Activas

| Nombre de la Skill | Agente Responsable | Archivos que genera / afecta | Triggers (Cuándo se usa) |
|--------------------|--------------------|------------------------------|-------------------------|
| `sigesa-generacion-documentos-negocio` | @ProductAgent | `BRD.md`, `MRD.md`, `team/*/docs/01_brd/`, `team/*/docs/02_mrd/` | Inicia o amplía el análisis de negocio y requisitos. |
| `sigesa-generacion-documentos-tecnicos` | @ArchAgent | `docs/04_fsd/`, `docs/adr/`, `docs/05_dti/` | Generar ADR/DTI y documentación técnica tras aprobación del negocio. |
| `sigesa-arquitectura-tecnica-ia` | @ArchAgent | `NFR_ISO25010.md`, `DTI.md`, `ADR_*.md`, diagramas Mermaid | Diseñar arquitectura, NFRs y modelos de datos técnicos. |
| `sigesa-api-contract-designer` | @ArchAgent | `openapi.yaml`, `schema.graphql`, `diagram.md` | Generar contratos API seguros con RBAC y transiciones de estado. |
| `sigesa-db-architect-append-only` | @DBAgent | `ddl_sigesa_append_only.sql`, `models.py`, `diagram.md` | Definir esquemas SQL/ORM y políticas append-only para evidencias. |
| `sigesa-auditor-trazabilidad-dti` | @QaAgent | `matriz_trazabilidad.md`, `docs/05_dti/DTI.md`, `report_findings.md` | Auditar trazabilidad PRD→FSD y compilar el DTI maestro. |
| `mermaid-expert-architect` | @VisualAgent | Markdown con diagramas Mermaid en `docs/`, `team/*/docs/` | Generar diagramas de flujo, secuencia y ER para documentación. |

---

## 5. Reglas Globales de Entorno

Estas reglas se han detectado físicamente en `.claude/rules/` y `.cursor/rules/`.

| Regla | Propósito | Protección que aporta |
|-------|----------|----------------------|
| `01_domain_language` | Forzar el uso del lenguaje institucional SIGESA | Consistencia terminológica en documentos y código (Evidencia, Fase, Indicador, roles DUEA). |
| `02_session_prompt_logging` | Registro de prompts de usuario en `team/<usuario>/log_interno.md` | Auditoría de interacción IA/humano y preservación de historial append-only. |
| `03_sigesa_doc_orchestrator` | Orquestar creación/revisión de artefactos en `team/*/docs` | Evita escribir artefactos de entregables en la raíz y obliga discovery previo. |
| `04_sigesa_qa_gherkin_coverage` | Exigir que el código se base en criterios Gherkin del PRD/FSD | Prevenir generación de código sin pruebas automatizadas BDD y garantizar cobertura de caminos felices y tristes. |

---

## 6. Visión General del AI-SDLC

El ecosistema IA de SIGESA se orienta a acelerar el desarrollo sin comprometer los requerimientos regulatorios de UMSS / CEUB / ARCU-SUR.

- La IA automatiza generación de artefactos de negocio, diseño técnico y trazabilidad, pero no sustituye la validación humana.
- La protección de evidencia se asegura mediante reglas de append-only y modelos de datos que evitan `DELETE` en entidades críticas.
- Los contratos API y la máquina de estados se mantienen vinculados a roles claros: `[CC]`, `[TD]`, `[JD]`.
- La trazabilidad completa es un criterio de calidad: cada entrega debe enlazar un ID de negocio con un caso de uso, un ADR y un NFR cuando aplica.

---

## 7. Workflow de Interacción

```mermaid
flowchart TD
  Req[Requerimiento de negocio] -->|BRD / MRD| Prod[@ProductAgent]
  Prod -->|Contexto + Glosario| BizDocs[Documentos de Negocio]
  BizDocs -->|Aprobación| Arch[@ArchAgent]
  Arch -->|DTI / ADR / NFR / API| TechDocs[Documentación Técnica]
  TechDocs -->|Auditoría| QA[@QaAgent]
  QA -->|Matriz de trazabilidad| Trace[matriz_trazabilidad.md]
  Visual[@VisualAgent] -->|Diagramas Mermaid| TechDocs
  RuleGuard[Reglas Globales] -.-> Product
  RuleGuard -.-> Arch
  RuleGuard -.-> QA
```

---

## 8. Políticas de seguridad

| Política | Descripción |
|----------|-------------|
| **P-S01** | Sin secretos en prompts, reglas o issues públicos. |
| **P-S02** | JWT y datos personales mínimos en contexto del agente. |
| **P-S03** | Dependencias IA escaneadas en CI (véase `M-AI-011`). |
| **P-S04** | Entornos `prod` y `staging` con IAM distintos; agentes sin acceso directo `prod` DB. |

## 9. Privacidad

- Datos de carrera y documentos son **institucionales sensibles**: minimizar contenido en logs de terceros.  
- Portal público solo expone lo definido por JD (`RB-07`, alcance LFSD §2.1).  
- Cualquier uso de modelo cloud: revisión de **DPIA** institucional UMSS antes de tráfico de datos identificables.

## 10. Trazabilidad y explainability

- Toda sugerencia IA persistida: `prompt_hash`, `model_id`, `trace_id`, autor humano que aceptó/rechazó.  
- Explicaciones cortas obligatorias (`M-AI-013`).  
- Correlación con `matriz_trazabilidad.md` (IDs PRD-REQ, FSD-UC).

## 11. Auditoría

- Eventos de aceptación/rechazo de sugerencias IA en misma tabla append-only que acciones humanas (conceptualmente alineado `NFR-013`).  
- Revisiones trimestrales conjuntas DUEA + AcredIA con muestreo HER.

## 12. Gestión de riesgos (IA)

| Riesgo | Control |
|--------|---------|
| Alucinación normativa | Golden set + RAG corpus aprobado |
| Automatismo indebido | RB-11 + transiciones de estado solo con rol humano |
| Fuga de datos | P-S01–P04 + kill-switch feature flag |

---

## 13. Observaciones de cumplimiento

- Se han encontrado **7 skills activas** en `.claude/skills/`.
- Se han encontrado **4 reglas globales** en `.claude/rules/` y `.cursor/rules/`.
- El documento refleja la separación de responsabilidades y las guardrails necesarias para sostener un AI-SDLC maduro.

---

## 14. Referencias canónicas

- `docs/LFSD.md`
- `matriz_trazabilidad.md`
- `metricas_ai_sdlc.md`
- `08_mermaid/ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md`
