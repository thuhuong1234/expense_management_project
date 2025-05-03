import { defineStore } from "pinia";
import useCRUD from "@/composables/useCRUD";
const { getAll, getById } = useCRUD();
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async getUsers() {
      const response = await getAll("users");
      this.user = response.data;
      return response.data;
    },
    async getUserById(id) {
      const response = await getById("users", id);
      this.user = response?.data;
      return response?.data;
    },
  },
  getters: {},
});
