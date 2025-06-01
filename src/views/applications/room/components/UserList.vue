<script setup>
import { getAvatarUrl } from "@/helpers/avatar";
const props = defineProps({
    users: {
        type: Array,
        required: true,
        default: () => [],
    },
});
</script>

<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="mb-0 font-weight-bolder text-success">Tổng kết người dùng</h6>
        </div>
        <div class="card-body pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-xs font-weight-bolder">Người dùng</th>
                            <th class="text-uppercase text-xs font-weight-bolder ">Thu nhập</th>
                            <th class="text-uppercase text-xs font-weight-bolder">Chi tiêu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.userId">
                            <td>
                                <div class="d-flex align-items-center gap-1">
                                    <div class="col-auto d-flex align-items-center">
                                        <img class="img-avatar" alt="Image placeholder"
                                            :src="getAvatarUrl(user?.avatar)" />
                                    </div>
                                    <div class=" col ml-2">
                                        <h6 class="mb-0 text-sm">
                                            <a href="#">{{ user?.name }}</a>
                                        </h6>
                                        <p class="mb-0 text-sm text-muted text-xs">
                                            {{ user?.email }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="text-xs text-success">
                                {{ user.totalIncome.toLocaleString("vi-VN") }} VND
                            </td>
                            <td class="text-xs text-danger">
                                {{ user.totalExpense.toLocaleString("vi-VN") }} VND
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.table thead th {
    background-color: #f8f9fa;
}

.img-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;

}

.img-avatar img {
    width: 100%;
    height: 100%;
}
</style>
