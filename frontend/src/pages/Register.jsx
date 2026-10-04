import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../config';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        password: ''
    });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            toast.success('Compte créé avec succès !');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription');
        }
    };

    return (
        <div className="min-h-screen bg-dark-200 px-4 py-12">
            <div className="max-w-md mx-auto bg-dark-100 p-8 rounded-lg shadow-2xl border border-red-600">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">
                    Join Our Cinema
                </h2>
                <p className="text-center text-gray-400 mb-8 text-sm">
                    Create your account and start your cinematic journey
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-dark-200 border border-gray-700 rounded focus:outline-none focus:border-primary text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Username *</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-dark-200 border border-gray-700 rounded focus:outline-none focus:border-primary text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-dark-200 border border-gray-700 rounded focus:outline-none focus:border-primary text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Phone Number *</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-dark-200 border border-gray-700 rounded focus:outline-none focus:border-primary text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Date of Birth *</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-dark-200 border border-gray-700 rounded focus:outline-none focus:border-primary text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Password *</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-dark-200 border border-gray-700 rounded focus:outline-none focus:border-primary text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg transition mt-6"
                    >
                        Create Cinema Account
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                        Sign in to your account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;