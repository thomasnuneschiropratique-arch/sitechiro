# Nunes Chiropratique — site unifié

Fusion du **site vitrine** (`nuneschiropratique.fr`, WordPress) et du **tunnel de vente**
(`bilanchiropratique.netlify.app`) en un seul site statique, avec une identité visuelle
commune.

Site 100 % statique : HTML, CSS et un petit fichier JavaScript. **Aucune base de données,
aucun build, aucune dépendance** — donc rien à mettre à jour, rien qui casse, et un
chargement quasi instantané.

---

## ⚠️ À lire en premier

Les deux sites d'origine **n'ont pas pu être consultés** : la politique réseau de
l'environnement où ce travail a été réalisé bloque `nuneschiropratique.fr` et
`bilanchiropratique.netlify.app` (erreur 403 du proxy de sortie).

Les informations vérifiables ont été récupérées via des sources publiques (annuaires,
Doctolib) :

| Donnée | Valeur retenue |
|---|---|
| Cabinet | Cabinet Chiropratique Thomas Nunes |
| Adresse | 56 boulevard de Strasbourg, 31000 Toulouse |
| Téléphone | 06 88 75 54 52 |
| Horaires | Lun–Ven 9h–20h · Sam 9h–12h |
| Prise de RDV | Doctolib |
| Langues | Français, anglais |
| Paiement | CB, espèces, chèque |
| Accroche | « Retrouvez un corps qui fonctionne à son plein potentiel » |

**Deux conséquences à traiter :**

1. **Les couleurs sont une proposition**, pas une reprise de l'existant (impossible de voir
   les vôtres). Vert-pétrole + terracotta sur fond crème. → voir *Changer les couleurs*.
2. **Rien n'a été inventé** : ni tarif, ni témoignage, ni diplôme, ni mention légale.
   Ces emplacements sont préparés et signalés. → voir *À compléter avant mise en ligne*.

---

## Structure

```
/                        Accueil — vitrine
/la-chiropratique/       La discipline expliquée
/le-cabinet/             Le praticien et le lieu
/infos-pratiques/        Horaires, tarifs, accès, formulaire de contact
/mentions-legales/       Obligatoire
/confidentialite/        RGPD

/bilan/                  ⚠ TUNNEL DE VENTE — page publicitaire, non listée
/bilan/merci/            Confirmation après envoi du formulaire
/merci-contact/          Confirmation du formulaire de contact
/404.html                Page d'erreur

assets/css/site.css      Design system — toutes les couleurs sont ici
assets/css/funnel.css    Styles propres au tunnel
assets/js/site.js        Menu mobile, FAQ, animations, CTA collant
netlify.toml             Déploiement, en-têtes, redirections
robots.txt, sitemap.xml  Référencement
```

---

## Le tunnel de vente est cloisonné

C'était votre demande : les visiteurs du site vitrine ne doivent pas pouvoir tomber sur
le tunnel. **Quatre verrous** ont été posés :

| Verrou | Où | Effet |
|---|---|---|
| Aucun lien entrant | toutes les pages vitrine | `/bilan/` n'apparaît ni dans le menu, ni en pied de page, ni dans le corps du site |
| `<meta name="robots" content="noindex">` | `bilan/index.html`, `bilan/merci/index.html` | désindexation par les moteurs |
| `Disallow: /bilan/` | `robots.txt` | exclusion du crawl |
| En-tête `X-Robots-Tag: noindex` | `netlify.toml` | verrou côté serveur, actif même si l'URL fuite |

Le tunnel est également absent du `sitemap.xml`, et **n'a pas de menu** : aucun lien ne
ramène vers la vitrine, pour que le visiteur venu de la publicité reste dans le parcours.

> Seule exception, obligatoire : les liens « Mentions légales » et « Confidentialité » en
> pied de page du tunnel. La loi impose qu'ils soient accessibles depuis toute page.

**URL à mettre dans vos annonces :**

```
https://nuneschiropratique.fr/bilan/
```

Ajoutez un paramètre pour tracer la campagne, il est enregistré avec chaque demande :

```
https://nuneschiropratique.fr/bilan/?src=meta-octobre
```

---

## Changer les couleurs

Toute l'identité tient dans **4 variables**, en haut de `assets/css/site.css` :

```css
:root {
  --brand-900: #10332E;   /* vert profond : aplats sombres, pied de page */
  --brand-700: #1A5B50;   /* vert principal : titres, boutons, liens     */
  --brand-500: #2B8A78;   /* vert clair : survols, accents               */
  --accent-500: #C2703F;  /* terracotta : boutons du tunnel, détails     */
}
```

Modifiez ces 4 lignes et **tout le site suit** — vitrine et tunnel, boutons, icônes,
dégradés, pied de page. Pensez à mettre à jour `--brand-100`, `--brand-050` et
`--accent-100` juste en dessous (versions très claires des mêmes teintes), ainsi que la
balise `<meta name="theme-color">` dans chaque page.

*Envoyez-moi vos couleurs actuelles (ou une capture du site WordPress) et je les applique.*

---

## À compléter avant mise en ligne

### 1. Obligatoire (juridique)

Les champs surlignés en orange dans `/mentions-legales/` et `/confidentialite/` :
SIRET, forme juridique, e-mail de contact, diplôme, hébergeur, date de mise à jour.
**Le site ne doit pas être publié sans ces informations** (loi LCEN du 21 juin 2004).

