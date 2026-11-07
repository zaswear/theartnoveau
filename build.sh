#!/bin/sh
# Precompila el JSX a build/. Antes lo compilaba Babel en el navegador en cada
# visita, con React en modo desarrollo: varios MB de JS para pintar la página.
# Ejecuta esto tras editar app.jsx o tweaks-panel.jsx y commitea build/.
set -e
cd "$(dirname "$0")"
npx -y esbuild@0.25.10 tweaks-panel.jsx app.jsx --outdir=build \
  --jsx-factory=React.createElement --jsx-fragment=React.Fragment \
  --minify-whitespace --minify-syntax --target=es2019
