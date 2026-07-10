<p align="center">
  <img src="https://raw.githubusercontent.com/juanlias/ultra-instinct-theme/master/images/ui-theme-banner.png" alt="Ultra Instinct Theme Banner" width="100%">
</p>

<h1 align="center">Ultra Instinct Theme</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-5228c2?style=flat-square" alt="Version">
  <a href="https://marketplace.visualstudio.com/items?itemName=JuanLias.ultra-instinct-theme">
    <img src="https://vsmarketplacebadges.dev/installs-short/JuanLias.ultra-instinct-theme.svg?style=for-the-badge&label=VS%20Marketplace&color=5228c2&logo=visualstudiocode&logoColor=white&prefix=%2B" alt="VS Marketplace Installs">
  </a>
  &nbsp;
  <a href="https://open-vsx.org/extension/JuanLias/ultra-instinct-theme">
    <img src="https://img.shields.io/open-vsx/dt/JuanLias/ultra-instinct-theme?style=for-the-badge&label=Open%20VSX&color=7B42FF&logo=vscodium&logoColor=white" alt="Open VSX Downloads">
  </a>
  <a href="https://github.com/juanlias/ultra-instinct-theme/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-0D9488?style=flat-square&logo=github&logoColor=white" alt="License">
  </a>
</p>

<p align="center">
  <sub>Works on &nbsp;<b>VS Code</b> · <b>Cursor</b> · <b>Windsurf</b> · <b>VSCodium</b></sub>
</p>

<p align="center">
  <b>Sensory-first theme. less noise, more focus</b>
  <br>
  A 443-color-key theme trilogy for VS Code, Cursor, Windsurf & every fork. Built to eliminate cognitive noise — the interface disappears and your instincts take over.
  <br><br>
  <a href="https://ultrainstincttheme.com"><b>ultrainstincttheme.com →</b></a>
</p>

<br>

---

## Table of Contents

