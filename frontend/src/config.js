// Configuration centralisée de l'API pour le déploiement
export const API_URL = import.meta.env.VITE_API_URL || 'https://cineverse-backend.onrender.com';

export const API_ENDPOINTS = {
    AUTH: `${API_URL}/api/auth`,
    MOVIES: `${API_URL}/api/movies`,
    BOOKINGS: `${API_URL}/api/bookings`,
    ADMIN: `${API_URL}/api/admin`,
};