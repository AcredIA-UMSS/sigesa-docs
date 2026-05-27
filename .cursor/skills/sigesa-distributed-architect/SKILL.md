---
name: sigesa-distributed-architect
description: |
  Actúa como Arquitecto de Sistemas Distribuidos para SIGESA. Evalúa y documenta patrones
  CQRS, Transactional Outbox y Saga (orquestada o coreografiada) en ADRs y diseños orientados
  a eventos, respetando inmutabilidad append-only y el contexto institucional UMSS. Usar al
  generar ADRs complejos, arquitecturas event-driven, cuellos de botella de lectura/escritura,
  integración asíncrona entre módulos o cuando se mencionen CQRS, Outbox, Saga o consistencia eventual.
allowed-tools:
  - read
  - edit
  - ask-user
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

# Skill: Arquitecto de Sistemas Distribuidos (CQRS, Outbox, Saga) para SIGESA

> Skill especializada para decisiones arquitectónicas de consistencia eventual, sin violar la
> inmutabilidad de la evidencia ni el monolito modular recomendado para el tráfico institucional.

## 1. Cuándo activarlo (Triggers)

- **ACTIVAR** cuando el usuario solicite:
  - ADRs que involucren integración asíncrona, publicación de eventos de dominio o workers.
  - Diseño de arquitectura orientada a eventos (notificaciones, reportes ejecutivos, proyecciones).
  - Resolución de cuellos de botella separando lecturas masivas de escrituras transaccionales.
  - Evaluación explícita de CQRS, Transactional Outbox o Saga Pattern.
- **NO ACTIVAR** cuando:
  - El alcance sea un CRUD acotado operado solo por el Técnico DUEA [TD] sin proyecciones ni integraciones cruzadas.
  - El PRD/FSD no exija consistencia entre BD y broker, ni transacciones de larga duración entre servicios.
  - La tarea sea redacción de BRD/MRD o historias INVEST (usar skills de negocio).

## 2. Entradas obligatorias

- Casos de Uso (FSD) y contratos API relevantes (`docs/04_fsd/api_contracts.md`).
- Modelo de datos (`docs/04_fsd/modelo_datos.md`) y máquina de estados de `Indicator`.
- Glosario y actores: [CC] Coordinador de Carrera, [TD] Técnico DUEA, [JD] Jefatura DUEA.
- Contexto de carga: picos de cierre de acreditación, volumen de indicadores por facultad/carrera.

## 3. Fuentes de verdad (orden de precedencia)

1. **Append-Only / inmutabilidad de Evidencia** — Toda compensación o corrección es un registro nuevo.
2. `04_state_machine.md` — Las proyecciones de lectura no pueden saltar transiciones de `Indicator`.
3. **Monolito modular** — Patrones distribuidos solo donde el FSD lo justifique; no microservicios prematuros.
4. Entidades existentes: `NotificationOutbox`, `StateTransition`, `AuditLog`, `PublicationSnapshot`.

## 4. Procedimiento Estricto (Workflow)

### PASO 0: Filtro anti sobre-ingeniería (OBLIGATORIO)

Antes de proponer CQRS, Outbox o Saga, responder por escrito en el ADR:

| Pregunta | Si la respuesta es NO | Acción |
|----------|----------------------|--------|
| ¿Hay más de un consumidor eventual del mismo hecho de dominio? | | Descartar Outbox/Saga; usar llamada síncrona o cola simple |
| ¿Las lecturas masivas compiten con escrituras transaccionales en la misma tabla? | | Descartar CQRS; optimizar índices y vistas materializadas |
| ¿La operación cruza límites de consistencia ACID entre dos sistemas externos? | | Descartar Saga; acotar transacción local |
| ¿El único actor es [TD] en un flujo CRUD simple? | | **ABORTAR** patrones distribuidos; documentar monolito modular |

Si tres o más respuestas son NO, el ADR debe recomendar **explícitamente** no adoptar el patrón y cerrar con alternativa más simple (endpoint síncrono, vista SQL, job batch nocturno).

### PASO 1: Selección de patrón

1. **Dual-Write (BD + mensajería)** detectado → obligatorio evaluar **Transactional Outbox**.
2. **Lecturas de dashboard [JD]** con agregaciones pesadas sobre el modelo de escritura [CC] → evaluar **CQRS** (proyección de lectura).
3. **Transacción de negocio multi-paso** entre módulos o sistemas externos con pasos reversibles → evaluar **Saga** (nunca 2PC).

### PASO 2: Redacción del ADR (profundidad explicativa)

