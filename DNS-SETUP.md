# DNS Setup — rotelu.es → Vercel

## Pendiente (hacer lunes)

### Opción A: Añadir registros A (recomendada)
En el panel de AVZ Servicios, añadir:

| Tipo | Nombre | Valor |
|------|--------|-------|
| A | `rotelu.es` | `76.76.21.21` |
| A | `www.rotelu.es` | `76.76.21.21` |

### Opción B: Cambiar nameservers
Reemplazar los actuales (`ns12466.avzservicios.com`, `ns22466.avzservicios.com`) por:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

### Verificación
Tras el cambio, Vercel verificará automáticamente y emitirá SSL. La web estará disponible en `https://rotelu.es` en minutos.

### Nota
El WordPress actual no se toca. Si se necesita acceder después, se puede mover a `wp.rotelu.es`.
