# 🕰️ TimeTravel Agency — Webapp Interactive

> **Projet pédagogique — M1/M2 Digital & IA — Session 2 : WEBAPP & IA AGENTS**
> Travail réalisé avec des outils de vibe coding et d'IA générative de code.

---

## 📖 Description

**TimeTravel Agency** est une webapp moderne et interactive pour une agence de voyage temporel fictive de luxe. Elle permet aux visiteurs de :

- Découvrir 3 destinations temporelles exclusives avec une interface immersive
- Interagir avec un agent conversationnel IA qui guide et conseille
- Personnaliser leur choix de voyage via un quiz de recommandation
- Réserver et planifier leur voyage temporel

Les 3 destinations proposées :
- 🗼 **Paris 1889** — Exposition Universelle & Belle Époque (à partir de 4 200 €)
- 🦕 **Crétacé -65M** — Derniers jours des dinosaures (à partir de 6 800 €)
- 🖼️ **Florence 1504** — Âge d'or de la Renaissance (à partir de 3 900 €)

---

## 🛠️ Stack Technique

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Framework UI | **React 18** | Composants, state management |
| Build tool | **Vite 5** | Bundler, serveur de développement |
| CSS | **Tailwind CSS 3** | Styles utilitaires, design system |
| Animations | **Framer Motion 11** | Transitions, animations au scroll, micro-interactions |
| Chatbot IA | **Mistral AI API** (mistral-small-latest) | Agent conversationnel |
| Déploiement | **Vercel** | Hébergement statique gratuit |
| Fonts | **Google Fonts** | Playfair Display (titres) + Inter (corps) |

---

## ✨ Features Implémentées

### Page d'accueil — Hero Section
- Vidéo de fond (teaser généré en Session 1) avec fallback sur image statique
- Titre animé avec apparition progressive (Framer Motion)
- Motif "portail temporel" signature (cercles concentriques dorés)
- CTA vers la galerie des destinations

### Galerie des Destinations
- 3 cards interactives avec les images hero générées en Session 1
- Effet de zoom au survol (`scale-110`) et déplacement vertical (`translateY`)
- Badge de l'année avec couleur d'accent propre à chaque destination
- Clic → ouverture d'une modale de détail

### Modale de Détail
- Image pleine largeur en en-tête
- Description enrichie (architecture, ambiance, palette de couleurs, références historiques)
- Tags des points forts de la destination
- Bouton "Réserver ce voyage" → scroll automatique vers le formulaire pré-rempli
- Fermeture via la croix, clic en dehors, ou touche `Escape`

### Agent Conversationnel IA (Chatbot)
- Widget flottant en bas à droite (icône 💬)
- Connexion à l'API Mistral AI (`mistral-small-latest`)
- Personality configurée : conseiller de luxe passionné d'histoire, connaissant les 3 destinations
- Rendu Markdown dans les réponses (gras, italique, sauts de ligne)
- Historique de conversation maintenu pendant la session
- Gestion des erreurs API

### Quiz de Recommandation Personnalisée
- 4 questions sur les préférences du voyageur
- Barre de progression visuelle
- Algorithme de scoring par destination
- Résultat avec image et description de la destination recommandée
- Bouton "Découvrir cette destination" → scroll vers la galerie + ouverture automatique de la modale de détail

