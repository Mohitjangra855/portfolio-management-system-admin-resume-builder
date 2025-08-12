import { authApi } from "@/services/api";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    setError(error) {
      this.error = error;
    },
    setUser(user) {
      this.user = user;
      this.isAuthenticated = !!user;
    },
    async login(credentials) {
      this.setLoading(true);
      try {
        const loginData = {
          email: credentials.email || credentials.username, // Handle both email and username
          password: credentials.password
        };
        
        console.log('Sending login data:', loginData);
        const response = await authApi.login(loginData);
        console.log('data of response when login',response)
        if (response?.success && response?.user) {
          this.setUser(response.user);
          this.error = null;
          return response;
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        console.error("Login failed:", error);
        this.setError(error.message || "Login failed");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async logout() {
      this.setLoading(true);
      try {
        // Backend logout API call (clears httpOnly cookies)
        await authApi.logout();
        
        // Clear all local auth state
        this.setUser(null);
        this.isAuthenticated = false;
        this.error = null;
        
        console.log("Logout successful - auth state cleared");
        return { success: true };
      } catch (error) {
        console.error("Logout failed:", error);
        this.setError(error.message || "Logout failed");
        
        // Even if API fails, clear local state
        this.setUser(null);
        this.isAuthenticated = false;
        
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async checkAuth() {
      this.setLoading(true);
      try {
        const response = await authApi.checkAuth();
        if (response?.success && response?.user) {
          this.setUser(response.user);
        } else {
          this.setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        this.setUser(null);
      } finally {
        this.setLoading(false);
      }
    },
  },
  persist: true,
});
