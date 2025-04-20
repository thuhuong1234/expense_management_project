<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ProgressLineChart from "@/examples/Charts/ProgressLineChart.vue";
import ProgressDoughnutChart from "./components/ProgressDoughnutChart.vue";
import TodoList from "./components/TodoList.vue";
import useCRUD from "@/composables/useCRUD";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import NavbarRoom from "./components/NavbarRoom.vue";

const route = useRoute();
const roomId = route.params?.id || null;
const room = ref({});
const users = ref([]);
const transactions = ref([]);
const userTransactions = ref([]);
const fund = ref(0);
const { getById } = useCRUD();

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
    console.log(transactions.value);

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
                    <todo-list :header="{ title: room.name, dateTime: '23 -30 March 2020' }"
                        :transactions="transactions" />
                </div>
                <div class="mt-4 col-lg-4 col-12 mt-lg-0">
                    <progress-line-chart title="Tasks" :count="480" :progress="60" :chart="{
                        labels: [
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        data: [40, 45, 42, 41, 40, 43, 40, 42, 39],
                    }" />
                    <progress-doughnut-chart title="Projects" :count="115" :chart="{
                        labels: [
                            {
                                label: 'Done',
                                isCompleted: true,
                            },
                            {
                                label: 'In progress',
                                isCompleted: false,
                            },
                        ],
                        datasets: {
                            label: 'Projects',
                            data: [75, 25],
                        },
                    }" />
                </div>
            </div>
        </div>
    </DashboardLayout>

</template>
