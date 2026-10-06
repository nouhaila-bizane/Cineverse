const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://nohaadmin:nUAHilaa4456OP@cineverse-cluster.77svw9x.mongodb.net/?appName=CineVerse-Cluster';

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connecté à MongoDB');

        const newUser = new User({
            email: 'admin@cineverse.com',
            username: 'admin',
            fullName: 'Admin CineVerse',
            password: await bcrypt.hash('Admin1234!', 10),
            phoneNumber: '+212 600 000 000',
            dateOfBirth: '2000-01-01',
            role: 'admin',
            isAdmin: true
        });

        await newUser.save();
        console.log('🎉 Compte admin créé avec succès !');
        console.log('📧 Email: admin@cineverse.com');
        console.log('🔑 Mot de passe: Admin1234!');

        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
}

createAdmin();