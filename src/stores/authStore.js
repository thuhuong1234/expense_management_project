import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    token: null,
    user: null,
  }),
  getters: {
    userName: (state) => state.user?.name || "Guest",
    isAdmin: (state) => state.user?.isAdmin || false,
  },
  actions: {
    login(userData, token) {
      this.isLoggedIn = true;
      this.user = userData;
      this.token = token;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
    },
  },
});
