<script setup>
import Sidenav from "@/examples/Sidenav/Sidenav.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
</script>
<template>
  <div class="d-flex min-vh-100">
    <sidenav class="w-25" />
    <main class="main-content position-relative w-75 ">
      <navbar />
      <div class="container-fluid">
        <slot name="template"> </slot>
      </div>
    </main>

  </div>

</template>
