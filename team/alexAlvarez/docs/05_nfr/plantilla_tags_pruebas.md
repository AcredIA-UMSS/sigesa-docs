# Plantilla de tags — pruebas SIGESA (Alex Álvarez)

Convención obligatoria antes de implementar código (ver [`../04_fsd/gherkin.md`](../04_fsd/gherkin.md) y regla `04_sigesa_qa_gherkin_coverage`).

## TypeScript / Jest / Supertest

```typescript
/**
 * SIGESA — Pruebas API
 * @Tag("PRD-US-003")
 * @Tag("FSD-UC-006")
 * @Tag("NFR-017")
 * @Tag("TC-SAD-DELETE")
 * BRD: BRD-CST-01 | Equipo: alexAlvarez
 */
```

## Gherkin / Cucumber

```gherkin
# language: es
@NFR-017 @PRD-US-003 @FSD-UC-006 @TC-SAD-DELETE
Característica: Inmutabilidad de Evidencia aprobada
```

## Playwright (E2E)

```typescript
test.describe('@PRD-US-001 @FSD-UC-007 @NFR-002 Busqueda Evidencia', () => {
  // ...
});
```

## CI — job sugerido

| Job | Comando | Gate |
|-----|---------|------|
| `traceability-check` | `rg '@Tag\("PRD-US-' tests/` vs. lista Must en PRD | NFR-014 |
| `nfr-sad-paths` | suite `TC-SAD-*` | NFR-017, NFR-018 |
