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

export const HERO_IMAGES = [
  // 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=3840&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=3840&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=3840&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=3840&auto=format&fit=crop',
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
  { id: 'cils', name: 'Extension de cils', icon: Eye, color: 'text-rose-400', bgColor: 'bg-rose-400/10', borderColor: 'border-rose-400/15' },
  { id: 'ongles', name: 'Ongles', icon: Scissors, color: 'text-rose-400', bgColor: 'bg-rose-400/10', borderColor: 'border-rose-400/15' },
  { id: 'sourcils', name: 'Sourcils', icon: Sparkles, color: 'text-rose-400', bgColor: 'bg-rose-400/10', borderColor: 'border-rose-400/15' },
  { id: 'epilation', name: 'Épilation', icon: Scissors, color: 'text-rose-400', bgColor: 'bg-rose-400/10', borderColor: 'border-rose-400/15' },
]

export const reviews: string[] = [
  'Pose magnifique, prestataire à l\'écoute.',
  'Résultat toujours magnifique et les cils tiennent longtemps.',
  'Accueil adorable, résultat très beau.',
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
  { value: '5★', label: 'Volume russe & wispi' },
]
