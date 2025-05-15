<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import ComplexStatisticsCard from "@/examples/Cards/ComplexStatisticsCard.vue";
import ReviewCard from "./components/ReviewCard.vue";
import RoomsTable from "@/views/admins/components/RoomsTable.vue";
import Navbar from "./components/Navbar.vue";
import DialogForm from "./components/DialogForm.vue";
import ArgonInput from "@/components/Icons/ArgonInput.vue";
import { showToast, showConfirmDialog } from "@/helpers/sweetalertHelper";
import img1 from "@/assets/img/reports1.jpg";
import img2 from "@/assets/img/reports2.jpg";
import img3 from "@/assets/img/reports3.jpg";
import img4 from "@/assets/img/reports4.jpg";

import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD";
import { useForm } from "vee-validate";
import * as yup from "yup";
const { getAll, create, deleteById, getById } = useCRUD();
const rooms = ref([]);
const errorMessage = ref('');
const schema = yup.object({
    name: yup.string().default('').required('Vui lòng nhập tên phòng.'),
})
const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
    }
})
const createRoom = handleSubmit(async (values) => {
    try {
        const response = await create("rooms", values);
        if (response?.success) {
            showToast("Đã tạo phòng mới thành công.", "success");
            await getRooms();
            resetForm();
        }
    } catch (error) {
        errorMessage.value = error.response?.data.message || error.message;
        await showToast(errorMessage.value, 'error');
    }
})
const deleteRoom = async (roomId) => {
    const room = await getById("rooms", roomId);
    const confirm = await showConfirmDialog("Bạn có chắc chắn muốn xóa?", `${room?.data.name}`);
    if (confirm) {
        try {
            const response = await deleteById("rooms", roomId);
            if (response?.success) {
                showToast("Xóa danh mục thành công", "success");
                await getRooms();
            }
        } catch (error) {
            errorMessage.value = error.response?.data.message || 'Xóa thất bại';
            await showToast(errorMessage.value, 'error');
        }
    }
}
const getRooms = async () => {
    const response = await getAll("rooms");
    rooms.value = response.data.rooms;
}
onMounted(() => {
    getRooms();
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
                        title: 'Tổng số phòng',
                        value: 80,
                        color: 'info',
                    },
                    {
                        title: 'Tổng số lần giao dịch',
                        value: 70,
                        color: 'success',
                    },
                ]" />
            </div>
        </div>
        <div class="row mt-4">
            <navbar>
                <template #nav-child-item>
                    <button type="button" class="btn btn-outline-primary m-0 btn-add" data-bs-toggle="modal"
                        data-bs-target="#roomModal" @click="resetForm">
                        Thêm phòng
                    </button>
                    <dialog-form modalTitle="Tạo danh mục" :onSubmit="createRoom" id-modal="roomModal">
                        <template #modal-body>
                            <div class="card-body">
                                <div class="mb-3">
                                    <argon-input name="name" id="name" type="text" placeholder="Tên danh mục"
                                        aria-label="name" />
                                </div>
                            </div>
                        </template>
                    </dialog-form>
                </template>
            </navbar>
            <div class="col-12">
                <rooms-table :rooms="rooms" @delete-room="deleteRoom" />
            </div>
        </div>
    </AdminLayout>
</template>
<style scss scoped>
.btn-add {
    border: #ee3672 solid 2px;
    color: #ee3672;

    &:hover {
        color: #ee3672 !important;
    }
}
</style>