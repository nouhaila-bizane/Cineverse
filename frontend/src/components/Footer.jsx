import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="py-20 px-4 bg-black/90 border-t border-white/10 backdrop-blur-xl relative z-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo et description */}
                    <div className="md:col-span-1">
                        <h3 className="text-3xl font-bold mb-4"
                            style={{
                                background: 'linear-gradient(135deg, #E50914 0%, #ff006e 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                            CineVerse
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Vivez l'expérience cinématographique ultime avec CineVerse. Réservez vos places en ligne et profitez de nos salles équipées des dernières technologies.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E50914] transition-colors text-xl">
                                <FiFacebook />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E50914] transition-colors text-xl">
                                <FiTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E50914] transition-colors text-xl">
                                <FiInstagram />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E50914] transition-colors text-xl">
                                <FiYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Liens Rapides */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Accueil</Link></li>
                            <li><Link to="/movies" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Films à l'affiche</Link></li>
                            <li><Link to="/releases" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Prochainement</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Contact</Link></li>
                            <li><Link to="/my-tickets" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Mes Tickets</Link></li>
                        </ul>
                    </div>

                    {/* Genres */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Genres</h4>
                        <ul className="space-y-2">
                            <li><Link to="/movies?category=Action" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Action</Link></li>
                            <li><Link to="/movies?category=Comedy" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Comédie</Link></li>
                            <li><Link to="/movies?category=Horror" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Horreur</Link></li>
                            <li><Link to="/movies?category=Adventure" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Aventure</Link></li>
                            <li><Link to="/movies?category=Drama" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Drame</Link></li>
                            <li><Link to="/movies?category=Thriller" className="text-gray-400 hover:text-[#E50914] transition-colors text-sm">Thriller</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contactez-nous</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <FiMapPin className="text-[#E50914] mt-0.5 flex-shrink-0" />
                                <span>Av. Al Mouqaouama<br />Gueliz, Marrakech 40000<br />Maroc</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiPhone className="text-[#E50914] flex-shrink-0" />
                                <span>+212 509 876 543</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiMail className="text-[#E50914] flex-shrink-0" />
                                <span>contact@cineverse.ma</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2026 CineVerse. Tous droits réservés.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-gray-500 hover:text-[#E50914] transition-colors">Politique de confidentialité</a>
                        <a href="#" className="text-gray-500 hover:text-[#E50914] transition-colors">Conditions d'utilisation</a>
                        <a href="#" className="text-gray-500 hover:text-[#E50914] transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;