# Modelo de datos funcional — SIGESA

| Campo | Valor |
|-------|-------|
| **Ámbito** | `team/alexAlvarez/docs/04_fsd/` |
| **Versión** | v1.0 |
| **Diagrama ER** | [`../07_diagramas/modelo_er.mmd`](../07_diagramas/modelo_er.mmd) |
| **Glosario** | [`glosario.md`](glosario.md) |

> Modelo lógico-relacional para PostgreSQL. **Append-only** en prueba normativa. **Prohibido** en diseño: columnas `Unnamed: 0`, campos `gtin` u otros residuales de importación Excel.

---

## 1. Principios

| Principio | Implementación |
|-----------|----------------|
| Append-only | `evidence_version`, `observation`, `state_transition`, `audit_log` sin DELETE de negocio |
| Versionado | `version_no`, `supersedes_id`, `content_hash_sha256` |
| FK seguras | `ON DELETE RESTRICT` en cadena normativa |
| Roles en auditoría | `created_by_role` ∈ `CC`, `TD`, `JD`, `SYSTEM` |
| PK | `uuid` en entidades de dominio |

---

## 2. Jerarquía normativa

```text
accreditation_template (CEUB | ARCU-SUR)
  └── template_phase
  └── evaluation_dimension
        └── evaluation_criterion
              └── indicator_catalog
accreditation_process
  └── phase (instancia)
        └── indicator (instancia + estado)
              └── evidence (cabecera)
                    └── evidence_version (blob + hash)
              └── observation
```

---

## 3. Diccionario de entidades (core)

### 3.1 `academic_program` (Carrera)

| Atributo | Tipo | Oblig. | Descripción |
|----------|------|:------:|-------------|
| `id` | uuid PK | ✓ | Identificador |
| `faculty_id` | uuid FK | ✓ | Facultad UMSS |
| `code` | varchar(32) UK | ✓ | Código institucional |
| `name` | varchar(255) | ✓ | Nombre carrera |
| `estado` | enum | ✓ | `ACTIVO`, `INACTIVO` |

### 3.2 `accreditation_process` (Proceso)

| Atributo | Tipo | Oblig. | Descripción |
|----------|------|:------:|-------------|
| `id` | uuid PK | ✓ | |
| `program_id` | uuid FK | ✓ | Carrera |
| `template_id` | uuid FK | ✓ | Plantilla CEUB/ARCU-SUR |
| `gestion` | varchar(9) | ✓ | Ej. `2026-2027` |
| `modality` | enum | ✓ | `CEUB`, `ARCU_SUR` |
| `estado` | enum | ✓ | `BORRADOR`, `EN_PROCESO`, `ACREDITADO`, `RECHAZADO`, `VENCIDO` |
| `started_at` | timestamptz | ✓ | |
| `created_by` | uuid FK | ✓ | Usuario [JD]/[TD] |

**Índice único parcial:** un `EN_PROCESO` por (`program_id`, `modality`, `gestion`).

### 3.3 `phase` (Fase)

| Atributo | Tipo | Oblig. | Descripción |
|----------|------|:------:|-------------|
| `id` | uuid PK | ✓ | |
| `process_id` | uuid FK | ✓ | |
| `template_phase_id` | uuid FK | ✓ | Autoevaluación, Eval. Interna, Eval. Externa |
| `estado` | enum | ✓ | `ABIERTA`, `COMPLETADA`, `BLOQUEADA` |
| `normative_deadline` | date | ✓ | Plazo fatal institucional |

### 3.4 `indicator` (Indicador — instancia)

| Atributo | Tipo | Oblig. | Descripción |
|----------|------|:------:|-------------|
| `id` | uuid PK | ✓ | |
| `phase_id` | uuid FK | ✓ | |
| `catalog_id` | uuid FK | ✓ | Definición normativa |
| `estado` | enum | ✓ | `PENDIENTE`, `SUBIDO`, `OBSERVADO`, `SUBSANADO`, `APROBADO` |
| `updated_at` | timestamptz | ✓ | Última transición |

