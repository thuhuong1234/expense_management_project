<script setup>
import ArgonInput from '@/components/Icons/ArgonInput.vue'
const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    roomId: {
        type: Number,
        default: 0
    },
    userTransactions: {
        type: Array,
        default: () => []
    },
    roomsOfUser: {
        type: Array,
        default: () => []
    },
})

const emits = defineEmits(['save', 'cancel'])
</script>
<template>
    <div class="mt-4 card card-body">
        <h6 class="mb-0 font-weight-bolder text-dark">{{ props.isEdit ? 'Chi tiết ghi chú' : 'Ghi chú mới' }}</h6>
        <p class="mb-4 text-sm">Thông tin chi tiết</p>
        <form role="form" class="form-group" @submit.prevent="emits('save')">
            <div class="d-flex align-items-center">
                <label for="amount" class="w-20 form-label text-sm">Số tiền</label>
                <argon-input id="amount" class="w-80 text-sm" name="amount" type="number" placeholder="Số tiền"
                    value="0" :v-model="amount" />
            </div>
            <hr class="my-0 dark" />
            <div class="d-flex align-items-center">
                <label for="description" class="w-20 form-label text-sm"> Mô tả</label>
                <argon-input id="description" class="w-80 text-sm" name="description" type="text" placeholder="Mô tả..."
                    :v-model="description" />
            </div>
            <hr class="my-0 dark" />
            <div class="d-flex align-items-center">
                <label for="date" class="w-20 form-label text-sm"> Ngày chi</label>
                <div class="input-group w-80 text-sm">
                    <slot name="date" />
                </div>
            </div>
            <hr class="my-0 dark" />
            <!-- <div class="d-flex align-items-center" v-if="!roomId">
                <label for="roomId" class="w-20 form-label text-sm">Phòng</label>
                <select :v-model="roomId" class="input-group w-80 text-sm form-select"
                    aria-label="Default select example">
                    <option value="" selected>-- Chọn phòng --</option>
                    <option v-for="({ id, name }, index) of roomsOfUser" :key="id" :value="id"> {{ name }} </option>
                </select>
            </div> -->
            <div class="p-2">
                <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active font-weight-bold text-sm" id="users-tab" data-bs-toggle="tab"
                            data-bs-target="#users-tab-pane" type="button" role="tab" aria-controls="users-tab-pane"
                            aria-selected="true">Người sử dụng</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link font-weight-bold text-sm" id="category-tab" data-bs-toggle="tab"
                            data-bs-target="#category-tab-pane" type="button" role="tab"
                            aria-controls="category-tab-pane" aria-selected="false">Danh
                            mục</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <slot name="tab-content-users" />
                    <div class="tab-pane fade" id="category-tab-pane" role="tabpanel" aria-labelledby="category-tab"
                        tabindex="0">
                        <div class="p-2">
                            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active text-sm" id="category-expense-tab"
                                        data-bs-toggle="tab" data-bs-target="#category-expense-tab-pane" type="button"
                                        role="tab" aria-controls="category-expense-tab-pane" aria-selected="true">Chi
                                        tiêu</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link text-sm" id="category-income-tab" data-bs-toggle="tab"
                                        data-bs-target="#category-income-tab-pane" type="button" role="tab"
                                        aria-controls="category-income-tab-pane" aria-selected="false">Thu nhập</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <slot name="tab-content-category" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4 d-flex justify-content-end">
                <button type="button" name="button" class="m-0 btn btn-light" @click.stop="emits('cancel')">
                    Hủy
                </button>
                <button type="button" name="button" class="m-0 btn bg-gradient-success ms-2"
                    @click.stop="emits('save')">
                    Lưu
                </button>
            </div>
        </form>
    </div>
</template>