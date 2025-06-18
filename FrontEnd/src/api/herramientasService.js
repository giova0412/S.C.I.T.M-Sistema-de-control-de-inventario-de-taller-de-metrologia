import api from './axios.js';

export const herramientasService = {
    // Obtener todas las herramientas
    getAll: async () => {
        try {
            const response = await api.get('/inventario');
            return response.data.data.herramientas;
        } catch (error) {
            console.error('Error al obtener herramientas:', error);
            throw error;
        }
    },

    // Obtener una herramienta por ID
    getOne: async (id) => {
        try {
            const response = await api.get(`/inventario/${id}`);
            return response.data.data.herramienta;
        } catch (error) {
            console.error('Error al obtener herramienta:', error);
            throw error;
        }
    },

    // Crear una nueva herramienta
    create: async (herramientaData) => {
        try {
            const formData = new FormData();
            
            // Agregar datos de la herramienta
            Object.keys(herramientaData).forEach(key => {
                if (key !== 'imagen') {
                    formData.append(key, herramientaData[key]);
                }
            });
            
            // Agregar imagen si existe
            if (herramientaData.imagen) {
                formData.append('imagen', herramientaData.imagen);
            }

            const response = await api.post('/inventario', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear herramienta:', error);
            throw error;
        }
    },

    // Actualizar una herramienta
    update: async (id, herramientaData) => {
        try {
            const response = await api.put(`/inventario/${id}`, herramientaData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar herramienta:', error);
            throw error;
        }
    },

    // Actualizar imagen de una herramienta
    updateImage: async (id, imagen) => {
        try {
            const formData = new FormData();
            formData.append('imagen', imagen);

            const response = await api.put(`/inventario/${id}/imagen`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar imagen:', error);
            throw error;
        }
    },

    // Eliminar una herramienta
    delete: async (id) => {
        try {
            const response = await api.delete(`/inventario/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar herramienta:', error);
            throw error;
        }
    },

    // Actualizar estado de calibración
    updateCalibracion: async (id, calibracionData) => {
        try {
            const response = await api.put(`/inventario/calibracion/${id}`, calibracionData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar calibración:', error);
            throw error;
        }
    },

    // Descargar PDF individual de herramienta
    downloadPDF: async (id) => {
        try {
            const response = await api.get(`/inventario/pdf/${id}`, {
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error al descargar PDF de herramienta:', error);
            throw error;
        }
    }
}; 