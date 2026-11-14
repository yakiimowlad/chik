#!/usr/bin/env bash
# Offline installation, Bash 3.2+. CHIK only unless --with-unslop is explicit.
set -euo pipefail
usage(){ printf '%s\n' 'Usage: bash install.sh [claude|codex] [--skills-dir DIR] [--with-unslop]'; }
target="${1:-codex}"
case "$target" in claude|codex) [ "$#" -eq 0 ] || shift ;; --help|-h) usage; exit 0 ;; *) usage >&2; exit 2 ;; esac
case "$target" in claude) base="$HOME/.claude/skills" ;; codex) base="$HOME/.agents/skills" ;; esac
extra=0
while [ "$#" -gt 0 ]; do
 case "$1" in
 --skills-dir) [ "$#" -gt 1 ] && [ -n "$2" ] || { usage >&2; exit 2; }; base="$2"; shift 2 ;;
 --with-unslop) extra=1; shift ;;
 --help|-h) usage; exit 0 ;;
 *) usage >&2; exit 2 ;;
 esac
done
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
for p in skills/chik/SKILL.md skills/chik/references/voice-style.md LICENSE; do
 [ -r "$here/$p" ] || { printf 'Incomplete package: %s\n' "$p" >&2; exit 1; }
done
if [ "$extra" -eq 1 ]; then [ -r "$here/upstream/unslop/SKILL.md" ] || { printf 'Original source missing\n' >&2; exit 1; }; fi
[ -n "$base" ] && [ "$base" != / ] || { printf 'Invalid destination\n' >&2; exit 2; }
mkdir -p "$base";base="$(cd "$base" && pwd)"
names='chik';[ "$extra" -eq 0 ] || names='chik unslop'
for name in $names; do
 [ ! -L "$base/$name" ] || { printf 'Refusing symlink: %s\n' "$name" >&2; exit 1; }
 [ ! -e "$base/$name" ] || [ -d "$base/$name" ] || { printf 'Not a directory: %s\n' "$name" >&2; exit 1; }
done
lock="$base/.chik-install.lock";mkdir "$lock" 2>/dev/null || { printf 'Another installation or stale lock: %s\n' "$lock" >&2; exit 1; }
stage='';backup='';old='';new='';done_ok=0
cleanup(){
 code=$?;trap - EXIT HUP INT TERM
 if [ "$done_ok" -eq 0 ]; then
  for name in $new; do rm -rf "$base/$name"; done
  for name in $old; do mv "$backup/$name" "$base/$name"; done
 fi
 [ -z "$stage" ] || rm -rf "$stage"
 rmdir "$lock" 2>/dev/null || true
 exit "$code"
}
trap cleanup EXIT;trap 'exit 130' INT;trap 'exit 143' HUP TERM
stage="$(mktemp -d "$base/.chik-stage.XXXXXX")"
cp -R "$here/skills/chik" "$stage/chik"
cp "$here/LICENSE" "$stage/chik/LICENSE-Unslop.txt"
if [ "$extra" -eq 1 ]; then cp -R "$here/upstream/unslop" "$stage/unslop"; fi
# Finish staging before touching existing versions.
for name in $names; do
 if [ -d "$base/$name" ]; then
  [ -n "$backup" ] || backup="$(mktemp -d "$base/.chik-backup.XXXXXX")"
  mv "$base/$name" "$backup/$name";old="$name $old"
 fi
 mv "$stage/$name" "$base/$name";new="$name $new"
done
done_ok=1
printf 'Installed CHIK: %s/chik\n' "$base"
[ "$extra" -eq 0 ] || printf 'Original Unslop: %s/unslop\n' "$base"
[ -z "$backup" ] || printf 'Backup: %s\n' "$backup"
printf 'If the skill does not appear, open a new client session.\n'
