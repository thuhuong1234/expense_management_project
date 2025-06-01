<script setup>
import { onMounted, computed, toRaw } from "vue";
import { useUiStore } from "@/stores/uiStore";
import Chart from "chart.js/auto";
const store = useUiStore();
const isRTL = computed(() => store.isRTL);

const props = defineProps({
    id: {
        type: String,
        default: "progress-line-chart",
    },
    height: {
        type: Number,
        default: 120,
    },
    icon: {
        type: String,
        default: "calendar-grid-58",
    },
    title: {
        type: String,
        default: "Tasks",
    },
    count: {
        type: Number,
        default: 0,
    },
    progress: {
        type: Number,
        default: 0,
    },
    chart: {
        type: Object,
        required: true,
        labels: {
            type: Array,
            default: [],
        },
        data: {
            type: Array,
            default: [],
        },
        data2: {
            type: Array,
            default: [],
        },
        data3: {
            type: Array,
            default: [],
        },
    },
    onSubmit: {
        type: Function,
        default: () => { },
    },
});

onMounted(() => {
    var ctx = document.getElementById(props.id).getContext("2d");

    var gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);

    let chartStatus = Chart.getChart(props.id);
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    new Chart(ctx, {
        data: {
            labels: props.chart.labels,
            datasets: [
                {
                    type: "line",
                    label: "Tổng",
                    tension: 0.3,
                    pointRadius: 2,
                    pointBackgroundColor: "#ee3672",
                    borderColor: "#ee3672",
                    borderWidth: 2,
                    backgroundColor: gradientStroke1,
                    data: props.chart.data3,
                    maxBarThickness: 6,
                    fill: true,
                },
                {
                    type: "bar",
                    label: "Chi tiêu",
                    tension: 0.3,
                    pointRadius: 2,
                    pointBackgroundColor: "#2dce89 ",
                    borderColor: "#2dce89 ",
                    backgroundColor: 'rgb(45, 206, 137)',
                    data: props.chart.data,
                    maxBarThickness: 25,
                    fill: false,
                },
                {
                    type: "bar",
                    label: "Thu nhập",
                    tension: 0.3,
                    pointRadius: 2,
                    pointBackgroundColor: "#FB8240",
                    borderColor: "#FB8240",
                    backgroundColor: 'rgb(251, 130, 64)',
                    data: props.chart.data2,
                    maxBarThickness: 25,
                    fill: false,
                },

            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            interaction: {
                intersect: false,
                mode: "index",
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        color: "#252f40",
                        padding: 10,
                    },
                },
                // eslint-disable-next-line no-dupe-keys
                y: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: "#9ca2b7",
                    },
                },
                // eslint-disable-next-line no-dupe-keys
                x: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: "#9ca2b7",
                    },
                },
            },
        },
    });
});
</script>
<template>
    <div class="overflow-hidden card">
        <div class="p-3 pb-0 card-header d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <div class="text-center shadow icon icon-shape border-radius-md bg-gradient-success">
                    <i class="text-lg ni opacity-10" :class="`ni-${props.icon}`" aria-hidden="true"></i>
                </div>
                <div :class="isRTL ? 'me-3' : 'ms-3'">
                    <p class="mb-0 text-xs text-capitalize font-weight-bold">
                        {{ props.title }}
                    </p>
                    <div class="progress-wrapper" :class="isRTL ? 'me-auto' : 'ms-auto'">
                        <div type="button" data-toggle="tooltip" data-placement="top"
                            :title="`${100 - props.progress}%`" class="progress" role="progressbar"
                            :aria-valuenow="props.progress" aria-valuemin="0" aria-valuemax="100">
                            <div type=" button" class="progress-bar bg-success text-xxs" data-toggle="tooltip"
                                data-placement="top" :title="`${props.progress}%`" :style="{
                                    width: props.progress + '%'
                                }">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="d-flex align-items-center ">
                <img class="img-avatar" src="@/assets/img/24-right-arrow.svg" alt="..." @click.stop="props.onSubmit" />
            </div>
        </div>
        <div class="p-0 mt-3 card-body">
            <div class="chart">
                <canvas :id="props.id" class="chart-canvas" :height="props.height"></canvas>
            </div>
        </div>
    </div>
</template>
<style scoped>
.progress {
    background-color: #fb8240;
}
</style>