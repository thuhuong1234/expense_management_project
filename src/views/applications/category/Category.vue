<template>

    <div class="overflow-hidden card">
        <div class="p-3">
            <div class="d-flex flex-column justify-content-between align-items-center">
                <h6 class="mb-0 text-sm font-weight-bold">{{ title }}</h6>
                <div class=" row g-3">
                    <div v-if="isExpense" v-for="item in categories.expense" :key="item.name" class="col-6
                        col-md-3">
                        <div class="d-flex flex-column align-items-center justify-content-center text-center  category-item"
                            role="button" @click="onSubmit">
                            <div class="text-center bg-outline-primary rounded-circle p-2">
                                <i :class="['ni', item.icon, 'fs-7', item.color]"></i>
                            </div>
                            <div class="text-xs mt-2">{{ item.name }}</div>
                        </div>
                    </div>
                    <div v-if="isIncome" v-for="item in categories.income" :key="item.name" class="col-6
                        col-md-3">
                        <div class="d-flex flex-column align-items-center justify-content-center text-center  category-item"
                            role="button" @click="onSubmit">
                            <div class="text-center bg-outline-primary rounded-circle p-2">
                                <i :class="['ni', item.icon, 'fs-7', item.color]"></i>
                            </div>
                            <div class="text-xs mt-2">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    isExpense: {
        type: Boolean,
        default: false,
    },
    isIncome: {
        type: Boolean,
        default: false,
    },
    onSubmit: {
        type: Function,
        default: () => { }
    },
    title: {
        type: String,
        default: ''
    },
    categories: {
        type: Object,
        required: true
    }
});

</script>

<style scoped>
.category-item:hover {
    background-color: #eaf4ff;
    transition: 0.2s ease;
}
</style>