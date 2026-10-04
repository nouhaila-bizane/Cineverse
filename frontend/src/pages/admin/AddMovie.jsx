import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        categories: [],
        standardSeatPrice: 0,
        reclinerSeatPrice: 0,
        auditorium: 'Audi 1',
        rating: 0,
        durationHours: 0,
        durationMinutes: 0,
        description: '',
        type: 'Normal', // ✅ AJOUTÉ : Type du film par défaut
        showtimes: [{ date: '', time: '' }]
    });
    const [posterFile, setPosterFile] = useState(null);

    // ✅ MODIFIÉ : Catégories mises à jour (Drama et Thriller retirés, Sci-Fi et Animation ajoutés)
    const categoriesList = ['Action', 'Comedy', 'Horror', 'Adventure'];

    const handleCategoryChange = (cat) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    const handleShowtimeChange = (index, field, value) => {
        const newShowtimes = [...formData.showtimes];
        newShowtimes[index][field] = value;
        setFormData({ ...formData, showtimes: newShowtimes });
    };

    const addShowtime = () => {
        setFormData({ ...formData, showtimes: [...formData.showtimes, { date: '', time: '' }] });
    };

    const removeShowtime = (index) => {
        const newShowtimes = formData.showtimes.filter((_, i) => i !== index);
        setFormData({ ...formData, showtimes: newShowtimes });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('categories', JSON.stringify(formData.categories));
            data.append('standardSeatPrice', formData.standardSeatPrice);
            data.append('reclinerSeatPrice', formData.reclinerSeatPrice);
            data.append('auditorium', formData.auditorium);
            data.append('rating', formData.rating);
            data.append('description', formData.description);
            data.append('showtimes', JSON.stringify(formData.showtimes));
            data.append('durationHours', formData.durationHours);
            data.append('durationMinutes', formData.durationMinutes);
            data.append('type', formData.type); // ✅ AJOUTÉ : Envoi du type au backend

            if (posterFile) {
                data.append('posterImage', posterFile);
            }

            console.log('📤 Envoi des données...');

            const response = await api.post('/movies', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('✅ Réponse:', response.data);
            toast.success('Film ajouté avec succès !');
            navigate('/admin');
        } catch (error) {
            console.error('❌ Erreur:', error.response?.data || error);
            toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout du film');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black p-8"> {/* ✅ Changé bg-dark-200 en bg-black */}
            <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800"> {/* ✅ Changé bg-dark-100 en bg-gray-900 */}
                <h1 className="text-3xl font-bold text-[#E50914] mb-8">Ajouter un Nouveau Film</h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Titre et Affiche */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Titre du Film</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Affiche (Image)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setPosterFile(e.target.files[0])}
                                className="w-full p-3 bg-black border border-gray-700 rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-[#E50914] file:hover:bg-red-700 file:cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* ✅ NOUVEAU : Choix du Type de film */}
                    <div>
                        <label className="block text-gray-300 mb-2">Type de diffusion</label>
                        <select
                            className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="Normal">Normal (À l'affiche)</option>
                            <option value="Featured">À la une (Featured)</option>
                            <option value="ComingSoon">Prochainement (Bientôt à l'affiche)</option>
                        </select>
                    </div>

                    {/* Catégories */}
                    <div>
                        <label className="block text-gray-300 mb-2">Catégories</label>
                        <div className="flex flex-wrap gap-3">
                            {categoriesList.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`px-4 py-2 rounded-full transition ${formData.categories.includes(cat)
                                        ? 'bg-[#E50914] text-white'
                                        : 'bg-black text-gray-400 border border-gray-700 hover:border-[#E50914]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Prix et Salle */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Prix Standard (DH)</label>
                            <input
                                type="number"
                                required
                                className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                                value={formData.standardSeatPrice}
                                onChange={e => setFormData({ ...formData, standardSeatPrice: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Prix Recliner (DH)</label>
                            <input
                                type="number"
                                required
                                className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                                value={formData.reclinerSeatPrice}
                                onChange={e => setFormData({ ...formData, reclinerSeatPrice: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Auditorium</label>
                            <select
                                className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                                value={formData.auditorium}
                                onChange={e => setFormData({ ...formData, auditorium: e.target.value })}
                            >
                                <option>Audi 1</option>
                                <option>Audi 2</option>
                                <option>Audi 3</option>
                                <option>IMAX</option>
                                <option>IMAX 3D</option>
                            </select>
                        </div>
                    </div>

                    {/* Note et Durée */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Note (/10)</label>
                            <input
                                type="number"
                                step="0.1"
                                max="10"
                                className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                                value={formData.rating}
                                onChange={e => setFormData({ ...formData, rating: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Durée (Heures)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                                    value={formData.durationHours}
                                    onChange={e => setFormData({ ...formData, durationHours: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Durée (Minutes)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                                    value={formData.durationMinutes}
                                    onChange={e => setFormData({ ...formData, durationMinutes: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-300 mb-2">Synopsis</label>
                        <textarea
                            rows="4"
                            required
                            className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Showtimes */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-300">Horaires de projection</label>
                            <button type="button" onClick={addShowtime} className="text-[#E50914] hover:text-red-400 text-sm font-semibold">+ Ajouter un horaire</button>
                        </div>
                        {formData.showtimes.map((showtime, index) => (
                            <div key={index} className="flex gap-4 mb-2">
                                <input
                                    type="date"
                                    className="flex-1 p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                                    value={showtime.date}
                                    onChange={e => handleShowtimeChange(index, 'date', e.target.value)}
                                />
                                <input
                                    type="time"
                                    className="flex-1 p-3 bg-black border border-gray-700 rounded text-white focus:border-[#E50914] focus:outline-none"
                                    value={showtime.time}
                                    onChange={e => handleShowtimeChange(index, 'time', e.target.value)}
                                />
                                <button type="button" onClick={() => removeShowtime(index)} className="text-red-500 hover:text-red-400 px-3 font-bold">✕</button>
                            </div>
                        ))}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#E50914] hover:bg-red-700 text-white font-bold py-4 rounded-lg transition disabled:bg-gray-700 shadow-lg shadow-red-900/20"
                    >
                        {loading ? 'Ajout en cours...' : 'Ajouter le Film'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMovie;