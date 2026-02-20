import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('epanen_token') || null,
    isAuthenticated: false,
    loading: false
  }),

  actions: {
    async checkAuth() {
      if (!this.token) {
        this.isAuthenticated = false;
        return;
      }

      try {
        const response = await axios.get(`${API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        this.user = response.data.data.user;
        this.user.type = response.data.data.type;
        this.isAuthenticated = true;
      } catch (error) {
        this.logout();
      }
    },

    async login(credentials) {
      this.loading = true;
      try {
        const response = await axios.post(`${API_BASE}/auth/login`, credentials);

        const { user, token } = response.data.data;
        this.token = token;
        this.user = user;
        this.isAuthenticated = true;

        localStorage.setItem('epanen_token', token);
        localStorage.setItem('epanen_user', JSON.stringify(user));

        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Login gagal'
        };
      } finally {
        this.loading = false;
      }
    },

    async register(userData) {
      this.loading = true;
      try {
        const response = await axios.post(`${API_BASE}/auth/register`, userData);

        const { user, token } = response.data.data;
        this.token = token;
        this.user = user;
        this.isAuthenticated = true;

        localStorage.setItem('epanen_token', token);
        localStorage.setItem('epanen_user', JSON.stringify(user));

        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Registrasi gagal'
        };
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(userData) {
      try {
        const response = await axios.put(`${API_BASE}/auth/profile`, userData, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        this.user = { ...this.user, ...response.data.data.user };
        localStorage.setItem('epanen_user', JSON.stringify(this.user));

        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Update profile gagal'
        };
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('epanen_token');
      localStorage.removeItem('epanen_user');
    },

    isAdmin() {
      return this.user?.role === 'admin' || this.user?.type === 'admin';
    },

    isUser() {
      return this.user?.role === 'farmer' || this.user?.type === 'user';
    },

    setAuth(user, token) {
      this.user = user;
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem('epanen_token', token);
      localStorage.setItem('epanen_user', JSON.stringify(user));
    }
  }
});
