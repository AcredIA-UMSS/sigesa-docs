# Screenshot export TODO

MCP `get_screenshot` hit **Starter plan rate limit** during initial export. PNGs are not yet in-repo.

## Manual export (Figma UI)

For each frame in [`../metadata/frame-inventory.json`](../metadata/frame-inventory.json):

1. Select artboard in Figma.
2. Export @2x PNG → save as `figma/screenshots/<slug>.png`.
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
| P2 | espaciado-y-radio | 44:784 |
| P2 | iconografia | 56:1786 |
| P2 | tablas-y-datos | 50:290 |
