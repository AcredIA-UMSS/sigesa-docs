# SIGESA / AcredIA — Paquete documental UMSS (overview)

| Metadato | Valor |
|----------|-------|
| **Producto** | SIGESA — Sistema de Evaluación y Acreditación de Carreras |
| **Institución** | Universidad Mayor de San Simón (UMSS) · DUEA |
| **Equipo** | AcredIA · línea documental Marlene |
| **Versión paquete** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Repositorio** | `sigesa-docs` |

---

## 1. Qué es este paquete

Carpeta **`team/Marlene/`** con la **línea base documental v1.0** para SIGESA: requisitos, especificación funcional, NFR, trazabilidad, diagramas, gobernanza IA y reglas para agentes/desarrollo.

No contiene el código de la aplicación; define **qué debe construirse** y **cómo debe gobernarse** el ciclo de vida (incluido AI-SDLC).

**Fuentes normativas externas al paquete:**

| Documento | Ubicación |
|-----------|-----------|
| LFSD canónico | `docs/LFSD.md` |
| Gobernanza agentes ampliada | `AGENTS.md` (raíz) |
| Matriz / métricas (réplica) | `matriz_trazabilidad.md`, `metricas_ai_sdlc.md` (raíz) |

---

## 2. Resumen ejecutivo

SIGESA centraliza el **ciclo de acreditación de carreras** (CEUB nacional y ARCU-SUR regional) en un flujo trazable:

- **[CC]** carga y versiona **evidencias** por indicador.
- **[TD]** dictamina (aprobar/rechazar) y avanza **subfases** cuando la normativa lo permite.
- **[JD]** supervisa con dashboard, reportes PDF y configuración de procesos.
- **[P]** consulta el **portal público** dentro del alcance autorizado.

Principios: **una fuente de verdad documental**, **historial inmutable** de evidencias aprobadas, **supervisión humana** en decisiones críticas (RB-11 / IA).

---

## 3. Mapa del paquete (dónde empezar)

```text
team/Marlene/
├── 00_overview/          ← Usted está aquí
├── 01_brd/               Negocio (BRD)
├── 02_mrd/               Mercado / estrategia (MRD)
├── 03_prd/               Producto (PRD, US, roadmap, journeys)
├── 04_fsd/               Funcional (UC, API, BD, Gherkin, reglas)
├── 05_nfr/               Calidad ISO 25010
├── 06_prompt_contracts/  Contratos IA por UC
├── 07_diagramas/         Mermaid UC, ER, Gantt
├── 08_agents/            Diagramas agentes, SKILLS, cursor_rules
├── 09_trazabilidad/      Matriz E2E + métricas AI-SDLC
├── 10_aportes/           Release notes v1.0.0
├── rules/                domain · coding · ai
└── templates/            Plantillas BRD, PRD, FSD, ADR, …
```

### Lectura recomendada por rol

| Rol | Orden sugerido |
|-----|----------------|
| **Sponsor / [JD]** | Este README → `02_vision_negocio_v2.md` → `03_prd/PRD.md` → `10_aportes/release-1.0.0.md` |
| **Analista / PM** | `01_brd/BRD_v1.md` → `03_prd/user_stories.md` → `04_fsd/casos_uso.md` |
| **Arquitecto** | `04_fsd/FSD.md` → `04_fsd/modelo_datos.md` → `07_diagramas/er-006-diagrama.mmd` → `05_nfr/NFR_ISO25010.md` |
| **Desarrollador** | `rules/coding_rules.md` → `rules/domain_rules.md` → `04_fsd/api_contracts.md` |
| **QA** | `04_fsd/gherkin.md` → `09_trazabilidad/matriz_trazabilidad.md` |
| **Agente IA (Cursor)** | `rules/ai_rules.md` → `AGENTS.md` → `06_prompt_contracts/prompt_contracts.md` |

---

## 4. Documentos clave en `00_overview/`

| Archivo | Contenido |
|---------|-----------|
| **`README.md`** (este) | Índice del paquete Marlene |
| **`definicion_producto.md`** | Qué es SIGESA, valor, principios y capacidades núcleo |
| **`alcance_proyecto.md`** | Alcance producto + documental; inclusiones/exclusiones v1 |
| **`02_vision_negocio_v2.md`** | Visión de negocio ampliada (stakeholders, problema, valor) |

---

## 5. Casos de uso y trazabilidad (v1.0)

| ID | Nombre | Diagramas `07_diagramas/` |
|----|--------|---------------------------|
| FSD-UC-001 | Autenticación @umss.edu.bo | UC01_secuencia, UC01_estado |
| FSD-UC-002 | Carga y versionado evidencia | UC02_secuencia, UC02_estado |
| FSD-UC-003 | Dictamen TD y avance subfase | UC03_secuencia, UC03_estado |
| FSD-UC-004 … 012 | Dashboard, reportes, portal, … | Ver `04_fsd/casos_uso.md` §7 |

Matriz completa: `09_trazabilidad/matriz_trazabilidad.md` · Pruebas: `04_fsd/gherkin.md` (TC-01 … TC-14).

---

## 6. Reglas para humanos y agentes

| Archivo | Alcance |
|---------|---------|
| `rules/domain_rules.md` | Negocio UMSS, CR-SIG-01…04, estados, append-only |
| `rules/coding_rules.md` | API, BD, tests, Git, React |
| `rules/ai_rules.md` | HITL, skills, prompt contracts, métricas M-AI |

---

## 7. Release y métricas

| Artefacto | Ruta |
|-----------|------|
| Release notes v1.0.0 | `10_aportes/release-1.0.0.md` |
| Métricas IA (PCOV, SFID, TII, HRR) | `09_trazabilidad/metricas_ai_sdlc.md` |
| Roadmap producto | `03_prd/roadmap.md` |
| Cronograma tipo CEUB (ejemplo) | `07_diagramas/gantt-005-diagrama.mmd` |

---

## 8. Convenciones del paquete

| Tema | Convención |
|------|------------|
| Actores | [CC], [TD], [JD], [P] — ver `04_fsd/glosario.md` |
| IDs | `PRD-REQ-xxx`, `FSD-UC-xxx`, `TC-xx`, `RB-xx`, `NFR-xxx` |
| Datos de prueba | Prefijo `TEST_`, dominio `example.invalid` (no datos reales UMSS) |
| Commits / PR | Declarar `FSD-UC` + `TC` (`rules/coding_rules.md` CR-CD-07) |
| IA | Sin dictamen automático; borradores `BORRADOR — NO DISTRIBUIR` |

---

## 9. Índices espejo en `docs/`

Para navegación desde la raíz del repo, existen resúmenes en `docs/<carpeta>/` que apuntan a los canónicos bajo `team/Marlene/`.

---

## 10. Contacto y gobernanza

| Tema | Responsable típico |
|------|-------------------|
| Alcance producto | Jefatura DUEA [JD] |
| Especificación técnica | Tech Lead AcredIA |
| Dictamen normativo | Técnicos DUEA [TD] |
| Cambios LFSD / excepciones | Comité de cambio DUEA + AcredIA |

---

## 11. Registro de cambios

| Versión | Fecha | Nota |
|---------|-------|--------|
| v1.0 | 14/05/2026 | README inicial del paquete documental Marlene |

---

*Visión detallada: `02_vision_negocio_v2.md`. Especificación: `04_fsd/FSD.md`. Repositorio general: `README.md` (raíz).*
