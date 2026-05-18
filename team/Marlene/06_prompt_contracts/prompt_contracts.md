# Prompt contracts — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Producto** | SIGESA — Sistema de Evaluación y Acreditación de Carreras |
| **Institución** | UMSS · DUEA |
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Modo** | LFSD — contratos ejecutables para agentes IA y pruebas |
| **Fuente canónica** | `docs/LFSD.md` §7 |
| **FSD / UC** | `team/Marlene/04_fsd/casos_uso.md` |
| **API** | `team/Marlene/04_fsd/api_contracts.md` |
| **NFR** | `team/Marlene/05_nfr/NFR_ISO25010.md` |
| **Contratos IA (v2)** | `team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md` (PC-SIG-01 …) |
| **Gobernanza** | `AGENTS.md` · `team/Marlene/rules/ai_rules.md` · **RB-11** · `metricas_ai_sdlc.md` |

---

## 1. Propósito

Un **prompt contract** (PC) es una especificación formal que un agente IA (Cursor, CI, orquestador backend) debe cumplir al implementar o simular un **caso de uso** o **skill** de SIGESA.

| Objetivo | Descripción |
|----------|-------------|
| **Precisión** | Reducir alucinación normativa (CEUB/ARCU-SUR inventados) |
| **Trazabilidad** | Citar `FSD-UC-*`, `RB-*`, `api_contracts.md` |
| **Verificación** | Salida JSON validable; invariantes y failure modes como tests |
| **HITL** | Ningún PC sustituye dictamen [TD] ni publicación [JD] sin humano (**RB-11**) |

---

## 2. Estructura de la carpeta `06_prompt_contracts`

| Archivo | Contenido |
|---------|-----------|
| **`prompt_contracts.md`** (este documento) | Catálogo PC-UC + anatomía + métricas |
| **`NFR.md`** | NFR ISO 25010 (copia de referencia; canónico en `05_nfr/NFR_ISO25010.md`) |

**Contratos IA asistidos (borradores, RAG, clasificación):** `07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md` — IDs **PC-SIG-NN**.

---

## 3. Anatomía obligatoria de un prompt contract

Cada PC debe incluir los **seis elementos** del LFSD más metadatos de calidad:

| # | Sección | Contenido |
|---|---------|-----------|
| 1 | **Role** | Rol del módulo/agente en SIGESA |
| 2 | **Task** | Resultado operativo verificable |
| 3 | **Context** | Entradas, RB/BR, restricciones, APIs |
| 4 | **Reasoning** | Pasos obligatorios ordenados |
| 5 | **Stop condition** | Cuándo detenerse y devolver error |
| 6 | **Output** | Formato JSON + ejemplos éxito/error |
| + | **Invariants** | Propiedades siempre verdaderas |
| + | **Failure modes** | Códigos alineados `api_contracts.md` |

**Metadatos de cabecera (recomendados):**

```yaml
pcId: PC-UC-002
version: 1.0.0
fsdUc: FSD-UC-002
prdReq: [PRD-REQ-003, PRD-REQ-004]
skills: [SKILL-SIG-02]
temperature_max: 0.2
```

---

## 4. Catálogo PC-UC (módulos funcionales)

| PC ID | FSD-UC | Módulo | Prioridad | Skill AGENTS relacionado |
|-------|--------|--------|-----------|--------------------------|
| PC-UC-001 | UC-001 | Autenticación JWT | P0 | — |
| PC-UC-002 | UC-002 | Carga evidencia | P0 | SKILL-SIG-02 |
| PC-UC-003 | UC-003 | Dictamen [TD] | P0 | SKILL-SIG-04, SKILL-SIG-07 |
| PC-UC-004 | UC-004 | Dashboard semáforos | P0 | SKILL-SIG-06 |
| PC-UC-005 | UC-005 | Reporte PDF | P0 | SKILL-SIG-03 |
| PC-UC-010 | UC-010 | Creación proceso CEUB/ARCU-SUR | P1 | SKILL-SIG-01 |
| PC-UC-012 | UC-012 | Plan de mejora (borrador) | P1 | SKILL-SIG-07 |

---

## 5. PC-UC-001 — Autenticación y sesión

**Trazabilidad:** `FSD-UC-001` · `PRD-REQ-001`, `002` · `RB-06` · `NFR-005`, `007` · `POST /auth/login`

