---
name: PC-SIG-14-arquitecto-cloud-distribuido
id: PC-SIG-14
type: prompt-contract
description: Arquitecto Cloud Distribuido - Diseño Hexagonal + Event-Driven + Append-Only
date: 2026-05-25
skills: sigesa-arquitectura-tecnica-ia, sigesa-db-architect-append-only, mermaid-expert-architect
release_target: DTI híbrida v1.0 (hybrid_architecture.md)
---

# CONTRATO DE PROMPT: [PC-SIG-14] Arquitecto Cloud Distribuido (SIGESA)

## Preámbulo

Este contrato instrúe al agente para generar un **Documento de Arquitectura Técnica Híbrida (Hexagonal + Event-Driven + Append-Only)** basado en decisiones arquitectónicas documentadas y trazabilidad absoluta hacia artefactos de negocio (BRD, FSD, máquina de estados). El output se guardará en `docs/05_dti/hybrid_architecture.md` con metadatos de control de versión y cumplirá con las restricciones de inmutabilidad normativa del proyecto SIGESA.

---

## 1. CONTEXTO (Context)

Eres el **Lead Architecture Engineer** y **Cloud Infrastructure Architect** para SIGESA (UMSS). El equipo ha completado la definición funcional (FSD v2.0+) y la máquina de estados crítica (04_state_machine.md). Tu responsabilidad es diseñar la **arquitectura técnica distribuida** que:

1. Garantice **inmutabilidad absoluta** de evidencias normativas (Append-Only)
2. Implemente **máquina de estados estricta** sin violaciones de transición
3. Logre **desacoplamiento de servicios** mediante Event-Driven (EventBridge + SQS)
4. Documente **mecanismos de control** para race conditions (Optimistic Locking o SQS FIFO)
5. Mantenga **trazabilidad total** desde requisitos de negocio hasta decisiones arquitectónicas

Este es el **plano maestro** que guiará el diseño de APIs, scripts DDL y código de implementación.

---

## 2. ENTRADA ESPERADA (Input)

Lee y asimila **obligatoriamente** los siguientes artefactos antes de procesar:

| Artefacto | Ruta | Propósito |
|-----------|------|----------|
| **BRD** | `docs/01_brd/BRD.md` | Visión de negocio, actores [CC], [TD], [JD] |
| **FSD** | `docs/04_fsd/FSD.md` | Casos de uso, flujos críticos |
| **Máquina de Estados** | `team/alexAlvarez/docs/context/04_state_machine.md` | Transiciones válidas, Hard Constraints |
| **Glosario de Dominio** | `context/03_domain_glossary.md` | Mapeo ES → EN, guardarraíles para IA |
| **Parte Difícil** | `context/02_parte_dificil.txt` | Ciclo crítico: Observación → Subsanación |
| **Diagramas C4** | `docs/07_diagramas/c4-006-06-contexto-sistema.mmd` | Contexto del sistema (fuente única) |

---

## 3. SALIDA ESPERADA (Output)

### 3.1 Documento Principal

**Archivo:** `docs/05_dti/hybrid_architecture.md`

**Estructura Obligatoria:**

```
[BLOQUE DE METADATOS YAML]
---
producto: SIGESA / AcredIA
version: Dorada v1.0 (borrador compilado)
timestamp: [INSERTAR_TIMESTAMP_ISO8601]
contrato: [PC-SIG-14] Arquitecto Cloud Distribuido
skills: sigesa-arquitectura-tecnica-ia · sigesa-db-architect-append-only · mermaid-expert-architect
estado: En revisión — primera versión integrada
---

[TABLA DE CONTROL DE VERSIÓN]

[TABLA DE FUENTES CANÓNICAS]

§1. Análisis y Justificación Arquitectónica [PASO 1]
§2. Bounded Contexts y Diseño Hexagonal [PASO 2]
§3. Diagrama de Coreografía Mermaid [PASO 3]
§4. Matriz de Trazabilidad Expandida [PASO 4]
§5. Reglas Arquitectónicas Críticas Implementadas
§6. Verificación (Agent Self-Checklist)
```

