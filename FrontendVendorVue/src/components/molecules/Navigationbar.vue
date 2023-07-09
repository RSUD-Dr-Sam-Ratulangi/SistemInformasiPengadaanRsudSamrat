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
      <div class="flex justify-end flex-1 px-2">
        <div class="flex items-stretch">
          <div class="dropdown dropdown-end h-auto">
            <button @click="getNotif" v-if="isLoggedIn">
              <label tabindex="0" class="btn btn-ghost rounded-btn"
                ><FontAwesomeIcon icon="fas fa-bell" /><span>{{
                  notif.length
                }}</span></label
              >
            </button>
            <div
              class="menu grid dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-auto h-96 overflow-x-auto"
            >
              <div class="p-3">
                <h1 class="text text-lg font-bold">Notifications</h1>

                <p class="text text-xs">Read: {{ readNotificationCount }}</p>
                <p class="text text-xs">
                  Unread: {{ unreadNotificationCount }}
                </p>
              </div>
              <table
                class="table table-zebra"
                v-for="notifikasi in notif.slice().reverse()"
                :key="notifikasi.id"
              >
                <div class="border border-collapse border-t-4">
                  <li>
                    <a class="text text-sm font-bold">{{
                      notifikasi.notificationStatus
                    }}</a>
                  </li>
                  <li>
                    <a>{{ notifikasi.createdAt }}</a>
                  </li>
                  <li>
                    <a>{{ notifikasi.message }}</a>
                  </li>
                  <li>
                    <a>Sender: {{ notifikasi.sender }}</a>
                  </li>
                </div>
              </table>
            </div>
          </div>
          <div>
            <button
              class="mr-2 btn btn-ghost btn-sm md:btn-md"
              @click="showmodalLogin = true"
              v-if="!isLoggedIn"
            >
              <FontAwesomeIcon icon="fas fa-user" />
            </button>
            <button
              class="mr-2 btn btn-ghost btn-sm md:btn-md"
              @click="logout"
              v-else
            >
              <FontAwesomeIcon icon="fas fa-right-from-bracket" />
            </button>
          </div>
        </div>
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
      notif: [],
      showmodalLogin: false,
      toggleIsActive: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "isLoggedOut", "vendoruuid", "vendorid"]),
    readNotificationCount() {
      return this.notif.filter(
        (notification) => notification.notificationStatus === "READ"
      ).length;
    },
    unreadNotificationCount() {
      return this.notif.filter(
        (notification) => notification.notificationStatus === "UNREAD"
      ).length;
    },
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
      location.reload();
    },
    getNotif() {
      this.readNotificationCount;
      this.unreadNotificationCount;
      axios
        .get(
          `http://rsudsamrat.site:8990/api/v1/notifikasi/receiver/${this.vendorid}`
        )
        .then((res) => {
          console.log(res.data);
          this.notif = res.data;
        })
        .catch((err) => console.log(err));
    },
    activeToggle() {
      this.toggleIsActive = !this.toggleIsActive;
      console.log("Aktif");
    },
    closeToggle() {
      this.toggleIsActive = false;
    },
  },
};
</script>
