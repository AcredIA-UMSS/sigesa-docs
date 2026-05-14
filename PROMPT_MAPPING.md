# PROMPT_MAPPING.md - sigesa-docs

## ¿Qué es este archivo?
Registro centralizado y auditable de todos los prompts usados con agentes IA durante el desarrollo del proyecto. Su objetivo es documentar, de forma trazable y reutilizable, que se pidio, que se genero, con que modelo se ejecuto, que resultado se obtuvo y que decisiones tecnicas derivo.

Este archivo permite:
- Mantener trazabilidad entre solicitudes y cambios reales en el repositorio.
- Reproducir prompts exitosos en futuras tareas.
- Comparar desempeno entre modelos y estrategias de prompting.
- Facilitar revisiones tecnicas, auditoria y transferencia de conocimiento.

---

## Convenciones generales
- **ID de entrada**: `PM-001`, `PM-002`, ... (secuencial, sin saltos).
- **Idioma recomendado**: Espanol para consistencia interna del proyecto.
- **Versionado**: cada entrada representa una ejecucion puntual; si se repite una tarea con otro prompt, crear una nueva entrada.
- **Inmutabilidad recomendada**: no editar historicos, agregar nueva entrada para correcciones o mejoras.
- **Rutas**: usar rutas relativas al repositorio (ej.: `./docs/BRD.md`).

---

## Formato de cada entrada
Cada entrada debe incluir como minimo:
- ID: `PM-001`, `PM-002`, etc.
- Tarea: descripcion breve.
- Prompt usado: texto exacto entregado al agente.
- Archivo generado o modificado.
- Modelo usado.
- Resultado obtenido.

Adicionalmente, para un mapeo detallado, incluir:
- Fecha y hora.
- Autor / solicitante.
- Agente / entorno (ej.: Cursor Agent).
- Contexto de entrada.
- Objetivo esperado.
- Criterios de aceptacion.
- Acciones realizadas por el agente.
- Validacion aplicada.
- Estado final.
- Riesgos / observaciones.
- Proximos pasos.

---

## Plantilla detallada (copiar para nuevas entradas)
> Duplicar este bloque y reemplazar los campos.

### PM-XXX - [Titulo corto de la tarea]
- **ID**: PM-XXX
- **Fecha**: YYYY-MM-DD
- **Hora**: HH:MM (UTC-4)
- **Solicitante**: [Nombre o rol]
- **Agente / Entorno**: [Ej. Cursor Agent]
- **Modelo**: [Ej. claude en Cursor Agent]
- **Tarea**: [Descripcion breve]
- **Objetivo**: [Resultado esperado]
- **Contexto**:
  - [Archivos abiertos, requerimientos, restricciones]
- **Prompt usado (exacto)**:
  ```text
  [Pegar aqui el prompt exacto enviado al agente]
  ```
- **Entradas auxiliares**:
  - [Datos adicionales recibidos por el agente]
- **Archivos generados o modificados**:
  - `./ruta/archivo.ext` - [Creado/Modificado]
- **Cambios realizados**:
  - [Lista concreta de cambios aplicados]
- **Validacion ejecutada**:
  - [Ej. lectura de archivo, lint, pruebas, verificacion manual]
- **Resultado obtenido**:
  - [Que se logro exactamente]
- **Estado**: [Completado | Parcial | Pendiente | Bloqueado]
- **Riesgos / observaciones**:
  - [Notas relevantes]
- **Lecciones / reuso del prompt**:
  - [Que funciono y como reutilizarlo]
- **Proximos pasos**:
  - [Accion siguiente recomendada]

---

## Entradas

### PM-001 - Crear PROMPT_MAPPING.md
- **ID**: PM-001
- **Fecha**: 2026-05-06
- **Hora**: 21:26 (UTC-4)
- **Solicitante**: Aylen Gonzáles `sigesa-docs`
- **Agente / Entorno**: Cursor Agent
- **Modelo**: claude en Cursor Agent
- **Tarea**: Crear archivo base `PROMPT_MAPPING.md` con estructura inicial y formato detallado.
- **Objetivo**: Establecer un registro formal de prompts para trazabilidad de interacciones IA durante el desarrollo.
- **Contexto**:
  - Repositorio: `sigesa-docs`.
  - Archivo de referencia abierto: `./docs/BRD.md`.
  - Requisito explicito: incluir estructura indicada por el usuario y dejarla "completa" con alto detalle.
- **Prompt usado (exacto)**:
  ```text
  Crea un archivo llamado PROMPT_MAPPING.md en la raíz del proyecto. El archivo debe tener esta estructura:
  # PROMPT_MAPPING.md – sigesa-docs

  ## ¿Qué es este archivo?
  Registro de todos los prompts usados con agentes IA durante el desarrollo del proyecto, indicando qué se pidió, qué se generó y con qué modelo.

  ## Formato de cada entrada
  - ID: PM-001, PM-002, etc.
  - Tarea: descripción breve
  - Prompt usado: el texto exacto que se le dio al agente
  - Archivo generado o modificado
  - Modelo usado
  - Resultado obtenido

  ## Entradas

  ### PM-001 – Crear PROMPT_MAPPING.md
  - **Prompt**: "Crea un archivo PROMPT_MAPPING.md en la raíz del proyecto..."
  - **Archivo generado**: ./PROMPT_MAPPING.md
  - **Modelo**: claude en Cursor Agent
  - **Resultado**: Archivo creado con plantilla base , hazlo completo. un formato muy detallado para un Promt Mapping
  ```
- **Entradas auxiliares**:
  - Informacion de entorno del workspace (SO, shell, fecha, repo git).
- **Archivos generados o modificados**:
  - `./PROMPT_MAPPING.md` - Creado.
- **Cambios realizados**:
  - Se creo el documento en la raiz del proyecto.
  - Se mantuvo la estructura solicitada por el usuario.
  - Se amplio con secciones de convenciones, plantilla detallada y campos operativos para auditoria.
  - Se documento esta primera interaccion como entrada inicial.
- **Validacion ejecutada**:
  - Verificacion de inexistencia previa del archivo.
  - Confirmacion de creacion correcta en la ruta objetivo.
- **Resultado obtenido**:
  - Archivo `PROMPT_MAPPING.md` creado con una plantilla robusta y lista para registrar futuras interacciones de prompting.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - Conviene mantener el estandar de campos para conservar comparabilidad historica.
- **Lecciones / reuso del prompt**:
  - Un prompt con estructura explicita facilita la generacion de documentacion consistente y reutilizable.
- **Proximos pasos**:
  - Registrar `PM-002` en la siguiente tarea ejecutada con IA.
  - Definir responsable de mantenimiento de este archivo en el flujo del proyecto.

### PM-002 - Visión de negocio v2 (comparación con PDFs)
- **ID**: PM-002
- **Fecha**: 2026-05-10
- **Hora**: 23:53
- **Solicitante**: Aylen Gonzáles `sigesa-docs`
- **Agente / Entorno**: Cursor Agent
- **Modelo**: Cursor Agent (modelo del asistente en sesión)
- **Tarea**: Leer `docs/01_vision_negocio.txt` y los PDF del repositorio (y adjuntos); comparar con la visión; crear `team/aylenGonzales/02_vision_negocio_v2.md` conservando el contenido original y añadiendo información relevante de los PDFs; actualizar `PROMPT_MAPPING.md` con el registro del entregable.
- **Objetivo**: Disponer de una versión 2 del documento de visión con mayor contexto y completitud, trazable frente a fuentes PDF, sin perder el texto base.
- **Contexto**:
  - Repositorio: `sigesa-docs`.
  - Fuentes: `./docs/01_vision_negocio.txt`; PDFs añadidos en el chat; PDFs adjuntos en almacenamiento de workspace Cursor cuando apliquen.
- **Prompt usado (exacto)**:
  ```text
  Lee el archivo docs/01_vision_negocio.txt y todos los archivos PDF que encuentres en el repositorio.

  Compara el contenido del documento de visión con la información de los PDFs y crea el archivo team/aylenGonzales/02_vision_negocio_v2.md con una versión mejorada que incluya:
  - Todo el contenido original conservado
  - Información relevante e interesante que esté en los PDFs pero que falte en el documento actual
  - Datos importantes que aporten más completitud y contexto al documento de visión del negocio

  Finalmente, agrega al archivo PROMPT_MAPPING.md una nueva entrada:

  | 02_vision_negocio_v2.md | Comparación con PDFs y mejora del documento de visión | Aylen |
  ```
- **Entradas auxiliares**:
  - Rutas a PDF de Bitácora 3 y Actividad4 en carpeta de workspace del usuario (Cursor).
- **Archivos generados o modificados**:
  - `./team/aylenGonzales/02_vision_negocio_v2.md` - Creado.
  - `./PROMPT_MAPPING.md` - Modificado (registro de la tarea; la fila en tabla se sustituyó por esta entrada PM-002 estructurada).
- **Cambios realizados**:
  - Redacción de visión v2 con secciones 1–5 idénticas al `01_vision_negocio.txt` y suplementos 6–8 desde Bitácora 3 AcredIA.
  - Nota explícita sobre PDF no aplicable a SIGESA y referencia a otras bitácoras del repo.
  - Sustitución del registro tipo tabla por entrada detallada al alinear con el formato PM-001.
- **Validacion ejecutada**:
  - Lectura de `01_vision_negocio.txt`, PDF Bitácora 3 y Actividad4; revisión de estructura del markdown generado.
- **Resultado obtenido**:
  - Archivo `02_vision_negocio_v2.md` creado con base íntegra más ampliación contextual desde PDFs de AcredIA.
  - `PROMPT_MAPPING.md` actualizado con PM-002 en formato homogéneo a PM-001.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - Bitácora 1 y Módulo 2 no se extrajeron por ruta en el entorno de lectura; conviene reabrir v2 cuando esos PDF estén accesibles en el repo.
- **Lecciones / reuso del prompt**:
  - Pedir explícitamente “conservar original” y “solo añadir lo faltante” reduce riesgo de reescritura no deseada del BRD/visión.
- **Proximos pasos**:
  - Completado: registro `PM-003` (BRD v2 alineado con visión de negocio v2).
  - Opcional: incorporar texto de Bitácora 1 y Módulo 2 en `02_vision_negocio_v3.md` o en el BRD.

### PM-003 - BRD v2 (alineación con visión de negocio v2)
- **ID**: PM-003
- **Fecha**: 2026-05-10
- **Hora**: No registrada (UTC-4)
- **Solicitante**: Aylen Gonzáles `sigesa-docs`
- **Agente / Entorno**: Cursor Agent
- **Modelo**: Cursor Agent (modelo del asistente en sesión)
- **Tarea**: Leer `docs/BRD_v1.md` y `team/aylenGonzales/02_vision_negocio_v2.md`; comparar; crear `team/aylenGonzales/BRD_v2.md` conservando el contenido del BRD v1, incorporando mejoras y datos de la visión v2 que falten en el BRD; registrar la interacción en `PROMPT_MAPPING.md`.
- **Objetivo**: Contar con un BRD más completo y profesional, trazable frente a la visión v2, sin pérdida del texto base del BRD v1 en las secciones 1–20.
- **Contexto**:
  - Repositorio: `sigesa-docs`.
  - Entradas: `./docs/BRD_v1.md` (BRD base v0.1); `./team/aylenGonzales/02_vision_negocio_v2.md` (visión extendida y Bitácora 3).
  - Criterio: conservación literal del cuerpo de las secciones **1–19** del BRD v1; fila añadida en §20; extensiones en §0 metadatos y secciones 21–26.
- **Prompt usado (exacto)**:
  
```text
  Lee los archivos docs/BRD_v1.md y team/aylenGonzales/02_vision_negocio_v2.md

  Compara ambos documentos y crea el archivo team/aylenGonzales/BRD_v2.md con una versión mejorada que incluya:
  - Todo el contenido existente en BRD_v1.md conservado
  - Mejoras y nuevas secciones basadas en la información del documento de visión v2
  - Datos relevantes que estén en la visión pero que falten en el BRD actual
  - Cualquier información importante que haga el BRD más completo y profesional

  Luego agrega al archivo PROMPT_MAPPING.md una nueva entrada PM-003 siguiendo exactamente el mismo formato detallado de PM-001 y PM-002, con los datos que estamos haciendo ahhora
  
```
- **Entradas auxiliares**:
  - Ninguna adicional fuera de los dos documentos fuente y el estado del repositorio.