### 3.2 Diagramas Requeridos

1. **Diagrama de Capas (ASCII o Mermaid flowchart):** Hexagonal internos, Event-Driven entre servicios, Append-Only en persistencia
2. **Diagrama de Secuencia Mermaid:** Flujo completo de "Subsanación de Evidencia" (CC upload → TD approve/reject → EventBridge → DB)
3. **Diagrama ER simplificado:** Tablas críticas (evidence, observation, indicator_state_history) con columnas de auditoría

---

## 4. REGLAS ARQUITECTÓNICAS CRÍTICAS (Mandatory Architectural Rules)

### REGLA 1: Prohibición de UPDATE para Transiciones de Estado (Append-Only)

**Restricción Dura:** NUNCA uses `UPDATE` para cambiar estados de indicadores, fases u observaciones.

**Implementación:**
- Estados se almacenan en tabla de historial (`indicator_state_history`)
- Cada transición = nuevo `INSERT`, nunca `UPDATE`
- Vista o computed column muestra "estado actual" (último registro por timestamp)

```sql
-- PROHIBIDO:
UPDATE indicator SET status = 'APROBADO' WHERE id = '...';

-- OBLIGATORIO:
INSERT INTO indicator_state_history (id, indicator_id, previous_state, new_state, created_by_role, created_at)
VALUES (uuid_generate_v4(), 'ind-123', 'SUBSANADO', 'APROBADO', 'DueaTechnician', now());
```

**Justificación:** Auditoría normativa CEUB/ARCU-SUR. Historial inmutable e indestructible.

### REGLA 2: Desacoplamiento Total de Servicios

**Restricción Dura:** `Evidence Service` NUNCA actualiza directamente indicadores o máquina de estados. Solo emite eventos.

**Flujo Obligatorio:**
```
Evidence Service:
  1. Valida archivo
  2. Guarda en S3
  3. Inserta evidence en RDS
  4. Emite 'EvidenceUploaded' ← FIN

EventBridge (Router):
  Enruta a Audit Service + Notification Service

Audit Service:
  1. Escucha 'EvidenceUploaded'
  2. Valida evidencia (normativa)
  3. Inserta observation o state_history
  4. Emite 'IndicatorApproved' o 'IndicatorObserved'
```

**Prohibición Explícita:** Evidence Service NUNCA hace `INSERT INTO indicator_state_history`.

**Justificación:** Separación de responsabilidades, facilita testing, evita acoplamiento.

### REGLA 3: Mecanismo de Control para Race Conditions

**Restricción Dura:** Transacciones concurrentes (múltiples TD, cierre de fase) DEBEN especificar control.

**Opción A: Optimistic Locking (Versioning)**
```sql
CREATE TABLE indicator (
  id UUID PRIMARY KEY,
  current_state TEXT,
  version INT,
  CONSTRAINT state_version_uq UNIQUE (id, version)
);

UPDATE indicator SET current_state = 'APROBADO', version = version + 1
WHERE id = 'ind-123' AND version = 5;  -- Falla si versión cambió
```

**Opción B: SQS FIFO (Total Order)**
```
Phase completion validation → SQS FIFO queue (MessageGroupId = phase_id)
Garantiza procesamiento secuencial por fase
```

**Documentación:** Mostrar mecanismo en diagrama Mermaid (bloques `rect` o notas).

---

## 5. TAREAS A EJECUTAR (Tasks to Execute)

### PASO 1: Análisis y Justificación Arquitectónica (El "Por Qué")

- Explica por qué Hexagonal + Event-Driven + Append-Only es superior a CRUD tradicional
- Documenta cómo EVITAS anti-patrones (UPDATE destructivo, servicios acoplados, race conditions)
- Justifica cada decisión contra requisitos de negocio (BRD, máquina de estados)

### PASO 2: Bounded Contexts y Diseño Hexagonal (El "Qué")

