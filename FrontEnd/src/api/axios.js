import axios from 'axios';

// Detectar si estamos en Electron
const isElectron = Boolean(window && window.process && window.process.type);

// Configuración base de axios
const api = axios.create({
    baseURL: isElectron
        ? 'http://localhost:3001/api' // En Electron, el backend local
        : process.env.REACT_APP_API_URL || 'http://localhost:3001/api', // En web, variable de entorno o localhost
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error en la petición:', error);
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error del servidor:', error.response.data);
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error('Error de conexión:', error.request);
        } else {
            // Algo pasó al configurar la petición
            console.error('Error de configuración:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api; 