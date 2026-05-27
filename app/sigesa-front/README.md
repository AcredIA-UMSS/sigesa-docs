# SIGESA Frontend (`sigesa-front`)

Interfaz web del **Producto Mínimo Viable (MVP)** de SIGESA — Sistema de Gestión de la Evaluación y Seguimiento de la Acreditación (UMSS).

Implementa los flujos críticos para:

- **[CC] Coordinador de Carrera** — carga de evidencias y subsanaciones
- **[TD] Técnico DUEA** — bandeja de auditoría (aprobar / emitir observaciones)

Documentación para agentes IA y convenciones del paquete: **[`AGENTS.md`](./AGENTS.md)** (plan de implementación, ADRs, STOP CONDITIONS).

---

## Requisitos previos

| Herramienta | Versión mínima |
|-------------|----------------|
| Node.js | 20.x LTS recomendado |
| npm | 10+ |

Backend SIGESA (opcional para UI estática): API Gateway con rutas bajo `/api/v1` según contratos en el repo padre.

---

## Instalación

Desde la raíz de este directorio (`app/sigesa-front/`):

```bash
npm install
```

---

## Configuración

1. Copia el archivo de ejemplo de variables de entorno:

```bash
cp .env.example .env.local
```

2. Edita `.env.local`:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL del API (Evidence, Audit, Dashboard) | `http://localhost:8080/api/v1` |

> Las variables `NEXT_PUBLIC_*` se exponen al navegador. No coloques secretos aquí.

---

## Ejecución

### Modo desarrollo (hot reload)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

- Sin sesión → redirige a **`/login`**
- Tras login según rol JWT:
  - **[CC]** → `/cc/home`
  - **[TD]** → `/td/dashboard`

### Producción local

```bash
npm run build
npm run start
```

Por defecto escucha en el puerto **3000**.

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo Next.js |
| `npm run build` | Build de producción |
| `npm run start` | Servir build de producción |
| `npm run lint` | ESLint (config Next.js) |

Verificación de tipos (manual):

```bash
npx tsc --noEmit
```

---

## Rutas de la aplicación (MVP)

| Ruta | Rol requerido | Descripción |
|------|---------------|-------------|
| `/login` | — | Autenticación (`POST /auth/login`) |
| `/cc/home` | `ProgramCoordinator` [CC] | Panel coordinador + upload/subsanación |
| `/td/dashboard` | `DueaTechnician` [TD] | Bandeja de indicadores pendientes de revisión |
| `/unauthorized` | — | Rol sin vista MVP (ej. [JD]) |

---

## Stack técnico

| Capa | Tecnología |
|------|------------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Datos servidor | [TanStack React Query](https://tanstack.com/query) (polling 30s) |
| Estado cliente | [Zustand](https://zustand.docs.pmnd.rs/) |
| HTTP | Axios (`Idempotency-Key` en POST, JWT Bearer) |

---

## Estructura del código

```
src/
├── app/                 # Páginas y layout (App Router)
├── domain/entities/     # Tipos alineados al glosario SIGESA
├── features/            # Módulos por dominio (auth, evidences, observations, dashboard)
├── shared/              # Componentes UI, layout, RBAC
├── store/               # authStore, uiStore
└── lib/httpClient.ts    # Cliente HTTP compartido
```

Detalle del plan y fases: ver **[`AGENTS.md` §2](./AGENTS.md#2-plan-de-implementación-seguido)**.

---

## Contratos API (repo padre)

El frontend consume endpoints documentados en:

1. **`docs/05_dti/api_contracts_cloud.md`** — Evidence Service y Audit Service (canónico)
2. **`docs/04_fsd/api_contracts.md`** — Dashboards (`GET /dashboard/coordinator`, `GET /dashboard/technician`)

Si el backend no está levantado, las pantallas mostrarán errores de red al cargar datos; el login fallará sin `POST /auth/login` operativo.

---

## Reglas de negocio en la UI

1. **Append-Only:** no hay botones ni llamadas de borrado de evidencia; solo nuevas versiones vía `POST`.
2. **Archivos ≤ 50 MB** validados en cliente antes del upload.
3. **Idempotency-Key** (UUID) en cada `POST` de mutación.
4. **URLs S3 pre-firmadas** (15 min): no guardar en `localStorage`; solicitar listado fresco al descargar.
5. **Estados asíncronos:** tras subir evidencia, la UI indica pendiente de confirmación del servidor hasta el próximo refetch.

---

## Autenticación (desarrollo)

- Solo correos **`@umss.edu.bo`** (validación en formulario de login).
- Token JWT en **`sessionStorage`** (`sigesa_access_token`), no en `localStorage`.
- Cabecera enviada automáticamente: `Authorization: Bearer <token>`.

---

## Solución de problemas

| Síntoma | Posible causa | Acción |
|---------|---------------|--------|
| Error de red en dashboard | Backend apagado o URL incorrecta | Revisar `NEXT_PUBLIC_API_URL` en `.env.local` |
| 403 al aprobar/rechazar | Usuario no es [TD] | Iniciar sesión con rol `DueaTechnician` |
| 409 al subir evidencia | Indicador no está `PENDIENTE` ni `OBSERVADO` | Verificar estado en backend |
| 413 / `EVIDENCE_TOO_LARGE` | Archivo > 50 MB | Reducir tamaño del PDF/DOCX |
| Build falla por fuentes Google | Sin red en CI | El layout actual usa fuentes del sistema; no depende de Google Fonts |

---

## Repositorio

Este paquete vive en el monorepo de documentación SIGESA:

```
sigesa-docs/
└── app/
    └── sigesa-front/    ← estás aquí
```

Para contribuir: respeta `AGENTS.md` y el skill `sigesa-frontend-engineer` en `.cursor/skills/` del repo padre.

---

## Licencia / contexto académico

Proyecto UMSS — Módulo 4 Equipo SIGESA. Uso institucional según políticas del curso/proyecto.
