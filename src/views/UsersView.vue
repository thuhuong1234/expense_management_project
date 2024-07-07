<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { onMounted, ref, reactive } from "vue";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const users = ref([]);

const handleFetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (response.ok) {
      users.value = await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      users.value = users.value.filter((item) => item.id !== userId);
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleFetchUsers();
});
</script>

<template>
  <DashboardLayout>
    <div class="users-page">
      <div class="user-form">
        <form>
          <input class="input" type="text" placeholder="Name" />
          <input class="input" type="email" placeholder="Email" />
          <input class="input" type="password" placeholder="Password" />
          <button class="button" type="submit">Save</button>
        </form>
      </div>

      <div class="user-list">
        <table class="table">
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>
              <img :src="user.avatar" width="50" height="50" />
            </td>
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>

            <td>
              <span>{{ user.isAdmin ? "Admin" : "User" }}</span>
            </td>
            <td>
              <button
                class="button"
                type="submit"
                @click="handleDeleteUser(user.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </table>
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
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}
.table {
  width: 100%;
}
th {
  background-color: #007bff;
  color: #fff;
  text-align: left;
  padding: 8px;
}
.user-form {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
}

form {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  border-radius: 10px;
  height: 40px;
  margin-bottom: 5px; /* Optional: adds spacing between inputs */
}

form > .button {
  width: 30%;
}
</style>
