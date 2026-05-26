# Reglas de codificación — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Ubicación canónica** | `team/Marlene/rules/coding_rules.md` |
| **Complementa** | `domain_rules.md`, `ai_rules.md`, `04_fsd/api_contracts.md`, `04_fsd/modelo_datos.md` |
| **Audiencia** | Desarrolladores, agentes IA (@DevAgent), revisores de PR |

---

## 1. Propósito y alcance

Define **estándares técnicos** para el repositorio de **implementación** de SIGESA (API, SPA, workers, migraciones). Las reglas de **dominio** (RB, estados, evidencias) están en `domain_rules.md`; este documento cubre **cómo escribir el código** que las respeta.

| Documento | Contenido |
|-----------|-----------|
| `coding_rules.md` | Estilo, arquitectura, API, BD, tests, seguridad |
| `domain_rules.md` | Qué debe hacer el sistema (acreditación UMSS) |
| `api_contracts.md` | Contratos HTTP v1 |
| `NFR_ISO25010.md` | Umbrales medibles |

**Stack de referencia v1.0** (FSD §5):

| Capa | Tecnología |
|------|------------|
| UI | SPA **React** (TypeScript) |
| API | **Node.js + Express** *o* **Python + FastAPI** (elegir uno por repo; no mezclar en mismo servicio) |
| BD | **PostgreSQL 14+** |
| Objetos | Almacenamiento **S3-compatible** |
| Async | Workers (notificaciones SMTP, jobs PDF) |
| Migraciones | Flyway o Liquibase |

---

## 2. Identificadores de reglas (CR-CD)

| ID | Tema |
|----|------|
| CR-CD-01 | Estructura de proyecto y capas |
| CR-CD-02 | Nomenclatura y tipos |
| CR-CD-03 | API REST y errores |
| CR-CD-04 | Persistencia y transacciones |
| CR-CD-05 | Seguridad y secretos |
| CR-CD-06 | Pruebas y cobertura |
| CR-CD-07 | Git, PR y trazabilidad |
| CR-CD-08 | Observabilidad y logs |
| CR-CD-09 | Frontend (React) |

---

## 3. CR-CD-01 — Estructura y capas

### 3.1 Organización recomendada (monorepo o multi-repo)

```text
apps/
  web/          # React SPA
  api/          # REST + dominio
  worker/       # outbox SMTP, reportes PDF
packages/
  shared/       # tipos, códigos error, validadores Zod/Pydantic
```

### 3.2 Capas API (obligatorio)

| Capa | Responsabilidad | No debe |
|------|-----------------|--------|
| **Controller / Router** | HTTP, auth, validación entrada, mapeo status | Contener reglas RB-03 |
| **Service / Use case** | Orquestación, transacciones, RB/BR | Acceder HTTP directo |
| **Repository** | SQL parametrizado, entidades | Lógica de negocio |
| **Domain** (opcional) | Entidades, transiciones estado | Conocer Express/FastAPI |

**Regla:** toda regla **RB** y **BR Must** vive en **service** (o módulo `domain`), con test unitario dedicado.

### 3.3 Módulos alineados a MOD-*

Carpetas o paquetes por dominio: `auth`, `catalogo`, `proceso`, `documento`, `workflow`, `dashboard`, `reporte`, `notificacion`, `auditoria`, `publico`.

---

## 4. CR-CD-02 — Nomenclatura y tipos

| Ámbito | Convención | Ejemplo |
|--------|------------|---------|
| Tablas / columnas BD | `snake_case` | `indicador_id`, `creado_en` |
| JSON API request/response | `camelCase` | `indicadorId`, `nuevoEstado` |
| Enums persistidos | `SCREAMING_SNAKE_CASE` | `EN_REVISION`, `APROBADO` |
| Códigos error API | `SIGESA_<DOMINIO>_<DETALLE>` | `SIGESA_WF_INCOMPLETE` |
| UUID | RFC 4122 v4 | `gen_random_uuid()` en PG |
| Timestamps | ISO-8601 UTC con `Z` en JSON | `2026-05-14T18:30:00Z` |
| BD timestamps | `TIMESTAMPTZ` UTC | `creado_en` |
| Archivos TS/JS | `kebab-case` o `PascalCase` componentes | `IndicadorService.ts` |
| Rutas REST | plural sustantivo, kebab si compuesto | `/subfases/{id}/avance` |
| Constantes | `SCREAMING_SNAKE_CASE` | `MAX_UPLOAD_BYTES` |

**TypeScript:** `strict: true`; prohibido `any` en capa service/repository sin comentario `// ADR-xxx`.

**Python:** type hints en funciones públicas; Pydantic v2 para DTOs de API.

**IDs en código de dominio:** preferir nombres del glosario (`documento`, `indicador`, `subfase`) sobre alias genéricos (`file`, `item`).

