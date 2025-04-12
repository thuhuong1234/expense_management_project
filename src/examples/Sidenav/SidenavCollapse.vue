<script setup>
import { ref, computed } from "vue";
import { useUiStore } from "@/stores/uiStore";

const store = useUiStore();
const isRTL = computed(() => store.isRTL);

const isExpanded = ref(false);

defineProps({
    collapseRef: {
        type: String,
        required: true,
    },
    navText: {
        type: String,
        required: true,
    },
    collapse: {
        type: Boolean,
        default: true,
    },
});
</script>
<template>
    <a :data-bs-toggle="collapse ? 'collapse' : ''" :href="collapse ? `#${collapseRef}` : collapseRef"
        :aria-controls="collapseRef" :aria-expanded="isExpanded" class="nav-link border-radius-xl" v-bind="$attrs"
        @click="isExpanded = !isExpanded">
        <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
            <slot name="icon"></slot>
        </div>
        <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">{{
            navText
            }}</span>
    </a>
    <div :class="isExpanded ? 'collapse show' : 'collapse'">
        <slot name="list"></slot>
    </div>
</template>
