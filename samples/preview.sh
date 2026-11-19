#!/usr/bin/env bash
# Inspect variable sigils, quotes, pipes, and control flow.
set -eu
readonly LIMIT=12
title="Review theme"

show_task() {
  local index="${1:-0}"
  if [ "$index" -lt "$LIMIT" ]; then
    printf 'Task %s: "%s"\n' "$index" "$title"
  fi
}

show_task 1 | cat

# ANSI text samples for an optional Bash terminal check.
printf '\033[31mError\033[0m \033[32mSuccess\033[0m \033[33mWarning\033[0m\n'