```markdown
# Role
Eres el módulo de autenticación de AcredIA/SIGESA, sistema web institucional de acreditación UMSS.

# Task
Validar credenciales y emitir JWT con rol y permisos, o retornar error según política RB-06 sin filtrar existencia de cuenta.

# Context
- Entrada: { "email": string, "password": string }
- Dominio obligatorio: *@umss.edu.bo
- Roles: CC, TD, JD
- API: POST /api/v1/auth/login
- RB-06; CN-04 (5 intentos / 15 min → AUTH_LOCKED)
- No revelar si falló email o contraseña

# Reasoning
1. Validar formato email y dominio @umss.edu.bo
2. Buscar usuario por email (timing constante si no existe)
3. Verificar password_hash bcrypt
4. Verificar activo=true
5. Verificar ventana de bloqueo por intentos
6. Emitir JWT: sub, email, rol, carreraIds[]
7. Registrar LOG_AUDITORIA acción LOGIN

# Stop condition
Error si: dominio inválido | credenciales inválidas | inactivo | bloqueado | BD no disponible

# Output
JSON éxito:
{
  "status": "ok",
  "accessToken": "<JWT>",
  "expiresIn": 28800,
  "usuario": { "id": "uuid", "email": "...", "rol": "CC|TD|JD", "carreraIds": ["uuid"] }
}
JSON error:
{
  "status": "error",
  "error": { "code": "SIGESA_AUTH_INVALID", "message": "...", "hint": "..." },
  "requestId": "uuid"
}
```

**Invariants:** JWT sin password; dominio siempre @umss.edu.bo; todo intento en auditoría.  
**Failure modes:** `SIGESA_AUTH_DOMAIN`, `SIGESA_AUTH_INVALID`, `SIGESA_AUTH_INACTIVE`, `SIGESA_AUTH_LOCKED`, `SIGESA_DB_UNAVAILABLE`.

---

## 6. PC-UC-002 — Carga y versionado de evidencia

**Trazabilidad:** `FSD-UC-002` · `RB-02`, `RB-04`, `BR-015` · `NFR-009`, `013` · `POST /documentos`

```markdown
# Role
Eres el módulo de gestión documental de SIGESA: evidencias con trazabilidad e inmutabilidad de versiones.

# Task
Registrar evidencia cargada por [CC], versionar, pasar indicador a EN_REVISION y encolar notificación [TD].

# Context
- Entrada multipart: archivo (PDF|DOCX|XLSX, ≤50MB), indicadorId (UUID obligatorio), descripcionCambio (string)
- Header opcional: Idempotency-Key (UUID)
- Usuario: rol CC con asignación a carrera del indicador
- Indicador: PENDIENTE o RECHAZADO; proceso EN_PROCESO
- RB-02, RB-04, BR-015; CN-01, CN-02
- Almacenamiento: S3-compatible; hash SHA-256

# Reasoning
1. Validar JWT y rol CC + usuario_carrera
2. Rechazar si falta indicadorId (BR-015)
3. Validar MIME y tamaño
4. Calcular SHA-256
5. version = max(version)+1 por indicador
6. PUT objeto + INSERT documento (transacción)
7. UPDATE indicador → EN_REVISION
8. INSERT log_auditoria CARGA
9. INSERT notificacion_outbox evento CARGA

# Stop condition
Error: 403 sin asignación | 415 MIME | 413 tamaño | 502 storage | idempotency duplicada → mismo resultado 201

# Output
Éxito 201:
{
  "status": "ok",
  "documento": {
    "id": "uuid", "version": 2, "hash": "sha256hex",
    "indicadorEstado": "EN_REVISION", "storageKey": "..."
  }
}
```

**Invariants:** version estrictamente creciente; versiones previas no borradas; hash persistido; indicador EN_REVISION tras éxito.  
**Failure modes:** `SIGESA_DOC_UNAUTHORIZED`, `SIGESA_DOC_MIME`, `SIGESA_DOC_SIZE`, `SIGESA_STORAGE_ERROR`, `SIGESA_EVIDENCE_CRITERION_REQUIRED`.

---

## 7. PC-UC-003 — Aprobación y rechazo de indicador

**Trazabilidad:** `FSD-UC-003` · `RB-03`, `BR-014` · `PATCH /indicadores/{id}/decision` · `POST /subfases/{id}/avance`

