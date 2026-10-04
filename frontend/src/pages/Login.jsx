import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../config';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            toast.success('Connexion réussie !');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur de connexion');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-200 px-4">
            <div className="bg-dark-100 p-8 rounded-lg shadow-2xl w-full max-w-md border border-red-600">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">
                    Cinema Access
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300"
                    >
                        Access Your Account
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline">
                        Create one now
                    </Link>
                </p>

                <Link
                    to="/"
                    className="flex items-center text-gray-400 hover:text-white mt-6"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Login;