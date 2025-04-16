<template>
    <main class="main-content main-content-bg mt-0">
        <div class="page-header min-vh-100 ">
            <div class="container">
                <div class="row">
                    <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
                        <div class="card card-plain ">
                            <div class="pb-0 card-header text-start">
                                <h4 class="font-weight-bolder">Đăng ký </h4>
                                <p class="mb-0">Nhập đầy đủ thống tin đăng ký</p>
                            </div>
                            <div class="card-body">
                                <form role="form" class="text-start" @submit.prevent="onSubmit">
                                    <div class="mb-3">
                                        <argon-input name="name" id="name" type="text" placeholder="Họ và tên"
                                            aria-label="name" :api-error="apiErrors.name" />
                                    </div>
                                    <div class="mb-3">
                                        <argon-input name="email" id="email" type="email" placeholder="Email"
                                            aria-label="Email" :api-error="apiErrors.email" />
                                    </div>
                                    <div class="mb-3">
                                        <argon-input name="password" id="password" type="password"
                                            placeholder="Mật khẩu" aria-label="Password"
                                            :api-error="apiErrors.password" />
                                    </div>
                                    <div class="mb-3">
                                        <argon-input name="phone" id="phone" type="text" placeholder="Phone"
                                            aria-label="Phone" :api-error="apiErrors.phone" />
                                    </div>
                                    <div class="text-center">
                                        <argon-button color="#ee3672" type="submit" variant="gradient" full-width
                                            class="my-4 mb-2 text-white btn-register ">
                                            Đăng ký</argon-button>
                                    </div>
                                    <p class="text-center mt-3 mb-0 fs-6">
                                        Đã có tài khoản?
                                        <router-link :to="{ name: 'Đăng nhập' }"
                                            class="text-dark font-weight-bolder fs-6"
                                            style="text-decoration: none;">Đăng nhập</router-link>
                                    </p>
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
                                "Hành trình của bạn bắt đầu từ đây"
                            </h5>
                            <p class="text-white position-relative">
                                Cũng giống như một công ty cần có để duy trì một sản phẩm, một cộng đồng cần có để duy
                                trì một giao thức.
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
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { showToast } from '@/helpers/sweetalertHelper';
const router = useRouter();
const apiErrors = ref({});
const errorMessage = ref('');
const schema = yup.object({
    name: yup.string().default('').required('Họ và tên là bắt buộc'),
    email: yup.string()
        .email('Email không hợp lệ')
        .required('Email là bắt buộc'),
    password: yup.string()
        .min(8, 'Mật khẩu ít nhất 8 ký tự')
        .matches(/[A-Z]/, ' Mật khẩu chứa ít nhất 1 chữ cái hoa [A-Z]')
        .matches(/[\W_]/, 'Mật khẩu chứa ít nhất 1 ký tự đặc biệt [@, $, !, %, *, ?, &...]')
        .matches(/[0-9]/, 'Mật khẩu chứa ít nhất 1 số [0-9]')
        .required('Mật khẩu là bắt buộc'),
    phone: yup.string().required('Số điện thoại là bắt buộc').matches(/^\+?\d{10,15}$/, 'Số điện thoại không hợp lệ'),
});

const { handleSubmit } = useForm({
    validationSchema: schema
});

const onSubmit = handleSubmit(async (values) => {
    try {
        const response = await axios.post('users', values);
        if (response?.data) {
            await showToast("Đăng ký thành công!", "success");
            return router.push({ name: 'dashboard' });
        }
    } catch (error) {
        errorMessage.value = error.response?.data.message || error.message;
        await showToast(errorMessage.value, 'error');
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
    font-size: 16px !important;
}

.main-content {
    font-family: 'Lora' !important;
}

.btn-register {
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

.card-header,
h4 {
    background-color: #f8f9fa !important;
}
</style>