```markdown
# Role
Eres el módulo de workflow de dictamen técnico DUEA en SIGESA.

# Task
Registrar APROBAR o RECHAZAR indicador por [TD]; en rechazo exigir justificación ≥20 caracteres; notificar [CC]; evaluar completitud de subfase.

# Context
- Entrada: { "accion": "APROBAR"|"RECHAZAR", "justificacion": string|null }
- Rol TD; indicador EN_REVISION con documento vigente
- RB-03: cierre subfase solo si ∀ obligatorios APROBADO
- Optimistic locking en indicador (version)

# Reasoning
1. Validar rol TD
2. Validar estado EN_REVISION
3. Si RECHAZAR: validar longitud justificación ≥20
4. Persistir estado + justificacion_rechazo si aplica
5. Auditoría APROBACION o RECHAZO
6. Encolar notificación CC (≤15 min NFR-003)
7. Si consulta avance subfase: listar pendientes; bloquear si BR-014

# Stop condition
Error: no TD | estado inválido | justificación corta | conflicto concurrencia 409 | subfase incompleta 409

# Output
Éxito:
{
  "status": "ok",
  "indicadorId": "uuid",
  "estado": "APROBADO|RECHAZADO",
  "actualizadoEn": "ISO8601",
  "subfaseCompleta": false
}
```

**Invariants:** rechazo siempre con justificación almacenada; CC notificado; auditoría completa.  
**Failure modes:** `SIGESA_VAL_JUSTIFICATION_SHORT`, `SIGESA_WF_INVALID_STATE`, `SIGESA_WF_CONFLICT`, `SIGESA_WF_INCOMPLETE`.

---

## 8. PC-UC-004 — Dashboard gerencial (semáforos)

**Trazabilidad:** `FSD-UC-004` · `RB-09`, `RB-10` · `GET /dashboard/resumen` · `NFR-001`, `004`

```markdown
# Role
Eres el módulo de agregación gerencial para [JD] en SIGESA.

# Task
Calcular y devolver resumen por carrera con porcentaje de avance y semáforo VERDE|AMARILLO|ROJO según config_dashboard.

# Context
- Query: facultadId?, tipo?, gestion?
- Fórmula RB-09 desde config_dashboard (fuente verdad backend)
- Umbrales: Verde ≥80%, Amarillo 50–79%, Rojo <50% o alertas vencimiento
- Cache 5 min con flag stale si timeout
- Solo rol JD (lectura global)

# Reasoning
1. Validar JWT rol JD
2. Cargar procesos activos filtrados
3. Agregar indicadores aprobados / totales con pesos
4. Aplicar bandas semáforo
5. Adjuntar alertas (plazos, rechazos abiertos)
6. Registrar acceso opcional en auditoría

# Stop condition
Si timeout agregación: devolver cache con stale=true y timestamp

# Output
{
  "status": "ok",
  "generadoEn": "ISO8601",
  "stale": false,
  "items": [
    { "carreraId": "uuid", "nombre": "...", "semaforo": "VERDE", "porcentajeAvance": 85.5, "alertas": [] }
  ]
}
```

**Invariants:** mismos números que cálculo SQL; no exponer datos de carreras no autorizadas.  
**Failure modes:** `SIGESA_FORBIDDEN`, degradación `stale` (no error HTTP).

---

## 9. PC-UC-005 — Generación reporte PDF ejecutivo

**Trazabilidad:** `FSD-UC-005` · `RB-07` · `POST /reportes/pdf` · `NFR-002`

```markdown
# Role
Eres el orquestador de reportes ejecutivos internos SIGESA.

# Task
Encolar o ejecutar generación PDF con alcance UNIVERSIDAD|FACULTAD|CARRERA; marcar USO_INTERNO; registrar auditoría REPORTE.

# Context
- Entrada: { "alcance", "referenciaId", "gestion": 2026 }
- P95 ≤ 5 min o 202 + jobId
- Plantilla institucional UMSS; sin PII estudiantil
- RB-07: clasificación USO_INTERNO

# Reasoning
1. Validar rol JD
2. Estimar volumen → sync vs async
3. Crear reporte_job
4. Worker: query agregados + render PDF + storage temporal TTL
5. Actualizar job LISTO + notificación JD
6. Auditoría REPORTE con parámetros

# Stop condition
Error plantilla 500; volumen alto → siempre 202 async

# Output
202: { "jobId": "uuid", "estado": "ENCOLADO" }
200: { "jobId": "uuid", "estado": "LISTO", "downloadUrl": "...", "clasificacion": "USO_INTERNO" }
```

**Invariants:** PDF incluye fecha generación y solicitante; nunca distribución externa sin flag autorización JD.  
**Failure modes:** `SIGESA_REPORT_TEMPLATE`, timeout async con notificación correo.

---

## 10. PC-UC-010 — Validación creación de proceso (resumen)

**Trazabilidad:** `FSD-UC-010` · `RB-01`, `RB-08`, `BR-013` · `POST /procesos` · **SKILL-SIG-01**

