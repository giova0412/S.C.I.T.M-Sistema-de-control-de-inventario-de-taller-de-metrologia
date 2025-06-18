import api from './axios';

export const login = async (nombre, password) => {
  return api.post('/auth/login', { nombre, password });
};

export const register = async (nombre, email, password) => {
  return api.post('/auth/register', { nombre, email, password });
};

export const recuperarPassword = async (email) => {
  return api.post('/auth/recuperar', { email });
};

export const resetPassword = async (token, newPassword) => {
  return api.post('/auth/reset-password', { token, newPassword });
}; 