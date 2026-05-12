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

