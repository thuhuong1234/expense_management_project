<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { onMounted, ref, reactive } from "vue";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const categoryList = ref([]);

const categoryForm = reactive({
  name: undefined,
});
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
const handleCreateCategory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryForm),
    });
    if (response.ok) {
      const newCategory = await response.json();
      categoryList.value.push(newCategory);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      categoryList.value = categoryList.value.filter(
        (category) => category.id !== id
      );
    }
  } catch (error) {
    console.log(error);
  }
};
const editingCategory = ref();
const handleEditCategory = (category) => {
  editingCategory.value = category;
  categoryForm.name = category.name;
};

const handleUpdateCategory = async (categoryId, payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const updatedCategory = await response.json();
      const index = categoryList.value.findIndex(
        (todo) => todo.id === updatedCategory.id
      );
      categoryList.value[index] = updatedCategory;
    }
  } catch (error) {
    console.log(error);
  }
};
const handleSubmit = async () => {
  try {
    if (editingCategory.value) {
      await handleUpdateCategory(editingCategory.value.id, categoryForm);
      editingCategory.value = undefined;
    } else {
      await handleCreateCategory(categoryForm);
    }
  } catch (error) {
    console.log(error);
  } finally {
    categoryForm.name = undefined;
  }
};

onMounted(() => {
  handleFetchCategories();
});
</script>

<template>
  <DashboardLayout>
    <div class="categories-page">
      <form class="category-form" @submit.prevent="handleSubmit">
        <input class="input" type="text" placeholder="Category name" v-model="categoryForm.name" />
        <button class="button" type="submit">Save</button>
      </form>
      <div class="category-list">
        <div v-if="categoryList.length" class="category-item" v-for="(category, index) in categoryList"
          :key="category.id">
          <span class="no">{{ index + 1 }}</span>
          <span class="title">{{ category.name }}</span>
          <button class="button" @click="handleEditCategory(category)">
            Edit
          </button>
          <button class="button" type="submit" @click="handleDeleteCategory(category.id)">
            Delete
          </button>
        </div>
        <div v-else>No categories found</div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.category-form {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.category-form>.input {
  width: 30%;
  padding: 8px;
}

.category-form>.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.category-item {
  display: flex;
  padding: 8px;
  gap: 8px;
  border-bottom: 1px solid #ccc;
}

.category-item>.title {
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
