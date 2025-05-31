<script setup>
import { ref } from "vue";
import dayjs from "dayjs";

const showMenu = ref(false);
defineProps({
  logo: { type: String, default: "", },
  title: { type: String, default: "", },
  dateTime: { type: String, default: "", },
  quality: { type: Number, default: 0, },
  members: { type: Array, default: () => [], },
  dropdown: { type: Array, default: () => [], label: String, route: String, },
  leader: { type: [String, Object], default: "", },
  roomId: { type: Number, default: 0, },
  isGridView: { type: Boolean, default: true }
});
defineEmits(['dropdown-action', 'add-users', 'active'])
</script>
<template>
  <div class="card w-100" @click.stop="$emit('active', roomId)" style="cursor: pointer;">
    <div class="p-2" :class="!isGridView ? 'd-flex align-items-center justify-content-between w-100 ' : ''">
      <div class="d-flex" :class="!isGridView ? 'align-items-center justify-content-between gap-2' : ''">
        <div class="p-2 avatar  bg-gradient-dark border-radius-md">
          <img :src="logo" :alt="title" />
        </div>
        <div class="ms-3 text-sm"> {{ title }} </div>
        <div class="ms-auto" v-if="isGridView">
          <div class="dropdown">
            <button id="navbarDropdownMenuLink" class="btn btn-link text-secondary ps-0 pe-2 mb-0"
              :class="{ show: showMenu }" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
              @click.stop="showMenu = !showMenu">
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
      <div :class="!isGridView ? 'd-flex align-items-center justify-content-between gap-2' : ''">
        <p class="my-2 text-xs">Trưởng nhóm: {{ leader }}</p>
        <p class="my-2 text-xs">
          Phòng có tất cả: {{ quality }} thành viên
        </p>
        <hr v-if="isGridView" class="horizontal dark my-1" />
        <div class="d-flex align-items-center justify-content-between " :class="!isGridView ? 'gap-2' : ''">
          <h6 class="mb-0 text-xs">{{ dayjs(dateTime).format('DD/MM/YYYY HH:mm') }}</h6>
          <button type="button" class="z-index-2 btn btn-outline-primary p-1 m-0 text-xs btn-add"
            @click.stop="$emit('add-users')">Thêm thành viên </button>
        </div>
        <div class="ms-auto" v-if="!isGridView">
          <div class="dropdown">
            <button id="navbarDropdownMenuLink" class="btn btn-link text-secondary ps-0 pe-2 mb-0"
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