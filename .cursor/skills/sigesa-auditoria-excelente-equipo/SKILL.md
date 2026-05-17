---
name: sigesa-auditoria-excelente-equipo
description: |
  Audita la carpeta team/<integrante>/ contra la rúbrica «Excelente» (10 criterios SIGESA)
  y genera AUDITORIA_RUBRICAS_EXCELENTE.md + INVENTARIO_TAREAS_APORTES_v1.md en 08_trazabilidad/.
  Usar cuando pidan auditoría Excelente por persona, inventario de aportes, cuadre APORTES,
  verificación solo team/Marlene, team/borisAngulo, team/aylenGonzales, etc.
allowed-tools:
  - read
  - edit
  - grep
  - run_terminal_cmd
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

# Skill: Auditoría «Excelente» e inventario de aportes por carpeta de equipo

> **Agente:** @QaAgent · Complementa `sigesa-auditor-trazabilidad-dti` (matriz global en `docs/09_trazabilidad/`) con verificación **local** por integrante bajo `team/<nombre>/`.

---

## 1. Cuándo activar

| Trigger | Ejemplo |
|---------|---------|
| Explícito | «Genera auditoría e inventario para Marlene», «mismo que aylenGonzales pero en borisAngulo» |
| Re-auditoría | «Actualiza INVENTARIO_TAREAS_APORTES verificando solo su carpeta» |
| Release | Tras cambios grandes en `team/<nombre>/` antes de recalcular factor APORTES |

**No activar** para auditar `docs/01_brd/BRD.md` institucional (usar rúbrica BRD de negocio en `docs/`, no esta skill).

---

## 2. Alcance estricto

| Incluir | Excluir |
|---------|---------|
| Todo bajo `team/<integrante>/` | `docs/` raíz, `templates/`, `context/` |
| Subcarpeta `docs/` **dentro** del integrante (p. ej. `team/borisAngulo/docs/`) | Carpetas de otros integrantes |
| Insumos en raíz del integrante (`01_vision_negocio_v2.txt`, `log_interno.md`) | `.git/`, `_aportes_counts.json` como evidencia (solo fuente de filas) |

**Resolver ruta de trabajo:**

```
team/<integrante>/docs/   → si existe 01_brd o 03_prd dentro
team/<integrante>/        → si no hay docs/ numerados
```

**Salidas siempre en:** `<workRoot>/08_trazabilidad/` (crear carpeta si no existe).

---

## 3. Flujo obligatorio (orden)

```
[ ] 1. Identificar <integrante> (nombre exacto de carpeta team/)
[ ] 2. Ejecutar script base (inventario + borrador auditoría)
[ ] 3. Verificación manual en disco (grep + lectura BRD/PRD/FSD)
[ ] 4. Enriquecer AUDITORIA_RUBRICAS_EXCELENTE.md (§1–§11, gaps, puntuación final)
[ ] 5. Ajustar INVENTARIO (estados, cuadre estricto, observaciones)
[ ] 6. Opcional: append PROMPT_MAPPING.md (PM-xxx)
[ ] 7. Resumir al usuario: X/10, rutas, gaps prioritarios
```

### Paso 2 — Script (desde raíz del repo)

```bash
node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-auditoria-inventario.js <Integrante>
```

Varios integrantes:

```bash
node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-auditoria-inventario.js Marlene borisAngulo aylenGonzales
```

Todos en `team/`:

```bash
node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-auditoria-inventario.js --all
```

El script:

- Lee filas T-xxx desde `_aportes_counts.json` (clave = nombre carpeta).
- Escanea métricas (PRD-US, FSD-UC, `.mmd`, PC, skills).
- Escribe **borrador** de auditoría con veredictos automáticos → **debes revisarlos**.

### Paso 3 — Verificación manual (mínimo)

| Métrica | Comando / acción |
|---------|------------------|
| PRD-US | `grep -r "PRD-US-" team/<integrante>/` o en `docs/` |
| FSD-UC | `grep -r "FSD-UC-" team/<integrante>/` |
| Diagramas | Contar `.mmd` en `07_diagramas/` **sin** subcarpeta `mmd/` borradores |
| NFR | `06_nfr/` o `06_prompt_contracts/NFR.md` |
| PC | `*.prompt.md` o `## PC-` en `prompt-contracts.md` |
| Skills | `**/skills/skill*.md` o `name:` en `SKILLS.md` |
| Trazabilidad | ¿Existen `matriz_trazabilidad.md`, `metricas_ai_sdlc.md`? |

**Plantilla de referencia (estructura y profundidad):**