### Formulaire de Réservation
- Sélection de la destination (pré-remplie depuis la modale ou le quiz)
- Champ nom
- Champ date avec validation : dates passées bloquées (attribut `min` + message d'erreur)
- Message de confirmation personnalisé après soumission

### Navigation & UX
- Header transparent qui devient opaque au scroll (`backdrop-blur`)
- Navigation par ancres vers chaque section
- Responsive mobile-first
- Respect du préférence `prefers-reduced-motion`
- Focus visible accessible (outline doré)

### Footer
- Mention des technologies et du contexte pédagogique

---

## 🤖 Outils IA Utilisés

### Session 1 — Génération des Assets Visuels
| Asset | Outil utilisé | Notes |
|-------|--------------|-------|
| Images hero (16:9) | **Leonardo.ai** | Modèle Leonardo Phoenix, prompt cinématographique |
| Déclinaisons formats (1:1, 9:16) | **Canva** puis **ChatGPT** | Recadrage (crédits Leonardo épuisés) |
| Vidéos image-to-video | **Gemini** | Remplacement de Pika Labs (crédits épuisés) |
| Voix-off (MP3) | **ElevenLabs** | Voix française premium, ~75 mots |
| Musique d'ambiance (MP3) | **Suno AI** | Cinématique orchestral, 25 secondes |
| Montage teaser final | **CapCut** | Assemblage vidéo + audio |

### Session 2 — Génération du Code & IA
| Composant | Outil / Modèle | Notes |
|-----------|---------------|-------|
| Code React/Tailwind | **Claude Sonnet** (via claude.ai) | Génération de l'intégralité du code |
| Agent conversationnel | **Mistral AI** (`mistral-small-latest`) | API directe, gratuit |
| Icônes & polices | **Google Fonts** | Playfair Display, Inter |

---

## 📁 Structure du Projet

```
timetravel-webapp/
├── public/
│   └── assets/
│       ├── paris-1889-hero.jpg       # Image hero Paris 1889 (générée Leonardo.ai)
│       ├── cretace-hero.jpg          # Image hero Crétacé (générée Leonardo.ai)
│       ├── florence-1504-hero.jpg    # Image hero Florence 1504 (générée Leonardo.ai)
│       └── timetravel-teaser.mp4    # Vidéo teaser Session 1 (CapCut)
├── src/
│   ├── components/
│   │   ├── Header.jsx               # Navigation fixe avec effet au scroll
│   │   ├── Hero.jsx                 # Section hero avec vidéo de fond
│   │   ├── DestinationCard.jsx      # Card individuelle de destination
│   │   ├── DestinationGallery.jsx   # Grille des 3 cards
│   │   ├── DestinationDetail.jsx    # Modale de détail
│   │   ├── Quiz.jsx                 # Quiz de recommandation 4 questions
│   │   ├── BookingForm.jsx          # Formulaire de réservation
│   │   ├── Chatbot.jsx              # Widget chatbot IA flottant
│   │   └── Footer.jsx              # Pied de page
│   ├── data/
│   │   └── destinations.js          # Données centralisées des 3 destinations
│   ├── lib/
│   │   └── mistral.js               # Client API Mistral (system prompt + appel)
│   ├── App.jsx                      # Composant racine, gestion des états globaux
│   ├── main.jsx                     # Point d'entrée React
│   └── index.css                    # Styles globaux + Tailwind
├── .env.example                     # Template de configuration (à copier en .env)
├── .gitignore                       # node_modules, dist, .env exclus
├── index.html                       # Page HTML principale
├── package.json                     # Dépendances et scripts
├── tailwind.config.js               # Tokens de design (couleurs, polices)
├── vite.config.js                   # Configuration Vite
└── postcss.config.js                # PostCSS pour Tailwind
```

---

## ⚙️ Configuration

### Clé API Mistral (obligatoire pour le chatbot)

1. Créer un compte gratuit sur [console.mistral.ai](https://console.mistral.ai)
2. Aller dans **API Keys** → **Create new key**
3. Copier la clé générée
4. Créer un fichier `.env` à la racine du projet (copie de `.env.example`) :

```env
VITE_MISTRAL_API_KEY=ta_cle_api_ici
```

> ⚠️ Le fichier `.env` est listé dans `.gitignore` — il ne sera jamais publié sur GitHub. Ne jamais mettre la clé directement dans le code source.

---

## 🚀 Installation & Lancement

### Prérequis communs
- **Node.js** version 18 ou supérieure
- **npm** (inclus avec Node.js)
- Une clé API Mistral (voir section Configuration)

---

### 🐧 Sur Ubuntu / Debian (Linux)

#### 1. Installer Node.js via NodeSource (recommandé)

```bash
# Mettre à jour les paquets
sudo apt update

# Installer curl si ce n'est pas déjà fait
sudo apt install -y curl

# Ajouter le dépôt NodeSource (Node.js LTS v22)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# Installer Node.js et npm
sudo apt install -y nodejs

# Vérifier l'installation
node -v    # doit afficher v22.x.x
npm -v     # doit afficher 10.x.x
```

#### 2. Cloner ou décompresser le projet

**Option A — Depuis une archive zip :**
```bash
# Décompresser l'archive
unzip timetravel-webapp.zip

# Aller dans le dossier du projet
cd timetravel-webapp
```

**Option B — Depuis GitHub (si le repo est en ligne) :**
```bash
git clone https://github.com/ton-utilisateur/timetravel-webapp.git
cd timetravel-webapp
```

#### 3. Configurer la clé API

```bash
# Copier le fichier template
cp .env.example .env

# Éditer le fichier avec nano (ou vim, gedit...)
nano .env
```

Remplacer `ta_cle_api_ici` par ta vraie clé Mistral, puis `Ctrl+O` pour sauvegarder, `Ctrl+X` pour quitter.

#### 4. Installer les dépendances

```bash
npm install
```

#### 5. Lancer le serveur de développement

```bash
npm run dev
```

Le terminal affiche une URL du type `http://localhost:5173/` — ouvrir dans le navigateur.

#### 6. Build de production (optionnel, pour déploiement manuel)

```bash
npm run build
# Les fichiers générés se trouvent dans le dossier dist/
```

---

### 🪟 Sur Windows

#### 1. Installer Node.js

1. Aller sur [nodejs.org](https://nodejs.org)
2. Télécharger la version **LTS** (`.msi`)
3. Lancer l'installateur et suivre les étapes (options par défaut)
4. **Redémarrer le terminal** après l'installation

#### 2. Autoriser l'exécution de scripts PowerShell

Par défaut, Windows bloque les scripts npm dans PowerShell. Ouvrir **PowerShell en tant qu'administrateur** (clic droit sur le menu Démarrer → Terminal administrateur) et exécuter :

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Taper `O` pour confirmer. Fermer ce terminal admin.

#### 3. Vérifier l'installation

Ouvrir un nouveau terminal (PowerShell ou cmd) :

```powershell
node -v    # doit afficher v22.x.x
npm -v     # doit afficher 10.x.x
```

#### 4. Décompresser le projet

Clic droit sur `timetravel-webapp.zip` → **Extraire tout…** → choisir un dossier (ex. `Documents\timetravel-webapp`)

#### 5. Ouvrir un terminal dans le dossier du projet

Dans l'Explorateur Windows, naviguer jusqu'au dossier `timetravel-webapp`, puis cliquer dans la **barre d'adresse**, taper `cmd` ou `powershell` et appuyer sur `Entrée`.

#### 6. Configurer la clé API

Créer un fichier `.env` à la racine du projet. **Attention aux extensions cachées sur Windows** :

```powershell
# Dans le terminal, créer le fichier .env directement
echo VITE_MISTRAL_API_KEY=ta_cle_api_ici > .env
```

Ou avec le Bloc-notes :
- Ouvrir le Bloc-notes
- Saisir `VITE_MISTRAL_API_KEY=ta_cle_api_ici`
- Fichier → Enregistrer sous → choisir "Tous les fichiers" dans "Type", nommer le fichier `.env` (pas `.env.txt`)

#### 7. Installer les dépendances

```powershell
npm install
```

#### 8. Lancer le serveur de développement

```powershell
npm run dev
```

Ouvrir `http://localhost:5173/` dans le navigateur.

---

## 🌐 Déploiement sur Vercel

### Option A — Via l'interface Vercel (recommandé)

1. Créer un compte sur [vercel.com](https://vercel.com) (gratuit, connexion GitHub)
2. Pousser le projet sur GitHub :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TimeTravel Agency"
   git branch -M main
   git remote add origin https://github.com/ton-utilisateur/timetravel-webapp.git
   git push -u origin main
   ```
3. Sur Vercel → **New Project** → importer le repo GitHub
4. Dans **Environment Variables**, ajouter :
   - Nom : `VITE_MISTRAL_API_KEY`
   - Valeur : ta clé API Mistral
5. Cliquer **Deploy** — Vercel détecte automatiquement Vite et configure le build

### Option B — Via Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel

# Suivre les instructions (framework : Vite, répertoire : .)
# Configurer la variable d'environnement quand demandé
```

---

## 🎨 Palette de Design

| Nom | Valeur hex | Usage |
|-----|-----------|-------|
| `ink` | `#0B0C10` | Fond principal |
| `charcoal` | `#14151A` | Fond secondaire, cards |
| `gold` | `#C9A227` | Accent principal, CTA, chatbot |
| `cream` | `#F4EFE6` | Texte principal |
| `bronze` | `#8A6D3B` | Accent Crétacé |
| `crimson` | `#7A1F2B` | Accent Florence, erreurs |

**Typographie :**
- Titres : `Playfair Display` (serif élégant)
- Corps : `Inter` (sans-serif lisible)

---

## 📝 Prompts Documentés (Session 2)

### Prompt initial de génération de structure

```
Landing page for luxury time travel agency, hero section with video background,
3 destination cards with images, chatbot widget bottom right, elegant design,
dark mode with gold accents, premium feel. Stack: React + Tailwind + Framer Motion.
Destinations: Paris 1889, Cretaceous -65M years, Florence 1504.
```

### System prompt du chatbot Mistral

```
Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel mais chaleureux, passionné d'histoire, toujours enthousiaste
sans être trop familier, expertise en voyage temporel (fictif mais crédible).
Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — à partir de 4 200 €
- Crétacé -65M (dinosaures, nature préhistorique) — à partir de 6 800 €
- Florence 1504 (Renaissance, art, Michel-Ange) — à partir de 3 900 €
Réponds toujours en français, de façon concise (3-4 phrases max sauf si détails demandés).
```

### Prompts Session 1 — Génération d'images (Leonardo.ai)

```
Paris 1889, World's Fair, Eiffel Tower under construction in the background,
cinematic travel photography, luxury campaign style, golden hour lighting,
professional color grading, shot on medium format camera, depth of field,
National Geographic quality, aspirational mood, Belle Epoque crowd in period
costume, horse carriages, Grand Palais, vibrant but elegant colors, 8K, ultra detailed
```

---

## 🔐 Sécurité

- La clé API Mistral est stockée dans `.env` (jamais dans le code)
- `.env` est listé dans `.gitignore` et n'est donc jamais publié sur GitHub
- Sur Vercel, la clé est configurée via les **Environment Variables** du dashboard (chiffrées)
- Vite expose uniquement les variables préfixées `VITE_` côté client — seule la clé API est exposée, ce qui est acceptable pour un projet pédagogique. En production réelle, les appels API devraient transiter par un backend.

---

## 📄 Licence

Projet pédagogique — M1/M2 Digital & IA — Ynov Campus Paris.
Assets visuels générés par IA (Leonardo.ai, Gemini). Voyages temporels fictifs.
Modèle de langage : Mistral AI (usage pédagogique non-commercial).
