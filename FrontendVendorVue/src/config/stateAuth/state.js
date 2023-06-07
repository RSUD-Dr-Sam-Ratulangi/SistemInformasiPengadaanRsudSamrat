import { createStore } from "vuex";
import router from "../router";
import axios from "axios";

const store = createStore({
  state: {
    isLoggedIn: false,
    isLoggedOut: false,
    message: "",
    username: null,
    vendoruuid: null,
    vendorid: null,
    isPasswordIncorrect: false,
  },
  mutations: {
    SET_IS_LOGGED_IN(state, value) {
      state.isLoggedIn = value;
    },
    SET_IS_LOGGED_OUT(state, value) {
      state.isLoggedOut = value;
    },
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    SET_USERNAME(state, username) {
      state.username = username;
    },
    SET_PASSWORD_INCORRECT(state, value) {
      state.isPasswordIncorrect = value;
    },
    SET_VENDOR_UUID(state, vendoruuid) {
      state.vendoruuid = vendoruuid;
    },
    SET_VENDOR_ID(state, vendorid) {
      state.vendorid = vendorid;
    },
  },
  actions: {
    login({ commit }, vendor) {
      axios
        .post("http://rsudsamrat.site:8080/owners/login", vendor)
        .then((response) => {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", vendor.username);
          commit("SET_IS_LOGGED_IN", true);
          commit("SET_MESSAGE", response.data);
          commit("SET_USERNAME", vendor.username);
          commit("SET_IS_LOGGED_OUT", true);
          // mengambil vendor uuid (getvendorbyownerid)
          axios
            .get(
              `http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors/owner/${response.data.id}`
            )
            .then((vendorResponse) => {
              commit("SET_VENDOR_UUID", vendorResponse.data.vendoruuid);
              commit("SET_VENDOR_ID", vendorResponse.data.id);
              localStorage.setItem("vendorUuid", vendorResponse.data.vendoruuid);
              localStorage.setItem("vendorId", vendorResponse.data.id)
              console.log(vendorResponse.data.vendoruuid);
              router.push({ path: "/", query: { user: vendor.username } });
            })
            .catch((err) => {
              console.log(`Gagal mengambil VendorUUID, ${err}`);
              commit("SET_PASSWORD_INCORRECT", true);
            });
        })
        .catch((err) => {
          console.log(`GAGAL: ${err}`);
        });
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    isLoggedOut: (state) => state.isLoggedOut,
    message: (state) => state.message,
    username: (state) => state.username,
    vendoruuid: (state) => state.vendoruuid,
    vendorid: (state) => state.vendorid,
    isPasswordIncorrect: (state) => state.isPasswordIncorrect,
  },
});

export default store;