- `team/aylenGonzales/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`
- `team/aylenGonzales/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md`

**Umbrales:** ver [RUBRICA.md](RUBRICA.md).

---

## 4. Archivos a generar

### 4.1 `AUDITORIA_RUBRICAS_EXCELENTE.md`

Metadatos obligatorios: autor, fecha, alcance «únicamente team/…», enlace al inventario, método.

Secciones mínimas:

1. Resumen ejecutivo (tabla 10 criterios × CUMPLE | PARCIAL | NO CUMPLE)
2. BRD … MRD … PRD … FSD (tablas con evidencia y rutas)
3. UC + Gherkin, NFR, PC, Diagramas, AGENTS+Skills, Trazabilidad
4. Gaps `GAP-<INI>01…` (solo carpeta del integrante)
5. Referencias

**Puntuación:** `N/10` donde N = criterios con veredicto **CUMPLE** (PARCIAL no cuenta).

### 4.2 `INVENTARIO_TAREAS_APORTES_v1.md`

| Bloque | Contenido |
|--------|-----------|
| Metadatos | Total T-001…T-NNN, autor, fecha, alcance |
| Resumen | Entregada / parcial / recomendada |
| Reglas de conteo | Enlace APORTES_TEMPLATE + reglas oficiales |
| Cuadre estricto | Tabla PRD-US, UC, `.mmd`, NFR, skills, matriz, POC |
| Registro | Tabla `\| ID \| Categoria \| Descripcion \| Referencia \| Estado \| Observacion \|` |

**Reglas de conteo (resumen):** 1 UC, 1 NFR, 1 `.mmd` oficial, 1 `##` sustantivo, 1 ADR, 1 POC **ejecutada**, 1 skill, 1 rule, 1 PC, 1 US, bitácora, código+prueba. No duplicar UC/diagrama. Ver [RUBRICA.md](RUBRICA.md).

**Estados:**

| Estado | Cuándo |
|--------|--------|
| Entregada | Artefacto existe y cumple regla |
| Entregada parcial | Existe pero incompleto (log vacío, POC solo propuesta) |
| Recomendada | Gap documentado, aún no existe |
| Referencia repo | Rule `.mdc` solo en raíz (documentar en AGENTS) |

---

## 5. Registro en `PROMPT_MAPPING.md` (si el usuario lo pide)

Añadir al **final** (append only):

```markdown
### YYYY-MM-DDTHH:MM:SS — Prompt usuario (auditoría + inventario <integrante>)

**Prompt:** …
**Acción:** …
**Resultado:** X/10 — rutas …

| PM-0xx | docs | team/<integrante>/08_trazabilidad/ | … | fecha | — |
```

---

## 6. Variantes de layout conocidas

| Integrante | workRoot | Notas |
|------------|----------|-------|
| aylenGonzales | `team/aylenGonzales/` | Referencia 10/10; 18 `.mmd` AYL/seq |
| Marlene | `team/Marlene/` | 18 `MAR-*`; PC `PC-NFR-*`; 2 skills |
| borisAngulo | `team/borisAngulo/docs/` | 11 `diag-*`; 14 PC en MD; FSD LFSD mínimo |
| alexAlvarez | `team/alexAlvarez/docs/` | Estructura `docs/` numerada |

---

## 7. Límites (no hacer)

- No mezclar artefactos de otros integrantes en el inventario.
- No sobrescribir entradas previas en `log_interno.md` del usuario (regla `02_session_prompt_logging`).
- No declarar 10/10 sin verificar físicamente matriz, métricas y POC ejecutadas.
- No contar diagramas duplicados en `07_diagramas/mmd/D-*` si ya hay versión `MAR-*` / oficial en README.

---

## 8. Relación con otras skills

| Skill | Relación |
|-------|----------|
| `sigesa-auditor-trazabilidad-dti` | Matriz global `docs/09_trazabilidad/`; esta skill es **por carpeta team/** |
| `sigesa-generacion-documentos-negocio` | Produce BRD/MRD/PRD a auditar |
| `sigesa-generacion-documentos-tecnicos` | Produce FSD/diagramas a auditar |

---

## 9. Checklist de cierre

- [ ] Solo archivos bajo `team/<integrante>/` citados como evidencia
- [ ] Inventario T-001…T-NNN coherente con `_aportes_counts.json` + extras de gaps
- [ ] Cuadre estricto documentado (tareas únicas vs filas «Entregada»)
- [ ] Auditoría con puntuación N/10 y gaps accionables
- [ ] Usuario informado de rutas absolutas relativas al repo
