const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const ROOT = path.resolve(__dirname, '..');
const ANSI = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
  'brightBlack', 'brightRed', 'brightGreen', 'brightYellow', 'brightBlue', 'brightMagenta', 'brightCyan', 'brightWhite'];
const UI = {
  editorBackground: 'editor.background', editorForeground: 'editor.foreground',
  surface: 'sideBar.background', secondaryText: 'tab.inactiveForeground',
  border: 'sideBar.border', accent: 'activityBar.foreground', focus: 'focusBorder',
  cursor: 'editorCursor.foreground', selectionOverlay: 'editor.selectionBackground',
  error: 'editorError.foreground', warning: 'editorWarning.foreground', info: 'editorInfo.foreground',
  terminalBackground: 'terminal.background', terminalForeground: 'terminal.foreground',
  terminalCursor: 'terminalCursor.foreground', terminalSelectionOverlay: 'terminal.selectionBackground',
};
const SCOPES = {
  comment: 'comment', keyword: 'keyword', function: 'entity.name.function',
  variable: 'variable', parameter: 'variable.parameter', string: 'string',
  stringQuote: 'punctuation.definition.string', number: 'constant.numeric',
  constant: 'variable.other.constant.ts', self: 'variable.language', regexp: 'string.regexp',
  type: 'entity.name.type', punctuation: 'punctuation.section.braces',
  operator: 'keyword.operator', decorator: 'meta.decorator', tag: 'entity.name.tag',
  attribute: 'entity.other.attribute-name',
};

function blend(overlay, background) {
  assert.match(overlay, /^#[\da-f]{6}([\da-f]{2})?$/i);
  assert.match(background, /^#[\da-f]{6}$/i);
  const alpha = overlay.length === 9 ? parseInt(overlay.slice(7), 16) / 255 : 1;
  return '#' + [1, 3, 5].map(index => Math.round(
    parseInt(overlay.slice(index, index + 2), 16) * alpha
    + parseInt(background.slice(index, index + 2), 16) * (1 - alpha),
  ).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function buildScheme(variant) {
  const { ui, ansi } = variant;
  const scheme = {
    name: variant.name, background: ui.terminalBackground, foreground: ui.terminalForeground,
    cursorColor: ui.terminalCursor, selectionBackground: ui.terminalSelectionBackground,
  };
  for (const key of ANSI) {
    // Windows Terminal calls ANSI magenta "purple"; this does not change its RGB value.
    scheme[key.replace('magenta', 'purple').replace('Magenta', 'Purple')] = ansi[key];
  }
  assertScheme(scheme);
  return scheme;
}

function assertScheme(scheme) {
  const expected = ['name', 'background', 'foreground', 'cursorColor', 'selectionBackground',
    ...ANSI.map(key => key.replace('magenta', 'purple').replace('Magenta', 'Purple'))];
  assert.deepEqual(Object.keys(scheme).sort(), expected.sort(), 'Unexpected or missing Windows Terminal scheme fields');
  assert.ok(typeof scheme.name === 'string' && scheme.name.length, 'Missing scheme name');
  for (const [key, value] of Object.entries(scheme)) {
    if (key !== 'name') assert.match(value, /^#[\da-f]{6}$/i, `${key} must be opaque #RRGGBB`);
  }
  assert.notEqual(scheme.selectionBackground.toUpperCase(), scheme.background.toUpperCase(), 'Selection must differ from background');
}

function createArtifacts(root = ROOT) {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const variants = {};
  for (const entry of pkg.contributes.themes) {
    const source = entry.path.replace(/^\.\//, '');
    const theme = JSON.parse(fs.readFileSync(path.join(root, source), 'utf8'));
    const id = theme.type === 'light' ? 'light' : source.includes('dark-mastered') ? 'mastered' : 'sign';
    assert.ok(!variants[id], `Duplicate variant ${id}`);
    const ui = Object.fromEntries(Object.entries(UI).map(([key, color]) => {
      assert.ok(theme.colors[color], `Missing source color ${color}`);
      return [key, theme.colors[color]];
    }));
    ui.selectionBackground = blend(ui.selectionOverlay, ui.editorBackground);
    ui.terminalSelectionBackground = blend(ui.terminalSelectionOverlay, ui.terminalBackground);
    const ansi = Object.fromEntries(ANSI.map(key => [key, theme.colors['terminal.ansi' + key[0].toUpperCase() + key.slice(1)]]));
    const syntax = Object.fromEntries(Object.entries(SCOPES).map(([key, scope]) => {
      const settings = theme.tokenColors.find(rule => rule.scope.includes(scope))?.settings;
      assert.ok(settings?.foreground, `Missing syntax scope ${scope}`);
      return [key, { foreground: settings.foreground, bold: !!settings.fontStyle?.includes('bold'), italic: !!settings.fontStyle?.includes('italic') }];
    }));
    const property = theme.semanticTokenColors.property;
    syntax.property = typeof property === 'string'
      ? { foreground: property, bold: false, italic: false }
      : { foreground: property.foreground, bold: !!property.bold, italic: !!property.italic };
    variants[id] = { name: entry.label, appearance: theme.type, source, ui, syntax, ansi };
  }
  const palette = { formatVersion: 1, name: 'Ultra Instinct', sourceVersion: pkg.version, license: pkg.license, variants };
  const json = data => JSON.stringify(data, null, 2) + '\n';
  const artifacts = new Map([['palettes/ultra-instinct.json', json(palette)]]);
  const schemes = Object.values(variants).map(buildScheme);
  for (const [index, id] of Object.keys(variants).entries()) {
    artifacts.set(`ports/windows-terminal/ultra-instinct-${id}.json`, json(schemes[index]));
  }
  artifacts.set('ports/windows-terminal/schemes.json', json(schemes));
  artifacts.set('ports/windows-terminal/ultra-instinct.fragment.json', json({ schemes }));

  const ids = ['sign', 'mastered', 'light'];
  const table = (roles, get) => '| Role | Sign | Mastered | Mastered Light |\n|---|---|---|---|\n'
    + roles.map(role => '| ' + role + ' | ' + ids.map(id => '`' + get(variants[id], role) + '`').join(' | ') + ' |').join('\n') + '\n';
  artifacts.set('palettes/colors.md', '# Palette reference\n\nGenerated from the VS Code theme sources (v' + pkg.version + '). Regenerate with `npm run generate:ports`.\n\n## Interface roles\n\n'
    + table([...Object.keys(UI), 'selectionBackground', 'terminalSelectionBackground'], (variant, role) => variant.ui[role])
    + '\n## Syntax roles\n\n' + table([...Object.keys(SCOPES), 'property'], (variant, role) => variant.syntax[role].foreground)
    + '\n## ANSI roles\n\n' + table(ANSI, (variant, role) => variant.ansi[role]));
  return artifacts;
}

function run(check) {
  const artifacts = createArtifacts();
  for (const [file, content] of artifacts) {
    const destination = path.join(ROOT, file);
    if (check) {
      assert.ok(fs.existsSync(destination), `Missing ${file}; run npm run generate:ports`);
      assert.equal(fs.readFileSync(destination, 'utf8'), content, `Stale ${file}; run npm run generate:ports`);
    } else {
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, content);
    }
  }
  console.log(`${check ? 'Verified' : 'Generated'} palette, reference tables, three Windows Terminal schemes, bundle, and scheme-only fragment.`);
}

module.exports = { blend, buildScheme, assertScheme, createArtifacts };
if (require.main === module) run(process.argv.includes('--check'));
