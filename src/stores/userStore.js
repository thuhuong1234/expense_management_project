import { defineStore } from "pinia";
import axios from "@/configs/axios.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async getUsers() {
      const response = await axios.get("/users");
      this.user = response.data;
      return response.data;
    },
    async getUserById(id) {
      const response = await axios.get(`/users/${id}`);
      this.user = response.data;
      return response.data;
    },
  },
  getters: {},
});
