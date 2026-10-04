const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

console.log("🚨 🚨 🚨 LE FICHIER bookings.js EST BIEN CHARGÉ ! 🚨 🚨 🚨");

// ⚠️ TEMPORAIRE : on retire 'auth' pour voir si c'est lui qui fait planter le serveur
router.post('/create', async (req, res) => {
    console.log("🔥 🔥 🔥 LA REQUÊTE /create EST ARRIVÉE ! 🔥 🔥 🔥");
    console.log("📦 Body reçu :", JSON.stringify(req.body, null, 2));
    console.log("👤 User reçu :", req.user);

    try {
        // On prend l'ID du user, ou on met un ID bidon pour le test si le middleware auth est désactivé
        // ⚠️ REMPLACE CETTE CHAÎNE PAR UN VRAI ID UTILISATEUR DE TA BASE DE DONNÉES SI ÇA ÉCHOUE ENCORE
        const userId = req.user?.id || req.user?._id || "660000000000000000000000";

        const { roomId, roomName, movieId, showtime, seats, totalAmount } = req.body;

        if (!movieId) throw new Error("movieId est manquant dans la requête !");

        const movie = await Movie.findById(movieId);
        if (!movie) throw new Error(`Film introuvable avec l'ID : ${movieId}`);

        const dateStr = showtime?.date ? showtime.date.split('T')[0] : new Date().toISOString().split('T')[0];
        const validShowtime = new Date(`${dateStr}T${showtime?.time || '00:00'}`);

        let validSeats = [];
        if (Array.isArray(seats)) {
            validSeats = seats.map(s => `${s.row}${s.number}`);
        }

        const newBooking = new Booking({
            user: userId,
            room: roomId || roomName || 'Salle',
            movie: movieId,
            movieTitle: movie.title,
            posterImage: movie.posterImage || 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse',
            showtime: validShowtime,
            seats: validSeats,
            totalPrice: Number(totalAmount) || 0,
            status: 'confirmed',
            paymentStatus: 'paid'
        });

        await newBooking.save();
        console.log("✅ ✅ ✅ SUCCÈS : Réservation sauvegardée en base de données ! ✅ ✅ ✅");
        res.status(201).json({ success: true, booking: newBooking });

    } catch (error) {
        console.error("💥 💥 💥 ERREUR BACKEND CAPTURÉE :");
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route pour voir les réservations
router.get('/my-bookings', async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
        const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;