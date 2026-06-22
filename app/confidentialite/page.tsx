import type { Metadata } from 'next'
import { Cookie, Database, ExternalLink, Eye, FileText, Lock, Server, UserCheck } from 'lucide-react'
import { BUSINESS } from '@/lib/content'
import { LegalDocumentPage, type LegalSection } from '../components/legal-document-page'

const sections: LegalSection[] = [
  {
    eyebrow: 'Responsabilité',
    title: 'Responsable du traitement',
    icon: UserCheck,
    body:
      'Le responsable du traitement des données personnelles collectées via ce site est SHM Cils & Ongles. Pour toute demande relative à vos données, vous pouvez utiliser les coordonnées indiquées sur le site.',
  },
  {
    eyebrow: 'Collecte',
    title: 'Données concernées',
    icon: Database,
    body:
      'Le site vitrine ne propose pas de formulaire de contact direct. Les données susceptibles d’être traitées proviennent principalement de vos échanges volontaires par téléphone, e-mail, réseaux sociaux ou via la plateforme de réservation Planity.',
  },
  {
    eyebrow: 'Usage',
    title: 'Finalités et base légale',
    icon: FileText,
    body:
      'Les données sont utilisées pour répondre aux demandes, gérer les rendez-vous, assurer le suivi de la relation client et permettre le bon fonctionnement technique du site. Les traitements reposent selon les cas sur votre consentement, l’exécution de mesures précontractuelles ou contractuelles, l’intérêt légitime de l’entreprise ou le respect d’obligations légales.',
  },
  {
    eyebrow: 'Durée',
    title: 'Conservation',
    icon: Lock,
    body:
      'Les données sont conservées uniquement pendant la durée nécessaire aux finalités poursuivies, puis archivées ou supprimées selon les obligations légales applicables.',
  },
  {
    eyebrow: 'RGPD',
    title: 'Vos droits',
    icon: Eye,
    body:
      'Conformément au RGPD, vous pouvez demander l’accès, la rectification, l’effacement, la limitation, l’opposition au traitement de vos données, ainsi que la portabilité lorsque ce droit s’applique. En cas de difficulté, vous pouvez saisir la CNIL.',
  },
  {
    eyebrow: 'Écosystème',
    title: 'Services tiers',
    icon: ExternalLink,
    rows: [
      ['Vercel', 'hébergement et diffusion technique du site'],
      ['Planity', 'réservation en ligne et gestion des rendez-vous'],
      ['Google Maps', 'affichage de la carte et itinéraire'],
      ['Instagram', 'accès au profil social depuis le site'],
    ],
  },
  {
    eyebrow: 'Navigation',
    title: 'Cookies',
    icon: Cookie,
    body:
      'Le site peut utiliser des cookies ou traceurs strictement nécessaires à son fonctionnement technique. Des services tiers intégrés ou liés depuis le site peuvent également déposer leurs propres cookies selon leurs politiques de confidentialité.',
  },
  {
    eyebrow: 'Infrastructure',
    title: 'Hébergement',
    icon: Server,
    body:
      'Le site est hébergé sur Vercel. Des données techniques de connexion peuvent être traitées par l’hébergeur pour assurer la sécurité, la disponibilité et la performance du service.',
  },
]

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité du site SHM Cils & Ongles : données personnelles, services tiers, cookies et droits RGPD.',
  alternates: { canonical: '/confidentialite' },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ConfidentialitePage() {
  return (
    <LegalDocumentPage
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      description={`Cette politique explique comment les données personnelles peuvent être traitées lors de la consultation du site ${BUSINESS.name} et de l’utilisation des services associés.`}
      sections={sections}
      finalNote="Cette page est rédigée pour donner une information claire aux visiteurs. Elle pourra être mise à jour si de nouveaux formulaires, outils de mesure d’audience ou services tiers sont ajoutés au site."
    />
  )
}
