import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import { createPinia } from "pinia";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "@/argon-dashboard";
import "@/assets/css/fonts.css";
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ArgonDashboard);
app.mount("#app");
