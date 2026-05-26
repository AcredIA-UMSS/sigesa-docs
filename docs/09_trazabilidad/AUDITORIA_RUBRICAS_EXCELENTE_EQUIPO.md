# Auditoría grupal rúbricas «Excelente» — Equipo AcredIA v1.2

| Metadato | Valor |
|----------|-------|
| **Fecha** | 17/05/2026 |
| **Versión** | v1.2 (cuadre inventarios Marlene 200 · boris 220) |
| **Rúbrica** | 10 criterios (`.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md`) |
| **Alcance** | Carpetas `team/<integrante>/` (sin `docs/` institucional como aporte individual) |
| **Inventario consolidado** | [`INVENTARIO_TAREAS_APORTES_EQUIPO.md`](INVENTARIO_TAREAS_APORTES_EQUIPO.md) — **965** tareas |
| **Aportes release** | [`docs/10_aportes/APORTES_RELEASE_1.0.0.md`](../10_aportes/APORTES_RELEASE_1.0.0.md) §2–§3 |
| **Método** | Consolidación de auditorías individuales + regeneración inventario (`merge-inventario-equipo.js`) |

## Tabla comparativa

| Criterio | Peso | alexAlvarez | aylenGonzales | borisAngulo | Marlene |
|----------|------|-------------|---------------|-------------|---------|
| BRD | 5 % | CUMPLE | CUMPLE | CUMPLE | CUMPLE |
| MRD | 5 % | CUMPLE | CUMPLE | CUMPLE | CUMPLE |
| PRD | 10 % | CUMPLE | CUMPLE | CUMPLE | CUMPLE |
| FSD | 15 % | CUMPLE | CUMPLE | PARCIAL | CUMPLE |
| UC + Gherkin | 10 % | PARCIAL | CUMPLE | CUMPLE | CUMPLE |
| NFR ISO 25010 | 10 % | CUMPLE | CUMPLE | CUMPLE | CUMPLE |
| Prompt-contracts | 10 % | CUMPLE | CUMPLE | CUMPLE | CUMPLE |
| Diagramas Mermaid | 10 % | CUMPLE | CUMPLE | CUMPLE | CUMPLE |
| AGENTS + Skills | 15 % | CUMPLE | CUMPLE | CUMPLE | CUMPLE |
| Trazabilidad | 10 % | CUMPLE | CUMPLE | CUMPLE | CUMPLE |

## Puntuación final

| Integrante | Criterios CUMPLE/10 | Score % |
|------------|---------------------|---------|
| alexAlvarez | **9/10** | 90 % |
| aylenGonzales | **10/10** | 100 % |
| borisAngulo | **9/10** | 90 % |
| Marlene | **10/10** | 100 % |

**Promedio equipo:** **9,5/10**.

## Fuentes individuales

| Integrante | Auditoría | Inventario |
|------------|-----------|------------|
| alexAlvarez | [`team/alexAlvarez/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`](../../team/alexAlvarez/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md) | 285 tareas |
| aylenGonzales | [`team/aylenGonzales/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`](../../team/aylenGonzales/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md) | 260 tareas |
| borisAngulo | [`team/borisAngulo/docs/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`](../../team/borisAngulo/docs/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md) | **220** tareas |
| Marlene | [`team/Marlene/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`](../../team/Marlene/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md) | **200** tareas |

- Inventario consolidado: [`INVENTARIO_TAREAS_APORTES_EQUIPO.md`](INVENTARIO_TAREAS_APORTES_EQUIPO.md) (**965** filas, v1.2).

---

## Cuadre inventario v1.2 (17/05/2026)

| Integrante | Total anterior | Total v1.2 | Δ | Ajuste principal |
|------------|----------------|------------|---|------------------|
| alexAlvarez | 285 | **285** | 0 | Sin cambio |
| aylenGonzales | 260 | **260** | 0 | Sin cambio |
| borisAngulo | 210 | **220** | +10 | +7 `FSD-UC-001…007` + 3 `PC-001…003` en inventario individual |
| Marlene | 172 | **200** | +28 | +22 `PRD-US` + 20 `PC` + 5 `NFR-IA`; −19 duplicados `D-*` / `AGENTS` |
| **Grupo** | 927 | **965** | +38 | Ver reglas §4 en `APORTES_RELEASE_1.0.0.md` |

**Promedio grupo:** 965 / 4 = **241,25** tareas/persona → factores en [`APORTES_RELEASE_1.0.0.md`](../10_aportes/APORTES_RELEASE_1.0.0.md) §3.

| Integrante | Factor volumen (clamp 0,5–1,1) |
|------------|-------------------------------|
| alexAlvarez | **1,10** |
| aylenGonzales | **1,08** |
| borisAngulo | **0,91** |
| Marlene | **0,83** |

---

## Gaps abiertos por integrante (solo `team/`)

| ID | Integrante | Gap | Prioridad |
|----|------------|-----|-----------|
| GAP-BOR01 | borisAngulo | FSD §4: 7 UC canónicos vs umbral 12 (rúbrica FSD **PARCIAL**) | Alta |
| GAP-BOR02 | borisAngulo | `log_interno.md` · POC en `11_pocs/` | Media |
| GAP-MAR01 | Marlene | Firmas BRD institucional | Media |
| GAP-MAR02 | Marlene | POC ejecutada `11_pocs/` | Media |
| GAP-MAR03 | Marlene | `log_interno.md` vacío | Baja |
| GAP-ALX01 | alexAlvarez | UC+Gherkin **PARCIAL** en carpeta equipo (cubierto en Golden `docs/04_fsd/`) | Baja |

---

## Referencias

- Inventario: [`INVENTARIO_TAREAS_APORTES_EQUIPO.md`](INVENTARIO_TAREAS_APORTES_EQUIPO.md)
- Aportes: [`../10_aportes/APORTES_RELEASE_1.0.0.md`](../10_aportes/APORTES_RELEASE_1.0.0.md)
- Rúbrica: [`.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md`](../../.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md)
- Script consolidación: [`.cursor/skills/sigesa-auditoria-excelente-equipo/scripts/merge-inventario-equipo.js`](../../.cursor/skills/sigesa-auditoria-excelente-equipo/scripts/merge-inventario-equipo.js)
