# USA Sportswear

Demo comercial independiente, en español mexicano, con Next.js App Router, React, TypeScript estricto y Tailwind CSS. Sin base de datos, autenticación ni backend propio.

## Ejecutar en local

Requisitos: Node.js 24 LTS recomendado y npm. Validado con Node 24.15.0 y npm 11.12.1.

Desde PowerShell:

```powershell
cd Ropa
npm ci
npm run dev
```

Abrir http://localhost:3000. La otra aplicación, `Restaurante`, funciona en el puerto 3001; se pueden ejecutar simultáneamente en terminales separadas.

Para probar producción:

```powershell
npm run build
npm run start
```

## Estructura y decisiones

- `src/app/`: rutas, layouts de servidor, metadata, robots y sitemap.
- `src/components/`: presentación e islas cliente para interacción; menús y paneles accesibles con Radix Dialog.
- `src/data/`: contenido, contactos y catálogo local editable.
- `src/lib/data.ts`: acceso a datos y validación al construir. Es el punto de sustitución para un futuro CMS.
- `src/lib/contact.ts`: formato MXN, validación de enlaces y mensajes WhatsApp codificados.
- `public/images/`: fotografías locales optimizadas en pantalla por `next/image`.
- `tests/`: pruebas funcionales, responsive y auditoría axe.
- `reports/`: capturas y mediciones de Lighthouse; `PUBLICACION.md` resume resultados ejecutados.

Se generan páginas estáticas. La navegación, filtros, galerías y portapapeles se ejecutan en el navegador. No hay solicitudes guardadas ni simulaciones de envío. Motion se usa únicamente en la entrada del hero, sin ocultar el contenido; se respeta movimiento reducido. Radix administra foco y Escape en los paneles. Las fuentes se descargan durante el build con `next/font` y se sirven desde la propia aplicación.

## Personalizar contenido y contactos

Editar `src/data/site.json` para cambiar navegación, historia, valores, textos generales y configuración. Los nombres de marca también aparecen en metadata, wordmark y footer: al adaptar a otro negocio, revisar esas piezas y `src/app/icon.svg`.

```json
{
  "phone": "+525512345678",
  "email": "hola@tu-dominio.mx",
  "socials": [
    { "label": "Instagram", "url": "https://www.instagram.com/tu-cuenta/" }
  ]
}
```

Los valores anteriores son ejemplos de formato: sustituirlos por contactos propios. El teléfono acepta E.164 de 8 a 15 dígitos, con `+` opcional, sin espacios ni guiones. Con un teléfono válido aparece WhatsApp y el enlace para llamar. Sin teléfono válido se muestra un mensaje copiable, con selección manual si el portapapeles no está disponible. Solo se aceptan enlaces HTTPS en redes y reservación.

**Editar archivos locales no actualiza una publicación existente: hay que reconstruir o desplegar nuevamente.** No se incluye panel administrativo ni CMS. En una integración futura, sustituir las funciones de `src/lib/data.ts` por consultas al CMS y conservar los tipos y contratos consumidos por los componentes.

## Imágenes y licencias

Ver `src/data/image-sources.json`: archivo local, URL exacta de origen, licencia y uso. Recursos de Unsplash bajo https://unsplash.com/license. Algunas imágenes tienen página y autor verificados adicionalmente. Son referencias ilustrativas; no acreditan local, equipo ni producto real. Para cambiar una imagen, añadir un archivo a `public/images/`, actualizar el dato y escribir un texto alternativo adecuado. No se necesitan URLs remotas en tiempo de ejecución.

El catálogo y las historias son ficticios. No se presentan reseñas, certificaciones, premios ni resultados comerciales inventados. Antes de convertir la demo en un negocio real, reemplazar los datos e imágenes ilustrativos por los autorizados del negocio.

## Validaciones y capturas

