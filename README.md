# Cabinet Chiropratique Thomas Nunes — site unifié

Fusion du site vitrine (`nuneschiropratique.fr`) et du tunnel de vente
(`bilanchiropratique.netlify.app`) en un seul site statique.

HTML, CSS et un fichier JavaScript. **Aucun build, aucune dépendance, aucune base de
données.** Polices auto-hébergées, aucune requête vers un service tiers.

---

## 🔴 Ce qu'il me faut de votre part

### 1. Les photos (4 fichiers)

Les emplacements sont déjà codés dans les pages. Déposez les fichiers dans
`assets/img/` **avec exactement ces noms** et ils apparaîtront automatiquement.
Tant qu'ils sont absents, un bloc dégradé s'affiche à la place — le site ne casse pas.

| Nom du fichier | Photo | Format conseillé |
|---|---|---|
| `cabinet-salle-de-soin.jpg` | La salle avec les trois tables | paysage, ~1600×1000 |
| `thomas-consultation.jpg` | Vous en chemise blanche, devant la fenêtre | paysage, ~1600×900 |
| `thomas-ajustement-cervical.jpg` | Vous en pull marine, ajustement cervical | portrait, ~1000×1500 |
| `thomas-portrait-ajustement.jpg` | Vous en chemise blanche, vue de dessus | portrait, ~1000×1250 |

**Comment les déposer sans ligne de commande :** sur GitHub, ouvrez le dossier
`assets/img/` → bouton **Add file** → **Upload files** → glissez les 4 photos →
**Commit changes**.

