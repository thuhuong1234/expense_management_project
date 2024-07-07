<template>
  <header class="app-header">
    <h1 class="title"><RouterLink to="/"> Expense Management </RouterLink></h1>
    <div class="action-bar">
      <slot name="action-bar" />
    </div>
  </header>
</template>
<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #f8f9fa;
}
</style>
