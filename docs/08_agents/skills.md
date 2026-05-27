# Catálogo de skills — SIGESA / AcredIA

| Metadato | Valor |
|----------|-------|
| **Versión** | Dorada v1.2 |
| **Fecha** | 2026-05-27 |
| **Ubicación física** | `.cursor/skills/<nombre>/SKILL.md` |
| **Manifiesto** | [`AGENTS.md`](AGENTS.md) |

Este catálogo refleja el inventario **verificado en disco** (12 skills con `SKILL.md` en `.cursor/skills/`). La descripción completa de cada skill está en su archivo fuente; aquí se documentan agente, triggers y entregables para orquestación UMSS.

---

## 1. `sigesa-generacion-documentos-negocio`

| Campo | Valor |
|-------|-------|
| **Agente** | @ProductAgent |
| **Ruta** | [`.cursor/skills/sigesa-generacion-documentos-negocio/SKILL.md`](../../.cursor/skills/sigesa-generacion-documentos-negocio/SKILL.md) |
| **Triggers** | Crear o auditar `BRD.md`, `MRD.md` bajo `team/*/docs/01_brd/`, `02_mrd/` o promover a `docs/01_brd/`, `docs/02_mrd/` |
| **Entregables** | BRD con objetivos SMART, stakeholders, KPIs; MRD con segmentos y trazabilidad hacia PRD |
| **Protección** | Impide mezclar código técnico; fuerza glosario (Fase, Evidencia, [CC]/[TD]/[JD]) |

---

## 2. `sigesa-generacion-documentos-tecnicos`

