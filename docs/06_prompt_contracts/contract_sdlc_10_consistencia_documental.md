---
name: PC-SIG-10-consistencia-documental
id: PC-SIG-10
description: Creador de Regla de Consistencia Documental
type: prompt-contract
date: 2026-05-17
---
ACTIVA EL CONTRATO DE PROMPT: [PC-SIG-10] - Creador de Regla de Consistencia Documental

### 1. CONTEXTO (Context)
Eres el Lead AI Architect y Documentalista Principal del proyecto SIGESA. A medida que escalamos la documentación (BRD, MRD, PRD, FSD) y el código, existe un alto riesgo de desincronización. Necesitamos crear una nueva regla global (Cursor Rule) que actúe como el "Guardián de Consistencia", asegurando que el `README.md`, el manifiesto `AGENTS.md` y los documentos en `docs/` jamás se contradigan entre sí.

### 2. ENTRADA ESPERADA (Input)
- Analiza la arquitectura de nuestro proyecto: tenemos un ecosistema centralizado (`README.md`, `AGENTS.md`, `glosario.md`) y un ecosistema distribuido (`docs/01_brd/`, `docs/03_prd/`, etc.).
- Considera los actores fijos ([CC], [TD], [JD]) y las restricciones base (Append-Only, Fases de Acreditación).

### 3. SALIDA ESPERADA (Output)
Genera un nuevo archivo de regla en la ruta `.cursor/rules/06_docs_consistency_checker.mdc` (o `.claude/rules/06_docs_consistency_checker.mdc`). Este archivo DEBE contener:
1. **Cabecera YAML:** Definiendo el nombre (`sigesa-docs-consistency-checker`), descripción y los `globs` para que aplique a todos los archivos `*.md`.
2. **Activación:** Explicar que la regla opera silenciosamente al crear o editar cualquier documento.
3. **Mecanismo de Cross-Reference:** Instrucciones explícitas para que la IA lea el `README.md` y el `AGENTS.md` antes de validar un nuevo rol, flujo o arquitectura.
4. **Política de Actualización en Cascada:** Si se detecta un cambio válido y estructural en un PRD (ej. añadir un nuevo dashboard), la IA debe sugerir proactivamente la actualización del `README.md` para reflejar el nuevo alcance.

### 4. RESTRICCIONES INQUEBRANTABLES (Invariants)
1. **Prioridad de la Fuente de Verdad:** El `glosario.md` y el `AGENTS.md` tienen prioridad. Si un documento nuevo intenta renombrar un término institucional (ej. usar "Etapa" en lugar de "Fase"), la regla debe bloquearlo inmediatamente.
2. **Detección de Contradicciones:** La regla debe ordenar a la IA que si encuentra una discrepancia (ej. el `README.md` dice que el sistema es solo para evaluación interna, pero el `PRD` incluye evaluación externa), detenga la generación y levante una alerta.
3. **Estilo Formal Zero-Icons:** Aplica nuestra política de optimización de tokens. El archivo generado no debe contener emojis ni arte ASCII decorativo.

### 5. MODOS DE FALLO (Failure Modes)
Aborta y repórtalo si:
- *Fallo 1:* La regla resultante no incluye los `globs` adecuados para auditar la carpeta `docs/` completa.
- *Fallo 2:* La redacción de la regla permite que los documentos de nivel inferior (ej. un Caso de Uso) sobrescriban silenciosamente las políticas definidas en el `README.md` sin alertar al usuario.

Confirma que has asimilado este contrato y procede a generar la regla `06_docs_consistency_checker.mdc` para blindar nuestra documentación.
