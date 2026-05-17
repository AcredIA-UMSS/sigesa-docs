---
name: sigesa-validate-domain-rules
description: >
  Validar que código o PR de SIGESA cumple reglas invariantes RBN-*, BR-* y RB-* de AGENTS.md §6
  antes de merge; entrada FSD-UC-* o módulo MOD-NN; salida informe de violaciones y tests faltantes.
allowed-tools:
  - read
  - run-tests
model-tier: sonnet
fsd-version-min: v1.0
status: stable
owner: AcredIA / aylenGonzales
---

# Skill: Validar reglas de dominio SIGESA

> **Convención del módulo**: Skills en `team/aylenGonzales/10_agents/skills/`.
> Copiar a `~/.claude/skills/sigesa-validate-domain-rules/` o `.claude/skills/` del repo de implementación.
> Equivalente Cursor: portar a `.cursor/rules/*.mdc` si se requiere activación automática.

## 1. Cuándo activarlo (triggers)

- DURANTE: revisión de PR, implementación de MOD-01…MOD-12, refactor de `src/domain/` o adaptadores.
- ARRANCA cuando: el usuario cita un **FSD-UC-*** (p. ej. FSD-UC-002), un **MOD-NN**, o pide verificar cumplimiento de **RBN-*** / **BR-*** antes de merge.
- NO ACTIVAR cuando: solo se redacta BRD/MRD/PRD/FSD sin código; no hay diff ni ruta `src/` en el workspace.

## 2. Entradas obligatorias (Inputs)

El usuario MUST proporcionar al menos una de:

- ID del UC: `FSD-UC-001` … `FSD-UC-011` (ver AGENTS.md §8.3).
- Módulo: `MOD-01` … `MOD-12`.
- Ruta al diff o carpeta: `src/domain/`, `src/adapter/`, `src/application/`.
- Lista explícita de reglas a auditar (si no, aplicar todas las de AGENTS.md §6 para ese UC).

Si falta cualquiera, el Skill responde con: *"Necesito FSD-UC-* o MOD-* y rutas de código tocadas antes de validar; lista mínima: UC/MOD, archivos cambiados."*

## 3. Fuentes de verdad (orden de precedencia)

1. `team/aylenGonzales/10_agents/AGENTS.md` §6 (RBN-*, BR-*, RB-*).
2. `team/aylenGonzales/04_fsd/FSD_v2.md` §5 (tabla RBN) y §4 (UC afectado).
3. `team/aylenGonzales/09_dti/adr/ADR-001.md` … `ADR-006.md` según regla (evidencias, log, JWT, taxonomías).
4. Tests existentes `tests/` que referencien TC-001…TC-010.

## 4. Procedimiento

1. Mapear el UC/MOD a reglas §6 aplicables (tabla abajo).
2. Leer archivos del diff; buscar violaciones por patrón (grep/lectura):
   - `DELETE`/`UPDATE` sobre `LOG_AUDITORIA` → RBN-07, ADR-002.
   - `hash` calculado solo en buffer sin escritura a `/data/evidencias/` → RBN-02, ADR-001.
   - `POST /evidencias` sin `indicador_id` → RBN-10, BR-015.
   - dominio distinto de `@umss.edu.bo` en login → RBN-01, RB-06, ADR-004.
   - rechazo sin validación longitud ≥ 20 → RBN-03, FSD-UC-003.
   - cierre subfase sin chequeo indicadores APROBADO → RBN-04, RB-03.
   - `express.static('/data/evidencias')` o equivalente → ADR-001.
   - constantes hardcodeadas de fases CEUB/ARCU-SUR en `src/` → ADR-005.
   - lógica que aprueba/rechaza indicadores sin endpoint humano [TD] → RBN-15.
3. Verificar que exista test Jest/Supertest por regla crítica (TC-003, TC-005, TC-006, etc.).
4. Emitir informe estructurado (ver §5).

### Mapeo UC → reglas mínimas

| FSD-UC | Reglas MUST verificar |
|--------|----------------------|
| FSD-UC-001 | RBN-01, RB-06, ADR-004, LOG_AUDITORIA en login |
| FSD-UC-002 | RBN-02, RBN-09, RBN-10, BR-015, ADR-001 |
| FSD-UC-003 | RBN-03, RBN-04, RBN-15, RB-03 |
| FSD-UC-004 | RBN-12 (cálculo avance), MOD-04 |
| FSD-UC-005 | RBN-11, RB-07 |
| FSD-UC-006 | RBN-08, BR-005 |
| FSD-UC-007 | NFR-001 (no regla §6 nueva) |
| FSD-UC-008 | portal sin PII, hashes, rutas internas |
| FSD-UC-009 | RBN-07 en emisión certificado |
| FSD-UC-010 | RBN-14, BR-012 |
| FSD-UC-011 | RBN-05, BR-013, RBN-13 |

## 5. Salida esperada

- Informe Markdown en la respuesta del agente (no archivo obligatorio salvo que el usuario lo pida).
- Si el usuario pide persistir: `team/aylenGonzales/10_agents/reports/domain-rules-audit-YYYY-MM-DD.md`.

Tabla obligatoria al final:

| Regla | Estado | Archivo / línea | Test |
|-------|--------|-----------------|------|
| RBN-02 | OK / FAIL | `src/...` | TC-003 |
| RBN-07 | OK / FAIL | migración SQL | TC-006 |

- Si hay FAIL: listar acción correctiva concreta (sin implementar salvo que el usuario lo pida).

## 6. Verificación (criterios de "bien hecho")

- Cada regla citada existe en AGENTS.md §6 o FSD_v2 §5.
- Cero reglas inventadas.
- Toda FAIL referencia archivo real del repo o diff.
- Se recomienda `npm test` tras correcciones (skill hermano `skill_run_tests_and_lint`).

## 7. Anti-patrones específicos

- Marcar OK sin leer el código del adaptador que escribe en disco o BD.
- Ignorar transacciones: LOG_AUDITORIA fuera de la misma transacción que la acción crítica (RBN-07 operativo).
- Validar solo comentarios sin assert en tests.

## 8. Mini ejemplo de invocación

> "Valida FSD-UC-002 en la rama actual: carga de evidencias y hash SHA-256. Usa skill_validate_domain_rules."

## 9. Modos de fallo conocidos

- UC sin reglas mapeadas en §4 → STOP, leer FSD_v2 §4 completo.
- Código en Python/FastAPI en repo → FAIL global stack (ADR-006); escalar.

## 10. Registro de cambios del Skill

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 16/05/2026 | Equipo AcredIA | Versión inicial desde AGENTS.md §6 y §8.3 |
