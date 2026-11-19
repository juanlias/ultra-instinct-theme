#!/usr/bin/env bash
# Optional visual check; prints colors only, without changing terminal settings.
printf 'Normal ANSI foregrounds:\n'
for color in {30..37}; do
  printf '\033[%sm %s: ./src/theme.ts 12:34 \033[0m\n' "$color" "$color"
done
printf '\nBright ANSI foregrounds:\n'
for color in {90..97}; do
  printf '\033[%sm %s: Error / Warning / Success \033[0m\n' "$color" "$color"
done
printf '\nColor pairs used by terminal programs (visual review required):\n'
printf '\033[30;47m Black on white \033[0m\n'
printf '\033[37;40m White on black \033[0m\n'
printf '\033[7m Reverse video \033[0m\n'
