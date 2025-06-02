<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import ArgonButton from "@/components/Icons/ArgonButton.vue";
import ArgonSwitch from "@/components/Icons/ArgonSwitch.vue";
import ArgonInput from "@/components/Icons/ArgonInput.vue";
import axios from "@/configs/axios.js";
import { showToast, showConfirmDialog } from '@/helpers/sweetalertHelper';
import Avatar from 'primevue/avatar';
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useAuthStore } from "@/stores";
import useCRUD from "@/composables/useCRUD";

const authStore = useAuthStore();
const { deleteById } = useCRUD();
const url = import.meta.env.VITE_URL_UPLOAD
const user = ref({});
const errorMessage = ref('');
const isEditing = ref(false);
const fetchProfile = async () => {
    try {
        const response = await axios.get('auth/user');
        user.value = response.data;
    } catch (error) {
        errorMessage.value = error.response?.data.message || error.message;
        showToast(errorMessage.value, 'error');

    }
};
const updateProfile = async () => {
    try {
        const response = await axios.put(`users/${user.value.id}`, user.value);
        user.value = response.data;
        showToast('Đã cập nhật thông tin!', 'success');
        toggleEdit();
    } catch (error) {
        errorMessage.value = error.response?.data.message || error.message;
        showToast(errorMessage.value, 'error');
    }
}
const toggleEdit = () => {
    isEditing.value = !isEditing.value;
}
const showImagePreview = ref(false);
const showToggle = ref(false);
const dropdownRef = ref(null);
const visible = ref(false);
const toggleDropdown = () => {
    showToggle.value = !showToggle.value;
};
const handleClickOutside = (event) => {
    if (
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target)
    ) {
        showToggle.value = false;
    }
};
const newAvatar = ref(null);
const getAvatarUrl = (avatar) => {
    if (!avatar) {
        avatar = 'avatar-default.jpeg';
    }
    return `${url}${avatar}`
}
const updateAvatar = async (event) => {
    const uploadedFile = event.files?.[0];
    if (!uploadedFile) {
        return;
    }
    try {
        // Assuming you have an endpoint for updating the avatar
        const formData = new FormData();
        formData.append('avatar', newAvatar.value); // Add file or base64 data

        const response = await axios.put(`users/${user.value.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        user.value.avatar = response.data.avatar;
        showImagePreview.value = false;
        showToggle.value = false;

        showToast('Đã cập nhật avatar!', 'success');
    } catch (error) {
        console.error('Error updating avatar:', error);
    }
};
const deleteAccount = async () => {
    const confirm = await showConfirmDialog("Bạn có chắc chắn muốn xóa tài khoản?", "Thao tác này không thể hoàn tác.");
    if (confirm) {
        try {
            const response = await deleteById(`users/${user.value.id}`);
            if (response?.data) {
                showToast('Tài khoản đã được xóa thành công.', 'success');
                router.push({ name: 'Đăng nhập' })
            }
        } catch (error) {
            showToast('Xóa tài khoản thất bại.', 'error');
        }
    }
};
onMounted(() => {
    fetchProfile();
    document.addEventListener("mousedown", handleClickOutside);
});
onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleClickOutside);
});
</script>
<template>
    <div id="profile" class="card card-body mt-4 ">
        <!-- <div class="row"> -->
        <div class="row position-relative">
            <div class="col-sm-auto col-4 ">
                <Avatar :image="getAvatarUrl(user.avatar)" shape="circle"
                    class="flex items-center justify-center mr-2 img-avatar" size="sm" @click="toggleDropdown" />
            </div>
            <div class="col-sm-auto col-8 my-auto">
                <div class="h-100">
                    <h5 class="mb-1 font-weight-bolder">{{ user.name }}</h5>
                    <p class="mb-0 font-weight-bold text-sm">{{ user.email }}</p>

                </div>
            </div>
        </div>
        <div v-if="showToggle" ref="dropdownRef" class="image-preview-modal position-absolute  bottom-0 left-0  ">
            <ul class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4" :class="showToggle && 'show'"
                aria-labelledby="dropdownMenuButton">
                <li class="mb-2">
                    <a class="dropdown-item border-radius-md" :href="getAvatarUrl(user.avatar)" target="_blank">
                        <div class="py-1 d-flex">
                            <div class="d-flex flex-column justify-content-center">
                                <span class="font-weight-bold"><i class="fas fa-eye"></i> Xem ảnh đại diện </span>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="mb-2">
                    <div class="dropdown-item border-radius-md" href="#">
                        <div class="py-1 d-flex">
                            <div class="d-flex flex-column justify-content-center">
                                <div class="font-weight-bold"><i class="fas fa-upload"></i> Chỉnh sửa ảnh đại diện
                                </div>

                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div id="basic-info" class="card mt-4">
        <div class="card-header d-flex justify-content-between">
            <h5>Thông tin cơ bản</h5>

            <argon-button class="float-end btn-save" color="" variant="gradient" size="sm" @click="toggleEdit"><i
                    class="fas fa-pen me-2"></i>
                Chỉnh sửa</argon-button>
        </div>
        <div class="card-body pt-0">
            <div class="row">
                <div class=" col-6">
                    <label class="form-label fs-6">Họ và tên </label>
                    <argon-input id="name" type="text" placeholder="Mark" name="name" v-model="user.name"
                        :disabled="!isEditing" />
                </div>
                <div class="col-sm-3 col-6">
                    <label class="form-label fs-6">Giới tính</label>
                    <select id="choices-gender" class="form-control" name="choices-gender" v-model="user.gender"
                        :disabled="!isEditing">
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option value="Undefined">Khác</option>
                    </select>
                </div>
            </div>
            <div class="row">

            </div>
            <div class="row">
                <div class=" col-6">
                    <label class="form-label fs-6 mt-2">Email</label>
                    <argon-input id="email" type="email" name="email" placeholder="example@email.com"
                        v-model="user.email" disabled />
                </div>
            </div>
            <div class="row">
                <div class=" col-6">
                    <label class="form-label fs-6 mt-2">Số điện thoại</label>
                    <argon-input id="phone" type="text" name="phone" placeholder="+84 123 456 789" v-model="user.phone"
                        disabled />
                </div>
            </div>
            <argon-button class="float-end mb-0 btn-save" color="" variant="gradient" size="sm" v-if="isEditing"
                @click="updateProfile">Lưu thông tin
            </argon-button>
        </div>
    </div>
    <div id="password" class="card mt-4">
        <div class="card-header">
            <h5>Đổi mật khẩu</h5>
        </div>
        <div class="card-body pt-0">
            <label class="form-label fs-6">Mật khẩu hiện tại </label>
            <argon-input id="password" type="password" placeholder="Mật khẩu hiện tại" v-model="user.password" />
            <label class="form-label fs-6">Mật khẩu mới</label>
            <argon-input id="new-password" type="password" placeholder="Mật khẩu mới" />
            <label class="form-label fs-6">Xác nhận mật khẩu</label>
            <argon-input id="confirm-password" type="password" placeholder="Xác nhận mật khẩu" />
            <h5 class="mt-5">Yêu cầu mật khẩu</h5>
            <p class="text-muted mb-2">
                Vui lòng làm theo hướng dẫn này để có mật khẩu mạnh:
            </p>
            <ul class="text-muted ps-4 mb-0 float-start">
                <li>
                    <span class="text-sm">Chứa ít nhất 1 số [0-9]</span>
                </li>
                <li>
                    <span class="text-sm">Chứa ít nhất 1 ký tự in hoa [A-Z]</span>
                </li>
                <li>
                    <span class="text-sm">Chứa ít nhất 1 ký tự đặc biệt [!@#$%^&*]</span>
                </li>
                <li>
                    <span class="text-sm">Tối thiểu 8 ký tự và tối đa 16 ký tự</span>
                </li>
            </ul>
            <argon-button class="float-end mt-6 mb-0 btn-save" color="" variant="gradient" size="sm">Lưu mật
                khẩu</argon-button>
        </div>
    </div>
    <div id="delete" class="card mt-4">
        <div class="card-header">
            <h5>Xóa tài khoản</h5>
            <p class="text-sm mb-0">
                Khi bạn xóa tài khoản của mình, không có quay lại. Xin hãy chắc chắn.
            </p>
        </div>
        <div class="card-body d-sm-flex pt-0">
            <argon-button color="" variant="gradient" class="mb-0 ms-2 btn-save" type="button" name="button" size="sm"
                @click="deleteAccount">Xóa tài khoản</argon-button>
        </div>
    </div>
</template>
<style scoped>
.btn-save {
    color: #ee3672 !important;
    border: 1px #ee3672 solid !important;
}

.img-avatar {
    width: 80px;
    height: 80px;
    object-fit: cover;
}
</style>