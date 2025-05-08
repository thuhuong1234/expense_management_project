import { defineStore } from "pinia";
import useCRUD from "@/composables/useCRUD";
const { getAll, getById } = useCRUD();
export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: [],
    transactions: [],
    userRooms: [],
    userTransactions: [],
    fund: [],
    userInfos: [],
  }),
  actions: {
    async getRooms() {
      const response = await getAll("/rooms");
      this.rooms = response.data.rooms;
      return response.data.rooms;
    },
    async getUserInfos(roomId) {
      const response = await getById("/rooms", roomId);
      console.log(response);

      this.userRooms = response.data.userRooms;
      await Promise.all(
        this.userRooms.map(async (user) => {
          const response = await getById("users", user.userId);
          this.userInfos.push({
            ...response.data,
            role: user.role,
            isLeader: user.isLeader,
            joinedAt: user.joinedAt,
          });
        })
      );
      return this.userInfos;
    },
  },
  getters: {},
});
