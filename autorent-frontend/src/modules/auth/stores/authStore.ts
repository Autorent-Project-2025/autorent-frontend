import { defineStore } from "pinia";
import { login as apiLogin } from "@/app/api/auth";

interface User {
  id: number;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    tokenTimestamp: Number(localStorage.getItem("tokenTimestamp")) || 0,
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,

    isTokenExpired: (state) => {
      if (!state.token || !state.tokenTimestamp) return true;

      const expiryHours = parseInt(
        import.meta.env.VITE_TOKEN_EXPIRY_HOURS || "3",
        10
      );

      const expiryMs = expiryHours * 60 * 60 * 1000;
      const elapsed = Date.now() - state.tokenTimestamp;

      return elapsed >= expiryMs;
    },
  },

  actions: {
    async login(email: string, password: string) {
      const token = await apiLogin(email, password);

      this.token = token;
      this.tokenTimestamp = Date.now();

      localStorage.setItem("token", token);
      localStorage.setItem(
        "tokenTimestamp",
        this.tokenTimestamp.toString()
      );
    },

    logout() {
      this.token = "";
      this.tokenTimestamp = 0;
      this.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("user");
    },

    checkTokenValidity() {
      if (this.isTokenExpired) {
        this.logout();
        return false;
      }
      return true;
    },
  },
});