Usar formato MADR. En cada ADR generado:

- **Contexto:** volumen, actores, SLAs (ej. reporte ejecutivo P95, UC-014/015).
- **Decisión:** patrón elegido y por qué se descartaron alternativas (incluida la opción "no hacer nada distribuido").
- **Consecuencias:** trade-offs de consistencia eventual, operabilidad, observabilidad y costo UMSS.
- **Prohibido:** definiciones de una línea tipo "usaremos CQRS porque escala". Cada afirmación debe citar requisito FSD o métrica NFR.

Incluir diagramas `mermaid sequenceDiagram` para flujos Outbox y Saga; `mermaid erDiagram` para tablas outbox y proyecciones.

### PASO 3: Verificación antes de entregar

Ejecutar el checklist de la sección 7. Si falla un ítem crítico, corregir o abortar con informe.

## 5. Criterios de Decisión Arquitectónica

### 5.1 CQRS — Modelo de escritura vs lectura

| Dimensión | Modelo de escritura (command side) | Modelo de lectura (query side) |
|-----------|-----------------------------------|--------------------------------|
| Optimizado para | Validación de reglas [CC], transiciones `Indicator`, versionado `EvidenceVersion` | Dashboards [JD], indicadores institucionales agregados, export PDF/CSV |
| Consistencia | Fuerte, transaccional, alineado a máquina de estados | Eventual; reconstruido desde eventos o ETL incremental |
| Esquema | Normalizado, append-only, FKs taxonomía SIGESA | Desnormalizado, tablas/vistas por consulta (facultad, año gestión, estado) |
| Actualización | Transacción de aplicación + Outbox en la misma unidad de trabajo | Worker o proyección que consume eventos; nunca escribe en tablas de comando |

**Consultas masivas de indicadores institucionales:** diseñar proyecciones por grain (`managementYear`, `facultyId`, `programId`, `indicatorStatus`) con índices compuestos; pre-agregar conteos por fase/dimensión; separar físicamente en esquema `read` o prefijo `proj_` si el volumen lo exige. La proyección refleja estados publicados y no expone borradores de [CC] no visibles para [JD].

**Higiene de datos en proyecciones:** prohibido incluir columnas residuales de importación (`Unnamed: 0`, `gtin`, índices pandas serializados). Solo atributos del diccionario FSD y claves de negocio.

### 5.2 Transactional Outbox — Diseño append-only

**Orden atómico correcto (invariante):**

1. Iniciar transacción local en la BD principal.
2. Persistir cambio de dominio (command).
3. Insertar fila en tabla Outbox en la **misma** transacción.
4. Commit.
5. Proceso relay/worker lee Outbox y publica al broker; marca entrega con **nuevo** registro o columna de estado, sin borrar el evento origen.

**Orden prohibido (abortar ADR si aparece):** escribir primero en el broker y luego en la BD; o publicar sin transacción compartida con el commit del dominio.

**Tabla Outbox (alineada a `NotificationOutbox`):**

| Columna | Propósito |
|---------|-----------|
| `id` | UUID PK |
| `event_type` | Tipo de evento de dominio (ej. `IndicatorApproved`) |
| `aggregate_id` | ID de entidad origen |
| `payload` | JSON serializable, sin datos sensibles innecesarios |
| `created_at` | Timestamp de inserción |
| `created_by` | Actor [CC]/[TD]/[JD] |
| `delivery_status` | `PENDING`, `SENT`, `FAILED` |
| `delivered_at` | Nullable; actualización vía **nuevo** evento de auditoría o fila sucesora, no `DELETE` del registro original |

Retención: archivar por partición temporal; nunca `DELETE` de filas outbox para cumplir auditoría — usar estado `ARCHIVED` o tabla histórica append-only.

### 5.3 Saga — Coreografiada vs Orquestada

| Criterio | Saga coreografiada | Saga orquestada |
|----------|-------------------|-----------------|
| Número de participantes | 2–3, contratos estables, eventos bien definidos | 4+, secuencia estricta, SLAs heterogéneos |
| Visibilidad operativa | Equipo maduro en observabilidad distribuida | Necesidad de un punto único de estado (orquestador/workflow) |
| Acoplamiento | Bajo entre servicios; alto riesgo de ciclos de eventos si mal diseñada | Centraliza lógica; más fácil de auditar en SIGESA |
| Recomendación SIGESA por defecto | Notificaciones Outbox + reacciones simples (UC-015) | Publicación portal [P], reportes ejecutivos multi-módulo |

**Compensación (invariante append-only):**

