# AcredIA Design System — Figma knowledge export

Persistent design memory for Cursor agents, extracted from the canonical Figma file.

| Field | Value |
|-------|--------|
| **Project** | AcredIA — Design System |
| **File key** | `DX0AyrzfJQEUog45DsGEsl` |
| **Figma URL** | [AcredIA — Design System](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=0-1) |
| **Exported** | 2026-05-25 |
| **Export version** | `v1.1.0` |
| **Source page** | `Elementos` (`0:1`) |

## Directory map

| Path | Purpose |
|------|---------|
| [`metadata/project-summary.md`](metadata/project-summary.md) | File overview, pages, libraries, conventions |
| [`metadata/frame-inventory.json`](metadata/frame-inventory.json) | Machine-readable frame index |
| [`frames/`](frames/) | Per-frame metadata (layout, tokens, components) |
| [`screenshots/`](screenshots/) | Sidecar `.md` metadata per frame |
| [`screenshots/png/`](screenshots/png/) | PNG captures (`<slug>.png`) |
| [`components/component-inventory.md`](components/component-inventory.md) | Atoms → organisms catalog |
| [`tokens/variables-local.json`](tokens/variables-local.json) | **Canonical** local variables export (7 collections) |
| [`layouts/layout-system.md`](layouts/layout-system.md) | Grid, spacing, breakpoints |
| [`icons/icon-inventory.md`](icons/icon-inventory.md) | Icon sets and usage |
| [`maps/interaction-map.md`](maps/interaction-map.md) | Navigation / overlay relationships |
| [`annotations/`](annotations/) | Frame-level notes |
| [`metadata/next-mcp-pass.md`](metadata/next-mcp-pass.md) | P0 screenshot + variables checklist (aylenGonzales) |

## Incremental updates

1. Prefer updating a single frame under `frames/` rather than rewriting the whole tree.
2. Re-run Figma MCP `get_metadata` for `0:1` only when the page structure changes.
3. Use `get_screenshot` per frame node ID to refresh `screenshots/` (see `screenshots/EXPORT_TODO.md`).
4. Use `use_figma` for local variable collections when rate limits allow.
5. **v1.1.0 (2026-05-25):** Added 4 frames, 13 annotations, enriched body/tablas/iconografia from cached XML.

## Coverage (v1.1.0)

| Area | Status |
|------|--------|
| Project metadata | Complete |
| Frame metadata | 15 frames |
| Screenshots | URL refs only — PNGs pending |
| Design tokens | JSON + CSS + Tailwind partial |
| Component inventory | Atoms → layouts |
| Annotations | 14 sidecars |
| Interaction / responsive maps | Complete |

## MCP limits (this export)

- `use_figma` and additional `get_screenshot` calls hit **Starter plan rate limit** during export.
- Variable bindings in-file were not fully resolved (`get_variable_defs` requires a selected layer).
- Screenshots use **Figma deep links** until PNGs are exported manually or via a later MCP session.

## Consumer stacks

Structured for: React, Next.js, Tailwind, shadcn/ui, design-token pipelines, Storybook, AI coding agents.
