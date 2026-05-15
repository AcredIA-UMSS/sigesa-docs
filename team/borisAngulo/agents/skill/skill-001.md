---
name: sigesa-fsd-uc-implementar
description: >
  Implementar un FSD-UC-NNN de SIGESA completo en arquitectura hexagonal:
  puerto de entrada, servicio de dominio, entidad, repositorio (puerto), adaptador JPA/repositorio,
  DTO de entrada/salida y migration Flyway/Alembic. Activar cuando el usuario cite
  un FSD-UC con PC asociado en prompt-contracts.md y pida código listo para PR.
allowed-tools:
  - read
  - edit
  - run-tests
model-tier: sonnet
fsd-version-min: v1.0
status: stable
owner: AcredIA / borisAngulo
---

# Skill-001 — Implementar FSD-UC en Arquitectura Hexagonal (SIGESA)

## 1. Cuándo activarlo

- DURANTE: implementación de un caso de uso con PC definido.
- ARRANCA cuando: el usuario escribe "implementa FSD-UC-NNN" o adjunta el fragmento del UC + su PC.
- NO ACTIVAR si: el UC tiene GAP abierto (ver AGENTS.md §14). Responder: "FSD-UC-NNN tiene GAP-XXX sin cerrar; escala a @ArchAgent primero."

## 2. Entradas obligatorias

| Campo | Fuente |
|-------|--------|
| ID del UC | `FSD-UC-NNN` explícito |
| Prompt-contrato | `team/borisAngulo/docs/04_fsd/prompt-contracts.md` → PC-NNN |
| Reglas de dominio | `AGENTS.md §6` (RB-01 … RB-11) |
| Stack vigente | ADR-001 (backend) + ADR-002 (frontend) |

Si falta el PC, responder: "No existe PC para FSD-UC-NNN. MUST escalar a @ArchAgent antes de implementar."

## 3. Fuentes de verdad (precedencia)

1. `prompt-contracts.md` → PC del UC (invariants + failure_modes + gherkin).
2. `FSD_v1.md` → flujo principal y alterno del UC.
3. `casos-de-uso.md` → flujos alternos detallados.
4. `AGENTS.md §6` → reglas de dominio invariantes.
5. ADRs vigentes → decisiones de stack y capas.

## 4. Procedimiento paso a paso

### 4.1 Verificación previa (STOP si falla alguno)
```
[ ] El UC tiene PC asociado en prompt-contracts.md
[ ] El UC NO aparece en AGENTS.md §14 (gaps bloqueantes)
[ ] Stack definido en ADR-001/ADR-002
[ ] RB aplicables al UC identificadas (mínimo RB-04 siempre)
```

### 4.2 Capas a generar (hexagonal)

```
domain/
  model/          ← Entidad + Value Objects (sin dependencias de framework)
  port/in/        ← UseCase interface (puerto de entrada)
  port/out/       ← RepositoryPort interface (puerto de salida)
  service/        ← DomainService implementando UseCase

adapter/
  in/api/
    controller/   ← REST controller (Spring/FastAPI/NestJS según ADR-001)
    dto/          ← RequestDTO + ResponseDTO  ← MUST NOT exponer entidad
  out/persistence/
    entity/       ← JPA/SQLAlchemy entity (solo en adaptador)
    repository/   ← implementación de RepositoryPort
    mapper/       ← entidad ↔ dominio

infrastructure/
  db/migrations/  ← Flyway .sql o Alembic .py (append-only para evidencias)
```

### 4.3 Reglas de implementación

- **RB-04**: TODO endpoint MUST verificar sesión + rol antes de lógica de negocio.
- **RB-07 / BR-012**: evidencias MUST registrar `usuario_responsable` + `fecha_carga`; tabla append-only.
- **RB-10**: todo cambio de estado MUST insertarse en tabla `historial_estado` con `usuario_id` + `timestamp`.
- **RB-11**: toda acción sensible MUST emitir evento a tabla `auditoria` (o servicio equivalente).
- **RB-09**: validar `fecha_inicio < fecha_fin` antes de persistir proceso/fase.
- DTOs MUST estar en `adapter/in/api/dto`; MUST NOT referenciar entidad de dominio directamente.

### 4.4 Tests obligatorios

Por cada AC Gherkin del PC correspondiente generar un test:

```
tests/
  unit/domain/        ← lógica pura de dominio (sin mocks de infraestructura)
  integration/        ← servicio + repositorio contra BD de test
  e2e/                ← flujo completo HTTP → BD (si aplica)
```

Meta mínima: **≥ 80 % cobertura en paquete `domain/`**.

## 5. Salida esperada

1. Archivos de código por capa (diff o archivos completos).
2. Migration script numerado y con comentario de UC.
3. Tabla de trazabilidad al final:

| FSD ID | Archivo | Test |
|--------|---------|------|
| FSD-UC-NNN AC1 | `domain/service/XService.java:L42` | `XServiceTest#ac1()` |
| RB-07 | `adapter/out/persistence/EvidenciaMapper` | `EvidenciaMapperTest#appendOnly` |
| NFR-002 | `infra/migrations/V003__evidencia_cifrado.sql` | revisión manual TI UMSS |

## 6. Criterios de "bien hecho"

- [ ] Toda regla RB referenciada en comentario `// RB-XX` o nombre de método.
- [ ] Cero lógica inventada: si algo no está en FSD/PC → `TODO(spec): pedir a @ArchAgent`.
- [ ] Build verde + linter sin warnings nuevos.
- [ ] No PII en logs; no secretos en código (`AGENTS.md §7`).
- [ ] Historial de evidencias: tabla append-only verificada con test.

## 7. Anti-patrones a rechazar

- Exponer entidad de dominio directamente en el controller → **STOP**.
- UPDATE/DELETE en tabla de versiones de evidencias → **STOP**, es append-only.
- Almacenar token/password en variable de clase → **STOP**, reportar a Boris Angulo.
- Implementar UC con GAP abierto → **STOP**, escalar.

## 8. Mini ejemplo de invocación

```
"Implementa FSD-UC-003 (carga y versionado de evidencias) usando skill-001.
 Stack: Spring Boot 3 + PostgreSQL 16."
```

## 9. Modos de fallo conocidos

| Fallo | Acción |
|-------|--------|
| PC cita BR inexistente | STOP — pedir corrección al responsable técnico |
| AC Gherkin contradice NFR | STOP — escalar al docente |
| Migration rompe tabla existente en `main` | STOP — MUST NOT modificar migrations aplicadas |

## 10. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 2026-05-14 | AcredIA / borisAngulo | Versión inicial |