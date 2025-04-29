<template>
    <div class="p-3">
        <div class="category-scroll-container d-flex justify-content-between flex-nowrap w-100 gap-3">
            <div v-for="({ name, avatarUrl, id }, index) of filteredCategories" :key="index" class="pb-2">
                <div class="d-flex flex-column align-items-center justify-content-center text-center category-item"
                    role="button">
                    <div class="text-center bg-outline-primary rounded-circle img-avatar position-relative ">
                        <img :src="getAvatarUrl(avatarUrl)" alt="avatar" />
                        <div class="btn-add z-index-2 position-absolute end-0 bottom-0 text-dark d-flex align-items-center justify-content-center text-white font-bold "
                            @click.stop="onSubmit(id)">
                            +
                        </div>
                    </div>
                    <div class="text-truncate text-xxs font-weight-bold">{{ name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    onSubmit: {
        type: Function,
        default: () => { }
    },
    categories: {
        type: Array,
        required: true,
        id: Number,
        name: String,
        avatarUrl: String,
        categoryType: String
    }
});
const emit = defineEmits(['onSubmit']);
const getAvatarUrl = (avatar) => {
    if (!avatar) {
        avatar = 'avatar-default.jpeg';
    }
    return `${import.meta.env.VITE_URL_UPLOAD}${avatar}`
}
const filteredCategories = computed(() => {
    return props.categories.filter((category) => category.categoryType === props.type)
})
</script>

<style scoped>
.category-scroll-container {
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
}

.category-scroll-container::-webkit-scrollbar {
    height: 6px;
}

.category-scroll-container::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.img-avatar {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #EE3672;
}

.img-avatar img {
    width: 70%;
    height: 100%;
}

.text-truncate {
    width: 60px;
}

.btn-add {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background-color: #EE3672 !important;
    font-weight: bold;
}

.btn-add:hover {
    cursor: pointer;
    background-color: #6d7992 !important;
}
</style>