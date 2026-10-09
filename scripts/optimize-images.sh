#!/usr/bin/env bash
# Gera variantes responsivas (AVIF + WebP) das imagens de projeto e editoriais.
#
#   public/projects/<nome>.jpg  →  public/projects/<nome>-{720,1200,1800}.{avif,webp}
#   public/editorial/<nome>.jpg →  public/editorial/<nome>-{960,1600,2400}.{avif,webp}
#
# Requer ImageMagick com suporte a AVIF/WebP (`convert -list format`).
# Os JPGs originais ficam como fallback do atributo `src`.
set -euo pipefail

cd "$(dirname "$0")/.."

generate() {
  local src="$1"; shift
  local widths=("$@")
  local dir base
  dir="$(dirname "$src")"
  base="$(basename "${src%.*}")"
  for w in "${widths[@]}"; do
    local avif="$dir/$base-$w.avif" webp="$dir/$base-$w.webp"
    if [[ ! -f "$avif" || "$src" -nt "$avif" ]]; then
      convert "$src" -strip -resize "${w}x>" -quality 58 "$avif"
    fi
    if [[ ! -f "$webp" || "$src" -nt "$webp" ]]; then
      convert "$src" -strip -resize "${w}x>" -quality 78 -define webp:method=6 "$webp"
    fi
  done
  echo "✓ $base"
}

for f in public/projects/*.jpg; do
  [[ "$f" == *-720.* || "$f" == *-1200.* || "$f" == *-1800.* ]] && continue
  generate "$f" 720 1200 1800
done

if compgen -G "public/editorial/*.jpg" > /dev/null; then
  for f in public/editorial/*.jpg; do
    [[ "$f" == *-960.* || "$f" == *-1600.* || "$f" == *-2400.* ]] && continue
    generate "$f" 960 1600 2400
  done
fi