---

## 5. CR-CD-03 — API REST

### 5.1 Contrato obligatorio

- Base: `/api/v1` (véase `api_contracts.md`).
- Autenticación: `Authorization: Bearer <JWT>` salvo rutas públicas documentadas.
- Correlación: propagar `X-Request-Id` (generar UUID si falta).

### 5.2 Envelope de error (RB-10)

Toda respuesta 4xx/5xx:

```json
{
  "error": {
    "code": "SIGESA_WF_INCOMPLETE",
    "message": "No puede cerrar la subfase: quedan indicadores obligatorios sin aprobar.",
    "hint": "Revise la lista indicadoresPendientes y complete la carga o dictamen.",
    "details": [{ "indicadorId": "uuid", "estado": "PENDIENTE" }]
  },
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

- `message` y `hint` en **español institucional**; roles como [TD], [CC] cuando aplique (`domain_rules.md` DR-03).
- No exponer stack traces ni SQL en producción.

### 5.3 Mapeo HTTP

Usar la tabla de `api_contracts.md` §1.5; no inventar códigos fuera del catálogo sin actualizar contrato + `reglas_negocio.md`.

### 5.4 Idempotencia y cargas

- `POST /documentos`: soportar cabecera `Idempotency-Key` (UUID).
- Multipart: validar MIME whitelist y tamaño ≤ 52_428_800 bytes **antes** de escribir en S3.

### 5.5 Paginación

Cursor opaco (`nextCursor`); `limit` default 20, max 100 — no offset profundo en tablas grandes.

---

## 6. CR-CD-04 — Persistencia y transacciones

| Regla | Detalle |
|-------|---------|
| FK núcleo | `ON DELETE RESTRICT` |
| Carga documento + indicador + outbox | **Una transacción** |
| Dictamen + auditoría + notificación | **Una transacción** (outbox mismo TX) |
| `log_auditoria` | Solo `INSERT`; rol app sin `UPDATE`/`DELETE` |
| `documento` | Sin `DELETE`; nueva versión = `INSERT` (`domain_rules.md` DR-06) |
| Consultas | Siempre parametrizadas; prohibido concatenar SQL con input usuario |
| Optimistic lock | Campo `actualizado_en` o `version` en `indicador` para UC-003 |

**Migraciones:**

- Una migración = un cambio lógico; reversible cuando sea posible.
- Nombres: `V{nnn}__descripcion_snake.sql` (Flyway) o equivalente Liquibase.
- Sin datos reales UMSS en seeds (`TEST_*`, `example.invalid`).

---

## 7. CR-CD-05 — Seguridad

| Regla | Implementación |
|-------|----------------|
| P-S01 | Sin secretos en código, prompts, issues públicos |
| P-S02 | JWT mínimo: `sub`, `rol`, `carreraIds`, `exp` — no PII innecesaria |
| RB-06 | Validar dominio `@umss.edu.bo` en login |
| RBAC | Middleware por ruta; [CC] solo carreras asignadas |
| Contraseñas | bcrypt cost ≥ 12 |
| Archivos | Validar magic bytes + MIME; escanear malware si política UMSS lo exige |
| Rate limit | Login 5 fallos / 15 min → 429 |
| Dependencias | CI con Trivy/Dependabot (M-AI-011) |

**Prohibido en PR:** `.env` con valores reales, tokens, claves S3, cadenas de conexión productivas.

---

## 8. CR-CD-06 — Pruebas

| Nivel | Herramienta sugerida | Obligatorio para |
|-------|---------------------|------------------|
| Unitario | Jest/Vitest o pytest | Cada RB/BR en service |
| Integración API | Supertest / httpx | Endpoints C1 |
| E2E | Playwright | Flujos UC-001…005 smoke |
| BDD | Cucumber (opcional) | Escenarios `gherkin.md` |
| Carga | k6 | NFR-001 buscador, picos convocatoria |

**Convenciones:**

- Archivos test: `*.test.ts` / `test_*.py` junto al módulo o en `__tests__/`.
- Fixtures: prefijo `TEST_`; emails `usuario@example.invalid`.
- Cada bugfix de regla de negocio incluye test de regresión citando `TC-xx` o `RB-xx`.

**Cobertura mínima (release):** ≥ 80 % en módulos core MOD-AUTH, DOCS, WF (`M-AI-003`).

**Etiquetas en tests E2E:** `@smoke`, `@workflow`, `@auth` según `gherkin.md`.

---

## 9. CR-CD-07 — Git y pull requests

### 9.1 Ramas

| Patrón | Uso |
|--------|-----|
| `main` | Producción protegida |
| `develop` | Integración (si aplica) |
| `feature/FSD-UC-003-rechazo-td` | Features |
| `fix/TC-07-justificacion-corta` | Correcciones |

### 9.2 Mensajes de commit (Conventional Commits + trazabilidad)

```text
feat(workflow): validar justificación rechazo TD

