<script setup>
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { onMounted, ref, reactive } from "vue";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const todoList = ref([]);
const categoryList = ref([]);

const todoForm = reactive({
  name: undefined,
  amountOfMoney: undefined,
  categoryId: undefined,
});

const addCategoryNamesToTodos = (todos) => {
  return todos.map((todo) => {
    const category = categoryList.value.find(
      (category) => category.id === todo.categoryId
    );
    return { ...todo, categoryName: category ? category.name : "Unknown" };
  });
};
const handleFetchTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (response.ok) {
      todoList.value = await response.json();
      // Add category names to todos
      todoList.value = addCategoryNamesToTodos(todoList.value);
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
      const updatedTodo = addCategoryNamesToTodos([newTodo])[0];
      todoList.value.push(updatedTodo);
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
const editingTodo = ref();
const handleEditTodo = (todo) => {
  editingTodo.value = todo;
  // Copy todo data to form
  todoForm.name = todo.name;
  todoForm.amountOfMoney = todo.amountOfMoney;
  todoForm.categoryId = todo.categoryId;
};

const handleUpdateTodo = async (todoId, payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const updatedTodo = await response.json();
      const index = todoList.value.findIndex(
        (todo) => todo.id === updatedTodo.id
      );
      todoList.value[index] = addCategoryNamesToTodos([updatedTodo])[0];
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async () => {
  try {
    if (editingTodo.value) {
      await handleUpdateTodo(editingTodo.value.id, todoForm);
      editingTodo.value = undefined;
    } else {
      await handleCreateTodo(todoForm);
    }
  } catch (error) {
    console.log(error);
  } finally {
    todoForm.name = undefined;
    todoForm.amountOfMoney = undefined;
    todoForm.categoryId = undefined;
  }
};
const handleFetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (response.ok) {
      categoryList.value = await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  await handleFetchCategories();
  await handleFetchTodos();
});
</script>

<template>
  <DashboardLayout>
    <div class="todo-page">
      <div class="todos-page">
        <form class="todo-form" @submit.prevent="handleSubmit">
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
          <div class="dropdown">
            <select class="dropbtn input" v-model="todoForm.categoryId">
              <option disabled selected value="">Category</option>
              <option
                v-for="category in categoryList"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
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
            <span class="title">{{ todo.categoryName }}</span>
            <span class="money">{{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(todo.amountOfMoney)
            }}</span>

            <button class="button" @click="handleEditTodo(todo)">Edit</button>
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
.dropdown {
  position: relative;
  display: inline-block;
  width: 15%;
  padding: 8px;
}
.dropbtn {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  color: black;
  background-color: #f1f1f1;
  display: block;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
