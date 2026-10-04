import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiMessageCircle, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Créer le message WhatsApp
        const whatsappMessage = `
*Nouveau message de contact*

👤 Nom: ${formData.fullName}
📧 Email: ${formData.email}
📱 Téléphone: ${formData.phoneNumber}
📋 Sujet: ${formData.subject}

💬 Message:
${formData.message}
    `.trim();

        // Encoder pour l'URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Numéro WhatsApp de l'entreprise
        const whatsappNumber = '212612345678';

        // Ouvrir WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        toast.success('Redirection vers WhatsApp...');

        // Reset form
        setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-dark-200 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-primary mb-4">Contactez-nous</h1>
                    <p className="text-gray-400 text-lg">
                        Des questions sur vos réservations ou nos événements ? Notre équipe est là pour vous aider.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Formulaire de contact */}
                    <div className="bg-dark-100 p-8 rounded-2xl shadow-2xl">
                        <div className="flex items-center mb-6">
                            <FiMessageCircle className="text-primary text-2xl mr-3" />
                            <h2 className="text-2xl font-bold text-white">Envoyez-nous un message</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 mb-2">Nom complet *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                                        placeholder="Votre nom"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 mb-2">Téléphone *</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                                        placeholder="+212 600 000 000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Sujet *</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                                    >
                                        <option value="">Sélectionnez un sujet</option>
                                        <option value="Réservation">Réservation</option>
                                        <option value="Événements de groupe">Événements de groupe</option>
                                        <option value="Demande d'information">Demande d'information</option>
                                        <option value="Problème technique">Problème technique</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                                    placeholder="Décrivez votre demande en détail..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
                            >
                                <FiSend />
                                Envoyer via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* Informations de contact */}
                    <div className="space-y-6">
                        <div className="bg-dark-100 p-8 rounded-2xl shadow-2xl">
                            <div className="flex items-center mb-6">
                                <FiMail className="text-primary text-2xl mr-3" />
                                <h2 className="text-2xl font-bold text-white">Informations de contact</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-lg">
                                        <FiPhone className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Réservations</h3>
                                        <p className="text-gray-400">+212 509 876 543</p>
                                        <p className="text-gray-500 text-sm">Disponible 24h/24</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-lg">
                                        <FiMail className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Email</h3>
                                        <p className="text-gray-400">contact@cineverse.ma</p>
                                        <p className="text-gray-500 text-sm">Réponse sous 24h</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-lg">
                                        <FiMapPin className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Adresse principale</h3>
                                        <p className="text-gray-400">Av. Al Mouqaouama</p>
                                        <p className="text-gray-400">Gueliz, Marrakech 40000, Maroc</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-primary/10 border border-primary/30 rounded-lg">
                                <h3 className="text-white font-semibold mb-2">🎬 Urgences pendant les séances</h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    Pour les problèmes urgents pendant une projection (son, image, projection, etc.)
                                </p>
                                <p className="text-primary font-bold">HOTLINE: +212 512 345 678</p>
                            </div>
                        </div>

                        {/* Google Maps - CORRIGÉ POUR REACT */}
                        <div className="bg-dark-100 p-8 rounded-2xl shadow-2xl">
                            <h3 className="text-white font-semibold mb-4">Nous trouver</h3>

                            <div className="rounded-lg overflow-hidden shadow-lg mb-4">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13588.23453009175!2d-8.023238195586062!3d31.63224498660339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d931f3209%3A0x96ce34d39325c762!2sGueliz%2C%20Marrakesh%2040000!5e0!3m2!1sen!2sma!4v1783339772417!5m2!1sen!2sma"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localisation CineVerse Marrakech"
                                ></iframe>
                            </div>

                            <div className="space-y-2">
                                <p className="text-white font-semibold">🎬 CineVerse Cinema Marrakech</p>
                                <p className="text-gray-400 text-sm">
                                    📍 Av. Al Mouqaouama<br />
                                    Gueliz, Marrakech 40000<br />
                                    Maroc
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;