<script>
import Navigationbar from "./components/molecules/Navigationbar.vue";
import Nologgedin from "./views/relativeViews/Nologgedin.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: { Navigationbar, Nologgedin },

  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<template>
  <div class="main-container">
    <Navigationbar />
    <div class="contentNoLoggedin" v-if="!isLoggedIn">
      <Nologgedin />
    </div>
    <div v-if="isLoggedIn">
      <div>
        <div class="content">
          <RouterView />
        </div>
      </div>
    </div>
    <div>
      <footer>
        <span>RSUD SAMRATULANGI TONDANO</span> &copy; 2023. All Rights Reserved.
      </footer>
    </div>
  </div>
</template>

<style scoped>

.content {
  text-align: center;
  margin-bottom: 60px;
  margin-left: 60px;
  margin-right: 60px;
}

.contentNoLoggedin {
  text-align: center;
  padding-top: 15%;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
}

footer span {
  font-weight: bold;
  font-size: 16px;
}
</style>
