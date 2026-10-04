import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import api from '../services/api';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    const searchQuery = searchParams.get('search') || '';
    const categoryFromUrl = searchParams.get('category') || 'all';

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        filterMovies();
    }, [movies, searchQuery, selectedCategory]);

    const fetchMovies = async () => {
        try {
            const response = await api.get('/movies');
            // On garde tous les films ici pour la page catalogue, ou tu peux filtrer les ComingSoon si tu préfères
            const moviesData = response.data;
            setMovies(moviesData);
            setFilteredMovies(moviesData);
        } catch (error) {
            console.error('Erreur chargement films:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterMovies = () => {
        let filtered = movies;

        // Filtre par recherche
        if (searchQuery) {
            filtered = filtered.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filtre par catégorie
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(movie =>
                movie.categories?.includes(selectedCategory)
            );
        }

        setFilteredMovies(filtered);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (category !== 'all') params.category = category;
        setSearchParams(params);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        const params = {};
        if (value) params.search = value;
        if (selectedCategory !== 'all') params.category = selectedCategory;
        setSearchParams(params);
    };

    // ✅ MODIFICATION ICI : Drama et Thriller supprimés. 
    // J'ai ajouté 'Sci-Fi' et 'Animation' car ils correspondent mieux à tes films (Dune, Vaiana, etc.)
    // Tu peux les changer si tu préfères autre chose.
    const categories = ['all', 'Action', 'Comedy', 'Horror', 'Adventure'];

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">Chargement des films...</div>;
    }

    return (
        <div className="min-h-screen bg-black py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header avec recherche */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-white mb-6 text-center">
                        Nos <span className="text-[#E50914]">Films</span>
                    </h1>

                    {/* Barre de recherche */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Rechercher un film par son titre..."
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-full py-4 pl-12 pr-6 text-lg focus:outline-none focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/20 transition-all"
                            />
                            <svg className="absolute left-4 top-4 text-gray-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        const params = {};
                                        if (selectedCategory !== 'all') params.category = selectedCategory;
                                        setSearchParams(params);
                                    }}
                                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <p className="text-gray-400 text-center mt-2">
                                {filteredMovies.length} résultat{filteredMovies.length > 1 ? 's' : ''} pour "{searchQuery}"
                            </p>
                        )}
                    </div>

                    {/* Filtres par catégorie */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${(cat === 'all' && selectedCategory === 'all') || selectedCategory === cat
                                    ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
                                    : 'bg-gray-900 text-gray-400 border border-gray-700 hover:border-[#E50914] hover:text-white'
                                    }`}
                            >
                                {cat === 'all' ? 'Tous les films' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grille des films */}
                {filteredMovies.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🎬</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Aucun film trouvé</h3>
                        <p className="text-gray-400">
                            {searchQuery
                                ? `Aucun film ne correspond à "${searchQuery}"`
                                : 'Aucun film disponible pour le moment'}
                        </p>
                        {(searchQuery || selectedCategory !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchParams({});
                                    setSelectedCategory('all');
                                }}
                                className="mt-4 text-[#E50914] hover:text-red-400 font-semibold"
                            >
                                Réinitialiser les filtres
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredMovies.map((movie, index) => (
                            <motion.div
                                key={movie._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group cursor-pointer"
                            >
                                <Link to={`/movie/${movie._id}`}>
                                    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-900 border border-gray-800 hover:border-[#E50914] transition-all duration-500 hover:shadow-[0_0_30px_rgba(229,9,20,0.3)]">
                                        <div className="relative h-[500px] overflow-hidden">
                                            {/* ✅ SÉCURISATION DE L'IMAGE : Plus de risque de page noire ou d'image cassée */}
                                            <img
                                                src={movie.posterImage && movie.posterImage.startsWith('http')
                                                    ? movie.posterImage
                                                    : 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse'}
                                                alt={movie.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                                            {/* Badge catégorie */}
                                            {movie.categories?.[0] && (
                                                <div className="absolute top-4 left-4 bg-[#E50914] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                    {movie.categories[0]}
                                                </div>
                                            )}

                                            {/* Badge Type (si c'est un ComingSoon) */}
                                            {movie.type === 'ComingSoon' && (
                                                <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-gray-600">
                                                    BIENTÔT
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-2xl font-bold text-white mb-3 line-clamp-1 group-hover:text-[#E50914] transition-colors">
                                                {movie.title}
                                            </h3>

                                            <div className="flex items-center justify-between text-gray-300">
                                                <div className="flex items-center gap-1">
                                                    <FiStar className="text-yellow-500 fill-yellow-500" />
                                                    <span className="font-semibold">{movie.rating || 'N/A'}/10</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>{movie.duration?.hours}h{movie.duration?.minutes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Movies;