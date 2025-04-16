<script setup>
import DefaultLayout from "@/layouts/DashboardLayout.vue"
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from "vue";
import { useUiStore } from "@/stores/uiStore";
import { useRoomStore } from "@/stores/roomStore";
import { useUserStore } from "@/stores/userStore";
// components
import ComplexProjectCard from "./components/ComplexProjectCard.vue";
import PlaceholderCard from "@/examples/Cards/PlaceholderCard.vue";

// images
import team2 from "@/assets/img/math-svgrepo-com.svg";
import team3 from "@/assets/img/math-svgrepo-com.svg";
import team4 from "@/assets/img/math-svgrepo-com.svg";
import slackLogo from "@/assets/img/math-svgrepo-com.svg";
import setNavPills from "@/assets/js/nav-pills.js";

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
</script>
<template>
    <DefaultLayout>
        <div class="py-4 container-fluid">
            <section class="py-3">
                <div class="row">
                    <div class="text-left col-md-8 me-auto">
                        <h5>Các phòng của bạn sử dụng</h5>
                        <p>
                            Có tất cả:
                            {{ roomList.length }} phòng
                        </p>
                    </div>
                </div>
                <div class="mt-2 row mt-lg-4" v-if="roomList.length > 0">
                    <div class="mb-4 col-lg-4 col-md-6" v-for="room in roomList">

                        <complex-project-card :logo="slackLogo" :title="room.name" :quality="room.quality" description="If everything I did failed - which it doesn&#39;t, I think that
                it actually succeeds." :date-time="room.updatedAt" :members="[team3, team4, team2, team3, team4]"
                            :leader="room.leaderName" :dropdown="[
                                {
                                    label: 'Action',
                                    route: 'javascript:;',
                                },
                                {
                                    label: 'Another action',
                                    route: 'javascript:;',
                                },
                                {
                                    label: 'Something else here',
                                    route: 'javascript:;',
                                },
                            ]" />
                    </div>
                    <div class="mb-4 col-lg-4 col-md-6">
                        <placeholder-card :title="{ text: 'New project', variant: 'h5' }" />
                    </div>
                </div>
            </section>
        </div>
    </DefaultLayout>
</template>