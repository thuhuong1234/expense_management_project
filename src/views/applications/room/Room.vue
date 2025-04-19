<script setup>
import DefaultLayout from "@/layouts/DashboardLayout.vue"
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from "vue";
import { useUiStore } from "@/stores/uiStore";
import { useRoomStore } from "@/stores/roomStore";
import { useUserStore } from "@/stores/userStore";
// components
import ComplexProjectCard from "./components/ComplexProjectCard.vue";
import NavbarRoom from './components/NavbarRoom.vue';
import DialogFormRoom from "./components/DialogFormRoom.vue";
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

onMounted(async () => {
    store.isAbsolute = true;
    setNavPills();
    roomsData.value = await useRoomStore().getRooms();
    roomList.value = await Promise.all(roomsData.value.map(async (room) => {
        const user = await useUserStore().getUserById(room.userId);
        return {
            ...room,
            leaderName: user.name,
        }
    }))
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

const refreshRooms = async () => {
    roomsData.value = await useRoomStore().getRooms()
    roomList.value = await Promise.all(
        roomsData.value.map(async (room) => {
            const user = await useUserStore().getUserById(room.userId)
            return { ...room, leaderName: user.name }
        })
    )
}

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
                            <DialogFormRoom modalTitle="Tạo phòng">
                                <template #modal-body :onSubmit="refreshRooms">
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
                    <div class="mb-4 col-lg-4 col-md-6" v-for="room in roomList">
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
                                }, {
                                    label: 'Lưu trữ',
                                    route: 'javascript:;',
                                }
                            ]" />
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