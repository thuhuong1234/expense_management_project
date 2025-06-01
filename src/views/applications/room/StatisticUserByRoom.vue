<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import MemberCard from "@/views/dashboards/components/MemberCard.vue";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import UserList from "./components/UserList.vue";
import { showToast, showConfirmDialog } from "@/helpers/sweetalertHelper";

import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore, useRoomStore, useAuthStore } from "@/stores";
import axios from "@/configs/axios.js";
import useCRUD from "@/composables/useCRUD";

const route = useRoute();
const router = useRouter();
const roomStore = useRoomStore();
const categoryStore = useCategoryStore();
const authStore = useAuthStore();
const roomId = route.params?.id || null;
const room = ref({});
const users = ref([]);
const transactions = ref([]);
const fund = ref([]);
const categories = ref([]);
const balance = ref(0);
const totalExpense = ref(0);
const totalIncome = ref(0);
const { getById } = useCRUD();
const userId = computed(() => authStore.user?.id);

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

const addUser = async () => {
    router.push({
        path: `/pages/room/add-user`,
        query: {
            roomId: roomId,
        }
    });
}
const userStatistics = ref([]);
const getUserStatics = async (type) => {
    const response = await axios.get(`rooms/statistics/users-by-room?roomId=${roomId}&type=${type}`);
    userStatistics.value = response.data.data;
}
const handleDropdownAction = async (action, user) => {
    const currentUserId = userId.value;
    const currentUserInRoom = users.value.find(u => u.id === currentUserId);

    if (action === "Xóa") {
        if (!currentUserInRoom || currentUserInRoom.role !== "Leader") {
            showToast("Chỉ trưởng nhóm mới có quyền xóa thành viên!", "warning");
            return;
        }
        if (user.role === "Leader" || user.isLeader) {
            showToast("Không thể xóa trưởng nhóm. Vui lòng chuyển quyền trước!", "warning");
            return;
        }
        const confirm = await showConfirmDialog("Bạn có chắc chắn muốn xóa thành viên này khỏi phòng?", `${user.name}`);
        if (confirm) {
            try {
                const response = await axios.delete(`rooms/${roomId}/remove-user`, {
                    data: {
                        userId: user.id,
                    },
                })
                if (response?.data) {
                    showToast('Xóa thành viên thành công.', 'success');
                    await getRoom();
                }
            } catch (error) {
                showToast('Xóa thành viên thất bại', 'error');
            }
        }
    }
}
onMounted(async () => {
    await getRoom();
    categories.value = await categoryStore.getCategories();
    balance.value = +fund.value?.[0]?.balance;
    totalExpense.value = getTotal('Expense');
    totalIncome.value = getTotal('Income');
    await getUserStatics("month");
})  
</script>
<template>
    <DashboardLayout>
        <div class="w-100">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-12">
                    <mini-statistics-card title="Tổng số tiền" :value="balance" unit='VND' description="<span
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
            <div class="py-4 row">
                <div class="col-lg-8 col-12">
                    <user-list :users="userStatistics" />
                </div>
                <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                    <member-card :members="users" :selectable="false" :dropdown="[
                        {
                            label: 'Xóa',
                            route: 'javascript:;',
                        },
                    ]" @dropdown-action="handleDropdownAction" />
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