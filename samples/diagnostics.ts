// Intentional diagnostic fixture: inspect this file, do not run it.
// TypeScript should report an error on the assignment below.
const retryCount: number = 'three';

/** @deprecated Use readTitle instead. */
function legacyTitle(): string {
  return 'Old title';
}

function readTitle(prefix: string, unusedParameter: string): string {
  const unusedLocal = 12;
  return `${prefix}: ${legacyTitle()}`;
}

// Errors, unused-code hints, and deprecated symbols depend on language settings.
// Not every provider emits a warning for this fixture; compare warnings from
// an existing project in the Problems panel as well.
export const title = readTitle('Theme review', 'unused');
