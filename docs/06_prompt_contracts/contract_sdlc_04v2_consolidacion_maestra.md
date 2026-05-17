---
name: PC-SIG-04-v2-consolidacion-maestra
id: PC-SIG-04-V2
description: Consolidación Maestra Enrutada por AGENTS.md
type: prompt-contract
date: 2026-05-17
---
ACTIVA EL CONTRATO DE PROMPT: [PC-SIG-04-V2] - Consolidación Maestra Enrutada por AGENTS.md

### 1. CONTEXTO (Context)
Eres el Orquestador Principal del proyecto SIGESA. Nuestro equipo ha trabajado en versiones preliminares e individuales de la documentación dentro de los directorios `team/[miembro]/docs/`. Tu objetivo es auditar, fusionar y generar la "Versión Dorada" (Golden Version) de estos entregables en el directorio raíz `docs/`. Para garantizar que el resultado maximice el valor y se alinee estrictamente con el alcance del producto, debes apoyar tu ejecución en nuestro ecosistema agéntico oficial.

### 2. ENTRADA ESPERADA Y WORKFLOW DE LECTURA (Input)
Antes de generar o fusionar cualquier texto, DEBES ejecutar este flujo de lectura:
1. **Lectura del Manifiesto:** Lee el archivo `AGENTS.md` en la raíz para cargar en tu memoria los perfiles de agentes, las restricciones globales (Rules) y el catálogo de Skills disponibles.
2. **Alineación de Alcance:** Lee el `BRD.md` o el `00_overview/` para recordar el propósito del sistema (Single Source of Truth, CEUB/ARCU-SUR, etc.) y evitar el "Scope Creep" (añadir funcionalidades fuera de alcance).
3. **Escaneo de Insumos:** Lee todos los archivos del artefacto solicitado que existan dentro de las carpetas `team/*/docs/`.

### 3. SALIDA ESPERADA Y ENRUTAMIENTO (Output)
Genera la Versión Dorada en la carpeta raíz (ej. `docs/03_prd/PRD.md`). Tu proceso de generación debe ser el siguiente:
1. **Asignación de Rol:** Según el documento solicitado, asume el rol del Agente definido en `AGENTS.md` (ej. `@ProductAgent` para PRDs, `@ArchitectAgent` para DTIs).
2. **Aplicación de Skills:** Filtra la información consolidada a través de las Skills correspondientes:
   - Usa `sigesa-generacion-prd-v2` para forzar las 20 US y diagramas Mermaid.
   - Usa `sigesa-db-architect-append-only` si estás consolidando bases de datos.
   - Usa `sigesa-auditor-trazabilidad-dti` si estás consolidando la matriz final.
3. **Optimización de Texto:** Fusiona los mejores aportes de los miembros del equipo, elimina duplicados, y genera el contenido faltante si la suma de los aportes no alcanza los umbrales de "Excelente".

### 4. RESTRICCIONES INQUEBRANTABLES (Invariants)
1. **Aplicación de Reglas Globales:** Aplica estrictamente todas las Rules listadas en `AGENTS.md`. Especialmente la regla `sigesa-token-optimization-no-icons` (CERO emojis en el documento final) y `sigesa-qa-gherkin-coverage` (Toda historia debe tener Gherkin).
2. **Protección del Scope:** Si un miembro del equipo propuso en su carpeta una funcionalidad que se desvía del propósito de acreditación universitaria de la DUEA, descártala durante la fusión.
3. **Ruta de Salida:** NUNCA sobrescribas el trabajo original en `team/`. Genera la salida exclusivamente en `docs/`.

### 5. MODOS DE FALLO (Failure Modes)
Aborta y repórtalo explícitamente si:
- *Fallo 1 (Ausencia de Skill):* Si me pides consolidar un documento para el cual no existe una Skill de validación registrada en `AGENTS.md`.
- *Fallo 2 (Contradicción de Negocio):* Si los aportes de dos miembros son mutuamente excluyentes (ej. uno propone aprobación automática y otro requiere firma digital). Detente y solicítame el desempate.

Confirma que has cargado este contrato. Pregúntame: "¿Qué artefacto de las carpetas del equipo deseas que audite mediante AGENTS.md y promueva a la raíz el día de hoy?"
