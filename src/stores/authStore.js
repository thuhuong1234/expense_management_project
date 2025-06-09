import { defineStore } from "pinia";
import axios from "@/configs/axios.js";
import Cookies from "js-cookie";

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
      this.token = token || null;

      const expirationDate = new Date();
      expirationDate.setDate(
        expirationDate.getDate() +
          Number(import.meta.env.VITE_COOKIE_EXPIRATION)
      );

      Cookies.set("access_token", token, {
        secure: true,
        sameSite: "Strict",
        expires: expirationDate,
      });
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
      Cookies.remove("access_token");
    },
    checkAuth() {
      const token = Cookies.get("access_token");
      if (token) {
        this.isLoggedIn = true;
        this.token = token;
      }
    },
    async getUser() {
      const response = await axios.get("auth/user");
      this.user = response.data;
      return response.data;
    },
  },
});
