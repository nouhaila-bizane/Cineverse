const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    movieTitle: String,       // ✅ AJOUTÉ
    posterImage: String,      // ✅ AJOUTÉ
    room: String,
    roomName: String,
    showtime: Date,
    seats: [String],
    totalPrice: Number,
    status: {
        type: String,
        default: 'confirmed'
    },
    paymentStatus: {
        type: String,
        default: 'paid'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);