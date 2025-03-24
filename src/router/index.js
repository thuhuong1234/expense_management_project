import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },

    {
      path: "/todos",
      name: "todos",
      component: () => import("../views/TodosView.vue"),
    },

    {
      path: "/categories",
      name: "categories",
      component: () => import("../views/CategoriesView.vue"),
    },

    {
      path: "/users",
      name: "users",
      component: () => import("@/views/UsersView.vue"),
    },

    {
      path: "/login",
      name: "auth",
      component: () => import("@/views/auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/auth/Register.vue"),
    },
  ],
});

export default router;
