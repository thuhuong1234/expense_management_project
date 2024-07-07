<script setup>
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { onMounted, ref, reactive } from "vue";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const todoList = ref([]);

const todoForm = reactive({
  name: undefined,
  amountOfMoney: undefined,
});
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
const handleCreateTodo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoForm),
    });

    if (response.ok) {
      const newTodo = await response.json();
      todoList.value.push(newTodo);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      todoList.value = todoList.value.filter((todo) => todo.id !== id);
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
        <form class="todo-form" @submit.prevent="handleCreateTodo">
          <input
            class="input"
            type="text"
            placeholder="Enter title"
            v-model="todoForm.name"
          />
          <input
            class="input"
            type="text"
            placeholder="Enter amount of money"
            v-model="todoForm.amountOfMoney"
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
            <button
              class="button"
              type="submit"
              @click="handleDeleteTodo(todo.id)"
            >
              Delete
            </button>
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
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}
</style>