> Pensez à les compresser avant (par ex. [squoosh.app](https://squoosh.app)) :
> visez moins de 300 Ko par photo, sinon le site ralentit et le SEO en pâtit.

### 2. Le vrai logo

`assets/img/embleme.svg` et `assets/img/logo.svg` sont des **redessins approximatifs**
à partir de l'image que vous m'avez montrée — je n'ai pas pu récupérer le fichier
original. Déposez votre vrai logo (SVG de préférence, sinon PNG à fond transparent)
sous ces deux noms et il remplacera le mien partout.

### 3. Vos avis Google

Je n'ai pas accès à Google depuis cet environnement, et **je n'invente pas d'avis**.
Les sections « Avis Google » de l'accueil et du tunnel sont écrites et stylées, mais
mises en commentaire dans le HTML.

Copiez-collez-moi 3 avis réels (texte + prénom) et je les intègre — ou faites-le
vous-même en retirant les balises `<!-- -->` autour de la section.

*Publier de faux avis est interdit (art. L121-4 du Code de la consommation).*

### 4. Les mentions légales

Champs surlignés en orange dans `/mentions-legales/` et `/confidentialite/` :
SIRET, forme juridique, e-mail, diplôme, hébergeur. **Obligatoire avant publication.**

### 5. Vos tarifs et votre parcours

Emplacements prêts, en commentaire dans `/infos-pratiques/` et `/le-cabinet/`.
Rien n'a été inventé.

---

## Comment me donner accès à votre site actuel

Les deux sites sont **bloqués par la politique réseau** de cet environnement (erreur
403 du proxy de sortie) — c'est aussi le cas de Google, de PagesJaunes et de
`mbesse.fr`. Trois solutions, de la plus simple à la plus complète :

1. **Copier-coller.** Ouvrez chaque page de votre WordPress, sélectionnez tout,
   collez-le dans la conversation. C'est le plus rapide et ça suffit dans 90 % des cas.
2. **Captures d'écran.** Comme vous l'avez fait pour le logo et les photos : idéal
   pour que je reprenne des couleurs ou une mise en page précise.
3. **Ouvrir le réseau.** Dans les réglages de votre environnement Claude Code,
   la politique réseau détermine les domaines que je peux atteindre. En autorisant
   `nuneschiropratique.fr` et `bilanchiropratique.netlify.app`, je pourrai les lire
   directement. Voir la
   [documentation Claude Code](https://code.claude.com/docs/en/claude-code-on-the-web).

---

## Structure

```
/                        Accueil
/la-chiropratique/       La discipline expliquée
/le-cabinet/             Le praticien et le lieu
/infos-pratiques/        Horaires, tarifs, accès, contact
/mentions-legales/  /confidentialite/
/merci-contact/  404.html

/bilan/                  ⚠ TUNNEL — page publicitaire, non listée
/bilan/merci/            Confirmation + emplacement du pixel de conversion

assets/css/site.css      Design system — les 4 couleurs de marque sont en haut
assets/css/funnel.css    Styles du tunnel
assets/js/site.js        Interactions (~10 Ko)
assets/fonts/            Cormorant Garamond + Inter, auto-hébergées (86 Ko)
assets/img/              Logo, emblème, favicon + VOS PHOTOS à déposer
netlify.toml             Déploiement, en-têtes de sécurité, redirections
```

---

## Le tunnel reste cloisonné

| Verrou | Où |
|---|---|
| Aucun lien entrant | toutes les pages vitrine |
| `<meta name="robots" content="noindex">` | pages `/bilan/` |
| `Disallow: /bilan/` | `robots.txt` |
| En-tête `X-Robots-Tag` | `netlify.toml` (verrou serveur) |
| Absent du `sitemap.xml` | — |

Le tunnel n'a pas de menu. Seule exception, imposée par la loi : les liens mentions
légales / confidentialité en pied de page.

**URL pour vos annonces :** `https://nuneschiropratique.fr/bilan/?src=meta-octobre`
Le paramètre `src` est enregistré avec chaque demande : vous saurez quelle campagne
a généré quel rendez-vous.

---

## Horaires

Renseignés partout (page infos, pied de page, tunnel, et données structurées Google) :

| Jour | Horaires |
|---|---|
| Lundi, mardi, jeudi | 11h – 14h et 17h – 20h |
| Mercredi | 10h – 12h |
| Vendredi, samedi, dimanche | Fermé |

Le jour en cours est automatiquement mis en évidence dans le tableau.

---

## Identité visuelle

Reprise de votre logo et de vos photos : **teal pétrole sur blanc**, serif classique,
beaucoup de blanc. Les 4 couleurs sont en haut de `assets/css/site.css` :

```css
--brand-900: #1B4B48;   /* teal profond : aplats, pied de page */
--brand-700: #2A6360;   /* teal du logo : titres, boutons      */
--brand-500: #4E8C87;   /* teal clair : survols, traits        */
--brand-300: #9BBCB8;
```

Typographie : **Cormorant Garamond** pour les titres (proche du serif de votre logo)
et **Inter** pour le texte. Les deux sont dans `assets/fonts/` — aucune requête vers
Google Fonts, donc rien à déclarer au RGPD.

---

## Côté technique

Ce qui tourne, en JavaScript natif, sans aucune bibliothèque :

- écran de chargement avec animation du logo, puis transition au voile entre les pages ;
- titres révélés mot par mot, apparitions en cascade au défilement ;
- parallaxe sur les photos, volet qui se retire au passage ;
- en-tête qui se masque en descendant, réapparaît en remontant ;
- barre de progression de lecture, curseur personnalisé, boutons magnétiques ;
- compteur animé, bandeau défilant, accordéon FAQ ;
- CTA collant sur mobile dans le tunnel, qui s'efface quand le formulaire est à l'écran.

**Tout est désactivé si le visiteur a activé « réduire les animations »**, et le site
reste entièrement lisible et navigable sans JavaScript.

---

## SEO

- Titres et méta-descriptions uniques et ciblés sur chaque page.
- Données structurées : `Chiropractic` (adresse, horaires réels, géolocalisation,
  zone desservie, moyens de paiement, langues, action de réservation), `Person`,
  `WebSite`, `BreadcrumbList` et `FAQPage`.
- Balises canoniques, Open Graph, Twitter Card, métadonnées géographiques.
- Images avec `alt` descriptif, dimensions déclarées, chargement différé.
- Polices préchargées, cache long sur les assets, aucun script tiers → site très rapide.
- `sitemap.xml` avec dates, `robots.txt`, redirections 301 depuis les anciennes URL.

**Ce qui reste à faire pour le référencement local** (le plus rentable pour un cabinet) :

1. Revendiquer et compléter la **fiche Google Business Profile** — c'est elle qui
   fait 80 % du travail sur « chiropracteur Toulouse ».
2. Vérifier que les horaires y sont identiques à ceux du site.
3. Compléter les **redirections 301** dans `netlify.toml` avec vos vraies anciennes
   URL WordPress (Google Search Console → Pages, ou `site:nuneschiropratique.fr`).
4. Déposer le `sitemap.xml` dans la Search Console après la mise en ligne.

---

## Mise en ligne (Netlify)

1. **Add new site → Import from Git**, sélectionnez ce dépôt.
2. Build command : *(vide)* · Publish directory : `.` — déjà dans `netlify.toml`.
3. **Domain settings** → ajoutez `nuneschiropratique.fr` et `www`. HTTPS automatique.
4. **Forms** → activés d'office. **Ajoutez une notification e-mail**, sinon vous ne
   serez pas prévenu des nouvelles demandes.

Si des publicités pointent encore vers `bilanchiropratique.netlify.app`, gardez ce
site actif et redirigez-le vers `https://nuneschiropratique.fr/bilan/`.

### Aperçu en local

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

---

## RGPD

Le site ne dépose **aucun cookie** : pas d'analytics, pas de police externe, pas de
carte intégrée, pas de bouton social. Aucune bannière de consentement nécessaire.

Si vous ajoutez un **pixel Meta ou Google Ads** (emplacement prévu en commentaire dans
`bilan/merci/index.html`) : consentement préalable obligatoire, bannière conforme,
page Confidentialité à compléter, et règle `Content-Security-Policy` de `netlify.toml`
à élargir — sinon le navigateur bloquera le script.

---

## Vérifications effectuées

Au navigateur, sur les 10 pages, en 1440 / 1024 / 390 / 320 px :
aucune erreur JavaScript, aucune ressource manquante (hors les 4 photos à déposer),
aucun débordement horizontal, une seule `<h1>` par page, données structurées valides,
navigation clavier et menu mobile fonctionnels.
