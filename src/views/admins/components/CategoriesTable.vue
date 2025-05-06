<script setup>
import { getAvatarUrl } from '@/helpers/avatar'
import avatarDefault from "@/assets/img/32-image-3.svg";
const props = defineProps({
    categories: {
        type: Array,
        required: true,
        id: Number,
        name: String,
        categoryType: String,
        avatarUrl: {
            type: String,
            default: avatarDefault,
        }
    }
})

const emit = defineEmits(['delete-category'])
</script>
<template>
    <div class="card">
        <div class="table-responsive card-body p-1">
            <table class="table align-items-center mb-0">
                <thead>
                    <tr>
                        <th class="text-center text-uppercase text-xs font-weight-bolder">
                            <input type="checkbox" />
                        </th>
                        <th class="text-uppercase text-xs font-weight-bolder px-0">
                            Hình ảnh
                        </th>
                        <th class="ps-2 text-uppercase text-xs font-weight-bolder">
                            Tên danh mục
                        </th>
                        <th class="text-center text-uppercase text-xs font-weight-bolder">
                            Loại danh mục
                        </th>
                        <th class="text-center text-uppercase text-xs font-weight-bolder">
                            Sự kiện
                        </th>
                    </tr>
                </thead>
                <tbody v-for="({ id, name, categoryType, avatarUrl }, index) of categories" :key="index">
                    <tr>
                        <th class="text-center text-sm">
                            <input type="checkbox" />
                        </th>
                        <th class="text-sm  px-0">
                            <div class="text-center bg-outline-primary rounded-circle img-avatar ">
                                <img :src="getAvatarUrl(avatarUrl)" alt="avatar" />
                            </div>
                        </th>
                        <th class="text-secondary text-sm ps-2">
                            {{ name }}
                        </th>
                        <th class=" text-center text-secondary text-sm">
                            {{ categoryType }}
                        </th>
                        <th class="text-center text-secondary text-sm">
                            <div class="d-flex gap-1 justify-content-center align-items-center">
                                <button class="btn btn-link border border-2 p-2 mb-0">
                                    <i class="ni ni-ruler-pencil text-sm btn-color"></i>
                                </button>
                                <button class="btn btn-link border border-2 p-2  mb-0"
                                    @click="$emit('delete-category', id)">
                                    <i class="ni ni-fat-remove text-sm  btn-color"></i>
                                </button>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scss scoped>
.img-avatar {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #EE3672;

    img {
        width: 60%;
        height: 100%;
    }

    &.selected {
        background-color: #CCCCCC;
    }
}


.btn-color {
    color: #ee3672 !important;
}
</style>