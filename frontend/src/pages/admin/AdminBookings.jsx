import { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiUser, FiFilm } from 'react-icons/fi';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/admin/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Erreur chargement réservations:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.paymentStatus === filter);

    const totalRevenue = bookings
        .filter(b => b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + b.totalAmount, 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-dark-200 flex items-center justify-center text-white">
                Chargement des réservations...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-200 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-primary mb-8">Gestion des Réservations</h1>

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-dark-100 p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Réservations</p>
                                <p className="text-3xl font-bold text-white mt-2">{bookings.length}</p>
                            </div>
                            <div className="bg-blue-600 p-4 rounded-full text-white text-2xl">
                                <FiCalendar />
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-100 p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Payées</p>
                                <p className="text-3xl font-bold text-green-500 mt-2">
                                    {bookings.filter(b => b.paymentStatus === 'paid').length}
                                </p>
                            </div>
                            <div className="bg-green-600 p-4 rounded-full text-white text-2xl">
                                <FiDollarSign />
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-100 p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">En attente</p>
                                <p className="text-3xl font-bold text-yellow-500 mt-2">
                                    {bookings.filter(b => b.paymentStatus === 'pending').length}
                                </p>
                            </div>
                            <div className="bg-yellow-600 p-4 rounded-full text-white text-2xl">
                                <FiClock />
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-100 p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Revenus Totaux</p>
                                <p className="text-3xl font-bold text-primary mt-2">{totalRevenue} DH</p>
                            </div>
                            <div className="bg-primary p-4 rounded-full text-white text-2xl">
                                <FiDollarSign />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtres */}
                <div className="bg-dark-100 p-6 rounded-xl mb-6">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg transition ${filter === 'all' ? 'bg-primary text-white' : 'bg-dark-200 text-gray-400'
                                }`}
                        >
                            Toutes ({bookings.length})
                        </button>
                        <button
                            onClick={() => setFilter('paid')}
                            className={`px-4 py-2 rounded-lg transition ${filter === 'paid' ? 'bg-green-600 text-white' : 'bg-dark-200 text-gray-400'
                                }`}
                        >
                            Payées ({bookings.filter(b => b.paymentStatus === 'paid').length})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-lg transition ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-dark-200 text-gray-400'
                                }`}
                        >
                            En attente ({bookings.filter(b => b.paymentStatus === 'pending').length})
                        </button>
                    </div>
                </div>

                {/* Tableau des réservations */}
                <div className="bg-dark-100 rounded-xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-dark-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">ID</th>
                                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Client</th>
                                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Film</th>
                                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Date & Heure</th>
                                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Sièges</th>
                                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Salle</th>
                                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Montant</th>
                                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                            Aucune réservation trouvée
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-dark-200/50 transition">
                                            <td className="px-6 py-4 text-gray-400 text-sm font-mono">
                                                {booking.bookingId}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/20 p-2 rounded-full">
                                                        <FiUser className="text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-semibold">{booking.user?.fullName || 'N/A'}</p>
                                                        <p className="text-gray-500 text-sm">{booking.user?.email || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={booking.posterImage.startsWith('http')
                                                            ? booking.posterImage
                                                            : `http://localhost:5000${booking.posterImage}`}
                                                        alt={booking.movieTitle}
                                                        className="w-12 h-16 object-cover rounded"
                                                    />
                                                    <div>
                                                        <p className="text-white font-semibold">{booking.movieTitle}</p>
                                                        <div className="flex gap-2 mt-1">
                                                            {booking.seats.map((seat, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className={`text-xs px-2 py-1 rounded ${seat.type === 'Recliner'
                                                                            ? 'bg-blue-600 text-white'
                                                                            : 'bg-gray-600 text-white'
                                                                        }`}
                                                                >
                                                                    {seat.row}{seat.number}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <FiCalendar className="text-primary" />
                                                    {new Date(booking.showtime.date).toLocaleDateString('fr-FR')}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-300 mt-1">
                                                    <FiClock className="text-primary" />
                                                    {booking.showtime.time}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">
                                                {booking.seats.length} siège(s)
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <FiMapPin className="text-primary" />
                                                    {booking.auditorium}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-2xl font-bold text-primary">{booking.totalAmount} DH</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.paymentStatus === 'paid'
                                                            ? 'bg-green-600/20 text-green-500'
                                                            : 'bg-yellow-600/20 text-yellow-500'
                                                        }`}
                                                >
                                                    {booking.paymentStatus === 'paid' ? 'Payée' : 'En attente'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBookings;