const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const User = require('../models/User');
const adminAuth = require('../middleware/auth');

// GET - Dashboard Stats
router.get('/stats', adminAuth, async (req, res) => {
    try {
        const totalMovies = await Movie.countDocuments();
        const totalUsers = await User.countDocuments({ isAdmin: false });
        const totalBookings = await Booking.countDocuments();

        const earnings = await Booking.aggregate([
            { $match: { paymentStatus: 'paid' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        const recentBookings = await Booking.find()
            .populate('user', 'fullName email')
            .populate('movie', 'title')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalMovies,
            totalUsers,
            totalBookings,
            totalEarnings: earnings[0]?.total || 0,
            recentBookings
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// GET - Toutes les réservations (admin)
router.get('/bookings', adminAuth, async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'fullName email')
            .populate('movie', 'title')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// GET - Tous les utilisateurs (admin)
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// GET - Earnings par jour (pour graphique)
router.get('/earnings', adminAuth, async (req, res) => {
    try {
        const earnings = await Booking.aggregate([
            { $match: { paymentStatus: 'paid' } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    total: { $sum: '$totalAmount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(earnings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

module.exports = router;