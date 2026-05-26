# AGENTS.md (resumen histórico)

> **Versión canónica ampliada (v1.0 gobierno, skills, Cursor Rules):** ver `AGENTS.md` en la raíz del repositorio.

Este documento define la arquitectura agéntica para el ciclo de vida de desarrollo (AI-SDLC) de SIGESA. Especifica los roles, responsabilidades y alcances de cada agente de IA (ej. Cursor, Claude, GitHub Copilot) que interactuará con este repositorio.

---

## 🤖 1. @ProductAgent (Business & UX)
**Rol:** Senior Product Manager y UX Researcher.
**Objetivo:** Garantizar que el sistema entregue valor al negocio y resuelva el problema de la "dispersión documental" de la DUEA.
* **Responsabilidades:** - Redacción y validación de `BRD.md`, `MRD.md` y `PRD.md`.
  - Asegurar que las *User Stories* sigan el formato INVEST y posean criterios de aceptación claros.
  - Velar por el cumplimiento de accesibilidad (WCAG AA) y usabilidad.
* **Archivos Base de Contexto:** `00_overview/` y `04_fsd/glosario.md`.

## 🏗️ 2. @ArchAgent (Arquitectura de Software y NFRs)
**Rol:** Software Architect.
**Objetivo:** Diseñar estructuras resilientes, diagramas de bases de datos y asegurar el cumplimiento de la máquina de estados estricta.
* **Responsabilidades:**
  - Redacción del `FSD.md` y diagramación en formato Mermaid (`.mmd`).
  - Definir las métricas ISO 25010 en `NFR_ISO25010.md`.
  - Diseñar el esquema de base de datos para soportar la política *Append-Only* de la evidencia.
* **Archivos Base de Contexto:** `04_fsd/reglas_negocio.md` y `04_fsd/modelo_datos.md`.

## 🧪 3. @QaAgent (Testing & Trazabilidad)
**Rol:** QA Automation Engineer.
**Objetivo:** Asegurar que ninguna regla de negocio crítica pueda romperse mediante la escritura de especificaciones ejecutables.
* **Responsabilidades:**
  - Convertir Casos de Uso en archivos `gherkin.md` (`Feature / Scenario / Given / When / Then`).
  - Auditar la matriz de trazabilidad cruzada (BRD -> PRD -> FSD -> Test).
* **Archivos Base de Contexto:** Todo el directorio `03_prd/` y `04_fsd/`.

## 💻 4. @DevAgent (Implementación Técnica)
**Rol:** Full-Stack Developer.
**Objetivo:** Traducir los artefactos de diseño y las reglas de negocio en código funcional y seguro.
* **Responsabilidades:**
  - Escribir código adherido estrictamente a las `cursor_rules`.
  - Implementar los API Contracts definidos por el `@ArchAgent`.
* **Archivos Base de Contexto:** `.cursor/rules/`, `04_fsd/api_contracts.md`.

---

## 5. Catálogo de skills (≥7 — rúbrica Excelente)

| # | Skill | Ubicación | Agente |
|---|-------|-----------|--------|
| 1 | `sigesa-generacion-historias-usuario` | `08_agents/agents/SKILLS.md` (§1) | @ProductAgent |
| 2 | `sigesa-validacion-maquina-estados` | `08_agents/agents/SKILLS.md` (§2) | @ArchAgent |
| 3 | `mermaid-expert-architect` | `.cursor/skills/` (repo) | @VisualAgent |
| 4 | `sigesa-generacion-documentos-negocio` | `.cursor/skills/` (repo) | @ProductAgent |
| 5 | `sigesa-generacion-documentos-tecnicos` | `.cursor/skills/` (repo) | @ArchAgent |
| 6 | `sigesa-arquitectura-tecnica-ia` | `.cursor/skills/` (repo) | @ArchAgent |
| 7 | `sigesa-auditor-trazabilidad-dti` | `.cursor/skills/` (repo) | @QaAgent |

**Reglas Cursor documentadas:** `08_agents/agents/cursor_rules.md` (3 reglas: dominio, máquina de estados, append-only).

**Manifiesto ampliado:** [`docs/08_agents/AGENTS.md`](../../../../docs/08_agents/AGENTS.md) (Golden Folder).
