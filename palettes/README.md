# Ultra Instinct palette

Three related palettes for a quiet interface, readable syntax, and visible focus: **Sign**, **Mastered**, and **Mastered (Light)**.

- [Reusable JSON](ultra-instinct.json)
- [Color reference](colors.md)
- [Windows Terminal port](../ports/windows-terminal/README.md)

## Using the palette

`ultra-instinct.json` contains named variants with interface roles, syntax roles, and all 16 ANSI colors. It includes the source theme path, source extension version, and a `formatVersion` for the interchange format.

```javascript
const palette = require('./ultra-instinct.json');
const mastered = palette.variants.mastered;

const background = mastered.ui.editorBackground;
const focus = mastered.ui.focus;
const cursor = mastered.ui.cursor;
const functionColor = mastered.syntax.function.foreground;
const terminalMagenta = mastered.ansi.magenta;
```

## Design roles

- **Accent** identifies the palette. **Focus** identifies the active control or position; they may use different shades.
- **Foreground** carries primary text; **secondaryText** supports quieter labels and inactive tabs.
- **Syntax** preserves useful emphasis on functions, numbers, and constants. A port should map roles to its own grammar or semantic categories.
- **Error**, **warning**, and **info** keep their diagnostic meanings.
- **ANSI** preserves the standard terminal color ordering. An app calling magenta “purple” should keep the same RGB value.

`selectionOverlay` and `terminalSelectionOverlay` retain VS Code's `#RRGGBBAA` values. Their corresponding `selectionBackground` values are opaque colors composited over the relevant base background for apps that require `#RRGGBB`.

Keep these functional relationships when adapting the palette. App rendering, selection behavior, font weights, and available theme roles differ; an adaptation still needs visual review.

## Maintaining the palette

The files in `themes/` remain the source of truth. Change colors there, then run from the repository root:

```text
npm run generate:ports
npm run validate
npm run validate:ports
```

The generator updates this JSON, the color reference, and Windows Terminal exports together. `sourceVersion` tracks the source extension; it is not a separate Windows Terminal package release. Generated files should be regenerated rather than edited independently.

Palettes and ports use the repository's [MIT license](../LICENSE).
