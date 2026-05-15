---
name: sigesa-pc-generar
description: >
  Generar un prompt-contrato PC-NNN completo para SIGESA a partir de un FSD-UC-NNN:
  produce invariants, failure_modes y acceptance_criteria_gherkin listos para
  incorporar en prompt-contracts.md. Activar cuando @ArchAgent deba cerrar un GAP
  (GAP-001, GAP-002, GAP-004) o cuando un nuevo UC no tenga PC asociado.
allowed-tools:
  - read
  - edit
model-tier: sonnet
fsd-version-min: v1.0
status: stable
owner: AcredIA / borisAngulo
---

# Skill-002 — Generar Prompt-Contrato PC desde FSD-UC (SIGESA)

## 1. Cuándo activarlo

- DURANTE: cierre de GAPs abiertos (AGENTS.md §14) o definición de nuevos UC.
- ARRANCA cuando: @ArchAgent recibe "crea PC-NNN para FSD-UC-NNN" o el usuario detecta que un UC no tiene PC.
- NO ACTIVAR si: el UC ya tiene PC vigente en `prompt-contracts.md` → usar Skill-001 directamente.

## 2. Entradas obligatorias

| Campo | Fuente |
|-------|--------|
| Flujo principal del UC | `FSD_v1.md` sección del UC |
| Flujos alternos | `casos-de-uso.md` sección del UC |
| Reglas de negocio aplicables | `BRD_v2.md` + `AGENTS.md §6` |
| NFR relevantes | `docs/06_nfr/` |
| Gaps asociados | `trazabilidad-sigesa.md §3` |

## 3. Estructura del PC a producir

El PC generado MUST seguir esta estructura JSON (lista para pegar en `prompt-contracts.md`):

```json
{
  "pc_id": "PC-NNN",
  "fsd_uc": "FSD-UC-NNN",
  "titulo": "<nombre legible del UC>",
  "rol_agente": "<rol específico para este dominio>",
  "task": "<tarea operativa atómica>",
  "context": {
    "documentos": ["FSD_v1.md §X.Y", "casos-de-uso.md FSD-UC-NNN", "BRD-BR-NNN"],
    "restricciones": ["<lista de RB y NFR aplicables>"]
  },
  "invariants": [
    "<invariante 1 derivada de RB>",
    "<invariante 2>"
  ],
  "failure_modes": [
    {
      "id": "FM-01",
      "condicion": "<cuándo falla>",
      "respuesta_esperada": "<qué debe hacer el sistema>"
    }
  ],
  "acceptance_criteria_gherkin": [
    {
      "id": "AC-01",
      "scenario": "<nombre>",
      "given": "<precondición>",
      "when": "<acción>",
      "then": "<resultado esperado>"
    }
  ],
  "stop_condition": "Detente cuando invariants, failure_modes y acceptance_criteria_gherkin estén completos sin información inventada.",
  "output_campos_adicionales": ["<campo específico del dominio del UC>"]
}
```

## 4. Procedimiento

### 4.1 Análisis del UC

1. Leer flujo principal → extraer precondiciones, actor, trigger, postcondición.
2. Leer flujos alternos → extraer cada excepción como `failure_mode`.
3. Mapear cada paso del flujo a una RB de `AGENTS.md §6`.
4. Identificar NFR que apliquen (performance, seguridad, cifrado).

### 4.2 Generación de invariants

Formato: `"MUST <verbo> <objeto> <condición>"` — derivado directamente de RB.

Ejemplos para SIGESA:
- `"MUST asociar toda evidencia a criterio_id + proceso_id + fase_id antes de persistir (RB-06)"`
- `"MUST registrar usuario_responsable y timestamp en cada versión de evidencia (RB-07)"`
- `"MUST validar sesión activa y rol autorizado antes de cualquier acción (RB-04)"`

### 4.3 Generación de failure_modes

Por cada flujo alterno del UC, generar un FM:

| Flujo alterno | FM a generar |
|--------------|-------------|
| Sesión expirada | FM: redirigir a login, no ejecutar acción |
| Proceso duplicado mismo tipo+carrera+periodo | FM: rechazar con error 409 |
| Fecha inicio ≥ fecha fin | FM: rechazar con validación de dominio |
| Evidencia sin criterio_id | FM: rechazar con error 422 |
| Cierre con tareas obligatorias pendientes | FM: bloquear cierre, listar pendientes |

### 4.4 Generación de Gherkin AC

Por cada happy path y variante importante:

```gherkin
Scenario: <nombre descriptivo>
  Given <actor con rol válido y sesión activa>
  And   <precondición del dominio>
  When  <acción sobre el sistema>
  Then  <resultado observable>
  And   <evento de auditoría registrado> ← SIEMPRE incluir si es acción sensible
```

### 4.5 Validación cruzada

- [ ] Cada invariant referencia al menos una RB de `AGENTS.md §6`.
- [ ] Cada failure_mode tiene flujo alterno correspondiente en `casos-de-uso.md`.
- [ ] Cada AC tiene un scenario name único dentro del PC.
- [ ] El PC no inventa reglas que no estén en FSD/BRD.

## 5. Salida esperada

1. Bloque JSON del PC listo para pegar en `prompt-contracts.md`.
2. Tabla de actualización de trazabilidad:

| Acción | Archivo | Campo |
|--------|---------|-------|
| Agregar PC-NNN | `prompt-contracts.md` | sección UC-NNN |
| Cerrar GAP-NNN | `trazabilidad-sigesa.md §3` | estado → cerrado |
| Actualizar métrica | `trazabilidad-sigesa.md §4` | `prompt_coverage` |

3. Checklist de revisión humana antes de marcar GAP como cerrado.

## 6. Criterios de "bien hecho"

- [ ] Cero invariants inventados: cada uno cita RB de `AGENTS.md §6`.
- [ ] Al menos 1 FM por cada flujo alterno del UC.
- [ ] Al menos 1 AC para happy path + 1 AC por cada FM principal.
- [ ] JSON válido y parseable.
- [ ] GAP actualizado en `trazabilidad-sigesa.md` con estado y fecha.

## 7. Anti-patrones

- Inventar reglas de negocio no documentadas → `TODO(spec)` + escalar.
- PC sin failure_modes → incompleto, no publicar.
- AC sin verificación de auditoría en acciones sensibles → agregar siempre.

## 8. Mini ejemplo

```
"Crea PC-011 para FSD-UC-008 (vista pública información no sensible).
 Usa Skill-002. GAP-001 debe quedar cerrado."
```

## 9. UCs con GAP activo (referencia rápida)

| GAP | UC | PC a crear | Responsable |
|-----|----|-----------|-------------|
| GAP-001 | FSD-UC-008 | PC-011 | @ArchAgent |
| GAP-002 | FSD-UC-009, FSD-UC-010 | PC-012 | @ArchAgent |
| GAP-004 | FSD-UC-011 (auditoría) | PC-013 | @ArchAgent / Boris Angulo |

## 10. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 2026-05-14 | AcredIA / borisAngulo | Versión inicial |