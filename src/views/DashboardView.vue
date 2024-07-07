<template>
  <div class="dashboard-page">
    <header class="dashboard-header">
      <h1 class="title"><RouterLink> Expense Management </RouterLink></h1>
      <div class="action-bar">
        <button class="button-logout">Logout</button>
      </div>
    </header>
    <main class="dashboard-content">
      <aside class="dashboard-sidebar">
        <nav class="navigation-bar">
          <RouterLink class="navigation-link" to="/dashboard"
            >Dashboard</RouterLink
          >
          <RouterLink class="navigation-link" to="/users">Users</RouterLink>
          <RouterLink class="navigation-link" to="/todos">Todos</RouterLink>
          <RouterLink class="navigation-link" to="/categories"
            >Categories</RouterLink
          >
        </nav>
      </aside>
      <div class="dashboard-details">Dashboard page</div>
    </main>
    <footer class="dashboard-footer">
      <p class="copyright-text">&copy; 2024 Expense Management App</p>
      <RouterLink class="footer-link" to="/about">About project</RouterLink>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  gap: 16px;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #f8f9fa;
}
.button-logout {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}
.dashboard-content {
  flex: 1;
  display: flex;
  padding: 16px 32px;
  gap: 32px;
  justify-content: space-between;
}
.dashboard-sidebar {
  width: 200px;
  background-color: #f8f9fa;
}
.navigation-bar {
  display: flex;
  flex-direction: column;
}
.navigation-link {
  padding: 16px;
}
.navigation-link:hover {
  background-color: #e9ecef;
  cursor: pointer;
}
.dashboard-details {
  flex: 1;
}
.dashboard-footer {
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
}
</style>
