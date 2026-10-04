import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="min-h-screen bg-dark-200 flex items-center justify-center text-white">Chargement...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !user.isAdmin) {
        return <Navigate to="/" />; // Redirige vers l'accueil si pas admin
    }

    return children;
};

export default ProtectedRoute;