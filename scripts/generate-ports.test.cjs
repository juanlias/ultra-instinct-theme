const assert = require('node:assert/strict');
const test = require('node:test');
const { blend, buildScheme, assertScheme } = require('./generate-ports.cjs');

test('selection compositing preserves opacity, transparency, and alpha midpoint', () => {
  assert.equal(blend('#FFFFFF', '#123456'), '#FFFFFF');
  assert.equal(blend('#ABCDEF00', '#123456'), '#123456');
  assert.equal(blend('#FFFFFF80', '#000000'), '#808080');
  assert.equal(blend('#00000080', '#FFFFFF'), '#7F7F7F');
  assert.throws(() => blend('#GGGGGG', '#000000'));
  assert.throws(() => blend('#FFFFFF80', '#00000080'));
});

const variant = {
  name: 'Example',
  ui: { terminalBackground: '#141118', terminalForeground: '#DCE0E5', terminalCursor: '#A78BFA', terminalSelectionBackground: '#272033' },
  ansi: Object.fromEntries(['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
    'brightBlack', 'brightRed', 'brightGreen', 'brightYellow', 'brightBlue', 'brightMagenta', 'brightCyan', 'brightWhite']
    .map((key, index) => [key, '#' + (index * 10000 + 1).toString(16).padStart(6, '0')])),
};

test('Windows Terminal maps magenta to purple without dropping ANSI colors', () => {
  const scheme = buildScheme(variant);
  assert.equal(Object.keys(scheme).length, 21);
  assert.equal(scheme.purple, variant.ansi.magenta);
  assert.equal(scheme.brightPurple, variant.ansi.brightMagenta);
  assert.equal(scheme.blue, variant.ansi.blue);
  assert.equal(scheme.cursorColor, '#A78BFA');
  assert.ok(!('magenta' in scheme));
});

test('scheme validation rejects alpha, missing ANSI entries, extra settings, and invisible selections', () => {
  const scheme = buildScheme(variant);
  assert.throws(() => assertScheme({ ...scheme, purple: '#12345680' }));
  const missing = { ...scheme }; delete missing.brightWhite;
  assert.throws(() => assertScheme(missing));
  assert.throws(() => assertScheme({ ...scheme, commandline: 'example' }));
  assert.throws(() => assertScheme({ ...scheme, selectionBackground: scheme.background }));
});
