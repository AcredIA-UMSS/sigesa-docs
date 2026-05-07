# SIGESA: Sistema Gestor de Acreditaciones UMSS

**Documentación oficial del proyecto SIGESA:** Business Requirements Document (BRD), Architecture Decision Records (ADR), Functional Specification Documents (FSD) y otros artefactos técnicos. Elaborado con apoyo de herramientas de IA como Claude, Copilot y NotebookLM.

---

## 📖 Visión General

**SIGESA** (Sistema Gestor de Acreditaciones) es una plataforma web diseñada para orquestar, monitorear y auditar todo el ciclo de vida de los procesos de acreditación universitaria de la Universidad Mayor de San Simón (UMSS). 

El sistema soporta dinámicamente dos normativas de evaluación: **CEUB** (Nacional) y **ARCU-SUR** (Internacional). 

### Propósito Principal
Transformar un proceso históricamente fragmentado y ambiguo en un **flujo de trabajo lineal, orientado a procesos y estrictamente trazable**. Elimina el problema de los "archivos huérfanos" obligando a que cada pieza de evidencia documental y cada subsanación viva exactamente dentro de la fase, dimensión e indicador normativo que le corresponde.

---

## 🎯 El Problema que Resuelve

En versiones y enfoques anteriores, el proceso se estancaba en "cuellos de botella" de comunicación:
- Los documentos se perdían en formatos dispersos (físico, Excel, Drive, correo)
- Las observaciones de auditoría no se emparejaban con las correcciones
- El estado real de una carrera era invisible para la Jefatura
- No existía un mecanismo centralizado para hacer seguimiento en tiempo real

**SIGESA resuelve esto mediante:**

1. **Arquitectura Orientada a Procesos:** La navegación y la subida de archivos ocurren dentro de una Máquina de Estados estricta, no en un vacío.
2. **Trazabilidad Absoluta:** Un documento rechazado no se borra, se observa. La corrección se ancla directamente a la observación, manteniendo el historial inmutable.
3. **Automatización de Plantillas:** Al seleccionar una normativa (CEUB o ARCU-SUR), el sistema carga automáticamente las Dimensiones, Criterios e Indicadores aplicables.
4. **Filtro de Contexto Global:** Los usuarios no navegan por carpetas de facultades; el sistema adapta la vista automáticamente según los permisos de la carrera asignada.

---

## 👥 Actores Principales (Roles)

El sistema reconoce **4 actores fundamentales** con niveles de visibilidad y permisos distintos:

### [CC] Coordinador de Carrera
- **Rol:** Actor operativo
- **Objetivo:** Cumplir con el framework de evaluación normativo
- **Responsabilidades:**
  - Carga de evidencias documentales
  - Respuesta a observaciones del Técnico DUEA
  - Corrección de indicadores rechazados
  - Seguimiento del progreso de su carrera
- **Visibilidad:** Limitada a su propia carrera

### [TD] Técnico DUEA (Auditor)
- **Rol:** Actor auditor y orquestador
- **Objetivo:** Validar la calidad técnica y completitud de las evidencias
- **Responsabilidades:**
  - Revisión de evidencia técnica
  - Aprobación o rechazo de indicadores (con justificación obligatoria)
  - Generación de observaciones vinculadas
  - Autorización del avance de fases
- **Visibilidad:** Global (todas las carreras y facultades)

### [JD] Jefatura DUEA (Administrador)
- **Rol:** Actor estratégico
- **Objetivo:** Supervisar velocidad de procesos y garantizar continuidad institucional
- **Responsabilidades:**
  - Monitoreo de cuellos de botella
  - Configuración del sistema (usuarios, facultades, plantillas normativas)
  - Aprobación de dictámenes finales
  - Auditoría de historial de acreditaciones
- **Visibilidad:** Total del sistema

### [P] Público (Portal de Transparencia)
- **Rol:** Actor externo
- **Acceso:** Estudiantes, empleadores, organismos de acreditación
- **Responsabilidades:** Consultar estados y descargar certificados institucionales sin fricciones

---

## 🏗️ Flujo de Trabajo Crítico (The Core Loop)

El motor de SIGESA empuja a las carreras a través de un ciclo de vida iterativo. 

> **Nota Estructural:** Dentro de cada fase de evaluación, el análisis de la carrera se desglosa en múltiples **Dimensiones** (ej. Contexto Institucional, Proyecto Académico, Comunidad Universitaria), las cuales agrupan los criterios e indicadores específicos a evaluar.

### Etapas Clave

1. **Preparación**
   - JD/TD crean el proceso y asignan la normativa (CEUB/ARCU-SUR)
   - El sistema carga automáticamente las Dimensiones y estructura normativa aplicable

2. **Fase 1: Autoevaluación**
   - CC sube evidencias navegando a través de Dimensiones e Indicadores
   - TD audita y genera observaciones
   - Sistema bloquea avance si existen indicadores pendientes/rechazados

3. **Fase 2: Subsanaciones (Evaluación Interna)**
   - CC sube correcciones específicas ancladas a observaciones previas
   - TD valida y aprueba
   - Sistema obliga emparejamiento exacto entre problema y solución

4. **Fase 3: Evaluación Externa**
   - Visita de pares externos
   - Evaluación del comité externo
   - Dictamen y emisión de certificación pública
   - Portal de transparencia actualizado

---

## ⚙️ Características Críticas (Priorizadas)

