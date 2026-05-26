# Next MCP pass — P0 checklist

**Owner:** aylenGonzales  
**Target:** screenshots P0 + variables locales  
**File:** `DX0AyrzfJQEUog45DsGEsl` (AcredIA — Design System)

## Preconditions

1. Figma MCP conectado en Cursor (Agent mode).
2. Cuenta con cuota disponible (`whoami` para verificar seat/plan).
3. Skills: cargar `figma-use` antes de `use_figma`.

## P0 — Screenshots

Ejecutar en orden (una llamada por frame):

| # | Slug | nodeId | Output |
|---|------|--------|--------|
| 1 | tipografia | `8:2186` | `screenshots/png/tipografia.png` |
| 2 | paleta-de-colores | `8:2187` | `screenshots/png/paleta-de-colores.png` |
| 3 | tokens-de-diseno | `44:1259` | `screenshots/png/tokens-de-diseno.png` |
| 4 | botones-y-acciones | `24:26` | `screenshots/png/botones-y-acciones.png` |

**Prompt sugerido en Agent chat:**

```text
Export P0 Figma screenshots for AcredIA Design System file DX0AyrzfJQEUog45DsGEsl:
get_screenshot node 8:2186, 8:2187, 44:1259, 24:26 → save PNGs to figma/screenshots/
Update each matching .md sidecar status to exported.
```

Tras cada PNG:

1. Guardar en `figma/screenshots/png/<slug>.png`
2. Editar `figma/screenshots/<slug>.md`: `status: exported`

## Variables locales — extracción

**Prompt sugerido:**

```text
Load figma-use skill. Run use_figma on file DX0AyrzfJQEUog45DsGEsl:
- List all local variable collections and modes
- Export name, type, values per mode
- Merge into figma/tokens/*.json and css-variables.css
- Update figma/metadata/export-manifest.json mcpToolsUsed
```

Script base (`use_figma`):

```javascript
await figma.setCurrentPageAsync(figma.root.children.find(p => p.id === '0:1'));
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
return {
  collections: collections.map(c => ({
    id: c.id, name: c.name, modes: c.modes, variableIds: c.variableIds
  })),
  variables: vars.map(v => ({
    id: v.id, name: v.name, resolvedType: v.resolvedType,
    valuesByMode: Object.fromEntries(
      Object.entries(v.valuesByMode).map(([modeId, val]) => [modeId, val])
    )
  }))
};
```

## Verificación post-pasada

- [ ] 4 PNGs en `figma/screenshots/`
- [ ] Sidecars P0 con `status: exported`
- [ ] `export-manifest.json` → `mcpToolsUsed` incluye `get_screenshot`, `use_figma`
- [ ] Tokens JSON reconciliados con frames (sin duplicar inferidos)
- [ ] Entrada en `team/aylenGonzales/log_interno.md`

## Entry point

[`../README.md`](../README.md) → [`frame-inventory.json`](frame-inventory.json)