| Campo | Valor |
|-------|-------|
| **Agente** | @ArchAgent |
| **Ruta** | [`.cursor/skills/sigesa-generacion-documentos-tecnicos/SKILL.md`](../../.cursor/skills/sigesa-generacion-documentos-tecnicos/SKILL.md) |
| **Triggers** | Tras aprobación de negocio; pedidos de ADR, DTI, descomposición FSD |
| **Entregables** | `docs/05_dti/`, `docs/adr/`, artefactos técnicos alineados a append-only |
| **Protección** | Evalúa impacto antes de proponer patrones que violen máquina de estados |
| **Skill asociada** | [`sigesa-dti-author`](#9-sigesa-dti-author) — poblar secciones del DTI canónico |

---

## 3. `sigesa-arquitectura-tecnica-ia`

| Campo | Valor |
|-------|-------|
| **Agente** | @ArchAgent |
| **Ruta** | [`.cursor/skills/sigesa-arquitectura-tecnica-ia/SKILL.md`](../../.cursor/skills/sigesa-arquitectura-tecnica-ia/SKILL.md) |
| **Triggers** | Diseño de arquitectura, NFR, ER, ADRs, integración IA en producto |
| **Entregables** | `docs/05_nfr/NFR_ISO25010.md`, `docs/05_dti/DTI.md`, diagramas en `docs/07_diagramas/` |
| **Protección** | Prioriza monolito modular frente a microservicios prematuros; append-only en Evidencia |

---

## 4. `sigesa-api-contract-designer`

| Campo | Valor |
|-------|-------|
| **Agente** | @ArchAgent |
| **Ruta** | [`.cursor/skills/sigesa-api-contract-designer/SKILL.md`](../../.cursor/skills/sigesa-api-contract-designer/SKILL.md) |
| **Triggers** | Definir o revisar contratos REST/GraphQL, RBAC, transiciones de Indicador |
| **Entregables** | `docs/04_fsd/api_contracts.md`, OpenAPI futuro en DTI |
| **Protección** | DELETE en Evidencia aprobada modelado como 409; endpoints semánticos de workflow |

---

## 5. `sigesa-db-architect-append-only`

| Campo | Valor |
|-------|-------|
| **Agente** | @DBAgent |
| **Ruta** | [`.cursor/skills/sigesa-db-architect-append-only/SKILL.md`](../../.cursor/skills/sigesa-db-architect-append-only/SKILL.md) |
| **Triggers** | DDL, ER físico, modelos ORM, políticas de versionado de Evidencia |
| **Entregables** | `docs/05_dti/ddl_sigesa_append_only.sql`, ER Mermaid |
| **Protección** | Rechaza `is_deleted` y columnas basura (`Unnamed: 0`, `gtin`) en esquemas normativos |

---

## 6. `sigesa-auditor-trazabilidad-dti`

| Campo | Valor |
|-------|-------|
| **Agente** | @QaAgent |
| **Ruta** | [`.cursor/skills/sigesa-auditor-trazabilidad-dti/SKILL.md`](../../.cursor/skills/sigesa-auditor-trazabilidad-dti/SKILL.md) |
| **Triggers** | Matriz de trazabilidad, métricas AI-SDLC, auditoría BRD→FSD, compilar DTI |
| **Entregables** | `docs/09_trazabilidad/matriz_trazabilidad.md`, `metricas_ai_sdlc.md`, `report_findings.md` |
| **Protección** | No certifica Dorado con huérfanos Must; gate ERROR en PRD-US sin FSD-UC |

---

## 7. `sigesa-auditoria-excelente-equipo`

| Campo | Valor |
|-------|-------|
| **Agente** | @QaAgent |
| **Ruta** | [`.cursor/skills/sigesa-auditoria-excelente-equipo/SKILL.md`](../../.cursor/skills/sigesa-auditoria-excelente-equipo/SKILL.md) |
| **Triggers** | Auditar `team/<integrante>/`, rúbrica Excelente, inventario APORTES, cierre de entrega curso |
| **Entregables** | `AUDITORIA_RUBRICAS_EXCELENTE.md`, `INVENTARIO_TAREAS_APORTES_v1.md` |
| **Protección** | Veredicto Excelente solo con 10/10 CUMPLE; detecta esquemas y duplicados inválidos |

---

## 8. `mermaid-expert-architect`

| Campo | Valor |
|-------|-------|
| **Agente** | @VisualAgent |
| **Ruta** | [`.cursor/skills/mermaid-expert-architect/SKILL.md`](../../.cursor/skills/mermaid-expert-architect/SKILL.md) |
| **Triggers** | Diagramas de arquitectura, secuencia, estado, ER, Gantt para documentación |
| **Entregables** | Archivos `.mmd` en `docs/07_diagramas/` (canónico) |
| **Protección** | Sintaxis Mermaid válida; alineación a UC y glosario antes de render |

---

## 9. `sigesa-dti-author`

| Campo | Valor |
|-------|-------|
| **Agente** | @ArchAgent |
| **Ruta runtime** | [`.cursor/skills/sigesa-dti-author/SKILL.md`](../../.cursor/skills/sigesa-dti-author/SKILL.md) |
| **Fuente canónica** | [`docs/05_dti/dti-author.md`](../05_dti/dti-author.md) (sincronizar con la skill de Cursor) |
| **Triggers** | Edición de `docs/05_dti/DTI.md`; invocación `@dti-author §N`; ADR nuevo que deba reflejarse en DTI + `AGENTS.md` |
| **Entregables** | Secciones §0–§21 de [`DTI.md`](../05_dti/DTI.md) según [`templates/dti.md`](../../templates/dti.md); diff atómico de `AGENTS.md` cuando aplique |
| **Protección** | Sin decisiones sin ADR; sin drift DTI↔AGENTS; ADR en `proposed` no se propaga sin confirmación humana |

---

## 10. `sigesa-frontend-engineer`

| Campo | Valor |
|-------|-------|
| **Agente** | @DevAgent |
| **Ruta** | [`.cursor/skills/sigesa-frontend-engineer/SKILL.md`](../../.cursor/skills/sigesa-frontend-engineer/SKILL.md) |
| **Triggers** | Componentes React/Next.js, hooks, servicios API, guardas RBAC, UX event-driven (React Query, WebSocket) |
| **Entregables** | Código en `app/sigesa-front/` (features, domain, shared) alineado a `docs/04_fsd/api_contracts.md` |
| **Protección** | Sin `fetch` en `.tsx`; sin DELETE/update destructivo de Evidencia; tipado estricto del dominio |

---

## 11. `sigesa-backend-engineer`

| Campo | Valor |
|-------|-------|
| **Agente** | @DevAgent |
| **Ruta** | [`.cursor/skills/sigesa-backend-engineer/SKILL.md`](../../.cursor/skills/sigesa-backend-engineer/SKILL.md) |
| **Triggers** | Controladores, casos de uso, repositorios, adaptadores AWS, handlers EventBridge/SQS, DDL/ORM backend |
| **Entregables** | Código en `app/sigesa-backend/` (hexagonal: domain, application, ports, adapters) |
| **Protección** | Lectura obligatoria de `hybrid_architecture.md` + ADRs; solo INSERT append-only; sin HTTP síncrono entre microservicios; contratos en `api_contracts_cloud.md` |

---

## 12. `sigesa-distributed-architect`

| Campo | Valor |
|-------|-------|
| **Agente** | @ArchAgent |
| **Ruta** | [`.cursor/skills/sigesa-distributed-architect/SKILL.md`](../../.cursor/skills/sigesa-distributed-architect/SKILL.md) |
| **Triggers** | ADRs CQRS, Outbox, Saga; arquitectura event-driven; consistencia eventual; integración asíncrona entre módulos |
| **Entregables** | ADRs en `docs/05_dti/adrs/`, alineación con `hybrid_architecture.md` y ADR_010 (EventBridge) |
| **Protección** | No violar append-only ni publicar patrones no respaldados por FSD/DTI |

---

## Skills documentales en `team/` (no runtime Cursor)

Inventario de apoyo por integrante (11 archivos): `team/aylenGonzales/10_agents/skills/`, `team/borisAngulo/docs/09_agents/skills/`. No sustituyen las skills de `.cursor/skills/`; se usan como plantillas de equipo hasta su promoción.

---

## Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 2026-05-17 | Catálogo inicial alineado a 8 skills en disco; alta `sigesa-auditoria-excelente-equipo` |
| v1.1 | 2026-05-17 | Alta `sigesa-dti-author`; fuente canónica en `docs/05_dti/dti-author.md` |
| v1.2 | 2026-05-27 | Alta `sigesa-frontend-engineer`, `sigesa-backend-engineer`, `sigesa-distributed-architect`; conteo 12 skills |
