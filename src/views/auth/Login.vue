<template>
    <main class="main-content main-content-bg mt-0">
        <div class="page-header min-vh-100 ">
            <div class="container">
                <div class="row">
                    <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
                        <div class="card card-plain ">
                            <div class="pb-0 card-header text-start">
                                <h4 class="font-weight-bolder">Đăng nhập </h4>
                                <p class="mb-0">Nhập đầy đủ thống tin đăng nhập</p>
                            </div>
                            <div class="card-body">
                                <form role="form" class="text-start" @submit.prevent="onSubmit">
                                    <div class="mb-3">
                                        <argon-input name="email" id="email" type="email" placeholder="Email"
                                            :api-error="apiErrors.email" />
                                    </div>
                                    <div class="mb-3">
                                        <argon-input name="password" id="password" type="password"
                                            placeholder="Mật khẩu" :api-error="apiErrors.password" />
                                    </div>
                                    <div class=" d-flex justify-content-between fs-6">
                                        <div class="login">
                                            Chưa có tài khoản?
                                            <router-link :to="{ name: 'register' }" class="register fs-6"
                                                style="text-decoration: none;">
                                                Đăng ký</router-link :to="{ name: 'register' }">
                                        </div>
                                        <router-link :to="{ name: 'forgot-password' }" class="forgot-password fs-6"
                                            style="text-decoration: none;">Quên mật khẩu?
                                        </router-link :to="{ name: 'forgot-password' }">
                                    </div>
                                    <div class="text-center">
                                        <argon-button color="" type="submit" variant="gradient" full-width
                                            class="my-4 mb-2 text-white btn-login ">Đăng nhập</argon-button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div
                        class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                        <div
                            class=" img-login position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden">
                            <span class="mask bg-gradient-danger opacity-5"></span>

                            <h5 class="mt-5 text-white font-weight-bolder position-relative">
                                "Attention is the new currency"
                            </h5>
                            <p class="text-white position-relative">
                                The more effortless the writing looks, the more effort the
                                writer actually put into the process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <app-footer />
</template>
<script setup>
import { ref } from 'vue';
import ArgonInput from '@/components/Icons/ArgonInput.vue';
import ArgonButton from '@/components/Icons/ArgonButton.vue';
import axios from '@/configs/axios.js';
import { useAuthStore } from '@/stores/authStore';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { showToast } from '@/helpers/sweetalertHelper';
const router = useRouter();
const apiErrors = ref({});
const authStore = useAuthStore();
const errorMessage = ref('');
const schema = yup.object({
    email: yup.string()
        .email('Email không hợp lệ')
        .required('Email là bắt buộc'),
    password: yup.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa (A-Z)')
        .matches(/[\W_]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &...)')
        .required('Mật khẩu là bắt buộc')
});

const { handleSubmit } = useForm({
    validationSchema: schema
});

const onSubmit = handleSubmit(async (values) => {
    try {
        apiErrors.value = {};
        const response = await axios.post('auth/login', values);
        if (response?.data) {
            authStore.login(response?.data?.user, response?.data?.token);
            return router.push({ name: 'dashboard' });
        }
    } catch (error) {
        errorMessage.value = error.response?.data.message || error.message;
        showToast(errorMessage.value, 'error');

    }
}); 
</script>
<style scoped>
.page-header {
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
}

.page-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.fs-6 {
    font-size: 14px !important;
}

.main-content {
    font-family: 'Lora' !important;
}

.btn-login {
    background-color: #ee3672 !important;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 16px;
    font-family: 'Lora' !important;
}

.img-login {
    background-position: center center;
    background-size: cover;
    background-image: url('@/assets/img/img-1.jpg');
}

.card .card-body {
    font-family: 'Lora' !important;
    color: #3e3e46 !important;
}

.card-header,
h4 {
    background-color: #f8f9fa !important;
    color: #3e3e46 !important;
}
</style>