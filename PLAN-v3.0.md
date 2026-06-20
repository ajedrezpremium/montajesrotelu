# ROTELU v3.0 — La mejor web + agente IA de soldadura del mundo

> **Visión:** Plataforma digital de referencia global en ingeniería de soldadura y calderería pesada. El ChatGPT de la soldadura industrial.

---

## S1 — Agente IA de clase mundial

### S1.1 Motor LLM premium
- [ ] Migrar a modelo **pago** OpenRouter (Claude 3.5 Sonnet o GPT-4o) — sin rate limits, calidad superior
- [ ] Fallback automático a gratuito si el pago falla
- [ ] Ventana de contexto 128K+ para análisis de manuales completos

### S1.2 RAG vectorial (embedding real)
- [ ] Reemplazar TF-IDF por **embeddings** (OpenAI text-embedding-3-small o similar)
- [ ] Almacenar vectores en Supabase pgvector o Pinecone
- [ ] Chunking semántico (no por palabras) con solapamiento controlado
- [ ] Indexar **todos los manuales** del catálogo AMV Ediciones (+50 títulos)
- [ ] RAG multilingüe: documentos en EN/FR/DE + español

### S1.3 Memoria y contexto
- [ ] Memoria conversacional con resúmenes automáticos cada N turnos
- [ ] Detección de intención (consulta técnica, presupuesto, soporte)
- [ ] Historial persistente por sesión en Supabase

### S1.4 Visión técnica
- [ ] Subir foto de soldadura → el agente analiza el cordón, detecta defectos (poros, grietas, mordeduras)
- [ ] Subir foto de plano/PDF → extrae especificaciones automáticamente
- [ ] Integración con modelo multimodal (GPT-4o Vision o Claude 3 Vision)

### S1.5 Voz bidireccional
- [ ] Entrada por voz: Web Speech → whisper (OpenAI) para transcripción precisa
- [ ] Salida por voz con selección hombre/mujer (ya implementado)
- [ ] Conversación continua: hablar sin tocar botones

### S1.6 Fuentes y citas
- [ ] Cada respuesta cita el manual y página exacta de la que extrae info
- [ ] Enlace directo al PDF con el fragmento resaltado
- [ ] Indicador de confianza: mostrar al usuario cuándo la respuesta usa RAG vs. conocimiento general

### S1.7 Modo experto vs. rápido
- [ ] **Modo experto**: respuestas largas, detalladas, con referencias técnicas completas
- [ ] **Modo rápido**: respuestas concisas, ideal para móvil o consultas urgentes

---

## S2 — Web profesional premium

### S2.1 Rendimiento y SEO
- [ ] Lighthouse > 95 en todas las métricas
- [ ] Imágenes en WebP/AVIF con srcset responsive
- [ ] Lazy loading avanzado con placeholders blur
- [ ] CDN para manuales PDF (cloudfront o similar)
- [ ] Core Web Vitals optimizados (CLS < 0.1, FID < 100, LCP < 1.5s)

### S2.2 PWA completo
- [ ] Service worker con cache offline para páginas clave
- [ ] Manifest con iconos 192/512 maskable
- [ ] Prompt de instalación en móvil
- [ ] Sincronización en segundo plano para formularios offline

### S2.3 Blog técnico
- [ ] CMS desde Supabase (artículos con markdown)
- [ ] Categorías: procesos, materiales, normativas, casos prácticos
- [ ] Autor, fecha, etiquetas, SEO metadata
- [ ] RSS feed
- [ ] Traducción automática DeepL + revisión humana

### S2.4 i18n routing
- [ ] URLs con idioma: `/es/projects/salto-grande`, `/en/projects/salto-grande`
- [ ] Detección automática por Accept-Language
- [ ] Redirects 301 para SEO

### S2.5 Calculadora de presupuesto online
- [ ] Seleccionar tipo de trabajo (soldadura, corte, montaje)
- [ ] Dimensiones, material, cantidad
- [ ] Plazo de entrega
- [ ] Cotización instantánea vía IA + precios base

