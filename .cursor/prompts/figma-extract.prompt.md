# ROLE

You are connected to a Figma MCP server.

Your responsibility is to extract, organize, and persist structured design knowledge from the connected Figma project into the local repository. 

CRITICAL CONTEXT: We are operating under an extremely strict API rate limit (maximum 6 requests per month). You MUST prioritize reading existing local data over fetching new data. Your primary goal right now is to identify gaps from previous runs and ONLY extract what is missing.

---

# OBJECTIVE

Maintain and complete the persistent `/figma` knowledge directory. Much of this data may already exist from previous runs. You need to complete the extraction for:

- project metadata
- frame metadata
- screenshots (High Priority)
- design tokens
- component inventories
- layout structures
- typography systems
- spacing systems
- icon inventories
- interaction mappings
- annotations
- responsive patterns

The `/figma` folder must serve as reusable long-term memory for future Cursor agent sessions.

---

# DIRECTORY STRUCTURE

Ensure the following exists and populate missing gaps:

/figma
  /metadata
  /screenshots
  /frames
  /components
  /tokens
  /layouts
  /icons
  /annotations
  /maps

---

# REQUIRED EXPORTS (FILL GAPS ONLY)

## 1. PROJECT METADATA
Check for `/figma/metadata/project-summary.md`. If it exists and is mostly complete, DO NOT fetch it again. Only update it if specific new variables/breakpoints are discovered locally.

## 2. FRAME METADATA
For major frames missing from `/figma/frames/`, create `<frame-name>.md`.
Include: dimensions, layout structure, child hierarchy, auto-layout settings, spacing, typography, color, components, interaction notes.

## 3. SCREENSHOTS (PRIORITY)
Check `/figma/screenshots/`. Identify major pages, flows, or components that currently lack a screenshot or valid URL reference.
- Export missing screenshots.
- If direct export fails, generate markdown references and valid frame URLs.

## 4. COMPONENT INVENTORY
Check `/figma/components/component-inventory.md`. Audit the existing list. Only use MCP to inspect variants/states of components that are clearly missing or stubbed out.

## 5. DESIGN TOKENS
Check `/figma/tokens/`. If `colors.json`, `typography.json`, etc., already exist, DO NOT refetch the global styles unless explicitly asked.

## 6. LAYOUT MAPS, ICONS, & INTERACTION MAPS
Verify the existence of `layout-system.md`, `icon-inventory.md`, and `interaction-map.md`. Only make targeted queries to Figma to fill in missing relationships, missing icon SVGs/names, or missing grid layouts.

---

# SCREENSHOT + CONTEXT LINKING

For every important frame mapped in this session, ensure cross-linked files exist:
- `[name].png` (or URL reference)
- `[name].md`
- `[name].annotations.md`

---

# STRICT MCP USAGE RULES (RATE LIMIT PROTECTION)

1. READ FIRST: You must read the local `/figma` directory and its contents before making ANY Figma MCP calls.
2. DELTA ONLY: Only request data for nodes, frames, or components that are completely missing from the local files.
3. BATCH REQUESTS: If you must make a request, extract as much nested data as possible in a single call to avoid pagination or follow-up calls.
4. NO RE-SCANNING: Do not scan entire files or pages if we already have the `project-summary.md`. Prefer focused, single-node analysis.
5. HANDLE URL CHANGES SMARTLY: The provided Figma URL or node ID may be updated across runs, but the underlying project data remains the same. Do NOT treat a new link as a new project. Map the new link's target to the existing local directory structure and continue gap-filling without restarting.
6. ASK BEFORE BURNING: If you are unsure if an MCP call is necessary, STOP and ask the user for permission, warning them that it will consume one of the limited monthly requests.

---

# OUTPUT FORMAT

Prefer:
- markdown, JSON, structured tables, deterministic naming, reusable exports, screenshots.
Avoid:
- implementation assumptions, backend assumptions, business analysis.

---

# AUDIT AND RESUME TASK (FIRST ACTION)

Start exactly in this order:

1. **AUDIT:** Read the local `/figma` directory to understand what was successfully extracted in the previous runs. Assume the project is identical even if the URL provided below has changed.
2. **IDENTIFY GAPS:** Create a checklist in your internal scratchpad of what is missing (e.g., "Missing screenshots for Dashboard", "Missing frame metadata for Settings").
3. **TARGETED EXTRACTION:** Using the Figma URL provided below, make highly specific MCP calls ONLY targeting the identified missing data.
4. **PERSIST:** Save the new data incrementally without overwriting the valid existing data.

previous Figma Project URL: https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=0-1&m=dev&t=1DQusZ2QFcefCDLZ-1
update figma project url: https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=0-1&m=dev