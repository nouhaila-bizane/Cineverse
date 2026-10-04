import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { FiFilm, FiUsers, FiDollarSign, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';


const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalMovies: 0,
        totalUsers: 0,
        totalBookings: 0,
        totalEarnings: 0
    });
    const [loading, setLoading] = useState(true);

    // Données simulées pour les graphiques (PFE Demo)
    const revenueByCategory = [
        { name: 'Action', value: 4500 },
        { name: 'Comédie', value: 2800 },
        { name: 'Horreur', value: 1900 },
        { name: 'Aventure', value: 3200 },
        { name: 'Drame', value: 2400 },
    ];

    const weeklyBookings = [
        { day: 'Lun', reservations: 12 },
        { day: 'Mar', reservations: 19 },
        { day: 'Mer', reservations: 15 },
        { day: 'Jeu', reservations: 25 },
        { day: 'Ven', reservations: 45 },
        { day: 'Sam', reservations: 68 },
        { day: 'Dim', reservations: 52 },
    ];

    const COLORS = ['#E50914', '#ff006e', '#8338ec', '#3a86ff', '#ffd700'];

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Erreur stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-dark-200 flex items-center justify-center text-white text-xl">Chargement du dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-dark-200 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard Administrateur</h1>
                        <p className="text-gray-400">Vue d'ensemble de l'activité de CineVerse</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/admin/add-movie" className="bg-[#E50914] hover:bg-red-700 text-white px-5 py-2.5 rounded-lg transition flex items-center gap-2 font-semibold">
                            <FiFilm /> Ajouter un Film
                        </Link>
                        <Link to="/admin/bookings" className="bg-dark-100 hover:bg-dark-300 text-white px-5 py-2.5 rounded-lg transition flex items-center gap-2 font-semibold border border-gray-700">
                            <FiShoppingBag /> Réservations
                        </Link>
                    </div>
                </div>

                {/* Cartes de statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: 'Total Films', value: stats.totalMovies || 24, icon: <FiFilm />, color: 'bg-blue-600' },
                        { title: 'Utilisateurs', value: stats.totalUsers || 1542, icon: <FiUsers />, color: 'bg-green-600' },
                        { title: 'Réservations', value: stats.totalBookings || 384, icon: <FiShoppingBag />, color: 'bg-purple-600' },
                        { title: 'Revenus Totaux', value: `${stats.totalEarnings || 12450} DH`, icon: <FiDollarSign />, color: 'bg-[#E50914]' },
                    ].map((card, index) => (
                        <div key={index} className="bg-dark-100 p-6 rounded-xl shadow-lg border border-gray-800 flex items-center justify-between hover:border-gray-600 transition">
                            <div>
                                <p className="text-gray-400 text-sm">{card.title}</p>
                                <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                            </div>
                            <div className={`${card.color} p-3 rounded-lg text-white text-2xl shadow-lg`}>
                                {card.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Graphiques */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                    {/* Graphique 1 : Réservations de la semaine */}
                    <div className="bg-dark-100 p-6 rounded-xl shadow-lg border border-gray-800">
                        <div className="flex items-center gap-2 mb-6">
                            <FiTrendingUp className="text-[#E50914] text-xl" />
                            <h2 className="text-xl font-bold text-white">Réservations cette semaine</h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={weeklyBookings}>
                                <defs>
                                    <linearGradient id="colorReservations" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E50914" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="day" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                                    labelStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="reservations" stroke="#E50914" fillOpacity={1} fill="url(#colorReservations)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Graphique 2 : Revenus par catégorie */}
                    <div className="bg-dark-100 p-6 rounded-xl shadow-lg border border-gray-800">
                        <div className="flex items-center gap-2 mb-6">
                            <FiDollarSign className="text-[#E50914] text-xl" />
                            <h2 className="text-xl font-bold text-white">Revenus par Genre (DH)</h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueByCategory}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="value" fill="#E50914" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                {/* Graphique 3 : Répartition en camembert */}
                <div className="bg-dark-100 p-6 rounded-xl shadow-lg border border-gray-800">
                    <h2 className="text-xl font-bold text-white mb-6">Répartition de l'audience par Genre</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={revenueByCategory}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {revenueByCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Légende personnalisée */}
                        <div className="space-y-3">
                            {revenueByCategory.map((entry, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-gray-300 font-medium">{entry.name}</span>
                                    <span className="text-gray-500 text-sm">({entry.value} DH)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;