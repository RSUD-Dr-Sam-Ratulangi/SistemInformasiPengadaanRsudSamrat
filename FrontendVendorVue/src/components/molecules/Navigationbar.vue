<template>
  <nav class="bg-[#cde0c9]">
    <div
      class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-1"
    >
      <!-- Toggle Button -->
      <a href="#" class="flex items-center">
        <button
          data-collapse-toggle="navbar-hamburger"
          @click="activeToggle"
          v-if="isLoggedIn"
          type="button"
          class="inline-flex items-center p-1 ml-1 text-sm rounded-lg focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-[#cde0c9]"
        >
          <span>
            <FontAwesomeIcon icon="fas fa-bars" />
          </span>
        </button>
        <img src="../img/logo.jpg" class="h-8 ml-3" alt="Flowbite Logo" />
        <span
          class="self-center text-xs ml-3 font-semibold dark:text-black md:text-lg"
          >SMART SAMRAT PROCUREMENT</span
        >
      </a>
      <!-- Login Button -->
      <div>
        <button
          class="mr-2 btn btn-circle btn-sm md:btn-md"
          @click="showmodalLogin = true"
          v-if="!isLoggedIn"
        >
          <FontAwesomeIcon icon="fas fa-user" />
        </button>
        <button
          class="mr-2 btn btn-circle btn-sm md:btn-md"
          @click="logout"
          v-else
        >
          <FontAwesomeIcon icon="fas fa-right-from-bracket" />
        </button>
      </div>
      <!-- Toggles -->
      <div
        id="navbar-hamburger"
        :class="{ hidden: !toggleIsActive, 'w-full': toggleIsActive }"
        ref="toggleRef"
      >
        <ul class="flex flex-col font-medium bg-[#cde0c9]">
          <li>
            <a
              href="#"
              v-on:click="closeToggle"
              class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-current="page"
              ><RouterLink to="/">Home</RouterLink></a
            >
          </li>
          <li>
            <a
              href="#"
              v-on:click="closeToggle"
              class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              ><RouterLink to="/productview">Products</RouterLink></a
            >
          </li>
          <li>
            <a
              href="#"
              v-on:click="closeToggle"
              class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              ><RouterLink to="/orderDetails">Your Orders</RouterLink></a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <Teleport to="body">
    <LoginModal :show="showmodalLogin" @close="showmodalLogin = false" />
  </Teleport>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onClickOutside } from "@vueuse/core";
import LoginModal from "../modals/Login.vue";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: { LoginModal, FontAwesomeIcon },

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
  mounted() {
    onClickOutside(this.$refs.toggleRef, this.closeToggle);
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
      this.toggleIsActive = !this.toggleIsActive;
      console.log("Aktif");
    },
    closeToggle() {
      this.toggleIsActive = false;
    },
    async fetchData() {
      try {
        const response = await axios.get(
          "http://rsudsamrat.site:8990/api/v1/notifikasi"
        );
        this.notif = response.data.content.length;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
