# AcredIA Design System — Figma knowledge export

Persistent design memory for Cursor agents, extracted from the canonical Figma file.

| Field | Value |
|-------|--------|
| **Project** | AcredIA — Design System |
| **File key** | `8xAUbh7TScU1I4lHVTvUTS` |
| **Figma URL** | [AcredIA — Design System](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=0-1) |
| **Exported** | 2026-05-26 (gap-fill run) |
| **Previous file key** | `DX0AyrzfJQEUog45DsGEsl` (original) |
| **Export version** | `v1.1.0` |
| **Source page** | `Elementos` (`0:1`) |

## Directory map

| Path | Purpose |
|------|---------|
| [`metadata/project-summary.md`](metadata/project-summary.md) | File overview, pages, libraries, conventions |
| [`metadata/frame-inventory.json`](metadata/frame-inventory.json) | Machine-readable frame index |
| [`frames/`](frames/) | Per-frame metadata (layout, tokens, components) |
| [`screenshots/`](screenshots/) | PNG exports or URL references + sidecar `.md` |
| [`components/component-inventory.md`](components/component-inventory.md) | Atoms → organisms catalog |
| [`tokens/`](tokens/) | JSON tokens + CSS + Tailwind partial |
| [`layouts/layout-system.md`](layouts/layout-system.md) | Grid, spacing, breakpoints |
| [`icons/icon-inventory.md`](icons/icon-inventory.md) | Icon sets and usage |
| [`maps/interaction-map.md`](maps/interaction-map.md) | Navigation / overlay relationships |
| [`annotations/`](annotations/) | Frame-level notes |
| [`metadata/raw-page-elementos.xml`](metadata/raw-page-elementos.xml) | Cached `get_metadata` dump (incremental updates) |

## Incremental updates

1. Prefer updating a single frame under `frames/` rather than rewriting the whole tree.
2. Re-run Figma MCP `get_metadata` for `0:1` only when the page structure changes.
3. Use `get_screenshot` per frame node ID to refresh `screenshots/` (see `screenshots/EXPORT_TODO.md`).
4. Use `use_figma` for local variable collections when rate limits allow.

## MCP limits (this export)

- `use_figma` and additional `get_screenshot` calls hit **Starter plan rate limit** during export.
- Variable bindings in-file were not fully resolved (`get_variable_defs` requires a selected layer).
- Screenshots use **Figma deep links** until PNGs are exported manually or via a later MCP session.

## Consumer stacks

Structured for: React, Next.js, Tailwind, shadcn/ui, design-token pipelines, Storybook, AI coding agents.
