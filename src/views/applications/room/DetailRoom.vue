<script setup>
import TodoList from "./components/TodoList.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Category from "@/views/applications/category/Category.vue";
import ProgressLineChart from "@/examples/Charts/ProgressLineChart.vue";
import MemberCard from "@/views/dashboards/components/MemberCard.vue";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import SubNarbar from "@/examples/Navbars/SubNavbar.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore, useRoomStore } from "@/stores";
import axios from "@/configs/axios.js";
import useCRUD from "@/composables/useCRUD";
import { useStatisticChart } from "@/composables/useStatisticChart";

const route = useRoute();
const router = useRouter();
const roomStore = useRoomStore();
const categoryStore = useCategoryStore();
const roomId = route.params?.id || null;
const room = ref({});
const users = ref([]);
const transactions = ref([]);
const fund = ref([]);
const categories = ref([]);
const balance = ref(0);
const totalExpense = ref(0);
const totalIncome = ref(0);
const { getById, update } = useCRUD();

const getRoom = async () => {
    const response = await getById('rooms', roomId);
    room.value = response.data;
    users.value = await roomStore.getUserInfos(roomId);
    transactions.value = await Promise.all(
        room.value.transactions?.map(async (transaction) => {
            const response = await getById('categories', transaction.categoryId);
            return {
                description: transaction.description,
                createdAt: new Date(transaction.createdAt),
                date: new Date(transaction.date),
                id: transaction.id,
                amount: Number(transaction.amount),
                category: response?.data.name || transaction.categoryId,
                userTransactions: transaction.userTransactions,
                categoryType: response?.data.categoryType,
            }
        })
    );
    fund.value = await Promise.all(room.value.fund?.map(async (item) => {
        const response = await getById('funds', item.id);
        return {
            name: response.data.name,
            balance: response.data.balance,
        }
    }));
    roomStore.transactions = transactions.value
    roomStore.fund = fund.value
}
const getTotal = (type) => {
    return (roomStore.transactions
        .filter((transaction) => transaction.categoryType === type)
        .reduce((total, transaction) => total + transaction.amount, 0));

}
const saveRoomName = async (roomId, value) => {
    try {
        await update(`rooms/${roomId}`, value);
    } catch (error) {
        console.log(error);
    }
}
const createTransaction = async (categoryId) => {
    router.push({
        path: `/pages/transaction/create`,
        query: {
            roomId,
            categoryId: categoryId
        }
    },
    );
}
const progress = ref(0);
const getStatistic = async () => {
    const response = await axios.get(`transactions/statistics?type=week&roomId=${roomId}`);
    progress.value = Number(response.data?.totalExpense) / (Number(response.data?.totalExpense) + Number(response.data?.totalIncome)) * 100;
    return response.data;
}
const { chartData, loadChartData } = useStatisticChart(getStatistic);
const onSubmit = () => {
    console.log("submit");

}
const handleEditTransaction = async (transaction) => {
    const response = await getById('transactions', transaction.id);
    router.push({
        path: `/pages/transaction/update`,
        query: {
            roomId: response.data.roomId,
            transactionId: response.data.id,
            categoryId: response.data.categoryId,
        }
    });
};
const addUser = async () => {
    router.push({
        path: `/pages/room/add-user`,
        query: {
            roomId: roomId,
        }
    });
}
const downloadDetailRoom = async () => {
    const res = await axios.get(`rooms/download-detail/${roomId}`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${room.value.name}.xlsx`;
    link.click();
}
onMounted(async () => {
    await getRoom();
    categories.value = await categoryStore.getCategories();
    balance.value = +fund.value?.[0]?.balance;
    totalExpense.value = getTotal('Expense');
    totalIncome.value = getTotal('Income');
    await loadChartData();
})  
</script>
<template>
    <DashboardLayout>
        <div class="w-100">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-12">
                    <mini-statistics-card title="Quỹ phòng" :value="balance" unit='VND' description="<span
                class='text-sm font-weight-bolder text-success'
                >+55%</span> since yesterday" :icon="{
                    component: 'ni ni-money-coins',
                    background: 'bg-gradient-primary',
                    shape: 'rounded-circle',
                }" />
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <mini-statistics-card title="Người dùng" :value="users.length" unit='Người' description="<span
                class='text-sm font-weight-bolder text-success'
                >+3%</span> since last week" :icon="{
                    component: 'ni ni-fat-add',
                    background: 'bg-gradient-danger',
                    shape: 'rounded-circle',
                }" @on-click="addUser" />
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <mini-statistics-card title="Chi tiêu" :value="totalExpense" unit='VND' description="<span
                class='text-sm font-weight-bolder text-danger'
                >-2%</span> since last quarter" :icon="{
                    component: 'ni ni-cart',
                    background: 'bg-gradient-success',
                    shape: 'rounded-circle',
                }" />
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <mini-statistics-card title="Thu nhập" :value="totalIncome" unit='VND' description="<span
                class='text-sm font-weight-bolder text-success'
                >+5%</span> than last month" :icon="{
                    component: 'ni ni-paper-diploma',
                    background: 'bg-gradient-warning',
                    shape: 'rounded-circle',
                }" />
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 col-12">
                    <div class="overflow-hidden card">
                        <div class="p-2" style="height: 200px">
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
                            <div class="tab-content pt-3" id="myTabContent">
                                <div class="tab-pane fade show active" id="expense-tab-pane" role="tabpanel"
                                    aria-labelledby="expense-tab" tabindex="0">
                                    <category :categories="categories" type="Expense" @select="createTransaction" />
                                </div>
                                <div class="tab-pane fade" id="income-tab-pane" role="tabpanel"
                                    aria-labelledby="income-tab" tabindex="0">
                                    <category :categories="categories" type="Income" @select="createTransaction" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <progress-line-chart v-if="chartData" id="my-chart" title="Thống kê theo tuần" count=""
                        :progress="progress.toFixed(2)" :chart="chartData" :on-submit="onSubmit" />
                </div>
            </div>
            <div class="py-4 row">
                <div class="col-lg-8 col-12">
                    <SubNarbar @add="createTransaction" @export="downloadDetailRoom" />
                    <todo-list :header="{ title: room.name, dateTime: room.updatedAt }" :transactions="transactions"
                        @save="saveRoomName(room.id, $event)" @edit="handleEditTransaction" />
                </div>
                <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                    <member-card :members="users" :selectable="false" :dropdown="[
                        {
                            label: 'Xóa',
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