---
name: sigesa-generate-pr-description
description: >
  Generar descripción de Pull Request con trazabilidad FSD-UC-*, PRD-REQ-*, TC-* y tabla de reglas
  según AGENTS.md §8.2 y §5; agente @DevAgent; salida Markdown listo para gh pr create.
allowed-tools:
  - read
  - edit
model-tier: haiku
fsd-version-min: v1.0
status: stable
owner: AcredIA / aylenGonzales
---

# Skill: Generar descripción de Pull Request SIGESA

> **Agente responsable**: **@DevAgent** (AGENTS.md §8.1). Ejecutar antes `skill_run_tests_and_lint` y `skill_validate_domain_rules`.

## 1. Cuándo activarlo (triggers)

- DURANTE: pre-PR, tras implementación de T-* o FSD-UC-*.
- ARRANCA cuando: tests y lint verdes; el usuario pide "descripción del PR" o `gh pr create`.
- NO ACTIVAR cuando: working tree sucio con tests rojos (§8.2 MUST verde primero).

## 2. Entradas obligatorias (Inputs)

El usuario MUST proporcionar:

- `FSD-UC-*` principal (uno o más).
- `PRD-REQ-*` vinculados (desde matriz o FSD).
- `TC-*` creados o actualizados (TC-001…TC-010).
- Resumen del diff: módulos MOD-* y archivos clave.
- Resultado de `npm test` y `npm run lint` (pass/fail).

Si falta FSD-UC, responder: *"Necesito al menos un FSD-UC-* y PRD-REQ-* antes de generar el PR."*

## 3. Fuentes de verdad (orden de precedencia)

1. `team/aylenGonzales/10_agents/AGENTS.md` §5 (commits), §8.2 (citas obligatorias), §8.3 (MOD↔UC).
2. `team/aylenGonzales/08_trazabilidad/matriz_trazabilidad.md` (cadena MRD→PRD→FSD).
3. `git diff` / `git log` del branch actual.
4. Salida de skills `skill_run_tests_and_lint`, `skill_validate_domain_rules`.

## 4. Procedimiento

1. Ejecutar `git diff main...HEAD --stat` (o base branch indicada).
2. Verificar PR ≤ 400 líneas netas (AGENTS §5); si excede, advertir división.
3. Redactar título Conventional Commits: `feat(MOD-02): upload evidence FSD-UC-002` (inglés en título).
4. Cuerpo del PR en español con secciones fijas:

```markdown
## Summary
- …

## Trazabilidad
| Capa | ID |
|------|-----|
| FSD-UC | FSD-UC-002 |
| PRD-REQ | PRD-REQ-003, PRD-REQ-004 |
| MOD | MOD-02 |
| TC | TC-003, TC-004 |

## Reglas de dominio verificadas
| Regla | Cómo se cumple |
|-------|----------------|
| RBN-02 | hash post-escritura en … |
| RBN-10 | indicador_id obligatorio en … |

## Test plan
- [ ] npm run lint
- [ ] npm test
- [ ] TC-003 …

## Métricas AI-SDLC
- Spec Fidelity: sin cambio / mejora (si aplica)
```

5. Incluir tabla de trazabilidad implementación (plantilla SKILL_TEMPLATE §5 adaptada):

| FSD ID | Archivo implementación | Test |
|--------|------------------------|------|
| FSD-UC-002 | `src/application/UploadEvidenceUseCase.js` | `tests/integration/evidence.test.js` |

6. Listar ADR si el PR toca stack (debe haber ADR-007+ o ninguno si solo código dentro ADR-001…006).

## 5. Salida esperada

- Markdown en respuesta (copiar a `gh pr create --body`).
- Opcional guardar: `team/aylenGonzales/10_agents/reports/pr-description-<branch>.md`.

**MUST** incluir línea: `Refs: FSD-UC-00X, PRD-REQ-00Y, TC-00Z` para parsers CI futuros.

## 6. Verificación (criterios de "bien hecho")

- Todos los IDs existen en FSD_v2 o matriz (no inventados).
- Test plan marca comandos reales AGENTS §12 (`npm test`, no pytest).
- Menciona revisión humana obligatoria para merge a `main` (flujo §9).
- No incluye secretos ni tokens en el cuerpo del PR.

## 7. Anti-patrones específicos

- PR "fix stuff" sin UC (viola AGENTS §8.2).
- Omitir RBN-15 si el PR toca flujo de aprobación.
- Declarar tests verdes sin haber ejecutado skill_run_tests_and_lint.

## 8. Mini ejemplo de invocación

> "Genera descripción del PR para FSD-UC-003 con TC-005 y TC-006. Tests en verde."

## 9. Modos de fallo conocidos

- Branch sin commits → pedir implementación primero.
- PRD-REQ sin fila en matriz → sugerir skill_sync_traceability_matrix.

## 10. Registro de cambios del Skill

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 16/05/2026 | Equipo AcredIA | Versión inicial @DevAgent §8.2 |
