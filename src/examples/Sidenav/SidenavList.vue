<script setup>
import { useUiStore } from "@/stores/uiStore";

import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";
const store = useUiStore();
</script>
<template>
    <div id="sidenav-collapse-main" class=" navbar-collapse w-auto h-auto h-100">
        <ul class="navbar-nav ">
            <li class="nav-item ">
                <sidenav-collapse collapse-ref="dashboardsExamples" nav-text="Tổng quan">
                    <template #icon>
                        <i class="ni ni-shop text-primary text-sm opacity-10"></i>
                    </template>
                    <template #list>
                        <ul class="nav ms-4">
                            <sidenav-item :to="{ name: 'Landing' }" mini-icon="L" text="Landing" />
                            <sidenav-item :to="{ name: 'Mặc định' }" mini-icon="D" text="Default" />
                        </ul>
                    </template>
                </sidenav-collapse>
            </li>

            <li class="nav-item ">
                <sidenav-collapse collapse-ref="dashboardsExamples" nav-text="Danh mục ">
                    <template #icon>
                        <i class="ni ni-folder-17 text-primary text-sm opacity-10"></i>
                    </template>
                    <template #list>
                        <ul class="nav ms-4">
                            <sidenav-item :to="{ name: 'Trang chủ' }" mini-icon="L" text="Chi tiêu" />
                            <sidenav-item :to="{ name: 'Trang chủ' }" mini-icon="D" text="Thu nhập " />
                        </ul>
                    </template>
                </sidenav-collapse>
            </li>
            <li class="nav-item ">
                <sidenav-collapse collapse-ref="dashboardsExamples" nav-text="Phòng ">
                    <template #icon>
                        <i class="ni ni-building text-primary text-sm opacity-10"></i>
                    </template>
                    <template #list>
                        <ul class="nav ms-4">
                            <sidenav-item :to="{ name: 'Danh sách phòng' }" mini-icon="" text="Danh sách phòng" />
                            <sidenav-item :to="{ name: '' }" mini-icon="" text="Tham gia phòng" />
                            <sidenav-item :to="{ name: '' }" mini-icon="" text="Tạo phòng" />
                        </ul>
                    </template>
                </sidenav-collapse>
            </li>
            <li class="nav-item ">
                <sidenav-collapse collapse-ref="dashboardsExamples" nav-text="Thông báo">
                    <template #icon>
                        <i class="ni ni-bell-55 text-primary text-sm opacity-10"></i>
                    </template>
                    <template #list>
                        <ul class="nav ms-4">
                            <sidenav-item :to="{ name: 'Trang chủ' }" mini-icon="L" text="Chi tiêu" />
                            <sidenav-item :to="{ name: 'Trang chủ' }" mini-icon="D" text="Thu nhập " />
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
                <sidenav-item :to="{ name: 'Tài khoản' }" mini-icon="ni ni-single-02 text-primary text-sm opacity-10"
                    text="Hồ sơ" />
            </li>
            <li class="nav-item ">
                <sidenav-item :to="{ name: 'Đăng nhập' }"
                    mini-icon="ni ni-lock-circle-open text-primary text-sm opacity-10" text="Đăng nhập" />
            </li>
            <li class="nav-item ">
                <sidenav-item :to="{ name: 'Đăng ký' }" mini-icon="ni ni-circle-08 text-primary text-sm opacity-10"
                    text="Đăng ký" />
            </li>
        </ul>
    </div>

</template>
<style lang="scss" scoped>
::v-deep(.nav-item .nav-link:hover) {
    background-color: #ee3672 !important;
}

::v-deep(.nav-item) {
    color: #ffffff !important;

    .nav-link,
    span,
    h6,
    i {
        color: #ffffff !important;
    }
}
</style>
