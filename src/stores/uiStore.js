// src/stores/uiStore.js
import { defineStore } from "pinia";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export const useUiStore = defineStore("ui", {
  state: () => ({
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isRTL: false,
    color: "",
    sidebarType: "bg-white",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    bootstrap,
    loading: false,
    error: null,
    success: false,
    messages: null,
    data: null,
    pagination: null,
  }),

  actions: {
    toggleConfigurator() {
      this.showConfig = !this.showConfig;
    },

    navbarMinimize() {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      if (!sidenav_show) return;

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        this.isPinned = true;
      } else if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        this.isPinned = false;
      } else if (window.innerWidth < 1200) {
        sidenav_show.classList.add("g-sidenav-pinned");
        this.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
      }
    },
    navbarFixed() {
      this.isNavFixed = !this.isNavFixed;
    },
    toggleDefaultLayout() {
      this.showNavbar = !this.showNavbar;
      this.showSidenav = !this.showSidenav;
      this.showFooter = !this.showFooter;
    },
    setSidebarType(payload) {
      this.sidebarType = payload;
    },
    toggleSidebarColor(payload) {
      this.setSidebarType(payload);
    },
    setLoading(val) {
      this.loading = val;
    },
    setError(val) {
      this.error = val;
    },
    setSuccess(val) {
      this.success = val;
    },
    setMessages(val) {
      this.messages = val;
    },
    setData(val) {
      this.data = val;
    },
    setPagination(val) {
      this.pagination = val;
    },
  },
});
