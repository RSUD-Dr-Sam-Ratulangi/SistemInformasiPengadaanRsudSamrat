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

<style scoped>
/* Modals */

.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 500px;
  margin: auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

.modal-enter-from {
  opacity: 50;
}

.modal-leave-to {
  opacity: 100;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
