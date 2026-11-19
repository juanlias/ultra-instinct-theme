const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const hex = /^#[\da-f]{6}([\da-f]{2})?$/i;

function luminance(color) {
  const channels = color.slice(1, 7).match(/../g).map(value => {
    const channel = parseInt(value, 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function blend(foreground, background) {
  const alpha = foreground.length === 9 ? parseInt(foreground.slice(7), 16) / 255 : 1;
  const channels = [1, 3, 5].map(index => Math.round(
    parseInt(foreground.slice(index, index + 2), 16) * alpha
    + parseInt(background.slice(index, index + 2), 16) * (1 - alpha),
  ));
  return '#' + channels.map(value => value.toString(16).padStart(2, '0')).join('');
}

// Reference cases guard the calculation used for all palette checks.
assert.equal(contrast('#000000', '#FFFFFF'), 21);
assert.equal(contrast('#808080', '#808080'), 1);
assert.ok(Math.abs(contrast('#777777', '#FFFFFF') - 4.478) < 0.001);
assert.equal(blend('#FFFFFF80', '#000000'), '#808080');
assert.equal(blend('#FFFFFF00', '#123456'), '#123456');

let baseline;
for (const entry of manifest.contributes.themes) {
  const theme = JSON.parse(fs.readFileSync(path.resolve(root, entry.path), 'utf8'));
  const label = entry.label;
  check(theme.type === (entry.uiTheme === 'vs' ? 'light' : 'dark'), `${label}: theme type mismatch`);
  check(theme.semanticHighlighting === true, `${label}: semantic highlighting is disabled`);
  const signatures = {
    colors: Object.keys(theme.colors).sort(),
    semantic: Object.keys(theme.semanticTokenColors).sort(),
    scopes: theme.tokenColors.flatMap(rule => rule.scope).sort(),
  };
  if (!baseline) baseline = signatures;
  for (const key of Object.keys(signatures)) {
    check(JSON.stringify(signatures[key]) === JSON.stringify(baseline[key]), `${label}: ${key} parity mismatch`);
  }
  for (const [key, value] of Object.entries(theme.colors)) {
    check(hex.test(value), `${label}: invalid color ${key}: ${value}`);
  }
  const background = theme.colors['editor.background'];
  function readable(value, name) {
    check(/^#[\da-f]{6}$/i.test(value), `${label}: ${name} must use an opaque hex color`);
    if (!/^#[\da-f]{6}$/i.test(value)) return;
    const ratio = contrast(value, background);
    check(ratio >= 4.5, `${label}: ${name} has ${ratio.toFixed(2)}:1 contrast (minimum 4.5:1)`);
    return ratio;
  }
  readable(theme.colors['editor.foreground'], 'editor.foreground');
  readable(theme.colors['editorCursor.foreground'], 'editorCursor.foreground');
  const ratios = [];
  for (const rule of theme.tokenColors) {
    check(rule.scope.length > 0, `${label}: empty TextMate scope`);
    if (rule.settings.foreground) ratios.push(readable(rule.settings.foreground, rule.scope.join(', ')));
  }
  for (const [key, value] of Object.entries(theme.semanticTokenColors)) {
    ratios.push(readable(typeof value === 'string' ? value : value.foreground, `semantic ${key}`));
  }
  const states = ['editor.selectionBackground', 'editor.selectionHighlightBackground', 'editor.findMatchBackground', 'editor.findMatchHighlightBackground'];
  check(new Set(states.map(key => theme.colors[key])).size === states.length, `${label}: selection and search states must differ`);
  for (const kind of ['added', 'modified', 'deleted']) {
    const base = theme.colors[`gitDecoration.${kind}ResourceForeground`];
    for (const key of [`editorGutter.${kind}Background`, `editorOverviewRuler.${kind}Foreground`]) {
      check(theme.colors[key].slice(0, 7) === base, `${label}: inconsistent Git ${kind} color in ${key}`);
    }
  }
  function uiReadable(foregroundKey, backgroundKey, minimum = 4.5) {
    const foreground = theme.colors[foregroundKey];
    const backdrop = theme.colors[backgroundKey];
    if (!hex.test(foreground) || !hex.test(backdrop)) {
      check(false, `${label}: missing/invalid UI contrast pair ${foregroundKey} / ${backgroundKey}`);
      return;
    }
    const surface = blend(backdrop, background);
    const ratio = contrast(blend(foreground, surface), surface);
    check(ratio >= minimum, `${label}: ${foregroundKey} on ${backgroundKey} has ${ratio.toFixed(2)}:1 contrast (minimum ${minimum}:1)`);
  }
  for (const [foreground, backdrop] of [
    ['tab.activeForeground', 'tab.activeBackground'],
    ['tab.inactiveForeground', 'tab.inactiveBackground'],
    ['editorLineNumber.activeForeground', 'editor.lineHighlightBackground'],
    ['input.foreground', 'input.background'],
    ['input.placeholderForeground', 'input.background'],
    ['editorSuggestWidget.foreground', 'editorSuggestWidget.background'],
    ['editorSuggestWidget.highlightForeground', 'editorSuggestWidget.background'],
    ['editorSuggestWidget.selectedForeground', 'editorSuggestWidget.selectedBackground'],
    ['editorSuggestWidget.focusHighlightForeground', 'editorSuggestWidget.selectedBackground'],
    ['editorSuggestWidgetStatus.foreground', 'editorSuggestWidget.background'],
    ['editorHoverWidget.foreground', 'editorHoverWidget.background'],
    ['editorHoverWidget.highlightForeground', 'editorHoverWidget.background'],
    ['editorGhostText.foreground', 'editor.background'],
    ['editorInlayHint.foreground', 'editorInlayHint.background'],
    ['editorInlayHint.parameterForeground', 'editorInlayHint.parameterBackground'],
    ['editorInlayHint.typeForeground', 'editorInlayHint.typeBackground'],
    ['list.focusForeground', 'list.focusBackground'],
    ['diffEditor.unchangedRegionForeground', 'diffEditor.unchangedRegionBackground'],
    ['terminal.foreground', 'terminal.background'],
  ]) uiReadable(foreground, backdrop);
  for (const key of Object.keys(theme.colors).filter(key => key.startsWith('terminal.ansi') && key !== 'terminal.ansiBlack')) {
    // ANSI black can be used as a background; inverted/custom terminal color pairs need visual review.
    uiReadable(key, 'terminal.background');
  }
  for (let level = 1; level <= 6; level++) {
    uiReadable(`editorBracketHighlight.foreground${level}`, 'editor.background');
    const active = theme.colors[`editorBracketPairGuide.activeBackground${level}`];
    const inactive = theme.colors[`editorBracketPairGuide.background${level}`];
    check(contrast(blend(active, background), background) > contrast(blend(inactive, background), background), `${label}: active bracket guide ${level} must stand out from inactive guide`);
  }
  check(new Set(Array.from({length: 6}, (_, index) => theme.colors[`editorBracketHighlight.foreground${index + 1}`])).size === 6, `${label}: bracket levels must use distinct colors`);
  for (const severity of ['error', 'warning', 'info']) {
    const capitalized = severity[0].toUpperCase() + severity.slice(1);
    const color = theme.colors[`editor${capitalized}.foreground`];
    for (const key of [`problems${capitalized}Icon.foreground`, `notifications${capitalized}Icon.foreground`, `debugConsole.${severity}Foreground`]) {
      check(theme.colors[key] === color, `${label}: inconsistent ${severity} color in ${key}`);
    }
    uiReadable(`inputValidation.${severity}Foreground`, `inputValidation.${severity}Background`);
  }
  uiReadable('focusBorder', 'editor.background', 3);
  uiReadable('list.focusOutline', 'list.focusBackground', 3);
  check(theme.colors['editorGhostText.foreground'] !== theme.colors['editor.foreground'], `${label}: pending suggestions must differ from accepted code`);
  console.log(`${label}: ${signatures.colors.length} UI keys, ${theme.tokenColors.length} TextMate rules, ${signatures.semantic.length} semantic tokens; minimum syntax contrast ${Math.min(...ratios).toFixed(2)}:1`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Theme validation passed. Visual editor checks are still required.');
}
