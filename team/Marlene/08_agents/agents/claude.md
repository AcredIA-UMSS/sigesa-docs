# Claude — Skill Guide

## Resumen
Claude es un agente de lenguaje (LLM) usado como asistente para generación de texto, resúmenes y soporte en la elaboración de documentos técnicos. Este documento describe cómo usar Claude dentro del flujo del proyecto SIGESA, buenas prácticas de prompting, limitaciones y consideraciones de seguridad.

**Versión del skill:** v1.0
**Fecha:** 2026-05-11
**Autor:** Equipo AcredIA / Alexander James Alvarez

## Capacidades recomendadas
- Generación de textos técnicos y de documentación (BRD → FSD, resúmenes ejecutivos).
- Reescritura y traducción de artefactos técnicos.
- Generación de prompts y mapeo de prompts a plantillas (PROMPT_MAPPING.md).
- Soporte en elaboración de casos de uso, criterios Gherkin y checklists.

## Casos de uso comunes
- Automatizar la creación de documentos basados en plantillas (p. ej. `fsd_template.md`).
- Extraer y estructurar requisitos desde el BRD.
- Proponer flujos de excepción y validaciones para casos de uso.
- Crear entradas para `PROMPT_MAPPING.md` y `log_interno` con metadatos de la interacción.

## Formato recomendado de prompt
1. Rol: indicar el rol (p. ej. "Eres un arquitecto técnico y analista de negocio").
2. Tarea: describir claramente el artefacto a producir.
3. Entradas: listar archivos y contexto (rutas relativas al repo).
4. Requisitos: puntos obligatorios (p. ej. "usar 'El sistema debe...'" o incluir flujos de excepción").
5. Salida esperada: formato exacto (Markdown, JSON, tabla, etc.).

Ejemplo breve:
```
Rol: Eres un arquitecto técnico.
Tarea: Genera la sección 'Modelo de datos' del FSD usando la plantilla en /fsd_template.md.
Entradas: docs/BRD.md, docs/01_vision_negocio.txt
Requisitos: Usar lenguaje 'El sistema debe...'; incluir diagrama ER en Mermaid; marcar como [POR DEFINIR] los gaps.
Salida: Markdown listo para pegar en /integrantes/alex_alvarez/docs/FSD.md
```

## Buenas prácticas
- Proveer siempre archivos fuente y secciones relevantes como contexto.
- Exigir trazabilidad: pedir referencias a `BRD v1.0` y números de regla cuando se generen reglas de negocio.
- Solicitar explicitación de supuestos y marcar como `[POR DEFINIR]` cuando falte información.
- Validar salidas generadas por Claude con un revisor humano antes de commitear.

## Limitaciones y riesgos
- Claude puede generar contenido plausible pero no siempre verificable; exigir fuentes y trazabilidad reduce riesgo de alucinaciones.
- No usar Claude para decisiones que requieran juicio legal o cumplimiento normativo sin revisión de expertos (CEUB/ARCU-SUR).
- Restringir la generación de datos sensibles (credenciales, datos personales) y revisar cualquier salida que incluya datos reales.

## Seguridad y privacidad
- No enviar credenciales ni datos personales en el prompt.
- Registrar cada interacción en `PROMPT_MAPPING.md` con ID `PM-XXX` para trazabilidad.
- Mantener el contexto mínimo necesario para la tarea.

## Ejemplos de prompts útiles
- "Resume el BRD y genera 5 requerimientos funcionales priorizados en formato de tabla." 
- "A partir de la sección 'Reglas de negocio' del BRD, sintetiza 7 reglas formales en lenguaje 'El sistema debe...'" 
- "Genera los criterios Gherkin para el caso de uso 'Carga de evidencia' incluyendo 5 flujos de error." 

## Integración operativa
- Todas las salidas importantes deben guardarse en el repositorio con entradas en `PROMPT_MAPPING.md`.
- Para reproducibilidad, registrar: ID del prompt, modelo/version, fecha, autor, archivos de entrada y salida.

## Notas de mantenimiento
- Actualizar este archivo cuando se cambie de versión del modelo o cuando se definan nuevas prácticas internas.
- Considerar añadir ejemplos de prompts aprobados (PM-002, PM-003, etc.) en futuras iteraciones.

---

Archivo generado automáticamente el 2026-05-11 para uso interno del proyecto SIGESA.