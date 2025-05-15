<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import ComplexStatisticsCard from "@/examples/Cards/ComplexStatisticsCard.vue";
import ReviewCard from "@/views/admins/components/ReviewCard.vue"
import ReportsTable from "@/views/admins/components/ReportsTable.vue";
import Navbar from "@/views/admins/components/Navbar.vue";
import DialogForm from "@/views/admins/components/DialogForm.vue";
import ArgonInput from "@/components/Icons/ArgonInput.vue";
import { showToast, showConfirmDialog } from "@/helpers/sweetalertHelper";
import img1 from "@/assets/img/reports1.jpg";
import img2 from "@/assets/img/reports2.jpg";
import img3 from "@/assets/img/reports3.jpg";
import img4 from "@/assets/img/reports4.jpg";
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD";
import { useForm } from "vee-validate";
import * as yup from "yup";
const { getAll, create, deleteById, getById } = useCRUD();
const apiErrors = ref({});
const users = ref([]);
const errorMessage = ref('');
const schema = yup.object({
    name: yup.string().default('').required('Họ và tên là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    phone: yup.string().required('Số điện thoại là bắt buộc').matches(/^\+?\d{10,15}$/, 'Số điện thoại không hợp lệ'),
    password: yup.string()
        .min(8, 'Mật khẩu ít nhất 8 ký tự')
        .max(10, 'Mật khẩu không quá 10 ký tự')
        .matches(/[A-Z]/, ' Mật khẩu chứa ít nhất 1 chữ cái hoa [A-Z]')
        .matches(/[\W_]/, 'Mật khẩu chứa ít nhất 1 ký tự đặc biệt [@, $, !, %, *, ?, &...]')
        .matches(/[0-9]/, 'Mật khẩu chứa ít nhất 1 số [0-9]')
        .required('Mật khẩu là bắt buộc'),
})
const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        email: '',
        phone: '',
        password: '',
    }
})
const createUser = handleSubmit(async (values) => {
    try {
        const response = await create("users", values);
        if (response?.success) {
            showToast("Tạo người dùng thành công", "success");
            await getUsers();
            resetForm();
        }
    } catch (error) {
        errorMessage.value = error.response?.data.message || error.message;
        await showToast(errorMessage.value, 'error');
    }
})
const handleDeleteUser = async (userId) => {
    const user = await getById("users", userId);
    const confirm = await showConfirmDialog("Bạn có chắc chắn muốn xóa?", `${user?.data.name}`);
    if (confirm) {
        try {
            const response = await deleteById("users", userId);
            if (response?.success) {
                showToast("Xóa người dùng thành công", "success");
                await getUsers();
            }
        } catch (error) {
            errorMessage.value = error.response?.data.message || 'Xóa thất bại';
            await showToast(errorMessage.value, 'error');
        }
    }
}
const getUsers = async () => {
    const response = await getAll("users");
    users.value = response.data.users;
}
onMounted(() => {
    getUsers();
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
                        title: 'Tổng số người dùng',
                        value: 80,
                        color: 'info',
                    },
                    {
                        title: 'Người dùng đang hoạt động',
                        value: 17,
                        color: 'success',
                    },
                    {
                        title: 'Người dùng chờ xác minh',
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
                        data-bs-target="#userModal">
                        Thêm người dùng
                    </button>
                    <dialog-form modalTitle="Tạo người dùng" :onSubmit="createUser" id-modal="userModal">
                        <template #modal-body>
                            <div class="card-body">
                                <div class="mb-3">
                                    <argon-input name="name" id="name" type="text" placeholder="Họ và tên"
                                        aria-label="name" :api-error="apiErrors.name" />
                                </div>
                                <div class="mb-3">
                                    <argon-input name="email" id="email" type="email" placeholder="Email"
                                        aria-label="Email" :api-error="apiErrors.email" />
                                </div>
                                <div class="mb-3">
                                    <argon-input name="password" id="password" type="password" placeholder="Mật khẩu"
                                        aria-label="Password" :api-error="apiErrors.password" />
                                </div>
                                <div class="mb-3">
                                    <argon-input name="phone" id="phone" type="text" placeholder="Phone"
                                        aria-label="Phone" :api-error="apiErrors.phone" />
                                </div>
                            </div>
                        </template>
                    </dialog-form>
                </template>
            </navbar>
            <div class="col-12">
                <reports-table :users="users" @delete-user="handleDeleteUser" />
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