import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FiClock, FiStar, FiCalendar, FiMapPin, FiArrowLeft } from 'react-icons/fi';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        try {
            const response = await api.get(`/movies/${id}`);
            setMovie(response.data);

            // Sélectionner la première date par défaut
            if (response.data.showtimes && response.data.showtimes.length > 0) {
                setSelectedDate(response.data.showtimes[0].date);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du film:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = (time) => {
        navigate(`/seat-selection/${id}`, {
            state: {
                movieId: id,
                date: selectedDate,
                time: time,
                movieTitle: movie.title,
                posterImage: movie.posterImage,
                auditorium: movie.auditorium,
                standardPrice: movie.standardSeatPrice,
                reclinerPrice: movie.reclinerSeatPrice
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dark-200 flex items-center justify-center">
                <div className="text-white text-2xl">Chargement...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-dark-200 flex items-center justify-center">
                <div className="text-white text-2xl">Film non trouvé</div>
            </div>
        );
    }

    // Grouper les showtimes par date
    const showtimesByDate = movie.showtimes?.reduce((acc, showtime) => {
        const date = showtime.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(showtime.time);
        return acc;
    }, {}) || {};

    const dates = Object.keys(showtimesByDate).sort();

    return (
        <div className="min-h-screen bg-dark-200">
            {/* Hero Section avec backdrop */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-dark-200 via-dark-200/80 to-transparent z-10" />
                <img
                    src={movie.posterImage.startsWith('http') ? movie.posterImage : `http://localhost:5000${movie.posterImage}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />

                {/* Bouton retour */}
                <Link
                    to="/movies"
                    className="absolute top-20 left-8 z-20 flex items-center space-x-2 text-white hover:text-primary transition"
                >
                    <FiArrowLeft className="text-2xl" />
                    <span>Retour</span>
                </Link>
            </div>

            {/* Contenu principal */}
            <div className="max-w-7xl mx-auto px-4 -mt-40 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Colonne gauche : Affiche */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24">
                            <img
                                src={movie.posterImage.startsWith('http') ? movie.posterImage : `http://localhost:5000${movie.posterImage}`}
                                alt={movie.title}
                                className="w-full rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Colonne droite : Infos */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Titre */}
                        <h1 className="text-5xl font-bold text-white">{movie.title}</h1>

                        {/* Méta infos */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-300">
                            {movie.rating > 0 && (
                                <div className="flex items-center space-x-2">
                                    <FiStar className="text-yellow-500 text-xl" />
                                    <span className="text-xl font-semibold">{movie.rating}/10</span>
                                </div>
                            )}

                            {movie.duration && (
                                <div className="flex items-center space-x-2">
                                    <FiClock className="text-xl" />
                                    <span>{movie.duration.hours}h {movie.duration.minutes}min</span>
                                </div>
                            )}

                            <div className="flex items-center space-x-2">
                                <FiMapPin className="text-xl" />
                                <span>{movie.auditorium}</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {movie.categories.map((cat, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-dark-100 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
                            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                        </div>

                        {/* Prix */}
                        <div className="bg-dark-100 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-white mb-4">Tarifs</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Standard</span>
                                    <span className="text-2xl font-bold text-primary">{movie.standardSeatPrice} DH</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Recliner</span>
                                    <span className="text-2xl font-bold text-primary">{movie.reclinerSeatPrice} DH</span>
                                </div>
                            </div>
                        </div>

                        {/* Sélection de date et horaires */}
                        {dates.length > 0 && (
                            <div className="bg-dark-100 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-white mb-4">Horaires de projection</h3>

                                {/* Dates */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {dates.map((date) => (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={`px-4 py-2 rounded-lg transition ${selectedDate === date
                                                    ? 'bg-primary text-white'
                                                    : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                                                }`}
                                        >
                                            <FiCalendar className="inline mr-2" />
                                            {new Date(date).toLocaleDateString('fr-FR', {
                                                weekday: 'short',
                                                day: 'numeric',
                                                month: 'short'
                                            })}
                                        </button>
                                    ))}
                                </div>

                                {/* Horaires */}
                                {selectedDate && showtimesByDate[selectedDate] && (
                                    <div className="flex flex-wrap gap-3">
                                        {showtimesByDate[selectedDate].map((time, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleBookNow(time)}
                                                className="px-6 py-3 bg-dark-200 hover:bg-primary text-white rounded-lg transition font-semibold"
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;