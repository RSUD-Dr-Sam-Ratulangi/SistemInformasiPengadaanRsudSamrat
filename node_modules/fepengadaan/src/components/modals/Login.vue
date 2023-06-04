<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <button class="delete is-small" @click="$emit('close')">close</button>
          <h1 style="font-weight: bold">Login</h1>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitLogin">
            <label for="Username">UserName:</label>
            <input type="text" class="input is-small" v-model="username" />
            <div>
              <label for="password">Password</label>
              <input
                type="password"
                class="input is-small"
                v-model="password"
              />
            </div>
            <div class="modal-footer">
              <button
                class="button is-primary"
                style="margin-top: 10px"
                type="submit"
                @click="$emit('close')"
              >
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import store from "../../config/stateAuth/state.js";
import axios from "axios";

export default {
  name: "Login",
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
  },
};
</script>
