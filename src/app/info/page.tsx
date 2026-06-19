"use client";

import { useLang } from "@/lib/language";

const legalContent: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  en: {
    title: "Legal Notice & Privacy Policy",
    sections: [
      {
        h: "Company Information",
        p: "Montajes Rotelu S.L. (ROTELU) — Pontevedra, Spain. Specialists in heavy steel fabrication, welding engineering, and industrial metal structures since 1988.",
      },
      {
        h: "Intellectual Property",
        p: "All content, images, logos, and technical documentation on this website are the property of ROTELU unless otherwise stated. Reproduction without prior written authorization is prohibited.",
      },
      {
        h: "Use of the AI Assistant",
        p: "The ROTELU Engineering Assistant is an AI tool powered by OpenRouter. It provides technical guidance based on welding engineering knowledge and a reference manual. Responses are informational and do not constitute a binding professional opinion. Always verify critical technical decisions with a certified welding engineer.",
      },
      {
        h: "Data Protection",
        p: "Personal data submitted via the contact form is processed exclusively for the purpose of responding to your inquiry. We do not share data with third parties. You may request deletion of your data at any time by contacting info@rotelu.es.",
      },
      {
        h: "Cookies",
        p: "This website uses only strictly necessary technical cookies. No tracking or analytics cookies are used.",
      },
      {
        h: "Applicable Law",
        p: "These terms are governed by Spanish law. Any disputes shall be submitted to the courts of Pontevedra, Spain.",
      },
    ],
  },
  es: {
    title: "Aviso Legal y Política de Privacidad",
    sections: [
      {
        h: "Información de la Empresa",
        p: "Montajes Rotelu S.L. (ROTELU) — Pontevedra, España. Especialistas en fabricación pesada de acero, ingeniería de soldadura y estructuras metálicas industriales desde 1988.",
      },
      {
        h: "Propiedad Intelectual",
        p: "Todos los contenidos, imágenes, logotipos y documentación técnica de este sitio web son propiedad de ROTELU salvo que se indique lo contrario. Se prohíbe la reproducción sin autorización previa por escrito.",
      },
      {
        h: "Uso del Asistente IA",
        p: "El Asistente de Ingeniería de ROTELU es una herramienta de IA impulsada por OpenRouter. Proporciona orientación técnica basada en conocimientos de ingeniería de soldadura y un manual de referencia. Las respuestas son informativas y no constituyen una opinión profesional vinculante. Siempre verifique las decisiones técnicas críticas con un ingeniero de soldadura certificado.",
      },
      {
        h: "Protección de Datos",
        p: "Los datos personales enviados a través del formulario de contacto se procesan exclusivamente para responder a su consulta. No compartimos datos con terceros. Puede solicitar la eliminación de sus datos en cualquier momento contactando a info@rotelu.es.",
      },
      {
        h: "Cookies",
        p: "Este sitio web utiliza únicamente cookies técnicas estrictamente necesarias. No se utilizan cookies de seguimiento ni analíticas.",
      },
      {
        h: "Ley Aplicable",
        p: "Estos términos se rigen por la legislación española. Cualquier disputa se someterá a los tribunales de Pontevedra, España.",
      },
    ],
  },
  fr: {
    title: "Mentions Légales & Politique de Confidentialité",
    sections: [
      {
        h: "Informations sur l'Entreprise",
        p: "Montajes Rotelu S.L. (ROTELU) — Pontevedra, Espagne. Spécialistes en fabrication lourde d'acier, ingénierie du soudage et structures métalliques industrielles depuis 1988.",
      },
      {
        h: "Propriété Intellectuelle",
        p: "Tous les contenus, images, logos et documentation technique de ce site web sont la propriété de ROTELU sauf indication contraire. La reproduction sans autorisation écrite préalable est interdite.",
      },
      {
        h: "Utilisation de l'Assistant IA",
        p: "L'Assistant d'Ingénierie ROTELU est un outil d'IA propulsé par OpenRouter. Il fournit des conseils techniques basés sur les connaissances en ingénierie du soudage et un manuel de référence. Les réponses sont informatives et ne constituent pas un avis professionnel contraignant. Vérifiez toujours les décisions techniques critiques avec un ingénieur soudeur certifié.",
      },
      {
        h: "Protection des Données",
        p: "Les données personnelles soumises via le formulaire de contact sont traitées exclusivement pour répondre à votre demande. Nous ne partageons pas les données avec des tiers. Vous pouvez demander la suppression de vos données à tout moment en contactant info@rotelu.es.",
      },
      {
        h: "Cookies",
        p: "Ce site web utilise uniquement des cookies techniques strictement nécessaires. Aucun cookie de suivi ou d'analyse n'est utilisé.",
      },
      {
        h: "Droit Applicable",
        p: "Ces conditions sont régies par le droit espagnol. Tout litige sera soumis aux tribunaux de Pontevedra, Espagne.",
      },
    ],
  },
  de: {
    title: "Impressum & Datenschutz",
    sections: [
      {
        h: "Unternehmensinformationen",
        p: "Montajes Rotelu S.L. (ROTELU) — Pontevedra, Spanien. Spezialisten für Schwermetallbau, Schweißtechnik und industrielle Metallkonstruktionen seit 1988.",
      },
      {
        h: "Geistiges Eigentum",
        p: "Alle Inhalte, Bilder, Logos und technischen Unterlagen auf dieser Website sind Eigentum von ROTELU, sofern nicht anders angegeben. Die Vervielfältigung ohne vorherige schriftliche Genehmigung ist untersagt.",
      },
      {
        h: "Nutzung des KI-Assistenten",
        p: "Der ROTELU Engineering Assistant ist ein KI-Tool, das von OpenRouter betrieben wird. Es bietet technische Beratung auf der Grundlage von Schweißtechnik-Know-how und einem Referenzhandbuch. Die Antworten dienen zu Informationszwecken und stellen keine verbindliche professionelle Meinung dar. Überprüfen Sie kritische technische Entscheidungen immer mit einem zertifizierten Schweißingenieur.",
      },
      {
        h: "Datenschutz",
        p: "Personenbezogene Daten, die über das Kontaktformular übermittelt werden, werden ausschließlich zur Beantwortung Ihrer Anfrage verarbeitet. Wir geben keine Daten an Dritte weiter. Sie können jederzeit die Löschung Ihrer Daten verlangen, indem Sie uns unter info@rotelu.es kontaktieren.",
      },
      {
        h: "Cookies",
        p: "Diese Website verwendet nur unbedingt erforderliche technische Cookies. Es werden keine Tracking- oder Analyse-Cookies verwendet.",
      },
      {
        h: "Anwendbares Recht",
        p: "Diese Bedingungen unterliegen spanischem Recht. Streitigkeiten werden den Gerichten von Pontevedra, Spanien, vorgelegt.",
      },
    ],
  },
};

export default function InfoPage() {
  const { lang } = useLang();
  const content = legalContent[lang] || legalContent.en;

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <a
          href="/"
          className="inline-block text-xs text-zinc-600 hover:text-orange transition-colors mb-8"
        >
          &larr; ROTELU
        </a>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          {content.title}
        </h1>

        <div className="space-y-8">
          {content.sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-sm font-semibold text-orange mb-2">{s.h}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-900">
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} ROTELU — Montajes Rotelu S.L.
          </p>
        </div>
      </div>
    </main>
  );
}
