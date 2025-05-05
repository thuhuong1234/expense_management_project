<script setup>
import Sidenav from "@/examples/Sidenav/Sidenav.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import { sidebarDashboardList } from '@/constants/sidebarList.js';
</script>
<template>
  <div class="d-flex min-vh-100">
    <sidenav :list="sidebarDashboardList" />
    <main class="main-content position-relative max-height-vh-100 h-100 w-100">
      <navbar />
      <div class="container-fluid">
        <slot />
      </div>
    </main>
  </div>
</template>
