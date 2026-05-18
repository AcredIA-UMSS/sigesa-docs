---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-012
domain: fsd-uc-acredia
---

## PC-012 — Acceso de evaluador externo con alcance mínimo (agrupa FSD-UC-EXT-004 — GAP-002c)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para control de acceso
con principio de mínimo privilegio en sistemas de acreditación institucional.

# Task
Especifica el contrato funcional para FSD-UC-EXT-004 (GAP-002c): acceso del evaluador
externo al sistema con alcance estrictamente limitado a la fase y carrera asignadas,
sin posibilidad de navegar a recursos no autorizados.

# Context
- Entradas: credenciales del evaluador externo, fase_id y carrera_id asignadas
  por el Administrador DUEA.
- Alcance del rol: solo lectura/descarga de documentos de la fase asignada;
  registro de observaciones/informes en formularios habilitados para su rol.
- Referencias de dominio: BR-004, BR-005, BR-011.
- NFR aplicable: NFR-003 (confidencialidad), NFR-004 (no repudio).
- Restricciones: el evaluador no puede ver carreras o fases no asignadas;
  no puede crear usuarios, asignar roles ni acceder a módulos administrativos;
  las credenciales temporales vencen según la política configurada por el administrador.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Autenticar al evaluador con sus credenciales temporales.
2. Cargar el alcance asignado (fase_id, carrera_id) desde la configuración del administrador.
3. Restringir navegación y acceso de datos al alcance definido.
4. Registrar cada acción del evaluador en la bitácora de auditoría.
5. Al vencer las credenciales: invalidar sesión y bloquear acceso.
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes y Gherkin para
(a) acceso exitoso dentro del alcance, (b) intento de acceso fuera del alcance
y (c) credenciales vencidas.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "El evaluador externo solo accede a la fase y carrera explícitamente asignadas por el Administrador DUEA.",
      "Ningún recurso fuera del alcance asignado es visible ni accesible para el evaluador.",
      "Toda acción del evaluador queda registrada en auditoría con actor, recurso y timestamp.",
      "Las credenciales temporales tienen fecha de vencimiento; al vencer, el acceso se invalida automáticamente."
    ],
    "failure_modes": [
      { "code": "EXT_UNAUTHORIZED_RESOURCE", "condition": "Evaluador intenta acceder a carrera o fase no asignada",    "message": "No tiene acceso a este recurso." },
      { "code": "EXT_ADMIN_FUNCTION",        "condition": "Evaluador intenta acceder a módulo administrativo",        "message": "Esta función no está disponible para su rol." },
      { "code": "EXT_CREDENTIALS_EXPIRED",   "condition": "Credenciales temporales del evaluador han vencido",        "message": "Sus credenciales de acceso han vencido. Contacte al Administrador DUEA." },
      { "code": "EXT_NO_SCOPE_ASSIGNED",     "condition": "El evaluador no tiene fase/carrera asignada aún",          "message": "No tiene recursos asignados para revisar en este momento." },
      { "code": "EXT_AUDIT_FAIL",            "condition": "Fallo al registrar acción del evaluador en auditoría",     "message": "Error crítico de auditoría. La acción no fue completada." }
    ],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Acceso exitoso dentro del alcance asignado:
      Dado un evaluador externo asignado a la fase 'Visita de pares' de la carrera 'Arquitectura'
      Cuando accede al sistema con sus credenciales
      Entonces solo ve los documentos y formularios de la fase 'Visita de pares' de 'Arquitectura'
      Y no puede navegar a otras fases, carreras ni módulos administrativos
      Y cada acción queda registrada en auditoría

      Escenario 2 — Intento de acceso a recurso no asignado:
      Dado un evaluador externo con acceso a la carrera 'Arquitectura'
      Cuando intenta navegar a la URL de la carrera 'Derecho'
      Entonces el sistema responde EXT_UNAUTHORIZED_RESOURCE
      Y no expone ningún dato de la carrera 'Derecho'
      Y registra el intento en la bitácora de auditoría

      Escenario 3 — Credenciales vencidas:
      Dado un evaluador cuyas credenciales temporales han vencido
      Cuando intenta autenticarse
      Entonces el sistema responde EXT_CREDENTIALS_EXPIRED
      Y no crea sesión
      Y muestra el mensaje de contacto con el Administrador DUEA
    "
  }
}
```

---
