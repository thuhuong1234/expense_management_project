<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TodoList from "./components/TodoList.vue";
import useCRUD from "@/composables/useCRUD";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Category from "@/views/applications/category/Category.vue";
import ProgressLineChart from "@/examples/Charts/ProgressLineChart.vue";
import MemberCard from "@/views/dashboards/components/MemberCard.vue";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import { useCategoryStore, useRoomStore } from "@/stores";
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
                id: transaction.id,
                amount: Number(transaction.amount),
                category: response?.data.name || transaction.categoryId,
                userTransactions: transaction.userTransactions?.length,
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
console.log(roomStore.transactions);

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
onMounted(async () => {
    await getRoom();
    categories.value = await categoryStore.getCategories();
    balance.value = +fund.value?.[0]?.balance;
    totalExpense.value = getTotal('Expense');
    totalIncome.value = getTotal('Income');
})  
</script>
<template>
    <DashboardLayout>
        <div class="w-100">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-12">
                    <mini-statistics-card title="Quỹ phòng" :value="balance" description="<span
                class='text-sm font-weight-bolder text-success'
                >+55%</span> since yesterday" :icon="{
                    component: 'ni ni-money-coins',
                    background: 'bg-gradient-primary',
                    shape: 'rounded-circle',
                }" />
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <mini-statistics-card title="Người dùng" :value="users.length" description="<span
                class='text-sm font-weight-bolder text-success'
                >+3%</span> since last week" :icon="{
                    component: 'ni ni-world',
                    background: 'bg-gradient-danger',
                    shape: 'rounded-circle',
                }" />
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <mini-statistics-card title="Chi tiêu" :value="totalExpense" description="<span
                class='text-sm font-weight-bolder text-danger'
                >-2%</span> since last quarter" :icon="{
                    component: 'ni ni-cart',
                    background: 'bg-gradient-success',
                    shape: 'rounded-circle',
                }" />
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <mini-statistics-card title="Thu nhập" :value="totalIncome" description="<span
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
                                    <category :categories="categories" type="Expense" @select="createTransaction" />
                                </div>
                                <div class="tab-pane fade" id="income-tab-pane" role="tabpanel"
                                    aria-labelledby="income-tab" tabindex="0">
                                    <category :categories="categories" type="Income" :select="createTransaction" />
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
                    <member-card :members="users" :title="room.name" :selectable="false" :dropdown="[
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