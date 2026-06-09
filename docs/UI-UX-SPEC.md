# Spécification UI/UX — SHM · Institut lashes & nails (Villeurbanne)

> Site vitrine premium · Next.js 16 (App Router) + Tailwind CSS v4 · Mobile First
> Objectif n°1 : prise de rendez-vous Planity · Objectif n°2 : prestations + confiance
> Cible : femmes 25–65 ans · Direction : moderne, haut de gamme, rassurant, féminin

---

## 0. Résumé exécutif

SHM possède déjà une base technique solide (Next 16, framer-motion, R3F, polices Geist + Playfair) mais le site actuel est un thème **sombre WebGL** qui dessert le positionnement « institut premium féminin » et lui manque les sections de conversion décisives. Cette spec définit un pivot vers une **direction claire ivoire/champagne**, l'ajout des sections **Avant/Après, Tarifs structurés, FAQ et Contact réel**, et la mise à niveau **SEO local + accessibilité + performance**.

**Les 3 leviers de conversion prioritaires**
1. **Section Avant/Après** (preuve visuelle) — déclencheur n°1 de réservation en esthétique.
2. **SEO local** (metadata réelle + JSON-LD `BeautySalon` + NAP Villeurbanne) — amène le trafic « extension de cils Villeurbanne ».
3. **CTA Planity omniprésent** — header sticky + barre mobile fixe + CTA par carte prestation.

### Table des matières
1. [Architecture de la page](#1-architecture-de-la-page)
2. [Spécification par section](#2-spécification-par-section)
3. [Design System](#3-design-system)
4. [Bibliothèque de composants](#4-bibliothèque-de-composants)
5. [Expérience utilisateur & conversion](#5-expérience-utilisateur--conversion)
6. [SEO local](#6-seo-local)
7. [Accessibilité & performance](#7-accessibilité--performance)
8. [Direction artistique & inspirations](#8-direction-artistique--inspirations)
9. [Écarts vs l'existant (priorisé)](#9-écarts-vs-lexistant-priorisé)
10. [Fichiers à créer / modifier](#10-fichiers-à-créer--modifier)

### État des lieux (existant inspecté)
- **`app/page.tsx`** : ordre `SiteMenu → Hero → About(#signature) → Services(#prestations) → StatsBand → Process(#parcours) → Info(#contact) → Cta → Footer`. Fond `bg-black` + overlay `bg-black/85` sur la `Scene3D`.
- **`app/layout.tsx`** : ⚠️ `lang="en"`, `metadata` = « Create Next App » (à corriger d'urgence).
- **`app/globals.css`** : ⚠️ `body { font-family: Arial }` écrase Geist ; `@theme` minimal ; pas de `prefers-reduced-motion`.
- **`lib/content.ts`** : `PLANITY_URL` réel, 12 services, 4 catégories (toutes rose-400), 3 avis sans auteur/note, horaires 7j/7, NAP = **68 Rue Léon Blum, 69100 Villeurbanne**.
- **Manquant** : Avant/Après, Tarifs lisibles, FAQ, Contact (carte + formulaire), SEO, JSON-LD.

---

## 1. Architecture de la page

Ordre psychologique cible (single-page, ancres scroll) :

```
┌──────────────────────────────────────────────┐
│ 0. Header sticky (logo + nav + CTA Planity)   │
├──────────────────────────────────────────────┤
│ 1. HERO              #accueil                  │  Désir + promesse + CTA
│ 2. RÉASSURANCE       (bandeau stats)           │  Crédibilité immédiate
│ 3. PRÉSENTATION      #signature                │  Confiance / humain
│ 4. PRESTATIONS       #prestations              │  Offre filtrable
│ 5. RÉSULTATS         #resultats   ← NOUVEAU    │  Preuve avant/après
│ 6. AVIS              #avis         ← NOUVEAU    │  Preuve sociale
│ 7. TARIFS            #tarifs       ← NOUVEAU    │  Transparence
│ 8. PROCESSUS         #parcours                 │  Réduction friction
│ 9. FAQ               #faq          ← NOUVEAU    │  Levée d'objections
│ 10. CONTACT          #contact      ← REFONTE   │  Accès / carte / horaires
│ 11. CTA FINAL                                  │  Dernière conversion
│ 12. FOOTER                                     │  NAP + légal + social
└──────────────────────────────────────────────┘
+ Barre de réservation fixe (mobile uniquement)
```

**Logique d'ordre** : on capte le désir (Hero) → on rassure tout de suite (stats) → on humanise (présentation) → on montre l'offre (prestations) → on **prouve** (avant/après + avis) → on lève le frein prix (tarifs) → on désamorce les hésitations (processus + FAQ) → on facilite l'action (contact + CTA). La preuve (5-6) est placée **avant** les tarifs : on crée la valeur perçue avant d'annoncer le prix.

---

## 2. Spécification par section
