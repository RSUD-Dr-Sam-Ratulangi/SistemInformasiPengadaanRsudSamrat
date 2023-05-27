<template>
  <nav>
    <a
      href="https://rsudsamrat.site/epasien/"
      target="_blank"
      style="text-decoration: none; color: black; font-size: 25px"
    >
      <img
        src="../img/logo.jpg"
        alt="Logo RSUD"
        style="vertical-align: middle; width: 45px; height: 45px"
      />
      RSUD SAMRATULANGI TONDANO
    </a>
    <button
      class="button is-light"
      @click="showmodalLogin = true"
      v-if="!isLoggedIn"
    >
      Login
    </button>
    <button class="button is-light" @click="logout" v-else>Logout</button>
  </nav>

  <Teleport to="body">
    <LoginModal :show="showmodalLogin" @close="showmodalLogin = false" />
  </Teleport>
</template>

<script>
import LoginModal from "../modals/Login.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { LoginModal },

  data() {
    return {
      showmodalLogin: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "isLoggedOut"]),
  },
  methods: {
    ...mapMutations(["SET_IS_LOGGED_IN"]),
    logout() {
      this.SET_IS_LOGGED_IN(false);
      alert("Berhasil Keluar");
    },
  },
};
</script>

<style src="../style/Nav_Login.css" />