- **Archivos generados o modificados**:
  - `./team/aylenGonzales/BRD_v2.md` - Creado (copia base de `BRD_v1.md` + metadatos v2 + secciones 21–26 + checklist y pie ampliados).
  - `./PROMPT_MAPPING.md` - Modificado (entrada PM-003).
- **Cambios realizados**:
  - Metadatos §0: versión documento v2.0, fechas, fuente de alineación y nota de conservación (§1–§19 íntegros; §20 fila v2.0 añadida).
  - §20 Registro de cambios: fila v2.0 (fila v0.1 conservada).
  - Nuevas secciones 21–26: alineación estratégica, actores/fases/P1–P3, BR-013–018 y RB-08–11, IA/ética/accesibilidad/móvil, KPI-06–09, riesgos UX complementarios.
  - Checklist ampliado con ítems marcados para entregables v2.
  - Pie de documento con referencia cruzada a fuentes.
- **Validacion ejecutada**:
  - Comparación lectura a lectura BRD v1 vs visión v2; verificación de que las secciones **1–19** del archivo copiado coinciden con `docs/BRD_v1.md`.
- **Resultado obtenido**:
  - `BRD_v2.md` publicado en `team/aylenGonzales/` listo para revisión DUEA y trazabilidad hacia MRD/PRD.
  - `PROMPT_MAPPING.md` con PM-003 en formato homogéneo a PM-001 y PM-002.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - Los códigos [JC] y roles duplicados con [CC] requieren decisión institucional en implementación para evitar solapamiento de permisos.
  - KPIs KPI-06 a KPI-09 provienen de prototipo; deben validarse con datos UMSS en piloto.
- **Lecciones / reuso del prompt**:
  - Copiar BRD v1 íntegro y extender por secciones nuevas minimiza riesgo de regresión documental frente a edición línea a línea.
- **Proximos pasos**:
  - Actualizar trazabilidad §18 con IDs MRD/PRD para BR-013–018 cuando existan.
  - Opcional: `PM-004` para sincronizar con Bitácora 1 y Módulo 2 en texto plano accesible.

### PM-004 - Visión de negocio v2 (AcredIA) - Boris
- **ID**: PM-004
- **Fecha**: 2026-05-11
- **Hora**: 00:00 (UTC-4)
- **Solicitante**: Boris
- **Agente / Entorno**: BLACKBOXAI
- **Modelo**: N/A (asistente en sesión)
- **Tarea**: Crear `team/borisAngulo/01_vision_negocio_v2.txt` a partir de `docs/01_vision_negocio.txt` (V1 actual), **conservando todo el contenido original** y añadiendo SOLO los bloques [A]–[G] validados, marcándolos con `# [AÑADIDO EN V2 - Boris]`. Además, actualizar `PROMPT_MAPPING.md` con la entrada nueva.
- **Objetivo**: Generar una versión V2 fiel a la estructura/formato de V1 e incorporar requisitos negocio/UX/modularidad priorizados (MoSCoW) y marca.
- **Contexto**:
  - Fuente principal: `./docs/01_vision_negocio.txt`.
  - Entregable: `./team/borisAngulo/01_vision_negocio_v2.txt`.
  - Restricción: agregar SOLO [A]–[G] no cubiertos en V1.
  - Restricción adicional: mantener EXACTAMENTE la estructura y formato de V1, conservando contenido original sin reescribir.
- **Prompt usado (exacto)**:
  
```text
  Eres un asistente experto en documentación de negocio del proyecto SIGESA / AcredIA.
  ...
  Entrega:
  - Guarda el archivo en `team/borisAngulo/01_vision_negocio_v2.txt`
  - Solo el bloque nuevo en `PROMPT_MAPPING.md`
  
```
- **Entradas auxiliares**:
  - Contenido de `docs/01_vision_negocio.txt` (V1) leído para conservar estructura.
- **Archivos generados o modificados**:
  - `./team/borisAngulo/01_vision_negocio_v2.txt` - Creado
  - `./PROMPT_MAPPING.md` - Modificado (entrada PM-004)
- **Cambios realizados**:
  - Insertar secciones/bloques [A]–[G] en ubicaciones coherentes respetando el contenido existente.
  - Marcar cada bloque añadido con `# [AÑADIDO EN V2 - Boris]`.
  - Añadir encabezado de marca (AcredIA + slogan) dentro del documento V2.
  - Registrar esta ejecución en PROMPT_MAPPING.md.
- **Validacion ejecutada**:
  - Lectura de `docs/01_vision_negocio.txt` para conservar texto original.
  - Verificación de creación de archivo destino `team/borisAngulo/01_vision_negocio_v2.txt`.
  - Confirmación de inserción de la entrada nueva en `PROMPT_MAPPING.md`.
- **Resultado obtenido**:
  - Documento V2 generado en el path solicitado.
  - Entrada PM-004 agregada en PROMPT_MAPPING.md.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - Algunas secciones V1 no incluyen encabezados específicos (p.ej. posicionamiento competitivo), por lo que [C]–[G] se integran en posiciones más cercanas manteniendo el formato global.
- **Lecciones / reuso del prompt**:
  - Solicitar explícitamente “conservar original” y “solo añadir lo faltante” reduce el riesgo de reescritura.
- **Proximos pasos**:
  - Validar con el equipo DUEA/Negocio la consistencia semántica de [A]–[G] con el documento V1.


### PM-005 - BRD v2 desde plantilla y visión borisAngulo
- **ID**: PM-005
- **Fecha**: 2026-05-11
- **Hora**: 12:00 (UTC-4)
- **Solicitante**:  Boris `sigesa-docs`
- **Agente / Entorno**: Cursor Agent
- **Modelo**: Composer (agente en sesión)
- **Tarea**: Generar `team/borisAngulo/BRD_v2.md` usando la estructura y formato de `BRD_TEMPLATE.md`, completando cada sección con información de `team/borisAngulo/01_vision_negocio_v2.txt`; registrar la ejecución en `PROMPT_MAPPING.md` sin modificar otros archivos.
- **Objetivo**: Disponer de un BRD v2 oficial para la carpeta del equipo Boris/AcredIA, trazable a la visión de negocio v2 consolidada y alineado al estándar del curso (plantilla BRD).
- **Contexto**:
  - Repositorio: `sigesa-docs`.
  - Fuentes: `./BRD_TEMPLATE.md`; `./team/borisAngulo/01_vision_negocio_v2.txt`.
  - Restricción: solo crear/modificar `BRD_v2.md` y `PROMPT_MAPPING.md`.
- **Prompt usado (exacto)**:
  ```text
  Tienes los siguientes documentos:

  01_vision_negocio_v2.txt con la visión de negocio actualizada del proyecto SIGESA
  BRD_TEMPLATE.md en la raíz del proyecto como plantilla base

  Realiza las siguientes tareas:

  Genera el BRD v2 usando exactamente la estructura y formato del BRD_TEMPLATE.md, completando cada sección con la información extraída de 01_vision_negocio_v2.txt. El documento resultante debe guardarse como BRD_v2.md dentro de la carpeta team/borisAngulo/.
  Actualiza el archivo PROMPT_MAPPING.md en la raíz del proyecto agregando una nueva entrada para este prompt, respetando la estructura y formato que ya existe en ese archivo. No modifiques ningún otro archivo. Respeta el formato y convenciones existentes en ambos documentos de referencia.
  ```
- **Entradas auxiliares**:
  - Ninguna fuera de los archivos indicados y el estado del repositorio.
- **Archivos generados o modificados**:
  - `./team/borisAngulo/BRD_v2.md` - Creado.
  - `./PROMPT_MAPPING.md` - Modificado (entrada PM-005).
- **Cambios realizados**:
  - Redacción del BRD v2 con secciones 0–21 y checklist según plantilla: metadatos SIGESA/AcredIA, resumen ejecutivo, contexto UMSS/DUEA, problema y oportunidad, discovery enlazado, personas (DUEA + Coordinador/Jefe), propuesta de valor VPC, competencia, BMC, KPIs, objetivos SMART, RACI, BR-001–013 alineados a MoSCoW y P1–P3 de la visión, reglas RB-01–12 desde la visión, supuestos/restricciones/dependencias, alcance en/fuera, business case placeholder, riesgos, criterios de éxito proyecto, trazabilidad §18, aprobaciones, registro de cambios, PR-FAQ opcional poblado de forma coherente, checklist marcado.
- **Validacion ejecutada**:
  - Comparación sección a sección con `BRD_TEMPLATE.md` y extracción cruzada con `01_vision_negocio_v2.txt`.
- **Resultado obtenido**:
  - `BRD_v2.md` creado en `team/borisAngulo/` listo para revisión y encadenamiento hacia MRD/PRD.
  - `PROMPT_MAPPING.md` actualizado con PM-005 en formato homogéneo a PM-001–PM-004.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - Líneas base y cifras económicas declaradas como «por medir» / «por estimar» hasta piloto DUEA.
  - Discovery `docs/discovery/discovery_v0.1.md` y artefactos M2 referenciados como vinculación pendiente si aún no existen en el repo.
- **Lecciones / reuso del prompt**:
  - Pedir explícitamente la plantilla como contrato de secciones evita omisiones en BRD académico.
- **Proximos pasos**:
  - Completar líneas base KPI/BO en piloto y actualizar §8–§9.
  - Sustituir placeholders de MRD/PRD/FSD en §18 cuando existan IDs reales.


### PM-006 - PRD v1 desde plantilla, visión y BRD borisAngulo
- **ID**: PM-006
- **Fecha**: 2026-05-11
- **Hora**: 14:00 (UTC-4)
- **Solicitante**: Boris `sigesa-docs`
- **Agente / Entorno**: Cursor Agent
- **Modelo**: Composer (agente en sesión)
- **Tarea**: Generar `team/borisAngulo/PRD_v1.md` usando la estructura y formato de `PRD_TEMPLATE.md`, completando cada sección con información de `team/borisAngulo/01_vision_negocio_v2.txt` y `team/borisAngulo/BRD_v2.md`; registrar la ejecución en `PROMPT_MAPPING.md` sin modificar otros archivos.
- **Objetivo**: Disponer de un PRD v1 oficial, coherente con visión de negocio v2 y BRD v2, listo como referencia de producto y encadenamiento hacia MRD/FSD.
- **Contexto**:
  - Repositorio: `sigesa-docs`.
  - Fuentes: `./PRD_TEMPLATE.md`; `./team/borisAngulo/01_vision_negocio_v2.txt`; `./team/borisAngulo/BRD_v2.md`.
  - Restricción: solo crear/modificar `PRD_v1.md` y `PROMPT_MAPPING.md`.
- **Prompt usado (exacto)**:
  ```text
  Tienes los siguientes documentos:

  01_vision_negocio_v2.txt con la visión de negocio actualizada del proyecto SIGESA
  team/borisAngulo/BRD_v2.md con los requerimientos de negocio ya definidos
  PRD_TEMPLATE.md en la raíz del proyecto como plantilla base
  PROMPT_MAPPING.md con el registro de prompts del proyecto

  Realiza las siguientes tareas:

  Genera el PRD v1 usando exactamente la estructura y formato del PRD_TEMPLATE.md, completando cada sección con información extraída de 01_vision_negocio_v2.txt y BRD_v2.md. El documento debe ser coherente con ambos documentos de entrada, profesional y listo para ser referencia oficial del producto. Guárdalo como PRD_v1.md dentro de la carpeta team/borisAngulo/.
  Actualiza el archivo PROMPT_MAPPING.md en la raíz del proyecto agregando una nueva entrada para este prompt, respetando estrictamente la estructura y formato que ya existe en ese archivo.  No modifiques ningún otro archivo. Respeta el formato y convenciones existentes en todos los documentos de referencia.
  ```
- **Entradas auxiliares**:
  - Ninguna fuera de los archivos indicados y el estado del repositorio.
- **Archivos generados o modificados**:
  - `./team/borisAngulo/PRD_v1.md` - Creado.
  - `./PROMPT_MAPPING.md` - Modificado (entrada PM-006).
