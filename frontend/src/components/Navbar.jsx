import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiFilm, FiLogOut, FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="bg-dark-200/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <FiFilm className="text-[#E50914] text-3xl group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-2xl font-bold text-white group-hover:text-[#E50914] transition-colors duration-300">
                                CineVerse
                            </span>
                        </Link>
                    </div>

                    {/* Barre de recherche (Desktop) */}
                    <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                        <form onSubmit={handleSearch} className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher un film..."
                                className="w-full bg-dark-100 border border-gray-700 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition"
                            />
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        </form>
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-white hover:text-[#E50914] transition font-medium">Accueil</Link>
                        <Link to="/movies" className="text-white hover:text-[#E50914] transition font-medium">Films</Link>
                        <Link to="/rooms" className="text-white hover:text-[#E50914] transition font-medium">Nos Salles</Link>
                        <Link to="/about" className="text-white hover:text-[#E50914] transition font-medium">À propos</Link>
                        <Link to="/contact" className="text-white hover:text-[#E50914] transition font-medium">Contact</Link>

                        {user ? (
                            <div className="flex items-center space-x-4 border-l border-gray-700 pl-6">
                                <Link to="/profile" className="text-white hover:text-[#E50914] transition flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#E50914] flex items-center justify-center text-sm font-bold">
                                        {user.fullName?.charAt(0) || 'U'}
                                    </div>
                                </Link>
                                {user.isAdmin && (
                                    <Link to="/admin" className="text-[#E50914] hover:text-red-400 transition font-bold">Admin</Link>
                                )}
                                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition">
                                    <FiLogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-[#E50914] hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all font-semibold shadow-[0_0_15px_rgba(229,9,20,0.3)]">
                                Connexion
                            </Link>
                        )}
                    </div>

                    {/* Menu Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-dark-200 border-t border-gray-700 shadow-xl">
                    <div className="px-4 pt-4 pb-3 space-y-3">
                        {/* Recherche Mobile */}
                        <form onSubmit={handleSearch} className="relative mb-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher un film..."
                                className="w-full bg-dark-100 border border-gray-700 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#E50914]"
                            />
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        </form>

                        <Link to="/" className="block text-white hover:text-[#E50914] py-2" onClick={() => setIsOpen(false)}>Accueil</Link>
                        <Link to="/movies" className="block text-white hover:text-[#E50914] py-2" onClick={() => setIsOpen(false)}>Films</Link>
                        <Link to="/rooms" className="block text-white hover:text-[#E50914] py-2" onClick={() => setIsOpen(false)}>Nos Salles</Link>
                        <Link to="/about" className="block text-white hover:text-[#E50914] py-2" onClick={() => setIsOpen(false)}>À propos</Link>
                        <Link to="/contact" className="block text-white hover:text-[#E50914] py-2" onClick={() => setIsOpen(false)}>Contact</Link>

                        {user ? (
                            <>
                                <Link to="/profile" className="block text-white hover:text-[#E50914] py-2 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                    <FiUser /> Mon Profil
                                </Link>
                                {user.isAdmin && <Link to="/admin" className="block text-[#E50914] font-bold py-2" onClick={() => setIsOpen(false)}>Admin</Link>}
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block text-gray-400 hover:text-white py-2 w-full text-left">Déconnexion</button>
                            </>
                        ) : (
                            <Link to="/login" className="block bg-[#E50914] text-white text-center py-2 rounded-lg font-semibold" onClick={() => setIsOpen(false)}>Connexion</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;