<script setup>
import { computed } from "vue";
import ArgonButton from "@/components/Icons/ArgonButton.vue";
import ArgonAvatar from "@/components/Icons/ArgonAvatar.vue";
import img5 from "@/assets/img/team-3.jpg";
import dayjs from "dayjs";
const props = defineProps({
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
    date: String,
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
  onSubmit: {
    type: Function,
    default: () => { }
  }
});
const emit = defineEmits(["save", "edit"]);
const emitSave = () => {
  emit("save", { name: props.header.title });
};
const showUserColumn = computed(() =>
  props.transactions.some(
    (t) => t.userTransactions && t.userTransactions.length > 1
  )
);
</script>
<template>
  <div class="card">
    <div class="p-3 card-header">
      <div class="row">
        <div class="col-md-6">
          <input type="text" @blur="emitSave" placeholder="Nhập tên phòng...."
            class="form-control mb-0 border-0 text-lg font-weight-bold" v-model="header.title" />
        </div>
        <div class="col-md-6 d-flex justify-content-end align-items-center">
          <small>{{ dayjs(header.dateTime).format("DD/MM/YYYY HH:mm") }}</small>
        </div>
      </div>
      <hr class="mb-0 horizontal dark" />
    </div>
    <div class="p-3 pt-0 card-body">
      <div class="row">
        <div class="col-12">
          <div class="table-responsive w-100">
            <table id="order-list" class="table table-flush">
              <thead class="thead-light text-xs">
                <tr>
                  <th class="p-1">Ghi chú</th>
                  <th class="p-1">Thanh toán</th>
                  <th class="p-1 text-center">Ngày tạo</th>
                  <th class="p-1" v-if="showUserColumn">Người dùng</th>
                  <th class="p-1">Danh mục</th>
                </tr>
              </thead>
              <tbody class="item-row"
                v-for="({ description, createdAt ,date, id, room, userTransactions, category, amount, }, index) of transactions"
                :key="index"
                @click.stop="emit('edit', { description, createdAt,date, id, room, userTransactions, category, amount })">
                <tr>
                  <td class="text-xs">
                    <span class="my-2 text-xs">{{ description }}</span>
                  </td>
                  <td class="text-xs">
                    <span class="my-2 text-xs">{{ amount.toLocaleString("vi-VN") + " VND" }}</span>
                  </td>
                  <td class="text-xs text-center">
                    <span class="my-2 text-xs">
                      {{ dayjs(date).format("DD/MM/YYYY") }}</span>
                  </td>
                  <td class="text-xs" v-if="showUserColumn">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar-group">
                          <a v-for="user in userTransactions" :key="user" href="#"
                            class="avatar avatar-xs rounded-circle">
                            <argon-avatar :image="img5" size="xs" circular class="me-2" alt="user image" />
                          </a>
                        </div>
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
</template>
<style scoped>
.item-row :hover {
  cursor: pointer;
  background-color: #e3e4e4;
}
</style>