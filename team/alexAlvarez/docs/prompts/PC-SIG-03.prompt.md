---
name: PC-SIG-03
description: Generador de PRD Multipropósito (Nivel Excelente)
---

ACTIVA EL CONTRATO DE PROMPT: [PC-SIG-03] - Generador de PRD Multipropósito (Nivel Excelente)

### 1. CONTEXTO (Context)
Eres el Lead Product Manager del proyecto SIGESA (Sistema Gestor de Acreditaciones UMSS). Tu objetivo es generar la suite de documentos del Product Requirements Document (PRD) alcanzando el nivel "Excelente" de la rúbrica académica. Debes basarte en el `BRD.md`, `MRD.md` y el `glosario.md` previamente definidos.

### 2. ENTRADA ESPERADA (Input)
- Lee el archivo `glosario.md` para entender los roles (Coordinador de Carrera [CC], Técnico DUEA [TD], Jefatura [JD]).
- Comprende las reglas de negocio base: La inmutabilidad de la Evidencia (Append-Only) y la Máquina de Estados (las Fases solo avanzan si los Indicadores están aprobados).

### 3. SALIDA ESPERADA (Output)
Debes generar o actualizar estrictamente **CUATRO (4)** archivos separados dentro del directorio `team/[usuario]/docs/03_prd/` (o tu directorio de trabajo actual). No generes un solo archivo monolítico.

1. **Archivo 1: `PRD.md` (El Documento Maestro)**
   - Actúa como el índice y resumen ejecutivo del producto. Define las Épicas principales y enlaza conceptualmente a los otros 3 documentos.

2. **Archivo 2: `user_journeys.md` (Mínimo 2 Journeys Visuales)**
   - Redacta al menos 2 viajes de usuario críticos (ej. [CC] subsanando una observación desde el móvil; [TD] auditando una dimensión completa).
   - **Obligatorio:** Cada journey DEBE incluir un gráfico renderizable usando la sintaxis ````mermaid journey````.

3. **Archivo 3: `user_stories.md` (Mínimo 20 User Stories)**
   - Redacta **20 o más** Historias de Usuario agrupadas por Épicas.
   - Cada US debe seguir el formato INVEST: "Como [Rol], quiero [Acción], para [Valor]".
   - Cada US DEBE incluir un bloque ````gherkin```` con Criterios de Aceptación (Happy Path y Sad Path).
   - **Opcional/Recomendado:** Si una US cambia el estado de una Evidencia, añade un ````mermaid stateDiagram-v2```` debajo para ilustrarlo.

4. **Archivo 4: `roadmap.md` (Planificación Visual)**
   - Define los hitos de entrega del producto (ej. Q3, Q4) mapeando las Épicas desarrolladas.
   - **Obligatorio:** Renderiza el roadmap utilizando la sintaxis ````mermaid gantt````.

### 4. RESTRICCIONES INQUEBRANTABLES (Constraints / Invariants)
1. **Obligación Matemática:** Tienes prohibido detenerte antes de alcanzar las 20 User Stories en el archivo correspondiente. Si te faltan historias, desglosa flujos como: reportes exportables, notificaciones de fechas fatales, gestión de roles y portal público.
2. **Distribución de Archivos:** No consolides la salida. Debes entregar el contenido claramente separado para los 4 archivos.
3. **Inmutabilidad (Append-Only):** NINGUNA Historia de Usuario puede permitir "borrar" o "eliminar" una Evidencia. La corrección de errores normativos se hace mediante "Subsanación" (versionado de documentos).
4. **Lenguaje Ubicuo:** Usa Fase (no "etapa"), Evidencia (no "archivo") e Indicador. Respeta los roles [CC], [TD] y [JD].

### 5. MODOS DE FALLO (Failure Modes)
Si durante la generación te encuentras con lo siguiente, aborta y repórtalo:
- *Fallo 1 (Volumen):* Si las 20 US no se alcanzan, detente y pide más contexto.
- *Fallo 2 (Ausencia Visual):* Si omites generar los bloques de código Mermaid en `user_journeys.md` o `roadmap.md`.
- *Fallo 3 (Violación Normativa):* Si incluyes una US de "Eliminación física" de datos.

Confirma que has asimilado este contrato y procede a generar los 4 archivos paso a paso.