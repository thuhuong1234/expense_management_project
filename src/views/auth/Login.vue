<template>
    <div class="container top-0 position-sticky z-index-sticky">
        <div class="row">
            <div class="col-12">
                <navbar is-blur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
                    btn-background="bg-gradient-success" :dark-mode="true" />
            </div>
        </div>
    </div>
    <main class="main-content main-content-bg mt-0">
        <div class="page-header min-vh-100 ">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-7 mt-2">
                        <div class="card border-0 mb-0 ">
                            <div class="card-header bg-transparent">
                                <h5 class="text-dark text-center mt-2 mb-3">Login</h5>
                            </div>
                            <div class="card-body pt-0 ">
                                <div class="text-center text-muted mb-4 ">
                                    <small>Enter your login information to gain access!</small>
                                </div>
                                <form role="form" class="text-start" @submit.prevent="onSubmit">
                                    <div class="mb-3">
                                        <argon-input name="email" id="email" type="email" placeholder="Email"
                                            :api-error="apiErrors.email" />
                                    </div>
                                    <div class="mb-3">
                                        <argon-input name="password" id="password" type="password"
                                            placeholder="Password" :api-error="apiErrors.password" />
                                    </div>
                                    <div class=" d-flex justify-content-between fs-6">
                                        <div class=" login">
                                            Don't have an account?
                                            <router-link :to="{ name: 'register' }" class="register fs-6">
                                                Register</router-link :to="{ name: 'register' }">
                                        </div>
                                        <router-link :to="{ name: 'forgot-password' }"
                                            class="forgot-password fs-6">Forgot
                                            password?</router-link :to="{ name: 'forgot-password' }">
                                    </div>
                                    <div class="text-center">
                                        <argon-button color="success" type="submit" variant="gradient" full-width
                                            class="my-4 mb-2 text-white ">Login</argon-button>
                                    </div>
                                </form>
                            </div>
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
:deep(.bg-gradient-success) {
    background: linear-gradient(87deg, #2dce89 0, #2dcecc 100%) !important;
}

:deep(.bg-gradient-dark) {
    background: linear-gradient(87deg, #212429 0, #212429 100%) !important;
}

.page-header {
    background-image: url("https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-basic.jpg");
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
    background: rgba(0, 0, 0, 0.4);
    z-index: 0;
}

.fs-6 {
    font-size: 14px !important;
}
</style>