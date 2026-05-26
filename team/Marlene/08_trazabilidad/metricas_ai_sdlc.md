# Métricas AI-SDLC — `team/Marlene`

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 17/05/2026 |
| **Integrante** | Marlene |
| **Canónico institucional** | [`docs/09_trazabilidad/metricas_ai_sdlc.md`](../../../docs/09_trazabilidad/metricas_ai_sdlc.md) |

---

## Resumen de cobertura (carpeta equipo)

| Métrica | Fórmula | Valor actual | Meta rúbrica | Fuente |
|---------|---------|--------------|--------------|--------|
| `prompt_coverage` | UC con PC / total UC | **20/12** PC files + NFR PCs | ≥ 80 % | `06_prompt_contracts/` |
| `spec_fidelity` | PRD-US con FSD-UC / total PRD-US | **22 US → 12 UC** | ≥ 95 % | `03_prd/PRD.md`, `04_fsd/FSD.md` |
| `nfr_coverage` | NFR con umbral+verificación / total | **20/20** (10 ISO + 10 IA) | ≥ 80 % | `NFR.md`, `NFR_IA.md` |
| `diagram_coverage` | UC críticos con `.mmd` MAR-* | **12/12** | ≥ 10 diagramas | `07_diagramas/` |
| `inventory_tasks` | Filas inventario entregadas | **172** (v1.1) | Cuadre APORTES | `INVENTARIO_TAREAS_APORTES_v1.md` |

---

## Métricas M-AI aplicables (referencia)

| ID | Nombre | Umbral | Verificación local |
|----|--------|--------|-------------------|
| M-AI-001 | Claridad del prompt (PCI) | ≥ 80 % | PCs `PC-NFR-*` con rol, contexto, salida |
| M-AI-011 | Dependencias IA en CI | Sin CVE crítico | Política P-S03 (`08_agents/agents/AGENTS.md`) |
| M-AI-013 | Explicación corta en sugerencias | Obligatoria | `NFR_IA.md` HITL |

---

## Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 17/05/2026 | Creación para criterio rúbrica «Trazabilidad + métricas» en auditoría Excelente |
