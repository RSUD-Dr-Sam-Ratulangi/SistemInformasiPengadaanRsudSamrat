import { createApp } from "vue";
import App from "./App.vue";
import router from "./config/router/index.js";
import store from "./config/stateAuth/state";

const isLoggedIn = localStorage.getItem("isLoggedIn");
const username = localStorage.getItem("username");
const vendorUuid = localStorage.getItem("vendorUuid")
const vendorId = localStorage.getItem("vendorId");
const app = createApp(App);

app.use(router);
app.use(store);

if(isLoggedIn) {
    store.commit("SET_IS_LOGGED_IN", true);
    store.commit("SET_USERNAME", username);
    store.commit("SET_VENDOR_UUID", vendorUuid);
    store.commit("SET_VENDOR_ID", vendorId);
}

app.mount("#app");
