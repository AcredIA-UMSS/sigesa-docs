---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-011
domain: fsd-uc-acredia
---

## PC-011 — Gestión de usuarios y asignación de roles (agrupa FSD-UC-001 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para administración de usuarios
y control de acceso basado en roles (RBAC) en sistemas institucionales.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-001 (canónico): creación de usuarios,
asignación/modificación de roles y gestión del ciclo de vida de cuentas, con
restricción exclusiva al Administrador DUEA y registro en auditoría.

# Context
- Entradas: datos del nuevo usuario (nombre, email institucional, rol_asignado),
  usuario administrador solicitante.
- Roles asignables: Administrador DUEA, Jefe de Carrera, Coordinador,
  Técnico operativo, Evaluador externo.
- Referencias de dominio: BR-004, BR-005.
- Restricciones: solo el Administrador DUEA puede crear usuarios y asignar roles;
  no crear usuarios sin rol asignado; email debe ser único en el sistema;
  toda creación/modificación queda en auditoría.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Verificar que el solicitante tiene rol Administrador DUEA.
2. Validar unicidad del email en el sistema.
3. Validar que el rol asignado es uno de los roles permitidos del sistema.
4. Crear el usuario con rol asignado y habilitarlo para autenticación.
5. Registrar evento en auditoría con actor, timestamp y datos del nuevo usuario.
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes y Gherkin para
(a) creación exitosa, (b) email duplicado y (c) intento por usuario no autorizado.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "Solo el Administrador DUEA puede crear usuarios y asignar o modificar roles.",
      "Todo usuario debe tener al menos un rol asignado al crearse.",
      "El email de cada usuario es único en el sistema.",
      "Toda creación o modificación de usuario queda registrada en auditoría con actor y timestamp."
    ],
    "failure_modes": [
      { "code": "USR_UNAUTHORIZED",      "condition": "Usuario sin rol Administrador DUEA intenta crear cuenta", "message": "Solo el Administrador DUEA puede gestionar usuarios." },
      { "code": "USR_EMAIL_DUPLICATE",   "condition": "El email ya existe en el sistema",                        "message": "Ya existe un usuario registrado con ese correo electrónico." },
      { "code": "USR_INVALID_ROLE",      "condition": "El rol asignado no es un rol válido del sistema",         "message": "El rol especificado no existe en el sistema." },
      { "code": "USR_MISSING_ROLE",      "condition": "Se intenta crear usuario sin asignar rol",                "message": "Todo usuario debe tener un rol asignado." },
      { "code": "USR_MISSING_FIELDS",    "condition": "nombre o email ausente",                                  "message": "Nombre y correo electrónico son obligatorios." }
    ],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Alta exitosa de usuario con rol asignado:
      Dado un Administrador DUEA autenticado en el módulo de gestión de usuarios
      Cuando registra el usuario 'Carlos Mamani' con email 'c.mamani@umss.edu'
      Y le asigna el rol 'Coordinador de Carrera'
      Entonces el usuario puede autenticarse con ese rol
      Y el cambio queda registrado en auditoría con actor y timestamp

      Escenario 2 — Rechazo por usuario sin rol:
      Dado un Administrador en el formulario de nuevo usuario
      Cuando completa nombre y email pero no asigna ningún rol
      Entonces el sistema responde USR_MISSING_ROLE
      Y muestra el mensaje 'Debe asignar al menos un rol al usuario'

      Escenario 3 — Rechazo por email duplicado:
      Dado que el email 'c.mamani@umss.edu' ya existe en el sistema
      Cuando el Administrador intenta crear otro usuario con el mismo email
      Entonces el sistema responde USR_EMAIL_DUPLICATE
      Y sugiere buscar al usuario existente para modificar sus datos o roles
    "
  }
}
```

---
