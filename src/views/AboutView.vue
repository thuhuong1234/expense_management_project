<template>
  <div class="about-page">
    <header class="about-header">
      <h1 class="title">
        <RouterLink to="/"> Expense Management </RouterLink>
      </h1>
      <div class="action-bar">
        <button class="button-login">Login</button>
      </div>
    </header>
    <main class="about-content">About page</main>
    <footer class="about-footer">
      <p class="copyright-text">&copy; 2024 Expense Management App</p>
      <RouterLink class="footer-link" to="/about">About project</RouterLink>
    </footer>
  </div>
</template>

<script setup></script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}
.about-header {
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
.about-content {
  flex: 1;
}
.about-footer {
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
}
</style>
