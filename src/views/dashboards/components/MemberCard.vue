<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
const showMenu = ref(false);
const toggleShowMenu = (index) => {
  showMenu.value = { [index]: !showMenu.value[index] };
}
const props = defineProps({
  title: { type: String, default: "Danh sách thành viên", },
  members: {
    type: Array, required: true,
    id: Number,
    avatar: String,
    name: String,
    email: String,
    isLeader: Boolean,
  },
  dropdown: {
    type: Array, default: () => [],
    label: String, route: String,
  },
  selectable: { type: Boolean, default: false, },
  selectedUsers: { type: Array, default: () => [], }
});
const getAvatarUrl = (avatar) => {
  if (!avatar) {
    avatar = 'avatar-default.jpeg';
  }
  return `${import.meta.env.VITE_URL_UPLOAD}${avatar}`
}
const emit = defineEmits(['dropdown-action', 'update:selectedUsers']);
const toggleSelectUser = (id) => {
  const updated = props.selectedUsers.includes(id) ? props.selectedUsers.filter(item => item !== id) : [...props.selectedUsers, id]
  emit('update:selectedUsers', updated);
}
</script>
<template>
  <div class="card h-100">
    <div class="card-header">
      <h5 class="mb-0 text-capitalize text-sm">{{ title }}</h5>
    </div>
    <div class="card-body pt-0">
      <ul class="list-group list-group-flush">
        <li v-for="({ avatar, name, email, isLeader, id }, index) of members" :key="index"
          class="d-flex align-items-center list-group-item px-0">
          <div class="d-flex align-items-center gap-1">
            <div class="col-auto d-flex align-items-center">
              <a href="javascript:;" class="avatar position-relative">
                <img class="img-avatar" alt="Image placeholder" :src="getAvatarUrl(avatar)" />
                <span v-if="isLeader" class="key-icon position-absolute bottom-0 end-0"><i class="fas fa-key text-xs"
                    style="color: #ffb600"></i></span>
              </a>
            </div>
            <div class=" col ml-2">
              <h6 class="mb-0 text-sm">
                <a href="#">{{ name }}</a>
              </h6>
              <p class="mb-0 text-sm text-muted text-xs">
                {{ email }}
              </p>
            </div>
          </div>
          <div class="ms-auto">
            <div class="form-check" v-if="selectable">
              <input type="checkbox" :value="id" :id="'checkbox-' + id" :checked="props.selectedUsers.includes(id)"
                @change="toggleSelectUser(id)" />
            </div>
            <div class="dropdown" v-if="!selectable">
              <button id="navbarDropdownMenuLink" class="btn btn-link text-secondary ps-0 pe-2"
                :class="{ show: showMenu }" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                @click.stop="toggleShowMenu(index)">
                <i class="text-lg fa fa-ellipsis-v"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end me-sm-n4 me-n3" :class="{ show: showMenu[index] }"
                aria-labelledby="navbarDropdownMenuLink">
                <li v-for="(drop, index) in dropdown" :key="index">
                  <a class="dropdown-item" href="#" @click.prevent="$emit('dropdown-action', drop.label)">
                    {{ drop.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
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