# Sistema de diseño de USA Sportswear

Tokens en `src/app/globals.css`; las variables de fuentes vienen de `next/font`.

| Decisión   | Valor                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------- |
| Dirección  | Deportiva editorial, titulares condensados y catálogo de prendas                          |
| Tipografía | Barlow Condensed + Manrope                                                                |
| Paleta     | Blanco #FAFAF7, marino #16263D, rojo #B32635, gris de lectura #526071, superficie #EAEFF3 |
| Espaciado  | .5, 1, 1.5, 2 rem y secciones fluidas mediante clamp                                      |
| Radio      | 0.2rem; fotografías y catálogo de bordes rectos                                           |
| Movimiento | 200 ms, cubic-bezier(.2,.7,.3,1); hero 450 ms sin pérdida de contraste                    |
| Estados    | Variables success/error, foco visible de 3px, controles deshabilitados identificables     |
| Sombra     | Reservada para paneles superpuestos                                                       |

Diseño móvil primero, tipografía fluida y contenedores limitados. Breakpoints principales a 48rem y 75rem, con adaptaciones específicas para catálogo, navegación y tamaños estrechos. Las variables breakpoint documentan el sistema; las media queries usan valores explícitos porque CSS no admite variables normales en sus condiciones.

Se aplicaron las skills frontend-design y vercel-react-best-practices: composición propia por marca, narrativa ligada al producto, Server Components por defecto, props acotadas a las islas cliente, imports optimizados de iconografía y Motion, sin waterfalls de datos ni librerías de estado innecesarias.