FSD-UC-003 · PRD-REQ-005 · TC-07
RB-03 no afectado
```

### 9.3 Descripción de PR (obligatorio)

```markdown
## Trazabilidad
- FSD-UC-003
- PRD-REQ-005
- TC-07

## Cambios
...

## Checklist
- [ ] domain_rules.md DR-01…07
- [ ] Tests añadidos/actualizados
- [ ] api_contracts.md si cambia contrato
```

Merge a `main`: revisión humana [TD] o Tech Lead si **C1** (`AGENTS.md`).

---

## 10. CR-CD-08 — Observabilidad

| Elemento | Regla |
|----------|-------|
| `X-Request-Id` | Log en cada línea de request |
| OpenTelemetry | Spans en API y workers; atributos `model_id`, `prompt_version` solo en rutas IA |
| Logs | No registrar contenido de PDF ni contraseñas |
| Auditoría negocio | Eventos en `log_auditoria` vía servicio dedicado, no solo logs app |
| Métricas | Prometheus/APM: latencia p95, cola outbox, jobs PDF |

---

## 11. CR-CD-09 — Frontend (React)

| Tema | Regla |
|------|-------|
| Estado servidor | React Query / TanStack Query para datos API |
| Formularios | Validación cliente alineada NFR-010; mismos mensajes que API cuando sea posible |
| Carga archivos | Barra de progreso obligatoria (NFR-009) |
| Rutas | `/login`, `/dashboard/coordinador`, `/dashboard/tecnico`, `/dashboard/jefatura` (LFSD §9) |
| i18n | Español v1; strings en archivos centralizados, no hardcode disperso |
| Accesibilidad | Objetivo WCAG AA en flujos [CC] (NFR-008) |
| Roles UI | Mostrar [CC]/[TD]/[JD] en mensajes de ayuda según DR-03 |

**Prohibido:** almacenar JWT en `localStorage` si política UMSS exige httpOnly cookie — seguir ADR de seguridad DTI.

---

## 12. Patrones obligatorios por caso de uso

| UC | Patrón código | Referencia |
|----|---------------|------------|
| UC-001 | Auth middleware + redirect por `rol` | `UC01_secuencia.mmd` |
| UC-002 | Multipart → S3 → INSERT documento + UPDATE indicador | `UC02_secuencia.mmd` |
| UC-003 | PATCH decision + validación longitud; POST avance transaccional | `UC03_secuencia.mmd` |
| UC-005 | Job async + polling `GET /reportes/jobs/{id}` | `api_contracts.md` |
| UC-006 | Outbox pattern; reintentos RB-12 | `modelo_datos.md` |
| UC-009 | Solo lectura logs; sin endpoint DELETE | `gherkin.md` UC-009 |

---

## 13. Anti-patrones técnicos

| Anti-patrón | Sustituto |
|-------------|-----------|
| Lógica RB en controller | Service + test unitario |
| `DELETE FROM documento` | Nueva versión INSERT |
| Errores string sueltos | Envelope `SIGESA_*` |
| `fecha_limite_externa` en DTO PATCH genérico | Endpoint restringido a rol `NORMATIVA_SUPER` / [JD] |
| Paginación `OFFSET` en auditoría grande | Cursor |
| Secretos en `docker-compose.yml` commitado | Variables entorno + vault |
| Tipos duplicados API/BD sin mapper | `packages/shared` o capa `dto` |

---

## 14. Checklist pre-merge (desarrollador / agente)

- [ ] Cumple `domain_rules.md` (DR-01…07)
- [ ] Contrato API documentado si hay cambio HTTP
- [ ] Migración BD revisada por @ArchAgent si toca esquema
- [ ] Tests pasan en CI; cobertura no cae > 5 pp sin ADR
- [ ] Sin secretos ni datos institucionales ficticios sin `TEST_`
- [ ] `FSD-UC-xxx` y `TC-xx` en PR
- [ ] Linter/formatter ejecutado (ESLint+Prettier / Ruff+Black)

---

## 15. Implementación en Cursor

| Archivo `.mdc` sugerido | Contenido |
|-------------------------|-----------|
| `08_sigesa_api_errors.mdc` | CR-CD-03 envelope |
| `09_sigesa_persistence.mdc` | CR-CD-04 transacciones |
| `10_sigesa_tests.mdc` | CR-CD-06 convenciones |

Complementan `01_domain_language.mdc`, `02_state_machine.mdc`, `03_append_only_db.mdc`.

---

## 16. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Versión inicial alineada FSD §5, §18 y paquete Marlene |

---

*Dominio: `domain_rules.md`. Contratos: `04_fsd/api_contracts.md`. Calidad: `05_nfr/NFR_ISO25010.md`.*
