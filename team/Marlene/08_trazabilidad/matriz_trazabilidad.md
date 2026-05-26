# Matriz de trazabilidad — `team/Marlene`

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 17/05/2026 |
| **Integrante** | Marlene |
| **Fuentes** | `01_brd/BRD.md`, `02_mrd/MRD.md`, `03_prd/PRD.md`, `04_fsd/FSD.md`, `06_prompt_contracts/`, `07_diagramas/` |
| **Matriz institucional** | [`docs/09_trazabilidad/matriz_trazabilidad.md`](../../../docs/09_trazabilidad/matriz_trazabilidad.md) |

---

## §1 Cadena principal (muestra representativa)

| PRD-REQ / tema | PRD-US (muestra) | FSD-UC | PC / NFR | Diagrama | Cobertura |
|----------------|------------------|--------|----------|----------|-----------|
| Auth institucional | PRD-US-001, 002 | FSD-UC-001 | PC-NFR-SEG-01 · NFR-SEG-01 | MAR-SEQ-001 | ✅ |
| Evidencias versionadas | PRD-US-003…006 | FSD-UC-002 | PC-NFR-ED-* · NFR-ED-01/02 | MAR-SEQ-002 · MAR-STA-001 | ✅ |
| Aprobación subfase | PRD-US-007…009 | FSD-UC-003 | PC-NFR-USA-* | MAR-SEQ-003 | ✅ |
| Dashboard / drill-down | PRD-US-010…012 | FSD-UC-004 | NFR-ED-01 | MAR-SEQ-004 | ✅ |
| Reporte PDF | PRD-US-013…014 | FSD-UC-005 | NFR-ED-02 | MAR-SEQ-005 | ✅ |
| Notificaciones | PRD-US-015…016 | FSD-UC-006 | NFR-FIA-01 | MAR-SEQ-006 | ✅ |
| Búsqueda FTS | PRD-US-017…018 | FSD-UC-007 | NFR-ED-01 | MAR-SEQ-007 | ✅ |
| Portal público | PRD-US-019 | FSD-UC-008 | NFR-SEG-01 | MAR-SEQ-008 | ✅ |
| Auditoría export | PRD-US-020 | FSD-UC-009 | NFR-SEG-01 | MAR-SEQ-009 | ✅ |
| Config. proceso | PRD-US-021 | FSD-UC-010 | PC-NFR-MAN-01 | MAR-SEQ-010 | ✅ |
| Respaldos | PRD-US-022 | FSD-UC-011 | NFR-FIA-02 | MAR-SEQ-011 | ✅ |
| Plan de mejora | PRD-US (§5 PRD) | FSD-UC-012 | PC-NFR-MAN-01 | MAR-STA-003 | ✅ |

**Cobertura:** 12/12 `FSD-UC` con enlace a PRD, NFR y diagrama `MAR-*` oficial (excluye borradores `D-*` en `07_diagramas/mmd/`).

---

## §2 Trazabilidad NFR ↔ módulos

| NFR-ID | Módulos FSD | Verificación documentada |
|--------|-------------|--------------------------|
| NFR-ED-01…02 | MOD rendimiento | `06_prompt_contracts/NFR.md` §4 |
| NFR-SEG-01 | MOD seguridad | `NFR.md` + `PC-NFR-SEG-01.prompt.md` |
| NFR-FIA-01…02 | MOD fiabilidad | `NFR.md` §4 |
| NFR-USA-01…02 | MOD UX | `05_nfr/CU_BDD.md` |
| NFR-IA-01…10 | MOD IA | `NFR_IA.md` + `PC-NFR-IA-*.prompt.md` |

---

## §3 Huérfanos y acciones

| ID | Descripción | Estado |
|----|-------------|--------|
| — | Sin `PRD-US` huérfano respecto a `FSD-UC-001…012` en carpeta Marlene | Cerrado |
| GAP-MAR01 | Firmas institucionales BRD § gobernanza | Abierto — validación UMSS |
| GAP-MAR02 | POC ejecutada con evidencia en `11_pocs/` | Recomendada |
