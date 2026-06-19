export interface KnowledgeEntry {
  keywords: string[];
  response: string;
  category: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["soldadura", "welding", "certificada", "certified", "iso 3834", "3834"],
    category: "Calidad - Soldadura",
    response:
      "ROTELU está certificada bajo **ISO 3834-2** (Certificación de Soldadura). Esto significa que todos nuestros procesos de soldadura cumplen con los más altos estándares internacionales. Disponemos de soldadores homologados según EN 287/ISO 9606 y procedimientos WPS/PQR cualificados. Aplicamos ensayos no destructivos (END) como ultrasonidos, partículas magnéticas, líquidos penetrantes y radiografía industrial en todas nuestras uniones críticas.",
  },
  {
    keywords: ["en 1090", "1090", "exc", "exc1", "exc2", "exc3", "ejecución", "structural"],
    category: "Calidad - EN 1090",
    response:
      "ROTELU fabrica bajo el estándar **EN 1090** para estructuras metálicas, cubriendo los niveles EXC1, EXC2 y EXC3. Esto nos permite ejecutar desde estructuras simples hasta las más exigentes, como las destinadas a soportar cargas extremas en centrales hidroeléctricas, parques eólicos offshore y aplicaciones navales. Todos nuestros procesos están documentados con trazabilidad completa.",
  },
  {
    keywords: ["hidroeléctrica", "hydroelectric", "tubería", "penstock", "cámara espiral", "spiral case", "draft tube"],
    category: "Soluciones - Hidroeléctrico",
    response:
      "ROTELU fabrica componentes críticos para centrales hidroeléctricas: **tuberías forzadas (penstocks)** de gran diámetro, **cámaras espirales (spiral cases)** para turbinas Francis y Kaplan, **tubos de aspiración (draft tubes)** y compuertas. Trabajamos con aceros de alta resistencia y espesores elevados, aplicando procesos de soldadura certificados y controles de calidad 100%. Nuestra experiencia incluye proyectos para grandes presas internacionales con condiciones extremas de presión y fatiga.",
  },
  {
    keywords: ["offshore", "eólica", "wind", "marina", "marine", "nodo", "node", "boat landing"],
    category: "Soluciones - Offshore Wind",
    response:
      "ROTELU fabrica **nodos estructurales de precisión** para plataformas eólicas offshore, **boat landings**, **tubos estructurales** y componentes para subestaciones marinas. Estos elementos deben soportar condiciones extremas: viento, oleaje, corrosión salina y fatiga cíclica durante 25+ años. Trabajamos con aceros offshore certificados (EN 10225), aplicamos protección catódica y coatings especiales, con tolerancias dimensionales milimétricas en piezas de varias toneladas.",
  },
  {
    keywords: ["naval", "shipbuilding", "barco", "ship", "astillero"],
    category: "Soluciones - Naval",
    response:
      "ROTELU proporciona soluciones metálicas de alta complejidad para la industria naval: **bloques de proa y popa**, **soportes de línea de ejes**, **estructuras de cubierta**, **tanques** y **componentes para sistemas de propulsión**. Trabajamos bajo supervisión de sociedades de clasificación (DNV, Bureau Veritas, Lloyd's) con aceros navales certificados y procedimientos de soldadura aprobados.",
  },
  {
    keywords: ["presión", "pressure", "recipiente", "vessel", "tanque", "tank", "caldera"],
    category: "Soluciones - Equipos a Presión",
    response:
      "ROTELU fabrica **recipientes a presión (pressure vessels)**, **tanques de almacenamiento** y **componentes especiales** para procesos industriales. Cumplimos con la directiva europea PED (2014/68/EU) y códigos ASME. Realizamos diseños con análisis de elementos finitos (FEA), selección de materiales según norma, y ensayos hidrostáticos y neumáticos para garantizar la integridad del equipo.",
  },
  {
    keywords: ["calidad", "quality", "certificación", "certification", "control", "ndt", "ensayo"],
    category: "Calidad - Control",
    response:
      "El sistema de calidad de ROTELU está certificado bajo **ISO 3834-2** y **EN 1090** (EXC1/EXC2/EXC3). Realizamos ensayos no destructivos (END): ultrasonidos (UT), partículas magnéticas (MT), líquidos penetrantes (PT), radiografía industrial (RT) y pruebas de presión. Contamos con trazabilidad documental completa de cada proyecto, desde la recepción del material hasta la entrega final. Disponemos también de certificación medioambiental y de seguridad laboral.",
  },
  {
    keywords: ["historia", "history", "fundada", "founded", "1988", "años", "years", "experiencia", "experience"],
    category: "Empresa - Historia",
    response:
      "ROTELU fue fundada en **1988** en **Pontevedra, España**, y cuenta con más de **35 años de experiencia** en calderería pesada, construcción soldada y estructuras metálicas complejas. Durante estas tres décadas, hemos participado en proyectos emblemáticos para los sectores hidroeléctrico, eólico offshore, naval e industrial, ganándonos la confianza de ingenierías internacionales y grandes grupos energéticos.",
  },
  {
    keywords: ["proyecto", "project", "referencia", "reference", "portfolio", "trabajo", "work"],
    category: "Empresa - Proyectos",
    response:
      "ROTELU ha ejecutado proyectos en múltiples países y continentes. Nuestro portfolio incluye: nodos offshore para parques eólicos marinos, tuberías forzadas para centrales hidroeléctricas, estructuras navales de alta precisión, y componentes críticos para plantas de energía. Cada proyecto incluye ficha técnica detallada con dimensiones, pesos, materiales, procesos de soldadura y controles de calidad aplicados. Solicite acceso a nuestra galería técnica para más información.",
  },
  {
    keywords: ["contacto", "contact", "presupuesto", "quote", "cotización", "comercial", "sales"],
    category: "Contacto Comercial",
    response:
      "Para consultas técnicas y solicitudes de presupuesto, puede contactar directamente con nuestro equipo de ingeniería a través del formulario en la sección de contacto, o enviando un correo con la documentación técnica del proyecto (planos, especificaciones, dimensiones, materiales requeridos y plazos estimados). Cuanta más información técnica nos proporcione, más precisa será nuestra respuesta. Analizamos proyectos desde 1 tonelada hasta 500+ toneladas.",
  },
  {
    keywords: ["material", "acero", "steel", "inoxidable", "stainless", "carbono", "carbon", "aleación", "alloy"],
    category: "Materiales",
    response:
      "ROTELU trabaja con una amplia gama de materiales: **acero al carbono** (S235, S275, S355, S460), **acero para alta temperatura** (P265GH, 16Mo3, 13CrMo4-5), **acero inoxidable** (304/L, 316/L, 316Ti, 321, 347), **acero offshore** (EN 10225 S355G10, S420G10, S460G10), y **aceros de alta resistencia** (S690QL, S960QL). Realizamos ensayos de recepción y trazabilidad completa de colada.",
  },
  {
    keywords: ["proceso", "process", "fabricación", "manufacturing", "corte", "cutting", "soldadura", "mecanizado"],
    category: "Procesos Industriales",
    response:
      "Nuestro proceso de fabricación incluye: 1) Revisión de ingeniería, 2) Selección y recepción de materiales, 3) Corte por plasma, oxicorte o cizalla, 4) Conformado (plegado, rolado, curvado), 5) Soldadura certificada (SAW, MIG/MAG, TIG, electrodo revestido), 6) Ensayos no destructivos (UT, MT, PT, RT), 7) Tratamiento superficial (chorreado, pintura, galvanizado), 8) Inspección final y 9) Entrega. Todo el proceso está documentado con trazabilidad completa.",
  },
  {
    keywords: ["plazo", "lead time", "entrega", "delivery", "tiempo", "time"],
    category: "Plazos",
    response:
      "Los plazos de entrega dependen de la complejidad y dimensiones del proyecto. Para componentes estándar, el lead time típico es de 8-16 semanas. Proyectos complejos (tuberías forzadas, nodos offshore) pueden requerir 20-40 semanas. Trabajamos con planificación detallada e hitos intermedios, proporcionando informes de avance semanales al cliente.",
  },
  {
    keywords: ["precio", "price", "coste", "cost", "económico", "barato", "caro"],
    category: "Comercial",
    response:
      "ROTELU compite en calidad, precisión y cumplimiento de plazos, no solo en precio. Nuestros clientes nos eligen porque ofrecemos la garantía de que un componente crítico se fabricará correctamente desde la primera vez, eliminando costes de retrabajo y retrasos en obra. Para obtener un presupuesto adaptado a su proyecto, por favor comparta los planos y especificaciones técnicas. Le responderemos con una oferta detallada y competitiva.",
  },
  {
    keywords: ["ubicación", "location", "pontevedra", "españa", "spain", "galicia", "instalaciones", "facilities"],
    category: "Empresa - Instalaciones",
    response:
      "ROTELU tiene sus instalaciones en **Pontevedra, Galicia, España**, estratégicamente situada cerca del puerto marítimo para facilitar la exportación de grandes componentes. Contamos con talleres de 5,000+ m² cubiertos con puentes grúa de hasta 40 toneladas, mesas de soldadura robotizadas, equipos de corte por plasma CNC, hornos de tratamiento térmico y equipos de ensayo no destructivo. Nuestra ubicación nos permite acceso rápido a las principales rutas marítimas europeas.",
  },
  {
    keywords: ["hola", "hello", "buenos días", "buenas", "saludos"],
    category: "Saludo",
    response:
      "¡Hola! Soy el **Asistente de Ingeniería de ROTELU**. Estoy aquí para ayudarle con cualquier consulta técnica sobre fabricación de estructuras metálicas, calderería pesada, soldadura certificada y componentes para los sectores hidroeléctrico, offshore, naval e industrial. ¿En qué puedo ayudarle hoy?",
  },
  {
    keywords: ["gracias", "thank", "thanks"],
    category: "Agradecimiento",
    response:
      "Gracias a usted por confiar en ROTELU. Si tiene más preguntas técnicas o desea solicitar un presupuesto para su proyecto, no dude en consultarme. ¡Estamos aquí para ayudarle a hacer realidad sus proyectos de ingeniería!",
  },
];

export function findResponse(message: string): KnowledgeEntry | null {
  const lower = message.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

export const suggestedQuestions = [
  "¿Qué certificaciones de soldadura tenéis?",
  "¿Fabricáis componentes para eólica offshore?",
  "¿Hacéis tuberías forzadas hidroeléctricas?",
  "¿Cuál es vuestra experiencia en proyectos?",
  "¿Qué materiales trabajáis?",
  "¿Cómo solicito un presupuesto?",
];
