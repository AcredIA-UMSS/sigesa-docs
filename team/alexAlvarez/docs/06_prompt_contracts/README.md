# Contratos de prompt (PC-SIG) — Alex Álvarez

Catálogo oficial de **Prompt Contracts** del ecosistema SIGESA. Cada archivo activa un rol, define entrada/salida, invariantes y modos de fallo (formato MADR de prompting).

## Convención de nombres

| Patrón | Ejemplo |
|--------|---------|
| Archivo | `PC-SIG-<NN>[-v2]-<slug-kebab>.prompt.md` |
| Frontmatter `name` | Igual al nombre de archivo sin extensión |
| Frontmatter `id` | `PC-SIG-NN` o `PC-SIG-NN-V2` (coincide con el encabezado del contrato) |
| Frontmatter `type` | `prompt-contract` |

## Plantilla de frontmatter

```yaml
---
name: PC-SIG-NN-slug-descriptivo
id: PC-SIG-NN
description: Título corto del contrato
type: prompt-contract
date: YYYY-MM-DD
skills: skill-a, skill-b   # opcional
---
```

Cuerpo: línea `ACTIVA EL CONTRATO DE PROMPT: [PC-SIG-NN] - …` y secciones `### 1. CONTEXTO` … `### 5. MODOS DE FALLO`.

## Índice

| ID | Archivo | Propósito |
|----|---------|-----------|
| PC-SIG-03 | [`PC-SIG-03-generador-prd.prompt.md`](PC-SIG-03-generador-prd.prompt.md) | Suite PRD (4 archivos, 20+ US, Mermaid) |
| PC-SIG-04-V2 | [`PC-SIG-04-v2-consolidacion-maestra.prompt.md`](PC-SIG-04-v2-consolidacion-maestra.prompt.md) | Versión Dorada en `docs/` vía `AGENTS.md` |
| PC-SIG-07 | [`PC-SIG-07-compilador-ecosistema-agentico.prompt.md`](PC-SIG-07-compilador-ecosistema-agentico.prompt.md) | Redactar/actualizar `AGENTS.md` |
| PC-SIG-08 | [`PC-SIG-08-gobernanza-seguridad-agents.prompt.md`](PC-SIG-08-gobernanza-seguridad-agents.prompt.md) | Seguridad, privacidad, trazabilidad en `AGENTS.md` |
| PC-SIG-09 | [`PC-SIG-09-arquitecto-bd-er.prompt.md`](PC-SIG-09-arquitecto-bd-er.prompt.md) | Modelo ER append-only + Mermaid |
| PC-SIG-10 | [`PC-SIG-10-consistencia-documental.prompt.md`](PC-SIG-10-consistencia-documental.prompt.md) | Regla `06_docs_consistency_checker.mdc` |
| PC-SIG-11 | [`PC-SIG-11-ejecutor-tareas-granular.prompt.md`](PC-SIG-11-ejecutor-tareas-granular.prompt.md) | 1 UC / NFR / ADR sustantivo por tarea |
| PC-SIG-12 | [`PC-SIG-12-backlog-github.prompt.md`](PC-SIG-12-backlog-github.prompt.md) | Backlog 27 issues GitHub |
| PC-SIG-13 | [`PC-SIG-13-arquitecto-dti.prompt.md`](PC-SIG-13-arquitecto-dti.prompt.md) | DTI maestro + ADRs en `docs/05_dti/` |

## Contratos LFSD (equipo)

Los contratos ligeros **PC-L01…L07** viven en [`../05_lfsd/LFSD_v1.md`](../05_lfsd/LFSD_v1.md) §6 (stubs por UC crítico), no en esta carpeta.

## Trazabilidad

- Prompts de sesión y tareas ad hoc: [`../prompts/`](../prompts/)
- Registro append-only: [`../../log_interno.md`](../../log_interno.md)
- Invocación rápida en Cursor: `ACTIVA EL CONTRATO DE PROMPT: [PC-SIG-NN]`
