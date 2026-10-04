const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Movie = require('./models/Movie');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        // ⚠️ IMPORTANT : On ne supprime RIEN pour protéger tes films Cloudinary
        console.log('🛡️ Protection des données activée - Aucune suppression effectuée');

        // 1. Gérer l'Admin (Reset ou Création)
        const existingAdmin = await User.findOne({ email: 'admin@cineverse.com' });

        if (existingAdmin) {
            // Si l'admin existe, on reset juste son mot de passe
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.updateOne(
                { email: 'admin@cineverse.com' },
                { $set: { password: hashedPassword } }
            );
            console.log('✅ Mot de passe admin réinitialisé à "admin123"');
        } else {
            // Si l'admin n'existe pas, on le crée
            await User.create({
                fullName: 'Admin CineVerse',
                username: 'admin',
                email: 'admin@cineverse.com',
                phoneNumber: '+1234567890',
                dateOfBirth: '2000-01-01',
                password: 'admin123', // Sera haché automatiquement par le modèle User si tu as un pre-save hook
                isAdmin: true
            });
            console.log(' Compte admin créé avec succès');
        }

        // ⚠️ NOTE : J'ai retiré la création automatique des films ici 
        // car ils contiennent des chemins locaux (/uploads/posters/...) 
        // qui casseraient ton déploiement Render.
        // Ajoute tes films via le Dashboard Admin en utilisant Cloudinary !

        console.log('\n🎉 Script terminé avec succès !');
        console.log('📧 Email: admin@cineverse.com');
        console.log(' Mot de passe: admin123');
        process.exit();
    } catch (error) {
        console.error('❌ Erreur lors du seed:', error);
        process.exit(1);
    }
};

seedData();