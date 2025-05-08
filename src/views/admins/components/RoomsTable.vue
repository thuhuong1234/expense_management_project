<script setup>
import dayjs from 'dayjs'
const props = defineProps({
    rooms: {
        type: Array,
        required: true,
        id: Number,
        name: String,
        quality: String,
        updatedAt: String,
    }
})

const emit = defineEmits(['delete-room'])
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
                        <th class="ps-2 text-uppercase text-xs font-weight-bolder">
                            Phòng
                        </th>
                        <th class="text-center text-uppercase text-xs font-weight-bolder">
                            Số người
                        </th>
                        <th class="text-center text-uppercase text-xs font-weight-bolder">
                            Truy cập gần đây
                        </th>
                        <th class="text-center text-uppercase text-xs font-weight-bolder">
                            Sự kiện
                        </th>
                    </tr>
                </thead>
                <tbody v-for="({ id, name, quality, updatedAt }, index) of rooms" :key="index">
                    <tr>
                        <th class="text-center text-uppercase text-sm font-weight-bolder">
                            <input type="checkbox" />
                        </th>
                        <th class="ps-2 text-secondary text-sm font-weight-bolder">
                            {{ name }}
                        </th>
                        <th class="text-center text-secondary text-sm font-weight-bolder">
                            {{ quality }}
                        </th>
                        <th class="text-center text-secondary text-sm font-weight-bolder">
                            {{ dayjs(updatedAt).format('DD/MM/YYYY HH:mm') }}
                        </th>
                        <th class="text-center text-secondary text-sm">
                            <div class="d-flex gap-1 justify-content-center align-items-center">
                                <button class="btn btn-link border border-2 p-2 mb-0">
                                    <i class="ni ni-ruler-pencil text-sm btn-color"></i>
                                </button>
                                <button class="btn btn-link border border-2 p-2  mb-0"
                                    @click="$emit('delete-room', id)">
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