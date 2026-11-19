# Local theme review

Run `npm run validate` from the repository root. No dependency installation is required. The validator checks contributed theme files, color formats, UI/semantic/scope parity, syntax contrast against the base editor background, helper text against its configured surface, terminal foregrounds (except ANSI black), bracket text, active guide visibility, keyboard focus contrast, diagnostic consistency, selection/search differentiation, and Git color consistency. Transparent helper backgrounds are composited over the base editor background. It does not certify WCAG compliance or replace visual review of blended backgrounds and editor behavior.

Launch a separate VS Code development window against this checkout:

```powershell
code --new-window --extensionDevelopmentPath="$PWD" "$PWD"
```

Select each of the three Ultra Instinct variants with **Preferences: Color Theme**. If the installed release is also enabled, disable it in the development window so the theme names are unambiguous. Check for existing `workbench.colorCustomizations` and `editor.tokenColorCustomizations` overrides before evaluating the palette.

Use the files under `samples/` to review:

1. Commas, operators, string quotes, YAML colons, and Shell `$` sigils at your usual font size.
2. Function calls with nested arguments, constants, decorators, and headings. Functions, methods, builtins, numbers, constants, CSS classes, keywords, and headings retain emphasis. Decorators and Rust attributes use normal weight. Check that arguments retain their own styling instead of inheriting emphasis from the entire function-call region.
3. TSX and Python with `editor.semanticHighlighting.enabled` set to `true` and then `false`. Use **Developer: Inspect Editor Tokens and Scopes** to investigate unexpected colors. Semantic providers can distinguish more categories than TextMate grammars; the two views need consistent roles, not pixel-identical output.
4. A selected word and its other occurrences; then Find with multiple matches. The current search match should have a stronger fill and border than other matches. Check selected syntax for legibility because the automated contrast check uses the base background.
5. Added, modified, and deleted lines in Source Control, the gutter, overview ruler, and diff editor. Use existing working changes or temporary files; no commit is needed.
6. Editor and terminal cursors. Mastered uses `#A78BFA` for both. Check visibility while typing, selecting text, and moving across strings.
7. Light in a bright room and dark variants in your normal lighting. Check inactive tabs, diagnostics, terminal ANSI colors, and focus indicators as well as code.

The files are visual fixtures, not an application to build. TSX intentionally has no React dependency setup. Syntax, JSX, Python, and other semantic results depend on the language extensions installed in the editor.

## Focus, diagnostics, and assistance

The repository workspace enables `"editor.renderLineHighlight": "all"`. Apply the same setting in other workspaces or user settings to include the line number in the active-line border. Move between lines and check that the gutter and code share the border, and that the active number remains legible. A nonempty selection can change how the code-side highlight is drawn; test that state too.

- Open split editors and switch between them. The focused group's active tab has an accent title and top border; the inactive group's active tab uses secondary text. Navigate Explorer and inputs with the keyboard to check focus outlines.
- Open `samples/diagnostics.ts` to inspect intentional errors, unused-code hints, and deprecated text. Compare squiggles with Problems icons, notification severity, and overview markers. Warning availability depends on the language provider; also use warnings from a real project.
- In `samples/preview.tsx`, invoke completions and parameter hints, move the selection, and hover a function. Check normal matches, selected matches, documentation, and active parameters. Enable language inlay hints to inspect their small text.
- With an inline completion provider installed, compare a pending suggestion with the code after accepting it. In editors that support `interactive.*` colors, compare active and inactive AI edit regions. A theme only supplies colors for UI exposed by the editor/provider.
- Open `samples/brackets.json`, enable bracket pair colorization and guides, and move through all six nesting levels. Inactive guides should remain subtle.
- Optionally run `bash samples/terminal.sh` to print all 16 ANSI colors and common background/reverse-video combinations. ANSI black intentionally remains dark for programs using it as a background; inspect custom color pairs visually.
- Use Source Control diffs to check inserted/deleted text and unchanged-region labels. Highlight overlays can change syntax contrast; verify representative lines rather than relying solely on the base-background check.

Color-key meanings are checked against the [VS Code Theme Color reference](https://code.visualstudio.com/api/references/theme-color). Availability of individual surfaces depends on editor version and fork.

## Coverage notes

The extension contributes Sign, Mastered, and Mastered (Light). Each currently defines 468 interface colors, 50 TextMate rules, and 21 semantic token entries. These counts describe the theme files; an editor may not use every key.

TextMate rules cover shared syntax categories and include targeted scopes for:

| Language or grammar | Targeted details |
|---|---|
| TypeScript / JavaScript | Constant scopes and builtin types |
| Python | Word-like operators and builtin functions |
| Rust | Storage types, attributes, macros, lifetimes, and metavariables |
| YAML | Keys, plain values, booleans, nulls, timestamps, and separators |
| Shell / Bash | Builtins, control flow, variables, and variable sigils |
| Markdown | Headings, list markers, quotes, and inline formatting |
| JSON | Object keys distinguished from string values |
| CSS | Selectors, classes, IDs, and property names |

A language extension must emit matching TextMate scopes or semantic tokens for the corresponding rules to apply. A language server alone does not guarantee semantic highlighting. Use **Developer: Inspect Editor Tokens and Scopes** to identify the rule that controls a token.

AI-related definitions include inline ghost text, chat inputs and messages, progress bars, file-edit indicators, and interactive code regions. Their presence and behavior vary by editor, provider, and version. In particular, the theme supplies active/inactive interactive-region colors; the editor determines which workflow states use them.
