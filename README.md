# 🎬 CineVerse - Plateforme de Réservation Cinéma 3D

> Une expérience cinématographique immersive avec animation 3D, gestion complète des réservations et dashboard administrateur.

## ✨ Fonctionnalités Clés
- **Animation 3D Interactive** : Spirale de films en Three.js avec effets post-processing.
- **Catalogue Dynamique** : Filtrage par genre, recherche en temps réel.
- **Système de Réservation** : Sélection des sièges, simulation de paiement, QR Code.
- **Dashboard Admin** : Statistiques, gestion des films, upload d'images.
- **Design Responsive** : Interface moderne, animations fluides.

## 🛠️ Stack Technique
- **Frontend** : React, Vite, Three.js, Tailwind CSS, Framer Motion
- **Backend** : Node.js, Express, Mongoose, JWT
- **Base de données** : MongoDB Atlas
- **Services** : Cloudinary (hébergement d'images)

## 🚀 Installation Locale

```bash
# 1. Cloner le projet
git clone https://github.com/nouhaila-bizane/Cineverse.git
cd Cineverse

# 2. Installer les dépendances
cd frontend && npm install
cd ../backend && npm install

# 3. Configurer le fichier .env dans le dossier backend
# (Ajouter : MONGO_URI, JWT_SECRET, CLOUDINARY_URL)

# 4. Lancer les serveurs
# Terminal 1 : cd backend && node server.js
# Terminal 2 : cd frontend && npm run dev

## 📸 Captures d'écran

###  Page d'accueil 3D
![Page d'accueil](https://raw.githubusercontent.com/nouhaila-bizane/Cineverse/main/screenshots/01-homepage-3d.png)

### 🎬 Catalogue de films
![Catalogue](https://raw.githubusercontent.com/nouhaila-bizane/Cineverse/main/screenshots/02-catalogue-films.png)

### 📊 Dashboard Admin
![Dashboard](https://raw.githubusercontent.com/nouhaila-bizane/Cineverse/main/screenshots/03-dashboard-admin.png)

### ℹ️ Page À propos
![À propos](https://raw.githubusercontent.com/nouhaila-bizane/Cineverse/main/screenshots/04-about-prochainement.png)


## 👤 Auteur
Développé par **NOUHAILA BIZANE** pour mon portfolio .