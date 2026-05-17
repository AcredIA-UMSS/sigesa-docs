# Casos de Uso — SIGESA v1

> Documento derivado del FSD v1 del proyecto SIGESA.
> Objetivo: cubrir la rúbrica de calidad de casos de uso y escenarios Gherkin verificables.

---

# Índice

1. CU-001 — Autenticación y autorización por roles
2. CU-002 — Gestión de procesos de acreditación
3. CU-003 — Gestión de fases y actividades
4. CU-004 — Cierre de procesos con validación de pendientes
5. CU-005 — Carga de evidencias
6. CU-006 — Versionado y reemplazo de evidencias
7. CU-007 — Gestión de observaciones DUEA
8. CU-008 — Respuesta a observaciones
9. CU-009 — Panel de seguimiento y semáforo
10. CU-010 — Alertas automáticas de plazos
11. CU-011 — Generación de reporte ejecutivo PDF
12. CU-012 — Auditoría y bitácora de eventos

---

# CU-001 — Autenticación y autorización por roles

## Objetivo

Permitir que los usuarios accedan al sistema únicamente según sus permisos y roles asignados.

## Actores

- Usuario
- Sistema de autenticación

## Precondiciones

- El usuario debe existir.
- El usuario debe tener un rol asignado.

## Flujo principal

1. El usuario accede al formulario de inicio de sesión.
2. El usuario ingresa correo y contraseña.
3. El sistema valida las credenciales.
4. El sistema identifica el rol del usuario.
5. El sistema crea una sesión activa.
6. El sistema muestra únicamente módulos autorizados.
7. El sistema registra el evento en auditoría.

## Flujos alternos

### A1 — Credenciales incorrectas

1. El usuario ingresa datos inválidos.
2. El sistema rechaza el acceso.
3. El sistema muestra mensaje genérico.

### A2 — Usuario sin rol

1. El sistema detecta ausencia de roles.
2. El acceso interno es denegado.

## Postcondiciones

- Existe una sesión válida.
- El acceso queda restringido según permisos.

## Gherkin

```gherkin
Característica: Inicio de sesión seguro

Escenario: Inicio de sesión exitoso
Dado un usuario registrado con rol asignado
Cuando ingresa credenciales correctas
Entonces el sistema crea una sesión activa
Y muestra únicamente módulos autorizados
```

```gherkin
Escenario: Credenciales incorrectas
Dado un visitante en la pantalla de login
Cuando ingresa credenciales inválidas
Entonces el sistema rechaza el acceso
Y muestra un mensaje genérico
```

---

# CU-002 — Gestión de procesos de acreditación

## Objetivo

Permitir registrar procesos de acreditación asociados a carrera y facultad.

## Actores

- Administrador DUEA
- Coordinador

## Precondiciones

- Existen carreras y facultades registradas.

## Flujo principal

1. El administrador accede al módulo de procesos.
2. Registra tipo de acreditación.
3. Selecciona carrera y facultad.
4. Define fechas de inicio y fin.
5. El sistema valida la información.
6. El sistema crea el proceso.
7. El sistema registra el evento en auditoría.

## Flujos alternos

### A1 — Fechas inválidas

1. La fecha de inicio es mayor o igual a la fecha fin.
2. El sistema rechaza el registro.

### A2 — Proceso duplicado

1. Existe un proceso activo del mismo tipo.
2. El sistema impide la creación.

## Postcondiciones

- El proceso queda registrado correctamente.

## Gherkin

```gherkin
Característica: Registro de procesos

Escenario: Crear proceso correctamente
Dado un administrador autenticado
Cuando registra un proceso válido
Entonces el sistema crea el proceso
Y registra el evento en auditoría
```

```gherkin
Escenario: Validación de fechas
Dado un administrador autenticado
Cuando define una fecha inicio mayor a la fecha fin
Entonces el sistema rechaza el registro
```

---

# CU-003 — Gestión de fases y actividades

## Objetivo

Administrar fases y actividades dentro de un proceso de acreditación.

## Actores

- Coordinador
- Administrador DUEA

## Precondiciones

- Existe un proceso activo.

## Flujo principal

1. El usuario ingresa al proceso.
2. Selecciona una fase.
3. Registra actividades.
4. Define responsables y fechas.
5. El sistema guarda la información.
6. El sistema actualiza el porcentaje de avance.

## Flujos alternos

### A1 — Actividad incompleta

1. El usuario omite datos obligatorios.
2. El sistema rechaza el registro.

## Postcondiciones

- Las actividades quedan asociadas a la fase.

## Gherkin

```gherkin
Característica: Gestión de actividades

Escenario: Registrar actividad
Dado un coordinador autenticado
Cuando registra una actividad válida
Entonces el sistema guarda la actividad
Y actualiza el avance del proceso
```

---

