// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export default {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const token = response.data.token;
    const user = response.data.user;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete axios.defaults.headers.common['Authorization'];
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  setAuthHeader() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};
