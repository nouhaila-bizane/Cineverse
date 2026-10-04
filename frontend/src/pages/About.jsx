import { useState, useEffect } from 'react'; // ✅ AJOUTÉ
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiFilm, FiAward, FiUsers, FiHeart, FiStar, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import api from '../services/api'; // ✅ AJOUTÉ

const About = () => {
    // ✅ AJOUTÉ : État pour stocker les films "Prochainement"
    const [comingSoonMovies, setComingSoonMovies] = useState([]);

    // ✅ AJOUTÉ : Récupérer les films depuis le backend au chargement de la page
    useEffect(() => {
        const fetchComingSoon = async () => {
            try {
                // On demande au backend uniquement les films de type "ComingSoon"
                const response = await api.get('/movies?type=ComingSoon');
                setComingSoonMovies(response.data);
            } catch (error) {
                console.error('Erreur chargement films à venir:', error);
            }
        };
        fetchComingSoon();
    }, []);

    const stats = [
        { icon: <FiFilm />, number: '24+', label: 'Films disponibles' },
        { icon: <FiUsers />, number: '15K+', label: 'Clients satisfaits' },
        { icon: <FiAward />, number: '8', label: 'Salles premium' },
        { icon: <FiHeart />, number: '98%', label: 'Satisfaction' },
    ];

    const values = [
        {
            icon: <FiStar className="text-3xl" />,
            title: 'Excellence',
            desc: 'Nous offrons une expérience cinématographique de classe mondiale avec les dernières technologies de projection et de son.',
            color: '#E50914'
        },
        {
            icon: <FiHeart className="text-3xl" />,
            title: 'Passion',
            desc: 'Notre équipe est composée de passionnés de cinéma qui partagent votre amour pour le 7ème art.',
            color: '#ff006e'
        },
        {
            icon: <FiUsers className="text-3xl" />,
            title: 'Communauté',
            desc: 'CineVerse est plus qu\'un cinéma, c\'est un lieu de rencontre pour tous les amoureux du cinéma.',
            color: '#8338ec'
        },
    ];

    const team = [
        { name: 'Karim El Fassi', role: 'Directeur Général', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
        { name: 'Sara Benali', role: 'Directrice Programmation', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
        { name: 'Youssef Amrani', role: 'Responsable Technique', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
        { name: 'Leila Tazi', role: 'Responsable Communication', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
    ];

    return (
        <div className="min-h-screen bg-black"> {/* ✅ Changé bg-dark-200 en bg-black */}
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/20 via-black to-gray-900" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920')] bg-cover bg-center opacity-20" />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-7xl font-black mb-6"
                    >
                        <span className="bg-gradient-to-r from-[#E50914] to-[#ff006e] bg-clip-text text-transparent">
                            À propos de CineVerse
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl text-gray-300"
                    >
                        L'expérience cinématographique ultime au cœur de Marrakech
                    </motion.p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-4 bg-gray-900"> {/* ✅ Changé bg-dark-100 en bg-gray-900 */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="text-center p-6 bg-black rounded-xl border border-gray-800"
                            >
                                <div className="text-[#E50914] text-4xl mb-3 flex justify-center">{stat.icon}</div>
                                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ✅ NOUVELLE SECTION : Bientôt à l'affiche (Prochainement) */}
            {comingSoonMovies.length > 0 && (
                <section className="py-20 px-4 bg-black">
                    <div className="max-w-7xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
                        >
                            Bientôt à l'<span className="text-[#E50914]">Affiche</span>
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {comingSoonMovies.slice(0, 3).map((movie, index) => (
                                <motion.div
                                    key={movie._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#E50914] transition-all group"
                                >
                                    <div className="relative h-96">
                                        <img
                                            src={movie.posterImage?.startsWith('http')
                                                ? movie.posterImage
                                                : 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse'}
                                            alt={movie.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse'; }}
                                        />
                                        <div className="absolute top-4 right-4 bg-[#E50914] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            BIENTÔT
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">{movie.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Notre Histoire */}
            <section className="py-20 px-4 bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Notre <span className="text-[#E50914]">Histoire</span>
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-4">
                                Fondé en 2020, CineVerse est né d'une passion pour le cinéma et d'une volonté de révolutionner l'expérience de sortie au cinéma au Maroc.
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Situé au cœur de Gueliz à Marrakech, notre cinéma dispose de 8 salles équipées des dernières technologies : projection 4K laser, son Dolby Atmos, et sièges recliner en cuir pour un confort absolu.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Notre mission est simple : offrir à chaque spectateur une expérience immersive et mémorable, qu'il s'agisse d'un blockbuster hollywoodien ou d'un film indépendant marocain.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1517604931442-7e0c1ed21321?w=800"
                                alt="CineVerse Cinema"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-[#E50914] text-white p-6 rounded-xl shadow-xl">
                                <div className="text-3xl font-bold">5+</div>
                                <div className="text-sm">Années d'expérience</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Nos Valeurs */}
            <section className="py-20 px-4 bg-black">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
                    >
                        Nos <span className="text-[#E50914]">Valeurs</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-[#E50914] transition-all group"
                            >
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform"
                                    style={{ background: `linear-gradient(135deg, ${value.color}, transparent)` }}
                                >
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Équipe */}
            <section className="py-20 px-4 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
                    >
                        Notre <span className="text-[#E50914]">Équipe</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
                    >
                        Une équipe passionnée et dévouée à votre expérience cinématographique
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="bg-black rounded-2xl overflow-hidden border border-gray-800 hover:border-[#E50914] transition-all group"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                    <p className="text-[#E50914] text-sm">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 px-4 bg-gradient-to-br from-[#E50914]/20 to-black">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Venez nous rendre visite
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-300 text-lg mb-8"
                    >
                        Nous serions ravis de vous accueillir dans l'une de nos salles premium
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <FiMapPin className="text-[#E50914] text-3xl mx-auto mb-3" />
                            <h3 className="text-white font-semibold mb-2">Adresse</h3>
                            <p className="text-gray-400 text-sm">Av. Al Mouqaouama<br />Gueliz, Marrakech 40000</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <FiPhone className="text-[#E50914] text-3xl mx-auto mb-3" />
                            <h3 className="text-white font-semibold mb-2">Téléphone</h3>
                            <p className="text-gray-400 text-sm">+212 509 876 543</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <FiMail className="text-[#E50914] text-3xl mx-auto mb-3" />
                            <h3 className="text-white font-semibold mb-2">Email</h3>
                            <p className="text-gray-400 text-sm">contact@cineverse.ma</p>
                        </div>
                    </div>

                    <Link
                        to="/contact"
                        className="inline-block bg-[#E50914] hover:bg-red-700 text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(229,9,20,0.4)]"
                    >
                        Nous Contacter
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;