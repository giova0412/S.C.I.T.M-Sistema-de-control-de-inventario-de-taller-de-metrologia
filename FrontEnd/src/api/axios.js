import axios from 'axios';

// Configuración base de axios
const api = axios.create({
    baseURL: 'http://localhost:3001/api',
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