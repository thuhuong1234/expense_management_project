<script setup>
import { onMounted, ref } from "vue";
import ProgressLineChart from "@/examples/Charts/ProgressLineChart.vue";
import ProgressDoughnutChart from "./components/ProgressDoughnutChart.vue";
import TodoList from "./components/TodoList.vue";
import useCRUD from "@/composables/useCRUD";
import { useRoute } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import NavbarRoom from "./components/NavbarRoom.vue";
const route = useRoute();
const roomId = route.params?.id || null;

const { getById } = useCRUD();
const room = ref({});
const getRoom = async () => {
    const response = await getById('rooms', roomId);
    room.value = response.data;
}
onMounted(async () => {
    getRoom();

})
</script>
<template>
    <DashboardLayout>
        <div class="py-4 container-fluid">
            <div class="row">
                <NavbarRoom>
                    <template #nav-child-item>
                        <button type="button" class="btn btn-outline-primary m-0 btn-add" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            Thêm ghi chú
                        </button>
                    </template>
                </NavbarRoom>
            </div>
            <div class="mt-4 row">
                <div class="col-lg-8 col-12">
                    <todo-list :header="{ title: 'Ghi chú', dateTime: '23 -30 March 2020' }" :transactions="[
                        {
                            description: 'Check status',
                            createdAt: '24 March 2019',
                            id: '#2414_VR4sf3',
                            room: 'Creative Tim',
                            amount: '$2,500',
                            category: 'Design',
                            action: [
                                { route: 'javascript:;', label: 'Action' },
                                { route: 'javascript:;', label: 'Some other action' },
                            ],
                        },
                        {
                            description: 'Management discussion',
                            createdAt: '24 March 2019',
                            id: '#4411_8sIsdd23',
                            room: 'Apple',
                            isComplete: true,
                            amount: '$2,500',
                            category: 'Design',
                            action: [
                                { route: 'javascript:;', label: 'Action' },
                                { route: 'javascript:;', label: 'Some other action' },
                            ],
                        },
                        {
                            description: 'New channel distribution',
                            createdAt: '25 March 2019',
                            id: '#827d_kdl33D1s',
                            room: 'Slack',
                            amount: '$2,500',
                            category: 'Design',
                            isComplete: true,
                            action: [
                                { route: 'javascript:;', label: 'Action' },
                                { route: 'javascript:;', label: 'Some other action' },
                            ],
                        },
                        {
                            description: 'IOS App development',
                            createdAt: '26 March 2019',
                            id: '#88s1_349DA2sa',
                            room: 'Facebook',
                            amount: '$2,500',
                            category: 'Design',
                            isComplete: false,
                            action: [
                                { route: 'javascript:;', label: 'Action' },
                                { route: 'javascript:;', label: 'Some other action' },
                            ],
                        },
                    ]" />
                </div>
                <div class="mt-4 col-lg-4 col-12 mt-lg-0">
                    <progress-line-chart title="Tasks" :count="480" :progress="60" :chart="{
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
                        data: [40, 45, 42, 41, 40, 43, 40, 42, 39],
                    }" />
                    <progress-doughnut-chart title="Projects" :count="115" :chart="{
                        labels: [
                            {
                                label: 'Done',
                                isCompleted: true,
                            },
                            {
                                label: 'In progress',
                                isCompleted: false,
                            },
                        ],
                        datasets: {
                            label: 'Projects',
                            data: [75, 25],
                        },
                    }" />
                </div>
            </div>
        </div>
    </DashboardLayout>

</template>
