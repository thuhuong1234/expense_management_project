<script setup>
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <div class="home-page">
    <AppHeader>
      <template #action-bar>
        <RouterLink class="button-login" to="/login"> Login </RouterLink>
      </template>
    </AppHeader>
    <main class="home-content">
      <slot />
    </main>
    <footer class="home-footer">
      <p class="copyright-text">&copy; 2024 Expense Management App</p>
      <RouterLink class="footer-link" to="/about">About project</RouterLink>
    </footer>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #f8f9fa;
}
.button-login {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}
.home-content {
  flex: 1;
}
.home-footer {
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
}
</style>
