import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    token: null,
    user: null,
    // userId: null,
    // userName: null,
    // isAdmin: false,
    // email: null,
    // avatar: null,
    // phone: null,
    // gender: null,
    // rememberToken: null,
    // createdAt: null,
    // updatedAt: null,
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
      localStorage.setItem("access_token", token);
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem("access_token");
    },
    checkAuth() {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        this.isLoggedIn = true;
        this.token = storedToken;
      }
    },
  },
});
