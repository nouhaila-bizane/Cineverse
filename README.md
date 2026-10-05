# 🎬 CineVerse - Application Web de Réservation de Cinéma

![Status](https://img.shields.io/badge/Status-🟢_En_ligne-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

> **Plateforme immersive de réservation de places de cinéma avec visualisation 3D des salles.**

---

## 🌐 Liens de démonstration

- 🌐 **Site en ligne (Frontend)** : [cineverse-noha20.vercel.app](https://cineverse-noha20.vercel.app)
- ⚙️ **API Backend** : [cineverse-backend-frzj.onrender.com](https://cineverse-backend-frzj.onrender.com)
- 💻 **Code Source** : [GitHub/nouhaila-bizane/Cineverse](https://github.com/nouhaila-bizane/Cineverse)

---

## 🔑 Compte de démonstration

Pour tester toutes les fonctionnalités (espace admin, ajout de films, réservation) :
- **Email** : `admin@cineverse.com`
- **Mot de passe** : `Admin1234!`

*(Tu peux aussi créer ton propre compte via la page d'inscription).*

---

## ✨ Fonctionnalités

**Pour les utilisateurs :**
- 🏠 Page d'accueil immersive avec visualisation 3D (Three.js)
- 🎬 Catalogue de films avec filtres par catégorie
- 🎟️ Système de réservation de places interactif
- 👤 Inscription et connexion sécurisée (JWT)
- 📱 Interface responsive (mobile, tablette, desktop)

**Pour les administrateurs :**
- 📊 Tableau de bord admin complet
- ➕ Ajout, modification et suppression de films
- 🖼️ Upload d'affiches via Cloudinary (ou URL externe)
- 🔐 Protection des routes admin

---

## 🛠️ Technologies utilisées

- **Frontend** : React.js, Vite, Three.js, Tailwind CSS, Axios
- **Backend** : Node.js, Express.js, MongoDB, JWT, Multer
- **Déploiement** : Vercel (Frontend), Render (Backend), MongoDB Atlas, Cloudinary

---

## 📁 Structure du projet

- **backend/** : Contient le serveur Node.js, les routes API, les modèles MongoDB et la configuration.
- **frontend/** : Contient l'application React, les composants 3D, les pages et les services API.
- **README.md** : Ce fichier de documentation.

---

## 🚀 Installation en local

1. Cloner le dépôt : `git clone https://github.com/nouhaila-bizane/Cineverse.git`
2. Installer le backend : Aller dans le dossier `backend`, lancer `npm install`, créer un fichier `.env` avec les variables (MONGODB_URI, JWT_SECRET, etc.), puis lancer `npm start`.
3. Installer le frontend : Aller dans le dossier `frontend`, lancer `npm install`, puis lancer `npm run dev`.

---

## 📸 Captures d'écran

###  Page d'accueil 3D
![Page d'accueil](https://raw.githubusercontent.com/nouhaila-bizane/Cineverse/main/screenshots/01-homepage-3d.png)

### 🎬 Catalogue de films
![Catalogue](https://raw.githubusercontent.com/nouhaila-bizane/Cineverse/main/screenshots/02-catalogue-films.png)

### 📊 Dashboard Admin
![Dashboard](https://raw.githubusercontent.com/nouhaila-bizane/Cineverse/main/screenshots/03-dashboard-admin.png)

### ℹ️ Page À propos
![À propos](https://raw.githubusercontent.com/nouhaila-bizane/Cineverse/main/screenshots/04-about-prochainement.png)

## 🛡️ Note technique

Le backend est hébergé sur Render (plan gratuit). Le tout premier chargement de l'API peut prendre ~30 secondes (cold start) si le serveur est en veille. Les requêtes suivantes sont instantanées grâce au monitoring UptimeRobot.

---

## 👩‍💻 Développeuse

**Nouhaila Bizane**
- 📧 Email : nohaahon04@gmail.com
- 🐙 GitHub : [nouhaila-bizane](https://github.com/nouhaila-bizane)

---
<div align="center">
  <strong>Fait avec ❤️ par Nouhaila Bizane</strong>
</div>
