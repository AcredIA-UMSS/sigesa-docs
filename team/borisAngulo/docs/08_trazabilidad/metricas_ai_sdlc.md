# Métricas AI-SDLC — `team/borisAngulo`

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 17/05/2026 |
| **Integrante** | borisAngulo |
| **Canónico institucional** | [`docs/09_trazabilidad/metricas_ai_sdlc.md`](../../../../docs/09_trazabilidad/metricas_ai_sdlc.md) |
| **Fuente operativa** | [`09_agents/AGENTS.md`](../09_agents/AGENTS.md) §13 · [`trazabilidad-sigesa.md`](trazabilidad-sigesa.md) §4 |

---

## Métricas de agente (valores verificados 16/05/2026)

| Métrica | Fórmula | Valor | Meta | Estado |
|---------|---------|-------|------|--------|
| `prompt_coverage` | FSD-UC con PC / total FSD-UC MVP | **100 %** (7/7 + PCs ext.) | ≥ 80 % | ✅ |
| `spec_fidelity` | PRD-REQ con FSD-UC / total PRD-REQ | **84,6 %** | ≥ 95 % | ⚠️ |
| `br_coverage` | BR con FSD-UC / total BR | **84,6 %** | ≥ 80 % | ✅ |
| `nfr_coverage` | NFR con mecanismo / total NFR | **100 %** (10/10) | ≥ 80 % | ✅ |
| `gap_ratio` | gaps abiertos / ítems trazados | **10,6 %** | < 15 % | ✅ |
| `inventory_tasks` | Filas inventario | **212** | Cuadre APORTES | ✅ |

---

## Acción para subir `spec_fidelity`

Cerrar GAP-001 y GAP-002 (US-018…021 → FSD-UC-EXT en `FSD_v1.md` §4) según `trazabilidad-sigesa.md` §6.

---

## Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 17/05/2026 | Extracción desde AGENTS §13 para auditoría Excelente |
