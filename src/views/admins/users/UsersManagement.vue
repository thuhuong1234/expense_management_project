<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import ComplexStatisticsCard from "@/examples/Cards/ComplexStatisticsCard.vue";
import ReviewCard from "./components/ReviewCard.vue";
import ReportsTable from "./components/ReportsTable.vue";
import NavbarUser from "./components/NavbarUser.vue";
import img1 from "@/assets/img/reports1.jpg";
import img2 from "@/assets/img/reports2.jpg";
import img3 from "@/assets/img/reports3.jpg";
import img4 from "@/assets/img/reports4.jpg";
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD";
const { getAll } = useCRUD();
const users = ref([]);
const getUsers = async () => {
    const response = await getAll("users");
    users.value = response.data;
}
onMounted(() => {
    getUsers();
});
</script>
<template>
    <AdminLayout>
        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-12">
                        <complex-statistics-card :img="img1" icon="text-dark ni ni-circle-08" percentage="+55%"
                            :count="{ number: 1600, label: 'Active Users' }" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                        <complex-statistics-card :img="img2" icon="text-dark ni ni-active-40" percentage="+124%"
                            :count="{ number: 357, label: 'Click Events' }" />
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-6 col-md-6 col-12">
                        <complex-statistics-card :img="img3" icon="text-dark ni ni-cart" percentage="+15%"
                            :count="{ number: 2300, label: 'Purchases' }" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                        <complex-statistics-card :img="img4" icon="text-dark ni ni-like-2" percentage="+90%"
                            :count="{ number: 940, label: 'Likes' }" />
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <review-card title="Tổng quan" description="" :reviews="[
                    {
                        title: 'Tổng số người dùng',
                        value: 80,
                        color: 'info',
                    },
                    {
                        title: 'Người dùng đang hoạt động',
                        value: 17,
                        color: 'success',
                    },
                    {
                        title: 'Người dùng chờ xác minh',
                        value: 3,
                        color: 'danger',
                    },
                ]" />
            </div>
        </div>

        <div class="row mt-4">
            <navbar-user>
                <template #nav-child-item>
                    <button type="button" class="btn btn-outline-primary m-0 btn-add">
                        Thêm người dùng
                    </button>
                </template>
            </navbar-user>
            <div class="col-12">
                <reports-table :users="users" />
            </div>
        </div>
    </AdminLayout>
</template>