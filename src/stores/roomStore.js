import { defineStore } from "pinia";
import axios from "@/configs/axios.js";

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: [],
    transactions: [],
    userRooms: [],
    userTransactions: [],
    fund: [],
  }),
  actions: {
    async getRooms() {
      const response = await axios.get("/rooms");
      this.rooms = response.data;
      return response.data;
    },
  },
  getters: {},
});
