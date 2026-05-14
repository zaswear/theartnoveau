# The Art Noveau

> Editorial archive · Archivo editorial · 1890 — 1914  
> The floral rebellion against the straight line.

A bilingual (ES/EN) editorial site about Art Nouveau architecture, with deep historical essay, illustrated timeline, Cloudinary-fed gallery, schematic plans of the movement's formal language, an interactive map of European capitals, key architect biographies, museum-card comparison with adjacent movements, and a glossary of motifs.

Built as a static site — pure HTML + CSS + React (via CDN) — so it can be served from GitHub Pages, Netlify, Vercel or any plain static host.

---

## Demo

Open `index.html` locally, or deploy and visit your URL.  
Default language: **Spanish** · toggle in the top-right to switch to English.

---

## Estructura · Structure

```
.
├── index.html          # Shell (loads fonts, React + Babel, scripts)
├── styles.css          # All styles
├── content.js          # Bilingual content (window.CONTENT.es / .en)
├── app.jsx             # React app — all sections
├── tweaks-panel.jsx    # Live tweaks panel (palette / type / gallery layout)
└── README.md
```

### Secciones · Sections

| ES | EN | Notes |
|---|---|---|
| Ensayo | Essay | Deep historical essay (~12 min read) |
| Cronología | Timeline | 1890 – 1914, twelve key milestones |
| Galería | Gallery | Pulled live from Cloudinary by tag |
| Planos | Plans | Schematic SVG plates: whiplash, stem, iron, arches, façade, ferronnerie |
| Mapa | Map | Interactive map of 8 European cities |
| Arquitectos | Architects | Horta · Guimard · Gaudí · Wagner · Mackintosh · Olbrich |
| Comparativa | Compare | Museum-card comparison vs. Art Deco, Modernisme, Beaux-Arts, Neo-Gothic, Bauhaus, Arts & Crafts |
| Glosario | Glossary | Whiplash, biomorphic, ferronnerie, Gesamtkunstwerk… |

---

## Galería desde Cloudinary · Cloudinary gallery

The gallery is populated at runtime by calling Cloudinary's public **resource list** endpoint:

```
https://res.cloudinary.com/dkn49zkfr/image/list/arquitecturanoveau.json
```

For this to work you need **two** things:

### 1. Tag every image with `arquitecturanoveau`

In the Cloudinary console, open each image and add the tag `arquitecturanoveau`. You can bulk-tag from the Media Library.

### 2. Enable the public list API for that tag

The Cloudinary public list endpoint is **disabled by default** for security. To turn it on:

1. Log in at <https://cloudinary.com/console>
2. Go to **Settings → Security**
3. Under **Restricted media types**, ensure **Resource list** is set to **Allowed** (or remove it from the restricted list).
4. Reload the site — the gallery should populate automatically.

If you'd rather keep that endpoint disabled, you can hard-code a list of public IDs inside `app.jsx` (replace the `fetch(...)` block in the `Gallery` component with a static array).

### Cambiar de cuenta · Switching Cloudinary account

In `app.jsx` (top of file):

```js
const CLOUD_NAME = "dkn49zkfr";
const CLOUD_TAG  = "arquitecturanoveau";
```

Change those two constants to point at your own cloud and tag.

---

## Tweaks (live)

A floating **Tweaks** panel (toggle from the host toolbar) lets you switch:

- **Idioma · Language** — ES / EN (also persisted in the URL-less state)
- **Paleta** — Default oxblood, Moss, Ink, Rose
- **Tipografía** — Cormorant + Lora · DM Serif + Spectral · EB Garamond
- **Layout de galería** — Cuadrícula / Mosaico / Cinta

---

## Subir a GitHub · Deploy on GitHub

```bash
# 1. Crea el repo en github.com/<tu-usuario>/theartnoveau (vacío)

# 2. Desde esta carpeta:
git init
git add .
git commit -m "feat: initial commit — The Art Noveau editorial archive"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/theartnoveau.git
git push -u origin main
```

### GitHub Pages

1. En el repo, ve a **Settings → Pages**
2. Source: **Deploy from a branch**, branch **main**, folder **/(root)**
3. Guarda. En 1–2 minutos tendrás tu sitio en `https://<tu-usuario>.github.io/theartnoveau/`

### Alternativas

- **Netlify** — arrastra la carpeta en <https://app.netlify.com/drop>
- **Vercel** — `vercel` desde la terminal
- **Cloudflare Pages** — conecta el repo

---

## Desarrollo local · Local development

No build step. Solo necesitas servir la carpeta como estáticos (porque `fetch()` no funciona desde `file://`):

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .

# Luego abre http://localhost:8080
```

---

## Créditos · Credits

- **Texto · Text** — escrito para este archivo · written for this archive
- **Tipografías · Type** — [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Lora](https://fonts.google.com/specimen/Lora), [Italianno](https://fonts.google.com/specimen/Italianno), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Google Fonts)
- **Imágenes · Images** — cuenta personal de Cloudinary, tag `arquitecturanoveau`

---

## Licencia · License

MIT © 2026 — texto, código y diseño editorial.  
Las imágenes alojadas en Cloudinary se rigen por su propio régimen de derechos.

```
MIT License — do as you wish, mention the source, no warranty.
```