# CU-004 — Cierre de procesos con validación de pendientes

## Objetivo

Evitar el cierre de procesos con tareas pendientes.

## Actores

- Administrador DUEA

## Precondiciones

- Existe un proceso activo.

## Flujo principal

1. El administrador solicita cerrar el proceso.
2. El sistema verifica actividades pendientes.
3. El sistema valida reglas de negocio.
4. El sistema cambia el estado del proceso.
5. El sistema registra el evento.

## Flujos alternos

### A1 — Existen pendientes

1. El sistema detecta actividades sin completar.
2. El cierre es rechazado.
3. El sistema comunica el motivo.

## Postcondiciones

- El proceso queda cerrado solo si cumple condiciones.

## Gherkin

```gherkin
Característica: Cierre de procesos

Escenario: Cierre exitoso
Dado un proceso sin actividades pendientes
Cuando el administrador solicita el cierre
Entonces el sistema cambia el estado a cerrado
```

```gherkin
Escenario: Bloqueo por pendientes
Dado un proceso con actividades pendientes
Cuando el administrador intenta cerrarlo
Entonces el sistema rechaza la operación
Y muestra el motivo
```

---

# CU-005 — Carga de evidencias

## Objetivo

Permitir cargar evidencias vinculadas a criterios y fases.

## Actores

- Coordinador
- Técnico operativo

## Precondiciones

- Existe un proceso y criterio válido.

## Flujo principal

1. El usuario accede al módulo de evidencias.
2. Selecciona proceso, fase y criterio.
3. Adjunta un archivo.
4. El sistema valida metadatos.
5. El sistema almacena el archivo.
6. El sistema registra autor y fecha.

## Flujos alternos

### A1 — Falta clasificación

1. El usuario no selecciona criterio.
2. El sistema rechaza la carga.

## Postcondiciones

- La evidencia queda almacenada.

## Gherkin

```gherkin
Característica: Carga de evidencias

Escenario: Subida correcta
Dado un coordinador autenticado
Cuando carga un archivo válido
Entonces el sistema almacena la evidencia
Y registra usuario y fecha
```

```gherkin
Escenario: Evidencia incompleta
Dado un usuario autenticado
Cuando intenta subir una evidencia sin clasificación
Entonces el sistema rechaza la operación
```

---

# CU-006 — Versionado y reemplazo de evidencias

## Objetivo

Mantener historial de versiones y control sobre reemplazos destructivos.

## Actores

- Coordinador

## Precondiciones

- Existe una evidencia previa.

## Flujo principal

1. El usuario selecciona una evidencia.
2. Solicita reemplazar el archivo.
3. El sistema solicita confirmación.
4. El usuario confirma.
5. El sistema crea nueva versión.
6. El sistema conserva historial.

## Flujos alternos

### A1 — Cancelación

1. El usuario cancela la operación.
2. El sistema no modifica archivos.

## Postcondiciones

- El historial permanece íntegro.

## Gherkin

```gherkin
Característica: Versionado de evidencias

Escenario: Reemplazo confirmado
Dado una evidencia existente
Cuando el usuario confirma el reemplazo
Entonces el sistema crea una nueva versión
Y mantiene el historial
```

```gherkin
Escenario: Cancelación de reemplazo
Dado una evidencia existente
Cuando el usuario cancela el reemplazo
Entonces el sistema no realiza cambios
```

---

# CU-007 — Gestión de observaciones DUEA

## Objetivo

Registrar observaciones formales sobre fases o entregables.

## Actores

- Administrador DUEA

## Precondiciones

- Existe un proceso activo.

## Flujo principal

1. El administrador selecciona una fase.
2. Registra una observación.
3. Define estado y prioridad.
4. El sistema guarda la observación.
5. El sistema notifica al coordinador.

## Flujos alternos

### A1 — Observación vacía

1. El administrador no ingresa descripción.
2. El sistema rechaza el registro.

## Postcondiciones

- La observación queda registrada.

## Gherkin

```gherkin
Característica: Registro de observaciones

Escenario: Crear observación
Dado un administrador autenticado
Cuando registra una observación válida
Entonces el sistema guarda la observación
Y notifica al coordinador
```

---

# CU-008 — Respuesta a observaciones

## Objetivo

Permitir responder observaciones emitidas por DUEA.

## Actores

- Coordinador

## Precondiciones

- Existe una observación abierta.

## Flujo principal

1. El coordinador revisa la observación.
2. Registra una respuesta.
3. Adjunta evidencias si corresponde.
4. El sistema actualiza el estado.
5. El sistema registra auditoría.

## Flujos alternos

### A1 — Respuesta vacía

1. El coordinador no ingresa contenido.
2. El sistema rechaza la respuesta.

## Postcondiciones

- La observación queda en seguimiento o cerrada.

## Gherkin

