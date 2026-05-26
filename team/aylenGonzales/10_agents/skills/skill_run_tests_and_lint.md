---
name: sigesa-run-tests-and-lint
description: >
  Ejecutar npm test, npm run lint y opcionalmente test:e2e o k6 según AGENTS.md §12 y §8.2
  antes de proponer PR; stack Node 20 + Express 4 (ADR-006); salida log de comandos y semáforo verde/rojo.
allowed-tools:
  - read
  - run-tests
model-tier: haiku
fsd-version-min: v1.0
status: stable
owner: AcredIA / aylenGonzales
---

# Skill: Ejecutar tests y linter SIGESA

> **Convención del módulo**: Skills en `team/aylenGonzales/10_agents/skills/`.
> Agentes: **@DevAgent**, **@QaAgent** (AGENTS.md §8.1). **@QaAgent** MUST NOT modificar `src/domain/`.

## 1. Cuándo activarlo (triggers)

- DURANTE: pre-PR, CI local, corrección de fallos tras implementar FSD-UC-*.
- ARRANCA cuando: hay cambios en `src/`, `tests/`, `package.json`, o el usuario pide "verificar verde" antes de merge.
- NO ACTIVAR cuando: solo cambios en `team/aylenGonzales/**/*.md` de documentación (usar skill de trazabilidad en su lugar).

## 2. Entradas obligatorias (Inputs)

El usuario MUST proporcionar al menos una de:

- Ruta raíz del monorepo de implementación (donde existe `package.json`).
- Alcance: `unit` | `integration` | `e2e` | `all` | `lint-only`.
- FSD-UC-* tocado (para seleccionar tests relacionados TC-001…TC-010).

Si falta `package.json`, responder: *"Necesito la raíz del repo de código con npm scripts; en sigesa-docs solo hay documentación."*

## 3. Fuentes de verdad (orden de precedencia)

1. `team/aylenGonzales/10_agents/AGENTS.md` §12 (comandos) y §8.2 (guardrails).
2. `team/aylenGonzales/04_fsd/FSD_v2.md` §12 (TC-001…TC-010, herramientas Jest/Playwright/k6).
3. `team/aylenGonzales/09_dti/adr/ADR-006.md` (Node + Express; no pytest).
4. Scripts en `package.json` del repo de implementación.

## 4. Procedimiento

1. `cd` a la raíz del monorepo; ejecutar `npm ci` si `node_modules` ausente o `package-lock.json` cambió.
2. Ejecutar en orden:
   ```bash
   npm run lint
   npm test
   ```
3. Si el UC tocado es E2E (FSD-UC-001, 002, 003, 005, 006) y existe script:
   ```bash
   npm run test:e2e
   ```
4. Si el cambio afecta dashboard o buscador (FSD-UC-004, 007) y existe script k6:
   ```bash
   k6 run tests/load/dashboard.js
   ```
5. Para verificación ADR-002 (opcional, requiere Docker):
   ```bash
   docker compose exec postgres psql -U postgres -d sigesa -c "\z LOG_AUDITORIA"
   ```
6. Capturar exit code y resumen (tests passed/failed, errores ESLint).
7. Si lint o tests fallan: listar primeros 5 errores; NO proponer PR hasta verde (AGENTS.md §8.2).

## 5. Salida esperada

- Resumen en respuesta: `LINT: pass|fail`, `UNIT: pass|fail`, `E2E: pass|skip|fail`, `K6: pass|skip|fail`.
- Si el usuario pide artefacto: `team/aylenGonzales/10_agents/reports/test-lint-YYYY-MM-DD.log` (pegar stdout truncado a 200 líneas).

| Comando | Umbral AGENTS / NFR |
|---------|---------------------|
| `npm test` | cobertura backend ≥ 80 % por módulo (NFR-009) |
| `npm run lint` | 0 warnings nuevos introducidos (§8.2) |
| k6 dashboard | p95 ≤ 3 000 ms (NFR-001, TC-007) |

## 6. Verificación (criterios de "bien hecho")

- Ambos `npm run lint` y `npm test` exit code 0 antes de marcar PR listo.
- No se desactivaron tests ni reglas ESLint para "hacer pasar" (patrón prohibido AGENTS.md §11).
- No se ejecutó `pytest` ni `flake8` (stack prohibido sin ADR nuevo).

## 7. Anti-patrones específicos

- Ejecutar solo un archivo de test y declarar el PR completo sin suite completa.
- Usar `--no-verify` en commit (prohibido salvo instrucción explícita del usuario).
- Ignorar fallos de integración en `LOG_AUDITORIA` (TC-006).

## 8. Mini ejemplo de invocación

> "Corre lint y tests tras implementar FSD-UC-003. Usa skill_run_tests_and_lint."

## 9. Modos de fallo conocidos

- Repo solo documentación (`sigesa-docs`) → indicar que tests viven en repo de implementación.
- `docker compose` no levantado → marcar verificación TC-006 / psql como SKIP con instrucción.

## 10. Registro de cambios del Skill

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 16/05/2026 | Equipo AcredIA | Versión inicial AGENTS §8.2, §12, ADR-006 |
