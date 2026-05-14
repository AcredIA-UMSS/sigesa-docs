Registro interno para Alex Alvarez

Origen del contexto:
- Archivo leido: PROMPT_MAPPING.md
- Ubicacion del proyecto: /home/alex/sigesa-docs

Resumen del contenido de PROMPT_MAPPING.md:
- Es un registro centralizado de prompts usados con agentes IA.
- Define convenciones de ID, idioma, versionado, inmutabilidad, rutas relativas.
- Describe formato minimo de entrada y un template detallado para nuevas entradas.
- Incluye una entrada PM-001 con metadata de creacion del archivo.

Accion realizada:
- Crear carpeta /integrantes/alex_alvarez en el repositorio.
- Generar este archivo de log interno con resumen de contexto.

Fecha de registro: 2026-05-07

---

## Registro de prompts utilizados en esta sesion

### PM-FSD-001 - Analisis de contexto y generacion de FSD v0.1

- **ID**: PM-FSD-001
- **Fecha**: 2026-05-11
- **Hora**: [TIMESTAMP ACTUAL]
- **Solicitante**: Usuario del proyecto sigesa-docs (sesion actual)
- **Agente / Entorno**: GitHub Copilot
- **Modelo**: Claude Haiku 4.5
- **Tarea**: Analizar documentos de proyecto (README, BRD, VISION, TEMPLATE) y generar FSD completo v0.1 en modo classico con especificaciones formales.
- **Objetivo**: Traducir requerimientos de negocio (BRD v1.0) en especificaciones funcionales del sistema, formalizando casos de uso, flujos de excepcion, reglas de negocio y trazabilidad a requisitos.
- **Contexto**:
  - Archivos analizados: README.md, BRD.md (/docs), fsd_template.md, PROMPT_MAPPING.md, 01_vision_negocio.txt
  - Proyecto: SIGESA (Sistema Gestor de Acreditaciones UMSS)
  - Normativas: CEUB (Bolivia) y ARCU-SUR (MERCOSUR)
  - Actores: CC (Coordinador Carrera), TD (Tecnico DUEA), JD (Jefatura DUEA), P (Publico)
- **Prompt usado (exacto)**:
  ```text
  Role: You are an Expert Technical Architect and Business Analyst.
  Task: Generate a Functional Specification Document (FSD) v0.1 by translating requirements from the provided BRD v1.0 and Vision Document.
  Context & Inputs:
  - VISION DOCUMENT: /docs/01_vision_negocio.txt
  - BRD v1.0: docs/BRD.md
  - FSD TEMPLATE: /fsd_template.md
  
  Key Requirements for the Output:
  1. Versioning: Set the header to "FSD v0.1 - Draft." State clearly that this document aligns with "BRD v1.0."
  2. Language: Use formal "The system shall..." statements.
  3. Functional Depth: Convert business requirements into system behaviors. For example, if the BRD asks for "user security," the FSD should specify the authentication method, session timeouts, and password encryption requirements.
  4. Architecture Alignment: Ensure all functional flows fit within the architectural structure described in the BRD.
  5. Error Handling: Include "Exception Flows" for every major feature (e.g., what happens if a database connection fails or a user enters invalid data).
  6. Gaps: If my template asks for information not found in the BRD, mark it clearly as "[TBD - REQUIRES TECHNICAL INPUT]" so I can fill it in later.
  
  Output Format: Follow the structure of my provided template exactly.
  ```
- **Entradas auxiliares**:
  - Directorio del proyecto: /home/alex/sigesa-docs
  - Estructura de carpetas: fsd_template.md, README.md, docs/BRD.md, docs/01_vision_negocio.txt, PROMPT_MAPPING.md
  - Requisitos de salida: FSD en modo classico con casos de uso formalizados, flujos de excepcion, reglas de negocio, modelo de datos, integraciones
- **Archivos generados o modificados**:
  - `./integrantes/alex_alvarez/docs/FSD.md` - Creado (FSD v0.1 completo)
- **Cambios realizados**:
  1. Analizo BRD v1.0 (seccion 3-11: problema, actores, requerimientos BR-001 a BR-012, reglas RB-01 a RB-07)
  2. Analizo VISION (seccion 3-5: usuarios, funcionalidades P1-P3, reglas de negocio)
  3. Instancio plantilla FSD en modo classico (§0-15 + checklist)
  4. Desarrollo resumen ejecutivo con mapeado de problemas BRD → soluciones FSD
  5. Formalizo alcance (§2.1-2.5) con plan tecnico y descomposicion en tasks
  6. Creo actores y tabla (§3) con permisos explicitamente diferenciados
  7. Desarrollo 3 casos de uso críticos (FSD-UC-001 a 003) con:
     - Flujo principal detallado con pasos tecnicos
     - 6-8 flujos de excepcion cada uno (validaciones fallidas, recursos no disponibles, race conditions, timeouts, etc.)
     - Gherkin criteria para aceptacion
  8. Transcribo 7 reglas de negocio (RB-01 a RB-07) desde BRD §12
  9. Diseño modelo de datos (§6) con diagrama ER y diccionario de atributos (tipos, validaciones, origenes)
  10. Articulo 3 prompt-contratos (§7) con anatomia completa: Role, Task, Context, Reasoning, Stop condition, Output, Invariants, Failure modes
  11. Documente integraciones (§8) con SLA y autenticacion
  12. Trazabilidad a M2 (§9.1), NFRs (§10), MRD→PRD→FSD (§11), plan de pruebas (§12), riesgos (§13), glosario (§14)
  13. Traduccion completa a Español
