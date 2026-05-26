# Screenshot export TODO

MCP `get_screenshot` hit **Starter plan rate limit** during initial export. PNGs live in [`png/`](png/).

## Layout

| Path | Content |
|------|---------|
| `screenshots/<slug>.md` | Sidecar metadata + links |
| `screenshots/png/<slug>.png` | Image captures |

## Manual export (Figma UI)

For each frame in [`../metadata/frame-inventory.json`](../metadata/frame-inventory.json):

1. Select artboard in Figma.
2. Export @2x PNG → save as `figma/screenshots/png/<slug>.png`.
3. Update the matching `<slug>.md` sidecar: set `status: exported`.

## MCP batch (when quota available)

```text
get_screenshot fileKey=DX0AyrzfJQEUog45DsGEsl nodeId=<id> maxDimension=2048
```

Then download via curl from returned URL into `figma/screenshots/`.

## Priority queue

| Priority | Slug | Node ID |
|----------|------|---------|
| P0 | tipografia | 8:2186 |
| P0 | paleta-de-colores | 8:2187 |
| P0 | tokens-de-diseno | 44:1259 |
| P0 | botones-y-acciones | 24:26 |
| P1 | formularios | 37:173 |
| P1 | navegacion | 42:15 |
| P1 | body-reference-1280 | 56:1522 |
| P1 | body-extended | 1004:49 |
| P1 | tablas-y-datos-alt | 53:890 |
| P2 | espaciado-y-radio | 44:784 |
| P2 | iconografia | 56:1786 |
| P2 | tablas-y-datos | 50:290 |
| P3 | dropdown-standalone | 1729:8294 |
| P3 | botones-cambios | 26:57 |
| P3 | motion-loaders | 1676:7886 |

## Exported (2026-05-25 — aylenGonzales)

| Slug | PNG | Origen original |
|------|-----|-----------------|
| paleta-de-colores | ✅ | Paleta de Colores.png |
| tokens-de-diseno | ✅ | Tokens de Diseño.png |
| botones-y-acciones | ✅ | Botones y acciones.png |
| botones-cambios | ✅ | Botones cambios.png |
| tablas-y-datos | ✅ | Tablas y datos.png |
| tablas-y-datos-alt | ✅ | Estados.png |
| tipografia | ✅ | Tipografía.png → `tipografia.png` |

### P1 (2026-05-25)

| Slug | PNG | Notas |
|------|-----|-------|
| body-extended | ✅ | `Body.png` → 1280×3762 |
| navegacion | ✅ | `Navegación.png` → `navegacion.png` |
| tablas-y-datos-alt | ✅ | (P0) |
| formularios | ✅ | `Formularios.png` → `formularios.png` |
| body-reference-1280 | ❌ | Frame shell 1280×1747 (sidebar) |

### P2 (2026-05-25)

| Slug | PNG | Notas |
|------|-----|-------|
| espaciado-y-radio | ✅ | 1024×1535 |
| iconografia | ✅ | `iconografia.png` 1024×1712 |
| tablas-y-datos | ✅ | (P0) |

### Pendiente

| Slug | PNG | Notas |
|------|-----|-------|
| body-reference-1280 | ❌ | Shell 1280×1747 (sidebar Manual de Estilo) |
| dropdown-standalone | ❌ | P3 |
| motion-loaders | ❌ | P3 |

## Last updated

2026-05-25 — P2 completo (13 PNG). Falta body-reference-1280 + P3.
