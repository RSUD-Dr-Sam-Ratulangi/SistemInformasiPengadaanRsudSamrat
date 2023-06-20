<template>
  <nav>
    <div>
      <span @click="activeToggle" v-if="isLoggedIn">
        <FontAwesomeIcon icon="fas fa-bars" style="padding-right: 30px;" />
      </span>
      <a href="https://rsudsamrat.site/epasien/" target="_blank"
        style="text-decoration: none; color: black; font-size: 25px;">
        <img src="../img/logo.jpg" alt="Logo RSUD" style="vertical-align: middle; width: 45px; height: 45px" />
      </a>
    </div>
    <div class="titleNav">
      <span class="mainTitle">SMART SAMRAT PROCUREMENT</span>
      <span class="subTitle">RUMAH SAKIT UMUM DAERAH DR SAMRATULANGI TONDANO</span>
    </div>

    <div v-if="isLoggedIn">
      <RouterLink to="/notifications">
        <div class="nav-item">
          <FontAwesomeIcon icon="fas fa-solid fa-bell" style="font-size: 20px;" class="nav-icon" />
          <span>{{ notif }}</span>
        </div>
      </RouterLink>
    </div>

    <div class="login">
      <button class="button is-info" @click="showmodalLogin = true" v-if="!isLoggedIn">
        <FontAwesomeIcon icon="fas fa-user" />
      </button>
      <button class="button is-danger" @click="logout" v-else>
        <FontAwesomeIcon icon="fas fa-right-from-bracket" />
      </button>
    </div>
  </nav>

  <div>
    <SideNavigationbar v-if="toggleIsActive" />
  </div>


  <Teleport to="body">
    <LoginModal :show="showmodalLogin" @close="showmodalLogin = false" />
  </Teleport>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LoginModal from "../modals/Login.vue";
import axios from "axios";
import SideNavigationbar from "./SideNavigationbar.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { LoginModal, FontAwesomeIcon, SideNavigationbar },

  data() {
    return {
      notif: 0,
      showmodalLogin: false,
      toggleIsActive: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "isLoggedOut"]),
  },
  created() {
    this.fetchData();
  },
  methods: {
    //login
    ...mapMutations(["SET_IS_LOGGED_IN"]),
    logout() {
      this.SET_IS_LOGGED_IN(false);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("vendorUuid");
      localStorage.removeItem("vendorId");
      alert("Berhasil Keluar");
      this.toggleIsActive = false;
    },
    activeToggle() {
      this.toggleIsActive = !this.toggleIsActive
      console.log("Aktif")
    },
    async fetchData() {
      try {
        const response = await axios.get("http://rsudsamrat.site:8990/api/v1/notifikasi")
        this.notif = response.data.content.length;
      } catch (err) {
        console.log(err)
      }
    }
  },
};
</script>

<style src="../style/Nav_Login.css"/>
