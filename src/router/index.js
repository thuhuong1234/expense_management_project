import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboards",
      name: "Bảng điều khiển",
      children: [
        {
          path: "",
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
        {
          path: "profile",
          name: "Tài khoản",
          component: () => import("@/views/auth/Profile.vue"),
        },
      ],
    },
    {
      path: "/pages",
      name: "Trang",
      children: [
        {
          path: "room",
          name: "Phòng",
          children: [
            {
              path: "room-list",
              name: "Danh sách phòng",
              component: () => import("@/views/applications/room/Room.vue"),
            },
            {
              path: "detail/:id",
              name: "Chi tiết phòng",
              component: () =>
                import("@/views/applications/room/DetailRoom.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "Đăng nhập",
      component: () => import("@/views/auth/Login.vue"),
    },
    {
      path: "/register",
      name: "Đăng ký",
      component: () => import("@/views/auth/Register.vue"),
    },
    {
      path: "/forgot",
      name: "Quên mật khẩu",
      component: () => import("@/views/auth/Forgot.vue"),
    },
    {
      path: "/reset-password/:token",
      name: "Đổi mật khẩu",
      component: () => import("@/views/auth/ResetPassword.vue"),
    },
  ],
});

export default router;
