import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiX, FiCalendar, FiFilm } from 'react-icons/fi';
import { API_ENDPOINTS } from '../config';

const RoomBooking = ({ room }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // États pour le formulaire
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);

    // 1. Vérifier la connexion au clic
    const handleReserveClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Veuillez vous connecter pour réserver une salle');
            navigate('/login');
            return;
        }
        setShowModal(true);
    };

    // 2. Gérer la sélection des sièges (toggle)
    const toggleSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    // 3. Envoyer la réservation au backend
    const handleConfirmBooking = async () => {
        if (!selectedMovie || !selectedDate || selectedSeats.length === 0) {
            toast.error('Veuillez sélectionner un film, une date et au moins un siège');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            // Extraction du prix (ex: "35 DH" -> 35)
            const pricePerSeat = parseInt(room.price.replace(/\D/g, ''));
            const totalPrice = selectedSeats.length * pricePerSeat;

            const response = await fetch(`${API_ENDPOINTS.BOOKINGS}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    roomId: room.id || room._id, // Fonctionne avec ton id statique ou _id de la DB
                    roomName: room.name,
                    movieId: selectedMovie,
                    showtime: selectedDate,
                    seats: selectedSeats,
                    totalPrice
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success(`Réservation confirmée pour ${selectedSeats.length} siège(s) !`);
                setShowModal(false);
                // Réinitialiser le formulaire
                setSelectedMovie('');
                setSelectedDate('');
                setSelectedSeats([]);
                // Optionnel : navigate('/my-bookings');
            } else {
                toast.error(data.message || 'Erreur lors de la réservation');
            }
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Une erreur de connexion est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Bouton principal */}
            <button
                onClick={handleReserveClick}
                className="w-full bg-[#E50914] hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center justify-center gap-2"
            >
                Réserver cette salle
            </button>

            {/* Modale de réservation */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">

                        {/* Bouton fermer */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <FiX size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            Réserver : <span className="text-[#E50914]">{room.name}</span>
                        </h2>
                        <p className="text-gray-400 text-sm mb-6">Prix par siège : {room.price}</p>

                        {/* Sélection du film */}
                        <div className="mb-4">
                            <label className="flex items-center gap-2 text-gray-300 mb-2 text-sm font-medium">
                                <FiFilm className="text-[#E50914]" /> Choisir un film
                            </label>
                            <select
                                value={selectedMovie}
                                onChange={(e) => setSelectedMovie(e.target.value)}
                                className="w-full bg-[#0a0a0a] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#E50914] transition-colors"
                            >
                                <option value="">-- Sélectionnez un film --</option>
                                <option value="movie-1">Dune : Deuxième Partie</option>
                                <option value="movie-2">Oppenheimer</option>
                                <option value="movie-3">Deadpool & Wolverine</option>
                            </select>
                        </div>

                        {/* Sélection de la date */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-gray-300 mb-2 text-sm font-medium">
                                <FiCalendar className="text-[#E50914]" /> Date et heure
                            </label>
                            <input
                                type="datetime-local"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full bg-[#0a0a0a] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#E50914] transition-colors [color-scheme:dark]"
                            />
                        </div>

                        {/* Sélection des sièges (Exemple simplifié de 8 sièges) */}
                        <div className="mb-6">
                            <label className="block text-gray-300 mb-3 text-sm font-medium">
                                Sièges sélectionnés : <span className="text-[#E50914] font-bold">{selectedSeats.length}</span>
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'].map((seat) => (
                                    <button
                                        key={seat}
                                        onClick={() => toggleSeat(seat)}
                                        className={`py-2 rounded-lg text-sm font-bold transition-all ${selectedSeats.includes(seat)
                                            ? 'bg-[#E50914] text-white shadow-[0_0_10px_rgba(229,9,20,0.5)]'
                                            : 'bg-[#0a0a0a] text-gray-400 border border-gray-700 hover:border-gray-500'
                                            }`}
                                    >
                                        {seat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Résumé et Bouton Confirmer */}
                        <div className="border-t border-gray-800 pt-4 mt-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">Total à payer :</span>
                                <span className="text-2xl font-bold text-white">
                                    {selectedSeats.length * parseInt(room.price.replace(/\D/g, ''))} DH
                                </span>
                            </div>

                            <button
                                onClick={handleConfirmBooking}
                                disabled={loading}
                                className="w-full bg-[#E50914] hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Traitement...
                                    </>
                                ) : (
                                    'Confirmer la réservation'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RoomBooking;