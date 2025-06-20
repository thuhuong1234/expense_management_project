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
          path: "home",
          name: "Trang chủ",
          component: HomeView,
        },
        {
          path: "",
          name: "Landing",
          component: () => import("@/views/dashboards/Landing.vue"),
        },
        {
          path: "default",
          name: "Mặc định",
          component: () => import("@/views/dashboards/Default.vue"),
        },
        {
          path: "profile",
          name: "Tài khoản",
          component: () => import("@/views/auth/Profile.vue"),
        },
      ],
    },
    {
      path: "/pages/room/room-list",
      name: "Danh sách phòng",
      component: () => import("@/views/applications/room/Room.vue"),
    },
    {
      path: "/pages/room/detail/:id",
      name: "Chi tiết phòng",
      component: () => import("@/views/applications/room/DetailRoom.vue"),
    },
    {
      path: "/pages/room/statistics/users-by-room/:id",
      name: "Thống kê chi tiết",
      component: () =>
        import("@/views/applications/room/StatisticUserByRoom.vue"),
    },
    {
      path: "/pages/transaction/create",
      name: "Ghi chú mới",
      component: () =>
        import("@/views/applications/transaction/NewTransaction.vue"),
    },
    {
      path: "/pages/transaction/personal/create",
      name: "Tạo mới",
      component: () =>
        import("@/views/applications/transaction/PersonalTransaction.vue"),
    },
    {
      path: "/pages/transaction/update",
      name: "Chỉnh sửa ghi chú",
      component: () =>
        import("@/views/applications/transaction/UpdatedTransaction.vue"),
    },
    {
      path: "/pages/room/add-user",
      name: "Thêm người dùng",
      component: () => import("@/views/applications/room/UserInRoom.vue"),
    },
    {
      path: "/super-admin-panel",
      name: "Quản lý chung",
      children: [
        {
          path: "users",
          name: "Người dùng",
          component: () => import("@/views/admins/UsersManagement.vue"),
        },
        {
          path: "categories",
          name: "Danh mục",
          component: () => import("@/views/admins/CategoriesManagement.vue"),
        },
        {
          path: "rooms",
          name: "Phòng",
          component: () => import("@/views/admins/RoomsManagement.vue"),
        },
      ],
    },
    {
      path: "/filter",
      name: "Tìm kiếm",
      component: () => import("@/examples/Filter.vue"),
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