### P1 — CRÍTICO (sin esto el sistema no funciona)
- **Autenticación y Control de Acceso:** Registro y autenticación con roles diferenciados que controlan qué puede ver y hacer cada usuario
- **Gestión de Fases:** Registro de avances, observaciones y cambios de estado a través del ciclo de acreditación
- **Versionamiento de Evidencia:** Carga, organización y versioning de documentos vinculados a indicadores específicos

### P2 — IMPORTANTE (diferencia el sistema del proceso manual)
- **Dashboard Centralizado:** Panel con el estado actualizado de cada carrera (etapa actual, porcentaje de avance, fechas clave)
- **Alertas Automáticas:** Notificaciones sobre fechas límite, vencimientos de acreditación e hitos críticos
- **Sistema de Observaciones:** Rechazos con comentarios obligatorios que generan bloqueos hasta subsanación

### P3 — VALIOSO (agrega valor estratégico)
- **Reportes Exportables:** Métricas de cumplimiento por carrera, facultad y periodo en PDF/Excel
- **Auditoría Histórica:** Consulta de ciclos anteriores y continuidad institucional
- **Portal de Transparencia:** Acceso público a certificados y estados

---

## 🔐 Reglas de Negocio Críticas

| Regla | Descripción |
|-------|-------------|
| **Roles** | Un coordinador de carrera solo puede visualizar y cargar evidencia; no puede crear, editar ni aprobar fases (exclusivas del administrador DUEA) |
| **Máquina de Estados** | Flujo: Pendiente → Con Observaciones → Aprobado/Rechazado. No puede cerrarse hasta aprobación explícita. Permite versiones iterativas. |
| **Bloqueo de Avance** | El sistema NO permite avanzar a la siguiente etapa si existe al menos un indicador Pendiente o Rechazado |
| **Plantillas Normativas** | Al seleccionar CEUB o ARCUSUR, se cargan automáticamente las fases, dimensiones e indicadores predefinidos |
| **Trazabilidad Inmutable** | Documentos rechazados nunca se borran; se archivan con motivo de rechazo y fecha de observación |
| **Emparejamiento Exacto** | Correcciones deben estar vinculadas directamente a la observación que las generó |

---

## 📊 Métricas de Éxito

El sistema funciona si se logra:

- ✅ **≥ 90%** de fases completadas antes de fecha límite
- ✅ **≥ 95%** de carreras con documentación completa cargada
- ✅ **< 5 minutos** de configuración inicial gracias a plantillas automáticas
- ✅ **≥ 85%** satisfacción de usuarios en tareas esenciales sin capacitación previa
- ✅ **Reducción drástica** de llamadas/emails informales sobre estado de procesos
- ✅ **0%** procesos paralizados por errores de comunicación

---

## 🤖 Notas para Agentes de IA (AI Knowledge Base Context)

Si eres un agente de Inteligencia Artificial (ej. Devin, GitHub Copilot Workspace, Cursor) analizando este repositorio para generar código, ten en cuenta:

### Lenguaje de Dominio
- **No asumas nombres de variables.** Utiliza estrictamente el glosario definido en `context/03_domain_glossary.md`
- **Jerarquía crítica:** `Proceso → Fase → Dimensión → Criterio → Indicador → Evidencia`
- Especial atención: no mezclar `File` (archivo técnico) con `Evidence` (artefacto normativo)

### Máquina de Estados
- La lógica de transición entre fases **no es trivial** y contiene restricciones complejas
- Antes de programar endpoints de actualización o vistas de UI, consulta `context/04_state_machine.md`
- El bloqueo de avance cuando existen indicadores pendientes es una restricción dura

### Mutabilidad de Archivos
- **NUNCA generes código que sobrescriba o elimine un PDF existente** (`Evidencia`)
- El sistema es **Append-Only** para fines de auditoría
- Revisa `context/05_data_schema.md` para entender las relaciones de base de datos

### Comportamiento Esperado
- Revisa `context/06_bdd_fase2_subsanaciones.md` para entender validaciones críticas
- Antes de escribir tests automatizados, asegúrate de que cubran los escenarios de rechazo y subsanación
- Respeta las restricciones de roles en todos los endpoints

---

## 📁 Estructura de la Documentación

Este repositorio contiene:

- `context/01_vision_negocio.txt` — Análisis de usuarios, problemas y tareas principales
- `context/01_parte_dificil.txt` — Flujos complejos, restricciones y casos de prueba
- `context/03_domain_glossary.md` — Mapeo de términos de negocio a variables de código
- `context/04_state_machine.md` — Reglas de transición entre fases
- `context/05_data_schema.md` — Estructura de base de datos y relaciones
- `context/06_bdd_fase2_subsanaciones.md` — Comportamiento esperado de validaciones
- Futuros: ADR (Architectural Decision Records), FSD (Functional Specification Documents)

---

## 🚀 Tecnologías Base

(Por definir según documentos de arquitectura)

---

## 🧾 Plantilla de mensajes de commit

Este repositorio incluye una plantilla de Git para mantener buenas prácticas en los logs de commit.
Usa el archivo `.gitmessage.txt` en la raíz del proyecto y configura tu repositorio local con:

```bash
git config commit.template .gitmessage.txt
```

Luego de configurar, cada `git commit` abrirá un mensaje con secciones claras de tipo, descripción, referencias y pruebas.

---

## 📝 Licencia

Proyecto de la Universidad Mayor de San Simón (UMSS). Contacto: DUEA (Dirección de Asuntos Universitarios y Acreditación)
