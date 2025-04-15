<script setup>
import { useUiStore } from '@/stores/uiStore';
const store = useUiStore();

const closeSidebarOnRouteChange = () => {
    store.isPinned = false;
};

defineProps({
    to: {
        type: [Object, String],
        required: true,
    },
    miniIcon: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});
</script>
<template>
    <li class="nav-item">
        <router-link class="nav-link border-radius-xl" :to="to" @click="closeSidebarOnRouteChange">
            <span class="sidenav-mini-icon"> <i :class="miniIcon"></i> </span>
            <span class="sidenav-normal d-flex gap-2"> <i :class="miniIcon"></i> {{ text }} </span>
        </router-link>
    </li>
</template>
