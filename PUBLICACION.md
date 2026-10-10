# Publicación confirmada — 2026-10-10

- GitHub: https://github.com/AIAM7420/usa-sportswear-demo
- Netlify HTTPS: https://usa-sportswear-demo.netlify.app
- Despliegue verificado: https://app.netlify.com/projects/usa-sportswear-demo/deploys/6acaa9fbe7e622192154099a
- Commit de aplicación verificado: `6a4e5623dfa43b313f4770094f0a8a4fe663b4ed`.
- Netlify: Published deploy / Your deploy completed successfully.
- Next.js 16.4.0, adaptador automático Next.js Runtime 5.16.2, Node.js 24.
- Rama de producción: main, publicación automática habilitada.
- Raíz del repositorio: `.`, build: `npm run build`, salida: `.next`.
- Única variable configurada: NEXT_PUBLIC_SITE_URL con la URL HTTPS pública.

## Verificaciones ejecutadas

- TypeScript, ESLint y build de producción: aprobados en ambas aplicaciones.
- Playwright local: 10/10 pruebas aprobadas.
- Playwright en la URL HTTPS de producción: 10/10 pruebas aprobadas.
- Navegación, rutas internas, enlaces e imágenes locales: aprobados.
- Catálogo/menú, búsqueda, filtros, estados vacíos, navegación móvil y portapapeles: aprobados.
- Responsive: 320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440 y 1920 px; orientaciones 844×390 y 1024×768.
- Auditoría axe en móvil y escritorio: sin violaciones detectadas en las reglas examinadas.
- Consola del navegador: sin errores de página en el recorrido probado.
- HTTPS, metadata, sitemap y robots: HTTP 200 y dominio de producción correcto.
- JSON: sintaxis válida y datos consumidos durante build. Imágenes verificadas por HTTP y carga en navegador.
- Secretos: sin coincidencias en revisión por patrones de archivos versionados; credenciales, .env, estado local y reportes excluidos de Git.
- WhatsApp: generador y codificación del mensaje probados. No hay teléfono configurado; el sitio ofrece mensaje copiable y no envía a un número ficticio.

## Repetir pruebas en producción

En PowerShell, desde este repositorio:

```powershell
npm ci
$env:E2E_BASE_URL='https://usa-sportswear-demo.netlify.app'
npm run test:e2e
Remove-Item Env:E2E_BASE_URL
```

Esta opción omite el servidor local. Para pruebas locales ejecutar build antes de Playwright. Los reportes y capturas se generan localmente y no se publican en Git.

## Realizar modificaciones

Editar `src/data/` y `public/images/`, ejecutar las validaciones de README.md, crear un commit y ejecutar `git push origin main`. Netlify construye y publica automáticamente. Comprobar el estado Published y revisar la URL pública después de cada cambio.