- **Cambios realizados**:
  - PRD v1 con secciones 0–16 y checklist según plantilla: metadatos, constitution, resumen, objetivos ligados a BO, alcance v1.0 y backlog, roadmaps delivery/discovery, personas y 2 journeys Mermaid, 24 user stories en 8 épicas con Gherkin, MoSCoW + RICE top‑10, requisitos funcionales y NFRs, dependencias, UX/trazabilidad M2, métricas, riesgos, trazabilidad a BRD/MRD/FSD, anexos, registro de cambios.
- **Validacion ejecutada**:
  - Revisión cruzada con `PRD_TEMPLATE.md`, `01_vision_negocio_v2.txt` y `BRD_v2.md` (roles, fases, P1–P3, MoSCoW, BR-001–013, RB, KPIs).
- **Resultado obtenido**:
  - `PRD_v1.md` publicado en `team/borisAngulo/` como referencia de producto v1.0.
  - `PROMPT_MAPPING.md` actualizado con PM-006 en formato homogéneo a entradas previas.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - MRD y artefactos M2 enlazados como pendientes; IDs FSD son placeholders hasta especificación detallada.
  - RICE es estimación relativa del equipo; recalibrar tras planning.
- **Lecciones / reuso del prompt**:
  - Anclar historias a IDs BR-xxx acelera la trazabilidad §14 y reduce desalineación con negocio.
- **Proximos pasos**:
  - Completar MRD y matriz M2 en §11.1; sustituir placeholders FSD en §14.
  - Revisión por pares (Tech Lead + QA) y marcar checklist del PRD.


### PM-007 - PRD v1 desde plantilla y BRD v2 aylenGonzales

- **ID**: PM-007
- **Fecha**: 2026-05-11
- **Hora**: 23:00 (UTC-4)
- **Solicitante**: Aylen Mariangel Gonzales Alvino `sigesa-docs`
- **Agente / Entorno**: Claude (claude.ai)
- **Modelo**: claude-sonnet-4-6
- **Tarea**: Generar `team/aylenGonzales/PRD_v1.md` usando la estructura y formato de `PRD_TEMPLATE.md`, completando cada sección con información de `team/aylenGonzales/BRD_v2.md`; registrar la ejecución en `PROMPT_MAPPING.md` sin modificar otros archivos.
- **Objetivo**: Disponer de un PRD v1 oficial para la carpeta de Aylen, coherente con el BRD v2 del proyecto AcredIA/SIGESA y alineado al estándar del curso (plantilla PRD), listo como referencia de producto y encadenamiento hacia MRD/FSD.
- **Contexto**:
  - Repositorio: `sigesa-docs`.
  - Fuentes: `./PRD_TEMPLATE.md`; `./team/aylenGonzales/BRD_v2.md`.
  - Restricción: solo crear/modificar `PRD_v1.md` y `PROMPT_MAPPING.md`.
  - Contexto adicional: Cursor había alcanzado el límite de uso; la tarea se ejecutó en Claude (claude.ai) como alternativa.
- **Prompt usado (exacto)**:
  ```text
  Eres un ingeniero de producto senior con experiencia en documentación técnica y definición
  de requerimientos de software. Tu tarea es transformar un BRD (Business Requirements Document)
  en un PRD (Product Requirements Document) profesional y detallado.

  Usando el archivo @team/aylenGonzales/BRD_v2.md como base, genera un PRD completo siguiendo
  exactamente la estructura y formato del template @PRD_TEMPLATE.md

  Requisitos:
  1. Analiza toda la información del BRD_v2.md de aylenGonzales
  2. Completa TODAS las secciones del PRD_TEMPLATE.md con la información extraída del BRD
  3. Donde el BRD no tenga suficiente detalle, infiere basándote en el contexto del proyecto
  4. Guarda el resultado como: team/aylenGonzales/PRD_v1.md

  Luego, agrega una nueva entrada en @PROMPT_MAPPING.md siguiendo exactamente
  el formato que ya existe en ese archivo para documentar el prompt que se usó
  para generar este PRD desde el BRD_v2 de aylenGonzales.
  ```
- **Entradas auxiliares**:
  - Contenido completo de `team/aylenGonzales/BRD_v2.md` (BRD v2.0, secciones 0–26).
  - Contenido completo de `PRD_TEMPLATE.md`.
  - Contenido completo de `PROMPT_MAPPING.md` (entradas PM-001 a PM-006 como referencia de formato).
- **Archivos generados o modificados**:
  - `./team/aylenGonzales/PRD_v1.md` - Creado.
  - `./PROMPT_MAPPING.md` - Modificado (entrada PM-007).
- **Cambios realizados**:
  - PRD v1 con secciones 0–16 y checklist según plantilla: metadatos AcredIA/SIGESA, constitution (4 principios), resumen ejecutivo, 7 objetivos ligados a BO/BR del BRD, alcance v1.0/backlog/roadmap delivery (3 versiones)/roadmap discovery (5 hipótesis), 4 personas y 3 user journeys Mermaid ([CC], [JD], [TD]), 17 user stories en 8 épicas con criterios Gherkin, priorización MoSCoW + RICE top-10, 17 requerimientos funcionales con trazabilidad a BRD, 13 NFRs con umbrales, dependencias e integraciones, supuestos y restricciones, trazabilidad M2 (wireframes y use cases), métricas de éxito (North Star + KPI-01 a KPI-09), 7 riesgos del producto, tabla de trazabilidad PRD→BRD→MRD→FSD (17 mapeos), anexos, registro de cambios y checklist marcado.
- **Validacion ejecutada**:
  - Revisión cruzada sección a sección con `PRD_TEMPLATE.md`.
  - Verificación de trazabilidad de cada PRD-REQ con su BR correspondiente del BRD v2.
  - Confirmación de que todas las épicas cubren los requerimientos Must del BRD (BR-001 a BR-018).
  - Verificación de coherencia entre personas, journeys y user stories.
- **Resultado obtenido**:
  - `PRD_v1.md` generado en `team/aylenGonzales/` con todas las secciones del template completas.
  - 17 user stories en 8 épicas con criterios Gherkin.
  - 3 user journeys Mermaid para actores principales.
  - Trazabilidad completa BRD v2 → PRD v1 → FSD (placeholder).
  - `PROMPT_MAPPING.md` actualizado con PM-007 en formato homogéneo a PM-001–PM-006.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - MRD aún no generado; IDs MRD-N-XX en la tabla de trazabilidad son placeholders.
  - IDs FSD son placeholders hasta especificación detallada.
  - RICE es estimación relativa del equipo AcredIA; recalibrar tras planning con datos reales de usuarios UMSS.
  - La tasa de éxito de core tasks (96,66 %) y CSAT (8,67/10) provienen del prototipo Hi-Fi (Bitácora 3); deben validarse en piloto UMSS.
- **Lecciones / reuso del prompt**:
  - Proporcionar el BRD completo y el template completo como contexto directo (sin @referencias) permite que Claude genere el PRD sin necesidad de acceso al filesystem.
  - Anclar user stories a IDs BR-xxx desde el inicio acelera la trazabilidad §14 y reduce desalineación con negocio.
  - Especificar "Eres un ingeniero de producto senior" como rol mejora la coherencia y profundidad del documento generado.
  - Claude (claude.ai) es una alternativa viable cuando Cursor alcanza su límite de uso.
- **Proximos pasos**:
  - Copiar `PRD_v1.md` a `team/aylenGonzales/PRD_v1.md` en el repositorio local.
  - Generar MRD y sustituir placeholders MRD-N-XX en §14.
  - Completar matriz de trazabilidad con IDs FSD cuando se especifique el FSD.
  - Revisión por pares (Tech Lead + QA) y completar checklist del PRD.
  - Registrar `PM-008` en la siguiente tarea ejecutada con IA.


### PM-008 - FSD v1 desde plantilla, PRD v1 y BRD v2 aylenGonzales
- **ID**: PM-008
- **Fecha**: 2026-05-11
- **Hora**: 23:30 (UTC-4)
- **Solicitante**: Aylen Gonzáles`sigesa-docs`
- **Agente / Entorno**: Claude (claude.ai)
- **Modelo**: claude-sonnet-4-6
- **Tarea**: Generar `team/aylenGonzales/FSD_v1.md` usando la estructura y formato de `FSD_TEMPLATE.md` en modo LFSD ⚡, completando cada sección con información de `team/aylenGonzales/PRD_v1.md` y `team/aylenGonzales/BRD_v2.md`; registrar la ejecución en `PROMPT_MAPPING.md` sin modificar otros archivos.
- **Objetivo**: Disponer de un FSD v1 oficial en modo LFSD para la carpeta de Aylen, coherente con el PRD v1 y BRD v2 del proyecto AcredIA/SIGESA, listo como especificación funcional para el equipo de diseño, ingeniería y QA.
- **Contexto**:
  - Repositorio: `sigesa-docs`.
  - Fuentes: `./FSD_TEMPLATE.md`; `./team/aylenGonzales/PRD_v1.md`; `./team/aylenGonzales/BRD_v2.md`.
  - Restricción: solo crear/modificar `FSD_v1.md` y `PROMPT_MAPPING.md`.
  - Contexto adicional: Cursor había alcanzado el límite de uso; la tarea se ejecutó en Claude (claude.ai) como alternativa, con los tres documentos fuente provistos directamente en el contexto de la conversación.
- **Prompt usado (exacto)**:
  ```text
  Eres un ingeniero de producto senior con experiencia en documentación técnica y definición
  de requerimientos de software. Tu tarea es transformar un BRD y un PRD ya existentes
  en un FSD (Functional Specification Document) profesional y detallado.

  Usando los archivos @team/aylenGonzales/BRD_v2.md y @team/aylenGonzales/PRD_v1.md como base,
  genera un FSD completo en modo LFSD ⚡ siguiendo exactamente la estructura y formato
  del template @FSD_TEMPLATE.md

  Requisitos:
  1. Declara el modo como LFSD ⚡ en §0 Metadatos
  2. Completa TODAS las secciones obligatorias del checklist LFSD
  3. Incluye mínimo 3 casos de uso críticos con flujo principal, alternativos y criterios Gherkin
  4. Genera un prompt-contrato (§7) por cada caso de uso crítico con los 6 elementos de la anatomía
  5. Mantén trazabilidad explícita PRD-REQ → FSD-UC en todas las secciones
  6. Incluye diagrama ER en Mermaid y diccionario de datos de entidades core
  7. Guarda el resultado como: team/aylenGonzales/FSD_v1.md

  Luego, agrega una nueva entrada en @PROMPT_MAPPING.md siguiendo exactamente
  el formato que ya existe en ese archivo (PM-001 a PM-007) para documentar
  este FSD generado desde el PRD v1 y BRD v2 de aylenGonzales.
  ```
- **Entradas auxiliares**:
  - Contenido completo de `team/aylenGonzales/BRD_v2.md` (BRD v2.0, secciones 0–26).
  - Contenido completo de `team/aylenGonzales/PRD_v1.md` (PRD v1.0, secciones 0–16).
  - Contenido completo de `FSD_TEMPLATE.md`.
  - Contenido completo de `PROMPT_MAPPING.md` (entradas PM-001 a PM-007 como referencia de formato).
- **Archivos generados o modificados**:
  - `./team/aylenGonzales/FSD_v1.md` - Creado.
  - `./PROMPT_MAPPING.md` - Modificado (entrada PM-008).
