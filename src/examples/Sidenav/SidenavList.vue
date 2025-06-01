<script setup>
import { defineProps } from "vue";
import { useUiStore } from "@/stores/uiStore";
import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";
const logout = () => {
    localStorage.removeItem('access_token');
};
const store = useUiStore();
defineProps({
    list: {
        type: Array,
        required: true
    }
})
</script>
<template>
    <div id="sidenav-collapse-main" class=" navbar-collapse w-auto h-auto h-100">
        <ul class="navbar-nav">
            <li class="nav-item " v-for="(section, index) in list" :key="index">
                <sidenav-collapse :collapse-ref="section.collapseRef" :nav-text="section.navText"
                    :items="section.items">
                    <template #icon>
                        <i :class="section.icon + ' text-dark text-sm opacity-10'"></i>
                    </template>
                    <template #list>
                        <ul class="nav ms-4">
                            <sidenav-item v-for="(item, i) in section.items" :key="i" :to="item.to"
                                :mini-icon="item.miniIcon" :text="item.text" />
                        </ul>
                    </template>
                </sidenav-collapse>
            </li>
            <li class="mt-3 nav-item ">
                <hr class="mt-0 horizontal white" />
                <h6 class="text-xs ps-4 ms-2 text-uppercase font-weight-bolder opacity-6 white"
                    :class="store.isRTL ? 'me-4' : 'ms-2'">
                    Trang tài khoản
                </h6>
            </li>
            <li class="nav-item ">
                <sidenav-item :to="{ name: 'Tài khoản' }" mini-icon="ni ni-single-02 text-dark text-sm opacity-10"
                    text="Hồ sơ" />
                <sidenav-item @click="logout" :to="{ name: 'Đăng nhập' }"
                    mini-icon="ni ni-button-power text-dark text-sm opacity-10" text="Đăng xuất" />
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
::v-deep(.nav-item .nav-link:hover) {
    color: #ee3672 !important;
    font-weight: 1000;

    i {
        color: #ee3672 !important;
    }
}

::v-deep(.active-link) {
    background-color: #f0f0f0;
    color: #ee3672 !important;
    font-weight: bold;

    i {
        color: #ee3672 !important;
    }
}
</style>
