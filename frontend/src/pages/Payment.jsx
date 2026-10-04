import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiCreditCard, FiLock } from 'react-icons/fi';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        movieId, movieTitle, posterImage, date, time,
        auditorium, seats, totalAmount, standardPrice, reclinerPrice
    } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Préparer les données des sièges
            const seatsData = seats.map(seat => {
                const row = seat.charAt(0);
                const number = parseInt(seat.substring(1));
                const type = ['D', 'E', 'F'].includes(row) ? 'Recliner' : 'Standard'; // Ajuste les rangées si besoin
                const price = ['D', 'E', 'F'].includes(row) ? reclinerPrice : standardPrice;
                return { row, number, type, price };
            });

            // 2. SIMULATION DE PAIEMENT RÉUSSIE
            // On utilise la route /create existante, mais on force le statut à "payé" et "confirmé"
            const response = await api.post('/bookings/create', {
                roomId: auditorium,       // On utilise le nom de la salle comme ID pour simplifier
                roomName: auditorium,
                movieId: movieId,
                showtime: { date, time },
                seats: seatsData,
                totalPrice: totalAmount,
                status: 'confirmed',       // ✅ Simulation : Réservation directement confirmée
                paymentStatus: 'paid'      // ✅ Simulation : Paiement directement validé
            });

            console.log('✅ Réservation simulée créée avec succès:', response.data);
            toast.success('Paiement réussi ! Votre ticket est prêt.');

            // 3. Rediriger vers les tickets après un court délai
            setTimeout(() => {
                navigate('/movies');
            }, 1500);

        } catch (error) {
            console.error('❌ Erreur paiement:', error);
            toast.error(error.response?.data?.message || 'Erreur lors du paiement');
        } finally {
            setLoading(false);
        }
    };

    if (!movieTitle) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="mb-4">Aucune information de réservation.</p>
                    <Link to="/movies" className="text-[#E50914] hover:underline font-semibold">Retour aux films</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-8 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center mb-8">
                    <Link to="/seat-selection" className="flex items-center text-gray-400 hover:text-white transition mr-4">
                        <FiArrowLeft className="mr-2 text-xl" /> Retour
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Paiement</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Colonne gauche : Récapitulatif */}
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-800">
                        <h2 className="text-xl font-semibold text-white mb-6">Récapitulatif</h2>

                        <div className="flex gap-4 mb-6">
                            <img
                                src={posterImage && posterImage.startsWith('http') ? posterImage : 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse'}
                                alt={movieTitle}
                                className="w-24 h-36 object-cover rounded-lg bg-gray-800"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse'; }}
                            />
                            <div>
                                <h3 className="text-lg font-bold text-white">{movieTitle}</h3>
                                <p className="text-gray-400 text-sm mt-1">{auditorium}</p>
                                <p className="text-gray-400 text-sm">
                                    {new Date(date).toLocaleDateString('fr-FR')} à {time}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-300">
                                <span>Sièges ({seats.length})</span>
                                <span className="font-semibold">{seats.join(', ')}</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Standard</span>
                                <span>{standardPrice} DH</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Recliner</span>
                                <span>{reclinerPrice} DH</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 mt-4 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xl text-white font-semibold">Total</span>
                                <span className="text-3xl font-bold text-[#E50914]">{totalAmount} DH</span>
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite : Formulaire de paiement */}
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-800">
                        <div className="flex items-center mb-6">
                            <FiCreditCard className="text-[#E50914] text-2xl mr-2" />
                            <h2 className="text-xl font-semibold text-white">Informations de carte</h2>
                        </div>

                        <form onSubmit={handlePayment} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Numéro de carte</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={cardData.cardNumber}
                                    onChange={handleChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    required
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#E50914] text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Nom du titulaire</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    value={cardData.cardName}
                                    onChange={handleChange}
                                    placeholder="Jean Dupont"
                                    required
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#E50914] text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Date d'expiration</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={cardData.expiry}
                                        onChange={handleChange}
                                        placeholder="MM/AA"
                                        maxLength="5"
                                        required
                                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#E50914] text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={cardData.cvv}
                                        onChange={handleChange}
                                        placeholder="123"
                                        maxLength="3"
                                        required
                                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#E50914] text-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 mt-6
                                    flex items-center justify-center
                                    ${loading
                                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                        : 'bg-[#E50914] hover:bg-red-700 text-white shadow-lg shadow-red-900/50'
                                    }
                                `}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                                        Traitement...
                                    </>
                                ) : (
                                    <>
                                        <FiLock className="mr-2" />
                                        Payer {totalAmount} DH
                                    </>
                                )}
                            </button>

                            <p className="text-center text-gray-500 text-sm mt-4">
                                🔒 Paiement sécurisé (Simulation pour le PFE)
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;