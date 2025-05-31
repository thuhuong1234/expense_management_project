<script setup>
import Sidenav from "@/examples/Sidenav/Sidenav.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import Configurator from "@/examples/Configurator.vue";
import { sidebarDashboardList } from '@/constants/sidebarList.js';
import { useUiStore } from '@/stores';
import { computed } from 'vue';

const store = useUiStore();
const showSidenav = computed(() => store.showSidenav);
const showNavbar = computed(() => store.showNavbar);
const showFooter = computed(() => store.showFooter);
const showConfig = computed(() => store.showConfig);
const hideConfigButton = computed(() => store.hideConfigButton);

</script>
<template>
  <div class="d-flex min-vh-100">
    <sidenav :list="sidebarDashboardList" v-if="showSidenav" />
    <main class="main-content position-relative max-height-vh-100 h-100 w-100">
      <navbar v-if="showNavbar" />
      <div class="container-fluid">
        <slot />
      </div>
      <app-footer v-show="showFooter" />
      <!-- <configurator :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']" /> -->
    </main>
  </div>
</template>
