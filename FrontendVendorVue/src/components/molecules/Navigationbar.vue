<template>
  <nav>
    <div>
      <span @click="activeToggle" v-if="isLoggedIn">
        <FontAwesomeIcon icon="fas fa-bars" style="padding-right: 30px;"/>
      </span>
      <a href="https://rsudsamrat.site/epasien/" target="_blank"
        style="text-decoration: none; color: black; font-size: 25px;">
        <img src="../img/logo.jpg" alt="Logo RSUD" style="vertical-align: middle; width: 45px; height: 45px" />
      </a>
    </div>
    <div class="titleNav">
      <span class="mainTitle">SMART PROCUREMENT</span>
      <span class="subTitle">RSUD SAMRATULANGI TONDANO</span>
    </div>
    <div class="login">
      <button class="button is-light" @click="showmodalLogin = true" v-if="!isLoggedIn">
        <FontAwesomeIcon icon="fas fa-user" style="margin-right: 5px" />
        Login
      </button>
      <button class="button is-light" @click="logout" v-else>Logout</button>
    </div>
  </nav>

  <div>
      <SideNavigationbar v-if="toggleIsActive"/> 
  </div>
 

  <Teleport to="body">
    <LoginModal :show="showmodalLogin" @close="showmodalLogin = false" />
  </Teleport>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LoginModal from "../modals/Login.vue";
import SideNavigationbar from "./SideNavigationbar.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { LoginModal, FontAwesomeIcon, SideNavigationbar },

  data() {
    return {
      showmodalLogin: false,
      toggleIsActive: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "isLoggedOut"]),
  },
  methods: {
    ...mapMutations(["SET_IS_LOGGED_IN"]),
    logout() {
      this.SET_IS_LOGGED_IN(false);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("vendorUuid");
      localStorage.removeItem("vendorId");
      alert("Berhasil Keluar");
    },
    activeToggle() {
      this.toggleIsActive = !this.toggleIsActive
      console.log("Aktif")
    }
  },
};
</script>

<style src="../style/Nav_Login.css"/>