```powershell
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Las pruebas arrancan automáticamente el servidor de producción; requieren un build previo. Se usa Google Chrome instalado (`channel: chrome`). Si falta, instalarlo antes de ejecutar la suite. Para inspección interactiva: `npm run test:e2e:ui`. El reporte HTML se genera en `playwright-report/` y las trazas de fallos en `test-results/`.

Se recorren 320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440 y 1920 px; se comprueban orientaciones representativas de 844×390 y 1024×768. Se capturan inicio, catálogo/menú y contacto a 390, 820 y 1440 px. La auditoría axe cubre reglas WCAG A/AA aplicables en móvil y escritorio; complementa la revisión manual, no certifica conformidad completa.

Para Lighthouse, iniciar producción en otra terminal y ejecutar:

```powershell
npm run audit
```

Los informes HTML y JSON se guardan en `reports/lighthouse/`. Se utiliza el perfil móvil predeterminado de Lighthouse sobre localhost. Los resultados varían según equipo, carga y red; consultar las mediciones reales en `PUBLICACION.md`.

## Publicar en GitHub y Netlify

Cada carpeta se publica como la raíz de un repositorio independiente: `usa-sportswear-demo` para Ropa y `brasa-oliva-demo` para Restaurante. No subir node_modules, .next, credenciales, archivos .env ni reportes locales. Conservar package-lock.json.

1. Ejecutar `npm run typecheck`, `npm run lint`, `npm run build` y `npm run test:e2e` antes de subir cambios.
2. Crear el repositorio si no existe y publicar en `main`, sin force push ni sobrescribir repositorios existentes.
3. En Netlify, importar ese repositorio desde GitHub y seleccionar Next.js. La raíz es el propio repositorio (`.`), no la carpeta original del equipo.
4. Elegir `main` como rama de producción. `netlify.toml` configura `npm run build`, `.next` y Node.js 24. Netlify instala automáticamente su adaptador OpenNext; no fijar una versión del adaptador ni activar `next export` o `output: export`.
5. Configurar `NEXT_PUBLIC_SITE_URL` con la URL HTTPS definitiva del sitio y volver a desplegar. Es una URL pública necesaria para canonical, Open Graph, robots y sitemap; no es un secreto. No se requieren otras variables.
6. Esperar un despliegue exitoso y verificar la URL HTTPS, todas las rutas internas, imágenes, filtros y contactos en móvil, tablet y escritorio. No considerar publicado hasta confirmar el despliegue.

Referencia: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/

### Modificar después de publicar

Editar los JSON en `src/data/` y las imágenes en `public/images/`, ejecutar las verificaciones, crear un commit y hacer `git push origin main`. La conexión GitHub–Netlify reconstruye y publica cada cambio automáticamente. Consultar el registro de despliegue antes de comprobar la URL pública. Un teléfono válido en `src/data/site.json` habilita WhatsApp; con `null` se conserva el mensaje copiable.

El estado real de publicación se documenta en `PUBLICACION.md`. No hay un despliegue confirmado mientras ese archivo no indique una URL verificada.

## Mejoras futuras

Reemplazar datos por un CMS conservando las interfaces, incorporar fotografías reales autorizadas y medir Core Web Vitals con tráfico real. No se han añadido dependencias de CMS, analytics ni infraestructura anticipada.

## Editar productos, marcas y variantes

`src/data/products.json` contiene 16 referencias. Cada producto tiene `id`, `slug`, `name`, `brand`, `category`, `price`, `createdAt` (`YYYY-MM-DD`), `description`, `images`, `variants` y `details`.

- El `slug` único genera `/colecciones/[slug]` y su metadata; al cambiarlo cambia la URL pública.
- `brand` debe existir en `site.json > brands`, y `category` en `site.json > categories`.
- `price` es numérico en pesos MXN. `createdAt` determina el orden de novedades.
- Cada imagen incluye `src`, `alt`, `label` y `zoom`. El segundo panel de la galería inicial es un acercamiento de la misma fotografía y está identificado como tal. Se pueden añadir imágenes independientes usando `zoom: false`.
- Las variantes son combinaciones explícitas: `{ "size": "M", "color": "Negro", "available": true }`. Una combinación ausente o con `available: false` no se puede seleccionar. Si todas están agotadas, se deshabilita la consulta del producto.
- Las tallas y colores de cada ficha y las tallas del filtro se derivan de las variantes. Agregar una nueva talla en los datos la incorpora automáticamente al catálogo, sin editar componentes.

Filtros: alternativas dentro de marca/categoría/talla; coincidencia simultánea entre grupos. Solo se consideran variantes disponibles al filtrar por talla. El rango de precio es inclusivo; un rango invertido muestra orientación y ningún resultado. Búsqueda sin distinción de acentos o mayúsculas por nombre y marca.

URL compartible: `?q=Nike&brand=Nike&category=playeras&size=M&min=500&max=1500&sort=price-asc`. Valores de orden: `newest`, `price-asc`, `price-desc`. La escritura de búsqueda reemplaza la entrada actual; filtros y orden crean entradas para volver atrás. Las páginas de resultados usan canonical de `/colecciones`.

Nike, Adidas, Puma y Under Armour se mencionan como ejemplos de catálogo sin afiliación. Las fotografías de categoría no se atribuyen a productos auténticos de esas marcas. La disponibilidad y los precios son ficticios; sustituir ambos antes de cualquier uso comercial real. No hay carrito ni checkout.
