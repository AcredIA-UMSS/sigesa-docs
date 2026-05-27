# AGENTS.md — Puntero al manifiesto canónico

> **Fuente de verdad:** [`docs/08_agents/AGENTS.md`](docs/08_agents/AGENTS.md) (Dorada v2.2, 2026-05-27).

El manifiesto de arquitectura IA, gobernanza de seguridad (P-S01 a P-S04), catálogo de skills y reglas globales vive en la Golden Folder de agentes. Este archivo en la raíz existe para compatibilidad con herramientas que buscan `AGENTS.md` en el directorio del repositorio.

| Documento | Ruta |
|-----------|------|
| Manifiesto principal | [`docs/08_agents/AGENTS.md`](docs/08_agents/AGENTS.md) |
| Catálogo de skills | [`docs/08_agents/skills.md`](docs/08_agents/skills.md) |
| Reglas Cursor | [`docs/08_agents/cursor_rules.md`](docs/08_agents/cursor_rules.md) |
| Skills runtime | [`.cursor/skills/`](.cursor/skills/) |

**Resumen rápido:** 12 skills activas en [`.cursor/skills/`](.cursor/skills/) (catálogo en [`docs/08_agents/skills.md`](docs/08_agents/skills.md)), 5 reglas `.mdc`, actores @ProductAgent, @ArchAgent, @DBAgent, @QaAgent, @VisualAgent, @DevAgent. Implementación: `sigesa-frontend-engineer` / `sigesa-backend-engineer` → `app/`. Documentación en `docs/01_brd/` … `docs/09_trazabilidad/`.
