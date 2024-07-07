<template>
  <div class="dashboard-page">
    <AppHeader>
      <template #action-bar>
        <RouterLink class="button-logout" to="/logout"> Logout </RouterLink>
      </template>
    </AppHeader>
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
      <div class="dashboard-details"><slot /></div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

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
