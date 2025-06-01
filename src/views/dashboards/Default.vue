<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import MiniStatisticsCard from "../../examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "../../examples/Charts/GradientLineChart.vue";
import Carousel from "././components/Carousel.vue";
import MemberCard from "./components/MemberCard.vue";
import TodoListCard from "./components/TodoListCard.vue";
import AuthorsTable from "./components/AuthorsTable.vue";
import CategoriesList from "@/examples/Cards/CategoriesList.vue";
import ComplexProjectCard from "@/views/applications/room/components/ComplexProjectCard.vue";
import TodoList from "@/views/applications/room/components/TodoList.vue";
import AppFooter from "@/examples/Footer.vue";
import ProgressLineChart from "@/examples/Charts/ProgressLineChart.vue";

import slackLogo from "@/assets/img/math-svgrepo-com.svg";
import image2 from "../../assets/img/img-2.jpg";
import image1 from "../../assets/img/img-1.jpg";
import image3 from "../../assets/img/img-3.jpg";

import team1 from "../../assets/img/team-1.jpg";
import team2 from "../../assets/img/team-2.jpg";
import team3 from "../../assets/img/team-3.jpg";
import team5 from "../../assets/img/team-5.jpg";
import team4 from "../../assets/img/team-4.jpg";

import axios from "@/configs/axios.js";
import { onMounted, ref, computed } from "vue";
import useCRUD from "@/composables/useCRUD";
import { useRouter } from "vue-router";
import { useRoomStore, useCategoryStore, useAuthStore, useUserStore, useUiStore } from "@/stores";
import { useStatisticChart } from "@/composables/useStatisticChart";
import { showToast, showConfirmDialog } from "@/helpers/sweetalertHelper";

const router = useRouter();
const roomList = ref([]);
const roomsData = ref([]);
const user = ref([]);
const transactions = ref([]);
const { getAll, getById } = useCRUD();
const authStore = useAuthStore();
const userStore = useUserStore();
const uiStore = useUiStore();
const showFooter = computed(() => uiStore.showFooter);
const userId = computed(() => authStore.user?.id);
const getList = async () => {
  const response = await getAll("rooms");
  roomsData.value = {
    data: response.data.rooms,
    total: response.data.total,
    page: response.data.page,
    limit: response.data.limit,
    totalPage: response.data.totalPage,
  };
  totalRooms.value = response.data.total;

  if (!Array.isArray(roomsData.value.data)) {
    console.error("Dữ liệu rooms không phải là một mảng:", roomsData.value);
    return;
  }
  roomList.value = await Promise.all(
    roomsData.value.data.map(async (room) => {
      const user = await getById("users", room.userId);
      return {
        ...room,
        leaderName: user?.data.name || "Không rõ",
      };
    })
  );
};

