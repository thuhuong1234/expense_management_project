<script setup>
import { ref } from "vue";
import ArgonCheckbox from "@/components/Icons/ArgonCheckbox.vue";
import ArgonButton from "@/components/Icons/ArgonButton.vue";
import ArgonAvatar from "@/components/Icons/ArgonAvatar.vue";
import img2 from "@/assets/img/team-3.jpg";
import img3 from "@/assets/img/team-3.jpg";
import img4 from "@/assets/img/team-3.jpg";
import img5 from "@/assets/img/team-3.jpg";
import img6 from "@/assets/img/team-3.jpg";
const showMenu = ref(false);
defineProps({
    header: {
        type: Object,
        title: String,
        dateTime: String,
        required: true,
    },
    transactions: {
        type: Array,
        required: true,
        description: String,
        createdAt: String,
        id: String,
        room: String,
        category: String,
        amount: String,
        userTransactions: Array,
        isComplete: {
            type: Boolean,
            default: false,
        },
        action: {
            type: Array,
            route: String,
            label: String,
        },
    },
});
</script>
<template>
    <div class="card">
        <div class="p-3 card-header">
            <div class="row">
                <div class="col-md-6">
                    <h6 class="mb-0">{{ header.title }}</h6>
                </div>
                <div class="col-md-6 d-flex justify-content-end align-items-center">
                    <small>{{ header.dateTime }}</small>
                </div>
            </div>
            <hr class="mb-0 horizontal dark" />
        </div>
        <div class="p-3 pt-0 card-body">
            <div class="row">
                <div class="col-12">
                    <div class="card mt-4">
                        <div class="table-responsive w-100">
                            <table id="order-list" class="table table-flush">
                                <thead class="thead-light text-xs">
                                    <tr>
                                        <th class="p-1">Ghi chú </th>
                                        <th class="p-1">Thanh toán</th>
                                        <th class="p-1">Ngày</th>
                                        <th class="p-1">Trạng thái</th>
                                        <th class="p-1">Người dùng</th>
                                        <th class="p-1">Danh mục</th>

                                    </tr>
                                </thead>
                                <tbody
                                    v-for="({ description, createdAt, id, room, isComplete, userTransactions, category, amount }, index) of transactions"
                                    :key="index">
                                    <tr>
                                        <td class="text-xs">
                                            <span class="my-2 text-xs">{{ description }}</span>
                                        </td>
                                        <td class="text-xs">
                                            <span class="my-2 text-xs">{{ amount }}</span>
                                        </td>
                                        <td class="font-weight-bold">
                                            <span class="my-2 text-xs"> {{ createdAt }}</span>
                                        </td>
                                        <td class="text-xs">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <argon-button v-if="isComplete" size="sm" color="success"
                                                    variant="outline"
                                                    class="btn-icon-only btn-rounded mb-0 me-2 btn-sm d-flex align-items-center justify-content-center">
                                                    <i class="fas fa-check" aria-hidden="true"></i>
                                                </argon-button>
                                                <argon-button v-if="!isComplete" size="sm" color="danger"
                                                    variant="outline"
                                                    class="btn-icon-only btn-rounded mb-0 me-2 btn-sm d-flex align-items-center justify-content-center">
                                                    <i class="fas fa-times" aria-hidden="true"></i>
                                                </argon-button>
                                            </div>
                                        </td>
                                        <td class="text-xs">
                                            <div class="d-flex align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <argon-avatar :image="img5" size="xs" circular class="me-2"
                                                        alt="user image" />
                                                    <span>{{ userTransactions }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-xs">
                                            <div class="d-flex align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <span>{{ category }}</span>
                                                </div>
                                            </div>
                                        </td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