### 3.5 `evidence` + `evidence_version` (Evidencia)

**`evidence`** — contenedor estable por indicador.

| Atributo | Tipo | Oblig. |
|----------|------|:------:|
| `id` | uuid PK | ✓ |
| `indicator_id` | uuid FK | ✓ |
| `created_at` | timestamptz | ✓ |

**`evidence_version`** — versión append-only.

| Atributo | Tipo | Oblig. | Descripción |
|----------|------|:------:|-------------|
| `id` | uuid PK | ✓ | |
| `evidence_id` | uuid FK | ✓ | |
| `version_no` | integer | ✓ | 1, 2, 3… |
| `supersedes_id` | uuid FK | | Versión anterior |
| `observation_id` | uuid FK | | Obligatorio si subsanación |
| `storage_key` | varchar(512) | ✓ | Ruta objeto (S3-compatible) |
| `content_hash_sha256` | char(64) | ✓ | Integridad |
| `mime_type` | varchar(128) | ✓ | Validado en servidor |
| `file_size_bytes` | bigint | ✓ | Máx. 52_428_800 (50 MB) |
| `title` | varchar(200) | ✓ | |
| `description` | text | | |
| `created_by` | uuid FK | ✓ | |
| `created_by_role` | varchar(2) | ✓ | `CC` en carga |
| `created_at` | timestamptz | ✓ | Inmutable |

### 3.6 `observation` (Observación)

| Atributo | Tipo | Oblig. | Descripción |
|----------|------|:------:|-------------|
| `id` | uuid PK | ✓ | |
| `indicator_id` | uuid FK | ✓ | |
| `evidence_version_id` | uuid FK | ✓ | Versión observada |
| `justification` | text | ✓ | Mín. 20 caracteres |
| `estado` | enum | ✓ | `ABIERTA`, `REVISION_PENDIENTE`, `CERRADA` |
| `created_by` | uuid FK | ✓ | [TD] |
| `created_at` | timestamptz | ✓ | |
| `due_at` | timestamptz | ✓ | Plazo fatal subsanación |

### 3.7 `state_transition` (log de estados)

| Atributo | Tipo | Oblig. |
|----------|------|:------:|
| `id` | uuid PK | ✓ |
| `entity_type` | enum | ✓ | `INDICATOR`, `PHASE` |
| `entity_id` | uuid | ✓ |
| `from_state` | varchar(32) | ✓ |
| `to_state` | varchar(32) | ✓ |
| `created_by` | uuid FK | ✓ |
| `created_by_role` | varchar(2) | ✓ |
| `created_at` | timestamptz | ✓ |

### 3.8 `publication_snapshot` (Portal [P])

| Atributo | Tipo | Oblig. |
|----------|------|:------:|
| `id` | uuid PK | ✓ |
| `program_id` | uuid FK | ✓ |
| `accreditation_status` | varchar(64) | ✓ |
| `certificate_storage_key` | varchar(512) | |
| `published_at` | timestamptz | ✓ |
| `published_by` | uuid FK | ✓ |

---

## 4. Reglas de integridad (DB)

1. Trigger o constraint: `DELETE` sobre `evidence_version` → excepción.
2. `evidence_version.observation_id` NOT NULL cuando `version_no > 1` y fase = Evaluación Interna.
3. `indicator.estado = 'APROBADO'` implica ≥1 `evidence_version` asociada.
4. Sin columnas de soft-delete (`deleted_at`) en tablas normativas.

---

## 5. Trazabilidad

| Entidad negocio | Tabla física |
|-----------------|--------------|
| Proceso | `accreditation_process` |
| Fase | `phase` |
| Indicador | `indicator` |
| Evidencia | `evidence` + `evidence_version` |
| Observación | `observation` |

Ver también: [`../context/03_domain_glossary.md`](../context/03_domain_glossary.md).
