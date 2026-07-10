# Change Log

All notable changes to the "ultra-instinct-theme" extension will be documented in this file.

## [1.0.1]

### Changed

- Updated extension description and README copy to reflect sensory-first design messaging

## [1.0.0]

### Added

- **78 new color keys** (330 → 443 across all three variants), bringing exhaustive coverage to every corner of the UI.
- **Cursor-native AI editor support:**
  - `inlineChat.*` (background, border, foreground) — styled inline chat popover
  - `inlineChatInput.*` (background, border, foreground, placeholder) — composer input
  - `interactive.*` (active/inactive code background + border) — AI-modified code regions
  - `editor.inlineSuggest.*` (background, foreground) — Tab completions
  - `editorGhostText.background` / `editorGhostText.border` — ghost text regions
  - `chat.requestForeground` / `chat.editedFileForeground` — chat messages & file edit badges
- **`editor.lineHighlightBackground` & `editor.lineHighlightBorder`** — active line highlight (previously mentioned in v0.1.2 changelog but was never actually present in the theme files). Subtle accent glow with a solid border.
- **Sticky scroll:** `editorStickyScroll.background`, `.border`, `.shadow`, `editorStickyScrollHover.background`
- **Notebooks (8 new keys):** `notebook.editorBackground`, `.focusedEditorBorder`, `.outputContainerBackground`, `.symbolHighlightBackground`, `.selectedCellBackground`, and status icons (error, running, success)
- **Welcome page (8 keys):** `welcomePage.background`, `.tileBackground`, `.tileHoverBackground`, `.tileBorder`, progress and button colors
- **Extension buttons (7 keys):** `extensionButton.*` (prominent, standard, hover, separator)
- **Keybinding labels (4 keys):** `keybindingLabel.*` (background, foreground, border, bottomBorder)
- **Tab hover (3 keys):** `tab.hoverBackground`, `tab.hoverForeground`, `tab.unfocusedHoverBackground`
- **Editor quality-of-life:** `editor.linkedEditingBackground`, `editorSuggestWidget.selectedForeground`, `editorSuggestWidgetStatus.foreground`, `editorHoverWidget.foreground` / `statusBarBackground`, `simpleFindWidget.sashBorder`
- **Panel & drag-drop:** `panelSection.border` / `dropBackground`, `editorGroup.dropBackground`, `editorGroup.dropIntoPrompt*` (foreground, background, border)
- **Diff editor borders:** `diffEditor.insertedTextBorder`, `removedTextBorder`, `move.border`, `moveActive.border`
- **Toolbar completion:** `toolbar.inactiveBackground`, `toolbar.hoverOutline`
- **Text blocks for chat/panel:** `textBlockQuote.*`, `textPreformat.*`, `textSeparator.foreground`
- **Walkthrough:** `walkThrough.embeddedEditorBackground`
- **Terminal cursor:** `terminalCursor.foreground`, `terminalCursor.background`, `terminal.border`
- **Debug console (5 keys):** `debugConsole.errorForeground`, `.infoForeground`, `.sourceForeground`, `.warningForeground`, `debugConsoleInputIcon.foreground`
- **Inline chat (5 keys):** `inlineChat.shadow`, `inlineChatInput.focusBorder`, `inlineChatInputResult.background`, `.border`, `.foreground`
- **Editor (5 keys):** `editor.foldBackground`, `editor.symbolHighlightBackground`, `editor.onTypeRenameBackground`, `editor.lineNumber.dimmedForeground`, `editor.dragAndDropBackground`
- **Dropdown (4 keys):** `dropdown.background`, `.border`, `.foreground`, `.listBackground`
- **Diff unchanged regions:** `diffEditor.unchangedRegionBackground`, `diffEditor.unchangedRegionForeground`
- **Banners (3 keys):** `banner.background`, `banner.foreground`, `banner.iconForeground`
- **Notebook borders (5 keys):** `notebook.inactiveFocusedCellBorder`, `.inactiveSelectedCellBorder`, `.selectedCellBorder`, `.outputContainerBorder`, `.rowHoverBackground`
- **Other:** `selection.background`, `ports.iconRunningProcessForeground`
- **Agent progress:** `progressBar.background` — styled with theme accent for Cursor Agent operations

### Changed