- Prohibido diseñar pasos compensatorios con `DELETE` físico o lógico destructivo.
- Cada compensación es un **comando de reversión documental**: nuevo `StateTransition`, nueva `EvidenceVersion` con `supersedesVersion`, registro `Observation` de anulación, o evento `*Reverted` en Outbox.
- Ejemplo válido: `IndicatorApprovalCompensated` inserta transición de `APROBADO` a `OBSERVADO` con justificación y actor [TD], preservando historial.

**No usar 2PC (two-phase commit)** entre BD institucional y SMTP/portal externo; reemplazar siempre por Saga + Outbox.

## 6. Salida esperada

- Archivos `ADR_XXX_<tema>.md` bajo `docs/adr/` o ruta acordada en el DTI.
- Fragmentos DDL opcionales para `outbox` y tablas `proj_*` (referenciar skill `sigesa-db-architect-append-only`).
- Actualización de secuencias Mermaid en `docs/07_diagramas/` cuando el FSD lo requiera.
- Trazabilidad explícita: ID de UC/FSD, NFR y actores en cada decisión.

## 7. Verificación (Checklist)

- [ ] El ADR incluye el resultado del PASO 0 (filtro anti sobre-ingeniería) con tabla completada.
- [ ] Outbox: commit único dominio + outbox; relay posterior al broker; sin dual-write invertido.
- [ ] Saga: compensaciones solo append-only; sin `DELETE` en diseño ni pseudocódigo.
- [ ] CQRS: modelo de lectura no muta `Indicator` ni `Evidence` del lado command.
- [ ] Proyecciones sin columnas basura (`Unnamed: 0`, `gtin`).
- [ ] Explicaciones extensas y fundamentadas; no definiciones telegráficas.
- [ ] Diagramas Mermaid renderizables; actores [CC], [TD], [JD] correctos en secuencias.
- [ ] No se propone Kafka/mesh de microservicios sin justificación de carga institucional.

## 8. Anti-patrones del dominio

- **CQRS en CRUD [TD]:** Separar lectura/escritura para un mantenimiento de catálogo interno sin agregaciones masivas.
- **Outbox sin transacción compartida:** Publicar al broker antes del commit o en proceso separado sin idempotencia.
- **Saga con DELETE compensatorio:** Viola auditoría universitaria y la regla de inmutabilidad.
- **2PC entre PostgreSQL y SMTP:** Bloqueos y fallos operativos inaceptables en entorno UMSS.
- **Proyección que autoriza transiciones:** Solo [TD] aprueba/rechaza según máquina de estados; [JD] consume lecturas.

## 9. Modos de fallo conocidos

- **Fallo 1 — Sobre-ingeniería en módulo simple [TD]:**
  - *Detección:* Un solo módulo, sin eventos consumidos, sin dashboard [JD].
  - *Acción del Agente:* **ABORTAR** adopción de CQRS/Outbox/Saga. Reportar: "El alcance es CRUD acotado; patrón distribuido no justificado." Proponer servicio monolítico con transacción local.

- **Fallo 2 — Outbox con dual-write invertido:**
  - *Detección:* Secuencia "publicar en broker → guardar en BD" o ausencia de transacción única.
  - *Acción del Agente:* **ABORTAR** el ADR. Explicar riesgo de mensajes huérfanos o datos sin evento. Corregir al flujo: BD + outbox en una transacción, relay asíncrono después.

- **Fallo 3 — Compensación destructiva:**
  - *Detección:* SQL o pseudocódigo con `DELETE`, `TRUNCATE`, o borrado de blob sin nueva versión.
  - *Acción del Agente:* **ABORTAR**. Exigir registro compensatorio append-only y referencia a `EvidenceVersion` / `StateTransition`.

- **Fallo 4 — ADR superficial:**
  - *Detección:* Sección "Decisión" menor a un párrafo sustantivo o sin trade-offs.
  - *Acción del Agente:* Rechazar entrega; expandir contexto, alternativas descartadas y consecuencias operativas.

## 10. Relación con otras skills

| Skill | Cuándo delegar |
|-------|----------------|
| `sigesa-arquitectura-tecnica-ia` | NFR ISO 25010, visión DTI global, gate monolito vs microservicios |
| `sigesa-db-architect-append-only` | DDL físico de outbox y proyecciones `proj_*` |
| `sigesa-api-contract-designer` | Contratos REST de comandos y consultas de proyección |
| `sigesa-generacion-documentos-tecnicos` | Descomposición FSD previa al ADR distribuido |
