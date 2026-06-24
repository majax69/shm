import {
  CalendarCheck,
  Eye,
  Gem,
  Heart,
  Leaf,
  type LucideIcon,
  MessageCircle,
  Scissors,
  Sparkles,
  Wand2,
} from 'lucide-react'

export const PLANITY_URL =
  'https://www.planity.com/shm-cils-ongles-lyon-69100-villeurbanne'

// Coordonnées de l'institut (NAP — Name / Address / Phone, cohérent partout
// pour le référencement local). À ajuster avec les vraies valeurs si besoin.
export const BUSINESS = {
  name: 'SHM Cils & Ongles',
  street: '68 Rue Léon Blum',
  postalCode: '69100',
  city: 'Villeurbanne',
  region: 'Auvergne-Rhône-Alpes',
  country: 'FR',
  countryName: 'France',
  phoneDisplay: '06 24 04 31 93',
  phoneHref: '+33624043193',
  email: 'ahamianesiham@gmail.com',
  instagram: 'https://www.instagram.com/cilslyon_shm/',
  url: 'https://beautyshm.fr',
  // Lat/Lng approximatifs de Villeurbanne — à affiner pour le pin Maps.
  geo: { lat: 45.7693, lng: 4.8807 },
  areasServed: ['Villeurbanne', 'Lyon 3', 'Lyon 6', 'Lyon 7', 'Bron', 'Vaulx-en-Velin'],
} as const

// URL d'intégration Google Maps (iframe). Remplacer le `q=` par l'adresse
// exacte / le Place ID de l'établissement pour un pin précis.
export const GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps?q=68+Rue+L%C3%A9on+Blum+69100+Villeurbanne&output=embed'
export const GOOGLE_MAPS_LINK =
  'https://www.google.com/maps/search/?api=1&query=68+Rue+L%C3%A9on+Blum+69100+Villeurbanne'

export const SEO_IMAGES = [
  '/cils-extension-closeup.png',
  '/cliente-soin-cils-brune.png',
  '/ongles-nail-art-mains.png',
  '/ongles-french-ombre.jpg',
] as const

export const HERO_IMAGES = [
  '/background1.png',
  '/background2.png',
  '/ongles-nail-art-mains.png',
]

export type CategoryId = 'cils' | 'ongles' | 'sourcils' | 'epilation'

export type Service = {
  name: string
  duration: string
  price: string
  icon: LucideIcon
  category: CategoryId
}

export type Category = {
  id: CategoryId
  name: string
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  // Visuel réel du studio ou d'une prestation réalisée.
  image: string
  tagline: string
}

export const services: Service[] = [
  { name: 'Pose classique cil à cil', duration: '1h50', price: '50 €', icon: Eye, category: 'cils' },
  { name: 'Pose mixte', duration: '1h10', price: '50 €', icon: Sparkles, category: 'cils' },
  { name: 'Volume russe soft', duration: '1h20', price: '50 €', icon: Gem, category: 'cils' },
  { name: 'Volume russe intense', duration: '1h30', price: '60 €', icon: Gem, category: 'cils' },
  { name: 'Pose wispi', duration: '1h40', price: '60 €', icon: Sparkles, category: 'cils' },
  { name: 'Pose gel couleur uni', duration: '1h', price: '30 €', icon: Scissors, category: 'ongles' },
  { name: 'Pose gel French', duration: '1h', price: '40 €', icon: Scissors, category: 'ongles' },
  { name: 'Browlift', duration: '45min', price: '30 €', icon: Eye, category: 'sourcils' },
  { name: 'Browlift + coloration', duration: '45min', price: '40 €', icon: Eye, category: 'sourcils' },
  { name: 'Rehaussement de cils', duration: '30min', price: '30 €', icon: Sparkles, category: 'sourcils' },
  { name: 'Rehaussement + teinture', duration: '40min', price: '35 €', icon: Sparkles, category: 'sourcils' },
  { name: 'Épilation sourcils', duration: '15min', price: '10 €', icon: Scissors, category: 'epilation' },
]

// Identité chromatique unique : le rose est le seul accent, décliné en
// nuances légères. La structure reste neutre (blanc translucide).
export const categories: Category[] = [
  {
    id: 'cils',
    name: 'Extension de cils',
    icon: Eye,
    color: 'text-rose-400',
    bgColor: 'bg-rose-400/10',
    borderColor: 'border-rose-400/15',
    image: '/cliente-soin-cils-brune.png',
    tagline: 'Un regard intense, naturellement vôtre.',
  },
  {
    id: 'ongles',
    name: 'Ongles',
    icon: Scissors,
    color: 'text-rose-400',
    bgColor: 'bg-rose-400/10',
    borderColor: 'border-rose-400/15',
    image: '/ongles-nail-art-mains.png',
    tagline: 'Des mains soignées, jusqu’au moindre détail.',
  },
  {
    id: 'sourcils',
    name: 'Sourcils',
    icon: Sparkles,
    color: 'text-rose-400',
    bgColor: 'bg-rose-400/10',
    borderColor: 'border-rose-400/15',
    image: '/cils-extension-closeup.png',
    tagline: 'La ligne qui structure et révèle le visage.',
  },
  {
    id: 'epilation',
    name: 'Épilation',
    icon: Scissors,
    color: 'text-rose-400',
    bgColor: 'bg-rose-400/10',
    borderColor: 'border-rose-400/15',
    image: '/client-epilation.png',
    tagline: 'Une peau nette, un soin tout en douceur.',
  },
]

export type Review = {
  text: string
  rating: number
  date: string
}

