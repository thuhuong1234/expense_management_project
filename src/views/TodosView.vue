<script setup>
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { onMounted, ref } from "vue";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const todoList = ref([]);

const handleFetchTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (response.ok) {
      todoList.value = await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  handleFetchTodos();
});
</script>

<template>
  <DashboardLayout>
    <div class="todo-page">
      <div class="todos-page">
        <form class="todo-form">
          <input class="input" type="text" placeholder="Enter title" />
          <input
            class="input"
            type="text"
            placeholder="Enter amount of money"
          />
          <button class="button" type="submit">Save</button>
        </form>
        <div class="todo-list">
          <div
            v-if="todoList.length"
            class="todo-item"
            v-for="(todo, index) in todoList"
            :key="todo.id"
          >
            <span class="no">{{ index + 1 }}</span>
            <span class="title">{{ todo.name }}</span>
            <span class="money">{{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(todo.amountOfMoney)
            }}</span>
          </div>
          <div v-else>No todos found</div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.todo-form {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}
.todo-form > .input {
  width: 30%;
  padding: 8px;
}
.todo-form > .button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}
.todo-item {
  display: flex;
  padding: 8px;
  gap: 8px;
  border-bottom: 1px solid #ccc;
}
.todo-item > .title {
  flex: 1;
  font-weight: bold;
}
</style>
