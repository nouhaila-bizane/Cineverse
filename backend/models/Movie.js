const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    posterImage: {
        type: String,
        required: true
    },
    categories: [{
        type: String,
        enum: ['Action', 'Horror', 'Comedy', 'Adventure', 'Drama', 'Thriller']
    }],
    type: {
        type: String,
        enum: ['Normal', 'Featured', 'ComingSoon', 'LatestTrailers'],
        default: 'Normal'
    },
    standardSeatPrice: {
        type: Number,
        required: true
    },
    reclinerSeatPrice: {
        type: Number,
        required: true
    },
    auditorium: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    duration: {
        hours: Number,
        minutes: Number
    },
    description: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    cast: [{
        name: String,
        photo: String,
        role: String
    }],
    director: [{
        name: String,
        photo: String
    }],
    producer: [{
        name: String,
        photo: String
    }],
    showtimes: [{
        date: Date,
        time: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);