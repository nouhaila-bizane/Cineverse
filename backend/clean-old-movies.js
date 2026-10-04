const mongoose = require('mongoose');
require('dotenv').config();
const Movie = require('./models/Movie');
const connectDB = require('./config/db');

async function cleanOldMovies() {
    try {
        await connectDB();
        console.log('✅ Connecté à la base de données...');

        // Ce script supprime tous les films dont l'image NE VIENT PAS de Cloudinary
        // Ainsi, on garde tes nouveaux films bien uploadés !
        const result = await Movie.deleteMany({
            posterImage: { $not: /^https:\/\/res\.cloudinary\.com/ }
        });

        console.log(`🗑️ ${result.deletedCount} anciens films supprimés avec succès !`);
        console.log('✨ Tes nouveaux films sont toujours là.');

        process.exit();
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

cleanOldMovies();