- **Cambios realizados**:
  - FSD v1 modo LFSD ⚡ con todas las secciones del checklist LFSD completas:
    - §0 Metadatos con modo LFSD ⚡ declarado explícitamente.
    - §1 Resumen ejecutivo (≈200 palabras).
    - §2 Alcance + §2.3 Supuestos/Dependencias + §2.4 Plan técnico (stack, arquitectura, project structure, decisiones técnicas) + §2.5 Tasks (12 tasks ejecutables con prompt asociado).
    - §3 Actores (8 actores: [CC], [TD], [JD], [P], [JC], [EE], Sistema notificaciones, Motor de reportes).
    - §4 Cinco casos de uso (FSD-UC-001 a FSD-UC-005): Autenticación, Carga de evidencias, Aprobación/Rechazo de indicadores, Dashboard gerencial, Generación de reporte PDF — cada uno con flujo principal, alternativos, pre/postcondiciones, reglas aplicables, datos E/S y criterios Gherkin.
    - §5 Quince reglas de negocio con tipo, origen y casos afectados.
    - §6 Diagrama ER en Mermaid (8 entidades) + diccionario de datos de entidades core.
    - §7 Tres prompt-contratos (UC-001, UC-002, UC-003) con los 6 elementos de la anatomía: Role, Task, Context, Reasoning, Stop condition, Output + Invariants + Failure modes.
    - §8 Integraciones externas (SMTP UMSS, S3-compatible, Motor PDF).
    - §9 Mapeo pantalla→caso de uso + §9.1 Trazabilidad M2 (5 wireframes/mockups del prototipo Hi-Fi).
    - §10 Trece NFRs con métrica, umbral y forma de verificación.
    - §11 Matriz de trazabilidad MRD→PRD→FSD→NFR→prueba (7 filas).
    - §12 Plan de pruebas (estrategia + herramientas: Jest/Pytest, Playwright, k6, Axe + cobertura ≥ 80 %).
    - §13 Seis riesgos funcionales con mitigación y responsable.
    - §14 Glosario (15 términos del dominio AcredIA/SIGESA).
    - §15 Registro de cambios.
    - Checklist LFSD marcado (14/15 ítems; revisión por pares pendiente).
- **Validacion ejecutada**:
  - Revisión cruzada sección a sección con `FSD_TEMPLATE.md` checklist LFSD ⚡.
  - Verificación de trazabilidad PRD-REQ → FSD-UC en §4 y §11.
  - Confirmación de que los 3 prompt-contratos cubren los casos de uso Must del PRD (UC-001, UC-002, UC-003).
  - Verificación de consistencia entre reglas de negocio (§5) y casos de uso (§4).
  - Confirmación de coherencia del diagrama ER con los flujos de los casos de uso.
- **Resultado obtenido**:
  - `FSD_v1.md` generado en `team/aylenGonzales/` en modo LFSD ⚡ con todas las secciones obligatorias del checklist completas.
  - 5 casos de uso críticos con criterios Gherkin.
  - 3 prompt-contratos con los 6 elementos de la anatomía del prompt.
  - Diagrama ER Mermaid con 8 entidades y diccionario de datos core.
  - 12 tasks ejecutables para el Spec Kit.
  - Trazabilidad completa BRD v2 → PRD v1 → FSD v1.
  - `PROMPT_MAPPING.md` actualizado con PM-008 en formato homogéneo a PM-001–PM-007.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - Prompt-contratos de FSD-UC-004 (Dashboard) y FSD-UC-005 (Reporte PDF) no incluidos en §7 por priorización LFSD; añadir en v1.1 o al pasar a modo FSD clásico 🔧.
  - IDs MRD-N-XX en §11 son placeholders hasta que el MRD sea generado formalmente.
  - Los prompt-contratos deben testearse con al menos 30 ejecuciones para reportar hallucination rate (§7.3 opcional).
  - Revisión por pares (otro grupo) pendiente; registrar como comentario en el PR de GitHub.
- **Lecciones / reuso del prompt**:
  - Especificar explícitamente "modo LFSD ⚡" y referenciar el checklist LFSD del template garantiza que el agente respete las secciones obligatorias vs. opcionales.
  - Pedir los 6 elementos de la anatomía del prompt en los prompt-contratos (Role, Task, Context, Reasoning, Stop condition, Output) produce especificaciones más precisas y ejecutables.
  - Proveer BRD + PRD + Template como contexto directo (sin @referencias al filesystem) es la estrategia correcta cuando Cursor no está disponible.
  - El diagrama ER en Mermaid es más valioso cuando refleja los estados de las entidades (INDICADOR.estado, PROCESO.estado) que son el núcleo de las reglas de negocio.
- **Proximos pasos**:
  - Copiar `FSD_v1.md` a `team/aylenGonzales/FSD_v1.md` en el repositorio local.
  - Hacer commit y push a la rama `Aylen` y abrir PR hacia `main`.
  - Completar revisión por pares y registrar como comentario en el PR.
  - Agregar prompt-contratos para FSD-UC-004 y FSD-UC-005 en la v1.1.
  - Sustituir placeholders MRD-N-XX en §11 cuando el MRD sea generado.
  - Registrar `PM-009` en la siguiente tarea ejecutada con IA.


### PM-009 - FSD v1 desde PRD v1 y prompts de evidencias (Boris/AcredIA)
- **ID**: PM-009
- **Fecha**: 2026-05-12
- **Hora**: 00:00 (UTC-4)
- **Solicitante**: AcredIA `team/borisAngulo`
- **Agente / Entorno**: BLACKBOXAI
- **Modelo**: N/A (asistente en sesión)
- **Tarea**: Leer `PROMPT_MAPPING.md`, `team/borisAngulo/BRD_v2.md` y `team/borisAngulo/PRD_v1.md`; generar un FSD completo siguiendo exactamente la estructura del template `templates/fsd_template.md`; guardar el entregable en `team/borisAngulo/FSD_v1.md`; finalmente agregar esta entrada al `PROMPT_MAPPING.md`.
- **Objetivo**: Generar `team/borisAngulo/FSD_v1.md` en modo LFSD ⚡, con casos de uso funcionales críticos, reglas de negocio, modelo de datos básico, NFRs y trazabilidad a PRD.
- **Contexto**:
  - Fuentes de negocio y requerimientos: `team/borisAngulo/BRD_v2.md` y `team/borisAngulo/PRD_v1.md`.
  - Template: `templates/fsd_template.md`.
  - Restricción de formato: respetar la estructura exacta del template y mantener trazabilidad explícita `PRD-REQ-*` → `FSD-UC-*`.
- **Prompt usado (exacto)**:
  ```text
  Lee el archivo `PROMPT_MAPPING.md` para entender su estructura actual.

  Luego, lee todos los documentos de `team/borisAngulo/`:
  - `01:visio_negocio:v2/ `
  - `BRD_v2.md`
  - `PRD_v1.md`

  Con base en esa información, genera un FSD completo siguiendo exactamente la estructura del template en .

  Guarda el FSD generado en `team/borisAngulo/FSD_v1.md`.

  Finalmente, actualiza 'PROMPT_MAPPING.md (see below for file content) ' añadiendo este flujo como una nueva entrada, respetando la estructura y formato que ya existe en ese archivo.
  ```
- **Entradas auxiliares**:
  - Template de FSD: `templates/fsd_template.md`.
  - Documento de visión usado como contexto para reglas/alcance del dominio: `team/borisAngulo/01_vision_negocio_v2.txt`.
- **Archivos generados o modificados**:
  - `./team/borisAngulo/FSD_v1.md` - Creado.
  - `./PROMPT_MAPPING.md` - Modificado (entrada PM-008).
- **Cambios realizados**:
  - Generación de `FSD_v1.md` en modo LFSD ⚡ siguiendo la estructura del template.
  - Inclusión de 3 casos de uso críticos: `FSD-UC-001`, `FSD-UC-002`, `FSD-UC-003`.
  - Definición de reglas de negocio con mapeo a casos de uso.
  - Modelo de datos funcional con ER/diagrama Mermaid y diccionario mínimo.
  - Prompt-contratos para cada caso de uso crítico con invariantes y failure modes.
  - NFRs y plan de pruebas funcionales mínimos.
  - Sección de trazabilidad MRD → PRD → FSD (mapeo mínimo).
- **Validacion ejecutada**:
  - Verificación de presencia/orden de secciones contra `templates/fsd_template.md`.
  - Revisión de trazabilidad: `PRD-REQ-*` referenciados en casos de uso y reglas.
- **Resultado obtenido**:
  - `team/borisAngulo/FSD_v1.md` creado y listo.
  - Flujo registrado como entrada `PM-008` en `PROMPT_MAPPING.md`.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - Trazabilidad con artefactos M2 declarada como pendiente en la sección de interfaces (rutas de UI/UX no publicadas en los inputs del flujo).
- **Lecciones / reuso del prompt**:
  - Mantener el contrato de “estructura exacta + trazabilidad PRD→FSD” reduce omisiones y acelera auditoría.
- **Proximos pasos**:
  - Completar §9/§9.1 con rutas de wireframes/mockups del M2 cuando estén publicados.
  - Generar y enlazar MRD y FSD adicionales con IDs definitivos.
  - Registrar `PM-010` en la siguiente tarea ejecutada con IA.


### PM-010 - LFSD - Derivación documental LFSD desde FSD (SIGESA)
- **ID**: PM-010 - LFSD
- **Fecha**: 2026-05-12
- **Hora**: 00:30 (UTC-4)
- **Solicitante**: Boris `team/borisAngulo`
- **Agente / Entorno**: BLACKBOXAI
- **Modelo**: N/A (asistente en sesión)
- **Tarea**: Generar `team/borisAngulo/LFSD_v1.md` derivándolo desde `team/borisAngulo/FSD_v1.md`, preservando IDs y trazabilidad a PRD, y creando prompt-contracts ejecutables para casos de uso críticos. Actualizar `PROMPT_MAPPING.md` con el registro de este prompt.
- **Objetivo**: Documento LFSD lightweight, claro, trazable y orientado a implementación a partir del FSD vigente, sin inventar funcionalidades.
- **Contexto**:
  - Archivos fuente: `team/borisAngulo/FSD_v1.md`, `team/borisAngulo/BRD_v2.md`, `team/borisAngulo/PRD_v1.md`, `templates/fsd_template.md` y `PROMPT_MAPPING.md`.
  - Restricciones: conservar trazabilidad e IDs (`PRD-REQ-*` → `FSD-UC-*`, `BR-*`, `NFR-*`).
  - Modo: LFSD ⚡.
- **Prompt usado (exacto)**:
  ```text
  PROMPT — Generación de LFSD desde FSD (SIGESA)
  Analiza el proyecto y genera un documento LFSD tomando como base `team/borisAngulo/FSD_v1.md` y referencia estructural `team/borisAngulo/` (BRD_v2.md, FSD_v1.md, PRD_v1.md). También revisa `templates/lfsd_template.md`, `PROMPT_MAPPING.md` y `README.md`.

  Objetivo: crear `team/borisAngulo/LFSD_v1.md` y actualizar `PROMPT_MAPPING.md` con una nueva entrada de mapeo para este prompt.
  ```
- **Entradas auxiliares**:
  - `team/borisAngulo/FSD_v1.md`, `team/borisAngulo/BRD_v2.md`, `team/borisAngulo/PRD_v1.md`, `README.md`, `templates/fsd_template.md`.
- **Archivos generados o modificados**:
  - `./team/borisAngulo/LFSD_v1.md` - Creado.
  - `./PROMPT_MAPPING.md` - Modificado (entrada PM-LFSD-001).
- **Cambios realizados**:
  - Derivar LFSD con secciones mínimas obligatorias: metadatos, alcance, casos de uso críticos (con Gherkin mínimo), reglas de negocio críticas, modelo funcional resumido (ER Mermaid), prompt-contracts, NFRs críticos, trazabilidad y riesgos funcionales.
  - Preservar IDs y reglas (`PRD-REQ-*` → `FSD-UC-*`, `BR-*`, `NFR-*`).
- **Validacion ejecutada**:
  - Lectura de `team/borisAngulo/FSD_v1.md` para extraer casos/IDs/reglas/NFRs.
  - Verificación de consistencia de trazabilidad y no introducción de funcionalidades nuevas.
- **Resultado obtenido**:
  - `team/borisAngulo/LFSD_v1.md` creado listo para revisión.
  - `PROMPT_MAPPING.md` actualizado con el registro del prompt de derivación.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - Mantener la cobertura LFSD depende de que el FSD original conserve íntegramente sus IDs y contenido crítico.
- **Lecciones / reuso del prompt**:
  - Incluir explícitamente la trazabilidad y la restricción de no inventar funcionalidades reduce deriva.
- **Proximos pasos**:
  - Revisar LFSD con el equipo y, si aplica, extender prompt-contracts a más casos en iteración.
  - Registrar `PM-011` en la siguiente tarea ejecutada con IA.


  ### PM-011 - LFSD v1 desde FSD, PRD y BRD aylenGonzales
 