- **33 symbol icons** (`symbolIcon.*`) now differentiated semantically by type — class purple, function white, variable cyan, keyword bold, string blue, number accent, etc. — visible in breadcrumbs, outline, and the Cursor symbol navigator.
- **Bracket highlights** (`editorBracketHighlight.foreground1-6`) now use 6 distinct colors with a gradient from the theme accent — bracket nesting is visually distinguishable without relying on VS Code's built-in bracket pair colorization.
- **Bracket pair guides** (`editorBracketPairGuide.activeBackground1-6`) now use progressive opacities (6% → 30%) instead of identical values.
- **Ghost text contrast** improved (`#606080` → `#8080A0` for dark themes, `#64748B` → `#94A3B8` for light).
- **Overview ruler background** no longer identical to sidebar background — annotations are now distinguishable against the sidebar.
- **Recommended configuration updated** — bracket pair colorization is now optional. The theme's own 6-level bracket highlights work with or without it.

### Fixed

- **`peekViewResult.lineForeground`** in Mastered variant: was `#DCE0E5AA` (8-character hex RGBA). Normalized to `#8080A0` (6-character hex) for consistency across all variants.
- **Light variant `tokenColors` ordering:** `punctuation.definition.string` was at index 49 (end of array) instead of position ~7 like the dark variants. Moved to correct position to ensure consistent scope resolution.

### Removed

(none)

## [0.1.6]

### Fixed

- **README Badge**: Switched VS Marketplace installs badge from shields.io (rate-limited) to `vsmarketplacebadges.dev` for reliable display on Marketplace and Open VSX listings.

## [0.1.5]

### Added

- **Editor Gutter Git Decorations**: All three themes now have explicit `editorGutter.addedBackground`, `modifiedBackground`, and `deletedBackground` colors — green/accent/red bars on changed lines are fully themed.
- **Overview Ruler Annotations**: Added 10 `editorOverviewRuler.*` keys (errors, warnings, info, git changes, find matches, word/selection highlights, bracket match) for all variants.
- **Semantic Token Colors**: Introduced a full `semanticTokenColors` section to all three themes, enabling modern semantic highlighting for TypeScript, Rust, Python, Go and more (namespace, type, class, interface, struct, enum, typeParameter, parameter, variable, property, enumMember, function, method, macro, decorator, regexp, operator, selfKeyword).
- **New Language Token Scopes**: Extended `tokenColors` with targeted rules for:
  - **Operators** — generic and language-specific (`assignment`, `arithmetic`, `comparison`, `logical`, `spread`, `accessor`)
  - **Regex** — `string.regexp`, quantifiers, character classes, escape sequences
  - **YAML** — keys, values, booleans, nulls, timestamps, punctuation
  - **Shell / Bash** — builtins, control flow, variable definitions
  - **Markdown** — H1–H6 headings differentiated by brightness, list bullets, blockquotes
  - **Python** — logical keyword operators (`and`, `or`, `not`, `in`, `is`), builtin functions
  - **TypeScript / JavaScript** — constants, type annotations, builtin types
  - **Rust** — storage types, attributes (`#[...]`), macros, lifetimes, metavariables
- **Testing UI Colors**: Added full `testing.*` color set (passed/failed/queued/skipped icons, peek border, error decorations) for all variants.
- **Command Center**: Added `commandCenter.*` keys (VS Code 1.69+) for themed command palette bar.
- **Toolbar & Sash**: Added `toolbar.hoverBackground`, `toolbar.activeBackground`, `sash.hoverBorder`.
- **Additional Git Decorations**: Added `gitDecoration.addedResourceForeground`, `renamedResourceForeground`, `stageModifiedResourceForeground`, `stageDeletedResourceForeground`.
- **Diff Editor Line Backgrounds**: Added `diffEditor.insertedLineBackground`, `removedLineBackground`, `unchangedCodeBackground` for full-line diff visibility.
- **Find Match Fill**: Added `editor.findMatchBackground` and `editor.findRangeHighlightBackground` (previously only borders were set).
- **Terminal Selection**: Added `terminal.selectionBackground` and `terminal.inactiveSelectionBackground`.
- **Code Lens & Whitespace**: Added `editorCodeLens.foreground` and `editorWhitespace.foreground`.

### Fixed

