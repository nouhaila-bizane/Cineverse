import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FiCalendar, FiClock, FiFilm, FiBell } from 'react-icons/fi';

const Releases = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComingSoonMovies();
    }, []);

    const fetchComingSoonMovies = async () => {
        try {
            const response = await api.get('/movies?type=ComingSoon');
            setMovies(response.data);
        } catch (error) {
            console.error('Erreur chargement films:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dark-200 flex items-center justify-center">
                <div className="text-white text-xl">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-200 py-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-primary mb-4">Prochainement</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Découvrez les films qui arriveront bientôt dans nos salles.
                        Soyez les premiers à réserver vos places !
                    </p>
                </div>

                {/* Liste des films */}
                {movies.length === 0 ? (
                    <div className="text-center py-20">
                        <FiFilm className="mx-auto text-6xl text-gray-600 mb-4" />
                        <p className="text-gray-400 text-xl">Aucun film à venir pour le moment</p>
                        <Link to="/movies" className="text-primary hover:underline mt-4 inline-block">
                            Voir les films à l'affiche
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {movies.map((movie) => (
                            <div
                                key={movie._id}
                                className="bg-dark-100 rounded-2xl shadow-2xl overflow-hidden hover:shadow-primary/20 transition-all duration-300 group"
                            >
                                {/* Affiche */}
                                <div className="relative h-96 overflow-hidden">
                                    <img
                                        src={movie.posterImage.startsWith('http')
                                            ? movie.posterImage
                                            : `http://localhost:5000${movie.posterImage}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent" />

                                    {/* Badge "Prochainement" */}
                                    <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                        Bientôt
                                    </div>

                                    {/* Note */}
                                    {movie.rating > 0 && (
                                        <div className="absolute top-4 left-4 bg-dark-200/90 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                            ⭐ {movie.rating}
                                        </div>
                                    )}
                                </div>

                                {/* Contenu */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition">
                                        {movie.title}
                                    </h3>

                                    {/* Catégories */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {movie.categories.map((cat, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold"
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {movie.description}
                                    </p>

                                    {/* Infos */}
                                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                                        {movie.duration && (
                                            <div className="flex items-center gap-1">
                                                <FiClock />
                                                {movie.duration.hours}h{movie.duration.minutes}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <FiFilm />
                                            {movie.auditorium}
                                        </div>
                                    </div>

                                    {/* Date de sortie */}
                                    {movie.showtimes && movie.showtimes.length > 0 && (
                                        <div className="bg-dark-200 p-4 rounded-lg mb-4">
                                            <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                                                <FiCalendar />
                                                Date de sortie
                                            </div>
                                            <p className="text-white">
                                                {new Date(movie.showtimes[0].date).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    )}

                                    {/* Boutons */}
                                    <div className="flex gap-3">
                                        <Link
                                            to={`/movie/${movie._id}`}
                                            className="flex-1 bg-primary hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition text-center"
                                        >
                                            Voir les détails
                                        </Link>
                                        <button
                                            className="bg-dark-200 hover:bg-dark-300 text-white p-3 rounded-lg transition"
                                            title="Être notifié"
                                        >
                                            <FiBell />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Releases;