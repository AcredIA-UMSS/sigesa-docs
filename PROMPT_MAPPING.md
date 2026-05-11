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
