// Derive the website demo from the extension's actual palette and metadata.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const entries = pkg.contributes.themes;
const ids = ['sign', 'mastered', 'light'];
const uiKeys = {
  editorBg: 'editor.background', editorFg: 'editor.foreground',
  lineNumFg: 'editorLineNumber.foreground', lineNumActive: 'editorLineNumber.activeForeground',
  tabBg: 'tab.activeBackground', tabBarBg: 'editorGroupHeader.tabsBackground',
  tabActive: 'tab.activeForeground', tabInactive: 'tab.inactiveForeground',
  cursorColor: 'editorCursor.foreground', selectionBg: 'editor.selectionBackground',
  accentBorder: 'focusBorder', statusBarBg: 'statusBar.background', statusBarFg: 'statusBar.foreground',
  activityBarBg: 'activityBar.background', activityBarFg: 'activityBar.foreground',
  sidebarBg: 'sideBar.background', sidebarFg: 'sideBar.foreground', sidebarBorder: 'sideBar.border',
  lineHighlight: 'editor.lineHighlightBackground', lineHighlightBorder: 'editor.lineHighlightBorder',
  tabInactiveBg: 'tab.inactiveBackground', titleBarBg: 'titleBar.activeBackground',
  accent: 'activityBar.foreground', accentText: 'activityBarBadge.foreground',
};
const scopes = {
  comment: 'comment', keyword: 'keyword', function: 'entity.name.function',
  variable: 'variable', string: 'string', stringQuote: 'punctuation.definition.string',
  number: 'constant.numeric', type: 'entity.name.type', parameter: 'variable.parameter',
  punctuation: 'punctuation.section.braces', decorator: 'meta.decorator',
  operator: 'keyword.operator', tag: 'entity.name.tag', attribute: 'entity.other.attribute-name',
};
const source = entries.map(entry => JSON.parse(fs.readFileSync(path.resolve(root, entry.path), 'utf8')));
const themes = Object.fromEntries(source.map((theme, index) => {
  const tokens = Object.fromEntries(Object.entries(scopes).map(([key, scope]) => {
    const settings = theme.tokenColors.find(rule => rule.scope.includes(scope))?.settings;
    if (!settings) throw new Error(`Missing scope ${scope} in ${theme.name}`);
    return [key, { color: settings.foreground, bold: !!settings.fontStyle?.includes('bold'), italic: !!settings.fontStyle?.includes('italic') }];
  }));
  tokens.property = { color: theme.semanticTokenColors.property, bold: false, italic: false };
  const ui = Object.fromEntries(Object.entries(uiKeys).map(([key, color]) => {
    if (!theme.colors[color]) throw new Error(`Missing ${color} in ${theme.name}`);
    return [key, theme.colors[color]];
  }));
  return [ids[index], { name: entries[index].label, type: theme.type, ui, tokens }];
}));
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const settingsBlock = [...readme.matchAll(/```json\r?\n([\s\S]*?)```/g)].find(match => match[1].includes('editor.renderLineHighlight'));
if (!settingsBlock) throw new Error('Missing README recommended settings');
const result = {
  version: pkg.version, description: pkg.description,
  colorKeys: Object.keys(source[0].colors).length,
  textMateRules: source[0].tokenColors.length,
  semanticTokens: Object.keys(source[0].semanticTokenColors).length,
  variants: entries.length,
  settings: JSON.parse(settingsBlock[1]), themes,
};
const file = path.join(root, 'website/app/utils/themeRelease.json');
const output = JSON.stringify(result, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (fs.readFileSync(file, 'utf8') !== output) throw new Error('Website theme data is stale; run npm run sync:website');
  console.log('Website theme data matches extension sources.');
} else {
  fs.writeFileSync(file, output);
  console.log(`Website synchronized: v${result.version}, ${result.colorKeys} UI colors, ${result.textMateRules} TextMate rules.`);
}