// Avis réels récupérés depuis Planity (note moyenne 4,8/5 · 50 avis).
// Planity n'expose pas les noms publiquement → affichés comme avis vérifiés.
export const reviews: Review[] = [
  {
    text: 'J’ai été très bien accueillie, la prestataire qui m’a reçue était adorable et le résultat est très beau. Je recommande.',
    rating: 5,
    date: '6 juin 2026',
  },
  {
    text: 'Foncez les filles, c’est la meilleure ! Poses toujours au top et ça tient !',
    rating: 5,
    date: '25 avril 2026',
  },
  {
    text: 'Prestataire à l’écoute, pose de cils magnifique, je recommande fortement ! Merci.',
    rating: 5,
    date: '14 mai 2026',
  },
  {
    text: 'Super gentille, accueillante et met à l’aise. Elle a fait exactement ce que je lui ai demandé. Trop bien.',
    rating: 5,
    date: '11 mai 2026',
  },
  {
    text: 'C’est la 3ᵉ fois que je fais mes cils avec elle : le résultat est toujours magnifique et les cils tiennent vraiment longtemps.',
    rating: 4.5,
    date: '3 mai 2026',
  },
  {
    text: 'Une pose mixte parfaite ! Je recommande ++ !',
    rating: 5,
    date: '18 mai 2026',
  },
]

export type FaqItem = {
  question: string
  answer: string
}

// FAQ — lève les objections fréquentes avant la réservation (et alimente le
// JSON-LD FAQPage pour le SEO).
export const faqs: FaqItem[] = [
  {
    question: 'Combien de temps tiennent les extensions de cils ?',
    answer:
      'En moyenne 3 à 4 semaines selon votre rythme de pousse naturelle. Un remplissage toutes les 2 à 3 semaines permet de garder un regard parfaitement fourni.',
  },
  {
    question: 'La pose abîme-t-elle mes cils naturels ?',
    answer:
      'Non. Les extensions sont posées cil à cil avec des matériaux premium hypoallergéniques, sans jamais coller les cils entre eux. Bien posées et entretenues, elles respectent totalement vos cils naturels.',
  },
  {
    question: 'Comment se déroule un premier rendez-vous ?',
    answer:
      'On commence par échanger sur vos envies et votre morphologie pour définir la courbure, la longueur et le volume idéals. La pose se fait ensuite confortablement allongée, les yeux fermés — beaucoup de clientes s\'assoupissent.',
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer:
      'Carte bancaire et espèces sur place. La réservation en ligne via Planity est gratuite et sans pré-paiement.',
  },
  {
    question: 'Que faire avant ma séance ?',
    answer:
      'Venez les yeux démaquillés, sans mascara ni crème grasse autour des yeux. Évitez le café juste avant pour limiter les micro-mouvements pendant la pose.',
  },
  {
    question: 'Puis-je annuler ou décaler mon rendez-vous ?',
    answer:
      'Oui, directement depuis votre confirmation Planity. Merci de prévenir au moins 24 h à l\'avance pour libérer le créneau.',
  },
]

export type BeforeAfter = {
  before: string
  after: string
  label: string
  alt: string
}

// Résultats réalisés au studio avec les photos fournies par l'établissement.
export const beforeAfter: BeforeAfter[] = [
  {
    label: 'Extension de cils',
    before: '/cils-avant.png',
    after: '/cils-apres.png',
    alt: 'Regard avant et après une pose d’extensions de cils',
  },
  {
    label: 'Pose gel French',
    before: '/ongles-avant.png',
    after: '/ongles-apres.png',
    alt: 'Ongles avant et après une pose gel French',
  },
]

export const openingHours: string[] = [
  'Lundi à vendredi : 08:00 - 21:30',
  'Samedi : 08:00 - 23:00',
  'Dimanche : 08:00 - 23:00',
]

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

// Piliers de la maison — section « Notre signature ».
export const features: Feature[] = [
  {
    title: 'Un regard sur-mesure',
    description:
      'Chaque pose est pensée selon votre morphologie et vos envies, pour un rendu naturel ou intense, toujours harmonieux.',
    icon: Eye,
  },
  {
    title: 'Des produits premium',
    description:
      'Matériaux haute tenue et hypoallergéniques, sélectionnés pour préserver vos cils et la santé de vos ongles.',
    icon: Leaf,
  },
  {
    title: 'Un geste expert',
    description:
      'Une praticienne minutieuse, formée aux dernières techniques de volume russe, browlift et nail art.',
    icon: Wand2,
  },
  {
    title: 'Un moment pour vous',
    description:
      'Un cocon feutré où l’on prend le temps : café, lumière douce et soin du détail à chaque rendez-vous.',
    icon: Heart,
  },
]

export type Step = {
  step: string
  title: string
  description: string
  icon: LucideIcon
}

// Parcours client — section « Comment ça se passe ».
export const steps: Step[] = [
  {
    step: '01',
    title: 'Vous réservez',
    description: 'Choisissez votre prestation et votre créneau en ligne, 24h/24, avec confirmation immédiate.',
    icon: CalendarCheck,
  },
  {
    step: '02',
    title: 'On échange',
    description: 'À votre arrivée, on définit ensemble la forme, le volume et la courbure qui vous mettent en valeur.',
    icon: MessageCircle,
  },
  {
    step: '03',
    title: 'On sublime',
    description: 'Vous vous installez, on réalise la pose avec précision. Vous repartez avec un regard neuf.',
    icon: Sparkles,
  },
]

export type Stat = {
  value: string
  label: string
}

// Chiffres clés — bandeau de réassurance.
export const stats: Stat[] = [
  { value: '4.8', label: 'Note moyenne' },
  { value: '50+', label: 'Avis clients' },
  { value: '7j/7', label: 'Ouvert tous les jours' },
  { value: '5★', label: 'Volume russe & wispy' },
]
