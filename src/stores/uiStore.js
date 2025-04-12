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

    setSidebarType(payload) {
      this.sidebarType = payload;
    },

    navbarFixed() {
      this.isNavFixed = !this.isNavFixed;
    },

    toggleDefaultLayout() {
      this.showNavbar = !this.showNavbar;
      this.showSidenav = !this.showSidenav;
      this.showFooter = !this.showFooter;
    },

    toggleSidebarColor(payload) {
      this.setSidebarType(payload);
    },
  },
});
