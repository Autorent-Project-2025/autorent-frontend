import { defineStore } from "pinia";
import type { User, Credentials } from "@/types/Auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    login({ email }: Credentials) {
      this.user = {
        id: 1,
        name: "Demo User",
        email,
      };
      this.token = "fake-jwt-token";

      localStorage.setItem("auth", JSON.stringify({
        user: this.user,
        token: this.token,
      }));
    },

    register({ email }: Credentials) {
      // fake register = fake login
      this.login({ email, password: "" });
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("auth");
    },

    restore() {
      const saved = localStorage.getItem("auth");
      if (!saved) return;

      const parsed = JSON.parse(saved);
      this.user = parsed.user;
      this.token = parsed.token;
    },
  },
});