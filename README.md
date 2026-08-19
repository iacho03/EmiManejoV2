# Aprende a Manejar

Landing page de **Aprende a Manejar** (`aprendeamanejar.ar`) — clases de manejo a domicilio en CABA (Palermo, Belgrano y zonas aledañas).

Sitio estático: HTML, CSS y JavaScript vanilla. Sin build, sin dependencias, sin framework.

## Estructura

```
.
├── index.html          Home (hero, servicios, paquetes, zonas, FAQ, contacto)
├── styles.css          Estilos del sitio completo
├── components.js       Componentes compartidos (nav, menú mobile)
├── main.js             Comportamiento de la home (acordeón FAQ, reveal de paquetes)
├── robots.txt          Reglas de crawl
├── sitemap.xml         Sitemap (4 páginas publicadas)
├── images/             Fotos del sitio (.webp / .jpg)
└── blog/
    ├── requisitos-licencia-conducir-buenos-aires-2026/
    ├── como-prepararse-examen-practico-caba/
    └── errores-comunes-principiantes/
```

## Desarrollo local

No hace falta instalar nada. Levantá un servidor estático desde la raíz del proyecto:

```bash
# Python 3
python -m http.server 4321

# o con Node
npx serve -l 4321
```

Después abrí http://localhost:4321.

> Conviene usar un servidor y no abrir `index.html` con doble clic: las rutas
> absolutas (`/styles.css`, `/blog/…`) sólo resuelven bien servidas desde la raíz.

## Pendientes antes de publicar

Estos puntos están anotados también en el comentario de cabecera de `index.html`:

- **Instagram**: el handle sigue siendo `@emimanejo`, de la marca anterior. Va en el `sameAs` del JSON-LD, o sea que le declara a Google que esa cuenta es del negocio.
- **Imágenes**: ya no quedan placeholders. Las clases `.ph` / `.ph--*` de `styles.css` quedaron sin uso y se pueden borrar. `errores-comunes.jpg` es de 480×270 y se usa como hero a 900px: conviene reemplazarla por una versión más grande.
- **`/politica-de-privacidad`**: está linkeada en el footer y no existe — es el único 404 que queda.
- **`aggregateRating`**: se dejó fuera del JSON-LD a propósito. El "4.9 en Google" del hero no es verificable y declararlo puede derivar en una acción manual de Google.

## SEO

- **Host canónico: `https://www.aprendeamanejar.ar/` (CON www).** Todas las URLs
  absolutas del sitio — `canonical`, Open Graph, Twitter Cards, JSON-LD,
  `sitemap.xml` y la línea `Sitemap:` del `robots.txt` — usan esa forma. Si se
  agrega una página nueva, respetar el www: mezclar los dos hosts parte la
  autoridad entre ambos.
- `sitemap.xml` lista sólo las páginas que existen como archivo.
- `robots.txt` bloquea `/servicios/`, `/clases-de-manejo-` y `/politica-de-privacidad` para no gastar crawl budget en 404 hasta que se publiquen.
- Cada página lleva su JSON-LD, canonical y metadatos Open Graph.
- Los encabezados se mantienen en proporción al texto (~1 cada 70 palabras): un
  solo H1, H2 por sección y H3 sólo en servicios y posts. Las etiquetas cortas
  (features, nombres de paquete, preguntas del FAQ) van como `p` / `div`.
- Los íconos (`favicon.ico` 16/32/48, `favicon.svg`, `apple-touch-icon.png` 180)
  se generan a partir del volante del sprite. Un SVG suelto se parsea como XML
  estricto: sus comentarios no pueden llevar dos guiones seguidos.