- **ID**: PM-011
- **Fecha**: 2026-05-12
- **Hora**: 14:00 (UTC-4)
- **Solicitante**: Aylen Mariangel Gonzales Alvino `sigesa-docs`
- **Agente / Entorno**: Claude (claude.ai)
- **Modelo**: claude-sonnet-4-6
- **Tarea**: Generar `team/aylenGonzales/LFSD.md` derivándolo desde `team/aylenGonzales/FSD_v1_aylen.md`, `team/aylenGonzales/PRD_v1_aylen.md` y `team/aylenGonzales/BRD_v2_aylen.md`, preservando IDs y trazabilidad, creando prompt-contratos ejecutables para los UC críticos. Generar también `team/aylenGonzales/PROMPT_MAPPINGS.md` siguiendo la estructura exacta del `PROMPT_MAPPING.md` raíz. Actualizar `PROMPT_MAPPING.md` raíz con esta entrada.
- **Objetivo**: Disponer de un LFSD lightweight, compacto y orientado a implementación para `team/aylenGonzales`, con 4 UC críticos, prompt-contratos con JSON schema, trazabilidad real derivada de los documentos de Aylen (no de borisAngulo), y un PROMPT_MAPPINGS.md propio para la carpeta del equipo.
- **Contexto**:
  - Repositorio: `sigesa-docs`.
  - Fuentes consumidas:
    - `team/aylenGonzales/02_vision_negocio_v2.md`
    - `team/aylenGonzales/BRD_v2_aylen.md` (secciones 0–26, BRs RB-01–RB-11, BR-001–BR-018)
    - `team/aylenGonzales/PRD_v1_aylen.md` (PRD-REQ-001–PRD-REQ-017, Tasks T-001–T-012)
    - `team/aylenGonzales/FSD_v1_aylen.md` (UC-001–UC-005, NFR-001–NFR-013)
    - `PROMPT_MAPPING.md` raíz (entradas PM-001–PM-008 como referencia de formato)
  - Restricción: IDs de UC, BR, NFR y Tasks deben derivarse del contenido real de aylenGonzales; no copiar IDs de borisAngulo.
  - Restricción: sin placeholders ni secciones vacías en ninguno de los dos archivos generados.
- **Prompt usado (exacto)**:
  ```text
  Eres un agente de especificación funcional ágil.
 
  Tienes acceso a los siguientes archivos del equipo aylenGonzales:
  - team/aylenGonzales/02_vision_negocio_v2.md
  - team/aylenGonzales/BRD_v2_aylen.md
  - team/aylenGonzales/FSD_v1_aylen.md
  - team/aylenGonzales/PRD_v1_aylen.md
 
  También tienes acceso al archivo ya existente en la raíz:
  - PROMPT_MAPPING.md ← léelo completo y usa su estructura exacta como plantilla
 
  A partir de todos esos documentos, genera DOS archivos dentro de team/aylenGonzales/:
 
  ARCHIVO 1: team/aylenGonzales/LFSD.md
  Documento Lightweight FSD compacto y orientado a implementación.
  [estructura completa con §0 Metadatos hasta §11 Registro de cambios]
 
  ARCHIVO 2: team/aylenGonzales/PROMPT_MAPPINGS.md
  Lee primero el archivo PROMPT_MAPPING.md existente en la raíz del proyecto.
  Usa su estructura exacta como plantilla: mismos encabezados, mismo orden
  de secciones, mismo formato de tablas y bloques de código. Y añade este prompt
  con las características que requiere.
 
  Reglas generales:
  - No copiar ningún ID, UC, BR ni NFR de borisAngulo
  - Sin secciones vacías ni placeholders
  - Los IDs deben ser coherentes con el contenido real de aylenGonzales
  - LFSD se guarda en team/aylenGonzales y prompt mapping a PROMPT_MAPPING.md
  ```
- **Entradas auxiliares**:
  - Todos los documentos fuente provistos directamente en el contexto de la conversación (sin acceso al filesystem de Cursor).
  - Estructura del PROMPT_MAPPING.md raíz como plantilla de formato.
- **Archivos generados o modificados**:
  - `./team/aylenGonzales/LFSD.md` - Creado.
  - `./team/aylenGonzales/PROMPT_MAPPINGS.md` - Creado.
  - `./PROMPT_MAPPING.md` - Modificado (entrada PM-009).
- **Cambios realizados**:
  - **LFSD.md**: §0 Metadatos con rutas exactas de 4 insumos; §1 Objetivo con 11 módulos y Task IDs derivados del PRD; §2 Actores (8 filas); §3 Cuatro UC críticos (UC-A01 a UC-A04) con precondiciones, flujo ≤5 pasos, invariantes, failure modes (4 por UC) y 2 escenarios Gherkin; §4 Quince reglas de negocio con UC afectados; §5 Dieciocho filas de modelo de datos core; §6 Cuatro prompt-contratos con JSON schema completo (PC-A01 a PC-A04); §7 Nueve NFRs con umbral numérico y forma de verificación; §8 Tabla de trazabilidad UC↔BRs↔NFRs con Test IDs; §9 Doce tasks ejecutables; §10 Top-4 riesgos; §11 Registro de cambios.
  - **PROMPT_MAPPINGS.md**: estructura idéntica al PROMPT_MAPPING.md raíz; entradas PM-007 (PRD desde BRD), PM-008 (FSD desde PRD+BRD), PM-009 (LFSD + PROMPT_MAPPINGS desde todos los documentos) con todos los campos detallados del formato.
- **Validación ejecutada**:
  - Verificación de que ningún ID de UC, BR, NFR ni Task corresponde a los de borisAngulo.
  - Confirmación de que todos los IDs son coherentes con los documentos fuente de aylenGonzales (PRD-REQ-XXX, RB-XX, BR-XXX, NFR-XXX, T-XXX).
  - Revisión de que los 4 prompt-contratos incluyen JSON schema con invariants, failure_modes y acceptance_criteria_gherkin.
  - Verificación de ausencia de placeholders en ambos archivos.
- **Resultado obtenido**:
  - `team/aylenGonzales/LFSD.md`: LFSD v1.0 con 4 UC críticos (autenticación, carga de evidencias, aprobación/rechazo, dashboard), 4 prompt-contratos con JSON schema, 9 NFRs con umbrales numéricos, 12 tasks ejecutables y trazabilidad completa derivada de los documentos de aylenGonzales.
  - `team/aylenGonzales/PROMPT_MAPPINGS.md`: registro de prompts del equipo con entradas PM-007, PM-008 y PM-009 en formato homogéneo al PROMPT_MAPPING.md raíz.
  - `PROMPT_MAPPING.md` raíz actualizado con entrada PM-009.
- **Estado**: Completado
- **Riesgos / observaciones**:
  - UC-A04 (Dashboard) tiene prompt-contrato incluido a diferencia del FSD original; esto amplía la cobertura LFSD respecto al FSD_v1_aylen.md.
  - IDs MRD-N-XX no incluidos en trazabilidad por no existir MRD formal; actualizar cuando se genere.
  - Los Test IDs (TC-01 a TC-10) son referencias semánticas; deben formalizarse en el plan de pruebas del sprint.
- **Lecciones / reuso del prompt**:
  - Proveer todos los documentos fuente directamente en el contexto (sin @referencias al filesystem) es la estrategia correcta cuando Cursor no está disponible.
  - Especificar explícitamente "IDs derivados del contenido real de aylenGonzales, NO copiar IDs de borisAngulo" elimina el riesgo de mezcla de trazabilidades entre equipos.
  - Pedir JSON schema completo en cada prompt-contrato (con invariants, failure_modes y acceptance_criteria_gherkin) produce contratos directamente ejecutables como tests.
  - El formato UC-A0X (con prefijo A de Aylen) diferencia visualmente los IDs de los dos equipos en el mismo repositorio.
- **Próximos pasos**:
  - Copiar `LFSD.md` y `PROMPT_MAPPINGS.md` al repositorio local en `team/aylenGonzales/`.
  - Hacer commit y push a la rama `Aylen`; abrir PR hacia `main`.
  - Completar revisión por pares con otro grupo y registrar como comentario en el PR.
  - Generar MRD cuando esté disponible y actualizar trazabilidad §8 del LFSD.
  - Registrar `PM-012` en la siguiente tarea ejecutada con IA.


  ### PM-012- Generación de estructura base del DTI con secciones §0 y §1
 
- **ID**: PM-001
- **Fecha**: 2026-05-13
- **Hora**: 09:00 (UTC-4)
- **Solicitante**: Equipo AcredIA (rol: Arquitecto / Tech Lead)
- **Agente / Entorno**: Claude en claude.ai (chat web)
- **Modelo**: claude-sonnet-4-6
- **Tarea**: Crear el archivo `docs/dti/DTI_borrador.md` con las secciones §0 (Información General) y §1 (Arquitectura Inicial C4 Nivel 1) esbozadas.
- **Objetivo**: Obtener un borrador coherente del DTI que incluya la descripción del sistema SIGESA, los actores, los sistemas externos, el estilo arquitectónico elegido y el diagrama C4 Nivel 1 en sintaxis Mermaid, listo para commitear y revisar con el docente Edson Terceros.
- **Contexto**:
  - Documentos abiertos: `BRD_v2.md`, `PRD_v1.md`, `FSD_v1.md`, `AGENTS.md`
  - El sistema se llama AcredIA / SIGESA y pertenece a la DUEA-UMSS, Cochabamba, Bolivia
  - Stack declarado en FSD §2.4: React + Tailwind, Node.js/Express o FastAPI, PostgreSQL, Docker
  - Restricción de presupuesto: sin acceso a servicios cloud ni S3
  - El diagrama de contexto debe seguir el C4 Model (c4model.com) — Nivel 1 (System Context)
  - Audiencia mixta: técnica (equipo) y no técnica (jefatura DUEA, docente revisor)
  - Se deben identificar al menos 2 decisiones arquitectónicas candidatas a ADR
- **Prompt usado (exacto)**:
  ```text
  Eres un arquitecto de software senior. Necesito que generes el borrador del Documento Técnico Inicial (DTI) para el sistema AcredIA / SIGESA — Sistema Inteligente de Gestión y Seguimiento de Acreditaciones de la DUEA-UMSS.
 
  El documento debe seguir el C4 Model (c4model.com) y cubrir:
  
  §0 - Información General: nombre del sistema, problema que resuelve, métricas objetivo, actores (personas C4) y sistemas externos.
  
  §1 - Arquitectura Inicial: diagrama C4 Nivel 1 (System Context) en sintaxis Mermaid usando directiva C4Context, estilo arquitectónico elegido con justificación, y stack tecnológico en tabla.
  
  Actores del sistema:
  - Jefatura DUEA [JD]: configura, monitorea semáforos y genera reportes PDF (autenticado)
  - Técnico DUEA [TD]: valida evidencias y aprueba/rechaza indicadores (autenticado)
  - Coordinador de Carrera [CC]: carga evidencias y consulta estado (autenticado)
  - Público externo [P]: consulta estado y descarga certificados (sin autenticación)
  
  Sistema externo: Servidor de Correo UMSS (SMTP institucional @umss.edu.bo).
  
  Restricciones:
  - Presupuesto cero: sin cloud ni S3
  - Stack: React + Tailwind, Node.js/Express o FastAPI (pendiente spike), PostgreSQL, Docker
  - Almacenamiento de archivos en volumen local Docker /data/evidencias/
  
  Al final del §1, agrega una sección §2 con al menos 2 decisiones arquitectónicas candidatas a ADR, cada una con: pregunta de decisión, tabla de opciones consideradas (con por qué se descarta o elige cada una), decisión preliminar, consecuencias a confirmar y referencia al FSD o C4.
  
  Formato de salida: Markdown puro, listo para commitear en docs/dti/DTI_borrador.md.
  ```
- **Entradas auxiliares**:
  - Contenido de `FSD_v1.md` §2.4 (stack tecnológico), §12 (testing), NFR-001, NFR-003, NFR-005, NFR-013
  - Contenido de `AGENTS.md` (descripción de roles y restricciones del agente)
  - URL de referencia: https://c4model.com (Abstractions y Diagrams)
- **Archivos generados o modificados**:
  - `docs/dti/DTI_borrador.md` — Creado
- **Cambios realizados**:
  - Sección §0 completa: nombre, problema, métricas, actores C4, sistemas externos, alcance v1.0
  - Sección §1 completa: nota metodológica C4, diagrama Mermaid C4Context con 4 personas + 1 sistema externo + SIGESA, lectura para audiencia no técnica, estilo arquitectónico (Layered N-Tier), tabla de stack tecnológico
  - Sección §2 con 2 ADR candidatas: almacenamiento local vs S3 y log de auditoría append-only
  - Sección §3 con supuestos declarados (SA-01 a SA-06)
  - Sección §4 con próximos pasos
