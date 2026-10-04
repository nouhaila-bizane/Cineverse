import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiSave, FiFilm } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici tu pourrais appeler ton API pour mettre à jour
        toast.success('Profil mis à jour avec succès !');
        setIsEditing(false);
    };

    // Historique fictif pour la démo
    const pastBookings = [
        { id: 1, movie: 'Avatar: Fire and Ash', date: '15 Juil 2026', seats: 'A4, A5', status: 'Terminé' },
        { id: 2, movie: 'Oppenheimer', date: '02 Août 2026', seats: 'B12', status: 'Terminé' },
        { id: 3, movie: 'Dune: Part Three', date: '20 Sept 2026', seats: 'C1, C2, C3', status: 'À venir' },
    ];

    return (
        <div className="min-h-screen bg-dark-200 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Mon <span className="text-[#E50914]">Profil</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Carte Infos Utilisateur */}
                    <div className="bg-dark-100 p-8 rounded-2xl border border-gray-800 h-fit">
                        <div className="text-center mb-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#E50914] to-red-900 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-white font-bold shadow-lg">
                                {user?.fullName?.charAt(0) || 'U'}
                            </div>
                            <h2 className="text-2xl font-bold text-white">{user?.fullName || 'Utilisateur'}</h2>
                            <p className="text-gray-400 text-sm mt-1">
                                {user?.isAdmin ? 'Administrateur' : 'Membre CineVerse'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-gray-400 text-sm mb-1 block">Nom complet</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-3.5 text-gray-500" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full bg-dark-200 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white disabled:opacity-50 focus:border-[#E50914] focus:outline-none transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-400 text-sm mb-1 block">Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-3.5 text-gray-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full bg-dark-200 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white disabled:opacity-50 focus:border-[#E50914] focus:outline-none transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-400 text-sm mb-1 block">Téléphone</label>
                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-3.5 text-gray-500" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full bg-dark-200 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white disabled:opacity-50 focus:border-[#E50914] focus:outline-none transition"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsEditing(!isEditing)}
                                className="w-full flex items-center justify-center gap-2 bg-dark-200 hover:bg-dark-300 text-white py-3 rounded-lg transition border border-gray-700"
                            >
                                <FiEdit2 /> {isEditing ? 'Annuler' : 'Modifier'}
                            </button>

                            {isEditing && (
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-[#E50914] hover:bg-red-700 text-white py-3 rounded-lg transition font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)]"
                                >
                                    <FiSave /> Enregistrer
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Historique des réservations */}
                    <div className="lg:col-span-2 bg-dark-100 p-8 rounded-2xl border border-gray-800">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <FiFilm className="text-[#E50914]" /> Mes Réservations
                        </h3>

                        {pastBookings.length === 0 ? (
                            <p className="text-gray-400 text-center py-10">Aucune réservation pour le moment.</p>
                        ) : (
                            <div className="space-y-4">
                                {pastBookings.map((booking) => (
                                    <div key={booking.id} className="bg-dark-200 p-5 rounded-xl border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#E50914] transition">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{booking.movie}</h4>
                                            <div className="flex items-center gap-4 text-gray-400 text-sm mt-1">
                                                <span className="flex items-center gap-1"><FiCalendar /> {booking.date}</span>
                                                <span>Sièges: {booking.seats}</span>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${booking.status === 'À venir'
                                                ? 'bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30'
                                                : 'bg-gray-700/50 text-gray-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;