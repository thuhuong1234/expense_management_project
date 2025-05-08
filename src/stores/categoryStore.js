import { defineStore } from "pinia";
import useCRUD from "@/composables/useCRUD";
const { getAll } = useCRUD();
export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getCategories() {
      const response = await getAll("/categories?limit=30");
      this.categories = response.data.categories;
      return response.data.categories;
    },
  },
  getters: {},
});
