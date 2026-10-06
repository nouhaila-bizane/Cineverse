const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const adminAuth = require('../middleware/auth');

// Configuration Multer pour Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cineverse_posters', // Dossier sur Cloudinary
        allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// GET tous les films
router.get('/', async (req, res) => {
    try {
        const { category, type } = req.query;
        let filter = {};

        if (category && category !== 'All Movies') {
            filter.categories = category;
        }
        if (type) {
            filter.type = type;
        }

        const movies = await Movie.find(filter).sort({ createdAt: -1 });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// GET un film par ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Film non trouvé' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// POST - Ajouter un film (OPTIMISÉ POUR CLOUDINARY + URLS EXTERNES)
router.post('/', adminAuth, upload.single('posterImage'), async (req, res) => {
    try {
        const movieData = { ...req.body };

        // 🎯 GESTION INTELLIGENTE DE L'IMAGE :
        if (req.file) {
            // Cas 1 : Fichier uploadé → Envoi automatique vers Cloudinary
            // req.file.path contient déjà l'URL complète https://res.cloudinary.com/...
            movieData.posterImage = req.file.path;
        } else if (req.body.posterImageUrl && req.body.posterImageUrl.trim() !== '') {
            // Cas 2 : URL externe fournie manuellement (Idéal pour Render/Démo)
            movieData.posterImage = req.body.posterImageUrl;
        } else {
            // Cas 3 : Image par défaut sécurisée (évite les erreurs 404)
            movieData.posterImage = 'https://via.placeholder.com/500x750/1a1a1a/E50914?text=CineVerse';
        }

        // Parser les catégories (string JSON → array)
        if (typeof movieData.categories === 'string') {
            try {
                movieData.categories = JSON.parse(movieData.categories);
            } catch (e) {
                movieData.categories = movieData.categories.split(',').map(c => c.trim());
            }
        }

        // Parser les showtimes
        if (typeof movieData.showtimes === 'string') {
            try {
                movieData.showtimes = JSON.parse(movieData.showtimes);
            } catch (e) {
                movieData.showtimes = [];
            }
        }

        // Convertir les prix et la note en nombres
        movieData.standardSeatPrice = Number(movieData.standardSeatPrice) || 0;
        movieData.reclinerSeatPrice = Number(movieData.reclinerSeatPrice) || 0;
        movieData.rating = Number(movieData.rating) || 0;

        // Gérer la durée
        if (movieData.durationHours !== undefined || movieData.durationMinutes !== undefined) {
            movieData.duration = {
                hours: Number(movieData.durationHours) || 0,
                minutes: Number(movieData.durationMinutes) || 0
            };
            delete movieData.durationHours;
            delete movieData.durationMinutes;
        }

        const movie = new Movie(movieData);
        await movie.save();

        res.status(201).json({ message: 'Film ajouté avec succès', movie });
    } catch (error) {
        console.error('❌ Erreur création film:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// PUT - Modifier un film
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            
        );
        if (!movie) {
            return res.status(404).json({ message: 'Film non trouvé' });
        }
        res.json({ message: 'Film mis à jour', movie });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// DELETE - Supprimer un film
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Film non trouvé' });
        }
        res.json({ message: 'Film supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

module.exports = router;