---
name: sigesa-generacion-historias-usuario
description: >
  Genera Historias de Usuario (US) estandarizadas bajo el formato INVEST 
  basadas en los flujos funcionales del FSD de SIGESA, asegurando que 
  cada US asigne el rol correcto (Coordinador de Carrera, Técnico DUEA, etc.) 
  y contenga Criterios de Aceptación (AC) verificables en formato Gherkin.
allowed-tools:
  - read
  - edit
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

# Skill: Generador de Historias de Usuario INVEST para SIGESA

> Skill canónica del módulo para la construcción del PRD. Copia este archivo a 
> `.claude/skills/sigesa-generacion-historias-usuario/` en la raíz de tu repositorio.

## 1. Cuándo activarlo (triggers)

- DURANTE: La creación del Producto y redacción del `PRD.md`.
- ARRANCA cuando: Se ha definido un nuevo requerimiento de negocio o flujo funcional en el `BRD.md` o el usuario solicita "Desglosar la Fase X en Historias de Usuario".
- NO ACTIVAR cuando: Las reglas de negocio subyacentes aún no están claras o no se ha definido el actor que ejecutará la acción.

## 2. Entradas obligatorias

- Una descripción funcional en lenguaje natural o referencia a un `BRD-OBJ-NNN`.
- Especificación clara del Actor (`Coordinador de Carrera`, `Técnico DUEA`, `Jefatura DUEA` o `Público`).
- El valor de negocio esperado (el "Para qué").

## 3. Fuentes de verdad (orden de precedencia)

1. `glosario.md` (Para forzar el uso de "Evidencia", "Fase", "Indicador", etc.).
2. `reglas_negocio.md` y `BRD.md` (Restricciones duras como *Append-Only* o *Bloqueos de máquina de estados*).
3. `AGENTS.md` (Para alinear la responsabilidad de validación al perfil agéntico correspondiente).

## 4. Procedimiento

1. **Validar Actor:** Asegurar que el actor solicitado coincide con los perfiles permitidos en SIGESA.
2. **Redactar Cláusula INVEST:** Escribir la historia siguiendo la estructura estricta: `Como [Actor], quiero [Acción sobre entidad del glosario], para [Valor o meta de negocio]`.
3. **Generar Criterios de Aceptación (Gherkin):**
   - Escribir un escenario principal ("Happy Path").
   - Escribir al menos un escenario alterno ("Sad Path") contemplando rechazos u observaciones normativas (ej. intentar avanzar de fase con indicadores observados).
4. **Validar Restricciones Duras:** Si la US involucra eliminar una Evidencia, lanzar un error y corregir hacia "Generar nueva versión vinculada (Subsanación)".
5. **Asignar ID:** Asignar un identificador único (ej. `US-SIG-001`).

## 5. Salida esperada

Un bloque de texto en formato Markdown para insertar en el `PRD.md` o `user_stories.md`:

```markdown
### US-SIG-005: Subsanar Evidencia Observada

**Como** Coordinador de Carrera [CC]
**Quiero** subir una nueva versión de un documento probatorio anclado a una observación específica
**Para** corregir el error normativo y habilitar la validación del Indicador por parte del Técnico.

**Criterios de Aceptación:**

```gherkin
Escenario: El Coordinador subsana exitosamente una evidencia
  Dado que el "Indicador 1.2" tiene el estado "Observado"
  Y existe una observación "ID-405" pendiente de resolución
  Cuando el [CC] sube el archivo "Plan_Corregido.pdf" al "Indicador 1.2"
  Y escribe una nota de respuesta
  Entonces el sistema marca la observación "ID-405" como "Revisión Pendiente"
  Y el "Indicador 1.2" cambia a estado "Subsanado"
  Y el archivo original NO es eliminado de la base de datos (Append-Only).