### 2. Photos

7 emplacements sont matérialisés par un bloc dégradé « Emplacement photo ». Chacun est
précédé d'un commentaire HTML indiquant le format attendu :

| Page | Photo | Format |
|---|---|---|
| Accueil | portrait praticien | 4/5 — 1000×1250 |
| Accueil | salle de soin | 1/1 — 1000×1000 |
| Le cabinet | portrait praticien | 4/5 — 1000×1250 |
| Le cabinet | salle de soin | 3/2 — 1200×800 |
| Le cabinet | accueil / salle d'attente | 3/2 — 1200×800 |
| Tunnel | praticien en consultation | 16/10 — 1200×750 |
| Tunnel | portrait praticien | 1/1 — 900×900 |

Déposez les fichiers dans `assets/img/` et remplacez le bloc `<div class="ph">…</div>`
par la balise `<img>` donnée en commentaire juste au-dessus.

> Sur le tunnel, une vraie photo de vous augmente nettement la conversion. C'est le
> changement le plus rentable de cette liste.

### 3. Témoignages

Les deux sections « témoignages » (accueil et tunnel) sont **écrites mais désactivées**
(mises en commentaire) : aucun avis n'a été inventé. Collez-y 3 avis réels — Doctolib,
Google, e-mail patient — prénom seul et avec l'accord de la personne, puis retirez les
balises de commentaire.

*Publier de faux avis est interdit (art. L121-4 du Code de la consommation).*

### 4. Tarifs

`/infos-pratiques/` renvoie pour l'instant vers l'agenda en ligne et l'affichage au
cabinet. Un tableau prêt à l'emploi est en commentaire dans la page : renseignez vos
montants et remplacez le paragraphe.

### 5. Votre parcours

Volontairement vide sur `/le-cabinet/` et sur le tunnel : école, année de diplôme,
formations. C'est l'élément de réassurance le plus efficace — mais il doit être exact.

### 6. L'offre du tunnel

Le bandeau orange en haut de `/bilan/` et le bloc prix de la carte de réservation doivent
**reprendre mot pour mot le message de vos annonces**. Un décalage entre la publicité et
la page fait chuter la conversion. Le bloc prix est prêt, en commentaire, dans
`bilan/index.html`.

---

## Mise en ligne (Netlify)

Vous utilisez déjà Netlify pour le tunnel, autant y rester.

1. **Netlify → Add new site → Import from Git**, sélectionnez ce dépôt.
2. Build command : *(vide)* · Publish directory : `.` — déjà dans `netlify.toml`.
3. **Domain settings** → ajoutez `nuneschiropratique.fr` et `www.nuneschiropratique.fr`,
   puis suivez les instructions DNS. Le certificat HTTPS est automatique.
4. **Forms** : activés d'office. Les demandes arrivent dans l'onglet *Forms*.
   → **Form notifications** : ajoutez une notification e-mail, sinon vous ne serez pas
   prévenu des nouvelles demandes.

### Avant de basculer le DNS

Le site WordPress actuel a des URL que Google connaît. `netlify.toml` contient déjà des
redirections 301 (`/contact`, `/tarifs`, `/a-propos`…) **à vérifier et compléter** avec
vos véritables anciennes adresses — sinon vous perdez le référencement acquis.

Pour les lister : Google Search Console → *Pages*, ou `site:nuneschiropratique.fr`
dans Google.

### L'ancien domaine du tunnel

Si des publicités pointent encore vers `bilanchiropratique.netlify.app`, gardez ce site
Netlify actif et ajoutez-y une redirection vers `https://nuneschiropratique.fr/bilan/`
le temps de mettre vos annonces à jour.

---

## Aperçu en local

Les liens sont absolus (`/le-cabinet/`), donc ouvrir les fichiers par double-clic ne
fonctionne pas. Lancez un petit serveur :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

---

## Suivi de conversion et RGPD

Le site, tel qu'il est livré, **ne dépose aucun cookie** : pas de Google Analytics, pas de
police externe, pas de carte intégrée, pas de bouton de réseau social. Aucune bannière de
consentement n'est donc nécessaire, et la page Confidentialité le reflète.

Si vous ajoutez un **pixel Meta ou un tag Google Ads** (l'endroit prévu est indiqué en
commentaire dans `bilan/merci/index.html`, la page qu'atteint un visiteur ayant envoyé le
formulaire) :

- le traceur ne doit se déclencher **qu'après** consentement explicite du visiteur ;
- une bannière conforme (accepter / refuser à égalité) devient obligatoire ;
- `/confidentialite/` doit être complétée ;
- la règle `Content-Security-Policy` de `netlify.toml` doit être élargie, sinon le
  navigateur bloquera le script.

---

## Accessibilité et qualité

Vérifié au navigateur sur les 10 pages, en 1440 px et 390 px :

- aucune erreur JavaScript, aucune ressource manquante, aucun débordement horizontal ;
- une seule `<h1>` par page, hiérarchie de titres cohérente, `lang="fr"` ;
- navigation au clavier avec lien d'évitement et focus visible ;
- menu mobile et CTA collant testés ;
- animations désactivées si `prefers-reduced-motion` est actif ;
- données structurées `schema.org/Chiropractic` (adresse, horaires, téléphone) sur
  l'accueil, pour l'affichage dans Google.
