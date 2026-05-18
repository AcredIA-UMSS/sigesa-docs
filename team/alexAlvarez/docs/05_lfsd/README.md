# LFSD — Especificación funcional ligera

| Campo | Valor |
|-------|-------|
| **Modo** | **LFSD** (Lightweight FSD) |
| **Versión** | v1.0 |
| **Autor** | Alexander James Alvarez |
| **FSD clásico (detalle)** | [`../04_fsd/FSD.md`](../04_fsd/FSD.md) |
| **Documento** | [`LFSD_v1.md`](LFSD_v1.md) |

## Relación FSD ↔ LFSD

| Capa | Carpeta | Uso |
|------|---------|-----|
| FSD clásico | `04_fsd/` | Casos de uso completos (17 UC), API, reglas, Gherkin descompuesto |
| **LFSD** | `05_lfsd/` | 7 UC críticos implementables: invariantes, failure modes, prompt-contratos, tasks |

Los IDs canónicos de implementación son **`FSD-UC-00N`**. Los IDs `UC-L0N` del LFSD son alias de lectura rápida que mapean 1:1 a esos casos.

## Referencias externas

| Fuente | Ruta |
|--------|------|
| LFSD Aylen (plantilla) | [`../../aylenGonzales/05_lfsd/LFSD_v1_aylen.md`](../../aylenGonzales/05_lfsd/LFSD_v1_aylen.md) |
| LFSD Boris | [`../../borisAngulo/docs/05_lfsd/LFSD_v1.md`](../../borisAngulo/docs/05_lfsd/LFSD_v1.md) |
| FSD Dorado repo | [`../../../../docs/04_fsd/FSD.md`](../../../../docs/04_fsd/FSD.md) |
