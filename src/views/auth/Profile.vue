<script setup>
import NavPill from "@/views/auth/components/NavPill.vue";
import SideNav from "@/views/auth/components/SideNav.vue";
import SideNavItem from "@/views/auth/components/SideNavItem.vue";
import DashboardLayout from '@/layouts/DashboardLayout.vue';
</script>

<template>
    <DashboardLayout>
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-sm-8">
                    <nav-pill />
                </div>
            </div>
            <div class="row mb-5 ">
                <div class="col-lg-3">
                    <side-nav />
                </div>
                <div class="col-lg-9 mt-lg-0 mt-4 side-nav-item">
                    <side-nav-item />
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>