<script setup>
import { computed } from "vue";
import { useUiStore } from "@/stores/uiStore";
import SidenavList from "./SidenavList.vue";
const store = useUiStore();
const isRTL = computed(() => store.isRTL);
const layout = computed(() => store.layout);
const sidebarType = computed(() => store.sidebarType);
</script>
<template>
  <aside id="sidenav-main" class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-4 "
    :class="` ${sidebarType} ${isRTL ? 'fixed-end me-3 rotate-caret' : 'fixed-start ms-3'
      } ${layout === 'landing' ? 'bg-transparent shadow-none' : ''}`">
    <div class="sidenav-header">
      <router-link class="m-0 navbar-brand d-flex align-items-center gap-2 m-0" to="/">
        <img src="@/assets/img/smile-svgrepo-com.svg" class="navbar-brand-img h-100" alt="main_logo" /> <span
          class=" fw-bolder fs-5 mb-0 brand-text "> RoomPay </span>
      </router-link>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list />
  </aside>
</template>
<style lang="scss" scoped></style>
