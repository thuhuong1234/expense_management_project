<script setup>
import DefaultLayout from "@/layouts/DashboardLayout.vue";
import MemberCard from "@/views/dashboards/components/MemberCard.vue";
import useCRUD from "@/composables/useCRUD";
import SubNavbar from "@/examples/Navbars/SubNavbar.vue";
import { showToast } from "@/helpers/sweetalertHelper";

import axios from "@/configs/axios.js";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const { getAll, getById } = useCRUD();
const route = useRoute();
const router = useRouter();
const users = ref([]);
const selectedUsers = ref([]);

const roomId = ref(Number(route.query?.roomId)) || null;
const getAvailableUsers = async (id) => {
    const res = await getById("rooms", id);
    const userRooms = res.data.userRooms;
    const existedUsers = userRooms.map(user => user.userId);
    const response = await getAll("users");
    users.value = response.data.users.filter(user => !existedUsers.includes(user.id));
}
const addUsersToRoom = async (data, id) => {
    const res = await axios.put(`rooms/${id}/add-user`, { userId: Object.values(data) });
    if (res?.data) {
        await getAvailableUsers(roomId.value);
        showToast('Thêm người dùng thành công.', res.data.message);
    }
}
onMounted(async () => {
    await getAvailableUsers(roomId.value);
})
</script>
<template>
    <DefaultLayout>
        <SubNavbar :show-btn-export="false" title-add="Thêm người dùng" @add="addUsersToRoom(selectedUsers, roomId)" />
        <member-card :members="users" :selectable="true" v-model:selected-users="selectedUsers" />
    </DefaultLayout>
</template>
<style scss scoped></style>