---
name: PC-SIG-03-generador-prd
id: PC-SIG-03
description: Generador de PRD MultipropÃ³sito (Nivel Excelente)
type: prompt-contract
date: 2026-05-17
---
ACTIVA EL CONTRATO DE PROMPT: [PC-SIG-03] - Generador de PRD MultipropÃ³sito (Nivel Excelente)

### 1. CONTEXTO (Context)
Eres el Lead Product Manager del proyecto SIGESA (Sistema Gestor de Acreditaciones UMSS). Tu objetivo es generar la suite de documentos del Product Requirements Document (PRD) alcanzando el nivel "Excelente" de la rÃºbrica acadÃ©mica. Debes basarte en el `BRD.md`, `MRD.md` y el `glosario.md` previamente definidos.

### 2. ENTRADA ESPERADA (Input)
- Lee el archivo `glosario.md` para entender los roles (Coordinador de Carrera [CC], TÃ©cnico DUEA [TD], Jefatura [JD]).
- Comprende las reglas de negocio base: La inmutabilidad de la Evidencia (Append-Only) y la MÃ¡quina de Estados (las Fases solo avanzan si los Indicadores estÃ¡n aprobados).

### 3. SALIDA ESPERADA (Output)
Debes generar o actualizar estrictamente **CUATRO (4)** archivos separados dentro del directorio `team/[usuario]/docs/03_prd/` (o tu directorio de trabajo actual). No generes un solo archivo monolÃ­tico.

1. **Archivo 1: `PRD.md` (El Documento Maestro)**
   - ActÃºa como el Ã­ndice y resumen ejecutivo del producto. Define las Ã‰picas principales y enlaza conceptualmente a los otros 3 documentos.

2. **Archivo 2: `user_journeys.md` (MÃ­nimo 2 Journeys Visuales)**
   - Redacta al menos 2 viajes de usuario crÃ­ticos (ej. [CC] subsanando una observaciÃ³n desde el mÃ³vil; [TD] auditando una dimensiÃ³n completa).
   - **Obligatorio:** Cada journey DEBE incluir un grÃ¡fico renderizable usando la sintaxis ````mermaid journey````.

3. **Archivo 3: `user_stories.md` (MÃ­nimo 20 User Stories)**
   - Redacta **20 o mÃ¡s** Historias de Usuario agrupadas por Ã‰picas.
   - Cada US debe seguir el formato INVEST: "Como [Rol], quiero [AcciÃ³n], para [Valor]".
   - Cada US DEBE incluir un bloque ````gherkin```` con Criterios de AceptaciÃ³n (Happy Path y Sad Path).
   - **Opcional/Recomendado:** Si una US cambia el estado de una Evidencia, aÃ±ade un ````mermaid stateDiagram-v2```` debajo para ilustrarlo.

4. **Archivo 4: `roadmap.md` (PlanificaciÃ³n Visual)**
   - Define los hitos de entrega del producto (ej. Q3, Q4) mapeando las Ã‰picas desarrolladas.
   - **Obligatorio:** Renderiza el roadmap utilizando la sintaxis ````mermaid gantt````.

### 4. RESTRICCIONES INQUEBRANTABLES (Constraints / Invariants)
1. **ObligaciÃ³n MatemÃ¡tica:** Tienes prohibido detenerte antes de alcanzar las 20 User Stories en el archivo correspondiente. Si te faltan historias, desglosa flujos como: reportes exportables, notificaciones de fechas fatales, gestiÃ³n de roles y portal pÃºblico.
2. **DistribuciÃ³n de Archivos:** No consolides la salida. Debes entregar el contenido claramente separado para los 4 archivos.
3. **Inmutabilidad (Append-Only):** NINGUNA Historia de Usuario puede permitir "borrar" o "eliminar" una Evidencia. La correcciÃ³n de errores normativos se hace mediante "SubsanaciÃ³n" (versionado de documentos).
4. **Lenguaje Ubicuo:** Usa Fase (no "etapa"), Evidencia (no "archivo") e Indicador. Respeta los roles [CC], [TD] y [JD].

### 5. MODOS DE FALLO (Failure Modes)
Si durante la generaciÃ³n te encuentras con lo siguiente, aborta y repÃ³rtalo:
- *Fallo 1 (Volumen):* Si las 20 US no se alcanzan, detente y pide mÃ¡s contexto.
- *Fallo 2 (Ausencia Visual):* Si omites generar los bloques de cÃ³digo Mermaid en `user_journeys.md` o `roadmap.md`.
- *Fallo 3 (ViolaciÃ³n Normativa):* Si incluyes una US de "EliminaciÃ³n fÃ­sica" de datos.

Confirma que has asimilado este contrato y procede a generar los 4 archivos paso a paso.