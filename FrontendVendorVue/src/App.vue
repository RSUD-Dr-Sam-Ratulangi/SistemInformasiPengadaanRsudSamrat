<script>
import Navigationbar from "./components/molecules/Navigationbar.vue";
import SideNavigationbar from "./components/molecules/SideNavigationbar.vue";
import Nologgedin from "./views/relativeViews/Nologgedin.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: { Navigationbar, SideNavigationbar, Nologgedin },

  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<template>
  <Navigationbar />
  <div class="contentNoLoggedin" v-if="!isLoggedIn">
    <Nologgedin />
  </div>
  <div v-if="isLoggedIn">
    <SideNavigationbar />
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
</template>

<style>
.content {
  text-align: center;
  padding-top: 70px;
  margin-right: 10px;
  margin-left: 160px;
  margin-bottom: 60px;
}
.contentNoLoggedin {
  text-align: center;
  padding-top: 25%;
}
footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  width: 100%;
}

footer span {
  font-weight: bold;
  font-size: 16px;
}
</style>