- **Validacion ejecutada**:
  - Lectura completa del archivo generado comparando con FSD §2.4 y AGENTS.md
  - Verificación visual del diagrama Mermaid en editor compatible (mermaid.live)
  - Revisión de coherencia de actores entre §0 y el diagrama C4Context
  - Confirmación de que el sistema externo SMTP aparece correctamente como `System_Ext`
  - Verificación de que el volumen de archivos NO aparece como sistema externo (es un container C4)
- **Resultado obtenido**:
  - Archivo `DTI_borrador.md` v0.1 completo, con diagrama Mermaid funcional, dos ADR candidatas documentadas y supuestos declarados — listo para revisión del docente Edson Terceros y posterior commit
- **Estado**: Completado
- **Riesgos / observaciones**:
  - La elección Node.js/Express vs FastAPI está pendiente de spike técnico de 2 días (§4 próximos pasos); el DTI refleja ambas opciones como pendientes
  - El volumen de disco del servidor no está dimensionado aún (SA-05); debe resolverse antes del despliegue
  - Mermaid con directiva `C4Context` requiere versión ≥ 10.x para renderizar correctamente; versiones anteriores no la soportan
- **Lecciones / reuso del prompt**:
  - El prompt funciona mejor cuando se especifican los actores con su código (ej. `[JD]`, `[TD]`) y el tipo de acceso (autenticado / sin autenticación)
  - Incluir la URL de referencia (c4model.com) en el contexto del prompt mejora la adherencia al vocabulario oficial del modelo (persona, container, software system)
  - Separar §0 y §1 en el prompt evita que el agente mezcle información de contexto con decisiones arquitectónicas
  - Para reusar: reemplazar nombre del sistema, actores y restricciones de presupuesto manteniendo la estructura de la solicitud
- **Proximos pasos**:
  - Commitear `docs/dti/DTI_borrador.md` con mensaje: `docs(dti): add DTI_borrador v0.1 - C4 L1 + ADR candidates`
  - Registrar `PM-013` en la siguiente tarea ejecutada con IA.


  ### PM-013 - Formalización de ADR-0001 — Almacenamiento de archivos de evidencia en sistema de archivos local

- **ID**: PM-013
- **Fecha**: 2026-05-13
- **Hora**: 10:30 (UTC-4)
- **Solicitante**: Aylen
- **Agente / Entorno**: Claude en claude.ai (chat web)
- **Modelo**: claude-sonnet-4-6
- **Tarea**: Convertir la ADR candidata 1 del DTI borrador en un ADR formal y autónomo siguiendo el template `templates/ADR_TEMPLATE.md`, guardado en `docs/adr/ADR-0001.md`.
- **Objetivo**: Documentar de forma completa y trazable la decisión de almacenar archivos binarios de evidencia en el volumen Docker local `/data/evidencias/`, con contexto, alternativas comparadas, consecuencias, plan de reversión y criterios de validación medibles.
- **Contexto**:
  - Archivo base: `docs/dti/DTI_borrador.md` §2 — ADR candidata 1
  - Template a seguir: `templates/ADR_TEMPLATE.md` (9 secciones: Metadatos, Contexto, Alternativas, Decisión, Consecuencias, Impacto, Plan de reversión, Validación, Referencias, Historial)
  - Restricción de presupuesto: sin cloud ni MinIO on-premise
  - Referencia C4: el volumen local es un container válido según c4model.com/abstractions/container
  - NFR relevantes: NFR-002 (versionado inmutable), NFR-005 (TLS 1.3)
  - Supuesto activo: SA-05 — disco del servidor suficiente (pendiente de estimación)
  - Estado inicial del ADR: **Propuesta** (pendiente revisión Tech Lead)
- **Prompt usado (exacto)**:
  ```text
  Eres un arquitecto de software senior documentando decisiones para el proyecto AcredIA / SIGESA (DUEA-UMSS).

  Formaliza la siguiente ADR candidata como un ADR autónomo y completo, siguiendo exactamente la estructura del template ADR_TEMPLATE.md que tiene estas secciones: Metadatos, 1.Contexto, 2.Alternativas consideradas, 3.Decisión, 4.Consecuencias (4.1 Positivas / 4.2 Negativas / 4.3 Neutras), 5.Impacto en el sistema, 6.Plan de reversión, 7.Validación, 8.Referencias, 9.Historial.

  ADR candidata — Almacenamiento de archivos de evidencia:
  - Pregunta: ¿Dónde almacenar los archivos binarios de evidencia (PDF, DOCX, XLSX)?
  - Opción descartada A: PostgreSQL BYTEA — infla la DB, degrada consultas, dificulta respaldos incrementales
  - Opción descartada B: S3-compatible (AWS/MinIO) — sin presupuesto
  - Opción elegida: sistema de archivos local /data/evidencias/ en volumen Docker
  - Estructura de rutas: {proceso_id}/{fase_id}/{indicador_id}/{version}_{nombre_original}
  - PostgreSQL persiste solo metadatos: ruta_relativa, hash_sha256, version, autor_id, fecha_carga, estado
  - La restricción de no-DELETE sobre documentos APROBADO se implementa en capa de servicio
  - Migración a S3 en v2.0 requiere solo cambiar ruta_relativa por url_storage en módulo Documentos

  Restricciones del proyecto:
  - Presupuesto cero: sin cloud ni MinIO
  - NFR-002: versionado inmutable; NFR-005: TLS 1.3
  - SA-05: disco del servidor pendiente de dimensionamiento

  Estado: Propuesta. Número: 0001. Fecha: 13/05/2026. Autor: Equipo AcredIA.
  Ruta de salida: docs/adr/0001-almacenamiento-archivos-local.md
  Formato: Markdown puro, sin texto introductorio ni explicaciones fuera del documento.
  ```
- **Entradas auxiliares**:
  - `docs/dti/DTI_borrador.md` §2 — ADR candidata 1 (fragmento completo)
  - `templates/ADR_TEMPLATE.md` — estructura de 9 secciones
  - FSD v1 §2.4 (stack), NFR-002, NFR-005
  - SA-05 del DTI borrador §3
- **Archivos generados o modificados**:
  - `docs/adr/ADR-0001.md` — Creado
- **Cambios realizados**:
  - Metadatos completos (número, título, fecha, autor, estado, alcance, stakeholders)
  - §1 Contexto: problema, 3 restricciones determinantes, 2 fuerzas en tensión, incógnita activa (SA-05)
  - §2 Alternativas: tabla de 3 opciones con pros, contras y costo aproximado
  - §3 Decisión: justificación de descarte de A y B, estructura de rutas exacta, esquema de metadatos en PostgreSQL, estrategia de inmutabilidad en capa de servicio
  - §4 Consecuencias: 4 positivas, 4 negativas/costos, 2 neutras
  - §5 Impacto: código (módulo Documentos + tests), operaciones (rsync en respaldo diario, alerta disco 70%), seguridad (archivos solo vía API + RBAC), equipo (sin habilidades nuevas), costo ($0 v1.0 / 1–2 días v2.0)
  - §6 Plan de reversión: 3 señales de alerta, costo estimado (2–3 días), Plan B (MinIO/S3)
  - §7 Validación: tabla de 4 criterios con métricas, plazos y responsables
  - §8 Referencias: C4 Model, DTI borrador, FSD §2.4, SA-05, NFR-002/005
  - §9 Historial: versión 1 — propuesta inicial
- **Validacion ejecutada**:
  - Lectura cruzada entre `ADR-0001.md` y `DTI_borrador.md` §2 para verificar consistencia de la estructura de rutas y el esquema de metadatos
  - Verificación de que la ruta `/data/evidencias/` coincide con la declarada en ADR candidata 1 del DTI
  - Confirmación de que el campo `ruta_relativa` (y su equivalente v2.0 `url_storage`) está nombrado consistentemente
  - Revisión de que el estado inicial es "Propuesta" (no "Aceptada") — pendiente revisión Tech Lead
- **Resultado obtenido**:
  - `docs/adr/ADR-0001md` completo, autónomo y trazable al DTI borrador — listo para revisión del Tech Lead y posterior cambio de estado a "Aceptada"
- **Estado**: Completado
- **Riesgos / observaciones**:
  - SA-05 (dimensionamiento de disco) sigue abierto; el ADR no puede cambiar de estado a "Aceptada" hasta que el Tech Lead provea la estimación de volumen
  - La restricción no-DELETE en capa de servicio (no en política de BD) es el principal riesgo técnico; debe cubrirse con tests de integración específicos antes del primer despliegue
- **Lecciones / reuso del prompt**:
  - Listar las 9 secciones del template explícitamente en el prompt elimina la necesidad de correcciones de estructura en el output
  - Proveer la estructura de rutas y el esquema de metadatos en el prompt produce salida directamente usable por el desarrollador de backend sin ambigüedad
  - La instrucción final "sin texto introductorio ni explicaciones fuera del documento" evita que el agente envuelva el ADR en prosa de presentación
  - Para reusar: reemplazar la sección "ADR candidata" y los NFR de referencia; mantener el resto de la instrucción de estructura
