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

import slackLogo from "@/assets/img/math-svgrepo-com.svg";
import image2 from "../../assets/img/img-2.jpg";
import image1 from "../../assets/img/img-1.jpg";
import image3 from "../../assets/img/img-3.jpg";

import team1 from "../../assets/img/team-1.jpg";
import team2 from "../../assets/img/team-2.jpg";
import team3 from "../../assets/img/team-3.jpg";
import team5 from "../../assets/img/team-5.jpg";
import team4 from "../../assets/img/team-4.jpg";

import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD";
import { useRouter } from "vue-router";
import { useRoomStore, useCategoryStore, useAuthStore, useUserStore } from "@/stores";
const router = useRouter();

const roomList = ref([]);
const roomsData = ref([]);
const user = ref([]);
const transactions = ref([]);
const { getAll, getById} = useCRUD();
const authStore = useAuthStore();
const userStore = useUserStore();
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
const goToDetail = async (roomId) => {
  router.push({ path: `/pages/room/detail/${roomId}` });
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
const calculateSummary = () => {
  totalExpense.value = transactions.value
    .filter((t) => t.categoryType === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  totalIncome.value = transactions.value
    .filter((t) => t.categoryType === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  personalFund.value = totalIncome.value - totalExpense.value;
};
onMounted(async () => {
  await getList();
  user.value = await authStore.getUser();
  await getTransactions();
  calculateSummary();
});
</script>
<template>
  <DashboardLayout>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card
                title="Tổng số phòng"
                :value="totalRooms"
                unit="Phòng"
                description="<span
                class='text-sm font-weight-bolder text-success'
                >+5%</span><span class='text-sm'> số phòng </span>"
                :icon="{
                  component: 'ni ni-money-coins',
                  background: 'bg-gradient-primary',
                  shape: 'rounded-circle',
                }" />
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card
                title="Quỹ của bạn"
                :value="personalFund"
                unit="VND"
                description="<span
                class='text-sm font-weight-bolder text-success'
                > +10% </span><span class='text-sm'>  mức chi tiêu </span>"
                :icon="{
                  component: 'ni ni-world',
                  background: 'bg-gradient-danger',
                  shape: 'rounded-circle',
                }" />
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card
                title="Tổng chi tiêu"
                :value="totalExpense"
                unit="VND"
                description="<span
                class='text-sm font-weight-bolder text-danger'
                > -2%</span><span class='text-sm'> chi tiêu</span> "
                :icon="{
                  component: 'ni ni-paper-diploma',
                  background: 'bg-gradient-success',
                  shape: 'rounded-circle',
                }" />
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card
                title="Tổng thu nhập"
                unit="VND"
                :value="totalIncome"
                description="<span
                class='text-sm font-weight-bolder text-success'
                >+10%</span> <span class='text-sm'> thu nhập </span> "
                :icon="{
                  component: 'ni ni-cart',
                  background: 'bg-gradient-warning',
                  shape: 'rounded-circle',
                }" />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-7 mb-lg">
              <gradient-line-chart
                id="chart-line"
                title="Tổng quan"
                description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
                :chart="{
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
                  datasets: [
                    {
                      label: 'Mobile Apps',
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                  ],
                }" />
            </div>
            <div class="col-lg-5">
              <carousel
                :items="[
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
              <div
                class="mb-4 col-lg-4 col-md-6"
                v-for="room in roomList"
                :key="room.id">
                <complex-project-card
                  :logo="slackLogo"
                  :title="room.name"
                  :quality="room.quality"
                  :date-time="room.createdAt"
                  :members="[team3, team4, team2, team3, team4]"
                  :roomId="room.id"
                  :leader="room.leaderName"
                  :dropdown="[
                    {
                      label: 'Xóa phòng',
                      route: 'javascript:;',
                    },
                    {
                      label: 'Sao chép lời mời',
                      route: 'javascript:;',
                    },
                  ]"
                  @dropdown-action="
                    (action) => handleDropdownAction(action, room)
                  " />
              </div>
            </div>
            <div class="  mb-4 mb-lg-0">
              <todo-list :header="{ title: 'Ghi chú', dateTime: new Date() }" :transactions="transactions"/>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 col-md-8 mb-4 mb-md-0">
              <authors-table />
            </div>
            <div class="col-md-4">
              <categories-list
                :categories="[
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
  </DashboardLayout>
</template>
