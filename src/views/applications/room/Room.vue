<script setup>
import DefaultLayout from "@/layouts/DashboardLayout.vue"
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from "vue";
import { useUiStore } from "@/stores/uiStore";
import useCRUD from "@/composables/useCRUD";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
const router = useRouter();
// components
import ComplexProjectCard from "./components/ComplexProjectCard.vue";
import NavbarRoom from './components/NavbarRoom.vue';
import DialogFormRoom from "./components/DialogFormRoom.vue";
import { showToast, showConfirmDialog } from "@/helpers/sweetalertHelper";
// images
import team2 from "@/assets/img/math-svgrepo-com.svg";
import team3 from "@/assets/img/math-svgrepo-com.svg";
import team4 from "@/assets/img/math-svgrepo-com.svg";
import slackLogo from "@/assets/img/math-svgrepo-com.svg";
import setNavPills from "@/assets/js/nav-pills.js";
import ArgonInput from "@/components/Icons/ArgonInput.vue";

const roomsData = ref([]);
const store = useUiStore();
const roomList = ref([]);
const errorMessage = ref('');
const { getAll, getById, create, deleteById } = useCRUD();
const schema = yup.object({
    name: yup.string().required('Vui lòng nhập tên phòng'),
})
const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
    },
})
const createRoom = handleSubmit(async (values) => {
    try {
        const response = await create('rooms', values);
        if (response?.data) {
            showToast('Tạo phòng thành công', 'success');
            await getList();
            resetForm();
        }
    } catch (error) {
        errorMessage.value = error.response?.data.message || error.message;
        showToast('Đã xảy ra lỗi', 'error');
    }

});
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
}
const getList = async () => {
    roomsData.value = await getAll('rooms');
    roomList.value = await Promise.all(roomsData.value.data.map(async (room) => {
        const user = await getById('users', room.userId);
        return {
            ...room,
            leaderName: user.name,
        }
    }))
}
const goToDetail = async (roomId) => {
    router.push({ path: `/pages/room/detail/${roomId}` });
}
onMounted(async () => {
    store.isAbsolute = true;
    setNavPills();
    await getList();
});
onBeforeMount(() => {
    store.layout = "custom";
    store.showNavbar = false;
    store.showFooter = true;
    store.hideConfigButton = true;
});
onBeforeUnmount(() => {
    store.isAbsolute = false;
    store.layout = "default";
    store.showNavbar = true;
    store.showFooter = true;
    store.hideConfigButton = false;
});
</script>
<template>
    <DefaultLayout>
        <div class="py-4 container-fluid">
            <section class="py-3">
                <div class="row">
                    <NavbarRoom>
                        <template #nav-child-item>
                            <button type="button" class="btn btn-outline-primary m-0 btn-add" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                Thêm phòng
                            </button>
                            <DialogFormRoom modalTitle="Tạo phòng" :onSubmit="createRoom">
                                <template #modal-body>
                                    <div class="row ">
                                        <div class="col-12">
                                            <ArgonInput name="name" type="text" id="name" placeholder="Tên phòng" />
                                        </div>
                                    </div>
                                </template>
                            </DialogFormRoom>
                        </template>
                    </NavbarRoom>
                </div>
                <div class="mt-2 row mt-lg-4" v-if="roomList.length > 0">
                    <div class="mb-4 col-lg-4 col-md-6" v-for="room in roomList" :key="room.id"
                        @click="goToDetail(room.id)">
                        <complex-project-card :logo="slackLogo" :title="room.name" :quality="room.quality" description="If everything I did failed - which it doesn&#39;t, I think that
                it actually succeeds." :date-time="room.updatedAt" :members="[team3, team4, team2, team3, team4]"
                            :leader="room.leaderName" :dropdown="[
                                {
                                    label: 'Chỉnh sửa',
                                    route: 'javascript:;',
                                },
                                {
                                    label: 'Xóa phòng',
                                    route: 'javascript:;',
                                },
                                {
                                    label: 'Sao chép lời mời',
                                    route: 'javascript:;',
                                },
                            ]" @dropdown-action="(action) => handleDropdownAction(action, room)" />
                    </div>
                </div>
            </section>
        </div>
    </DefaultLayout>
</template>
<style scoped>
.btn-add {
    border: 2px solid #ee3672 !important;
    color: #ee3672 !important;
}
</style>