const getTransactions = async () => {
  const userId = user.value?.id;
  if (!userId) return;

  const response = await getById("users", userId);
  const userTransactions = response.data.userTransactions || [];

  const rawTransactions = userTransactions
    .filter((ut) => ut.roomId === null && ut.transaction);

  transactions.value = await Promise.all(
    rawTransactions.map(async (ut) => {
      let categoryName = "Không rõ";
      let categoryType = "";

      try {
        const categoryResponse = await getById("categories", ut.transaction.categoryId);
        categoryName = categoryResponse?.data?.name || categoryName;
        categoryType = categoryResponse?.data?.categoryType || "";
      } catch (error) {
        console.warn("Không lấy được category:", ut.transaction.categoryId, error);
      }

      return {
        id: ut.transaction.id,
        description: ut.transaction.description,
        amount: +ut.transaction.amount,
        createdAt: new Date(ut.transaction.createdAt),
        category: categoryName,
        categoryType: categoryType,
        categoryId: ut.transaction.categoryId,
      };
    })
  );
};
const personalFund = ref(0);
const totalExpense = ref(0);
const totalIncome = ref(0);
const totalRooms = ref(0);
const getTotal = async () => {
  const res = await axios.get(`users/count-by-user`);
  totalExpense.value = res.data.totalExpense;
  totalIncome.value = res.data.totalIncome;
  personalFund.value = totalIncome.value - totalExpense.value;
}
const addUsers = async (roomId) => {
  router.push({
    path: `/pages/room/add-user`,
    query: { roomId: roomId }
  });
}
const goToDetail = (roomId) => {
  router.push(`/pages/room/detail/${roomId}`);
};
const progress = ref(0);
const getStatistic = async () => {
  const response = await axios.get(`transactions/statistics?type=week&roomId=12`);
  progress.value = Number(response.data?.totalExpense) / (Number(response.data?.totalExpense) + Number(response.data?.totalIncome)) * 100;
  return response.data;
}
const { chartData, loadChartData } = useStatisticChart(getStatistic);
const handleDropdownAction = async (action, room) => {

  if (action === 'Xóa phòng') {
    const confirm = await showConfirmDialog("Bạn có chắn chắn muốn xóa?", `${room.name}`);
    if (confirm) {
      try {
        const response = await deleteById('rooms', room.id);
        if (response?.data) {
          showToast('Xoá phòng thành công', 'success');
          await getList();
        }
      } catch (error) {
        showToast('Xoá thất bại', 'error');
      }
    }
  }
  if (action === "Rời khỏi phòng") {
    if (userId.value === room.userId) {
      showToast("Vui lòng chuyển quyền trưởng trước khi rời phòng!", "warning");
      return;
    }
    const confirm = await showConfirmDialog("Bạn có chắn chắn rời khỏi phòng?", `${room.name}`);
    if (confirm) {
      try {
        const response = await axios.delete(`rooms/${room.id}/remove-user`, {
          data: {
            userId: user.id,
          },
        })
        if (response?.data) {
          showToast('Đã rời khỏi phòng.', 'success');
          await getList();
        }
      } catch (error) {
        showToast('Rời khỏi phòng thất bại', 'error');
      }
    }
  }
}
onMounted(async () => {
  await getList();
  user.value = await authStore.getUser();
  await getTransactions();
  await getTotal();
  await loadChartData();
});
</script>
<template>
  <DashboardLayout>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card title="Tổng số phòng" :value="totalRooms" unit="Phòng" description="<span
                class='text-sm font-weight-bolder text-success'
                >+5%</span><span class='text-sm'> số phòng </span>" :icon="{
                  component: 'ni ni-money-coins',
                  background: 'bg-gradient-primary',
                  shape: 'rounded-circle',
                }" />
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card title="Quỹ của bạn" :value="personalFund" unit="VND" description="<span
                class='text-sm font-weight-bolder text-success'
                > +10% </span><span class='text-sm'>  mức chi tiêu </span>" :icon="{
                  component: 'ni ni-world',
                  background: 'bg-gradient-danger',
                  shape: 'rounded-circle',
                }" />
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card title="Tổng chi tiêu" :value="totalExpense" unit="VND" description="<span
                class='text-sm font-weight-bolder text-danger'
                > -2%</span><span class='text-sm'> chi tiêu</span> " :icon="{
                  component: 'ni ni-paper-diploma',
                  background: 'bg-gradient-success',
                  shape: 'rounded-circle',
                }" />
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card title="Tổng thu nhập" unit="VND" :value="totalIncome" description="<span
                class='text-sm font-weight-bolder text-success'
                >+10%</span> <span class='text-sm'> thu nhập </span> " :icon="{
                  component: 'ni ni-cart',
                  background: 'bg-gradient-warning',
                  shape: 'rounded-circle',
                }" />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-7 mb-lg bg-gradient-warning border-radius-lg">
              <div class="d-flex justify-content-between align-items-center chart-header p-3 ">
                <div class="chart-header-title">
                  <span class="title font-weight-bold text-md text-dark">THỐNG KÊ CHI TIÊU</span>
                </div>

                <div class="chart-header-filters">
                  <button class="border-1" :class="{ active: selectedRange === '1D' }"
                    @click="setRange('1D')">Ngày</button>
                  <button class="border-1" :class="{ active: selectedRange === '1W' }"
                    @click="setRange('1W')">Tuần</button>
                  <button class="border-1" :class="{ active: selectedRange === '1M' }"
                    @click="setRange('1M')">Tháng</button>
                  <button class="border-1" :class="{ active: selectedRange === '1Y' }"
                    @click="setRange('1Y')">Năm</button>
                </div>
              </div>
              <progress-line-chart v-if="chartData" :height="280" id="my-chart" title="Thống kê theo tuần" count=""
                :progress="progress.toFixed(2)" :chart="chartData" :on-submit="onSubmit" />
            </div>
            <div class="col-lg-5">
              <carousel :items="[
                {
                  img: image2,
                  title: 'Quản lý chi tiêu.',
                  description:
                    'Chi tiêu có kế hoạch là bí quyết giúp bạn kiểm soát tài chính cá nhân.',
                  icon: {
                    component: 'ni ni-camera-compact text-dark',
                    background: 'bg-white',
                  },
                },
                {
                  img: image1,
                  title: 'Faster way to create web pages',
                  description:
                    'That’s my skill. I’m not really specifically talented at anything except for the ability to learn.',
                  icon: {
                    component: 'ni ni-bulb-61 text-dark',
                    background: 'bg-white',
                  },
                },
                {
                  img: image3,
                  title: 'Share with us your design tips!',
                  description:
                    'Don’t be afraid to be wrong because you can’t learn anything from a compliment.',
                  icon: {
                    component: 'ni ni-trophy text-dark',
                    background: 'bg-white',
                  },
                },
              ]" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="mt-2 row mt-lg-4" v-if="roomList.length > 0">
              <div class="mb-4 col-lg-4 col-md-6" v-for="room in roomList" :key="room.id">
                <complex-project-card :logo="slackLogo" :title="room.name" :quality="room.quality"
                  :date-time="room.createdAt" :members="[team3, team4, team2, team3, team4]" :roomId="room.id"
                  :leader="room.leaderName" :dropdown="[
                    {
                      label: 'Xóa phòng',
                      route: 'javascript:;',
                    },
                    {
                      label: 'Rời khỏi phòng',
                      route: 'javascript:;',
                    },
                  ]" @dropdown-action="
                    (action) => handleDropdownAction(action, room)
                  " @add-users="addUsers(room.id)" @active="goToDetail(room.id)" />
              </div>
            </div>
            <div class="  mb-4 mb-lg-0">
              <todo-list :header="{ title: 'Ghi chú', dateTime: new Date() }" :transactions="transactions" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 col-md-8 mb-4 mb-md-0">
              <authors-table />
            </div>
            <div class="col-md-4">
              <categories-list :categories="[
                {
                  icon: {
                    component: 'ni ni-mobile-button',
                    background: 'dark',
                  },
                  label: 'Devices',
                  description: '250 in stock <strong>346+ sold</strong>',
                },
                {
                  icon: {
                    component: 'ni ni-tag',
                    background: 'dark',
                  },
                  label: 'Tickets',
                  description: '123 closed <strong>15 open</strong>',
                },
                {
                  icon: { component: 'ni ni-box-2', background: 'dark' },
                  label: 'Error logs',
                  description: '1 is active <strong>40 closed</strong>',
                },
                {
                  icon: { component: 'ni ni-satisfied', background: 'dark' },
                  label: 'Happy Users',
                  description: '1 is active <strong>+ 430</strong>',
                },
              ]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer v-show="showFooter" class="py-3 bg-white border-radius-lg" />
  </DashboardLayout>
</template>
