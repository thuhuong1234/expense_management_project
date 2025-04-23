<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TodoList from "./components/TodoList.vue";
import useCRUD from "@/composables/useCRUD";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import NavbarRoom from "./components/NavbarRoom.vue";
import Category from "@/views/applications/category/Category.vue";
import { categories } from '@/views/applications/category/components/categoryList';

const route = useRoute();
const roomId = route.params?.id || null;
const room = ref({});
const users = ref([]);
const transactions = ref([]);
const userTransactions = ref([]);
const fund = ref(0);
const { getById, update } = useCRUD();

const getRoom = async () => {
    const response = await getById('rooms', roomId);
    room.value = response.data;
    users.value = room.value.userRooms?.map((userRoom) => ({
        userId: userRoom.userId,
        role: userRoom.role,
        isLeader: userRoom.isLeader,
        joinedAt: userRoom.joinedAt
    })) || [];
    transactions.value = room.value.transactions?.map((transaction) => ({
        description: transaction.description,
        createdAt: new Date(transaction.createdAt).toLocaleDateString("vi-VN"),
        id: transaction.id,
        amount: Number(transaction.amount).toLocaleString("vi-VN") + " VND",
        category: transaction.categoryId,
        userTransactions: transaction.userTransactions?.length,
    })) || [];

    fund.value = room.value.fund || 0;
}
const saveRoomName = async (roomId, value) => {
    try {
        await update(`rooms/${roomId}`, value);
    } catch (error) {
        console.log(error);
    }
}
onMounted(async () => {
    getRoom();
})
</script>
<template>
    <DashboardLayout>
        <div class="py-4 container-fluid">
            <div class="row">
                <NavbarRoom>
                    <template #nav-child-item>
                        <button type="button" class="btn btn-outline-primary m-0 btn-add" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            Thêm ghi chú
                        </button>
                    </template>
                </NavbarRoom>
            </div>
            <div class="mt-4 row">
                <div class="col-lg-8 col-12">
                    <todo-list :header="{ title: room.name, dateTime: room.updatedAt }" :transactions="transactions"
                        @save="saveRoomName(room.id, $event)" />
                </div>
                <div class="col-lg-4 col-12 d-flex flex-column gap-4">
                    <category :is-expense="true" :is-income="false" :categories="categories" title="Chi tiêu" />
                    <category :is-expense="false" :is-income="true" :categories="categories" title="Thu nhập" />
                </div>
            </div>
        </div>
    </DashboardLayout>

</template>
