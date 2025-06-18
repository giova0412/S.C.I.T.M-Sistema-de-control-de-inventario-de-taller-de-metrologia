import api from './axios.js';

export const reportesService = {
    // Obtener todos los reportes
    getAll: async () => {
        try {
            const response = await api.get('/reportes/reportesAll');
            return response.data.data.reportes;
        } catch (error) {
            console.error('Error al obtener reportes:', error);
            throw error;
        }
    },

    // Obtener un reporte por ficha de trabajador
    getOne: async (fichaTrabajador) => {
        try {
            const response = await api.get(`/reportes/${fichaTrabajador}`);
            return response.data.data.reporte;
        } catch (error) {
            console.error('Error al obtener reporte:', error);
            throw error;
        }
    },

    // Crear un nuevo reporte
    create: async (reporteData) => {
        try {
            const response = await api.post('/reportes', reporteData);
            return response.data;
        } catch (error) {
            console.error('Error al crear reporte:', error);
            throw error;
        }
    },

    // Actualizar un reporte
    update: async (fichaTrabajador, reporteData) => {
        try {
            const response = await api.put(`/reportes/updateOne/${fichaTrabajador}`, reporteData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar reporte:', error);
            throw error;
        }
    },

    // Eliminar un reporte
    delete: async (fichaTrabajador) => {
        try {
            const response = await api.delete(`/reportes/deleteOne/${fichaTrabajador}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar reporte:', error);
            throw error;
        }
    },

    // Descargar PDF de todos los reportes
    downloadPDF: async () => {
        try {
            const response = await api.get('/reportes/downloadPDF', {
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error al descargar PDF:', error);
            throw error;
        }
    },

    // Descargar PDF de un reporte específico
    downloadOnePDF: async (fichaTrabajador) => {
        try {
            const response = await api.get(`/reportes/downloadPDF/${fichaTrabajador}`, {
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error al descargar PDF individual:', error);
            throw error;
        }
    }
}; 