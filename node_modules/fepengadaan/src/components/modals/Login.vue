<template>
  <dialog
    :open="show"
    class="modal modal-bottom sm:modal-middle bg-gray-600 bg-opacity-90"
    ref="signInToggle"
  >
    <form method="dialog" class="modal-box" @submit.prevent="submitLogin">
      <button class="btn btn-square btn-sm" @click="closeModal">
        <FontAwesomeIcon icon="fa-solid fa-x" />
      </button>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          v-model="username"
          placeholder="Username"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          v-model="password"
          placeholder="********"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          @click="closeModal"
        >
          Sign In
        </button>
      </div>
    </form>
  </dialog>
</template>

<script>
import store from "../../config/stateAuth/state.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Login",
  components: { FontAwesomeIcon },
  props: {
    show: Boolean,
  },

  data() {
    return {
      username: "",
      password: "",
    };
  },

  computed: {
    isLoggedIn() {
      return store.getters.isLoggedIn;
    },
  },
  methods: {
    submitLogin() {
      const vendor = {
        username: this.username,
        password: this.password,
      };
      store.dispatch("login", vendor);
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