- **Proximos pasos**:
  - Registrar `PM-014` para la formalización de ADR-0002
  - Compartir `ADR-0001 con el Tech Lead para aprobación y estimación de SA-05
  - Una vez aprobado: actualizar estado en el archivo a "Aceptada" y registrar versión 2 en §9 Historial
  - Registrar `PM-014` en la siguiente tarea ejecutada con IA.
---

### PM-014 - Formalización de ADR-0002 — Log de auditoría como tabla append-only en PostgreSQL

- **ID**: PM-014
- **Fecha**: 2026-05-13
- **Hora**: 11:15 (UTC-4)
- **Solicitante**: Aylen
- **Agente / Entorno**: Claude en claude.ai (chat web)
- **Modelo**: claude-sonnet-4-6
- **Tarea**: Convertir la ADR candidata 2 del DTI borrador en un ADR formal y autónomo siguiendo el template `templates/ADR_TEMPLATE.md`, guardado en `docs/adr/ADR-0002.md`.
- **Objetivo**: Documentar de forma completa y trazable la decisión de implementar el log de auditoría como tabla PostgreSQL con `REVOKE DELETE, UPDATE` para el rol de aplicación, incluyendo el DDL esquemático, el plan de particionamiento futuro y los criterios de validación vinculados a NFR-013 y RB-07.
- **Contexto**:
  - Archivo base: `docs/dti/DTI_borrador.md` §2 — ADR candidata 2
  - Template a seguir: `templates/ADR_TEMPLATE.md` (mismas 9 secciones que PM-013)
  - NFR-013: 100 % de acciones del sistema registradas
  - RB-07 (BRD v2): trazabilidad completa ante inspecciones institucionales CEUB/ARCU-SUR
  - Sin presupuesto para ELK, CloudWatch, Datadog ni infraestructura de observabilidad externa
  - PostgreSQL 14+ soporta particionamiento por rango de fechas (nativo)
  - Enum de acciones: LOGIN, LOGOUT, CARGA, APROBACION, RECHAZO, AVANCE_FASE, REPORTE
  - Estado inicial del ADR: **Propuesta** (pendiente revisión Tech Lead y docente)
- **Prompt usado (exacto)**:
  ```text
  Eres un arquitecto de software senior documentando decisiones para el proyecto AcredIA / SIGESA (DUEA-UMSS).

  Formaliza la siguiente ADR candidata como un ADR autónomo y completo, siguiendo exactamente la estructura del template ADR_TEMPLATE.md con estas secciones: Metadatos, 1.Contexto, 2.Alternativas consideradas, 3.Decisión, 4.Consecuencias (4.1 Positivas / 4.2 Negativas / 4.3 Neutras), 5.Impacto en el sistema, 6.Plan de reversión, 7.Validación, 8.Referencias, 9.Historial.

  ADR candidata — Log de auditoría:
  - Pregunta: ¿Cómo garantizar la inmutabilidad del historial de acciones del sistema?
  - Opción descartada A: Sistema de logging externo (ELK, CloudWatch, Datadog) — sin presupuesto, complejidad operacional injustificada en v1.0
  - Opción descartada B: Archivos de log en disco (.log) — no correlacionables con dominio, inmutabilidad no garantizable, sin valor probatorio real
  - Opción elegida: tabla LOG_AUDITORIA en PostgreSQL con REVOKE DELETE, UPDATE para el rol de aplicación
  - Solo operación permitida: INSERT
  - Enum accion: LOGIN, LOGOUT, CARGA, APROBACION, RECHAZO, AVANCE_FASE, REPORTE
  - Índices por: usuario_id / entidad_tipo + entidad_id / fecha_hora DESC
  - Campo detalle JSONB para contexto arbitrario (IP, motivo de rechazo, user-agent)
  - Plan futuro: particionar por fecha_hora (rango PostgreSQL 14+) al superar 12 meses de operación
  - NFR-013: 100% acciones registradas; RB-07: trazabilidad ante inspecciones CEUB/ARCU-SUR

  Incluir en §3 Decisión el DDL esquemático completo: CREATE TABLE, CREATE TYPE accion_enum, REVOKE, e índices.

  Restricciones del proyecto:
  - Presupuesto cero: sin ELK ni sistema externo de logging
  - PostgreSQL ya es el motor principal (FSD §2.4)
  - Equipo pequeño (≤ 4 devs): sin capacidad operacional para infraestructura adicional

  Estado: Propuesta. Número: 0002. Fecha: 13/05/2026. Autor: Equipo AcredIA.
  Ruta de salida: docs/adr/0002-log-auditoria-append-only-postgresql.md
  Formato: Markdown puro, sin texto introductorio ni explicaciones fuera del documento.
  ```
- **Entradas auxiliares**:
  - `docs/dti/DTI_borrador.md` §2 — ADR candidata 2 (fragmento completo)
  - `templates/ADR_TEMPLATE.md` — estructura de 9 secciones
  - BRD v2 — RB-07 (trazabilidad ante inspecciones)
  - FSD v1 — NFR-013 (100 % de acciones registradas)
  - PostgreSQL 14 docs — Table Partitioning (referencia para plan futuro)
- **Archivos generados o modificados**:
  - `docs/adr/ADR-0002.md` — Creado
- **Cambios realizados**:
  - Metadatos completos (número, título, fecha, autor, estado, alcance, stakeholders — incluye docente Edson Terceros)
  - §1 Contexto: problema dual (NFR-013 + RB-07), 3 restricciones determinantes, fuerzas en tensión (inmutabilidad de infraestructura vs. permisos), incógnita activa (volumen de eventos diarios en producción)
  - §2 Alternativas: tabla de 3 opciones con pros, contras y costo (A: $50–300/mes o hardware adicional; B y C: $0)
  - §3 Decisión: justificación de descarte de A y B, DDL esquemático completo (CREATE TABLE, CREATE TYPE accion_enum AS ENUM, REVOKE DELETE UPDATE, 3 CREATE INDEX)
  - §4 Consecuencias: 4 positivas (incluyendo correlación vía JOIN para inspecciones), 4 negativas (superusuario bypass, enum cerrado, crecimiento sin particionamiento, sin dashboards nativos), 2 neutras
  - §5 Impacto: código (módulo Auditoría + interceptor en todos los módulos + contrato enum compartido), operaciones (pg_dump automático, particionamiento mes 12, archivado .sql.gz), seguridad (REVOKE + rol sigesa_readonly para inspecciones + política de superusuario en runbook), equipo (convención en CONTRIBUTING.md), costo ($0 v1.0 / 1 día v2.0)
  - §6 Plan de reversión: 3 señales de alerta (degradación de rendimiento, 5M filas antes de 12 meses, inspección requiere formatos que SQL no provee), costo (2–3 días), Plan B (Loki + Grafana)
  - §7 Validación: tabla de 4 criterios con métricas, plazos y responsables (cobertura 100%, tests de inmutabilidad que deben fallar, rendimiento ≤ 2s en 100K filas, 0 acciones sin registro en piloto)
  - §8 Referencias: NFR-013, RB-07, PostgreSQL 14 partitioning, DTI borrador, ADR-0001 (relacionada)
  - §9 Historial: versión 1 — propuesta inicial
- **Validacion ejecutada**:
  - Lectura cruzada entre `ADR-0002` y `DTI_borrador.md` §2 para verificar consistencia del enum y los índices
  - Verificación de que el DDL incluye `REVOKE DELETE, UPDATE` (no solo comentario en prosa)
  - Confirmación de que el enum `accion_enum` cubre todos los eventos auditables declarados en el FSD
  - Revisión de que el campo `detalle JSONB` está presente para capturar contexto arbitrario sin alterar schema
  - Verificación de que ADR-0001 está citada en §8 Referencias como ADR relacionada
- **Resultado obtenido**:
  - `docs/adr/ADR-0002.md` completo, autónomo y trazable a NFR-013 y RB-07 — listo para revisión del Tech Lead y docente Edson Terceros
- **Estado**: Completado
- **Riesgos / observaciones**:
  - El `REVOKE DELETE, UPDATE` protege contra bugs de aplicación pero no contra un DBA con privilegios de superusuario; la política de acceso a la BD debe documentarse en el runbook de operaciones antes del despliegue
  - El enum `accion_enum` es cerrado; cualquier acción nueva en v2.0 requiere `ALTER TYPE` — documentar como deuda técnica controlada en el backlog
  - El volumen de eventos diarios en producción real es desconocido; si supera las estimaciones, el particionamiento deberá adelantarse a antes del mes 12
- **Lecciones / reuso del prompt**:
  - La instrucción explícita "Incluir en §3 Decisión el DDL esquemático completo" es la diferencia entre un ADR con valor técnico real y uno que solo describe la decisión en prosa
  - Referenciar los NFR por número (NFR-013) y los requisitos de negocio por código (RB-07) ancla el razonamiento del agente y evita justificaciones genéricas
  - Nombrar el Plan B en el prompt (Loki + Grafana) produce un plan de reversión concreto, no vago
  - Para reusar: reemplazar la descripción de la ADR candidata, los NFR/RB de referencia y el DDL esquemático; mantener la instrucción de estructura y el formato de salida
- **Proximos pasos**:
  - Compartir `ADR-0002.md` con el Tech Lead para aprobación
  - Una vez aprobados ambos ADRs: actualizar estado en los archivos a "Aceptada" y registrar versión 2 en §9 Historial de cada uno
  - Registrar `PM-015` para el siguiente paso: generación del C4 Nivel 2 (Container Diagram) incorporando el volumen Docker y `LOG_AUDITORIA` como containers explícitos
  - Resolver spike técnico Node.js/Express vs FastAPI (2 días) para cerrar la elección de backend pendiente desde PM-012
  - Registrar `PM-015` en la siguiente tarea ejecutada con IA.


  # PROMPT_MAPPING — Entrada PM-015

---

## PM-015 — Generación del MRD v1.0: Market Requirements Document de SIGESA

| Campo | Valor |
|-------|-------|
| **ID** | PM-015 |
| **Fecha** | 2026-05-14 |
| **Hora** | 15:00|
| **Solicitante** | Boris Angulo |
| **Agente / Entorno** | Claude en claude.ai (chat web) |
| **Modelo** | claude-sonnet-4-6 |
| **Estado** | Completado |

---

### Tarea

Generar el archivo `team/borisAngulo/MRD.md` completo, siguiendo `templates/MRD_TEMPLATE.md`, a partir de los documentos de visión de negocio, BRD y PRD existentes del proyecto SIGESA.

---

### Entradas

| Archivo / referencia | Rol en la tarea |
|----------------------|-----------------|
| `team/borisAngulo/01_vision_negocio_v2.txt` | Fuente primaria: segmentos, usuarios, posicionamiento y diferenciadores |
| `team/borisAngulo/BRD_v2.md` | Fuente de stakeholders, reglas de negocio, objetivos SMART y trazabilidad BRD→MRD |
| `team/borisAngulo/PRD_v1.md` | Fuente de user stories, personas y trazabilidad MRD→PRD |
| `templates/MRD_TEMPLATE.md` | Estructura y secciones obligatorias a seguir |

---

### Prompt utilizado

```text
Leé y analizá los siguientes archivos:

- @team/borisAngulo/01_vision_negocio_v2.txt
- @team/borisAngulo/BRD_v2.md
- @team/borisAngulo/PRD_v1.md

Luego leé el formato requerido en:

- @templates/MRD_TEMPLATE

Con base en la información extraída, creá y guardá el archivo en:

`team/borisAngulo/MRD.md`

El documento será evaluado con estos criterios:

EXCELENTE (apunta a esto):
- 7 elementos completos: segmentos, personas, JTBD, voz del cliente,
  competencia, posicionamiento e hipótesis
- Mínimo 2 segmentos de mercado bien diferenciados (no genéricos)
- Personas con nombre, rol, motivaciones y frustraciones reales del contexto
- JTBD formulados como "Cuando... quiero... para..."
- Hipótesis falsables por segmento

ACEPTABLE (mínimo aceptado):
- 5–6 elementos con perfil básico

BAJO (evitar):
- Menos de 5 elementos
- Segmentos genéricos como "usuarios jóvenes" o "empresas medianas"

Instrucciones:
- No inventes información que no esté en los documentos fuente
- Si falta datos para algún elemento, marcalo como
  `[PENDIENTE - requiere investigación primaria]`
