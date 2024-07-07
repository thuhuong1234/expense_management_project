<script setup>
import DashboardLayout from "../layouts/DashboardLayout.vue";
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
          <div class="todo-item">
            <span class="no">1</span>
            <span class="title">Buy a new car</span>
            <span class="money">$50,000</span>
          </div>
          <div class="todo-item">
            <span class="no">2</span>
            <span class="title">Buy a new house</span>
            <span class="money">$150,000</span>
          </div>
          <div class="todo-item">
            <span class="no">3</span>
            <span class="title">Buy a new laptop</span>
            <span class="money">$150,000</span>
          </div>
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