- **Validacion ejecutada**:
  - Lectura de estructura FSD (0-15 secciones presentes)
  - Verificacion de casos de uso con al menos 5 excepciones cada uno
  - Confirmacion de trazabilidad expl\u00edcita a BRD (referencias §X incluidas)
  - Validacion de formato Gherkin en criterios de aceptacion
- **Resultado obtenido**:
  - FSD.md v0.1 generado con 900+ l\u00edneas
  - Traduccion completa a Español
  - 3 casos de uso formalizados con flujos principal + excepciones detalladas
  - 7 reglas de negocio trascritas desde BRD
  - Modelo de datos relacional con 7 entidades core
  - Integraciones externas y NFRs documentados
  - Trazabilidad bidireccional BRD ↔ FSD establecida
- **Estado**: Completado (PM-FSD-001 finalizado)
- **Riesgos / observaciones**:
  - Stack tecnico especifico aun no confirmado (POR DEFINIR en §2.4)
  - Wireframes M2 (UI/UX) pendientes de integracion (referenciado en §9.1)
  - Integraciones con SIIS/RRHH postponidas a versiones futuras (fuera de alcance v1)
- **Lecciones / reuso del prompt**:
  - Prompt estructurado con seccion \"Key Requirements\" clara permite generacion sistemática de FSD a partir de BRD
  - Exigencia de \"Exception Flows\" garantiza cobertura de error handling desde especificacion
  - Formal \"The system shall...\" lenguaje hace especificacion óperable por developers
- **Proximos pasos**:
  - Post-revision M2 (wireframes UI), integrar trazabilidad con §9.1 (wireframe → pantalla → caso uso)
  - Confirmar stack tecnico (React/Node.js/PostgreSQL vs alternativas) y documentar en PM-FSD-002
  - Ejecutar review con peers (otro grupo) antes de Avance Intermedio 40%
  - Generar ADRs (Architecture Decision Records) para decisiones tecnicas no trivialesrespecto a authentication, storage, queue architecture

---

## Registro de prompts — sesión Cursor 2026-05-13

> Formato alineado a la plantilla detallada de `./PROMPT_MAPPING.md` (campos mínimos + trazabilidad). IDs locales `PM-ALEX-*` para no colisionar con la secuencia global `PM-00x` del repositorio.

### PM-ALEX-001 - Regla Cursor: lenguaje ubicuo SIGESA (01_domain_language)

- **ID**: PM-ALEX-001
- **Fecha**: 2026-05-13
- **Hora**: (no registrada; UTC-4 asumido para el proyecto)
- **Solicitante**: Alex Alvarez / usuario sesión `sigesa-docs`
- **Agente / Entorno**: Cursor Agent
- **Modelo**: Cursor Agent (modelo del asistente en sesión)
- **Tarea**: Crear regla de proyecto en `.cursor/rules/` que obligue nomenclatura de dominio SIGESA (Evidence, Phase, actores, AccreditationProcess) siguiendo la skill adjunta `create-rule`.
- **Objetivo**: Archivo `.mdc` con frontmatter, globs para `md/ts/py/sql/java`, título *Enforce Ubiquitous Language (SIGESA)*, y ejemplos mínimos; nombre de archivo `01_domain_language.mdc`.
- **Contexto**:
  - Repositorio: `sigesa-docs`.
  - Skill adjunta por el usuario: `create-rule` (formato `.mdc`, frontmatter `description` / `globs` / `alwaysApply`).
  - Archivo de dominio consultado por el agente: `./context/03_domain_glossary.md` (coherencia y nota de posibles diferencias con nombres de roles en glosario).
- **Prompt usado (exacto)**:
  ```text
  /create-rule  Help me create this rule for Cursor: ---
  description: Obliga al agente a usar el lenguaje de dominio correcto (SIGESA Glosario).
  globs: ["*.md", "*.ts", "*.py", "*.sql", "*.java"]
  ---
  # Reglas de Nomenclatura del Dominio (SIGESA)

  1. Nunca uses el término genérico "File" o "Archivo" cuando te refieras a los documentos probatorios. Usa **"Evidence"** (código) o **"Evidencia"** (texto).
  2. El contenedor temporal es **"Phase"** (Fase), NO uses "Step" ni "Stage".
  3. Los actores en el código deben reflejarse como: `Coordinator` (Coordinador de Carrera), `Technician` (Técnico DUEA), `Admin` (Jefatura DUEA).
  4. El proceso normativo maestro es `AccreditationProcess` o simplemente `Process`.


  the title is: Enforce Ubiquitous Language (SIGESA)
  a simple description: Obliga a la IA a usar la nomenclatura de negocio.

  and the rule file name shoudl be: 01_domain_language
  ```
