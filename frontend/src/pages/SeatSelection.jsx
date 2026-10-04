import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiMonitor } from 'react-icons/fi';

const SeatSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Récupérer les données passées depuis la page MovieDetail
    const {
        movieId, date, time, movieTitle, posterImage,
        auditorium, standardPrice, reclinerPrice
    } = location.state || {};

    // Configuration de la salle (5 rangées, 8 sièges par rangée)
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const seatsPerRow = 8;

    // État pour les sièges sélectionnés
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Fonction pour gérer le clic sur un siège
    const toggleSeat = (row, number, type) => {
        const seatId = `${row}${number}`;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    // Calculer le prix total
    const calculateTotal = () => {
        let total = 0;
        selectedSeats.forEach(seat => {
            const row = seat.charAt(0);
            if (['D', 'E'].includes(row)) {
                total += reclinerPrice;
            } else {
                total += standardPrice;
            }
        });
        return total;
    };

    const handleConfirm = () => {
        if (selectedSeats.length === 0) {
            alert('Veuillez sélectionner au moins un siège !');
            return;
        }

        // Naviguer vers la page de paiement
        navigate('/payment', {
            state: {
                movieId,
                movieTitle,
                posterImage,
                date,
                time,
                auditorium,
                seats: selectedSeats,
                totalAmount: calculateTotal(),
                standardPrice,
                reclinerPrice
            }
        });
    };

    if (!movieTitle) {
        return (
            <div className="min-h-screen bg-dark-200 flex items-center justify-center text-white">
                Aucune information de film trouvée. <Link to="/movies" className="text-primary ml-2">Retour</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-200 py-8 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to={`/movie/${movieId}`} className="flex items-center text-gray-400 hover:text-white transition">
                        <FiArrowLeft className="mr-2 text-xl" /> Retour
                    </Link>
                    <h1 className="text-2xl font-bold text-white">{movieTitle}</h1>
                    <div className="text-gray-400">
                        {new Date(date).toLocaleDateString('fr-FR')} • {time}
                    </div>
                </div>

                {/* Écran incurvé (Visualisation) */}
                <div className="flex flex-col items-center mb-12">
                    <div className="w-3/4 h-2 bg-primary rounded-full shadow-[0_10px_30px_-5px_rgba(229,9,20,0.5)] mb-2" />
                    <div className="text-gray-400 text-sm flex items-center">
                        <FiMonitor className="mr-2" /> ÉCRAN
                    </div>
                </div>

                {/* Grille des sièges */}
                <div className="bg-dark-100 p-8 rounded-2xl shadow-2xl mb-8">
                    <h2 className="text-center text-xl font-semibold text-white mb-8">Sélectionnez vos sièges</h2>

                    <div className="flex flex-col space-y-4">
                        {rows.map((row) => (
                            <div key={row} className="flex items-center justify-center space-x-2 md:space-x-4">
                                {/* Lettre de la rangée à gauche */}
                                <span className="text-primary font-bold w-6 text-center">{row}</span>

                                {/* Sièges */}
                                {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((seatNum) => {
                                    const seatId = `${row}${seatNum}`;
                                    const isRecliner = ['D', 'E'].includes(row);
                                    const isSelected = selectedSeats.includes(seatId);

                                    return (
                                        <button
                                            key={seatId}
                                            onClick={() => toggleSeat(row, seatNum, isRecliner ? 'Recliner' : 'Standard')}
                                            className={`
                        w-8 h-8 md:w-10 md:h-10 rounded-t-lg rounded-b-sm text-xs font-semibold transition-all duration-200
                        ${isSelected
                                                    ? 'bg-green-500 text-white shadow-lg scale-110'
                                                    : isRecliner
                                                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                                                        : 'bg-gray-600 text-white hover:bg-gray-500'
                                                }
                      `}
                                            title={`${seatId} - ${isRecliner ? 'Recliner' : 'Standard'}`}
                                        >
                                            {seatNum}
                                        </button>
                                    );
                                })}

                                {/* Lettre de la rangée à droite */}
                                <span className="text-primary font-bold w-6 text-center">{row}</span>
                            </div>
                        ))}
                    </div>

                    {/* Légende */}
                    <div className="flex justify-center gap-6 mt-10 text-sm text-gray-400">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-gray-600 rounded-t-lg rounded-b-sm mr-2" /> Standard
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-blue-600 rounded-t-lg rounded-b-sm mr-2" /> Recliner
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-green-500 rounded-t-lg rounded-b-sm mr-2" /> Sélectionné
                        </div>
                    </div>
                </div>

                {/* Résumé de la réservation */}
                <div className="bg-dark-100 p-6 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                            🎟️ Résumé de la réservation
                        </h3>
                        <div className="space-y-2 text-gray-300">
                            <p><span className="text-gray-500">Film :</span> {movieTitle}</p>
                            <p><span className="text-gray-500">Salle :</span> {auditorium}</p>
                            <p><span className="text-gray-500">Date :</span> {new Date(date).toLocaleDateString('fr-FR')} à {time}</p>
                            <p>
                                <span className="text-gray-500">Sièges :</span>
                                <span className="ml-2 text-white font-semibold">
                                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Aucun'}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="border-t md:border-t-0 md:border-l border-gray-700 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                💰 Informations tarifaires
                            </h3>
                            <div className="space-y-2 text-gray-300">
                                <div className="flex justify-between">
                                    <span>Standard</span>
                                    <span className="text-primary font-bold">{standardPrice} DH</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Recliner</span>
                                    <span className="text-primary font-bold">{reclinerPrice} DH</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl text-gray-300">Total :</span>
                                <span className="text-3xl font-bold text-primary">{calculateTotal()} DH</span>
                            </div>

                            <button
                                onClick={handleConfirm}
                                disabled={selectedSeats.length === 0}
                                className={`
                  w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                  ${selectedSeats.length > 0
                                        ? 'bg-primary hover:bg-red-700 text-white shadow-lg shadow-red-900/50'
                                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    }
                `}
                            >
                                Confirmer la réservation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;