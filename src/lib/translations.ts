export type Language = "en" | "es" | "fr" | "de";

export const defaultLanguage: Language = "en";

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export function getBaseUrl(): string {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL || "https://rotelu-web.vercel.app";
}

const translations: Record<Language, Record<string, string | string[]>> = {
  en: {
    /* Navbar */
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.capabilities": "Capabilities",
    "nav.process": "Process",
    "nav.library": "Library",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",

    /* Library */
    "library.title": "Technical Library",
    "library.subtitle": "Welding manuals, standards, and technical resources for professionals",
    "library.view": "View PDF",
    "library.desc.sweiss": "Complete welding manual covering SMAW, GMAW (MIG/MAG), GTAW (TIG), FCAW, and SAW processes. Includes electrode classification (AWS), welding machine types, polarity, amperage tables, and safety. 72 pages.",
    "library.desc.dcm": "Introductory welding guide covering SMAW, MIG/MAG, TIG, and oxyfuel processes. Includes basics of weldability, materials, safety equipment, and joint preparation. 21 pages.",
    "library.filter": "Filter by process",

    /* Hero */
    "hero.badge": "Steel fabrication & engineering since 1988",
    "hero.title1": "Engineering steel solutions",
    "hero.title2": "for the industries that move the world.",
    "hero.subtitle": "More than 35 years manufacturing critical welded structures for hydroelectric, offshore wind, naval and industrial clients worldwide.",
    "hero.btn1": "Explore Our Projects",
    "hero.btn2": "Contact Our Engineering Team",
    "hero.cert1": "EN 1090 EXC3",
    "hero.cert2": "ISO 3834-2",
    "hero.cert3": "PED 2014/68/EU",

    /* Stats */
    "stats.tag": "By the Numbers",
    "stats.title": "35+ Years of Industrial Steel Expertise",
    "stats.years": "35+",
    "stats.established": "Since 1988",
    "stats.quality": "100% Quality Commitment",
    "stats.projects": "120+",
    "stats.clients": "International Clients",

    /* Projects Section */
    "projects.tag": "Our Work",
    "projects.title": "Featured Projects",
    "projects.subtitle": "From hydroelectric penstocks to offshore wind jackets — explore a selection of our most representative steel fabrication projects.",
    "projects.viewAll": "View All Projects",

    /* Hydro project */
    "hydro.title": "Penstocks — Gorona del Viento",
    "hydro.sector": "Hydroelectric",
    "hydro.country": "Spain",
    "hydro.year": "2018",
    "hydro.desc": "Fabrication of two penstocks weighing 1,686 tonnes for a hydroelectric plant with a 625-metre head and an average gradient of 40%.",
    "hydro.material": "P265GH / S460N",

    /* Offshore project */
    "offshore.title": "Offshore Nodes — Wikinger & East Anglia One",
    "offshore.sector": "Offshore Wind",
    "offshore.country": "North Sea",
    "offshore.year": "2017",
    "offshore.desc": "Fabrication of structural nodes and boat landings for offshore wind jackets. Weld rejection rate below 0.25%.",
    "offshore.material": "EN 10225 S355G10+M",

    /* Pressure Vessels */
    "pressure.title": "Tanks & Pressure Vessels",
    "pressure.sector": "Pressure Equipment",
    "pressure.country": "Spain / Portugal",
    "pressure.year": "2000–2024",
    "pressure.desc": "Over 4,000 tanks installed across Galicia and northern Portugal for liquid fuels. Fabrication of pressure vessels for industrial applications.",
    "pressure.material": "SA-516 Gr.70 / 316L",

    /* Naval */
    "naval.title": "Naval Blocks",
    "naval.sector": "Shipbuilding",
    "naval.country": "Spain",
    "naval.year": "2022",
    "naval.desc": "Prefabrication of blocks for vessels and naval equipment under Classification Society (IACS) requirements.",
    "naval.material": "Naval steel Grade A / AH / DH",

    /* Clients */
    "clients.tag": "Trusted Partners",
    "clients.title": "Who We Work With",
    "clients.subtitle": "Our clients include leading energy companies, EPC contractors, and shipyards across Europe and beyond.",
    "clients.testimonial1": "Rotelu delivered exceptional quality on the Gorona del Viento penstocks. Their welding and dimensional control exceeded our expectations.",
    "clients.testimonial2": "The offshore node fabrication for Wikinger achieved the lowest rejection rate we have seen across all suppliers. A truly reliable partner.",
    "clients.testimonial3": "We have worked with Rotelu for over 15 years on pressure vessel supply. Their consistency and on-time delivery are unmatched.",
    "clients.author1": "José María González",
    "clients.company1": "Iberdrola Engineering",
    "clients.years1": "10+ years",
    "clients.author2": "Dr. Klaus Weber",
    "clients.company2": "Iberdrola Renovables (Wikinger Project)",
    "clients.years2": "5+ years",
    "clients.author3": "Manuel Silva",
    "clients.company3": "Repsol Petróleo",
    "clients.years3": "15+ years",

    /* Capabilities */
    "caps.tag": "Our Expertise",
    "caps.title": "Core Capabilities",

    "caps.hydro.title": "Hydroelectric Penstocks",
    "caps.hydro.desc": "End-to-end engineering, fabrication, and installation of high-pressure penstocks for hydroelectric plants, including bifurcations, expansion joints, and support structures.",
    "caps.hydro.items": [
      "Heavy plate forming (up to 75 mm thickness)",
      "Submerged arc welding (SAW) for longitudinal seams",
      "3D dimensional control with laser tracking",
      "On-site assembly and weld supervision",
      "Protective coating and lining systems",
    ],

    "caps.offshore.title": "Offshore Wind Components",
    "caps.offshore.desc": "Fabrication of structural nodes, boat landings, transition pieces, and other critical components for offshore wind jacket foundations and topsides.",
    "caps.offshore.items": [
      "Complex tubular joint welding (XXT grade)",
      "Magnetic particle and ultrasonic NDT",
      "DNV-GL / ABS classification compliance",
      "Corrosion protection and coating systems",
    ],

    "caps.shipbuilding.title": "Shipbuilding & Naval",
    "caps.shipbuilding.desc": "Prefabrication of curved and flat block sections for commercial vessels, naval ships, and offshore units under IACS classification.",
    "caps.shipbuilding.items": [
      "Block assembly and pre-outfitting",
      "CNC plate cutting and forming",
      "Weld procedure qualification (WPQR)",
      "Tolerance control per shipyard standards",
    ],

    "caps.pressure.title": "Pressure Vessels & Tanks",
    "caps.pressure.desc": "Design and fabrication of pressure vessels, storage tanks, and process equipment for the oil & gas, chemical, and energy sectors.",
    "caps.pressure.items": [
      "ASME VIII Div. 1 & PED 2014/68/EU",
      "Rolling and forming of cylindrical shells",
      "Nozzle reinforcement and internal fitting",
      "Hydrostatic and pneumatic pressure testing",
    ],

    /* Process */
    "process.tag": "How We Work",
    "process.title": "Our Process",
    "process.subtitle": "From concept to delivery — a disciplined, quality-driven workflow that ensures every project meets the highest standards.",
    "process.step1.title": "1. Technical Review",
    "process.step1.desc": "In-depth review of specifications, drawings, and material requirements. We identify critical points and optimise the fabrication approach.",
    "process.step2.title": "2. Material Procurement",
    "process.step2.desc": "Sourcing certified steels and consumables from approved mills. All materials are traceable and tested before acceptance.",
    "process.step3.title": "3. Plate Preparation",
    "process.step3.desc": "CNC cutting, bevelling, and edge preparation. Plates are marked and grouped for efficient nesting and minimal waste.",
    "process.step4.title": "4. Forming & Rolling",
    "process.step4.desc": "Cold and hot forming of plates into cylindrical shells, cones, and complex geometries using our heavy-duty rolling equipment.",
    "process.step5.title": "5. Welding & Assembly",
    "process.step5.desc": "Multi-process welding (SAW, FCAW, SMAW) by qualified welders. All procedures follow approved WPS and are witnessed by inspectors.",
    "process.step6.title": "6. Quality Control & NDT",
    "process.step6.desc": "100% inspection programme including visual, dimensional, ultrasonic, magnetic particle, and radiographic testing as required.",
    "process.step7.title": "7. Surface Treatment",
    "process.step7.desc": "Blast cleaning to SA 2.5, primer and final coating application in controlled conditions. Certified coating inspectors oversee all layers.",
    "process.step8.title": "8. Logistics & Delivery",
    "process.step8.desc": "Transport engineering, sea-fastening design, and just-in-time delivery to site or shipyard. Full traceability documentation included.",

    /* Certifications */
    "cert.tag": "Accreditations",
    "cert.title": "Certifications & Standards",
    "cert.subtitle": "We hold internationally recognised certifications that attest to our quality, safety, and technical capability.",
    "cert.item1.title": "ISO 3834-2",
    "cert.item1.desc": "Full quality standard for fusion welding of metallic materials. Covers all fabrication stages from design through final inspection.",
    "cert.item2.title": "EN 1090 EXC4",
    "cert.item2.desc": "Execution class 4 — the highest category for the fabrication of steel structures. Required for seismic and fatigue-loaded structures.",
    "cert.item3.title": "PED 2014/68/EU",
    "cert.item3.desc": "Pressure Equipment Directive for the design and manufacture of pressure vessels and assemblies above specific pressure limits.",
    "cert.item4.title": "IACS Classification",
    "cert.item4.desc": "Approved by member societies of the International Association of Classification Societies for naval and offshore structural fabrication.",

    /* Facilities */
    "fac.tag": "Our Plant",
    "fac.title": "Facilities & Equipment",
    "fac.subtitle": "Our workshop in A Coruña, Spain is equipped to handle heavy, complex steel fabrication projects from start to finish.",
    "fac.item1.title": "Workshop Capacity",
    "fac.item1.desc": "3,600 m² total facility with 2,250 m² of covered workshop space. Maximum height under hook: 6.7 m. Maximum workpiece diameter: 5.0 m. Maximum length: 75 m.",
    "fac.item2.title": "Crane & Handling",
    "fac.item2.desc": "2 x 16-tonne bridge cranes and 5 x 10-tonne bridge cranes for flexible and precise heavy-component handling across the workshop floor.",
    "fac.item3.title": "Welding Equipment",
    "fac.item3.desc": "9 multi-process welding machines (MIG/MAG, TIG, FCAW, SMAW) plus 2 submerged arc welding (SAW) columns for automated longitudinal and circumferential seams.",
    "fac.item4.title": "Plate Processing",
    "fac.item4.desc": "CNC oxyfuel and plasma cutting tables, heavy-duty plate rolls (up to 75 mm), bevelling machines, and hydraulic press for forming complex geometries.",

    /* Team */
    "team.tag": "Our People",
    "team.title": "Management Team",
    "team.subtitle": "Experienced professionals committed to quality, precision, and continuous improvement across every project.",
    "team.member1.name": "José Ramón Pardo",
    "team.member1.role": "General Manager",
    "team.member1.desc": "Over 30 years of leadership in steel fabrication and industrial project management. Drives the company's strategic vision and operational excellence.",
    "team.member2.name": "Juan Carlos López",
    "team.member2.role": "Technical Director",
    "team.member2.desc": "Expert in welding engineering and heavy fabrication. Oversees all technical approvals, WPS qualification, and quality assurance systems.",
    "team.member3.name": "María Rodríguez",
    "team.member3.role": "Quality Manager",
    "team.member3.desc": "Responsible for ISO 3834-2 and EN 1090 compliance. Leads the NDT team and ensures every product meets the strictest inspection criteria.",
    "team.member4.name": "Ángel Fernández",
    "team.member4.role": "Production Manager",
    "team.member4.desc": "Manages workshop operations, production planning, and resource allocation. Known for achieving on-time delivery without compromising quality.",

    /* Contact */
    "contact.tag": "Get in Touch",
    "contact.title": "Let's Work Together",
    "contact.subtitle": "Tell us about your project — our team will respond within 24 hours with a preliminary assessment.",
    "contact.form.name": "Name",
    "contact.form.company": "Company",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.country": "Country",
    "contact.form.sector": "Sector",
    "contact.form.description": "Project Description",
    "contact.form.error": "Something went wrong. Please try again or email us directly at info@rotelu.es.",
    "contact.form.sector.options": [
      "Hydroelectric",
      "Offshore Wind",
      "Shipbuilding",
      "Pressure Equipment",
      "Oil & Gas",
      "Other",
    ],
    "contact.submit": "Send Message",
    "contact.success": "Thank you. We have received your enquiry and will be in touch shortly.",

    /* Footer */
    "footer.description": "Montajes Rotelu S.L. is a Spanish steel fabrication company specialising in heavy structures, pressure vessels, offshore components, and naval blocks. Founded in 1988.",
    "footer.solutions": "Solutions",
    "footer.company": "Company",
    "footer.contact": "Contact",
    "footer.copyright": "© {year} ROTELU — All rights reserved.",
    "footer.legal": "Legal Notice & Privacy Policy",

    /* Chatbot */
    "chatbot.greeting": "Hello! I'm Rotelu's virtual assistant. How can I help you today?",
    "chatbot.placeholder": "Type your message here...",
    "chatbot.status.online": "Online",
    "chatbot.status.thinking": "Thinking...",
    "chatbot.footer": "Powered by Rotelu AI",

    /* Common */
    "common.learnMore": "Learn More",
    "common.scroll": "Scroll to explore",
    "common.explore": "Explore",
    "common.contact": "Contact Us",
  },

  es: {
    /* Navbar */
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.capabilities": "Capacidades",
    "nav.process": "Proceso",
    "nav.library": "Biblioteca",
    "nav.certifications": "Certificaciones",
    "nav.contact": "Contacto",

    /* Library */
    "library.title": "Biblioteca Técnica",
    "library.subtitle": "Manuales de soldadura, normas y recursos técnicos para profesionales",
    "library.view": "Ver PDF",
    "library.desc.sweiss": "Manual completo de soldadura que cubre procesos SMAW, GMAW (MIG/MAG), GTAW (TIG), FCAW y SAW. Incluye clasificación de electrodos (AWS), tipos de máquinas de soldar, polaridad, tablas de amperaje y seguridad. 72 páginas.",
    "library.desc.dcm": "Guía introductoria de soldadura que cubre procesos SMAW, MIG/MAG, TIG y oxigas. Incluye conceptos básicos de soldabilidad, materiales, equipos de seguridad y preparación de juntas. 21 páginas.",
    "library.filter": "Filtrar por proceso",

    /* Hero */
    "hero.badge": "Fabricación de acero e ingeniería desde 1988",
    "hero.title1": "Precisión en",
    "hero.title2": "Fabricación de Acero",
    "hero.subtitle": "Estructuras pesadas de acero, recipientes a presión, componentes offshore y bloques navales — diseñados y fabricados en España para la industria global.",
    "hero.btn1": "Ver Proyectos",
    "hero.btn2": "Contáctenos",
    "hero.cert1": "ISO 3834-2",
    "hero.cert2": "EN 1090 EXC3",
    "hero.cert3": "PED 2014/68/EU",

    /* Stats */
    "stats.tag": "En Cifras",
    "stats.title": "Más de 35 Años de Experiencia en Acero Industrial",
    "stats.years": "35+",
    "stats.established": "Fundada en 1988",
    "stats.quality": "100 % Compromiso con la Calidad",
    "stats.projects": "120+",
    "stats.clients": "Clientes Internacionales",

    /* Projects */
    "projects.tag": "Nuestro Trabajo",
    "projects.title": "Proyectos Destacados",
    "projects.subtitle": "Desde tuberías forzadas hidroeléctricas hasta jackets eólicos offshore — explore una selección de nuestros proyectos de fabricación de acero más representativos.",
    "projects.viewAll": "Ver Todos los Proyectos",

    /* Hydro */
    "hydro.title": "Tuberías Forzadas — Gorona del Viento",
    "hydro.sector": "Hidroeléctrico",
    "hydro.country": "España",
    "hydro.year": "2018",
    "hydro.desc": "Fabricación de dos tuberías forzadas de 1.686 toneladas para central hidroeléctrica con salto de 625 metros y pendiente media del 40%.",
    "hydro.material": "P265GH / S460N",

    /* Offshore */
    "offshore.title": "Nudos Offshore — Wikinger & East Anglia One",
    "offshore.sector": "Eólica Offshore",
    "offshore.country": "Mar del Norte",
    "offshore.year": "2017",
    "offshore.desc": "Fabricación de nudos estructurales y boatlandings para jackets eólicos offshore. Índice de rechazo en soldadura inferior al 0,25%.",
    "offshore.material": "EN 10225 S355G10+M",

    /* Pressure */
    "pressure.title": "Tanques y Recipientes a Presión",
    "pressure.sector": "Equipos a Presión",
    "pressure.country": "España / Portugal",
    "pressure.year": "2000–2024",
    "pressure.desc": "Más de 4.000 tanques instalados en Galicia y norte de Portugal para combustibles líquidos. Fabricación de recipientes a presión para la industria.",
    "pressure.material": "SA-516 Gr.70 / 316L",

    /* Naval */
    "naval.title": "Bloques Navales",
    "naval.sector": "Construcción Naval",
    "naval.country": "España",
    "naval.year": "2022",
    "naval.desc": "Prefabricación de bloques para buques y equipamientos navales bajo requisitos de Sociedades de Clasificación (IACS).",
    "naval.material": "Acero naval Grado A / AH / DH",

    /* Clients */
    "clients.tag": "Socios de Confianza",
    "clients.title": "Con Quién Trabajamos",
    "clients.subtitle": "Nuestros clientes incluyen destacadas empresas energéticas, contratistas EPC y astilleros de toda Europa y otros continentes.",
    "clients.testimonial1": "Rotelu entregó una calidad excepcional en las tuberías forzadas de Gorona del Viento. Su soldadura y control dimensional superaron nuestras expectativas.",
    "clients.testimonial2": "La fabricación de nudos offshore para Wikinger logró la tasa de rechazo más baja que hemos visto entre todos los proveedores. Un socio verdaderamente fiable.",
    "clients.testimonial3": "Trabajamos con Rotelu desde hace más de 15 años en el suministro de recipientes a presión. Su consistencia y entrega a tiempo no tienen igual.",
    "clients.author1": "José María González",
    "clients.company1": "Iberdrola Ingeniería",
    "clients.years1": "10+ años",
    "clients.author2": "Dr. Klaus Weber",
    "clients.company2": "Iberdrola Renovables (Proyecto Wikinger)",
    "clients.years2": "5+ años",
    "clients.author3": "Manuel Silva",
    "clients.company3": "Repsol Petróleo",
    "clients.years3": "15+ años",

    /* Capabilities */
    "caps.tag": "Nuestra Experiencia",
    "caps.title": "Capacidades Principales",

    "caps.hydro.title": "Tuberías Forzadas Hidroeléctricas",
    "caps.hydro.desc": "Ingeniería, fabricación e instalación integral de tuberías forzadas de alta presión para centrales hidroeléctricas, incluyendo bifurcaciones, juntas de expansión y estructuras de soporte.",
    "caps.hydro.items": [
      "Conformado de chapa gruesa (hasta 75 mm de espesor)",
      "Soldadura por arco sumergido (SAW) para uniones longitudinales",
      "Control dimensional 3D con seguimiento láser",
      "Montaje en obra y supervisión de soldadura",
      "Sistemas de revestimiento y protección",
    ],

    "caps.offshore.title": "Componentes Eólicos Offshore",
    "caps.offshore.desc": "Fabricación de nudos estructurales, boatlandings, piezas de transición y otros componentes críticos para jackets y topsides eólicos offshore.",
    "caps.offshore.items": [
      "Soldadura de uniones tubulares complejas (grado XXT)",
      "END por partículas magnéticas y ultrasonidos",
      "Cumplimiento de clasificación DNV-GL / ABS",
      "Sistemas de protección anticorrosión y recubrimiento",
    ],

    "caps.shipbuilding.title": "Construcción Naval",
    "caps.shipbuilding.desc": "Prefabricación de bloques curvos y planos para buques mercantes, buques militares y unidades offshore bajo clasificación IACS.",
    "caps.shipbuilding.items": [
      "Ensamblaje de bloques y preequipamiento",
      "Corte y conformado de chapa con CNC",
      "Cualificación de procedimientos de soldadura (WPQR)",
      "Control de tolerancias según estándares de astillero",
    ],

    "caps.pressure.title": "Recipientes a Presión y Tanques",
    "caps.pressure.desc": "Diseño y fabricación de recipientes a presión, tanques de almacenamiento y equipos de proceso para los sectores de oil & gas, químico y energético.",
    "caps.pressure.items": [
      "ASME VIII Div. 1 y PED 2014/68/UE",
      "Cilindrado y conformado de virolas",
      "Refuerzos de bocas y accesorios interiores",
      "Pruebas de presión hidrostática y neumática",
    ],

    /* Process */
    "process.tag": "Cómo Trabajamos",
    "process.title": "Nuestro Proceso",
    "process.subtitle": "Del concepto a la entrega — un flujo de trabajo disciplinado y orientado a la calidad que garantiza que cada proyecto cumpla con los más altos estándares.",
    "process.step1.title": "1. Revisión Técnica",
    "process.step1.desc": "Revisión exhaustiva de especificaciones, planos y requisitos de materiales. Identificamos los puntos críticos y optimizamos el enfoque de fabricación.",
    "process.step2.title": "2. Adquisición de Materiales",
    "process.step2.desc": "Compra de aceros certificados y consumibles de molinos aprobados. Todos los materiales son trazables y ensayados antes de su aceptación.",
    "process.step3.title": "3. Preparación de Chapa",
    "process.step3.desc": "Corte CNC, biselado y preparación de bordes. Las chapas se marcan y agrupan para un anidamiento eficiente con mínimo desperdicio.",
    "process.step4.title": "4. Conformado y Cilindrado",
    "process.step4.desc": "Conformado en frío y en caliente de chapas para formar virolas cilíndricas, conos y geometrías complejas con nuestro equipo de cilindrado de alta capacidad.",
    "process.step5.title": "5. Soldadura y Ensamblaje",
    "process.step5.desc": "Soldadura multiproceso (SAW, FCAW, SMAW) realizada por soldadores cualificados. Todos los procedimientos siguen WPS aprobados y son supervisados por inspectores.",
    "process.step6.title": "6. Control de Calidad y END",
    "process.step6.desc": "Programa de inspección al 100% que incluye ensayos visuales, dimensionales, ultrasonidos, partículas magnéticas y radiográficos según se requiera.",
    "process.step7.title": "7. Tratamiento Superficial",
    "process.step7.desc": "Chorreado a grado SA 2.5, imprimación y aplicación de capa final en condiciones controladas. Inspectores de recubrimiento certificados supervisan todas las capas.",
    "process.step8.title": "8. Logística y Entrega",
    "process.step8.desc": "Ingeniería de transporte, diseño de sujeción marítima y entrega justo a tiempo en obra o astillero. Documentación de trazabilidad completa incluida.",

    /* Certifications */
    "cert.tag": "Acreditaciones",
    "cert.title": "Certificaciones y Normas",
    "cert.subtitle": "Poseemos certificaciones de reconocimiento internacional que avalan nuestra calidad, seguridad y capacidad técnica.",
    "cert.item1.title": "ISO 3834-2",
    "cert.item1.desc": "Norma completa de calidad para soldadura por fusión de materiales metálicos. Abarca todas las etapas de fabricación, desde el diseño hasta la inspección final.",
    "cert.item2.title": "EN 1090 EXC4",
    "cert.item2.desc": "Clase de ejecución 4 — la categoría más alta para la fabricación de estructuras de acero. Requerida para estructuras sísmicas y sometidas a fatiga.",
    "cert.item3.title": "PED 2014/68/UE",
    "cert.item3.desc": "Directiva de Equipos a Presión para el diseño y fabricación de recipientes a presión y conjuntos por encima de límites específicos de presión.",
    "cert.item4.title": "Clasificación IACS",
    "cert.item4.desc": "Aprobado por las sociedades miembro de la Asociación Internacional de Sociedades de Clasificación para la fabricación de estructuras navales y offshore.",

    /* Facilities */
    "fac.tag": "Nuestra Planta",
    "fac.title": "Instalaciones y Equipos",
    "fac.subtitle": "Nuestro taller en A Coruña, España, está equipado para manejar proyectos de fabricación de acero pesados y complejos de principio a fin.",
    "fac.item1.title": "Capacidad del Taller",
    "fac.item1.desc": "3.600 m² de instalaciones totales con 2.250 m² de superficie cubierta. Altura máxima bajo gancho: 6,7 m. Diámetro máximo de pieza: 5,0 m. Longitud máxima: 75 m.",
    "fac.item2.title": "Puentes Grúa y Manipulación",
    "fac.item2.desc": "2 puentes grúa de 16 toneladas y 5 puentes grúa de 10 toneladas para una manipulación flexible y precisa de componentes pesados en toda la nave.",
    "fac.item3.title": "Equipos de Soldadura",
    "fac.item3.desc": "9 máquinas de soldadura multiproceso (MIG/MAG, TIG, FCAW, SMAW) más 2 columnas de soldadura por arco sumergido (SAW) para uniones automatizadas longitudinales y circunferenciales.",
    "fac.item4.title": "Procesado de Chapa",
    "fac.item4.desc": "Mesas de corte CNC oxicorte y plasma, cilindros de gran capacidad (hasta 75 mm), máquinas de biselado y prensa hidráulica para conformado de geometrías complejas.",

    /* Team */
    "team.tag": "Nuestro Equipo",
    "team.title": "Equipo Directivo",
    "team.subtitle": "Profesionales experimentados comprometidos con la calidad, la precisión y la mejora continua en cada proyecto.",
    "team.member1.name": "José Ramón Pardo",
    "team.member1.role": "Director General",
    "team.member1.desc": "Más de 30 años de liderazgo en fabricación de acero y gestión de proyectos industriales. Impulsa la visión estratégica y la excelencia operativa de la empresa.",
    "team.member2.name": "Juan Carlos López",
    "team.member2.role": "Director Técnico",
    "team.member2.desc": "Experto en ingeniería de soldadura y fabricación pesada. Supervisa todas las aprobaciones técnicas, cualificación de WPS y sistemas de aseguramiento de la calidad.",
    "team.member3.name": "María Rodríguez",
    "team.member3.role": "Responsable de Calidad",
    "team.member3.desc": "Responsable del cumplimiento de ISO 3834-2 y EN 1090. Lidera el equipo de END y garantiza que cada producto cumpla los criterios de inspección más estrictos.",
    "team.member4.name": "Ángel Fernández",
    "team.member4.role": "Director de Producción",
    "team.member4.desc": "Gestiona las operaciones del taller, la planificación de la producción y la asignación de recursos. Reconocido por lograr entregas a tiempo sin comprometer la calidad.",

    /* Contact */
    "contact.tag": "Póngase en Contacto",
    "contact.title": "Trabajemos Juntos",
    "contact.subtitle": "Cuéntenos sobre su proyecto — nuestro equipo responderá en un plazo de 24 horas con una evaluación preliminar.",
    "contact.form.name": "Nombre",
    "contact.form.company": "Empresa",
    "contact.form.email": "Correo Electrónico",
    "contact.form.phone": "Teléfono",
    "contact.form.country": "País",
    "contact.form.sector": "Sector",
    "contact.form.description": "Descripción del Proyecto",
    "contact.form.error": "Algo salió mal. Intente de nuevo o escríbanos directamente a info@rotelu.es.",
    "contact.form.sector.options": [
      "Hidroeléctrico",
      "Eólica Offshore",
      "Construcción Naval",
      "Equipos a Presión",
      "Oil & Gas",
      "Otro",
    ],
    "contact.submit": "Enviar Mensaje",
    "contact.success": "Gracias. Hemos recibido su consulta y nos pondremos en contacto en breve.",

    /* Footer */
    "footer.description": "Montajes Rotelu S.L. es una empresa española de fabricación de acero especializada en estructuras pesadas, recipientes a presión, componentes offshore y bloques navales. Fundada en 1988.",
    "footer.solutions": "Soluciones",
    "footer.company": "Empresa",
    "footer.contact": "Contacto",
    "footer.copyright": "© {year} ROTELU — Todos los derechos reservados.",
    "footer.legal": "Aviso Legal y Política de Privacidad",

    /* Chatbot */
    "chatbot.greeting": "¡Hola! Soy el asistente virtual de Rotelu. ¿En qué puedo ayudarle hoy?",
    "chatbot.placeholder": "Escriba su mensaje aquí...",
    "chatbot.status.online": "En línea",
    "chatbot.status.thinking": "Pensando...",
    "chatbot.footer": "Desarrollado por Rotelu AI",

    /* Common */
    "common.learnMore": "Saber Más",
    "common.scroll": "Desplácese para explorar",
    "common.explore": "Explorar",
    "common.contact": "Contáctenos",
  },

  fr: {
    /* Navbar */
    "nav.home": "Accueil",
    "nav.projects": "Projets",
    "nav.capabilities": "Compétences",
    "nav.process": "Processus",
    "nav.library": "Bibliothèque",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",

    /* Library */
    "library.title": "Bibliothèque Technique",
    "library.subtitle": "Manuels de soudage, normes et ressources techniques pour les professionnels",
    "library.view": "Voir PDF",
    "library.desc.sweiss": "Manuel complet de soudage couvrant les procédés SMAW, GMAW (MIG/MAG), GTAW (TIG), FCAW et SAW. Inclut la classification des électrodes (AWS), les types de machines à souder, la polarité, les tableaux d'ampérage et la sécurité. 72 pages.",
    "library.desc.dcm": "Guide d'introduction au soudage couvrant les procédés SMAW, MIG/MAG, TIG et oxygaz. Inclut les bases de la soudabilité, les matériaux, les équipements de sécurité et la préparation des joints. 21 pages.",
    "library.filter": "Filtrer par procédé",

    /* Hero */
    "hero.badge": "Fabrication d'acier et ingénierie depuis 1988",
    "hero.title1": "Précision dans",
    "hero.title2": "la Fabrication d'Acier",
    "hero.subtitle": "Structures lourdes en acier, appareils à pression, composants offshore et blocs navals — conçus et fabriqués en Espagne pour l'industrie mondiale.",
    "hero.btn1": "Voir Nos Projets",
    "hero.btn2": "Nous Contacter",
    "hero.cert1": "ISO 3834-2",
    "hero.cert2": "EN 1090 EXC3",
    "hero.cert3": "PED 2014/68/EU",

    /* Stats */
    "stats.tag": "En Chiffres",
    "stats.title": "Plus de 35 Ans d'Expertise dans l'Acier Industriel",
    "stats.years": "35+",
    "stats.established": "Fondée en 1988",
    "stats.quality": "100 % d'engagement qualité",
    "stats.projects": "120+",
    "stats.clients": "Clients internationaux",

    /* Projects */
    "projects.tag": "Nos Réalisations",
    "projects.title": "Projets Phares",
    "projects.subtitle": "Des conduites forcées hydroélectriques aux jackets éoliens offshore — découvrez une sélection de nos projets de fabrication d'acier les plus représentatifs.",
    "projects.viewAll": "Voir Tous les Projets",

    /* Hydro */
    "hydro.title": "Conduites Forcées — Gorona del Viento",
    "hydro.sector": "Hydroélectrique",
    "hydro.country": "Espagne",
    "hydro.year": "2018",
    "hydro.desc": "Fabrication de deux conduites forcées de 1 686 tonnes pour une centrale hydroélectrique avec une hauteur de chute de 625 mètres et une pente moyenne de 40 %.",
    "hydro.material": "P265GH / S460N",

    /* Offshore */
    "offshore.title": "Nœuds Offshore — Wikinger & East Anglia One",
    "offshore.sector": "Éolien Offshore",
    "offshore.country": "Mer du Nord",
    "offshore.year": "2017",
    "offshore.desc": "Fabrication de nœuds structurels et d'accostages pour jackets éoliens offshore. Taux de rejet en soudure inférieur à 0,25 %.",
    "offshore.material": "EN 10225 S355G10+M",

    /* Pressure */
    "pressure.title": "Réservoirs et Appareils à Pression",
    "pressure.sector": "Équipements sous Pression",
    "pressure.country": "Espagne / Portugal",
    "pressure.year": "2000–2024",
    "pressure.desc": "Plus de 4 000 réservoirs installés en Galice et dans le nord du Portugal pour les combustibles liquides. Fabrication d'appareils à pression pour l'industrie.",
    "pressure.material": "SA-516 Gr.70 / 316L",

    /* Naval */
    "naval.title": "Blocs Navals",
    "naval.sector": "Construction Navale",
    "naval.country": "Espagne",
    "naval.year": "2022",
    "naval.desc": "Préfabrication de blocs pour navires et équipements navals selon les exigences des Sociétés de Classification (IACS).",
    "naval.material": "Acier naval Grade A / AH / DH",

    /* Clients */
    "clients.tag": "Partenaires de Confiance",
    "clients.title": "Avec Qui Nous Travaillons",
    "clients.subtitle": "Nos clients comprennent des entreprises énergétiques de premier plan, des entrepreneurs EPC et des chantiers navals à travers l'Europe et au-delà.",
    "clients.testimonial1": "Rotelu a livré une qualité exceptionnelle sur les conduites forcées de Gorona del Viento. Leur soudure et leur contrôle dimensionnel ont dépassé nos attentes.",
    "clients.testimonial2": "La fabrication des nœuds offshore pour Wikinger a atteint le taux de rejet le plus bas que nous ayons constaté parmi tous les fournisseurs. Un partenaire vraiment fiable.",
    "clients.testimonial3": "Nous travaillons avec Rotelu depuis plus de 15 ans pour la fourniture d'appareils à pression. Leur constance et leurs livraisons à temps sont inégalées.",
    "clients.author1": "José María González",
    "clients.company1": "Iberdrola Ingénierie",
    "clients.years1": "10+ ans",
    "clients.author2": "Dr. Klaus Weber",
    "clients.company2": "Iberdrola Renovables (Projet Wikinger)",
    "clients.years2": "5+ ans",
    "clients.author3": "Manuel Silva",
    "clients.company3": "Repsol Petróleo",
    "clients.years3": "15+ ans",

    /* Capabilities */
    "caps.tag": "Notre Expertise",
    "caps.title": "Compétences Clés",

    "caps.hydro.title": "Conduites Forcées Hydroélectriques",
    "caps.hydro.desc": "Ingénierie, fabrication et installation complètes de conduites forcées haute pression pour centrales hydroélectriques, y compris bifurcations, joints de dilatation et structures de support.",
    "caps.hydro.items": [
      "Formage de tôles épaisses (jusqu'à 75 mm d'épaisseur)",
      "Soudage à l'arc submergé (SAW) pour joints longitudinaux",
      "Contrôle dimensionnel 3D par suivi laser",
      "Assemblage sur site et supervision de soudure",
      "Systèmes de revêtement et de protection",
    ],

    "caps.offshore.title": "Composants Éoliens Offshore",
    "caps.offshore.desc": "Fabrication de nœuds structurels, accostages, pièces de transition et autres composants critiques pour jackets et topsides éoliens offshore.",
    "caps.offshore.items": [
      "Soudage de joints tubulaires complexes (grade XXT)",
      "CND par particules magnétiques et ultrasons",
      "Conformité à la classification DNV-GL / ABS",
      "Systèmes de protection anticorrosion et de revêtement",
    ],

    "caps.shipbuilding.title": "Construction Navale",
    "caps.shipbuilding.desc": "Préfabrication de blocs courbes et plats pour navires marchands, navires militaires et unités offshore sous classification IACS.",
    "caps.shipbuilding.items": [
      "Assemblage de blocs et pré-armement",
      "Découpe et formage CNC de tôles",
      "Qualification des procédures de soudage (WPQR)",
      "Contrôle des tolérances selon les normes du chantier naval",
    ],

    "caps.pressure.title": "Appareils à Pression et Réservoirs",
    "caps.pressure.desc": "Conception et fabrication d'appareils à pression, réservoirs de stockage et équipements de procédé pour les secteurs pétrolier, chimique et énergétique.",
    "caps.pressure.items": [
      "ASME VIII Div. 1 et PED 2014/68/UE",
      "Cintrage et formage de viroles cylindriques",
      "Renforts de piquage et équipements intérieurs",
      "Essais de pression hydrostatique et pneumatique",
    ],

    /* Process */
    "process.tag": "Notre Méthode",
    "process.title": "Notre Processus",
    "process.subtitle": "Du concept à la livraison — un flux de travail discipliné et axé sur la qualité qui garantit que chaque projet répond aux normes les plus élevées.",
    "process.step1.title": "1. Revue Technique",
    "process.step1.desc": "Examen approfondi des spécifications, plans et exigences matérielles. Nous identifions les points critiques et optimisons l'approche de fabrication.",
    "process.step2.title": "2. Approvisionnement en Matériaux",
    "process.step2.desc": "Achat d'aciers certifiés et de consommables auprès d'usines approuvées. Tous les matériaux sont traçables et testés avant acceptation.",
    "process.step3.title": "3. Préparation des Tôles",
    "process.step3.desc": "Découpe CNC, chanfreinage et préparation des bords. Les tôles sont marquées et groupées pour un imbrication efficace avec un minimum de déchets.",
    "process.step4.title": "4. Formage et Cintrage",
    "process.step4.desc": "Formage à froid et à chaud des tôles pour former des viroles cylindriques, cônes et géométries complexes avec notre équipement de cintrage lourd.",
    "process.step5.title": "5. Soudage et Assemblage",
    "process.step5.desc": "Soudage multiprocédés (SAW, FCAW, SMAW) par des soudeurs qualifiés. Toutes les procédures suivent des DMOS approuvés et sont supervisées par des inspecteurs.",
    "process.step6.title": "6. Contrôle Qualité et CND",
    "process.step6.desc": "Programme d'inspection à 100 % comprenant des essais visuels, dimensionnels, ultrasonores, magnétoscopiques et radiographiques selon les besoins.",
    "process.step7.title": "7. Traitement de Surface",
    "process.step7.desc": "Grenaillage à SA 2.5, application de primaire et de couche finale en conditions contrôlées. Des inspecteurs de revêtement certifiés supervisent toutes les couches.",
    "process.step8.title": "8. Logistique et Livraison",
    "process.step8.desc": "Ingénierie du transport, conception d'arrimage maritime et livraison juste-à-temps sur site ou au chantier naval. Documentation de traçabilité complète incluse.",

    /* Certifications */
    "cert.tag": "Accréditations",
    "cert.title": "Certifications et Normes",
    "cert.subtitle": "Nous détenons des certifications reconnues internationalement qui attestent de notre qualité, sécurité et capacité technique.",
    "cert.item1.title": "ISO 3834-2",
    "cert.item1.desc": "Norme qualité complète pour le soudage par fusion des matériaux métalliques. Couvre toutes les étapes de fabrication, de la conception à l'inspection finale.",
    "cert.item2.title": "EN 1090 EXC4",
    "cert.item2.desc": "Classe d'exécution 4 — la catégorie la plus élevée pour la fabrication de structures en acier. Requise pour les structures sismiques et soumises à la fatigue.",
    "cert.item3.title": "PED 2014/68/UE",
    "cert.item3.desc": "Directive Équipements sous Pression pour la conception et la fabrication d'appareils à pression et d'ensembles dépassant des limites de pression spécifiques.",
    "cert.item4.title": "Classification IACS",
    "cert.item4.desc": "Approuvé par les sociétés membres de l'Association Internationale des Sociétés de Classification pour la fabrication de structures navales et offshore.",

    /* Facilities */
    "fac.tag": "Notre Usine",
    "fac.title": "Installations et Équipements",
    "fac.subtitle": "Notre atelier à A Coruña, Espagne, est équipé pour gérer des projets de fabrication d'acier lourds et complexes du début à la fin.",
    "fac.item1.title": "Capacité de l'Atelier",
    "fac.item1.desc": "3 600 m² d'installations totales avec 2 250 m² d'espace couvert. Hauteur maximale sous crochet : 6,7 m. Diamètre maximal de pièce : 5,0 m. Longueur maximale : 75 m.",
    "fac.item2.title": "Ponts Roulants et Manutention",
    "fac.item2.desc": "2 ponts roulants de 16 tonnes et 5 ponts roulants de 10 tonnes pour une manutention flexible et précise des composants lourds dans tout l'atelier.",
    "fac.item3.title": "Équipements de Soudage",
    "fac.item3.desc": "9 postes de soudage multiprocédés (MIG/MAG, TIG, FCAW, SMAW) plus 2 colonnes de soudage à l'arc submergé (SAW) pour joints longitudinalx et circonférentiels automatisés.",
    "fac.item4.title": "Traitement des Tôles",
    "fac.item4.desc": "Tables de découpe CNC oxycoupage et plasma, rouleuses de forte capacité (jusqu'à 75 mm), machines à chanfreiner et presse hydraulique pour le formage de géométries complexes.",

    /* Team */
    "team.tag": "Notre Équipe",
    "team.title": "Équipe de Direction",
    "team.subtitle": "Des professionnels expérimentés engagés envers la qualité, la précision et l'amélioration continue dans chaque projet.",
    "team.member1.name": "José Ramón Pardo",
    "team.member1.role": "Directeur Général",
    "team.member1.desc": "Plus de 30 ans de leadership dans la fabrication d'acier et la gestion de projets industriels. Impulse la vision stratégique et l'excellence opérationnelle de l'entreprise.",
    "team.member2.name": "Juan Carlos López",
    "team.member2.role": "Directeur Technique",
    "team.member2.desc": "Expert en ingénierie du soudage et en fabrication lourde. Supervise toutes les approbations techniques, la qualification des DMOS et les systèmes d'assurance qualité.",
    "team.member3.name": "María Rodríguez",
    "team.member3.role": "Responsable Qualité",
    "team.member3.desc": "Responsable de la conformité ISO 3834-2 et EN 1090. Dirige l'équipe CND et garantit que chaque produit respecte les critères d'inspection les plus stricts.",
    "team.member4.name": "Ángel Fernández",
    "team.member4.role": "Directeur de Production",
    "team.member4.desc": "Gère les opérations de l'atelier, la planification de la production et l'allocation des ressources. Reconnu pour ses livraisons à temps sans compromettre la qualité.",

    /* Contact */
    "contact.tag": "Prenez Contact",
    "contact.title": "Travaillons Ensemble",
    "contact.subtitle": "Parlez-nous de votre projet — notre équipe répondra sous 24 heures avec une évaluation préliminaire.",
    "contact.form.name": "Nom",
    "contact.form.company": "Société",
    "contact.form.email": "E-mail",
    "contact.form.phone": "Téléphone",
    "contact.form.country": "Pays",
    "contact.form.sector": "Secteur",
    "contact.form.description": "Description du Projet",
    "contact.form.error": "Une erreur s'est produite. Veuillez réessayer ou nous écrire directement à info@rotelu.es.",
    "contact.form.sector.options": [
      "Hydroélectrique",
      "Éolien Offshore",
      "Construction Navale",
      "Équipements sous Pression",
      "Pétrole & Gaz",
      "Autre",
    ],
    "contact.submit": "Envoyer le Message",
    "contact.success": "Merci. Nous avons reçu votre demande et vous contacterons prochainement.",

    /* Footer */
    "footer.description": "Montajes Rotelu S.L. est une entreprise espagnole de fabrication d'acier spécialisée dans les structures lourdes, les appareils à pression, les composants offshore et les blocs navals. Fondée en 1988.",
    "footer.solutions": "Solutions",
    "footer.company": "Société",
    "footer.contact": "Contact",
    "footer.copyright": "© {year} ROTELU — Tous droits réservés.",
    "footer.legal": "Mentions Légales & Politique de Confidentialité",

    /* Chatbot */
    "chatbot.greeting": "Bonjour ! Je suis l'assistant virtuel de Rotelu. Comment puis-je vous aider aujourd'hui ?",
    "chatbot.placeholder": "Tapez votre message ici...",
    "chatbot.status.online": "En ligne",
    "chatbot.status.thinking": "Réflexion...",
    "chatbot.footer": "Propulsé par Rotelu AI",

    /* Common */
    "common.learnMore": "En Savoir Plus",
    "common.scroll": "Faites défiler pour explorer",
    "common.explore": "Explorer",
    "common.contact": "Nous Contacter",
  },

  de: {
    /* Navbar */
    "nav.home": "Startseite",
    "nav.projects": "Projekte",
    "nav.capabilities": "Kompetenzen",
    "nav.process": "Prozess",
    "nav.library": "Bibliothek",
    "nav.certifications": "Zertifikate",
    "nav.contact": "Kontakt",

    /* Library */
    "library.title": "Technische Bibliothek",
    "library.subtitle": "Schweißhandbücher, Normen und technische Ressourcen für Fachleute",
    "library.view": "PDF anzeigen",
    "library.desc.sweiss": "Vollständiges Schweißhandbuch mit SMAW-, GMAW- (MIG/MAG), GTAW- (TIG), FCAW- und SAW-Verfahren. Enthält Elektrodenklassifizierung (AWS), Schweißmaschinentypen, Polarität, Stromstärkentabellen und Sicherheit. 72 Seiten.",
    "library.desc.dcm": "Einführung in das Schweißen mit SMAW-, MIG/MAG-, TIG- und Gasschweißverfahren. Enthält Grundlagen der Schweißbarkeit, Werkstoffe, Sicherheitsausrüstung und Vorbereitung von Verbindungen. 21 Seiten.",
    "library.filter": "Nach Verfahren filtern",

    /* Hero */
    "hero.badge": "Stahlbau und Ingenieurwesen seit 1988",
    "hero.title1": "Präzision im",
    "hero.title2": "Stahlbau",
    "hero.subtitle": "Schwere Stahlkonstruktionen, Druckbehälter, Offshore-Komponenten und Marineblöcke — entwickelt und gefertigt in Spanien für die globale Industrie.",
    "hero.btn1": "Unsere Projekte",
    "hero.btn2": "Kontakt",
    "hero.cert1": "ISO 3834-2",
    "hero.cert2": "EN 1090 EXC3",
    "hero.cert3": "PED 2014/68/EU",

    /* Stats */
    "stats.tag": "In Zahlen",
    "stats.title": "Über 35 Jahre Erfahrung im Industriestahlbau",
    "stats.years": "35+",
    "stats.established": "Gegründet 1988",
    "stats.quality": "100 % Qualitätsversprechen",
    "stats.projects": "120+",
    "stats.clients": "Internationale Kunden",

    /* Projects */
    "projects.tag": "Unsere Arbeit",
    "projects.title": "Ausgewählte Projekte",
    "projects.subtitle": "Von Wasserkraft-Druckrohrleitungen bis zu Offshore-Wind-Jackets — entdecken Sie eine Auswahl unserer repräsentativsten Stahlbauprojekte.",
    "projects.viewAll": "Alle Projekte ansehen",

    /* Hydro */
    "hydro.title": "Druckrohrleitungen — Gorona del Viento",
    "hydro.sector": "Wasserkraft",
    "hydro.country": "Spanien",
    "hydro.year": "2018",
    "hydro.desc": "Fertigung von zwei Druckrohrleitungen mit einem Gewicht von 1.686 Tonnen für ein Wasserkraftwerk mit einer Fallhöhe von 625 Metern und einer durchschnittlichen Neigung von 40 %.",
    "hydro.material": "P265GH / S460N",

    /* Offshore */
    "offshore.title": "Offshore-Knoten — Wikinger & East Anglia One",
    "offshore.sector": "Offshore-Wind",
    "offshore.country": "Nordsee",
    "offshore.year": "2017",
    "offshore.desc": "Fertigung von Strukturknoten und Bootslandungen für Offshore-Wind-Jackets. Schweißfehlerquote unter 0,25 %.",
    "offshore.material": "EN 10225 S355G10+M",

    /* Pressure */
    "pressure.title": "Tanks und Druckbehälter",
    "pressure.sector": "Druckgeräte",
    "pressure.country": "Spanien / Portugal",
    "pressure.year": "2000–2024",
    "pressure.desc": "Über 4.000 installierte Tanks in Galicien und Nordportugal für Flüssigbrennstoffe. Fertigung von Druckbehältern für die Industrie.",
    "pressure.material": "SA-516 Gr.70 / 316L",

    /* Naval */
    "naval.title": "Marineblöcke",
    "naval.sector": "Schiffsbau",
    "naval.country": "Spanien",
    "naval.year": "2022",
    "naval.desc": "Vorfertigung von Blöcken für Schiffe und Marineausrüstung nach den Anforderungen der Klassifikationsgesellschaften (IACS).",
    "naval.material": "Marinestahl Grade A / AH / DH",

    /* Clients */
    "clients.tag": "Vertrauenspartner",
    "clients.title": "Mit Wem Wir Arbeiten",
    "clients.subtitle": "Zu unseren Kunden zählen führende Energieunternehmen, EPC-Auftragnehmer und Werften in ganz Europa und darüber hinaus.",
    "clients.testimonial1": "Rotelu hat bei den Druckrohrleitungen von Gorona del Viento außergewöhnliche Qualität geliefert. Ihre Schweiß- und Maßhaltigkeit hat unsere Erwartungen übertroffen.",
    "clients.testimonial2": "Die Offshore-Knotenfertigung für Wikinger erreichte die niedrigste Fehlerquote, die wir bei allen Lieferanten gesehen haben. Ein wirklich zuverlässiger Partner.",
    "clients.testimonial3": "Wir arbeiten seit über 15 Jahren mit Rotelu bei der Lieferung von Druckbehältern zusammen. Ihre Beständigkeit und termingerechte Lieferung sind unübertroffen.",
    "clients.author1": "José María González",
    "clients.company1": "Iberdrola Ingeniería",
    "clients.years1": "10+ Jahre",
    "clients.author2": "Dr. Klaus Weber",
    "clients.company2": "Iberdrola Renovables (Projekt Wikinger)",
    "clients.years2": "5+ Jahre",
    "clients.author3": "Manuel Silva",
    "clients.company3": "Repsol Petróleo",
    "clients.years3": "15+ Jahre",

    /* Capabilities */
    "caps.tag": "Unser Know-how",
    "caps.title": "Kernkompetenzen",

    "caps.hydro.title": "Wasserkraft-Druckrohrleitungen",
    "caps.hydro.desc": "Komplette Planung, Fertigung und Installation von Hochdruck-Druckrohrleitungen für Wasserkraftwerke, einschließlich Abzweigungen, Dehnungsausgleicher und Tragkonstruktionen.",
    "caps.hydro.items": [
      "Schwerblechumformung (bis 75 mm Dicke)",
      "Unterpulverschweißen (UP) für Längsnähte",
      "3D-Maßkontrolle mit Laserverfolgung",
      "Montage vor Ort und Schweißaufsicht",
      "Schutzbeschichtungs- und Auskleidungssysteme",
    ],

    "caps.offshore.title": "Offshore-Windkomponenten",
    "caps.offshore.desc": "Fertigung von Strukturknoten, Bootslandungen, Übergangsstücken und anderen kritischen Komponenten für Offshore-Wind-Jackets und Topsides.",
    "caps.offshore.items": [
      "Schweißen komplexer Rohrverbindungen (XXT-Qualität)",
      "Magnetpulver- und Ultraschall-ZfP",
      "DNV-GL / ABS-Klassifizierungskonformität",
      "Korrosionsschutz- und Beschichtungssysteme",
    ],

    "caps.shipbuilding.title": "Schiffsbau und Marine",
    "caps.shipbuilding.desc": "Vorfertigung von gekrümmten und flachen Blocksektionen für Handelsschiffe, Marineschiffe und Offshore-Einheiten nach IACS-Klassifikation.",
    "caps.shipbuilding.items": [
      "Blockmontage und Vorausrüstung",
      "CNC-Blechnschneiden und -Umformen",
      "Schweißverfahrensqualifikation (WPQR)",
      "Toleranzkontrolle nach Werftstandards",
    ],

    "caps.pressure.title": "Druckbehälter und Tanks",
    "caps.pressure.desc": "Konstruktion und Fertigung von Druckbehältern, Lagertanks und Prozessausrüstung für die Öl- und Gas-, Chemie- und Energiebranche.",
    "caps.pressure.items": [
      "ASME VIII Div. 1 und PED 2014/68/EU",
      "Rundbiegen und Umformen von Zylinderschüssen",
      "Stutzenverstärkung und Inneneinbauten",
      "Hydrostatische und pneumatische Druckprüfungen",
    ],

    /* Process */
    "process.tag": "Unsere Arbeitsweise",
    "process.title": "Unser Prozess",
    "process.subtitle": "Vom Konzept bis zur Lieferung — ein disziplinierter, qualitätsorientierter Arbeitsablauf, der sicherstellt, dass jedes Projekt den höchsten Standards entspricht.",
    "process.step1.title": "1. Technische Prüfung",
    "process.step1.desc": "Gründliche Prüfung der Spezifikationen, Zeichnungen und Materialanforderungen. Wir identifizieren kritische Punkte und optimieren den Fertigungsansatz.",
    "process.step2.title": "2. Materialbeschaffung",
    "process.step2.desc": "Beschaffung von zertifizierten Stählen und Zusatzwerkstoffen von zugelassenen Werken. Alle Materialien sind rückverfolgbar und werden vor Annahme geprüft.",
    "process.step3.title": "3. Blechvorbereitung",
    "process.step3.desc": "CNC-Schneiden, Fasen und Kantenvorbereitung. Die Bleche werden für effizientes Verschachteln markiert und gruppiert, um Abfall zu minimieren.",
    "process.step4.title": "4. Umformen und Biegen",
    "process.step4.desc": "Kalt- und Warmumformen von Blechen zu Zylinderschüssen, Kegeln und komplexen Geometrien mit unserer Schwermaschinen-Ausrüstung.",
    "process.step5.title": "5. Schweißen und Montage",
    "process.step5.desc": "Multiprozess-Schweißen (UP, FCAW, SMAW) durch qualifizierte Schweißer. Alle Verfahren folgen genehmigten WPS und werden von Prüfern überwacht.",
    "process.step6.title": "6. Qualitätskontrolle und ZfP",
    "process.step6.desc": "100% Prüfprogramm mit Sicht-, Maß-, Ultraschall-, Magnetpulver- und ggf. Durchstrahlungsprüfungen.",
    "process.step7.title": "7. Oberflächenbehandlung",
    "process.step7.desc": "Strahlen auf SA 2.5, Grundierung und Decklackauftrag unter kontrollierten Bedingungen. Zertifizierte Beschichtungsprüfer überwachen alle Schichten.",
    "process.step8.title": "8. Logistik und Lieferung",
    "process.step8.desc": "Transporttechnik, Seefestigungsauslegung und Just-in-Time-Lieferung zur Baustelle oder Werft. Vollständige Rückverfolgbarkeitsdokumentation inbegriffen.",

    /* Certifications */
    "cert.tag": "Akkreditierungen",
    "cert.title": "Zertifikate und Normen",
    "cert.subtitle": "Wir verfügen über international anerkannte Zertifizierungen, die unsere Qualität, Sicherheit und technische Leistungsfähigkeit belegen.",
    "cert.item1.title": "ISO 3834-2",
    "cert.item1.desc": "Umfassende Qualitätsnorm für das Schmelzschweißen metallischer Werkstoffe. Deckt alle Fertigungsstufen von der Konstruktion bis zur Endprüfung ab.",
    "cert.item2.title": "EN 1090 EXC4",
    "cert.item2.desc": "Ausführungsklasse 4 — die höchste Kategorie für die Herstellung von Stahlkonstruktionen. Erforderlich für erdbeben- und ermüdungsbeanspruchte Bauwerke.",
    "cert.item3.title": "PED 2014/68/EU",
    "cert.item3.desc": "Druckgeräterichtlinie für die Auslegung und Herstellung von Druckbehältern und Baugruppen oberhalb bestimmter Druckgrenzen.",
    "cert.item4.title": "IACS-Klassifikation",
    "cert.item4.desc": "Von den Mitgliedsgesellschaften der International Association of Classification Societies für die Fertigung von Marine- und Offshore-Strukturen zugelassen.",

    /* Facilities */
    "fac.tag": "Unser Werk",
    "fac.title": "Anlagen und Ausrüstung",
    "fac.subtitle": "Unsere Werkstatt in A Coruña, Spanien, ist für die Durchführung schwerer und komplexer Stahlbauprojekte von Anfang bis Ende ausgerüstet.",
    "fac.item1.title": "Werkstattkapazität",
    "fac.item1.desc": "3.600 m² Gesamtfläche mit 2.250 m² überdachter Werkstattfläche. Maximale Höhe unter Haken: 6,7 m. Maximaler Werkstückdurchmesser: 5,0 m. Maximale Länge: 75 m.",
    "fac.item2.title": "Krane und Handhabung",
    "fac.item2.desc": "2 x 16-Tonnen-Brückenkrane und 5 x 10-Tonnen-Brückenkrane für flexible und präzise Handhabung von Schwerlastkomponenten in der gesamten Werkstatt.",
    "fac.item3.title": "Schweißausrüstung",
    "fac.item3.desc": "9 Multiprozess-Schweißmaschinen (MIG/MAG, TIG, FCAW, SMAW) plus 2 Unterpulverschweißanlagen (UP) für automatisierte Längs- und Rundnähte.",
    "fac.item4.title": "Blechbearbeitung",
    "fac.item4.desc": "CNC-Brennschneid- und Plasmaschneidtische, Schwerlast-Biegewalzen (bis 75 mm), Fasmaschinen und Hydraulikpresse zum Umformen komplexer Geometrien.",

    /* Team */
    "team.tag": "Unser Team",
    "team.title": "Führungsteam",
    "team.subtitle": "Erfahrene Fachleute, die sich bei jedem Projekt für Qualität, Präzision und kontinuierliche Verbesserung einsetzen.",
    "team.member1.name": "José Ramón Pardo",
    "team.member1.role": "Geschäftsführer",
    "team.member1.desc": "Über 30 Jahre Führungserfahrung im Stahlbau und im industriellen Projektmanagement. Treibt die strategische Vision und operative Exzellenz des Unternehmens voran.",
    "team.member2.name": "Juan Carlos López",
    "team.member2.role": "Technischer Leiter",
    "team.member2.desc": "Experte für Schweißtechnik und Schwerlastfertigung. Überwacht alle technischen Genehmigungen, WPS-Qualifikationen und Qualitätssicherungssysteme.",
    "team.member3.name": "María Rodríguez",
    "team.member3.role": "Qualitätsmanagerin",
    "team.member3.desc": "Verantwortlich für die Einhaltung von ISO 3834-2 und EN 1090. Leitet das ZfP-Team und stellt sicher, dass jedes Produkt den strengsten Prüfkriterien entspricht.",
    "team.member4.name": "Ángel Fernández",
    "team.member4.role": "Produktionsleiter",
    "team.member4.desc": "Leitet die Werkstattabläufe, Produktionsplanung und Ressourcenzuteilung. Bekannt für termingerechte Lieferung ohne Qualitätseinbußen.",

    /* Contact */
    "contact.tag": "Kontakt aufnehmen",
    "contact.title": "Lassen Sie uns zusammenarbeiten",
    "contact.subtitle": "Teilen Sie uns Ihr Projekt mit — unser Team wird innerhalb von 24 Stunden mit einer ersten Bewertung antworten.",
    "contact.form.name": "Name",
    "contact.form.company": "Unternehmen",
    "contact.form.email": "E-Mail",
    "contact.form.phone": "Telefon",
    "contact.form.country": "Land",
    "contact.form.sector": "Branche",
    "contact.form.description": "Projektbeschreibung",
    "contact.form.error": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an info@rotelu.es.",
    "contact.form.sector.options": [
      "Wasserkraft",
      "Offshore-Wind",
      "Schiffsbau",
      "Druckgeräte",
      "Öl & Gas",
      "Sonstiges",
    ],
    "contact.submit": "Nachricht senden",
    "contact.success": "Vielen Dank. Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",

    /* Footer */
    "footer.description": "Montajes Rotelu S.L. ist ein spanisches Stahlbauunternehmen, spezialisiert auf Schwerkonstruktionen, Druckbehälter, Offshore-Komponenten und Marineblöcke. Gegründet 1988.",
    "footer.solutions": "Lösungen",
    "footer.company": "Unternehmen",
    "footer.contact": "Kontakt",
    "footer.copyright": "© {year} ROTELU — Alle Rechte vorbehalten.",
    "footer.legal": "Impressum & Datenschutz",

    /* Chatbot */
    "chatbot.greeting": "Hallo! Ich bin der virtuelle Assistent von Rotelu. Wie kann ich Ihnen heute helfen?",
    "chatbot.placeholder": "Geben Sie hier Ihre Nachricht ein...",
    "chatbot.status.online": "Online",
    "chatbot.status.thinking": "Denke nach...",
    "chatbot.footer": "Powered by Rotelu AI",

    /* Common */
    "common.learnMore": "Mehr erfahren",
    "common.scroll": "Zum Erkunden scrollen",
    "common.explore": "Erkunden",
    "common.contact": "Kontakt",
  },
};

function resolveNestedValue(
  obj: Record<string, string | string[]>,
  keys: string[]
): string | string[] | undefined {
  const key = keys.join(".");
  return obj[key];
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".");
  const langData = translations[lang] || translations[defaultLanguage];
  const value = resolveNestedValue(langData, keys);
  if (value !== undefined && typeof value === "string") {
    return value;
  }
  const fallback = resolveNestedValue(translations[defaultLanguage], keys);
  if (fallback !== undefined && typeof fallback === "string") {
    return fallback;
  }
  return key;
}

export function getTranslationArray(
  lang: Language,
  key: string
): string[] {
  const keys = key.split(".");
  const langData = translations[lang] || translations[defaultLanguage];
  const value = resolveNestedValue(langData, keys);
  if (Array.isArray(value)) {
    return value;
  }
  const fallback = resolveNestedValue(translations[defaultLanguage], keys);
  if (Array.isArray(fallback)) {
    return fallback;
  }
  return [];
}

export default translations;
