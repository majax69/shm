---
name: no-build-lint-unless-asked
description: Do not run pnpm build or pnpm lint unless the user explicitly asks
metadata:
  type: feedback
---

Ne pas lancer `pnpm build` ni `pnpm lint` de ma propre initiative — seulement si l'utilisateur le demande explicitement.

**Why:** L'utilisateur l'a demandé directement ; il trouve ces exécutions automatiques superflues/dérangeantes pendant l'itération visuelle.

**How to apply:** Faire les modifications de code et m'arrêter. Laisser l'utilisateur valider visuellement. Ne proposer/exécuter un build ou un lint que sur demande.
