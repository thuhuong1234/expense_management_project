<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
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
  selectedUsers: { type: Array, default: () => [], },
  isEdit: { type: Boolean, default: false, },
  userTransactions: { type: Array, default: () => [] },
});
const getAvatarUrl = (avatar) => {
  if (!avatar) {
    avatar = 'avatar-default.jpeg';
  }
  return `${import.meta.env.VITE_URL_UPLOAD}${avatar}`
}
const emit = defineEmits(['dropdown-action', 'update:selectedUsers', 'update:userTransactions']);
const toggleSelectUser = (id) => {
  const updatedUsers = props.selectedUsers.includes(id) ? props.selectedUsers.filter(item => item !== id) : [...props.selectedUsers, id];
  emit('update:selectedUsers', updatedUsers);

  if (!props.isEdit) return;
  else {
    const updatedUserTransactions = updatedUsers.map(userId => {
      const userTrans = props.userTransactions.find(item => item.userId === userId);
      return { userId, amount: userTrans ? userTrans.amount : 0 };
    });
    emit('update:userTransactions', updatedUserTransactions);
  }

}
const getAmountByUserId = (id) => {
  const result = props.userTransactions.find(item => item.userId === id);
  return result ? result.amount : 0;
}

const updateUserTransactions = (userId, event) => {
  const inputAmount = Number(event.target.value);

  let users = [...props.userTransactions];
  const user = users.findIndex(item => item.userId === userId);
  if (user !== -1) {
    users[user].amount = inputAmount;
  } else {
    users.push({ userId, amount: inputAmount });
  }
  emit('update:userTransactions', users);
}

</script>
<template>
  <div class="card ">
    <div class="card-header">
      <h5 class="mb-0 text-capitalize text-sm">{{ title }}</h5>
    </div>
    <div class="card-body pt-0">
      <ul class="list-group list-group-flush">
        <li v-for="({ avatar, name, email, isLeader, id }, index) of members" :key="index"
          class="d-flex align-items-center list-group-item px-0 w-100">
          <div :class="['d-flex align-items-center gap-1', selectable ? 'w-65' : 'w-95']">
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
          <div class="ms-auto d-flex align-items-center justify-content-end" :class="selectable ? 'w-35' : 'w-5'">
            <div class="form-check form-switch justify-content-end" v-if="selectable">
              <input v-if="isEdit" :id="`amountOfUser-${id}`" class="mb-0 w-60 text-sm form-control" type="number"
                placeholder="Số tiền" :value="getAmountByUserId(id)" @input="e => updateUserTransactions(id, e)" />
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