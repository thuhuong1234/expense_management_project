<script setup>
import { computed, ref, onBeforeUpdate, onMounted } from "vue";
import { useUiStore } from "@/stores/uiStore";
import { useRouter,useRoute } from "vue-router";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import { useAuthStore } from "@/stores/authStore";
import Avatar from "primevue/avatar";
const url = import.meta.env.VITE_URL_UPLOAD;
const showMenu = ref(false);
const store = useUiStore();
const authStore = useAuthStore();

const isRTL = computed(() => store.isRTL);
const isNavFixed = computed(() => store.isNavFixed);
const darkMode = computed(() => store.darkMode);
const navbarMinimize = () => store.navbarMinimize();
const route = useRoute();
const user = ref({});
const router = useRouter();

const currentRouteName = computed(() => {
    return route.name;
});

const currentDirectory = computed(() => {
    const matchedRoutes = route.matched;
    const parent = matchedRoutes.length > 1 ? matchedRoutes[0] : null;
    return parent?.name || "Trang chủ";
});

const toggleConfigurator = () => store.toggleConfigurator();

const toggleNavigationOnMobile = () => {
    if (window.innerWidth < 1200) {
        navbarMinimize();
    }
};
const closeMenu = () => {
    setTimeout(() => {
        showMenu.value = false;
    }, 100);
};
const getAvatarUrl = (avatar) => {
    if (!avatar) {
        avatar = 'avatar-default.jpeg';
    }
    return `${url}${avatar}`
}
const showProfile = () => {
    router.push({name: 'Tài khoản'});
}
onBeforeUpdate(() => {
    toggleNavigationOnMobile();
});
onMounted(async () => {
    user.value = await authStore.getUser();
});
</script>
<template>
    <nav id="navbarBlur" class=" text-body w-100 my-3" :class="`${!isNavFixed
        ? 'navbar navbar-main navbar-expand-lg px-0 border-radius-xl shadow-none'
        : `navbar navbar-main navbar-expand-lg px-0 border-radius-xl shadow-none position-sticky ${darkMode ? 'bg-default' : 'bg-white'
        } left-auto top-2 z-index-sticky`
        } ${isRTL ? 'top-0 position-sticky z-index-sticky' : ''}`" v-bind="$attrs" data-scroll="true">
        <div class="px-3 py-1  ms-4 container-fluid">
            <breadcrumbs :current-page="currentRouteName" :current-directory="currentDirectory" />
            <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none " :class="isRTL ? 'me-3' : ''">
                <a href="#" class="p-0 nav-link text-body" @click.prevent="navbarMinimize">
                    <div class="sidenav-toggler-inner ">
                        <i class="sidenav-toggler-line" :class="isNavFixed && !darkMode ? ' opacity-8 bg-white' : 'bg-dark'
                            "></i>
                        <i class="sidenav-toggler-line" :class="isNavFixed && !darkMode ? ' opacity-8 bg-white' : 'bg-dark'
                            "></i>
                        <i class="sidenav-toggler-line" :class="isNavFixed && !darkMode ? ' opacity-8 bg-white' : 'bg-dark'
                            "></i>
                    </div>
                </a>
            </div>
            <div id="navbar" class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
                :class="isRTL ? 'px-0' : 'me-sm-4'">
                <div class="pe-md-3 d-flex align-items-center" :class="isRTL ? 'me-md-auto' : 'ms-md-auto'">
                    <div class="input-group">
                        <span class="input-group-text text-body">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </span>
                        <input type="text" class="form-control"
                            :placeholder="isRTL ? 'أكتب هنا...' : 'Nhập tìm kiếm...'" />
                    </div>
                </div>
                <ul class="navbar-nav justify-content-end">
                    <li class="nav-item d-flex align-items-center">
                            <div class="col-sm-auto col-4 " @click.stop="showProfile">
                                <Avatar :image="getAvatarUrl(user.avatar)" shape="circle"
                                    class="flex items-center justify-center mr-2 img-avatar" size="sm" />
                            </div>
                    </li>
                    <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                        <a id="iconNavbarSidenav" href="#" class="p-0 nav-link text-white"
                            @click.prevent="navbarMinimize">
                            <div class="sidenav-toggler-inner">
                                <i :class="`sidenav-toggler-line ${isNavFixed && !darkMode ? ' opacity-8 bg-white' : 'bg-dark'
                                    }`"></i>
                                <i :class="`sidenav-toggler-line ${isNavFixed && !darkMode ? ' opacity-8 bg-white' : 'bg-dark'
                                    }`"></i>
                                <i :class="`sidenav-toggler-line ${isNavFixed && !darkMode ? ' opacity-8 bg-white' : 'bg-dark'
                                    }`"></i>
                            </div>
                        </a>
                    </li>
                    <li class="px-3 nav-item d-flex align-items-center">
                        <a class="p-0 nav-link" @click="toggleConfigurator">
                            <i :class="`cursor-pointer fa fa-cog fixed-plugin-button-nav ${!isNavFixed || darkMode ? 'text-dark' : 'opacity-8 text-dark'
                                }`"></i>
                        </a>
                    </li>
                    <li class="nav-item dropdown d-flex align-items-center" :class="isRTL ? 'ps-2' : 'pe-2'">
                        <a id="dropdownMenuButton" href="#" :class="`p-0 nav-link ${isNavFixed && !darkMode ? ' opacity-8 text-dark' : 'text-dark'
                            } ${showMenu && 'show'}`" data-bs-toggle="dropdown" aria-expanded="false"
                            @click="showMenu = !showMenu" @blur="closeMenu">
                            <i class="cursor-pointer fa fa-bell"></i>
                        </a>
                        <ul class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4" :class="showMenu && 'show'"
                            aria-labelledby="dropdownMenuButton">
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="#">
                                    <div class="py-1 d-flex">
                                        <div class="my-auto">
                                            <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm me-3"
                                                alt="user image" />
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-1 text-sm font-weight-normal">
                                                <span class="font-weight-bold">New message</span> from
                                                Laur
                                            </h6>
                                            <p class="mb-0 text-xs text-secondary">
                                                <i class="fa fa-clock me-1"></i>
                                                13 minutes ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="py-1 d-flex">
                                        <div class="my-auto">
                                            <img src="../../assets/img/small-logos/logo-spotify.svg"
                                                class="avatar avatar-sm bg-gradient-dark me-3" alt="logo spotify" />
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-1 text-sm font-weight-normal">
                                                <span class="font-weight-bold">New album</span> by
                                                Travis Scott
                                            </h6>
                                            <p class="mb-0 text-xs text-secondary">
                                                <i class="fa fa-clock me-1"></i>
                                                1 day
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="py-1 d-flex">
                                        <div class="my-auto avatar avatar-sm bg-gradient-secondary me-3">
                                            <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>credit-card</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(453.000000, 454.000000)">
                                                                <path class="color-background"
                                                                    d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                                                    opacity="0.593633743" />
                                                                <path class="color-background"
                                                                    d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-1 text-sm font-weight-normal">
                                                Payment successfully completed
                                            </h6>
                                            <p class="mb-0 text-xs text-secondary">
                                                <i class="fa fa-clock me-1"></i>
                                                2 days
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<style scoped>
.img-avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
}
</style>