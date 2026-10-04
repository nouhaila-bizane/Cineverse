import axios from 'axios';

// Utilisation de la variable d'environnement VITE_API_URL pour le déploiement
// Fallback sur localhost:5000 pour le développement local
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;