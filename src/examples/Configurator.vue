<script setup>
import { computed } from "vue";
import { useUiStore } from "@/stores";
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";

const store = useUiStore();
const isRTL = computed(() => store.isRTL);
const isNavFixed = computed(() => store.isNavFixed);
const sidebarType = computed(() => store.sidebarType);

const sidebarMinimize = () => store.navbarMinimize();
const navbarFixed = () => store.navbarFixed();
const setSidebarType = (type) => store.setSidebarType(type);
const toggleConfigurator = () => store.toggleConfigurator();

const sidebarColor = (color = 'success') => {
    document.querySelector('#sidenav-main')?.setAttribute('data-color', color);
};
const darkMode = () => {
    if (store.darkMode) {
        store.darkMode = false;
        setSidebarType('bg-white');
        deactivateDarkMode();
    } else {
        store.darkMode = true;
        setSidebarType('bg-default');
        activateDarkMode();
    }
};
</script>
<template>
    <div class="fixed-plugin">
        <a class="px-3 py-2 fixed-plugin-button text-dark position-fixed" @click="toggleConfigurator">
            <i class="py-2 fa fa-cog"></i>
        </a>
        <div class="shadow-lg card">
            <div class="pt-3 pb-0 bg-transparent card-header">
                <div class="float-start">
                    <h5 class="mt-3 mb-0">Argon Configurator</h5>
                    <p>See our dashboard options.</p>
                </div>
                <div class="mt-4 float-end" @click="toggleConfigurator">
                    <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
                        <i class="fa fa-close"></i>
                    </button>
                </div>
                <!-- End Toggle Button -->
            </div>
            <hr class="my-1 horizontal dark" />
            <div class="pt-0 card-body pt-sm-3">
                <!-- Sidebar Backgrounds -->
                <div>
                    <h6 class="mb-0">Sidebar Colors</h6>
                </div>
                <div class="switch-trigger background-color">
                    <div class="my-2 badge-colors" :class="isRTL ? 'text-end' : ' text-start'">
                        <span class="badge filter bg-gradient-primary" data-color="primary"
                            @click="sidebarColor('primary')"></span>
                        <span class="badge filter bg-gradient-dark" data-color="dark"
                            @click="sidebarColor('dark')"></span>
                        <span class="badge filter bg-gradient-info" data-color="info"
                            @click="sidebarColor('info')"></span>
                        <span class="badge filter bg-gradient-success" data-color="success"
                            @click="sidebarColor('success')"></span>
                        <span class="badge filter bg-gradient-warning" data-color="warning"
                            @click="sidebarColor('warning')"></span>
                        <span class="badge filter bg-gradient-danger" data-color="danger"
                            @click="sidebarColor('danger')"></span>
                    </div>
                </div>
                <!-- Sidenav Type -->
                <div class="mt-3">
                    <h6 class="mb-0">Sidenav Type</h6>
                    <p class="text-sm">Choose between 2 different sidenav types.</p>
                </div>
                <div class="d-flex">
                    <button id="btn-white" class="btn bg-gradient-success w-100 px-3 mb-2 me-2"
                        :class="sidebarType === 'bg-white' ? ' active' : ''" @click="setSidebarType('bg-white')">
                        White
                    </button>
                    <button id="btn-dark" class="btn bg-gradient-success w-100 px-3 mb-2"
                        :class="sidebarType === 'bg-default' ? 'active' : ''" @click="setSidebarType('bg-default')">
                        Dark
                    </button>
                </div>
                <p class="mt-2 text-sm d-xl-none d-block">
                    You can change the sidenav type just on desktop view.
                </p>
                <!-- Navbar Fixed -->
                <div class="mt-3 d-flex">
                    <h6 class="mb-0">Navbar Fixed</h6>
                    <div class="form-check form-switch ps-0 ms-auto my-auto">
                        <input id="navbarFixed" class="mt-1 form-check-input"
                            :class="isRTL ? 'float-end  me-auto' : ' ms-auto'" type="checkbox" :checked="isNavFixed"
                            @click="navbarFixed" />
                    </div>
                </div>

                <hr class="my-3 horizontal dark" />
                <div class="mt-2 d-flex">
                    <h6 class="mb-0">Sidenav Mini</h6>

                    <div class="form-check form-switch ps-0 ms-auto my-auto">
                        <input id="navbarMinimize" class="mt-1 form-check-input"
                            :class="isRTL ? 'float-end  me-auto' : ' ms-auto'" type="checkbox"
                            :checked="!store.isPinned" @click="sidebarMinimize" />
                    </div>
                </div>
                <hr class="horizontal dark my-3" />
                <div class="mt-2 d-flex">
                    <h6 class="mb-0">Light / Dark</h6>
                    <div class="form-check form-switch ps-0 ms-auto my-auto">
                        <input class="form-check-input mt-1 ms-auto" type="checkbox" :checked="store.darkMode"
                            @click="darkMode" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
