# Catálogo de skills — SIGESA / AcredIA

| Metadato | Valor |
|----------|-------|
| **Versión** | Dorada v1.0 |
| **Fecha** | 2026-05-17 |
| **Ubicación física** | `.cursor/skills/<nombre>/SKILL.md` |
| **Manifiesto** | [`AGENTS.md`](AGENTS.md) |

Este catálogo refleja el inventario **verificado en disco** (8 skills con `SKILL.md`). La descripción completa de cada skill está en su archivo fuente; aquí se documentan agente, triggers y entregables para orquestación UMSS.

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

## Skills documentales en `team/` (no runtime Cursor)

Inventario de apoyo por integrante (11 archivos): `team/aylenGonzales/10_agents/skills/`, `team/borisAngulo/docs/09_agents/skills/`. No sustituyen las skills de `.cursor/skills/`; se usan como plantillas de equipo hasta su promoción.

---

## Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 2026-05-17 | Catálogo inicial alineado a 8 skills en disco; alta `sigesa-auditoria-excelente-equipo` |
