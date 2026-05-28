# Aplicaciones SIGESA (repositorios vinculados)

El código de las aplicaciones vive en **repositorios Git independientes**, enlazados a este monorepo mediante **submodules**:

| Carpeta local | Repositorio canónico |
|---------------|----------------------|
| `sigesa-front/` | [AcredIA-UMSS/sigesa-front](https://github.com/AcredIA-UMSS/sigesa-front) |
| `sigesa-backend/` | [AcredIA-UMSS/sigesa-backend](https://github.com/AcredIA-UMSS/sigesa-backend) |

**SSH (desarrollo):**

- Frontend: `git@github.com:AcredIA-UMSS/sigesa-front.git`
- Backend: `git@github.com:AcredIA-UMSS/sigesa-backend.git`

La documentación canónica, POCs y skills viven en la raíz de `sigesa-docs` (`docs/`, `.cursor/skills/`).

## Clonar el monorepo con aplicaciones

```bash
git clone --recurse-submodules git@github.com:AcredIA-UMSS/sigesa-docs.git
cd sigesa-docs
```

Si ya clonaste sin submodules:

```bash
git submodule update --init --recursive
```

## Trabajo diario

1. **Cambios de app:** entra en `app/sigesa-front/` o `app/sigesa-backend/`, commit y push al repo correspondiente.
2. **Actualizar puntero en docs:** desde la raíz de `sigesa-docs`, tras probar una versión:
   ```bash
   cd app/sigesa-front && git pull origin main && cd ../..
   git add app/sigesa-front
   git commit -m "chore: bump sigesa-front submodule"
   ```
3. **Actualizar submodules a último remoto:**
   ```bash
   git submodule update --remote --merge
   ```

## Requisitos por paquete

Ver README de cada submodule:

- [`sigesa-front/README.md`](sigesa-front/README.md) — Next.js, CC/TD MVP
- [`sigesa-backend/README.md`](sigesa-backend/README.md) — microservicios Evidence, Audit, Gateway
