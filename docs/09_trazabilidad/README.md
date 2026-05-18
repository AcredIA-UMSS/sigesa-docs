# Trazabilidad y métricas AI-SDLC — SIGESA

Carpeta canónica gestionada por la skill `sigesa-auditor-trazabilidad-dti`. Certifica la cadena **BRD → MRD → PRD → FSD → NFR/ADR/DTI** y la alineación con las carpetas Doradas de gobernanza IA (`docs/06`–`08`).

## Artefactos

| Archivo | Propósito | Versión actual |
|---------|-----------|----------------|
| [`matriz_trazabilidad.md`](matriz_trazabilidad.md) | Trazabilidad extremo a extremo; §8 Golden Folder | Dorada **v1.5** |
| [`metricas_ai_sdlc.md`](metricas_ai_sdlc.md) | Métricas M-RUB-PC/SF/AE e inventario AI-SDLC | **v1.2** |
| [`report_findings.md`](report_findings.md) | Hallazgos, gate duro, veredicto **APTO** / NO_APTO | **v1.4** |
| [`INVENTARIO_TAREAS_APORTES_EQUIPO.md`](INVENTARIO_TAREAS_APORTES_EQUIPO.md) | Inventario consolidado T-xxx — **965** tareas (alex 285 · aylen 260 · boris **220** · Marlene **200**) | **v1.2** |
| [`AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md`](AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md) | Comparativa rúbrica Excelente + factores APORTES | **v1.2** |
| [`../10_aportes/APORTES_RELEASE_1.0.0.md`](../10_aportes/APORTES_RELEASE_1.0.0.md) | Factores de aporte individual (§3) y reglas de conteo (§4) | **v1.2** |

## Pirámide documental (referencia rápida)

| Nivel | Carpeta | IDs principales |
|-------|---------|-----------------|
| Negocio | `docs/01_brd/` | BRD-REQ, BRD-OBJ |
| Mercado | `docs/02_mrd/` | MRD-N |
| Producto | `docs/03_prd/` | PRD-REQ, PRD-US (25) |
| Funcional | `docs/04_fsd/` | FSD-UC (18), FSD-BR |
| Técnico | `docs/05_dti/`, `docs/05_nfr/` | ADR, MOD, NFR |
| Prompts | `docs/06_prompt_contracts/` | 58 PCs |
| Diagramas | `docs/07_diagramas/` | 92 `.mmd` |
| Agentes | `docs/08_agents/` | Skills, rules, AGENTS.md |
| **Trazabilidad** | **`docs/09_trazabilidad/`** | **Este paquete** |

## Alias en raíz del repositorio

Los archivos [`../../matriz_trazabilidad.md`](../../matriz_trazabilidad.md) y [`../../metricas_ai_sdlc.md`](../../metricas_ai_sdlc.md) son punteros de compatibilidad hacia esta carpeta. La fuente de verdad para auditoría es siempre `docs/09_trazabilidad/`.

## Última auditoría

| Campo | Valor |
|-------|-------|
| Fecha | 2026-05-17 |
| Veredicto | **APTO** |
| Huérfanos Must | 0 ERROR |
| Cobertura US | 25/25 |
| Rúbrica equipo | alex **9/10** · aylen **10/10** · boris **9/10** · Marlene **10/10** |
| Inventario aportes | **965** tareas · promedio **241,25**/persona · ver [`APORTES_RELEASE_1.0.0.md`](../10_aportes/APORTES_RELEASE_1.0.0.md) §3 |
