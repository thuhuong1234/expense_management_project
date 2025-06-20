<script setup>
import DefaultLayout from "@/layouts/DashboardLayout.vue"
import setNavPills from "@/assets/js/nav-pills.js";
import ArgonInput from "@/components/Icons/ArgonInput.vue";
import SubNavbar from "@/examples/Navbars/SubNavbar.vue";
import ComplexProjectCard from "./components/ComplexProjectCard.vue";
import DialogFormRoom from "./components/DialogFormRoom.vue";
import team2 from "@/assets/img/math-svgrepo-com.svg";
import team3 from "@/assets/img/math-svgrepo-com.svg";
import team4 from "@/assets/img/math-svgrepo-com.svg";
import slackLogo from "@/assets/img/math-svgrepo-com.svg";
import { showToast, showConfirmDialog } from "@/helpers/sweetalertHelper";

import { onBeforeMount, onMounted, onBeforeUnmount, ref, computed } from "vue";
import { useUiStore } from "@/stores/uiStore";
import { useForm } from "vee-validate";
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";
import useCRUD from "@/composables/useCRUD";
import axios from "@/configs/axios.js";
import * as yup from "yup";

const authStore = useAuthStore();
const userId = computed(() => authStore.user?.id);
const router = useRouter();
const roomsData = ref([]);
const store = useUiStore();
const roomList = ref([]);
const errorMessage = ref('');
const isGridView = ref(true);
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
const getList = async () => {
    const response = await getAll('rooms');
    roomsData.value = {
        data: response.data.rooms,
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        totalPage: response.data.totalPage,
    }

    if (!Array.isArray(roomsData.value.data)) {
        console.error('Dữ liệu rooms không phải là một mảng:', roomsData.value)
        return
    }
    roomList.value = await Promise.all(
        roomsData.value.data.map(async (room) => {
            const user = await getById('users', room.userId)
            return {
                ...room,
                leaderName: user?.data.name || 'Không rõ',
            }
        })
    )
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
const downloadRooms = async () => {
    const res = await axios.get(`rooms/download`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Danh sách phòng.xlsx`;
    link.click();
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
        <div class="container-fluid">
            <section class="py-3">
                <div class="row">
                    <SubNavbar :show-btn-add="false" @export="downloadRooms" :is-show-grid="isGridView"
                        @toggle="isGridView = !isGridView">
                        <template #btn>
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
                    </SubNavbar>
                </div>
                <div class="mt-2" :class="isGridView ? 'row mt-lg-4' : ''" v-if="roomList.length > 0">
                    <div class="mb-4" :class="isGridView ? 'col-lg-4 col-md-6' : ''" v-for="room in roomList"
                        :key="room.id">
                        <complex-project-card :is-grid-view="isGridView" :logo="slackLogo" :title="room.name"
                            :quality="room.quality" :date-time="room.createdAt"
                            :members="[team3, team4, team2, team3, team4]" :roomId="room.id" :leader="room.leaderName"
                            :dropdown="[
                                {
                                    label: 'Xóa phòng',
                                    route: 'javascript:;',
                                },
                                {
                                    label: 'Rời khỏi phòng',
                                    route: 'javascript:;',
                                },
                            ]" @dropdown-action="(action) => handleDropdownAction(action, room)"
                            @add-users="addUsers(room.id)" @active="goToDetail(room.id)" />
                    </div>
                </div>
            </section>
        </div>
    </DefaultLayout>
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