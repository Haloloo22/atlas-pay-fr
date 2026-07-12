# Vidéo démo produit FleetPay (~28s)

Vidéo motion-design silencieuse en français, style **Tech Product** (typo sans-serif nette, palette bleu profond FleetPay + blanc + accents turquoise, springs snappy, transitions ciselées). Le viewer comprend le parcours produit sans son grâce à la kinetic typography et à des mockups d'UI stylisés.

## Palette & typo
- Fond principal `#0A1628` (deep navy) → alternances `#F8FAFC` (light)
- Primaire `#1E40AF` (bleu FleetPay), accent `#14B8A6` (turquoise), succès `#10B981`, alerte `#F59E0B`
- Display + body : **Inter** (déjà chargé projet) via `@remotion/google-fonts/Inter`

## Storyboard — 6 scènes / 28s @ 30fps (840 frames)

```
[00:00–00:03]  S1  Hook / logo reveal        90f
[00:03–00:08]  S2  Créer la flotte           150f
[00:08–00:13]  S3  Cartes Visa Fleet         150f
[00:13–00:18]  S4  Suivi temps réel          150f
[00:18–00:23]  S5  Alertes & géofencing      150f
[00:23–00:28]  S6  Rapports + CTA final      150f
```

Chaque scène : kicker discret (uppercase tracké) → titre kinetic → mockup UI animé (carte, dashboard, map Maroc, graphe) → petit stat/label qui claque. Transitions `wipe` + `slide` du package `@remotion/transitions`, springs cohérents.

### Détails par scène
1. **Hook** — Logo "FleetPay" assemblé lettre par lettre, tagline « Votre flotte sous contrôle ».
2. **Créer flotte** — Icônes véhicules (Truck) qui apparaissent en stagger sur une grille, compteur "1 → 12 véhicules".
3. **Cartes** — Carte Visa Fleet 3D qui flip, chip animée, "Physique & Virtuelle" en split.
4. **Temps réel** — Transactions qui s'insèrent en live dans une liste (stations Total/Shell/Afriquia), montant qui totalise.
5. **Alertes & géofencing** — Carte du Maroc avec zone dessinée (Casablanca centrée, zoom 6), pin qui sort de zone → toast d'alerte rouge.
6. **Rapports + close** — Bar chart qui s'anime, export PDF/Excel, close card "Essayez la démo → atlas-pay-fr.lovable.app".

## Setup technique
- Nouveau dossier `remotion/` isolé du frontend (n'affecte pas l'app).
- `bun init` + install `remotion @remotion/cli @remotion/renderer @remotion/bundler @remotion/transitions @remotion/google-fonts @remotion/compositor-linux-x64-musl react react-dom typescript`.
- Fix compositor NixOS + symlink ffmpeg/ffprobe (voir skill video-creator).
- Script `scripts/render-remotion.mjs` (chrome-for-testing, muted, concurrency 1).

## Livrables
- **`/mnt/documents/fleetpay-demo.mp4`** — 1920×1080, ~28s, H.264, muet.
- Sources Remotion versionnées dans `remotion/` pour ré-édition future.
- Adaptation 9:16 (réseaux sociaux) : je livre le 16:9 en priorité, puis on peut relancer un rendu vertical en réutilisant les mêmes scènes (recadrage + repositionnement des mockups) — on décidera après visionnage du premier rendu.

## Ce qui n'est PAS touché
- Aucun changement dans `src/`, pas de nouvelle route, pas de composant UI dans l'app.
- Pas de voix off, pas de musique (ajoutables plus tard si besoin).
