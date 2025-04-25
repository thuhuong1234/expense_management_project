<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TodoList from "./components/TodoList.vue";
import useCRUD from "@/composables/useCRUD";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Category from "@/views/applications/category/Category.vue";
import ProgressLineChart from "@/examples/Charts/ProgressLineChart.vue";
import MemberCard from "@/views/dashboards/components/MemberCard.vue";
const route = useRoute();
const roomId = route.params?.id || null;
const room = ref({});
const users = ref([]);
const transactions = ref([]);
const userTransactions = ref([]);
const fund = ref(0);
const categories = ref([]);
const { getById, update, getAll } = useCRUD();
const getRoom = async () => {
    const response = await getById('rooms', roomId);
    room.value = response.data;
    users.value = room.value.userRooms?.map((userRoom) => ({
        userId: userRoom.userId,
        role: userRoom.role,
        isLeader: userRoom.isLeader,
        joinedAt: userRoom.joinedAt
    })) || [];
    console.log(users.value);

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
const getAllCategories = async () => {
    const response = await getAll('categories');
    categories.value = response.data;
}
const userInfos = ref([]);
const getUserInfos = async () => {
    await Promise.all(users.value.map(async (user) => {
        const response = await getById('users', user.userId);
        userInfos.value.push({
            ...response.data,
            role: user.role,
            isLeader: user.isLeader,
            joinedAt: user.joinedAt
        });
    }))
}
onMounted(async () => {
    await getRoom();
    await getAllCategories();
    await getUserInfos();
})
</script>
<template>
    <DashboardLayout>
        <div class="w-100">
            <div class="row">
                <div class="col-lg-8 col-12">
                    <div class="overflow-hidden card">
                        <div class="p-2">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active font-weight-bold" id="expense-tab"
                                        data-bs-toggle="tab" data-bs-target="#expense-tab-pane" type="button" role="tab"
                                        aria-controls="expense-tab-pane" aria-selected="true">Chi tiêu</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link font-weight-bold" id="income-tab" data-bs-toggle="tab"
                                        data-bs-target="#income-tab-pane" type="button" role="tab"
                                        aria-controls="income-tab-pane" aria-selected="false">Thu nhập</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="expense-tab-pane" role="tabpanel"
                                    aria-labelledby="expense-tab" tabindex="0">
                                    <category :categories="categories" type="Expense" />
                                </div>
                                <div class="tab-pane fade" id="income-tab-pane" role="tabpanel"
                                    aria-labelledby="income-tab" tabindex="0">
                                    <category :categories="categories" type="Income" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <progress-line-chart title="Tổng quan" :count="480" :progress="60" :chart="{
                        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        data: [40, 45, 42, 41, 40, 43, 40, 42, 39],
                    }" />
                </div>
            </div>
            <div class="py-4 row">
                <div class="col-lg-8 col-12">
                    <todo-list :header="{ title: room.name, dateTime: room.updatedAt }" :transactions="transactions"
                        @save="saveRoomName(room.id, $event)" />
                </div>
                <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                    <member-card :members="userInfos" :title="room.name" :dropdown="[
                        {
                            label: 'Xóa phòng',
                            route: 'javascript:;',
                        },
                    ]" />
                </div>
            </div>
        </div>

    </DashboardLayout>
</template>
<style scoped>
.nav-tabs .nav-link {
    color: #6d7992;
}

.nav-tabs .nav-link.active {
    color: #344767;
}
</style>