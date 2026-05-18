# Diagramas Mermaid — repositorio canónico SIGESA

Carpeta **oficial** de artefactos `.mmd` para la documentación Dorada en `docs/`. Los equipos entregan en `team/*/07_diagramas/`; aquí se consolidan las copias maestras. Las rutas `docs/{02_mrd,03_prd,04_fsd}/07_diagramas/` son **vistas** con enlaces simbólicos a esta carpeta.

## Convención

| Regla | Detalle |
|-------|---------|
| Fuente editable | Archivos **reales** solo en `docs/07_diagramas/` |
| Vistas por documento | `docs/XX_*/07_diagramas/*.mmd` → `../../07_diagramas/<nombre>.mmd` |
| Equipo | `team/*/07_diagramas/*.mmd` → `../../../../docs/07_diagramas/<nombre>.mmd` (mismo contenido) |
| Alias | Nombres orientados a PRD/MRD/FSD (ej. `FSD-UC-001_autenticacion_secuencia.mmd`) apuntan al `.mmd` base (ej. `diag-01-seq-autenticacion.mmd`) |

## Índice por familia

### FSD / casos de uso (Alex + Boris + Aylen)

| Archivo (alias o base) | FSD-UC / uso | Origen equipo |
|------------------------|--------------|---------------|
| `FSD-UC-001_autenticacion_secuencia.mmd` | UC-001 | Boris `diag-01-seq-autenticacion.mmd` |
| `FSD-UC-003_010_proceso_y_cierre_fase_secuencia.mmd` | UC-003, UC-010 | Alex `UC03_secuencia.mmd` |
| `FSD-UC-004_008_carga_y_observacion_secuencia.mmd` | UC-004, UC-008 | Alex `UC02_secuencia.mmd` |
| `FSD-UC-004_005_estados_evidencia.mmd` | UC-004, UC-005 | Alex `UC02_estado.mmd` |
| `FSD-UC-006_subsanar_evidencia_secuencia.mmd` | UC-006 | Alex `UC01_secuencia.mmd` |
| `FSD-UC-006_008_009_estados_indicador.mmd` | UC-006, UC-008, UC-009 | Alex `UC01_estado.mmd` |
| `FSD-UC-010_cierre_fase_estados.mmd` | UC-010 | Alex `UC03_estado.mmd` |
| `FSD-UC_modelo_er_funcional.mmd` | Modelo funcional | Alex `modelo_er.mmd` |
| `FSD-UC_modelo_er_fisico.mmd` | Modelo físico / DTI | Boris `diag-05-er-modelo-datos.mmd` |
| `diag-01` … `diag-10` | Arquitectura, estados, NFR | Boris |
| `seq-001` … `seq-003`, `state-flujo-*` | Secuencias Aylen | aylenGonzales |
| `AYL-SEQ-*` | UC extendidos Aylen | aylenGonzales |

### PRD

| Archivo | Uso |
|---------|-----|
| `gantt_roadmap_2026_2027.mmd` | Roadmap producto |
| `gantt_release_producto.mmd` | Releases v1.0 / v1.1 |
| `gantt_sprint_equipo.mmd` | Sprint equipo |
| `gantt_ciclo_acreditacion_institucional.mmd` | Ciclo CEUB/ARCU-SUR |
| `PRD_journey_CC_subsanacion_*.mmd` | User journey [CC] |
| `PRD_journey_TD_cierre_fase_secuencia.mmd` | User journey [TD] |

### MRD

| Archivo | Uso |
|---------|-----|
| `MRD_dominio_negocio_er.mmd` | Dominio negocio |
| `MRD_contexto_entidades.mmd` | Contexto entidades |
| `MRD_cobertura_nfr_mercado.mmd` | Cobertura NFR mercado |

### Marlene (`MAR-*`, `D-*`)

Diagramas de módulo Marlene (ER, secuencias, Gantt, estados). Prefijos `MAR-` en raíz de equipo; `D-*` provenientes de `team/Marlene/07_diagramas/mmd/`.

### NFR

| Archivo | Uso |
|---------|-----|
| `nfr_cobertura_iso25010.mmd` | Cobertura ISO 25010 (Alex NFR) |

## Mantenimiento

1. Editar el archivo en `docs/07_diagramas/` (o copiar desde equipo y reemplazar aquí).
2. No duplicar contenido en `docs/04_fsd/07_diagramas/` u otras vistas: solo `ln -s`.
3. Tras agregar un diagrama nuevo, registrar enlace en el README de la vista (`docs/03_prd/07_diagramas/README.md`, etc.) y en el documento maestro (FSD/PRD/MRD).

## Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 2026-05-17 | Consolidación canónica desde `team/*/07_diagramas/`; vistas MRD/PRD/FSD reenlazadas |
