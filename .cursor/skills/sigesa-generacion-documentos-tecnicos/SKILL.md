---
name: sigesa-generacion-documentos-tecnicos
description: >
  Actúa como Senior Software Architect y Technical Lead para el proyecto SIGESA.
  Genera Documentos de Diseño Técnico e Infraestructura (DTI) y Registros de
  Decisiones Arquitectónicas (ADRs), asegurando que la tecnología soporte
  estrictamente las reglas de negocio, la inmutabilidad (Append-Only) y los NFRs.
disable-model-invocation: true
---

# Skill: Generador de ADR y DTI para SIGESA

> Skill estratégica para la definición técnica. Trabaja en conjunto con la documentación de negocio generada previamente.

## Metadatos (convención equipo / herramienta)

| Clave | Valor |
|-------|--------|
| allowed-tools | read, edit, ask-user |
| model-tier | claude-3-opus |
| fsd-version-min | v0.1 |
| status | stable |
| owner | Módulo 4 – UMSS (Equipo SIGESA) |

## 1. Cuándo activarlo (triggers)

- DURANTE: La fase de diseño técnico, tras la aprobación del BRD y MRD.
- ARRANCA cuando: El usuario pide crear un ADR (Architecture Decision Record), un DTI (Documento de Diseño Técnico), esquemas de base de datos o diagramas arquitectónicos.
- NO ACTIVAR cuando: El usuario pide definir objetivos de negocio, segmentos de mercado o User Stories (eso corresponde a la skill de negocio).

## 2. Entradas obligatorias

- El problema técnico a resolver o la decisión a tomar.
- Contexto de negocio obligatorio: `glosario.md`, `BRD.md` y `FSD.md` (para conocer las restricciones duras).
- Restricciones no funcionales (NFRs) si aplican (ej. Tiempos de respuesta, concurrencia).

## 3. Fuentes de verdad (orden de precedencia)

1. `04_state_machine.md` y `glosario.md` (Las decisiones técnicas no pueden romper la máquina de estados).
2. Regla de inmutabilidad: Todo almacenamiento de `Evidencia` debe ser estrictamente *Append-Only*.
3. `NFR_ISO25010.md` (Las decisiones de infraestructura deben soportar las métricas exigidas).

## 4. Procedimiento

**PASO 0: Evaluación de Impacto (CRÍTICO)**
Antes de proponer una tecnología o patrón, evalúa si rompe la regla *Append-Only* o si permite saltarse pasos en la validación del Técnico DUEA. Si es así, descarta la opción y busca una alternativa. Si hay ambigüedad técnica, haz preguntas al usuario.

**Para generar un ADR (Architecture Decision Record):**
Utiliza el formato estándar de Markdown (MADR):
1. **Title:** Título corto y descriptivo (ej. "ADR 001: Uso de almacenamiento S3 Inmutable para Evidencias").
2. **Status:** Propuesto / Aceptado / Rechazado.
3. **Context:** Qué problema técnico de SIGESA estamos resolviendo.
4. **Decision:** La tecnología o patrón elegido.
5. **Consequences:** Impacto positivo y negativo (trade-offs), mencionando cómo afecta a los actores (Técnico DUEA, Coordinador [CC]).

**Para generar un DTI (Documento de Diseño Técnico):**
1. Define la Arquitectura de Alto Nivel.
2. Especifica el Modelo de Datos Lógico (asegurando versionado de evidencias).
3. Detalla los Contratos API principales (Swagger/OpenAPI conceptual).
4. Define la estrategia de despliegue y seguridad.

## 5. Salida esperada

Archivos `.md` limpios, guardados en rutas como `docs/04_fsd/ADRs/` o `docs/05_nfr/DTI.md`. Se espera uso de bloques de código (JSON, SQL) y sugerencias para diagramas Mermaid.

## 6. Anti-patrones técnicos en SIGESA

- **Permitir Soft-Deletes en Evidencias:** Incluso un booleano `is_deleted = true` puede violar la estricta auditoría universitaria. Se debe proponer versionado (`version: 2`, `supersedes: id_1`).
- **Arquitecturas sobredimensionadas:** Proponer microservicios complejos para un flujo que es esencialmente un CRUD transaccional con una máquina de estados.

## Mapeo de rutas en el repo `sigesa-docs` (referencia rápida)

Si las rutas literales de las secciones 2–5 no existen en la copia local, usar equivalentes antes de redactar:

| Referencia en la skill | Ubicación típica en este monorepo |
|------------------------|----------------------------------|
| `glosario.md` | `context/03_domain_glossary.md` y/o `team/[persona]/docs/context/03_domain_glossary.md` |
| `04_state_machine.md` | `team/[persona]/docs/context/04_state_machine.md` (u otra copia bajo `team/**/docs/context/`) |
| `BRD.md` / `FSD.md` | `team/[persona]/docs/01_brd/BRD.md`, `team/[persona]/docs/FSD.md`, o artefactos en `docs/` y `team/**/` según trazabilidad del PR |
| `NFR_ISO25010.md` | *(no versionado aún en la raíz del repo)* — localizar bajo `docs/**` o `team/**` si aparece; si no existe, declarar el vacío y pedir la fuente NFR al usuario |
| ADR (convención del repo) | Plantilla: `templates/ADR_TEMPLATE.md`; destino habitual: `docs/adr/` con correlativo `ADR-NNNN` (ver plantilla) |
| DTI | Plantilla/guía: `templates/dti-author_template.md`; ejemplo: `docs/dti/DTI_borrador.md` |
