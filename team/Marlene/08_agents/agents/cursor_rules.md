# Cursor Rules (Directorios .cursor/rules/)

Las siguientes reglas deben dividirse en archivos individuales con extensión `.mdc` y colocarse dentro de la carpeta `.cursor/rules/`. Estas reglas instruyen al motor de IA de Cursor sobre cómo debe comportarse al escribir o evaluar código para SIGESA.

---

## Archivo: `.cursor/rules/01_domain_language.mdc`
**Nombre:** Enforce Ubiquitous Language (SIGESA)
**Descripción:** Obliga a la IA a usar la nomenclatura de negocio.

```mdc
---
description: Obliga al agente a usar el lenguaje de dominio correcto (SIGESA Glosario).
globs: ["*.md", "*.ts", "*.py", "*.sql", "*.java"]
---
# Reglas de Nomenclatura del Dominio (SIGESA)

1. Nunca uses el término genérico "File" o "Archivo" cuando te refieras a los documentos probatorios. Usa **"Evidence"** (código) o **"Evidencia"** (texto).
2. El contenedor temporal es **"Phase"** (Fase), NO uses "Step" ni "Stage".
3. Los actores en el código deben reflejarse como: `Coordinator` (Coordinador de Carrera), `Technician` (Técnico DUEA), `Admin` (Jefatura DUEA).
4. El proceso normativo maestro es `AccreditationProcess` o simplemente `Process`.
```

---

## Archivo: `.cursor/rules/02_state_machine.mdc`
**Nombre:** Hard Constraints on Phase Transitions
**Descripción:** Evita que la IA escriba funciones que puenteen la validación de acreditación.

```mdc
---
description: Restricciones duras para la máquina de estados de Indicadores y Fases.
globs: ["*controller*", "*service*", "*state*"]
---
# Reglas de la Máquina de Estados

1. **CRÍTICO:** Nunca escribas un endpoint o función que permita cambiar el estado de una `Phase` a `COMPLETED` sin antes validar todos sus indicadores hijos.
2. La validación lógica debe ser estricta: `COUNT(indicators) === COUNT(indicators.filter(i => i.state === 'APPROVED'))`.
3. Un `Indicator` no puede pasar de `OBSERVED` a `APPROVED` directamente; debe transicionar obligatoriamente por `REVISION_PENDING` (o `SUBSANADO`) cuando el usuario sube la evidencia corregida.
```

---

## Archivo: `.cursor/rules/03_append_only_db.mdc`
**Nombre:** Append-Only Evidence Architecture
**Descripción:** Previene escrituras destructivas en base de datos.

```mdc
---
description: Reglas para la inmutabilidad de la tabla de Evidencias (Documentos de Auditoría).
globs: ["*repository*", "*model*", "*query*", "*.sql"]
---
# Restricción de Base de Datos: Append-Only

1. **PROHIBIDO:** No escribas declaraciones `DELETE FROM evidence` bajo ninguna circunstancia (ni siquiera Soft-Deletes).
2. **PROHIBIDO:** No escribas comandos `UPDATE evidence SET file_url = ...` destructivos.
3. El sistema requiere trazabilidad para auditorías institucionales. Cuando un Coordinador corrige una Evidencia (Subsanación), tu código debe realizar un `INSERT` creando una nueva versión vinculada al mismo `Indicator_ID` y relacionándola con el `Observation_ID` correspondiente.
```

