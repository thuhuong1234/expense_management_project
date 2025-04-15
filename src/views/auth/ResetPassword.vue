<template>
    <main class="main-content main-content-bg mt-0">
        <div class="page-header min-vh-100 ">
            <div class="container">
                <div class="row">
                    <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
                        <div class="card card-plain ">
                            <div class="pb-0 card-header text-start">
                                <h4 class="font-weight-bolder">Tạo mật khẩu </h4>
                                <p class="mb-0">Nhập mật khẩu mới </p>
                            </div>
                            <div class="card-body">
                                <form role="form" class="text-start" @submit.prevent="onSubmit">
                                    <div class="mb-3">
                                        <argon-input name="password" id="password" type="password"
                                            placeholder="Mật khẩu mới" :api-error="apiErrors.password" />
                                    </div>
                                    <div class=" d-flex justify-content-between fs-6">
                                        <div class="d-flex align-items-center">
                                            <router-link :to="{ name: 'Đăng nhập' }" class="login fs-6"
                                                style="text-decoration: none;">
                                                Đăng ký</router-link>
                                            <span class="mx-1">|</span>
                                            <router-link :to="{ name: 'Đăng ký' }" class="register fs-6"
                                                style="text-decoration: none;">
                                                Đăng nhập</router-link>
                                            <span class="mx-1">|</span>
                                            <router-link :to="{ name: 'Quên mật khẩu' }" class=" fs-6"
                                                style="text-decoration: none;">
                                                Quên mật khẩu</router-link>
                                        </div>
                                        <div class="text-center">
                                            <argon-button color="" type="submit" variant="gradient" full-width
                                                class="btn-send text-white fs-6">Lưu</argon-button>
                                        </div>
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
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRoute } from 'vue-router';
import { showToast } from '@/helpers/sweetalertHelper';
const router = useRoute();
const token = router.params.token;
const apiErrors = ref({});
const errorMessage = ref('');
const schema = yup.object({
    password: yup.string()
        .min(8, 'Mật khẩu ít nhất 8 ký tự')
        .matches(/[A-Z]/, ' Mật khẩu chứa ít nhất 1 chữ cái hoa [A-Z]')
        .matches(/[\W_]/, 'Mật khẩu chứa ít nhất 1 ký tự đặc biệt [@, $, !, %, *, ?, &...]')
        .matches(/[0-9]/, 'Mật khẩu chứa ít nhất 1 số [0-9]')
        .required('Mật khẩu là bắt buộc'),
});

const { handleSubmit } = useForm({
    validationSchema: schema
});

const onSubmit = handleSubmit(async (values) => {
    try {
        apiErrors.value = {};
        console.log(token);

        const response = await axios.post(`/auth/reset-password`, {
            token,
            password: values.password,
        });
        if (response?.data) {
            showToast('Tạo mật khẩu thành công!', 'success');
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

.btn-send {
    background-color: #ee3672 !important;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 16px;
    font-family: 'Lora' !important;
}

.img-login {
    background-position: center center;
    background-size: cover;
    background-image: url('@/assets/img/img-2.jpg');
}

.card-header,
h4 {
    background-color: #f8f9fa !important;
}
</style>