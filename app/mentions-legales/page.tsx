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
      ['Dénomination', 'Abdelmajid AHAMIANE'],
      ['Forme juridique', 'Entrepreneur individuel'],
      ['Nom commercial', 'Rifanor Software'],
      ['SIREN', '106313455'],
      ['Code APE', '62.01Z'],
      ['Date d’immatriculation au RNE', '16/06/2026'],
      ['Département de l’entreprise', '69 - Rhône'],
    ],
  },
  {
    eyebrow: 'Établissement',
    title: 'Adresse principale',
    icon: IdCard,
    rows: [
      ['SIRET', '10631345500011'],
      ['Adresse', '8 RUE Général Charles Delestraint, 69120 Vaulx-en-Velin, France'],
      ['Code APE', '6201Z'],
    ],
  },
  {
    eyebrow: 'Édition',
    title: 'Création et publication',
    icon: Globe2,
    rows: [
      ['Site concerné', BUSINESS.name],
      ['Créateur du site', 'Rifanor Software'],
      ['Responsable de publication', 'Rifanor Software'],
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
