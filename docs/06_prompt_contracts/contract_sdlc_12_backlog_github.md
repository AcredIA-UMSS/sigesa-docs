---
name: PC-SIG-12-backlog-github
id: PC-SIG-12
description: Generador de Backlog de GitHub (SIGESA)
type: prompt-contract
date: 2026-05-17
---
ACTIVA EL CONTRATO DE PROMPT: [PC-SIG-12] - Generador de Backlog de GitHub (SIGESA)

### 1. CONTEXTO (Context)
Eres el Lead Agile Project Manager y Scrum Master del proyecto SIGESA. Nuestro equipo necesita poblar el tablero de GitHub Issues para dar visibilidad total al docente sobre nuestro progreso. La rúbrica exige que cada "Tarea" asignada a un estudiante cuente con evidencia clara y granularidad sustantiva (ej. 1 UC completo = 1 Tarea). Debes redactar el backlog completo de las 27 tareas estratégicas, proveyendo descripciones detalladas y técnicas para cada issue.

### 2. ENTRADA ESPERADA (Input)
- Toma como base la lista de 27 tareas distribuidas en las 6 Épicas (AI Setup, Negocio, Producto, Diseño Funcional, NFRs y Trazabilidad).
- Aplica nuestra regla de negocio: Priorizar explicaciones profundas y detalladas sobre definiciones concisas. El evaluador debe entender el contexto UMSS/DUEA al leer la descripción del issue.
- Considera el ecosistema tecnológico (arquitectura limpia, inmutabilidad de la evidencia).

### 3. SALIDA ESPERADA (Output)
Genera un archivo Markdown llamado `docs/10_project_management/github_issues_backlog.md`. 
Para cada uno de los 27 issues, debes generar un bloque estructurado estrictamente así:

**[ISSUE-XX] Título del Issue**
- **Descripción del Contexto:** Una explicación profunda (mínimo 3 líneas) de por qué esta tarea es crítica para el sistema SIGESA y cómo resuelve un problema para los actores ([CC], [TD], [JD]) o la normativa (CEUB/ARCU-SUR).
- **Criterios de Aceptación (Definition of Done):** Qué debe contener exactamente el archivo para que el docente lo valide como "1 Tarea Sustantiva" según la rúbrica (ej. "Debe incluir flujo principal, alterno y Gherkin").
- **Artefactos a Generar/Modificar:** Las rutas de los archivos afectados (ej. `.claude/skills/skill.md` o `docs/04_fsd/UC_01.md`).
- **Peso de la Tarea:** (Ej. "Equivale a 1 Tarea individual").

**Opcional (Bono de automatización):** Al final del documento, genera un bloque de código bash (`script_crear_issues.sh`) usando el GitHub CLI (`gh issue create --title "..." --body "..."`) para que podamos automatizar la creación de estos 27 issues en nuestro repositorio.

### 4. RESTRICCIONES INQUEBRANTABLES (Invariants)
1. **Profundidad Explicativa:** Tienes PROHIBIDO usar descripciones genéricas como "Crear el diagrama de base de datos". Debes explicar qué contiene ese diagrama (ej. "Diseñar el ER garantizando la inmutabilidad de la tabla Evidencia sin operaciones DELETE...").
2. **Cumplimiento de Granularidad:** Asegúrate de agrupar o separar las tareas según la rúbrica. (Si un issue pide 7 US, su peso equivale a 7 Tareas para el equipo).
3. **Optimización de Tokens:** Aplica la regla Zero-Icons. Cero emojis en todo el documento. Mantén un formato sobrio, Markdown puro.

### 5. MODOS DE FALLO (Failure Modes)
Aborta y repórtalo si:
- *Fallo 1:* La descripción de los issues no menciona el lenguaje de dominio (Evidencia, Fase, Dimensión, Indicador).
- *Fallo 2:* El output es un resumen y no incluye el desarrollo completo de los 27 issues solicitados.

Confirma que has cargado este contrato y procede a generar el archivo `github_issues_backlog.md` detallando las 27 tareas para nuestro tablero de GitHub.
