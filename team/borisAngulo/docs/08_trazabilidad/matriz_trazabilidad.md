# Matriz de trazabilidad — `team/borisAngulo`

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 17/05/2026 |
| **Integrante** | borisAngulo |
| **Fuente detallada** | [`trazabilidad-sigesa.md`](trazabilidad-sigesa.md) (v1.2) |
| **Matriz institucional** | [`docs/09_trazabilidad/matriz_trazabilidad.md`](../../../../docs/09_trazabilidad/matriz_trazabilidad.md) |

---

## §1 MRD → PRD → FSD (extracto verificado)

| MRD-N | PRD-REQ | PRD-US | FSD-UC | PC | NFR | Estado |
|-------|---------|--------|--------|----|-----|--------|
| MRD-N-01 | 002, 003 | 004, 008, 009 | FSD-UC-002 | PC-002, 003 | NFR-004 | ✅ |
| MRD-N-02 | 006, 007 | 010…012 | FSD-UC-003 | PC-004, 005 | NFR-001…004 | ✅ |
| MRD-N-03 | 009 | 015 | FSD-UC-005 | PC-007 | NFR-001 | ✅ |
| MRD-N-04 | 010 | 016 | FSD-UC-006 | PC-008 | NFR-005 | ✅ |
| MRD-N-05 | 008 | 013, 014 | FSD-UC-004 | PC-006 | NFR-004 | ✅ |
| MRD-N-06 | 011 | 017 | FSD-UC-007 | PC-009 | NFR-001, 006 | ✅ |
| MRD-N-07 | 001 | 001…003 | FSD-UC-001 | PC-001, 011 | NFR-003, 004 | ✅ |
| Ext. | 012 | 021 | FSD-UC-EXT-001 | PC-013 | NFR-003 | ⚠️ GAP-001 |
| Ext. | — | 018…020 | FSD-UC-EXT-002…004 | PC-014, 015, 012 | — | ⚠️ GAP-002 |

**Cobertura MVP:** 7/7 `FSD-UC-001…007` con PC y trazado en `FSD_v1.md` §4 y `casos-de-uso.md`.

---

## §2 Reglas de negocio → UC

Ver tabla completa en `trazabilidad-sigesa.md` §2 (`BR-001…012` → `FSD-UC-*`).

---

## §3 Gaps abiertos (solo carpeta borisAngulo)

| Gap | Acción | Responsable |
|-----|--------|-------------|
| GAP-001 | Completar UC-EXT-001 + PC-013 en FSD §4 | @ArchAgent |
| GAP-002a–c | PC-014/015 + UC extensiones | @ArchAgent |
| GAP-005 | Protocolo piloto H-01…H-05 | @ProductAgent |
