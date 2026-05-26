# Annotations — paleta-de-colores

| Linked screenshot | [../screenshots/paleta-de-colores.md](../screenshots/paleta-de-colores.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/paleta-de-colores.md](../frames/paleta-de-colores.md) |

## Designer notes

- Brand ramps: **Azul UMSS** (#003770) and **Rojo UMSS** (#E30613).
- Sections: Rampa de azul, Rampa de rojo, Escala de grises (50–900).
- Gray ramp label "999" maps to 900 slot in export.

## Implementation hints

- Map ramps to Tailwind `blue` / `red` extensions in [`../tokens/tailwind.partial.config.js`](../tokens/tailwind.partial.config.js).
- Use semantic tokens for UI, ramps for illustrations/charts only.

## Open questions

- [ ] Verify exact hex per swatch in Dev Mode
- [ ] Dark mode ramp not documented