### S2.6 Portal cliente
- [ ] Login con magic link (Supabase Auth)
- [ ] Ver histórico de presupuestos y proyectos
- [ ] Descargar certificados de calidad
- [ ] Subir documentación técnica para nuevos proyectos

### S2.7 Video corporativo
- [ ] Tour virtual 360° de la fábrica (5.000 m²)
- [ ] Vídeos de procesos: SAW robotizada, PWHT, CNC plasma
- [ ] Testimonios en vídeo de clientes (Iberdrola, Repsol, etc.)
- [ ] Galería time-lapse de proyectos complejos

### S2.8 Accesibilidad WCAG 2.1 AA
- [ ] Controles de contraste, foco visible, skip links
- [ ] ARIA labels completos
- [ ] Navegación por teclado
- [ ] Modo alto contraste
- [ ] Texto alternativo descriptivo en todas las imágenes

---

## S3 — Infraestructura y operaciones

### S3.1 DevOps
- [ ] Tests automatizados (Playwright + Vitest)
- [ ] GitHub Actions: lint, typecheck, test, build
- [ ] Preview deployments en cada PR
- [ ] Monitoreo con Sentry (errores) y Plausible (analytics)

### S3.2 CMS unificado
- [ ] Admin panel mejorado con dashboard visual
- [ ] Editor rich text para blog y proyectos
- [ ] Gestión de manuales (subir PDF, metadata)
- [ ] Gestión de usuarios/clientes
- [ ] Backup automático a S3

### S3.3 Seguridad
- [ ] Rate limiting en todas las API routes
- [ ] CSRF protection
- [ ] Helmet headers
- [ ] Auditoría de dependencias semanal
- [ ] WAF básico (Vercel Firewall)

### S3.4 Monetización (opcional)
- [ ] Consultoría IA premium (créditos)
- [ ] Acceso a biblioteca completa de manuales (suscripción)
- [ ] Formación online soldadura certificada

---

## Roadmap

| Fase | Prioridad | Esfuerzo |
|------|-----------|----------|
| **S1.1** Motor LLM pago | 🔴 Crítica | 1 día |
| **S1.2** RAG vectorial | 🔴 Crítica | 1 semana |
| **S1.6** Citas y fuentes | 🔴 Crítica | 2 días |
| **S1.4** Visión soldadura | 🟡 Alta | 1 semana |
| **S2.3** Blog técnico | 🟡 Alta | 3 días |
| **S2.4** i18n routing | 🟡 Alta | 2 días |
| **S2.8** Accesibilidad | 🟡 Alta | 3 días |
| **S2.2** PWA completo | 🟡 Alta | 2 días |
| **S1.7** Modos experto/rápido | 🟢 Media | 1 día |
| **S2.5** Calculadora presupuesto | 🟢 Media | 1 semana |
| **S1.5** Voz bidireccional | 🟢 Media | 3 días |
| **S2.1** Performance imágenes | 🟢 Media | 2 días |
| **S3.1** DevOps pipeline | 🟢 Media | 3 días |
| **S2.6** Portal cliente | 🔵 Baja | 2 semanas |
| **S2.7** Video corporativo | 🔵 Baja | 1 semana |
| **S1.3** Memoria persistente | 🔵 Baja | 3 días |
| **S3.2** CMS dashboard | 🔵 Baja | 1 semana |
| **S3.4** Monetización | ⚪ Futuro | variable |

---

**Prioridades inmediatas (post-v2.0):**
1. ⬜ D1: Visor PDF inline en Biblioteca *(hecho en sesión, confirmar)*
2. ⬜ E3: Blog técnico con Supabase
3. ⬜ F1: WebP/AVIF images
4. ⬜ F3: PWA service worker

**Hito crítico:** DNS rotelu.es → Vercel (lunes, A records a `76.76.21.21`)
