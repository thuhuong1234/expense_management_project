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
                                <h5 class="text-dark text-center mt-2 mb-3">Sign up</h5>
                            </div>
                            <div class="card-body px-lg-5 pt-0">
                                <div class="text-center text-muted mb-4 fs-6">
                                    <p>Or sign in with credentials </p>
                                </div>
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
                                            placeholder="Password" aria-label="Password"
                                            :api-error="apiErrors.password" />
                                    </div>
                                    <div class="mb-3">
                                        <argon-input name="phone" id="phone" type="text" placeholder="Phone"
                                            aria-label="Phone" :api-error="apiErrors.phone" />
                                    </div>
                                    <argon-checkbox>
                                        <label class="form-check-label text-dark fs-6" for="flexCheckDefault">
                                            I agree the
                                            <a href="javascript:;" class="text-dark font-weight-bolder">Terms and
                                                Conditions</a>
                                        </label>
                                    </argon-checkbox>
                                    <div class="text-center">
                                        <argon-button color="success" type="submit" variant="gradient" full-width
                                            class="my-4 mb-2 text-white ">
                                            Sign up</argon-button>
                                    </div>
                                    <p class="text-center mt-3 mb-0 fs-6">
                                        Already have an account?
                                        <router-link :to="{ name: 'login' }" class="text-dark font-weight-bolder fs-6"
                                            style="text-decoration: none;">Sign in</router-link>
                                    </p>
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
import ArgonCheckbox from '@/components/Icons/ArgonCheckbox.vue';
import { useAuthStore } from '@/stores/authStore';
import axios from '@/configs/axios.js';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { showToast } from '@/helpers/sweetalertHelper';
const router = useRouter();
const apiErrors = ref({});
const authStore = useAuthStore();
const errorMessage = ref('');
const schema = yup.object({
    name: yup.string().default('').required('Name is required'),
    email: yup.string()
        .email('Email is incorrect')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password must have at least 8 characters')
        .matches(/[A-Z]/, 'Password must have at least one uppercase letter[A-Z]')
        .matches(/[\W_]/, 'Password must have at least one special character[@, $, !, %, *, ?, &...]')
        .matches(/[0-9]/, 'Password must have at least one number[0-9]')
        .required('Mật khẩu là bắt buộc'),
    phone: yup.string().required('Phone number is required').matches(/^\+?\d{10,15}$/, 'Phone number is incorrect'),
});

const { handleSubmit } = useForm({
    validationSchema: schema
});

const onSubmit = handleSubmit(async (values) => {
    try {
        console.log(values);

        const response = await axios.post('users', values);
        if (response?.data) {
            await showToast("Sign up successfully!", "success");
            return router.push({ name: 'dashboard' });
        }
    } catch (error) {
        errorMessage.value = error.response?.data.message || error.message;
        await showToast(errorMessage.value, 'error');
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