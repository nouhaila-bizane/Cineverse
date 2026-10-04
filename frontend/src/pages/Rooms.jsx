import { motion } from 'framer-motion';
import { FiUsers, FiCheck } from 'react-icons/fi';
import RoomBooking from '../components/RoomBooking';

const Rooms = () => {
    // J'ai ajouté un 'id' unique à chaque salle pour la base de données
    const rooms = [
        {
            id: 'room-imax-01',
            name: 'Salle IMAX',
            image: '/images/rooms/Salle IMAX.webp',
            capacity: 250,
            features: ['Écran géant 22m', 'Son Dolby Atmos 12.1', 'Projection Laser 4K', 'Sièges inclinables'],
            price: '35 DH',
            color: 'from-red-600 to-red-900'
        },
        {
            id: 'room-4dx-01',
            name: 'Salle 4DX',
            image: '/images/rooms/a.jpg',
            capacity: 120,
            features: ['Sièges en mouvement', 'Effets de vent et eau', 'Odeurs synchronisées', 'Immersion totale'],
            price: '50 DH',
            color: 'from-purple-600 to-purple-900'
        },
        {
            id: 'room-vip-01',
            name: 'Salle VIP Recliner',
            image: '/images/rooms/Salle 4DX.webp',
            capacity: 60,
            features: ['Sièges en cuir électrique', 'Espace jambes XXL', 'Service à la place', 'Couvertures offertes'],
            price: '80 DH',
            color: 'from-yellow-600 to-yellow-900'
        },
        {
            id: 'room-std-01',
            name: 'Salle Standard',
            image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
            capacity: 180,
            features: ['Écran HD 12m', 'Son Surround 7.1', 'Sièges confortables', 'Climatisation optimale'],
            price: '25 DH',
            color: 'from-blue-600 to-blue-900'
        }
    ];

    return (
        <div className="min-h-screen bg-dark-200 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-4"
                    >
                        Nos <span className="text-[#E50914]">Salles</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-xl max-w-2xl mx-auto"
                    >
                        Découvrez nos espaces de projection équipés des dernières technologies pour une expérience inoubliable.
                    </motion.p>
                </div>

                {/* Grid des salles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {rooms.map((room, index) => (
                        <motion.div
                            key={room.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="bg-dark-100 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#E50914] transition-all group shadow-2xl"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${room.color} opacity-40 group-hover:opacity-60 transition-opacity`} />
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold border border-white/20">
                                    À partir de {room.price}
                                </div>
                            </div>

                            {/* Contenu */}
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-3xl font-bold text-white">{room.name}</h3>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <FiUsers />
                                        <span>{room.capacity} places</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {room.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <div className="bg-[#E50914]/20 p-1.5 rounded-full">
                                                <FiCheck className="text-[#E50914]" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* ✅ REMPLACEMENT DU BOUTON PAR LE COMPOSANT FONCTIONNEL */}
                                <RoomBooking room={room} />

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rooms;