# Diagramas Mermaid — repositorio canónico SIGESA

Carpeta **oficial** de artefactos `.mmd` para la documentación Dorada en `docs/`. Los equipos entregan en `team/*/07_diagramas/`; aquí se consolidan las copias maestras. Las rutas `docs/{02_mrd,03_prd,04_fsd,05_dti}/07_diagramas/` son **vistas** con enlaces simbólicos a esta carpeta.

## Convención

| Regla | Detalle |
|-------|---------|
| Fuente editable | Archivos **reales** solo en `docs/07_diagramas/` |
| Vistas por documento | `docs/XX_*/07_diagramas/*.mmd` → `../../07_diagramas/<nombre>.mmd` |
| Equipo | `team/*/07_diagramas/*.mmd` → `../../../../docs/07_diagramas/<nombre>.mmd` (mismo contenido) |
| Alias | Nombres orientados a PRD/MRD/FSD (ej. `seq-001-001-autenticacion-secuencia.mmd`) apuntan al `.mmd` base (ej. `seq-001-01-autenticacion.mmd`) |

## Índice por familia

### FSD / casos de uso (Alex + Boris + Aylen)

| Archivo (alias o base) | FSD-UC / uso | Origen equipo |
|------------------------|--------------|---------------|
| `seq-001-001-autenticacion-secuencia.mmd` | UC-001 | Boris `seq-001-01-autenticacion.mmd` |
| `seq-003-003-010-proceso-y-cierre-fase-secuencia.mmd` | UC-003, UC-010 | Alex `seq-003-03-secuencia.mmd` |
| `seq-004-004-008-carga-y-observacion-secuencia.mmd` | UC-004, UC-008 | Alex `seq-002-02-secuencia.mmd` |
| `state-004-004-005-estados-evidencia.mmd` | UC-004, UC-005 | Alex `state-002-02-estado.mmd` |
| `seq-006-006-subsanar-evidencia-secuencia.mmd` | UC-006 | Alex `seq-001-01-secuencia.mmd` |
| `state-006-006-008-009-estados-indicador.mmd` | UC-006, UC-008, UC-009 | Alex `state-001-01-estado.mmd` |
| `state-010-010-cierre-fase-estados.mmd` | UC-010 | Alex `state-003-03-estado.mmd` |
| `er-002-modelo-funcional.mmd` | Modelo funcional | Alex `er-006-diagrama.mmd` |
| `er-001-modelo-fisico.mmd` | Modelo físico / DTI | Boris `er-005-05-modelo-datos.mmd` |
| `diag-01` … `diag-10` | Arquitectura, estados, NFR | Boris |
| `seq-001` … `seq-003`, `state-flujo-*` | Secuencias Aylen | aylenGonzales |
| `AYL-SEQ-*` | UC extendidos Aylen | aylenGonzales |

### PRD

| Archivo | Uso |
|---------|-----|
| `gantt-026-roadmap-2026-2027.mmd` | Roadmap producto |
| `gantt-007-release-producto.mmd` | Releases v1.0 / v1.1 |
| `gantt-008-sprint-equipo.mmd` | Sprint equipo |
| `gantt-006-ciclo-acreditacion-institucional.mmd` | Ciclo CEUB/ARCU-SUR |
| `PRD_journey_CC_subsanacion_*.mmd` | User journey [CC] |
| `seq-002-journey-td-cierre-fase-secuencia.mmd` | User journey [TD] |

### MRD

| Archivo | Uso |
|---------|-----|
| `er-004-dominio-negocio.mmd` | Dominio negocio |
| `er-003-contexto-entidades.mmd` | Contexto entidades |
| `pie-001-cobertura-nfr-mercado.mmd` | Cobertura NFR mercado |

### DTI — C4 (fuente única; enlazado desde `docs/05_dti/DTI.md` §2)

| Archivo | Nivel | Uso |
|---------|-------|-----|
| `c4-006-06-contexto-sistema.mmd` | C4-1 Contexto | Actores [CC]/[TD]/[JD]/[P], SIGESA, SMTP, CEUB |
| `c4-007-07-contenedores-sistema.mmd` | C4-2 Contenedores | Stack Dorada v1.0 (React 18, Node 20, PostgreSQL 16, volumen Docker) |

### Marlene (`MAR-*`, `D-*`)

Diagramas de módulo Marlene (ER, secuencias, Gantt, estados). Prefijos `MAR-` en raíz de equipo; `D-*` provenientes de `team/Marlene/07_diagramas/mmd/`.

### NFR

| Archivo | Uso |
|---------|-----|
| `pie-010-cobertura-iso25010.mmd` | Cobertura ISO 25010 (Alex NFR) |

## Mantenimiento

1. Editar el archivo en `docs/07_diagramas/` (o copiar desde equipo y reemplazar aquí).
2. No duplicar contenido en `docs/04_fsd/07_diagramas/` u otras vistas: solo `ln -s`.
3. Tras agregar un diagrama nuevo, registrar enlace en el README de la vista (`docs/03_prd/07_diagramas/README.md`, etc.) y en el documento maestro (FSD/PRD/MRD).

## Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 2026-05-17 | Consolidación canónica desde `team/*/07_diagramas/`; vistas MRD/PRD/FSD reenlazadas |
| v1.1 | 2026-05-17 | C4 unificado: `diag-06` contexto + `diag-07` contenedores; DTI §2 sin duplicar Mermaid inline |
