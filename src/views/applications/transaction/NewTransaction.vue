<script setup>
import { onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { useRoomStore, useCategoryStore, useAuthStore, useUserStore } from "@/stores";
import * as yup from "yup";
import useCRUD from "@/composables/useCRUD";
import flatPickr from "vue-flatpickr-component";
import ArgonInput from "@/components/Icons/ArgonInput.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import MemberCard from "@/views/dashboards/components/MemberCard.vue";
import Category from "@/views/applications/category/Category.vue";
import { showToast } from "@/helpers/sweetalertHelper";
const { create } = useCRUD();
const createAt = "";
const config = {
    allowInput: true,
};
const route = useRoute();
const router = useRouter();
const roomStore = useRoomStore();
const authStore = useAuthStore();
const categoryStore = useCategoryStore();
const userStore = useUserStore();
const userId = ref();
const users = ref([]);
const user = ref([]);
const fund = ref([]);
const selectedUsers = ref([]);
const roomsOfUser = ref([]);
const categories = ref([]);
const roomId = Number(route.query?.roomId) || null;
const categoryId = Number(route.query?.categoryId) || null;
const schema = yup.object({
    amount: yup.number().typeError('Vui lòng nhập số tiền').required('Vui lòng nhập số tiền').positive('Số tiền cần lớn hơn 0'),
    description: yup.string().required('Vui lòng nhập ghi chú'),
})
const { handleSubmit } = useForm({
    validationSchema: schema
})
const onSubmit = handleSubmit(async (values) => {
    const data = {
        amount: Number(amount),
        ...values,
        roomId,
        categoryId,
        userTransactions: selectedUsers.value,
    }
    await create('transactions', data);
    showToast('Tạo giao dịch thành công', 'success');
    router.push('/pages/transaction');
})
const selectedCategoryId = ref(categoryId);
const handleCategorySelect = (id) => {
    console.log('categoryId', selectedCategoryId.value);
    selectedCategoryId.value = id;
    router.replace({
        query: {
            ...route.query,
            categoryId: id,
        },
    });
};
onMounted(async () => {
    userId.value = await authStore.getUser();
    categories.value = await categoryStore.getCategories();
    users.value = await roomStore.getUserInfos(roomId);
    fund.value = roomStore.fund;
    user.value = await userStore.getUserById(userId.value.id);
    roomsOfUser.value = user.value.rooms;
});
</script>
<template>
    <DashboardLayout>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="mx-auto col-lg-10 col-12">
                    <div class="mt-4 card card-body">
                        <h6 class="mb-0 font-weight-bolder text-dark">Ghi chú mới</h6>
                        <p class="mb-4 text-sm">Thông tin chi tiết</p>
                        <div class="d-flex align-items-center">
                            <label for="amount" class="w-20 form-label text-sm">Số tiền</label>
                            <argon-input id="amount" class="w-80 text-sm" name="amount" type="number"
                                placeholder="Amount" value="0" />
                        </div>
                        <hr class="my-0 dark" />
                        <div class="d-flex align-items-center">
                            <label for="description" class="w-20 form-label text-sm"> Mô tả</label>
                            <argon-input id="description" class="w-80 text-sm" name="description" type="text"
                                placeholder="Mô tả..." />
                        </div>
                        <hr class="my-0 dark" />
                        <div class="d-flex align-items-center">
                            <label for="createAt" class="w-20 form-label text-sm"> Ngày chi</label>
                            <flat-pickr id="createAt" v-model="createAt"
                                class="mb-3 w-80 form-control datetimepicker text-sm" placeholder="Ngày chi"
                                :config="config"></flat-pickr>
                        </div>
                        <hr class="my-0 dark" />
                        <div class="d-flex align-items-center" v-if="!roomId">
                            <label for="roomId" class="w-20 form-label text-sm">Phòng</label>
                            <select v-model="roomId" class="w-80 form-select text-sm"
                                aria-label="Default select example">
                                <option v-for="room in roomsOfUser" :key="room.id" :value="room.id">{{
                                    room.name }}
                                </option>
                            </select>
                        </div>
                        <div class="p-2">
                            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active font-weight-bold text-sm" id="users-tab"
                                        data-bs-toggle="tab" data-bs-target="#users-tab-pane" type="button" role="tab"
                                        aria-controls="users-tab-pane" aria-selected="true">Người sử dụng</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link font-weight-bold text-sm" id="category-tab"
                                        data-bs-toggle="tab" data-bs-target="#category-tab-pane" type="button"
                                        role="tab" aria-controls="category-tab-pane" aria-selected="false">Danh
                                        mục</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="users-tab-pane" role="tabpanel"
                                    aria-labelledby="users-tab" tabindex="0">
                                    <member-card :members="users" :selectable="true"
                                        v-model:selected-users="selectedUsers" />
                                </div>
                                <div class="tab-pane fade" id="category-tab-pane" role="tabpanel"
                                    aria-labelledby="category-tab" tabindex="0">
                                    <div class="p-2">
                                        <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active text-sm" id="category-expense-tab"
                                                    data-bs-toggle="tab" data-bs-target="#category-expense-tab-pane"
                                                    type="button" role="tab" aria-controls="category-expense-tab-pane"
                                                    aria-selected="true">Chi tiêu</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link text-sm" id="category-income-tab"
                                                    data-bs-toggle="tab" data-bs-target="#category-income-tab-pane"
                                                    type="button" role="tab" aria-controls="category-income-tab-pane"
                                                    aria-selected="false">Thu nhập</button>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="myTabContent">
                                            <div class="tab-pane fade show active" id="category-expense-tab-pane"
                                                role="tabpanel" aria-labelledby="category-expense-tab" tabindex="0">
                                                <category :categories="categories" type="Expense"
                                                    :selected-id="selectedCategoryId" @select="handleCategorySelect" />
                                            </div>
                                            <div class="tab-pane fade" id="category-income-tab-pane" role="tabpanel"
                                                aria-labelledby="category-income-tab" tabindex="0">
                                                <category :categories="categories" type="Income"
                                                    :selected-id="selectedCategoryId" @select="handleCategorySelect" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 d-flex justify-content-end">
                            <button type="button" name="button" class="m-0 btn btn-light">
                                Hủy
                            </button>
                            <button type="button" name="button" class="m-0 btn bg-gradient-success ms-2"
                                @click="onSubmit">
                                Lưu
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </DashboardLayout>

</template>
<style scss scoped>
::v-deep(input.form-control) {
    border: none !important;
}

::v-deep .nav-tabs {
    .nav-item {
        .nav-link {
            border: none !important;
            color: #6d7992 !important;

            &.active {
                border: none !important;
                border-bottom: 2px solid blue !important;
                color: #344767 !important;
            }
        }
    }

}
</style>