<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue"
import MiniStatisticsCard from "../../examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "../../examples/Charts/GradientLineChart.vue";
import Carousel from "././components/Carousel.vue";
import MemberCard from "./components/MemberCard.vue";
import TodoListCard from "./components/TodoListCard.vue";
import AuthorsTable from "./components/AuthorsTable.vue";
import CategoriesList from "@/examples/Cards/CategoriesList.vue";

import image2 from "../../assets/img/img-2.jpg";
import image1 from "../../assets/img/img-1.jpg";
import image3 from "../../assets/img/img-3.jpg";

import team1 from "../../assets/img/team-1.jpg";
import team2 from "../../assets/img/team-2.jpg";
import team5 from "../../assets/img/team-5.jpg";
import team4 from "../../assets/img/team-4.jpg";

</script>
<template>
    <DashboardLayout>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-12">
                        <mini-statistics-card title="Today's Money" value="$53,000" description="<span
                class='text-sm font-weight-bolder text-success'
                >+55%</span> since yesterday" :icon="{
                    component: 'ni ni-money-coins',
                    background: 'bg-gradient-primary',
                    shape: 'rounded-circle',
                }" />
                    </div>
                    <div class="col-lg-3 col-md-6 col-12">
                        <mini-statistics-card title="Today's Users" value="2,300" description="<span
                class='text-sm font-weight-bolder text-success'
                >+3%</span> since last week" :icon="{
                    component: 'ni ni-world',
                    background: 'bg-gradient-danger',
                    shape: 'rounded-circle',
                }" />
                    </div>
                    <div class="col-lg-3 col-md-6 col-12">
                        <mini-statistics-card title="New Clients" value="+3,462" description="<span
                class='text-sm font-weight-bolder text-danger'
                >-2%</span> since last quarter" :icon="{
                    component: 'ni ni-paper-diploma',
                    background: 'bg-gradient-success',
                    shape: 'rounded-circle',
                }" />
                    </div>
                    <div class="col-lg-3 col-md-6 col-12">
                        <mini-statistics-card title="Sales" value="$103,430" description="<span
                class='text-sm font-weight-bolder text-success'
                >+5%</span> than last month" :icon="{
                    component: 'ni ni-cart',
                    background: 'bg-gradient-warning',
                    shape: 'rounded-circle',
                }" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7 mb-lg">
                        <gradient-line-chart id="chart-line" title="Sales Overview" description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021" :chart="{
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
                        <carousel :items="[
                            {
                                img: image2,
                                title: 'Get started with Argon',
                                description:
                                    'There’s nothing I really wanted to do in life that I wasn’t able to get good at.',
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
                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <member-card :members="[
                            {
                                img: team1,
                                profile: { name: 'John Michael', link: 'javascript:;' },
                                badge: { label: 'Online', color: 'success' },
                            },
                            {
                                img: team2,
                                profile: { name: 'Alex Smith', link: 'javascript:;' },
                                badge: { label: 'In meeting', color: 'danger' },
                            },
                            {
                                img: team5,
                                profile: { name: 'Samantha Ivy', link: 'javascript:;' },
                                badge: { label: 'Offline', color: 'danger' },
                            },
                            {
                                img: team4,
                                profile: { name: 'John Michael', link: 'javascript:;' },
                                badge: { label: 'Online', color: 'success' },
                            },
                        ]" />
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <todo-list-card :list="[
                            {
                                label: 'Call with Dave',
                                dateTime: '09:30 AM',
                                isChecked: true,
                            },
                            {
                                label: 'Brunch Meeting',
                                dateTime: '11:00 AM',
                            },
                            {
                                label: 'Argon Dashboard Launch',
                                dateTime: '02:00 PM',
                            },
                            {
                                label: 'Winter Hackaton',
                                dateTime: '10:30 AM',
                                isChecked: true,
                            },
                        ]" />
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
    </DashboardLayout>

</template>