```markdown
# Role
Eres el validador normativo de instanciación de procesos CEUB/ARCU-SUR.

# Task
Antes de crear proceso, verificar BR-013 (único activo) y RB-01 si tipo=ARCU_SUR; clonar plantilla.

# Context
- Entrada metadatos RB-08 obligatorios
- Códigos: NORM_ARCU_REQUIRES_CEUB, PROC_DUPLICATE

# Reasoning
1. Validar campos obligatorios
2. Si ARCU_SUR → query CEUB vigente
3. Unique partial index proceso activo
4. Clonar fases/indicadores desde plantilla
5. Auditoría PROC_CREACION

# Stop condition
422 ARCU sin CEUB; 409 duplicado; 400 metadatos

# Output
201: { "procesoId", "estado": "EN_PROCESO", "fasesCreadas", "indicadoresCreados" }
```

**Invariants:** no dos EN_PROCESO mismo tipo+gestión+carrera.  
**Failure modes:** `SIGESA_NORM_ARCU_REQUIRES_CEUB`, `SIGESA_PROC_DUPLICATE`.

---

## 11. Contratos IA asistidos (PC-SIG) — v2.0

Los contratos que invocan **LLM** para borradores, resúmenes y clasificación viven en:

**`team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md`**

| PC-SIG | Objetivo | HITL |
|--------|----------|------|
| PC-SIG-01 | Borrador informe acreditación | [JD] edita |
| PC-SIG-02 | Validación asistida evidencia vs rúbrica | [TD] decide |
| PC-SIG-07 | Borrador observación TD | [TD] edita (**SKILL-SIG-07**) |
| PC-SIG-11 | Gap analysis / PII | Pre-filtro |

**Regla:** salida IA siempre `BORRADOR — NO DISTRIBUIR` hasta aceptación humana; persistir `prompt_hash`, `model_id`, `rationale` (**RB-11**, M-AI-012, M-AI-013).

---

## 12. Matriz de trazabilidad PC ↔ artefactos

| PC ID | FSD-UC | Gherkin | API | RB principales | NFR |
|-------|--------|---------|-----|----------------|-----|
| PC-UC-001 | UC-001 | §2 UC-001 | §3.1 | RB-06 | 005, 007 |
| PC-UC-002 | UC-002 | §3 UC-002 | §4 | RB-02,04, BR-015 | 009, 013 |
| PC-UC-003 | UC-003 | §4 UC-003 | §5 | RB-03, BR-014 | 003, 013 |
| PC-UC-004 | UC-004 | §5 UC-004 | §6 | RB-09 | 001, 004 |
| PC-UC-005 | UC-005 | §6 UC-005 | §7 | RB-07 | 002 |
| PC-UC-010 | UC-010 | §11 | §11 | RB-01, BR-013 | — |

---

## 13. Métricas de calidad de prompt contracts (AI-SDLC)

| Métrica | Definición | Umbral v1.0 | Medición |
|---------|------------|-------------|----------|
| **M-AI-PCOV** (Prompt coverage) | % UC P0 con PC-UC o SKILL citando ID | ≥ **80 %** | Matriz §12 + release |
| **M-AI-SFID** (Spec fidelity) | % ejecuciones que respetan Invariants + Failure modes | ≥ **90 %** | Tests contra JSON schema |
| **Hallucination rate** | Afirmaciones sin fuente LFSD/FSD/RB | ≤ **5 %** | Muestra ≥30 ejecuciones |
| **M-AI-001** (PCI) | Claridad prompt (rúbrica interna) | ≥ 4/5 | Revisión trimestral |

Detalle: `team/Marlene/09_trazabilidad/metricas_ai_sdlc.md` · `team/Marlene/10_aportes/release-1.0.0.md`.

---

## 14. Uso en Cursor / CI

| Contexto | Instrucción |
|----------|-------------|
| **Implementar endpoint** | Pegar PC-UC correspondiente + `api_contracts.md` + `reglas_negocio.md` |
| **Generar tests** | Derivar casos de `gherkin.md` + Failure modes del PC |
| **Revisión PR** | Checklist: IDs FSD-UC en descripción; invariantes no violados |
| **Agente @DevAgent** | No inventar reglas CEUB; citar LFSD; estado UNKNOWN si datos faltan |

**Plantilla mínima para nuevo PC:**

```markdown
# Role
# Task
# Context
# Reasoning
# Stop condition
# Output
**Invariants:**
**Failure modes:**
```

---

## 15. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | PC-UC-001…005, 010; enlace PC-SIG; métricas AI-SDLC |

---

*Funcional: `04_fsd/`. NFR: `05_nfr/NFR_ISO25010.md`. IA ampliada: `07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md`.*