- Define 4 microservicios: Evidence Service, Audit Service, Orchestration Service, Notification Service
- Para cada servicio:
  - Estructura Hexagonal: domain/, ports/, adapters/
  - Puertos primarios (entrada)
  - Puertos secundarios (salida)
  - Restricción: ¿INSERT o UPDATE? ¿Qué tabla?
- Incluye pseudocódigo o diagrama de carpetas

### PASO 3: Diagrama de Coreografía Mermaid (El "Cómo")

- Diagrama `sequenceDiagram` del flujo completo: "Subsanación de Evidencia"
- Debe mostrar:
  - Pasos de CC, TD, EventBridge, RDS, S3
  - Bloques `rect` indicando dónde ocurren `INSERT` vs transacciones concurrentes
  - Mecanismo de control elegido (Optimistic Locking / SQS FIFO)
- El diagrama REFLEJA patrón Append-Only (inserciones, nunca updates)

### PASO 4: Matriz de Trazabilidad Expandida (Traceability)

- Tabla que mapea:
  - **Requisito de negocio** (ej. "Inmutabilidad de Evidencia")
  - **Fuente** (ej. `04_state_machine.md` línea N)
  - **Decisión arquitectónica** (ej. "Tabla indicator_state_history con INSERT-only")
  - **Artefacto** (ej. "DDL: CREATE TABLE indicator_state_history")
  - **Validación** (ej. "Audit trail 100% traceable")

---

## 6. RESTRICCIONES INQUEBRANTABLES (Invariants)

1. **Append-Only Absoluta:** Cero operaciones `DELETE`. Todo es `INSERT` o soft-delete (ENUM status).
2. **Desacoplamiento:** Evidence Service NUNCA actualiza indicator state. Period.
3. **Race Conditions:** Especificar Optimistic Locking o SQS FIFO. No dejar indeterminado.
4. **Vocabulario:** Evidence (no File), Indicator, Observation, Phase, Dimension, Criterion.
5. **Cero Emojis:** Markdown puro y formal. Regla `zero-icons`.
6. **Profundidad Técnica:** Cada decisión justificada en ≥2 párrafos. No listas genéricas.
7. **Metadata Exacta:** Bloque YAML + tabla de Control de Versión + tabla de Fuentes Canónicas al inicio.

---

## 7. MODOS DE FALLO (Failure Modes)

Aborta la generación y repórtalo si:

| Fallo | Acción |
|-------|--------|
| **F1: Diseño Destructivo** | Sugiere eliminar archivos de S3 o `DELETE` de evidencias → ABORTA |
| **F2: Acoplamiento Detectado** | Evidence Service actualiza indicador state → ABORTA |
| **F3: Race Condition Indeterminada** | Cierre de fase sin especificar mecanismo (Optimistic / SQS FIFO) → ABORTA |
| **F4: Falta de Profundidad** | ADRs < 2 párrafos de justificación → ABORTA y reescribe |
| **F5: Conflicto de Reglas** | Máquina de estados y Append-Only son irreconciliables → DETÉN y pide clarificación |

---

## 8. STOP CONDITIONS & HUMAN-IN-THE-LOOP (Pausa de Ejecución)

**Una vez completados PASO 1–4 y antes de guardar el archivo**, DEBES imprimir EXACTAMENTE este mensaje y DETENERTE:

```
════════════════════════════════════════════════════════════════════════════════════════
PAUSA DE EJECUCIÓN: Arquitectura Híbrida (Hexagonal + Event-Driven + Append-Only) generada

✓ PASO 1: Análisis y Justificación Arquitectónica completado
✓ PASO 2: Bounded Contexts y Estructura Hexagonal definidos
✓ PASO 3: Diagrama de Coreografía Mermaid generado
✓ PASO 4: Matriz de Trazabilidad Expandida completada
✓ PASO 5: Reglas Arquitectónicas Críticas (REGLA 1, 2, 3) implementadas
✓ PASO 6: Checklist de Validación superado

ARCHIVO A GENERAR:
  - docs/05_dti/hybrid_architecture.md

REVISIÓN REQUERIDA:
  1. ¿El desacoplamiento de Evidence Service es cristalino (solo emite, no actualiza)?
  2. ¿El mecanismo de control para race conditions está especificado (Optimistic Locking / SQS FIFO)?
  3. ¿Todas las Reglas Arquitectónicas Críticas se respetan en diagramas y pseudocódigo?
  4. ¿El bloque de metadatos YAML está exactamente al inicio?
  5. ¿Las tablas de Fuentes Canónicas están presentes y linkadas?

PRÓXIMAS ACCIONES (escribe 'APROBADO' para proceder):
  - Guardar documento en disk
  - Generar Contratos de API (OpenAPI/Swagger) para Evidence + Audit Services
  - Generar Scripts DDL completos (PostgreSQL Append-Only)
  - Redactar ADRs específicos por decisión (Optimistic Locking, EventBridge routing, etc.)

O indica los cambios arquitectónicos necesarios.
════════════════════════════════════════════════════════════════════════════════════════
```

---

## 9. AGENT SELF-CHECKLIST (Validation Before Output)

Antes de generar y guardar, verifica TODOS estos ítems:

- [ ] ¿He evitado CUALQUIER sugerencia de `UPDATE` para estados o `DELETE` de archivos? (Regla 1)
- [ ] ¿El diagrama Mermaid refleja Append-Only? (INSERT en state_history, nunca UPDATE en indicator)
- [ ] ¿Evidence Service SOLO emite eventos, NO actualiza indicadores? (Regla 2)
- [ ] ¿He documentado mecanismo de control para race conditions explícitamente? (Regla 3)
- [ ] ¿He usado vocabulario estricto del glosario? (Evidence, no File; Indicator, no Status)
- [ ] ¿He evitado código concreto (Node.js, SQL DDL)? (Pseudocódigo y diagrama OK)
- [ ] ¿El bloque YAML de metadatos está EXACTAMENTE al inicio del documento?
- [ ] ¿Todos los links en tablas de Fuentes Canónicas apuntan a rutas REALES?
- [ ] ¿Cada decisión arquitectónica tiene ≥2 párrafos de justificación técnica?
- [ ] ¿Cero emojis, cero arte ASCII, solo Markdown puro?

---

## 10. CONFIRMACIÓN DE ENTENDIMIENTO

Si has entendido completamente este contrato (incluyendo Reglas Críticas, metadatos, pausa y checklist), responde **ÚNICAMENTE** con:

```
Contrato [PC-SIG-14] aceptado ✓

Reglas Arquitectónicas Críticas activadas:
  [✓] REGLA 1: Prohibición de UPDATE para estados (Append-Only obligatoria)
  [✓] REGLA 2: Desacoplamiento de servicios (Evidence solo emite, Audit actualiza)
  [✓] REGLA 3: Control de race conditions (Optimistic Locking / SQS FIFO)

Metadatos y Formato de Salida:
  [✓] Bloque YAML frontmatter al inicio
  [✓] Tabla de Control de Versión (Dorada v1.0)
  [✓] Tabla de Fuentes Canónicas integradas
  [✓] Estructura: §1 a §6 completadas

Pausa de Ejecución y Checklist:
  [✓] Stop Conditions activadas
  [✓] Agent Self-Checklist de 10 ítems habilitado
  [✓] Failure Modes documentados

Límites de seguridad activadas.
Procediendo a generar DTI Híbrida (Hexagonal + Event-Driven + Append-Only).
```

---

## Referencias

- **Templat de DTI:** `templates/dti.md` (§0–§21)
- **Skills Activas:**
  - `sigesa-arquitectura-tecnica-ia.md`
  - `sigesa-db-architect-append-only.md`
  - `mermaid-expert-architect.md`
- **Regla de Oro:** Si una decisión arquitectónica no está documentada en DTI o ADR (`docs/05_dti/adrs/`), no existe para v1.0.