```gherkin
Característica: Respuesta a observaciones

Escenario: Responder observación
Dado una observación abierta
Cuando el coordinador envía una respuesta válida
Entonces el sistema actualiza el estado
Y registra la auditoría
```

---

# CU-009 — Panel de seguimiento y semáforo

## Objetivo

Visualizar el avance y estado de procesos mediante indicadores.

## Actores

- Administrador DUEA
- Coordinador

## Precondiciones

- Existen procesos registrados.

## Flujo principal

1. El usuario ingresa al panel.
2. El sistema calcula avances.
3. El sistema muestra indicadores.
4. El sistema muestra alertas visuales.

## Flujos alternos

### A1 — Sin información

1. No existen datos registrados.
2. El sistema muestra estado vacío.

## Postcondiciones

- El usuario visualiza el estado actualizado.

## Gherkin

```gherkin
Característica: Panel de seguimiento

Escenario: Visualizar indicadores
Dado procesos registrados
Cuando el usuario abre el panel
Entonces el sistema muestra porcentajes de avance
Y semáforos de estado
```

---

# CU-010 — Alertas automáticas de plazos

## Objetivo

Enviar notificaciones automáticas sobre vencimientos y actividades.

## Actores

- Scheduler
- Sistema de notificaciones

## Precondiciones

- Existen hitos próximos a vencer.

## Flujo principal

1. El scheduler ejecuta revisión diaria.
2. El sistema identifica vencimientos.
3. El sistema genera alertas.
4. El sistema envía notificaciones.
5. El sistema registra el evento.

## Flujos alternos

### A1 — Error de envío

1. El canal de notificaciones falla.
2. El sistema registra el error.

## Postcondiciones

- Las alertas quedan registradas.

## Gherkin

```gherkin
Característica: Alertas automáticas

Escenario: Envío de alerta
Dado actividades próximas a vencer
Cuando el scheduler ejecuta la revisión
Entonces el sistema envía notificaciones
Y registra el evento
```

---

# CU-011 — Generación de reporte ejecutivo PDF

## Objetivo

Generar reportes ejecutivos del estado de acreditación.

## Actores

- Administrador DUEA
- Coordinador

## Precondiciones

- Existe información consolidada.

## Flujo principal

1. El usuario accede al módulo de reportes.
2. Selecciona un proceso.
3. Solicita generar PDF.
4. El sistema consolida información.
5. El motor PDF genera el documento.
6. El sistema entrega el archivo.

## Flujos alternos

### A1 — Error de generación

1. El motor PDF falla.
2. El sistema informa el error.

## Postcondiciones

- El usuario obtiene el reporte.

## Gherkin

```gherkin
Característica: Generación de reportes

Escenario: Generar reporte PDF
Dado un proceso con información registrada
Cuando el usuario solicita un reporte
Entonces el sistema genera el PDF
Y permite descargarlo
```

---

# CU-012 — Auditoría y bitácora de eventos

## Objetivo

Registrar eventos críticos realizados dentro del sistema.

## Actores

- Sistema de auditoría

## Precondiciones

- Existe una acción crítica.

## Flujo principal

1. Un usuario realiza una acción sensible.
2. El sistema captura el evento.
3. El sistema registra usuario, fecha y acción.
4. El sistema almacena el evento.

## Flujos alternos

### A1 — Error de almacenamiento

1. El registro falla.
2. El sistema genera alerta interna.

## Postcondiciones

- Existe trazabilidad completa.

## Gherkin

```gherkin
Característica: Auditoría del sistema

Escenario: Registro de evento crítico
Dado un usuario realizando una acción sensible
Cuando la operación finaliza
Entonces el sistema registra el evento
Y almacena usuario y fecha
```

---

# Resumen de cobertura de rúbrica


| Criterio                         | Cumplimiento |
| -------------------------------- | ------------ |
| Casos de uso críticos            | 12           |
| Flujo principal                  | Sí           |
| Flujos alternos                  | Sí           |
| Escenarios Gherkin verificables  | Sí           |
| Cobertura de módulos principales | Sí           |
| Trazabilidad con FSD             | Sí           |


---

# Trazabilidad con FSD


| Caso de uso | Relación FSD      |
| ----------- | ----------------- |
| CU-001      | FSD-UC-001        |
| CU-002      | FSD-UC-002        |
| CU-003      | FSD-UC-002        |
| CU-004      | FSD-UC-002        |
| CU-005      | FSD-UC-003        |
| CU-006      | FSD-UC-003        |
| CU-007      | FSD-UC-004        |
| CU-008      | FSD-UC-004        |
| CU-009      | FSD-UC-005        |
| CU-010      | FSD-UC-006        |
| CU-011      | FSD-UC-007        |
| CU-012      | COMP-AUDIT-001 (transversal) · FSD §2.4.1 · GAP-004 cerrado doc |


