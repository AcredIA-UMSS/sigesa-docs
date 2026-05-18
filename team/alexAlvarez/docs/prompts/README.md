# Prompts de sesión y plantillas de skills — Alex Álvarez

Esta carpeta guarda **prompts de usuario** (tareas puntuales, cierre de sesión) y **plantillas de invocación de skills** (`.claude/skills/`). Los **contratos formales PC-SIG** están en [`../06_prompt_contracts/`](../06_prompt_contracts/).

## Qué va aquí vs `06_prompt_contracts/`

| Tipo | Carpeta | Ejemplo |
|------|---------|---------|
| Contrato PC-SIG (rol + invariantes + salida fija) | `06_prompt_contracts/` | `PC-SIG-13-arquitecto-dti.prompt.md` |
| Prompt de sesión / tarea ad hoc | `prompts/` | `session-log-2026-05-17.prompt.md`, `lfsd-integracion-fsd.prompt.md` |
| Plantilla skill (wrapper) | `prompts/` | `sigesa-auditor-trazabilidad-dti.prompt.md` |

## Contratos PC-SIG (enlaces)

Symlinks conservan rutas históricas citadas en `log_interno.md`:

| Enlace en `prompts/` | Contrato canónico |
|----------------------|-------------------|
| `PC-SIG-03.prompt.md` | `../06_prompt_contracts/PC-SIG-03-generador-prd.prompt.md` |
| `PC-SIG-13-arquitecto-dti.prompt.md` | `../06_prompt_contracts/PC-SIG-13-arquitecto-dti.prompt.md` |
| `06-docs-consistency-checker.prompt.md` | `../06_prompt_contracts/PC-SIG-10-consistencia-documental.prompt.md` |

Índice completo: [`../06_prompt_contracts/README.md`](../06_prompt_contracts/README.md).

## Skills (plantillas)

| Archivo | Skill en `.claude/skills/` |
|---------|----------------------------|
| `sigesa-api-contract-designer.prompt.md` | `sigesa-api-contract-designer` |
| `sigesa-arquitectura-tecnica-ia.prompt.md` | `sigesa-arquitectura-tecnica-ia` |
| `sigesa-auditor-trazabilidad-dti.prompt.md` | `sigesa-auditor-trazabilidad-dti` |
| `sigesa-db-architect-append-only.prompt.md` | `sigesa-db-architect-append-only` |

## Sesiones registradas

| Fecha | Archivo |
|-------|---------|
| 2026-05-16 | `session-log-2026-05-16.prompt.md` |
| 2026-05-17 | `session-log-2026-05-17.prompt.md` |
