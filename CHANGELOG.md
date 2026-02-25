# Change Log

All notable changes to the "ultra-instinct-theme" extension will be documented in this file.

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
