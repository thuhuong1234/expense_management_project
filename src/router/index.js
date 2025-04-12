import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboards",
      name: "Bảng điều khiển",
      component: () => import("@/layouts/DashboardLayout.vue"),
      children: [
        {
          path: "/",
          name: "Trang chủ",
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "landing",
          name: "landing",
          component: () => import("@/views/dashboards/Landing.vue"),
        },
        {
          path: "default",
          name: "default",
          component: () => import("@/views/dashboards/Default.vue"),
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
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/auth/Register.vue"),
    },
    {
      path: "/forgot",
      name: "forgot-password",
      component: () => import("@/views/auth/Forgot.vue"),
    },
    {
      path: "/reset-password/:token",
      name: "reset-password",
      component: () => import("@/views/auth/ResetPassword.vue"),
    },
  ],
});

export default router;
