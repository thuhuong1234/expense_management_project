<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import ArgonButton from "@/components/Icons/ArgonButton.vue";
import ArgonSwitch from "@/components/Icons/ArgonSwitch.vue";
import ArgonInput from "@/components/Icons/ArgonInput.vue";
import axios from "@/configs/axios.js";
import { showToast } from '@/helpers/sweetalertHelper';
import Avatar from 'primevue/avatar';
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
const user = ref({});
const errorMessage = ref('');
const isEditing = ref(false);
const fetchProfile = async () => {
    try {
        const response = await axios.get('auth/user');
        user.value = response.data;
        console.log(user.value);

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
    return `http://localhost:3001/uploads/${avatar}`
}
const updateAvatar = async () => {
    if (!newAvatar.value) {
        return;
    }
    try {
        // Assuming you have an endpoint for updating the avatar
        const formData = new FormData();
        formData.append('avatar', newAvatar.value); // Add file or base64 data

        const response = await axios.put(`users/${user.value.id}`, formData);
        user.value.avatar = response.data.avatar; // Update the user's avatar
        showImagePreview.value = false; // Close the modal after update
        showToast('Đã cập nhật avatar!', 'success');
    } catch (error) {
        console.error('Error updating avatar:', error);
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
                                <Button class="font-weight-bold border-none" label="uploadAvatar"
                                    @click="visible = true" />

                                <Dialog v-model:visible="visible" modal header="uploadAvatar"
                                    class="p-fluid bg-gradient-success shadow-2 border-radius-lg ">
                                    <FileUpload name="avatar" @upload="updateAvatar" :multiple="true" accept="image/*"
                                        :maxFileSize="1000000">
                                        <template #empty>
                                            <span>Kéo thả ảnh vào vị trí upload </span>
                                        </template>
                                    </FileUpload>
                                </Dialog>

                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- </div> -->
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
    <div id="notifications" class="card mt-4">
        <div class="card-header">
            <h5>Thông báo</h5>
            <p class="text-sm">
                Chọn cách bạn muốn nhận thông báo. Những cài đặt này áp dụng cho những nội dung bạn đang theo dõi.
            </p>
        </div>
        <div class="card-body pt-0">
            <div class="table-responsive">
                <table class="table mb-0">
                    <thead>
                        <tr>
                            <th class="ps-1" colspan="4">
                                <p class="mb-0">Hoạt động</p>
                            </th>
                            <th class="text-center">
                                <p class="mb-0">Email</p>
                            </th>
                            <th class="text-center">
                                <p class="mb-0">Thông báo đẩy</p>
                            </th>
                            <th class="text-center">
                                <p class="mb-0">SMS</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="ps-1" colspan="4">
                                <div class="my-auto">
                                    <span class="text-dark d-block text-sm">Đề cập</span>
                                    <span class="text-xs font-weight-normal">Thông báo khi người khác đề cập bạn trong
                                        bình luận</span>
                                </div>
                            </td>
                            <td>
                                <argon-switch id="notify-email" name="Email"
                                    class="form-check form-switch mb-0 d-flex align-items-center justify-content-center"
                                    checked />
                            </td>
                            <td>
                                <argon-switch id="notify-push" name="Push"
                                    class="form-check form-switch mb-0 d-flex align-items-center justify-content-center" />
                            </td>
                            <td>
                                <argon-switch id="notify-sms" name="Sms"
                                    class="form-check form-switch mb-0 d-flex align-items-center justify-content-center" />
                            </td>
                        </tr>
                        <tr>
                            <td class="ps-1" colspan="4">
                                <div class="my-auto">
                                    <span class="text-dark d-block text-sm">Bình luận</span>
                                    <span class="text-xs font-weight-normal">Thông báo khi có người bình luận vào nội
                                        dung của bạn</span>
                                </div>
                            </td>
                            <td>
                                <argon-switch id="notify-comment-email" name="Email"
                                    class="form-check form-switch mb-0 d-flex align-items-center justify-content-center"
                                    checked />
                            </td>
                            <td>
                                <argon-switch id="notify-comment-push" name="Push"
                                    class="form-check form-switch mb-0 d-flex align-items-center justify-content-center"
                                    checked />
                            </td>
                            <td>
                                <argon-switch id="notify-comment-sms" name="SMS"
                                    class="form-check form-switch mb-0 d-flex align-items-center justify-content-center" />
                            </td>
                        </tr>
                        <tr>
                            <td class="ps-1" colspan="4">
                                <div class="my-auto">
                                    <span class="text-dark d-block text-sm">Theo dõi</span>
                                    <span class="text-xs font-weight-normal">Thông báo khi ai đó bắt đầu theo dõi
                                        bạn</span>
                                </div>
                            </td>
                            <td>
                                <argon-switch id="notify-follow-email" name="Email"
                                    class="mb-0 d-flex align-items-center justify-content-center" checked />
                            </td>
                            <td>
                                <argon-switch id="notify-follow-push" name="Push"
                                    class="mb-0 d-flex align-items-center justify-content-center" checked />
                            </td>
                            <td>
                                <argon-switch id="notify-follow-sms" name="SMS"
                                    class="mb-0 d-flex align-items-center justify-content-center" checked />
                            </td>
                        </tr>
                        <tr>
                            <td class="ps-1" colspan="4">
                                <div class="my-auto">
                                    <p class="text-sm mb-0">Đăng nhập từ thiết bị mới</p>
                                </div>
                            </td>
                            <td>
                                <argon-switch id="notify-login-email" name="Email"
                                    class="mb-0 d-flex align-items-center justify-content-center" checked />
                            </td>
                            <td>
                                <argon-switch id="notify-login-push" name="Push"
                                    class="mb-0 d-flex align-items-center justify-content-center" checked />
                            </td>
                            <td>
                                <argon-switch id="notify-login-sms" name="SMS"
                                    class="mb-0 d-flex align-items-center justify-content-center" checked />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
            <div class="d-flex align-items-center mb-sm-0 mb-4">
                <div>
                    <argon-switch id="delete-account" name="Xóa tài khoản" />
                </div>
                <div class="ms-2">
                    <span class="text-dark font-weight-bold d-block text-sm">Xác nhận</span>
                    <span class="text-xs d-block">Bạn muốn xóa tài khoản.</span>
                </div>
            </div>
            <argon-button color="secondary" variant="outline" class="mb-0 ms-auto" type="button" name="button"
                size="sm">Vô
                hiệu hóa</argon-button>
            <argon-button color="" variant="gradient" class="mb-0 ms-2 btn-save" type="button" name="button"
                size="sm">Xóa
                tài khoản</argon-button>
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