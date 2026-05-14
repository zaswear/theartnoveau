# The Art Noveau

> Editorial archive · Archivo editorial · 1890 — 1914  
> The floral rebellion against the straight line.

A bilingual (ES/EN) editorial site documenting Art Nouveau architecture. Built as a single-page static app — pure HTML + CSS + React (CDN) — deployable anywhere without a build step.

**Live site:** https://zaswear.github.io/theartnoveau

---

## Secciones · Sections

| # | ES | EN | Contenido |
|---|---|---|---|
| I | Ensayo | Essay | Ensayo histórico introductorio (~12 min) |
| II | Cronología | Timeline | 1890–1914, doce hitos clave |
| III | Galería | Gallery | Fotos desde Cloudinary por tag — muestra 4, expandible |
| IV | Planos | Plans | 6 láminas SVG: whiplash, tallo, hierro, arcos, fachada, ferronnerie |
| V | Mapa | Map | Mapa interactivo de 8 ciudades europeas con obras por ciudad |
| VI | Arquitectos | Architects | 9 retratos con foto, bio y obras |
| VII | Comparativa | Compare | Cartas tipo museo vs. Art Déco, Modernisme, Beaux-Arts, Neogótico, Bauhaus, Arts & Crafts |
| VIII | Glosario | Glossary | Whiplash, biomorfo, ferronnerie, Gesamtkunstwerk… |
| IX | Obras | Works | 7 fichas de edificios icónicos con foto local, descripción y tabla técnica |
| X | Quiz | Quiz | 7 preguntas aleatorias de un pool de 20, con foto y 4 opciones |

---

## Arquitectos incluidos · Architects covered

Horta · Guimard · Gaudí · Wagner · Mackintosh · Olbrich · Domènech i Montaner · Sullivan · Eisenstein

Retratos descargados de Wikimedia Commons (dominio público) y guardados en `img/`.

---

## Estructura de archivos · File structure

```
.
├── index.html              # Shell (carga fuentes, React + Babel, scripts)
├── styles.css              # Todos los estilos
├── content.js              # Contenido bilingüe (window.CONTENT.es / .en)
├── app.jsx                 # App React — todos los componentes
├── tweaks-panel.jsx        # Panel de tweaks en vivo
├── img/
│   ├── *.jpg               # Retratos de arquitectos (Wikimedia Commons)
│   └── obras/
│       └── *.jpg           # Fotos de edificios (Wikimedia Commons)
└── README.md
```

---

## Galería desde Cloudinary

La galería se puebla en tiempo de ejecución llamando al endpoint público de Cloudinary:

```
https://res.cloudinary.com/dkn49zkfr/image/list/arquitecturanoveau.json
```

**Requisitos:**

1. Etiqueta cada imagen con `arquitecturanoveau` en la Media Library de Cloudinary.
2. En **Settings → Security**, asegúrate de que **Resource list** está en **Allowed**.

Para cambiar de cuenta, edita estas dos constantes al inicio de `app.jsx`:

```js
const CLOUD_NAME = "dkn49zkfr";
const CLOUD_TAG  = "arquitecturanoveau";
```

---

## Tweaks (en vivo)

El panel flotante **Tweaks** permite cambiar sin recargar:

| Opción | Valores |
|---|---|
| Idioma | ES / EN |
| Paleta | Default (burdeos) · Moss · Ink · Rose |
| Tipografía | Cormorant + Lora · DM Serif + Spectral · EB Garamond |
| Layout galería | Cuadrícula · Mosaico · Cinta |

---

## Desarrollo local

Sin build step. Solo necesitas servir los archivos estáticos (el `fetch()` de la galería no funciona desde `file://`):

```bash
python3 -m http.server 8080
# o
npx serve .
# → http://localhost:8080
```

---

## Deploy en GitHub Pages

1. Ve a **Settings → Pages** del repositorio
2. Source: **Deploy from a branch** · branch **main** · folder **/ (root)**
3. Añade un archivo `.nojekyll` vacío en la raíz (ya incluido en este repo)
4. En 1–2 minutos el sitio estará en `https://<usuario>.github.io/theartnoveau`

---

## Imágenes · Image credits

- **Galería** — fotos propias alojadas en Cloudinary, tag `arquitecturanoveau`
- **Retratos de arquitectos** — Wikimedia Commons, dominio público
- **Fotos de edificios** (`img/obras/`) — Wikimedia Commons, dominio público

---

## Licencia · License

MIT © 2026  
El código y los textos son de libre uso con atribución.  
Las imágenes de Wikimedia Commons se rigen por sus licencias originales (dominio público).
