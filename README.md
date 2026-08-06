# EmiManejo

Landing page de **EmiManejo** — clases de manejo a domicilio en CABA (Palermo, Belgrano y zonas aledañas).

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

- **WhatsApp**: el número `5491100000000` es un placeholder y aparece 11 veces (10 links + `telephone` del JSON-LD).
- **Dominio**: el canonical, los Open Graph y el JSON-LD apuntan a `emanejo.com.ar` (sin la "i"). Si el dominio real es `emimanejo.com.ar`, hay que corregir 17 referencias más `robots.txt` y `sitemap.xml`.
- **Imágenes**: ya no quedan placeholders. Las clases `.ph` / `.ph--*` de `styles.css` quedaron sin uso y se pueden borrar. `errores-comunes.jpg` es de 480×270 y se usa como hero a 900px: conviene reemplazarla por una versión más grande.
- **Instagram**: verificar el handle `@emimanejo` (va en `sameAs` del JSON-LD).
- **`/politica-de-privacidad`**: está linkeada en el footer y no existe — es el único 404 que queda.
- **`aggregateRating`**: se dejó fuera del JSON-LD a propósito. El "4.9 en Google" del hero no es verificable y declararlo puede derivar en una acción manual de Google.

## SEO

- `sitemap.xml` lista sólo las páginas que existen como archivo.
- `robots.txt` bloquea `/servicios/`, `/clases-de-manejo-` y `/politica-de-privacidad` para no gastar crawl budget en 404 hasta que se publiquen.
- Cada página lleva su JSON-LD, canonical y metadatos Open Graph.