- **Mastered — `breadcrumb.background`**: Was incorrectly set to `#0d1017` (Sign's background color). Corrected to `#141118`.
- **Mastered — Peek View Match Highlights**: `peekViewEditor.matchHighlightBackground` and `peekViewResult.matchHighlightBackground` were set to `#141118` (same as background, invisible). Corrected to `#7B42FF40`.
- **Mastered — `statusBarItem.prominentBackground`**: Was set to `#141118` (invisible against dark bg). Corrected to `#7B42FF`.
- **Mastered + Light — Duplicate Token Rule**: Removed a redundant partial brace/bracket rule that was a strict subset of the full punctuation rule already present later in the array.

## [0.1.4]

### Added

- **Variant Screenshots**: Added preview screenshots for all three variants (Mastered, Sign, Mastered Light) to the README and Marketplace listing.
- **Marketplace Metadata**: Added `license`, `homepage`, `bugs`, `galleryBanner`, and `pricing` fields to `package.json` for a more complete Marketplace presence.
- **Extended Keywords**: Expanded keyword list with additional discoverability tags including `hyperfocus`, `flow state`, `accessibility`, `high contrast`, `autism`, `adhd`, `productivity`.
- **Website**: Launched [ultrainstincttheme.com](https://ultrainstincttheme.com) — official landing page with interactive code preview, variant selector, install guide, and live download counter.

### Changed

- **README Overhaul**: Restructured with cleaner sections, variant comparison screenshots, website and email badges, and improved description.
- **Engine Requirement**: Bumped minimum VS Code engine version to `^1.75.0`.
- **Description**: Rewrote the extension description to better communicate the focus-first, neurodivergent-friendly design intent.

## [0.1.3]

### Added

- **Keywords**: Added `keywords` field to `package.json` for improved discoverability on the VS Code Marketplace and Open VSX (tags: dark theme, focus, minimal, purple, neurodivergent, void, distraction-free, blue, light theme, vue, react, hyperfocus).

### Changed

- **Version bump**: Updated version to `0.1.3` in `package.json` and version badge in `README.md`.

### Fixed

- **Sign Theme Cleanup**: Removed a rogue `#FF00FF` (magenta) token rule targeting `punctuation.section.braces` and related scopes from `ultra-instinct-color-theme.json`. This color was inconsistent with the theme palette and caused magenta brackets in certain syntaxes.

## [0.1.2]

### Added

- **Next-Gen AI Editor Support**: Officially optimized for **Cursor**, **Antigravity**, and **GitHub Copilot Chat**. The AI Chat, Agent Window, and Agent Manager components now use custom panel backgrounds, borders, and avatar colors that seamlessly fit the 'Ultra Instinct' vibe instead of generic fallbacks.
- **Premium Focus Highlights**: The active code line has been refined. It now combines a subtle translucent background (15% opacity) with a solid, elegant horizontal border (40% opacity) that spans edge-to-edge. This ensures premium code tracking without washing out your text's syntax highlighting.
- **Advanced Tools UI**: Integrated over 120+ specialized UI color tokens. This provides deep, exhaustive styling for Git diffs, merge conflicts, minimaps, chart visualizations, debug configurations, and extension icons.

### Changed

- **Gutter & Tabs Polish**: Restored the default VS Code behavior for unfocused tab backgrounds and the line number gutter. This ensures the theme correctly adapts to drastic window splitting and eliminates any color bleeding.
- **Flawless Sync Architecture**: Enforced a strict 1:1 color parity structure (285 color keys, 25 token rules) across all three theme variations (`Light`, `Sign`, `Mastered`). The coding experience is now uniformly solid and bug-free across all versions.

## [0.1.1]

### Added

- **Notifications & Pop-ups**: Added custom colors for all notification toasts, centers, and icons (info/warning/error) across all three themes, replacing the default gray for a more immersive and integrated appearance.

## [0.1.0]

### Added

- **Premium Terminal Integration**: The integrated terminal now uses the theme's exact color palette (ANSI colors custom-mapped to theme accents).
- **Focus Mode**: Breadcrumbs and File Tree are dimmed/ghosted when not in use to reduce visual noise.
- **Search Glow**: Find/Replace matches now have a distinct accent-colored border for better visibility.
- **Brilliant Active Tabs**: Active tab text is now set to high-saturation "Neon" colors (Mastered `#E080FF`, Sign `#448AFF`, Light `#A855F7`) for maximum pop.

### Changed

- **Dark Mastered Overhaul**:
  - Replaced clashing Cyan (`#00EAFF`) with a harmonious Purple/Silver hierarchy.
  - Updated JSON keys, variables, and attributes to soft blue/purple.
  - Fixed Boolean/Numeric values to use the theme's accent purple (`#7B42FF`).
- **Window Focus Refinement**: Softened the `titleBar.activeForeground` across all themes to remove the harsh "white" contrast, creating a more elegant active state.
- **Active Tab Readability**: Removed the background tint from active tabs in all themes. Active state is now purely defined by the vibrant text and top border.
- **General Polish**: Unified widget borders, shadows, and list selection styles across all three themes.

## [0.0.5]

- Changed: Publisher ID back to `JuanLias` (uppercase).

## [0.0.4]

- Changed: Publisher ID to lowercase (`juanlias`) for Open VSX namespace compatibility.

## [0.0.3]

- Removed: 'Installs' badge from README due to initial display issues.

## [0.0.2]

- Fixed: Relative image paths in README.md for Marketplace compatibility.
- Fixed: Updated publisher ID to `JuanLias`.
- Added: Initial release notes.

## [0.0.1]

- Initial release
