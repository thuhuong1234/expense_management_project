<script setup>
import { computed } from 'vue'
import { getAvatarUrl } from '@/helpers/avatar'
import dayjs from 'dayjs'
const props = defineProps({
  users: {
    type: Array,
    required: true,
    id: Number,
    name: String,
    email: String,
    phone: String,
    updatedAt: String,
    avatar: String,
    isAdmin: Boolean,
  }
})
const role = computed(() => {
  return (isAdmin) => isAdmin ? 'Quản trị viên' : 'Thành viên'
})
const emit = defineEmits(['delete-user'])
</script>
<template>
  <div class="card">
    <div class="table-responsive card-body p-1">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th class="text-center text-uppercase text-xs font-weight-bolder">
              <input type="checkbox" />
            </th>
            <th class="text-center text-uppercase text-xs font-weight-bolder">
              Họ và tên
            </th>
            <th class="text-center text-uppercase text-xs font-weight-bolder">
              Email
            </th>
            <th class="text-center text-uppercase text-xs font-weight-bolder">
              Số điện thoại
            </th>
            <th class="text-center text-uppercase text-xs font-weight-bolder">
              Truy cập gần đây
            </th>
            <th class="text-center text-uppercase text-xs font-weight-bolder">
              Quyền
            </th>
            <th class="text-center text-uppercase text-xs font-weight-bolder">
              Sự kiện
            </th>

          </tr>
        </thead>
        <tbody v-for="({ id, name, email, phone, updatedAt, avatar, isAdmin }, index) of users" :key="index">
          <tr>
            <th class="text-center text-sm">
              <input type="checkbox" />
            </th>
            <th class="text-sm ps-2">
              <div class="col-auto d-flex align-items-center">
                <a href="javascript:;" class="avatar position-relative">
                  <img class="img-avatar" alt="Image placeholder" :src="getAvatarUrl(avatar)" />
                </a>
                <div class="text-sm text-secondary ps-1">
                  {{ name }}
                </div>
              </div>
            </th>
            <th class="text-secondary text-sm ps-2">
              {{ email }}
            </th>
            <th class=" text-center text-secondary text-sm">
              {{ phone }}
            </th>
            <th class="text-center  text-secondary text-sm">
              {{ dayjs(updatedAt).format('DD/MM/YYYY HH:mm') }}
            </th>
            <th class="text-center  text-secondary text-sm">
              {{ role(isAdmin) }}
            </th>

            <th class="text-center text-secondary text-sm">
              <div class="d-flex gap-1 justify-content-center align-items-center">
                <button class="btn btn-link border border-2 p-2 mb-0">
                  <i class="ni ni-ruler-pencil text-sm  btn-color"></i>
                </button>
                <button class="btn btn-link border border-2 p-2  mb-0" @click="$emit('delete-user', id)">
                  <i class="ni ni-fat-remove text-sm  btn-color"></i>
                </button>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scss scoped>
.img-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;

  img {
    width: 100%;
    height: 100%;
  }
}

.btn-color {
  color: #ee3672 !important;
}
</style>