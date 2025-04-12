<script setup>
import downArrWhite from "@/assets/img/down-arrow-white.svg";
import downArrBlack from "@/assets/img/down-arrow-dark.svg";

defineProps({
    btnBackground: {
        type: String,
        default: "",
    },
    isBlur: {
        type: String,
        default: "",
    },
    darkMode: {
        type: Boolean,
        default: false,
    },
});
</script>
<template>
    <nav class="navbar navbar-expand-lg top-0 z-index-3 position-absolute mt-4"
        :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'">
        <a class="navbar-brand ms-2" href="#"> My App</a>
    </nav>
</template>
