export const sidebarDashboardList = [
  {
    navText: "Tổng quan ",
    collapseRef: "dashboardExamples",
    icon: "ni ni-shop",
    items: [
      { to: { name: "Landing" }, text: "Giới thiệu", miniIcon: "L" },
      { to: { name: "Mặc định" }, text: "Mặc định", miniIcon: "D" },
    ],
  },
  {
    navText: "Phòng ",
    collapseRef: "roomExamples",
    icon: "ni ni-building",
    items: [
      {
        to: { name: "Danh sách phòng" },
        text: "Danh sách phòng",
        miniIcon: "",
      },
      { to: { name: "" }, text: "Tạo phòng", miniIcon: "" },
    ],
  },
  {
    navText: "Ghi chú",
    collapseRef: "transactionExamples",
    icon: "ni ni-building",
    items: [
      {
        to: { name: "Ghi chú mới" },
        text: "Ghi chú mới",
        miniIcon: "",
      },
    ],
  },
  {
    navText: "Thông báo",
    collapseRef: "notificationExamples",
    icon: "ni ni-bell-55",
    items: [
      { to: { name: "Trang chủ" }, text: "Chi tiêu", miniIcon: "L" },
      { to: { name: "Trang chủ" }, text: "Thu nhập ", miniIcon: "D" },
    ],
  },
];
export const sidebarAdminList = [
  {
    navText: "Tổng quan ",
    collapseRef: "dashboardAdminExamples",
    icon: "ni ni-shop",
    items: [
      { to: { name: "Landing" }, text: "Landing", miniIcon: "L" },
      { to: { name: "Mặc định" }, text: "Default", miniIcon: "D" },
    ],
  },
  {
    navText: "Quản lý chung",
    collapseRef: "adminExamples",
    icon: "ni ni-folder-17",
    items: [
      { to: { name: "Người dùng" }, text: "Người dùng", miniIcon: "" },
      { to: { name: "Danh mục" }, text: "Danh mục", miniIcon: "" },
      { to: { name: "Phòng" }, text: "Phòng", miniIcon: "" },
      { to: { name: "" }, text: "Ghi chú", miniIcon: "" },
      { to: { name: "" }, text: "Thông báo", miniIcon: "" },
    ],
  },
];
