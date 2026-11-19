# README variant previews

The three `images/ultra-instinct-*-preview.png` files contain real VS Code captures of `samples/readme/focus.ts`, with the local extension loaded in an independent development profile. They share the same code, scroll position, active line, font settings, and layout. They are not generated editor mockups.

Capture setup:

- Native window capture: 1442 × 901 pixels.
- Font: `'Cascadia Code NF', Consolas, monospace`, 18 px; line height 26 px; ligatures enabled.
- Semantic highlighting enabled; minimap, breadcrumbs, and the secondary sidebar hidden.
- `editor.renderLineHighlight`: `all`; bracket pair colorization enabled; bracket pair guides: `active`.
- Cursor at line 11, column 55. No selection or hover popup.
- Explorer width: 210 px. Keep the pointer over the Explorer so it is outside the exported editor area.

Export unmodified native captures as `sign.png`, `mastered.png`, and `light.png` in a separate working directory. With Python and Pillow available, run:

```text
python scripts/frame-readme-images.py PATH_TO_RAW_CAPTURES
```

The script crops the editor area, removing the title bar, sidebar, status bar, and excess space. It adds a consistent header and footer, without rescaling or recoloring the captured code. Output images are 1240 × 1030 pixels. The crop assumes the capture dimensions above; adjust it if you change the window layout.

The original older screenshots remain in `images/`. Refresh these previews after theme changes that affect the visible code or interface.

## Header banner

`images/ultra-instinct-readme-banner.png` is a 1600 × 600 header with the project name, existing aura logo from `images/icon.png`, sensory-first message, and a native-resolution excerpt from the Mastered capture. Its code is neither recolored nor rescaled. The small blue, violet, and silver accents connect the three variants without using character artwork or replacing the extension icon.

Regenerate it with:

```text
python scripts/create-readme-banner.py PATH_TO_RAW_MASTERED_PNG
```

The older `images/ui-theme-banner.png` is preserved.
