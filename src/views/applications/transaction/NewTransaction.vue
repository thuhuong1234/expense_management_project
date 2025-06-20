<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import MemberCard from "@/views/dashboards/components/MemberCard.vue";
import Category from "@/views/applications/category/Category.vue";
import TransactionForm from "./components/TransactionForm.vue";
import flatPickr from 'vue-flatpickr-component'

import { onMounted, ref, computed } from "vue";
import { useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { useRoomStore, useCategoryStore, useAuthStore, useUserStore } from "@/stores";
import * as yup from "yup";
import useCRUD from "@/composables/useCRUD";
import { showToast } from "@/helpers/sweetalertHelper";
import dayjs from 'dayjs'
const { create } = useCRUD();
const config = {
    allowInput: true,
    dateFormat: 'Y-m-d',
    defaultDate: new Date(),
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
const roomId = ref(Number(route.query?.roomId)) || null;
const categoryId = ref(Number(route.query?.categoryId)) || null;
const schema = yup.object({
    amount: yup.number().typeError('Vui lòng nhập số tiền').required('Vui lòng nhập số tiền').positive('Số tiền cần lớn hơn 0'),
    description: yup.string().required('Vui lòng nhập ghi chú'),
})
const { handleSubmit, resetForm, values, setFieldValue } = useForm({
    validationSchema: schema,
    initialValues: {
        amount: 0,
        description: '',
        date: new Date() || null,
        roomId: roomId.value,
        categoryId: categoryId.value,
        userTransactions: [],
    }
})

const getDate = computed({
    get: () => values.date,
    set: (value) => setFieldValue('date', dayjs(value).startOf('day').toISOString()),
})

const onSubmit = handleSubmit(async (values) => {
    const data = {
        amount: Number(amount),
        ...values,
        roomId: roomId.value,
        categoryId: categoryId.value,
        userTransactions: selectedUsers.value,
    }

    await create('transactions', data);

    resetForm();
    showToast('Tạo giao dịch thành công', 'success');
})
const onClose = () => {
    router.back();
}
const selectedCategoryId = ref(categoryId);
const handleCategorySelect = (id) => {
    selectedCategoryId.value = id;
    router.replace({
        query: {
            ...route.query,
            categoryId: id,
        },
    });
    categoryId.value = id;
};
onMounted(async () => {
    userId.value = await authStore.getUser();
    categories.value = await categoryStore.getCategories();
    users.value = await roomStore.getUserInfos(roomId.value);
    fund.value = roomStore.fund;
    user.value = await userStore.getUserById(userId.value.id);
    roomsOfUser.value = user.value.rooms;
});
</script>
<template>
    <DashboardLayout>
        <div class="container-fluid">
            <div class="row">
                <div class="mx-auto col-lg-10 col-12">
                    <transaction-form @save="onSubmit" @cancel="onClose" :is-edit="false" :amount="values.amount"
                        :description="values.description" :roomId="roomId" :rooms-of-user="roomsOfUser">
                        <template #date>
                            <flat-pickr id="date" v-model="getDate"
                                class="mb-3 w-80 form-control datetimepicker text-sm" placeholder="Ngày chi"
                                :config="config"></flat-pickr>
                        </template>
                        <template #tab-content-users>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="users-tab-pane" role="tabpanel"
                                    aria-labelledby="users-tab" tabindex="0">
                                    <member-card :members="users" :selectable="true"
                                        v-model:selected-users="selectedUsers" />
                                </div>

                            </div>
                        </template>
                        <template #tab-content-category>
                            <div class="tab-pane fade show active" id="category-expense-tab-pane" role="tabpanel"
                                aria-labelledby="category-expense-tab" tabindex="0">
                                <category :categories="categories" type="Expense" :selected-id="selectedCategoryId"
                                    @select="handleCategorySelect" />
                            </div>
                            <div class="tab-pane fade" id="category-income-tab-pane" role="tabpanel"
                                aria-labelledby="category-income-tab" tabindex="0">
                                <category :categories="categories" type="Income" :selected-id="selectedCategoryId"
                                    @select="handleCategorySelect" />
                            </div>
                        </template>
                    </transaction-form>
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