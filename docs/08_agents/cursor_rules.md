# Reglas globales Cursor — SIGESA / AcredIA

| Metadato | Valor |
|----------|-------|
| **Versión** | Dorada v1.0 |
| **Fecha** | 2026-05-17 |
| **Ubicación física** | `.cursor/rules/*.mdc` |
| **Manifiesto** | [`AGENTS.md`](AGENTS.md) |

Las reglas son guardrails que Cursor aplica según `globs` y `alwaysApply`. Protegen el alcance UMSS: lenguaje institucional, trazabilidad, evidencia append-only y calidad BDD.

---

## 1. `01_domain_language.mdc`

| Campo | Valor |
|-------|-------|
| **Archivo** | [`.cursor/rules/01_domain_language.mdc`](../../.cursor/rules/01_domain_language.mdc) |
| **alwaysApply** | false |
| **globs** | `**/*.{md,ts,py,sql,java}` |

Obliga a usar **Fase** (no Etapa), **Evidencia** (no File genérico), **Indicador**, actores **[CC]**, **[TD]**, **[JD]**, **[P]**. Evita que la IA introduzca vocabulario de ERP genérico que rompa trazabilidad con `context/03_domain_glossary.md` y `docs/04_fsd/glosario.md`.

---

## 2. `02_session_prompt_logging.mdc`

| Campo | Valor |
|-------|-------|
| **Archivo** | [`.cursor/rules/02_session_prompt_logging.mdc`](../../.cursor/rules/02_session_prompt_logging.mdc) |
| **alwaysApply** | **true** |

Al iniciar sesión, el agente debe identificar al usuario (`team/<usuario>/`) y registrar prompts en `log_interno.md` con estilo append-only. Sustenta auditoría AI-SDLC (Prompt Coverage, Spec Fidelity) y cumplimiento de trazabilidad institucional sin volcar PII completa.

---

## 3. `03_sigesa_doc_orchestrator.mdc`

| Campo | Valor |
|-------|-------|
| **Archivo** | [`.cursor/rules/03_sigesa_doc_orchestrator.mdc`](../../.cursor/rules/03_sigesa_doc_orchestrator.mdc) |
| **alwaysApply** | false |
| **globs** | `team/**/docs/**/*.md` |

Orquesta creación de BRD/MRD/PRD/FSD bajo `team/*/docs/` con discovery previo, glosario y checkpoint de impacto cruzado. **Prohíbe** guardar BRD/FSD sueltos en la raíz del repo. Fuerza invariantes append-only y roles DUEA antes de redactar.

---

## 4. `04_sigesa_qa_gherkin_coverage.mdc`

| Campo | Valor |
|-------|-------|
| **Archivo** | [`.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc`](../../.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc) |
| **alwaysApply** | false |
| **globs** | `src/**/*.ts` (y rutas de código del proyecto) |

Exige que código generado mapee a criterios Gherkin en `docs/04_fsd/gherkin.md` / PRD. Impide cerrar tareas de implementación sin pruebas automatizadas que cubran caminos felices y tristes (rechazo, 409 append-only, 403 RBAC).

Duplicado orientado a GitHub: `.github/instructions/04_sigesa_qa_gherkin_coverage.instructions.md`.

---

## 5. `06_docs_consistency_checker.mdc`

| Campo | Valor |
|-------|-------|
| **Archivo** | [`.cursor/rules/06_docs_consistency_checker.mdc`](../../.cursor/rules/06_docs_consistency_checker.mdc) |
| **alwaysApply** | false |
| **globs** | Markdown amplio: `docs/**`, `AGENTS.md`, `team/**/docs/**`, `context/**` |

Guardián de coherencia entre README, `docs/08_agents/AGENTS.md`, glosario y pirámide `docs/`. Antes de introducir roles o módulos nuevos, exige lectura cruzada. Detiene contradicciones (por ejemplo Coordinador vs Director Académico obsoleto) y renombres silenciosos de términos normativos.

Creada vía contrato PC-SIG-10 (SDLC).

---

## Jerarquía normativa (para agentes)

1. `context/03_domain_glossary.md`
2. `docs/08_agents/AGENTS.md`
3. `README.md`
4. `docs/01_brd/` … `docs/09_trazabilidad/`
5. `team/*/docs/` (no puede contradecir niveles superiores)

---

## Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 2026-05-17 | Inventario de 5 reglas `.mdc` alineado a disco |