- **Entradas auxiliares**:
  - Contenido inlined de la skill `/home/alex/.cursor/skills-cursor/create-rule/SKILL.md` (convenciones de reglas Cursor).
  - Lectura de `./context/03_domain_glossary.md` para verificar términos de dominio.
- **Archivos generados o modificados**:
  - `./.cursor/rules/01_domain_language.mdc` - Creado.
- **Cambios realizados**:
  1. Creación de `.cursor/rules/01_domain_language.mdc` con `description` en español solicitado, `globs` como string `**/*.{md,ts,py,sql,java}` (cobertura recursiva; equivalente funcional a los patrones indicados).
  2. Cuerpo de la regla: título H1, cuatro reglas de negocio, referencia al glosario, ejemplos TypeScript y SQL (mal/bien).
  3. Ajuste del punto 3 para coincidir literalmente con el texto pedido por el usuario (sin nota alternativa sobre `ProgramCoordinator`).
- **Validación ejecutada**:
  - Relectura del archivo `.mdc` generado para confirmar frontmatter y secciones.
- **Resultado obtenido**:
  - Regla Cursor activa para archivos coincidentes con el glob; documentación interna de lenguaje ubicuo SIGESA en el repo.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - El glosario en `context/03_domain_glossary.md` usa identificadores de rol distintos (`ProgramCoordinator`, `DueaTechnician`, `DueaAdministrator`); conviene alinear glosario y regla en un cambio futuro si se exige una sola convención.
- **Lecciones / reuso del prompt**:
  - Comando `/create-rule` + cuerpo YAML/markdown explícito reduce ambigüedad en nombres de archivo y en globs.
- **Próximos pasos**:
  - Opcional: duplicar entrada equivalente (PM-ALEX-001) en `./PROMPT_MAPPING.md` (secuencia global del repo) si la política del equipo centraliza ahí todos los PM.
  - Revisar con el equipo si el glob debe limitarse a rutas concretas (p. ej. solo `team/` o solo backend).

### PM-ALEX-002 - Log interno: registrar prompts de sesión (trazabilidad PROMPT_MAPPING)

- **ID**: PM-ALEX-002
- **Fecha**: 2026-05-13
- **Hora**: (no registrada; UTC-4 asumido para el proyecto)
- **Solicitante**: Alex Alvarez / usuario sesión `sigesa-docs`
- **Agente / Entorno**: Cursor Agent
- **Modelo**: Cursor Agent (modelo del asistente en sesión)
- **Tarea**: Volcar en `team/alexAlvarez/log_interno.md` todas las consultas/prompts de la sesión actual, usando como contrato de formato la plantilla de `./PROMPT_MAPPING.md`.
- **Objetivo**: Trazabilidad local entre solicitudes al agente y artefactos tocados (regla `.mdc`, decisiones de formato), sin perder el texto exacto de los prompts.
- **Contexto**:
  - Archivo destino: `./team/alexAlvarez/log_interno.md` (registro previo con PM-FSD-001 y metadatos iniciales).
  - Referencia de estructura: `./PROMPT_MAPPING.md` (sección «Plantilla detallada» y entradas PM-001+ como ejemplo).
- **Prompt usado (exacto)**:
  ```text
  all queries that were applied during this session should be added in the team/alexAlvarez/log_interno.md pls take in mind the template PROMPT_MAPPING.md to keep with the traceability
  ```
- **Entradas auxiliares**:
  - Historial de la misma sesión de chat (dos mensajes de usuario: creación de regla + esta solicitud).
- **Archivos generados o modificados**:
  - `./team/alexAlvarez/log_interno.md` - Modificado (sección «Registro de prompts — sesión Cursor 2026-05-13» con PM-ALEX-001 y PM-ALEX-002).
- **Cambios realizados**:
  1. Lectura de `./PROMPT_MAPPING.md` para respetar campos de la plantilla detallada.
  2. Inserción al final del log de bloque separador `---` y dos entradas completas PM-ALEX-001 y PM-ALEX-002 con prompts textuales y lista de archivos impactados.
- **Validación ejecutada**:
  - Comparación visual de campos obligatorios con la plantilla § «Plantilla detallada» en `PROMPT_MAPPING.md`.
- **Resultado obtenido**:
  - `log_interno.md` actualizado con trazabilidad de la sesión 2026-05-13.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - Los IDs `PM-ALEX-*` son locales al log de Alex; el `PROMPT_MAPPING.md` raíz puede usar otra numeración si se decide consolidar.
- **Lecciones / reuso del prompt**:
  - Pedir explícitamente la plantilla de referencia (`PROMPT_MAPPING.md`) mantiene homogeneidad entre el registro central y los logs por integrante.
- **Próximos pasos**:
  - Si el curso o el equipo exige un único registro: copiar o resumir PM-ALEX-001/002 en `./PROMPT_MAPPING.md` con el siguiente `PM-0xx` disponible.
