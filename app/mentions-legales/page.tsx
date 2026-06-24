import type { Metadata } from 'next'
import { Building2, Globe2, IdCard, Server } from 'lucide-react'
import { BUSINESS } from '@/lib/content'
import { LegalDocumentPage, type LegalSection } from '../components/legal-document-page'

const sections: LegalSection[] = [
  {
    eyebrow: 'Identité',
    title: 'Entreprise',
    icon: Building2,
    rows: [
      ['Nom commercial', 'SHM Cils & Ongles'],
      ['Forme juridique', 'Entrepreneur individuel'],
      ['SIREN', '937788834'],
      ['Code APE', '96.02B'],
      ['Date de création', '01/12/2024'],
    ],
  },
  {
    eyebrow: 'Établissement',
    title: 'Établissement accueillant la clientèle',
    icon: IdCard,
    rows: [
      ['SIRET', '93778883400011'],
      ['Adresse', '68 Rue Léon Blum, 69100 Villeurbanne, France'],
      ['Activité principale', 'Soins de beauté'],
    ],
  },
  {
    eyebrow: 'Édition',
    title: 'Création et publication',
    icon: Globe2,
    rows: [
      ['Site concerné', BUSINESS.name],
      ['Créateur du site', 'Rifanor Software'],
      ['Responsable de publication', 'Siham, exploitante de SHM Cils & Ongles'],
    ],
  },
  {
    eyebrow: 'Infrastructure',
    title: 'Hébergement',
    icon: Server,
    rows: [
      ['Hébergeur', 'Vercel Inc.'],
      ['Plateforme', 'Vercel'],
      ['Pays', 'États-Unis'],
      ['Site web', 'https://vercel.com'],
    ],
  },
]

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales du site SHM Cils & Ongles : éditeur, créateur du site, établissement principal et hébergement Vercel.',
  alternates: { canonical: '/mentions-legales' },
  robots: {
    index: true,
    follow: true,
  },
}

export default function MentionsLegalesPage() {
  return (
    <LegalDocumentPage
      eyebrow="Informations légales"
      title="Mentions légales"
      description={`Les informations officielles qui identifient l’éditeur, le créateur et l’hébergeur du site ${BUSINESS.name}.`}
      sections={sections}
      finalNote="Les informations ci-dessus sont fournies pour identifier l’éditeur et le prestataire technique du site. Pour toute demande liée au site, utilisez les coordonnées de contact indiquées sur la page d’accueil."
    />
  )
}
