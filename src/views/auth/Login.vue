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
                                <h5 class="text-dark text-center mt-2 mb-3">Sign in</h5>
                                <div class="btn-wrapper text-center">
                                    <a href="javascript:;"
                                        class="btn btn-neutral btn-icon btn-sm mb-0 me-2  shadow fs-8">
                                        <img class="w-30" src="@/assets/img/logos/github.svg" />
                                        Github
                                    </a>
                                    <a href="javascript:;" class="btn btn-neutral btn-icon btn-sm mb-0  shadow fs-8">
                                        <img class="w-30" src="@/assets/img/logos/google.svg" />
                                        Google
                                    </a>
                                </div>
                            </div>
                            <div class="card-body px-lg-5 pt-0 ">
                                <div class="text-center text-muted mb-4 ">
                                    <small>Or sign in with credentials</small>
                                </div>
                                <ArgonAlert color="danger" class="text-red" v-if="errorMessage">
                                    {{ errorMessage }}
                                </ArgonAlert>
                                <form role="form" class="text-start" @submit.prevent="onSubmit">


                                    <div class="mb-3">
                                        <argon-input name="email" id="email" type="email" placeholder="Email"
                                            :api-error="apiErrors.email" />
                                    </div>
                                    <div class="mb-3">
                                        <argon-input name="password" id="password" type="password"
                                            placeholder="Password" :api-error="apiErrors.password" />
                                    </div>
                                    <div class=" d-flex justify-content-between">
                                        <argon-switch id=" rememberMe" name="rememberMe">
                                            <p class="fs-6">Remember me</p>
                                        </argon-switch>
                                        <router-link :to="{ name: 'forgot-password' }"
                                            class="forgot-password fs-6">Forgot password?</router-link
                                            :to="{ name: 'forgot-password' }">
                                    </div>

                                    <div class="text-center">
                                        <argon-button @click="onSubmit" color="success" type="submit" variant="gradient"
                                            full-width class="my-4 mb-2 text-white ">Sign in</argon-button>
                                    </div>
                                    <div class="mb-2 position-relative text-center">
                                        <p
                                            class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                                            or
                                        </p>
                                    </div>
                                    <div class="text-center">
                                        <argon-button color="dark" variant="gradient"
                                            @click="$router.push({ name: 'register' })" full-width
                                            class="mt-2 mb-4 text-white">Sign up</argon-button>
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
import ArgonSwitch from '@/components/Icons/ArgonSwitch.vue';
import ArgonButton from '@/components/Icons/ArgonButton.vue';
import ArgonAlert from '@/components/Icons/ArgonAlert.vue';
import axios from '@/configs/axios.js';
import { useAuthStore } from '@/stores/authStore';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import router from '@/router';
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
        if (error.response?.data?.details) {
            error.response.data.details.forEach(err => {
                apiErrors.value[err.field] = err.message;
            });
        } else {
            errorMessage.value = error.response?.data?.message || 'Có lỗi xảy ra';
        }
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
    font-size: 16px !important;
}
</style>