- [Why I Built This](#why-i-built-this)
- [Features](#features)
- [Variants](#variants)
- [AI Editor Support](#ai-editor-support)
- [Language Support](#language-support)
- [Installation](#installation)
- [Recommended Configuration](#recommended-configuration)
- [Accessibility](#accessibility)
- [Author](#author)
- [Contributing](#contributing)
- [License](#license)

---

## Why I Built This

I have Autism and High Potential, and I built this theme for everyone.

Most themes overwhelm me — too many borders, too many colors screaming for attention. I couldn't find one that just shuts up and lets me see the code. So I designed Ultra Instinct from a neurodivergent lens: reduce visual entropy until only the code remains. Every color, every contrast level, every border was chosen to minimize cognitive noise. This is sensory-first design.

The result is just less noise and more focus — and that works for any brain.

---

## Features

| Category | Detail |
|---|---|
| **Color coverage** | **443 color keys** per variant — one of the most exhaustive themes available |
| **3 variants** | Sign (raw, electric), Mastered (calm, divine), Mastered Light (sharp, clean) |
| **Cursor Agent** | `progressBar`, `chat.*`, `inlineChat.*`, `interactive.*`, `diffEditor.*`, `terminal.*` — full Agent UI themed |
| **6 bracket levels** | `editorBracketHighlight.foreground1-6` with distinct accent-gradient colors |
| **33 icon colors** | `symbolIcon.*` differentiated by semantic type — breadcrumbs and outline never looked better |
| **16 ANSI terminal colors** | Custom-mapped to each variant's palette |
| **All languages** | 25 generic TextMate rules + 21 semantic tokens. 8 languages with extra precision scopes |
| **Semantic highlighting** | Full `semanticTokenColors` for TypeScript, Rust, Python, Go, and more |
| **Sticky scroll** | Themed headers when scrolling through long files |
| **Notebooks** | Full notebook UI coverage including status icons |
| **Welcome page** | Even the empty-workspace screen matches your theme |
| **WCAG 2.1 AA** | Main text and syntax highlighting exceed 4.5:1 contrast ratio |

---

## Variants

### Ultra Instinct Sign

Electric blue on deep charcoal (`#0d1017`). Raw and intense — built for debugging and diving into unfamiliar codebases.

![Ultra Instinct Sign](https://raw.githubusercontent.com/juanlias/ultra-instinct-theme/master/images/ultra-instinct-theme--mastered-sign.png)

### Ultra Instinct Mastered

Purple and silver on dark void (`#141118`). My daily driver, and the one most people stick with. Calm and legible, built for long sessions without eye fatigue.

![Ultra Instinct Mastered](https://raw.githubusercontent.com/juanlias/ultra-instinct-theme/master/images/ultra-instinct-theme--mastered.png)

### Ultra Instinct Mastered Light

Silver backgrounds with purple accents. For bright rooms, presentations, or when you want something different.

![Ultra Instinct Mastered Light](https://raw.githubusercontent.com/juanlias/ultra-instinct-theme/master/images/ultra-instinct-theme--mastered-light.png)

---

## AI Editor Support

Ultra Instinct is built from the ground up for AI-assisted coding. These editors are fully themed:

<p>
  <img src="https://img.shields.io/badge/VS_Code-Ready-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code">
  &nbsp;
  <img src="https://img.shields.io/badge/Cursor-Agent_Ready-7B42FF?style=for-the-badge&logo=cursor&logoColor=white" alt="Cursor">
  &nbsp;
  <img src="https://img.shields.io/badge/Windsurf-Ready-00E5FF?style=for-the-badge" alt="Windsurf">
  &nbsp;
  <img src="https://img.shields.io/badge/VSCodium-Ready-2F80ED?style=for-the-badge&logo=vscodium&logoColor=white" alt="VSCodium">
</p>

**Themed AI surfaces:**

- **Agent progress** — `progressBar` styled with the theme accent
- **Inline chat** (`Cmd+K` / `Ctrl+K`) — background, border, input field, focus border, shadow, result pane
- **Tab predictions** — inline suggestion background and foreground
- **Interactive code regions** — active (being edited) and inactive (accepted) AI-modified code highlights
- **Chat panel** — request bubbles, slash commands, avatars, file-edit badges
- **Agent windows** — panel backgrounds, borders, and terminal output

---

## Language Support

**Every language looks great out of the box.** 25 generic TextMate rules handle keywords, strings, numbers, functions, types, operators, braces, and comments across all languages. 21 semantic tokens provide fine-grained highlighting for TypeScript, Rust, Python, Go, Java, C++, C#, and any language with an LSP.

Additionally, 8 languages receive targeted scopes for maximum precision:

| Language | Extra Precision |
|---|---|
| **TypeScript / JavaScript** | Constants (`UPPER_CASE`), type annotations, builtin types |
| **Python** | Logical operators (`and`, `or`, `not`, `in`, `is`), builtin functions |
| **Rust** | Storage types, attributes (`#[...]`), macros, lifetimes, metavariables |
| **YAML** | Keys, values, booleans, nulls, timestamps, punctuation |
| **Shell / Bash** | Builtins, control flow (`if`, `for`, `while`), variable definitions |
| **Markdown** | H1-H6 headings (differentiated by brightness), list bullets, blockquotes |
| **JSON** | Structure keys with distinct color from string values |
| **CSS** | Selectors, class names, IDs, property names |

---

## Installation

Works on VS Code, Cursor, Windsurf, VSCodium, and all VS Code-based editors.

**Via your editor's Extensions panel:**

1. Open Extensions (`Ctrl+Shift+X`)
2. Search `Ultra Instinct Theme`
3. Click Install
4. Select your variant: `Sign`, `Mastered`, or `Mastered Light`

**Via command line:**

```bash
code --install-extension JuanLias.ultra-instinct-theme
```

**On Open VSX (VSCodium / Windsurf):**

```bash
# Install via Open VSX
codium --install-extension JuanLias.ultra-instinct-theme
```

---

## Recommended Configuration

Add this to your `settings.json` to get the intended experience:

```json
{
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.renderLineHighlight": "gutter",
  "editor.renderWhitespace": "all",

  // Recommended typography
  "editor.fontFamily": "'Cascadia Code NF', 'Fira Code', monospace",
  "editor.fontLigatures": true
}
```

> **Bracket pair colorization is optional.** The theme includes 6 distinct bracket highlight colors (`editorBracketHighlight.foreground1-6`). Enable VS Code's built-in bracket pair colorization for an additional rainbow effect, or disable it to use the theme's own carefully tuned punctuation tones. Both work great.

---

## Accessibility

Good contrast isn't a feature — it's the baseline. Main text and syntax highlighting exceed 4.5:1 contrast ratio, and every color was chosen to reduce eye strain during long sessions.

Ancillary text like code lens and ghost suggestions uses reduced opacity by design — visible when you need it, invisible when you don't.

If something is hard to read, [open an issue](https://github.com/juanlias/ultra-instinct-theme/issues). Accessibility is a conversation, not a checkbox.

---

## Author

<p align="center">
  <img src="https://github.com/juanlias.png" width="64" style="border-radius: 50%;">
  <br>
  <b><a href="https://juanlias.com">Juan Lias</a></b>
  <br>
  Product Design Engineer
</p>

<p align="center">
  <a href="https://github.com/juanlias">
    <img src="https://img.shields.io/badge/GitHub-Juan%20Lias-181717?style=flat-square&logo=github" alt="GitHub">
  </a>
  <a href="https://juanlias.com">
    <img src="https://img.shields.io/badge/Portfolio-juanlias.com-5228c2?style=flat-square" alt="Portfolio">
  </a>
  <a href="mailto:hello@ultrainstincttheme.com">
    <img src="https://img.shields.io/badge/Email-hello@ultrainstincttheme.com-0D9488?style=flat-square" alt="Email">
  </a>
</p>

---

## Contributing

Found a missing color key? Want to add language support? [Open an issue](https://github.com/juanlias/ultra-instinct-theme/issues) or submit a pull request. Theme files live in `themes/` — one JSON file per variant.

All three variants must maintain key parity. When adding a new color key, add it to all three files.

---

## License

[MIT](LICENSE) © Juan Lias

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/juanlias/ultra-instinct-theme/master/images/icon.png" alt="Ultra Instinct Theme Icon" width="80">
</p>
