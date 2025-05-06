<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import ComplexStatisticsCard from "@/examples/Cards/ComplexStatisticsCard.vue";
import ReviewCard from "./components/ReviewCard.vue";
import CategoriesTable from "@/views/admins/components/CategoriesTable.vue";
import Navbar from "./components/Navbar.vue";
import DialogForm from "./components/DialogForm.vue";
import ArgonInput from "@/components/Icons/ArgonInput.vue";
import { showToast, showConfirmDialog } from "@/helpers/sweetalertHelper";
import img1 from "@/assets/img/reports1.jpg";
import img2 from "@/assets/img/reports2.jpg";
import img3 from "@/assets/img/reports3.jpg";
import img4 from "@/assets/img/reports4.jpg";

import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const { getAll, create, deleteById, getById } = useCRUD();
const apiErrors = ref({});
const categories = ref([]);
const errorMessage = ref('');
const schema = yup.object({
    name: yup.string().default('').required('Vui lòng nhập tên danh mục.'),
    categoryType: yup.string().default('')
        .required('Vui lòng chọn loại danh mục.')
        .oneOf(['Expense', 'Income'], 'Loại danh mục không hợp lệ.'),
})
const { handleSubmit, resetForm, values } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        categoryType: '',
    }
})
const createCategory = handleSubmit(async (values) => {
    try {
        const response = await create("categories", values);
        if (response?.success) {
            showToast("Đã tạo danh mục mới thành công.", "success");
            await getCategories();
            resetForm();
        }
    } catch (error) {
        errorMessage.value = error.response?.data.message || error.message;
        await showToast(errorMessage.value, 'error');
    }
})
const deleteCategory = async (categoryId) => {
    const category = await getById("categories", categoryId);
    const confirm = await showConfirmDialog("Bạn có chắc chắn muốn xóa?", `${category?.data.name}`);
    if (confirm) {
        try {
            const response = await deleteById("categories", categoryId);
            if (response?.success) {
                showToast("Xóa danh mục thành công", "success");
                await getCategories();
            }
        } catch (error) {
            errorMessage.value = error.response?.data.message || 'Xóa thất bại';
            await showToast(errorMessage.value, 'error');
        }
    }
}
const getCategories = async () => {
    const response = await getAll("categories");
    categories.value = response.data;
}
onMounted(() => {
    getCategories();
});
</script>
<template>
    <AdminLayout>
        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-12">
                        <complex-statistics-card :img="img1" icon="text-dark ni ni-circle-08" percentage="+55%"
                            :count="{ number: 1600, label: 'Active Users' }" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                        <complex-statistics-card :img="img2" icon="text-dark ni ni-active-40" percentage="+124%"
                            :count="{ number: 357, label: 'Click Events' }" />
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-6 col-md-6 col-12">
                        <complex-statistics-card :img="img3" icon="text-dark ni ni-cart" percentage="+15%"
                            :count="{ number: 2300, label: 'Purchases' }" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                        <complex-statistics-card :img="img4" icon="text-dark ni ni-like-2" percentage="+90%"
                            :count="{ number: 940, label: 'Likes' }" />
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <review-card title="Tổng quan" description="" :reviews="[
                    {
                        title: 'Tổng số danh mục',
                        value: 80,
                        color: 'info',
                    },
                    {
                        title: 'Danh mục chi tiêu',
                        value: 17,
                        color: 'success',
                    },
                    {
                        title: 'Danh mục thu nhập',
                        value: 3,
                        color: 'danger',
                    },
                ]" />
            </div>
        </div>

        <div class="row mt-4">
            <navbar>
                <template #nav-child-item>
                    <button type="button" class="btn btn-outline-primary m-0 btn-add" data-bs-toggle="modal"
                        data-bs-target="#categoryModal" @click="resetForm">
                        Thêm danh mục
                    </button>
                    <dialog-form modalTitle="Tạo danh mục" :onSubmit="createCategory" id-modal="categoryModal">
                        <template #modal-body>
                            <div class="card-body">
                                <div class="mb-3">
                                    <argon-input name="name" id="name" type="text" placeholder="Tên danh mục"
                                        aria-label="name" />
                                </div>
                                <div class="mb-3">
                                    <Field name="categoryType" as="select" class="form-select">
                                        <option value="">-- Chọn loại danh mục --</option>
                                        <option value="Expense">Chi tiêu</option>
                                        <option value="Income">Thu nhập</option>
                                    </Field>
                                    <ErrorMessage name="categoryType" class="text-danger" />
                                </div>
                            </div>
                        </template>
                    </dialog-form>
                </template>
            </navbar>
            <div class="col-12">
                <categories-table :categories="categories" @delete-category="deleteCategory" />
            </div>
        </div>
    </AdminLayout>
</template>
<style scss scoped>
.btn-add {
    border: #ee3672 solid 2px;
    color: #ee3672;

    &:hover {
        color: #ee3672 !important;
    }
}
</style>