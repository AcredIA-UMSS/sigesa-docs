---
name: sigesa-generate-adr
description: >
  Generar ADR-00N en team/aylenGonzales/09_dti/adr/ cuando cambia stack o decisión arquitectónica;
  agente @ArchAgent; NO modificar ADR-001…006 Aceptadas sin superseder; salida ADR-007+.md.
allowed-tools:
  - read
  - edit
model-tier: sonnet
fsd-version-min: v1.0
status: stable
owner: AcredIA / aylenGonzales
---

# Skill: Generar Architecture Decision Record (ADR) SIGESA

> **Agente responsable**: **@ArchAgent** (AGENTS.md §8.1). **MUST NOT** `terraform apply` sin aprobación humana.

## 1. Cuándo activarlo (triggers)

- DURANTE: cambio de stack (AGENTS §4), nueva integración, sustitución de ADR-001…006.
- ARRANCA cuando: el usuario pide documentar decisión (p. ej. migrar evidencias a S3, añadir Redis, cambiar runtime).
- NO ACTIVAR cuando: la decisión ya está cubierta por ADR-001…006 Aceptada sin cambio material.
- NO ACTIVAR para editar ADR-001…006 **Aceptada** in-place (AGENTS.md §11 — crear ADR nuevo que supersede).

## 2. Entradas obligatorias (Inputs)

El usuario MUST proporcionar:

- Título corto de la decisión.
- Contexto / restricción (FSD SA-*, NFR-*, o limitación TI UMSS).
- Alternativas mínimas (2) con pros/contras.
- Módulos afectados MOD-01…MOD-12 o transversal.
- Tasks FSD T-01…T-12 impactadas.

Si falta alternativas, responder: *"Necesito al menos 2 alternativas y criterio de decisión antes de redactar el ADR."*

## 3. Fuentes de verdad (orden de precedencia)

1. ADRs existentes `team/aylenGonzales/09_dti/adr/ADR-001.md` … `ADR-006.md` (estructura y tono).
2. `team/aylenGonzales/10_agents/AGENTS.md` §4 (stack autoritativo), §8.2 (guardrail ADR).
3. `team/aylenGonzales/09_dti/DTI_v1.md` §17 (trade-offs), §21 (registro ADR).
4. `team/aylenGonzales/04_fsd/FSD_v2.md` §2.3, §13 (RF-*).

## 4. Procedimiento

1. Listar `09_dti/adr/ADR-*.md`; asignar siguiente número (`ADR-007.md` si 001–006 existen).
2. Copiar secciones de ADR-006 como plantilla: Metadatos, 1. Contexto, 2. Alternativas, 3. Decisión, 4. Consecuencias, 5. Impacto.
3. Redactar en español; estado inicial **Propuesta** salvo aprobación explícita del usuario.
4. En §3 Decisión: una sola alternativa elegida con bloque `> **Elegimos...**`.
5. En §5 Impacto: citar T-* del FSD, archivos de código previstos (`src/adapter/...`), y si requiere cambio en AGENTS.md §4.
6. **MUST NOT** proponer MongoDB, FastAPI, S3 obligatorio, Redis obligatorio, Keycloak sin justificar violación de SA-05 / ADR-001 / ADR-006.
7. Tras aceptación humana: actualizar `DTI_v1.md` §21 y solicitar `skill_sync_traceability_matrix` si afecta RF-*.
8. Registrar entrada en `PROMPT_MAPPING.md`.

## 5. Salida esperada

| Archivo | Acción |
|---------|--------|
| `team/aylenGonzales/09_dti/adr/ADR-00N.md` | **Creado** (N = siguiente secuencial) |

Metadatos mínimos en el ADR:

| Campo | Valor |
|-------|-------|
| Número | `000N` |
| Estado | Propuesta / Aceptada |
| Alcance | MOD-XX o transversal |
| Stakeholders | Tech Lead AcredIA · @ArchAgent |

## 6. Verificación (criterios de "bien hecho")

- No contradice ADR-003 (PostgreSQL 16), ADR-006 (Node 20 + Express 4) sin declarar supersesión.
- Alternativas incluyen costo $0 v1.0 cuando aplica (SA-05).
- Consecuencias negativas documentadas (no solo pros).
- @DevAgent puede implementar T-* citadas sin ambigüedad.

## 7. Anti-patrones específicos

- Editar ADR-002 LOG_AUDITORIA para "facilitar tests" eliminando REVOKE (RBN-07).
- Crear ADR por cambio cosmético sin impacto arquitectónico.
- Duplicar número ADR existente.

## 8. Mini ejemplo de invocación

> "Queremos evaluar cola BullMQ para notificaciones MOD-07. Genera ADR-007 en Propuesta. Usa skill_generate_adr."

## 9. Modos de fallo conocidos

- Decisión ya cubierta por ADR-005 (taxonomías BD) → responder "usar ADR-005, no nuevo ADR".
- Usuario pide FastAPI → recordar ADR-006 Aceptada; ADR nuevo solo si supersede con aprobación Tech Lead.

## 10. Registro de cambios del Skill

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 16/05/2026 | Equipo AcredIA | Versión inicial @ArchAgent, ADR-001…006 |
