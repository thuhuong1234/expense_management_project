<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useUiStore } from '@/stores/uiStore';

const route = useRoute();
const store = useUiStore();
const closeSidebarOnRouteChange = () => {
    store.isPinned = false;
};
const props = defineProps({
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

const isActive = computed(() => {
    return route.name === props.to.name;
});
</script>
<template>
    <li class="nav-item">
        <router-link class="nav-link border-radius-xl" :class="{ 'active-link': isActive }" :to="to"
            @click="closeSidebarOnRouteChange">
            <span class="sidenav-mini-icon"> <i :class="miniIcon"></i> </span>
            <span class="sidenav-normal d-flex gap-2"> <i :class="miniIcon"></i> {{ text }} </span>
        </router-link>
    </li>
</template>
