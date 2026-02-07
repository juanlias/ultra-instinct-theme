<p align="center">
  <img src="https://raw.githubusercontent.com/juanlias/ultra-instinct-theme/master/images/ui-theme-banner.png" alt="Ultra Instinct Theme Logo" width="100%">
</p>

<h1 align="center">Ultra Instinct Theme</h1>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=JuanLias.ultra-instinct-theme">
    <img src="https://img.shields.io/visual-studio-marketplace/v/JuanLias.ultra-instinct-theme?style=flat-square&label=Version&color=5228c2" alt="Version">
  </a>

  <a href="https://github.com/juanlias/ultra-instinct-theme/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-0D9488?style=flat-square&logo=github&logoColor=white" alt="License">
  </a>
</p>

<p align="center">
  A high-contrast, distraction-free theme designed for the <b>Flow State</b>.
  <br>
  Built to eliminate cognitive noise through "The Void Protocol," allowing your instincts to take over.
</p>

<br>

## The Origin (Neurodivergent Design)

This isn't just another dark theme.

I built **Ultra Instinct** because standard themes were too noisy for my brain. As a product designer/developer with Autism and High Potential, I experience code differently. Every unnecessary border, every bright icon, and every jarring contrast break my focus.

I needed a Void. A place where the interface disappears, and only the logic remains.
This trilogy is my personal tool for achieving **Hyperfocus**. Now, it's yours.

---

## Themes

### 1. Ultra Instinct Sign

- **Aesthetic:** Unstable, Raw, Intense.
- **Palette:** Electric Blue & Indigo accents on a Deep Charcoal Void (`#0d1017`).
- **Use Case:** High-intensity debugging and exploring new codebases.

### 2. Ultra Instinct Mastered

- **Aesthetic:** Divine, Calm, Perfected.
- **Palette:** Royal Purple & Silver accents on a balanced Dark Void (`#141118`).
- **Use Case:** My daily driver. Balanced and serene.

### 3. Ultra Instinct Mastered Light

- **Aesthetic:** Clean, Sharp, Absolute.
- **Palette:** Divine Silver backgrounds with Aura Purple accents.
- **Use Case:** Well-lit environments, presentations, and recording.

---

## Installation

1.  Open **Extensions** sidebar in VS Code.
2.  Search for `Ultra Instinct Theme`.
3.  Click **Install**.
4.  Select your state: `Sign` or `Mastered`.

**Or via command line:**

```bash
code --install-extension JuanLias.ultra-instinct-theme
```

---

## The Void Protocol (Configuration)

To achieve the intended "clean" aesthetic and prevent "Rainbow Brackets" from breaking the immersion, add this to your `settings.json`:

```json
{
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.renderLineHighlight": "gutter",
  "editor.renderWhitespace": "all",

  // Critical: Disable native rainbow brackets
  "editor.bracketPairColorization.enabled": false,
  "editor.guides.bracketPairs": false,

  // Recommended Typography
  "editor.fontFamily": "'Cascadia Code NF', 'Fira Code', monospace",
  "editor.fontLigatures": true
}
```

---

## Accessibility & Standards

I believe high-performance coding shouldn't come at the cost of sensory overload or eye strain.

- **Sensory Friendly:** Specifically tuned to reduce visual overstimulation.
- **WCAG 2.1 AA Compliant:** Contrast ratios exceed 4.5:1 for all text elements.
- **Reduced Blue Light:** The "Sign" theme uses a specific charcoal base (`#0d1017`) designed to minimize retinal fatigue during night sessions.

---

## Author

**[Juan Lias](https://github.com/juanlias)**
<br>
_Product Design Engineer_

<p>
  <a href="https://github.com/juanlias">
    <img src="https://img.shields.io/badge/GitHub-Juan%20Lias-181717?style=flat-square&logo=github" alt="GitHub">
  </a>
  <a href="https://juanlias.com">
    <img src="https://img.shields.io/badge/Portfolio-Product%20Design-5228c2?style=flat-square&logo=figma&logoColor=white" alt="Portfolio">
  </a>
</p>

---

## License

[MIT](LICENSE) © Juan Lias

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/juanlias/ultra-instinct-theme/master/images/icon.png" alt="Ultra Instinct Theme Icon" width="100">
</p>
