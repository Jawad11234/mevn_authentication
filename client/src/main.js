import { createApp } from "vue";
// import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// Vue.config.productionTip = false;

// Vue.prototype.$http = axios;
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

createApp(App).use(store).use(router).mount("#app");
