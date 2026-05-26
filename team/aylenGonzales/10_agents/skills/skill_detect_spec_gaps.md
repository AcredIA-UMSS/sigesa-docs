---
name: sigesa-detect-spec-gaps
description: >
  Detectar gaps de especificación entre PRD, FSD, PC, TC y ADR; comparar con FSD_v2 §11 GAP-*
  y metricas_ai_sdlc.md; agente @ProductAgent; salida informe GAP y filas matriz §3.
allowed-tools:
  - read
  - edit
model-tier: sonnet
fsd-version-min: v1.0
status: stable
owner: AcredIA / aylenGonzales
---

# Skill: Detectar gaps de especificación SIGESA

> **Agente responsable**: **@ProductAgent** (AGENTS.md §8.1). Complementa `skill_sync_traceability_matrix`.

## 1. Cuándo activarlo (triggers)

- DURANTE: revisión de calidad documental, antes de sprint de implementación, auditoría EXCELENTE (PM-029).
- ARRANCA cuando: el usuario pide "gaps", "cobertura spec", o Spec Fidelity < 95 % (AGENTS §13).
- NO ACTIVAR cuando: solo se pide implementar código ya especificado con UC+PC+TC completos.

## 2. Entradas obligatorias (Inputs)

El usuario MUST proporcionar al menos una de:

- Alcance: `full` (todo v1.0) | `prd` | `fsd-uc` | `adr` | `metrics`.
- Versión FSD: `team/aylenGonzales/04_fsd/FSD_v2.md` (default).
- Umbral objetivo opcional (default Spec Fidelity ≥ 95 %, Decision Coverage ≥ 80 %).

Si no hay alcance, asumir `full` y leer archivos listados en §3.

## 3. Fuentes de verdad (orden de precedencia)

1. `team/aylenGonzales/04_fsd/FSD_v2.md` §11 (matriz + GAP-003…005 documentados).
2. `team/aylenGonzales/03_prd/PRD_v1.md` (PRD-REQ-001…017).
3. `team/aylenGonzales/04_fsd/prompt-contracts.md` + FSD_v2 §7 (PC-001…010).
4. `team/aylenGonzales/04_fsd/FSD_v2.md` §12 (TC-001…010; TC-011 pendiente).
5. `team/aylenGonzales/08_trazabilidad/matriz_trazabilidad.md` §3 (gaps).
6. `team/aylenGonzales/08_trazabilidad/metricas_ai_sdlc.md`.
7. `team/aylenGonzales/09_dti/adr/` (RF-* vs ADR — Decision Coverage).
8. `team/aylenGonzales/10_agents/AGENTS.md` §13 (umbrales).

## 4. Procedimiento

1. **Inventario PRD-REQ** (17 filas): para cada ID, ¿existe FSD-UC o MOD trazable en matriz §2?
   - Marcar **GAP** si PRD-REQ-016, 017 sin UC (backlog v2.0 esperado).
2. **Inventario FSD-UC** (001…011 en alcance): ¿tiene PC en FSD §7 o prompt-contracts?
   - UC-011 puede no requerir PC IA (métricas documentan excepción).
3. **Inventario TC**: comparar UC con TC-001…010; marcar **GAP-003** si FSD-UC-010 sin TC-011 automatizado.
4. **Inventario ADR vs RF** (FSD §13 RF-01…06):
   - RF-02 → ADR-006 ✓
   - RF-04 → ADR-001 ✓
   - RF-05 → ADR-005 ✓
   - RF-01, RF-03, RF-06 → sin ADR → **GAP decisión**
5. Recalcular métricas (mismas fórmulas que `metricas_ai_sdlc.md`):
   - Prompt Coverage, Spec Fidelity, Decision Coverage, Chain Completeness.
6. Clasificar cada GAP: `Alta` | `Media` | `Baja` con recomendación (crear UC, TC, ADR, o backlog v2.0).
7. No inventar IDs: si se detecta hueco, proponer ID siguiente solo si el usuario autoriza nueva spec.

## 5. Salida esperada

| Archivo | Cuándo escribir |
|---------|-----------------|
| `team/aylenGonzales/10_agents/reports/spec-gaps-YYYY-MM-DD.md` | Si el usuario pide persistir |
| `team/aylenGonzales/08_trazabilidad/matriz_trazabilidad.md` §3 | Solo si el usuario pide actualizar matriz |

Tabla obligatoria en respuesta:

| GAP ID | Capa | Descripción | PRD/FSD/TC/ADR | Prioridad | Acción recomendada |
|--------|------|-------------|----------------|-----------|-------------------|
| GAP-003 | QA | TC-011 respaldo FSD-UC-010 | TC-011 | Alta | Definir script + test |
| GAP-004 | PRD/FSD | PRD-REQ-016 planes mejora | — | Media | Backlog v2.0 FSD-UC-012 |
| GAP-006 | ADR | RF-01 sin ADR | RF-01 | Media | ADR operativo o runbook |

Bloque métricas:

| Métrica | Valor actual | Umbral AGENTS §13 | Semáforo |
|---------|--------------|-------------------|----------|
| Spec Fidelity | 88,24 % | ≥ 95 % | 🟡 |
| Decision Coverage | 50 % | ≥ 80 % | 🟡 |

## 6. Verificación (criterios de "bien hecho")

- Cada GAP referencia ID real del FSD §11 o hallazgo verificable por lectura de archivos.
- GAP-004/005 no marcados como "error" si están documentados como backlog v2.0.
- Recomendaciones accionables (@ProductAgent, @ArchAgent, @QaAgent) según tipo de gap.

## 7. Anti-patrones específicos

- Reportar GAP en PRD-REQ ya cubiertos por FSD-UC-008…011 sin releer FSD_v2 actualizado.
- Proponer FastAPI o S3 para cerrar gap técnico (viola ADR-006, ADR-001).
- Modificar `src/` desde este skill.

## 8. Mini ejemplo de invocación

> "Detecta todos los gaps de spec para v1.0 y compara con métricas EXCELENTE. Usa skill_detect_spec_gaps."

## 9. Modos de fallo conocidos

- FSD_v1 desactualizado → usar solo **FSD_v2.md** como canónico.
- Contradicción matriz vs FSD §11 → priorizar FSD_v2 y abrir issue de sincronización.

## 10. Registro de cambios del Skill

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 16/05/2026 | Equipo AcredIA | Versión inicial GAP FSD §11, métricas §13 |