- El objetivo es calificación EXCELENTE
```

---

### Archivos generados

| Archivo | Operación |
|---------|-----------|
| `team/borisAngulo/MRD.md` | Creado |

---

### Contenido generado — resumen de secciones

| Sección | Contenido entregado |
|---------|---------------------|
| §0 Metadatos | Completo con referencias a BRD v2, PRD v1 y visión v2 |
| §1 Resumen ejecutivo | Problema, propuesta, diferenciación y tamaño de oportunidad (~200 palabras) |
| §2 Visión del producto | Frase inspiradora ≤ 25 palabras, orientada al usuario y al plazo |
| §3 Análisis de mercado | TAM/SAM/SOM con fuentes; 3 tendencias del sector; factores regulatorios (Ley 164, CEUB, ARCU-SUR); cadencia de Continuous Discovery |
| §4 Segmentación y Personas | 2 segmentos diferenciados + 2 personas completas (Daniela Flores — Administradora DUEA; Carlos Mamani — Coordinador de Carrera) |
| §5 JTBD | 7 jobs en formato "Cuando… / Quiero… / Para poder…" |
| §6 Análisis competitivo | Tabla de 4 alternativas (proceso actual, Drive/genéricos, plataformas globales, SIGESA); positioning statement; 3 fuentes de ventaja competitiva sostenible |
| §7 Propuesta de valor | Value Proposition Canvas resumido por segmento (Seg-1 vs. Seg-2) |
| §8 Pricing y modelo de negocio | Modelo institucional piloto; benchmark vs. plataformas internacionales; modelo futuro por explorar |
| §9 Go-to-market | Canales de adquisición; estrategia pre/launch/post-launch; funnel AARRR contextualizado |
| §10 Métricas de éxito | North Star + 4 KPIs secundarios con meta y horizonte |
| §11 Requerimientos de mercado | 7 requerimientos MRD-N-* priorizados con segmento y justificación |
| §12 Hipótesis a validar | 5 hipótesis falsables con método de validación y criterio de éxito medible |
| §13 Riesgos de mercado | 5 riesgos con probabilidad, impacto y mitigación |
| §14 Trazabilidad | Tabla BRD → MRD → PRD completa |
| §15–16 Anexos y registro de cambios | Completos |
| Checklist de evaluación | 16 ítems marcados, todos cumplidos |

---

### Trazabilidad

| Artefacto | Relación |
|-----------|----------|
| BRD v2 — BR-001 a BR-013 | Requerimientos de negocio que originan MRD-N-01 a MRD-N-07 |
| BRD v2 — RB-01 a RB-12 | Reglas de negocio que condicionan segmentación y posicionamiento |
| BRD v2 — §3.3 hipótesis validada en levantamiento | Fuente de H-01 y H-02 del MRD |
| PRD v1 — PRD-REQ-001 a PRD-REQ-013 | Requerimientos de producto trazados desde MRD-N-* |
| PRD v1 — §4.1 Personas | Personas del PRD extendidas en §4.2 del MRD con mirada de mercado |
| `01_vision_negocio_v2.txt` §2 | Fuente directa de Persona 1 (Daniela) y Persona 2 (Carlos) |
| `01_vision_negocio_v2.txt` §6 | Fuente del análisis competitivo y diferenciadores de SIGESA |

---

### Criterio de evaluación alcanzado

| Nivel | Criterio | ¿Cumplido? |
|-------|----------|------------|
| **EXCELENTE** | 7 elementos completos | ✅ |
| **EXCELENTE** | ≥ 2 segmentos bien diferenciados (no genéricos) | ✅ Seg-1: Gestión/DUEA vs. Seg-2: Equipos operativos |
| **EXCELENTE** | Personas con nombre, rol, motivaciones y frustraciones | ✅ Daniela Flores + Carlos Mamani |
| **EXCELENTE** | JTBD en formato "Cuando… / Quiero… / Para poder…" | ✅ 7 JTBD |
| **EXCELENTE** | Hipótesis falsables por segmento | ✅ 5 hipótesis con método y criterio de éxito |
| — | 0 datos inventados (faltantes marcados como PENDIENTE) | ✅ |

---

### Lecciones y reuso

- Incluir los **criterios de evaluación explícitos** (Excelente / Aceptable / Bajo) en el prompt dirige al agente hacia el nivel máximo sin ambigüedad.
- La instrucción **"no inventes información; marcá lo faltante como PENDIENTE"** evita alucinaciones y hace visible qué gaps requieren investigación primaria real.
- Pasar los **3 documentos fuente** en el mismo prompt (visión + BRD + PRD) permite al agente cruzar información y producir trazabilidad sin iteraciones adicionales.
- **Para reusar**: reemplazar los paths de los archivos fuente y el nombre del archivo de salida; mantener los criterios de evaluación y la instrucción de PENDIENTE.

---

### Riesgos / observaciones

- TAM/SAM/SOM son estimaciones de trabajo; deben confirmarse con datos oficiales del CEUB (número de universidades afiliadas y carreras en proceso de acreditación) antes de presentar el MRD al sponsor.
- Las personas (Daniela y Carlos) están construidas desde los documentos internos del proyecto; deben validarse con entrevistas reales antes del MRD v2.
- La línea base de métricas (KPI-M-01 a KPI-M-04) debe medirse **antes** del lanzamiento del piloto para que los resultados post-piloto sean demostrables.

---

### Próximos pasos

| ID | Tarea | Responsable |
|----|-------|-------------|
| — | Validar TAM/SAM/SOM con datos oficiales del CEUB | Boris Angulo |
| — | Realizar ≥ 2 entrevistas con usuarios reales (Coordinador de Carrera + Técnico DUEA) para validar personas y JTBD antes del MRD v2 | Boris Angulo / Equipo AcredIA |
| — | Medir línea base pre-piloto para KPI-M-01 a KPI-M-04 | DUEA + Equipo AcredIA |
| — | Actualizar estado del MRD de "Borrador" a "Aprobado" tras revisión del docente y sponsor DUEA | Boris Angulo |
| PM-016 | Registrar siguiente tarea ejecutada con IA | Por definir |



# PROMPT_MAPPING — Entrada PM-016

---

## PM-016 — Generación de casos-de-uso.md: 12 casos críticos con flujo principal, alternos y Gherkin

| Campo | Valor |
|-------|-------|
| **ID** | PM-016 |
| **Fecha** | 2026-05-14 |
| **Hora** | (hora local de ejecución) |
| **Solicitante** | Boris Angulo |
| **Agente / Entorno** | Claude en claude.ai (chat web) |
| **Modelo** | claude-sonnet-4-6 |
| **Estado** | Completado |

---

### Tarea

Generar el archivo `docs/fsd/casos-de-uso.md` con ≥ 10 casos de uso críticos, cada uno con flujo principal, flujos alternos y criterios de aceptación Gherkin verificables, a partir de los documentos existentes del proyecto SIGESA.

---

### Entradas

| Archivo / referencia | Rol en la tarea |
|----------------------|-----------------|
| `team/borisAngulo/FSD_v1.md` | Fuente primaria: casos de uso UC-001 a UC-003 base, actores, reglas de negocio BR-001 a BR-012, NFRs y tareas T-001 a T-007 |
| `team/borisAngulo/PRD_v1.md` | Fuente de user stories PRD-US-001 a PRD-US-024 con Gherkin base para expandir |
| `team/borisAngulo/BRD_v2.md` | Fuente de reglas de negocio y restricciones que condicionan flujos alternos |
| `team/borisAngulo/01_vision_negocio_v2.txt` | Contexto de actores, roles y flujos del proceso de acreditación |

---

### Prompt utilizado

```text
Leé y analizá los siguientes archivos:

- @team/borisAngulo/FSD_v1.md
- @team/borisAngulo/PRD_v1.md
- @team/borisAngulo/BRD_v2.md
- @team/borisAngulo/01_vision_negocio_v2.txt

Con base en la información extraída, generá el archivo:

`docs/fsd/casos-de-uso.md`

El documento será evaluado con estos criterios:

EXCELENTE (apunta a esto):
- 10 o más casos de uso críticos
- Cada caso con flujo principal completo (pasos numerados)
- Flujos alternos documentados (condición + comportamiento del sistema)
- Criterios de aceptación Gherkin verificables (formato Dado/Cuando/Entonces)
- Trazabilidad a PRD-US, BRD-BR y NFR por cada caso

ACEPTABLE (mínimo aceptado):
- 5 o más casos completos

BAJO (evitar):
- Menos de 5 verificables
- Gherkin vago sin condiciones concretas
- Flujos alternos ausentes o genéricos

Instrucciones:
- Usar los casos de uso del FSD como base y expandirlos
- Identificar casos críticos adicionales desde las user stories del PRD
- Los flujos alternos deben derivarse de las reglas de negocio del BRD (BR-001 a BR-012)
- No inventar información que no esté en los documentos fuente
- Incluir tabla de trazabilidad consolidada al final (FSD-UC → PRD-US → BRD-BR → NFR → prueba de aceptación)
- El objetivo es calificación EXCELENTE
```

---

### Archivos generados

| Archivo | Operación |
|---------|-----------|
| `docs/fsd/casos-de-uso.md` | Creado |

---

### Contenido generado — resumen

| FSD-UC | Nombre | Actor principal | Escenarios Gherkin |
|--------|--------|-----------------|--------------------|
| FSD-UC-001 | Autenticación y autorización por roles | Usuario humano | 4 |
| FSD-UC-002 | Creación y gestión de procesos de acreditación | Administrador DUEA | 4 |
| FSD-UC-003 | Gestión de fases y cierre con pendientes | Administrador DUEA | 3 |
| FSD-UC-004 | Carga y versionado de evidencias por criterio | Coordinador / Jefe | 4 |
| FSD-UC-005 | Protección ante borrado o reemplazo destructivo | Coordinador / Técnico | 3 |
| FSD-UC-006 | Flujo de observaciones DUEA ↔ carrera | DUEA / Coordinador | 3 |
| FSD-UC-007 | Panel de estado con semáforo por carrera y facultad | Administrador DUEA | 3 |
| FSD-UC-008 | Alertas automáticas por plazos e hitos | Scheduler | 3 |
| FSD-UC-009 | Generación de reporte ejecutivo PDF en ≤ 2 clics | Administrador DUEA | 3 |
| FSD-UC-010 | Importación masiva de actividades por planilla | Coordinador | 3 |
| FSD-UC-011 | Gestión de usuarios y asignación de roles | Administrador DUEA | 3 |
| FSD-UC-012 | Acceso de evaluador externo con alcance mínimo | Evaluador externo | 3 |
| **Total** | | | **39 escenarios Gherkin** |

---

### Estructura por caso de uso

Cada uno de los 12 casos incluye:

- Tabla de metadatos (trazabilidad, actor, precondiciones, disparador).
- **Flujo principal** numerado paso a paso.
- **Flujos alternos** en tabla con ID, condición y comportamiento exacto del sistema.
- **Postcondiciones** explícitas.
- **Gherkin** en formato `Dado / Cuando / Entonces` con condiciones concretas y verificables.

---

### Trazabilidad

| FSD-UC | PRD-US | BRD-BR | NFR |
|--------|--------|--------|-----|
| FSD-UC-001 | PRD-US-001, PRD-US-003 | BR-004, BR-005, BR-011 | NFR-002, NFR-003 |
| FSD-UC-002 | PRD-US-008, PRD-US-009 | BR-001, BR-002, BR-003, BR-012 | NFR-003 |
| FSD-UC-003 | PRD-US-004, PRD-US-006 | BR-008, BR-009, BR-010 | NFR-003 |
| FSD-UC-004 | PRD-US-010, PRD-US-011 | BR-006, BR-007, BR-012 | NFR-002, NFR-003 |
| FSD-UC-005 | PRD-US-012 | BR-007, BR-011 | NFR-003 |
| FSD-UC-006 | PRD-US-013, PRD-US-014 | BR-008, BR-010, BR-011 | NFR-003 |
| FSD-UC-007 | PRD-US-015 | BR-008 | NFR-001 |
| FSD-UC-008 | PRD-US-016 | BR-009, BR-011 | NFR-005 |
| FSD-UC-009 | PRD-US-017 | BR-008 | NFR-001 |
| FSD-UC-010 | PRD-US-007 | BR-002, BR-012 | NFR-004 |
| FSD-UC-011 | PRD-US-002 | BR-004, BR-005 | NFR-003 |
| FSD-UC-012 | PRD-US-020 | BR-004, BR-005, BR-011 | NFR-002, NFR-003 |

---

### Criterio de evaluación alcanzado

| Nivel | Criterio | ¿Cumplido? |
|-------|----------|------------|
| **EXCELENTE** | ≥ 10 casos de uso críticos | ✅ 12 casos |
| **EXCELENTE** | Flujo principal completo con pasos numerados | ✅ Los 12 |
| **EXCELENTE** | Flujos alternos con condición y comportamiento | ✅ Los 12 (2-4 alternos por caso) |
| **EXCELENTE** | Gherkin verificable en formato Dado/Cuando/Entonces | ✅ 39 escenarios totales |
| **EXCELENTE** | Trazabilidad PRD-US + BRD-BR + NFR por caso | ✅ Tabla consolidada al final |
| — | 0 información inventada | ✅ Todo derivado de FSD, PRD y BRD |

---

### Lecciones y reuso

- Pedir explícitamente **"flujos alternos derivados de las reglas de negocio del BRD (BR-001 a BR-012)"** ancla los alternos a reglas reales y evita alternos genéricos como "si hay error, mostrar mensaje".
- Incluir el **criterio de evaluación con niveles** (Excelente/Aceptable/Bajo) dirige al agente al nivel máximo sin ambigüedad.
- La instrucción **"tabla de trazabilidad consolidada al final"** produce un artefacto directamente usable por el docente para verificar coherencia entre documentos sin abrir cada uno.
- Los casos del FSD (UC-001 a UC-003) sirven como **base de expansión**: el agente los completa y añade los casos faltantes desde las user stories del PRD.
- **Para reusar**: reemplazar los paths de los documentos fuente; mantener la instrucción de estructura por caso (metadatos + flujo principal + alternos + postcondiciones + Gherkin) y el criterio de evaluación.

---

### Riesgos / observaciones

- Los 39 escenarios Gherkin cubren los caminos críticos y principales alternos, pero no son exhaustivos para QA; el equipo de pruebas debe expandirlos con casos de borde antes del piloto.
- Los flujos alternos de FSD-UC-008 (alertas) dependen de la configuración real del canal de notificaciones; deben validarse con TI antes del desarrollo.
- Las precondiciones de FSD-UC-012 (evaluador externo) asumen que el administrador DUEA gestiona las credenciales temporales manualmente; si este flujo cambia, los alternos A2 y A3 deben actualizarse.

---

### Próximos pasos

| ID | Tarea | Responsable |
|----|-------|-------------|
| — | Guardar `casos-de-uso.md` en `docs/fsd/` del repositorio | Boris Angulo |
| — | Revisión por pares: verificar que los escenarios Gherkin son ejecutables como tests (sin ambigüedades) | Tech Lead / QA |
| — | Expandir escenarios de borde para QA antes del piloto (especialmente FSD-UC-004 y FSD-UC-008) | QA |
| PM-017 | Registrar siguiente tarea ejecutada con IA | Por definir |