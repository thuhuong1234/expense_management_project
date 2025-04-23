<script setup>
import { ref } from "vue";

const showMenu = ref(false);
defineProps({
  logo: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  dateTime: {
    type: String,
    default: "",
  },
  quality: {
    type: Number,
    default: 0,
  },
  members: {
    type: Array,
    default: () => [],
  },
  dropdown: {
    type: Array,
    default: () => [],
    label: String,
    route: String,
  },
  leader: {
    type: [String, Object],
    default: "",
  },
});
defineEmits(['dropdown-action'])
</script>
<template>
  <div class="card">
    <div class="p-3 card-body">
      <div class="d-flex">
        <div class="p-2 avatar avatar-xl bg-gradient-dark border-radius-md ">
          <img :src="logo" :alt="title" />
        </div>
        <div class="my-auto ms-3">
          <h6>{{ title }}</h6>
          <div class="avatar-group">
            <a v-for="(member, index) of members" :key="index" href="#" class="avatar avatar-xs rounded-circle"
              data-bs-toggle="tooltip" data-original-title="">
              <img alt="Image placeholder" :src="member" />
            </a>
          </div>
        </div>
        <div class="ms-auto">
          <div class="dropdown">
            <button id="navbarDropdownMenuLink" class="btn btn-link text-secondary ps-0 pe-2"
              :class="{ show: showMenu }" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
              @click="showMenu = !showMenu">
              <i class="text-lg fa fa-ellipsis-v"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end me-sm-n4 me-n3" :class="{ show: showMenu }"
              aria-labelledby="navbarDropdownMenuLink">
              <li v-for="(drop, index) in dropdown" :key="index">
                <a class="dropdown-item" href="#" @click.prevent="$emit('dropdown-action', drop.label)">
                  {{ drop.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p class="mt-3 text-sm">
        {{ leader }}
      </p>
      <p class="mt-3 text-sm">
        Phòng có tất cả: {{ quality }} thành viên
      </p>

      <hr class="horizontal dark" />
      <div class=" d-flex align-items-center">
        <div class="input-group">
          <button type="button" class="z-index-2 btn btn-outline-primary p-1 m-0 text-xs btn-add">Thêm thành
            viên
          </button>
        </div>
        <div class="text-end ">
          <h6 class="mb-0 text-xs">{{ dateTime }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card:hover {
  cursor: pointer;
  border: 2px solid #ee3672;
}

.avatar {
  position: static !important;
}

.btn-add {
  border: 2px solid #ee3672 !important;
  color: #ee3672 !important;
}
</style>