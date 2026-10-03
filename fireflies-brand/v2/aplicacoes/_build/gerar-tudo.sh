#!/bin/sh
# Regenera TODAS as aplicações v2: SVG (texto em curvas) → PNG/PDF → HTML editáveis → prancha.
set -e
cd "$(dirname "$0")"
for g in apresentacao documentos papelaria digital redes ambientacao comunicados; do node $g.js; done
node render.js
node html.js
node mockups.js
