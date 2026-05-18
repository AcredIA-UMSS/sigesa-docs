# Escenarios Gherkin — SIGESA

| Campo | Valor |
|-------|-------|
| **Ámbito** | `team/alexAlvarez/docs/04_fsd/` |
| **Versión** | v1.0 |
| **Fuente PRD** | [`../03_prd/user_stories.md`](../03_prd/user_stories.md) |
| **Regla QA** | `.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc` |

> `# language: es`. Tags: `@PRD-US-xxx` `@FSD-UC-xxx`. Incluye **camino triste** en operaciones críticas (append-only, cierre de fase).

---

## FSD-UC-001 — Autenticación (`PRD-US-001`)

```gherkin
# language: es
@PRD-US-001 @FSD-UC-001
Característica: Autenticación institucional

  Escenario: Inicio de sesión exitoso [CC]
    Dado un Coordinador de Carrera con correo @umss.edu.bo y rol asignado
    Cuando inicia sesión con credenciales válidas
    Entonces el sistema crea sesión JWT de 8 horas
    Y redirige al dashboard de su carrera

  Escenario: Credenciales inválidas sin filtrar existencia
    Cuando ingresa credenciales incorrectas
    Entonces recibe error genérico de autenticación
    Y no se crea sesión

@FSD-UC-001 @TC-SAD-AUTH
  Escenario: Operación sin sesión
    Dado un usuario no autenticado
    Cuando intenta POST /evidences
    Entonces el sistema responde 401 AUTH_REQUIRED
    Y no registra evidencia
```

---

## FSD-UC-004 — Cargar Evidencia (`PRD-US-002`)

```gherkin
# language: es
@PRD-US-002 @FSD-UC-004
Característica: Carga de Evidencia por Indicador

  Escenario: Carga válida en Fase 1
    Dado un [CC] autenticado para su carrera
    Y un Indicador en estado PENDIENTE
    Cuando sube un PDF de 2 MB con título y descripción
    Entonces se crea evidence_version v1
    Y el Indicador pasa a SUBIDO
    Y se notifica al [TD]

@PRD-US-002 @FSD-UC-004 @TC-SAD-MIME
  Escenario: Rechazo de tipo de archivo no permitido
    Cuando intenta subir un ejecutable .exe
    Entonces el sistema responde 400 INVALID_MIME_TYPE
    Y no almacena blob
```

---

## FSD-UC-006 — Subsanar (`PRD-US-003`, `025`)

```gherkin
# language: es
@PRD-US-003 @FSD-UC-006
Característica: Subsanación append-only

  Escenario: Subsanación anclada a observación
    Dado un Indicador en estado OBSERVADO
    Y una Observación ABIERTA con id conocido
    Cuando el [CC] sube Evidence v2 con observationId
    Entonces el Indicador pasa a SUBSANADO
    Y la versión v1 permanece consultable

@PRD-US-003 @FSD-UC-006 @TC-SAD-DELETE
  Escenario: Intento de borrar evidencia normativa
    Dado una Evidence v1 registrada
    Cuando cualquier rol invoca DELETE /evidences/{id}
    Entonces el sistema responde 409 EVIDENCE_IMMUTABLE
```

---

## FSD-UC-008 — Observar (`PRD-US-009`)

```gherkin
# language: es
@PRD-US-009 @FSD-UC-008
Característica: Observación del Técnico DUEA

  Escenario: Observación con justificación
    Dado un [TD] autenticado
    Y un Indicador SUBIDO con evidencia
    Cuando registra observación con texto de al menos 20 caracteres
    Entonces el Indicador pasa a OBSERVADO
    Y el [CC] recibe notificación en 15 minutos

@PRD-US-009 @FSD-UC-008 @TC-SAD-JUST
  Escenario: Observación sin justificación
    Cuando intenta observar con campo vacío
    Entonces el sistema responde 422 JUSTIFICATION_REQUIRED
```

---

## FSD-UC-009 — Aprobar (`PRD-US-023`)

```gherkin
# language: es
@PRD-US-023 @FSD-UC-009
Característica: Aprobación de Indicador

  Escenario: Aprobación tras subsanación
    Dado un Indicador SUBSANADO
    Cuando el [TD] aprueba
    Entonces el Indicador pasa a APROBADO
    Y la Observación pasa a CERRADA

@PRD-US-023 @FSD-UC-009 @TC-SAD-APPROVE
  Escenario: Aprobar sin evidencia
    Dado un Indicador PENDIENTE sin evidence_version
    Cuando el [TD] intenta aprobar
    Entonces el sistema rechaza la operación
```

---

## FSD-UC-010 — Cerrar Fase (`PRD-US-014`)

```gherkin
# language: es
@PRD-US-014 @FSD-UC-010
Característica: Transición de Fase

  Escenario: Cierre exitoso cuando todos aprobados
    Dado todos los Indicadores de la Fase en APROBADO
    Cuando el [TD] solicita cierre de fase
    Entonces la Fase pasa a COMPLETADA
    Y se abre la siguiente Fase

@PRD-US-014 @FSD-UC-010 @TC-SAD-PHASE
  Escenario: Bloqueo por indicador observado
    Dado al menos un Indicador OBSERVADO en la Fase
    Cuando solicita cierre de fase
    Entonces el sistema responde 409 FASE_CIERRE_BLOQUEADO
```

---

## FSD-UC-016 — Portal (`PRD-US-016`, `017`)

```gherkin
# language: es
@PRD-US-016 @FSD-UC-016
Característica: Consulta pública

  Escenario: Consulta sin autenticación
    Dado un visitante anónimo
    Cuando busca una carrera publicada
    Entonces ve estado de acreditación oficial
    Y no ve evidencias internas ni observaciones

@PRD-US-017 @FSD-UC-016
  Escenario: Descarga de certificado publicado
    Dado una carrera con publication_snapshot activo
    Cuando solicita certificado
    Entonces recibe el PDF institucional
```

---

## FSD-UC-003 — Plantillas (`PRD-US-024`)

```gherkin
# language: es
@PRD-US-024 @FSD-UC-003
Característica: Plantilla CEUB/ARCU-SUR

  Escenario: Crear proceso con taxonomía materializada
    Dado plantilla CEUB activa
    Cuando el [JD] crea un Proceso para una carrera
    Entonces existen Indicadores para todas las Dimensiones del marco
```

---

## Índice completo PRD → Gherkin

| PRD-US | FSD-UC | Archivo PRD detalle |
|--------|--------|---------------------|
| 001 | UC-001 | user_stories.md §001 |
| 002–003 | UC-004, UC-006 | §002–003 |
| 009, 023 | UC-008, UC-009 | §009, §023 |
| 016–017 | UC-016 | §016–017 |
| 024–026 | UC-003, UC-017 | §024–026 |

Escenarios adicionales en [`../03_prd/user_stories.md`](../03_prd/user_stories.md).