```

## 6. Verificación

- 100% de la US utiliza términos exactos del glosario.
- Los Criterios de Aceptación cubren reglas de negocio (inmutabilidad).
- La US es pequeña y testeable (Cumple INVEST).

## 7. Anti-patrones del dominio universitario (SIGESA)

- Usar "Usuario" genérico → STOP, especificar el rol DUEA o UMSS.
- Referirse a "borrar" o "eliminar" evidencias → STOP, el sistema es Append-Only, las evidencias se versionan.
- "Cambiar de estado el proceso" si eres Coordinador → STOP, eso es permiso exclusivo del Técnico/Jefatura.

## 8. Mini ejemplo de invocación

> "Usa la skill `sigesa-generacion-historias-usuario` para crear las US correspondientes a la carga inicial de documentos en la Fase 1 por parte del Coordinador, asegurándote de incluir el caso donde olvida un indicador obligatorio."

## 9. Modos de fallo conocidos

- La US solicita una acción fuera del alcance del rol (ej. Coordinador creando procesos) → El agente debe abortar y explicar la restricción de Roles.
- La US usa lenguaje técnico ("Como desarrollador quiero un endpoint...") → El agente debe reescribir enfocándose en el valor de negocio.

## 10. Registro de cambios

| Versión | Fecha       | Autor                  | Cambio          |
|---------|-------------|------------------------|-----------------|
| 0.1.0   | 13/05/2026  | Alexander Alvarez      | versión inicial |
---

---
name: sigesa-validacion-maquina-estados
description: >
  Valida las transiciones lógicas de la Máquina de Estados de SIGESA (Indicador y Fase)
  asegurando que se respeten las "Hard Constraints" matemáticas y operativas 
  descritas en el FSD, antes de permitir la generación de código o tests.
allowed-tools:
  - read
  - edit
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

# Skill: Validador de Máquina de Estados SIGESA

> Skill canónica del módulo para la construcción del FSD y Desarrollo. Copia este archivo a 
> `.claude/skills/sigesa-validacion-maquina-estados/` en la raíz de tu repositorio.

## 1. Cuándo activarlo (triggers)

- DURANTE: La redacción de endpoints en los `api_contracts.md`, al diseñar diagramas de estado, o previo a generar código de controladores.
- ARRANCA cuando: Una Historia de Usuario o tarea técnica implica un cambio de estado en la entidad `Phase` o `Indicator`.
- NO ACTIVAR cuando: Se estén realizando operaciones de solo lectura (GET) públicas.

## 2. Entradas obligatorias

- El estado actual (`Current State`) del nodo (Indicador o Fase).
- La acción o evento desencadenante (`Trigger Action`).
- El estado propuesto de destino (`Target State`).
- En el caso de Fases, la matriz de estados de todos sus `Indicadores` hijos.

## 3. Fuentes de verdad (orden de precedencia)

1. `04_state_machine.md` (La regla de oro y los flujos micro/macro).
2. `reglas_negocio.md` en el FSD.

## 4. Procedimiento

1. Identificar la entidad sujeta al cambio (`Indicator` o `Phase`).
2. Para **Indicadores**, verificar contra la matriz:
   - `PENDIENTE` -> (Subida de [CC]) -> `SUBIDO`.
   - `SUBIDO` -> (Rechazo [TD]) -> `OBSERVADO`.
   - `OBSERVADO` -> (Carga v2 [CC]) -> `SUBSANADO`.
   - `SUBSANADO`/`SUBIDO` -> (Aprobación [TD]) -> `APROBADO`.
3. Para **Fases** (La validación crítica):
   - Si la acción es "Cerrar Fase" (Transicionar a `COMPLETED`), ejecutar la pre-condición obligatoria.
   - Evaluar: `COUNT(Todos los indicadores de la fase) == COUNT(Indicadores con estado 'APROBADO')`.
4. Si la condición matemática no se cumple, bloquear el flujo y devolver el "Failure Mode" detallado.

## 5. Salida esperada

Un reporte de validación (Pass/Fail) acompañado de la regla de negocio que lo fundamenta, listo para ser integrado en la especificación técnica.

```text
[VALIDACIÓN MÁQUINA DE ESTADOS]: FALLIDA ❌
- Entidad: Phase (Fase 1: Autoevaluación)
- Acción solicitada: Cerrar Fase
- Motivo del bloqueo: Violación de Hard Constraint. Existen 3 indicadores en estado 'OBSERVADO'. 
- Regla Aplicada: Una Fase solo puede cerrarse si COUNT(Total) == COUNT('APROBADO').
```

## 6. Verificación

- El agente detiene cualquier generación de código destructiva si la máquina de estados dictamina que la transición es ilegal.

## 7. Anti-patrones del dominio universitario (SIGESA)

- Forzar el cierre de una fase administrativamente por "falta de tiempo" → STOP, el sistema no permite bypass normativo sin una excepción documentada y firmada.
- Dejar indicadores "huérfanos" (sin estado final) al cerrar procesos.

## 8. Mini ejemplo de invocación

> "Usa la skill `sigesa-validacion-maquina-estados` para validar si el endpoint `PATCH /api/phases/2/complete` puede ejecutarse si el Coordinador aún no ha respondido a la Observación ID-405."

## 9. Modos de fallo conocidos

- Intento de transición de `OBSERVADO` directo a `APROBADO` sin pasar por `SUBSANADO` → Abortar. El Técnico no puede aprobar su propia observación sin la nueva evidencia del Coordinador.

## 10. Registro de cambios

| Versión | Fecha       | Autor                  | Cambio          |
|---------|-------------|------------------------|-----------------|
| 0.1.0   | 13/05/2026  | Alexander Alvarez      | versión inicial |
