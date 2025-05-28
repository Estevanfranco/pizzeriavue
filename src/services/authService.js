// src/services/authService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export default {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const token = response.data.token;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }
};
