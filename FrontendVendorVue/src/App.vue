<script>
import Navigationbar from "./components/molecules/Navigationbar.vue";
import Nologgedin from "./views/relativeViews/Nologgedin.vue";
import Footer from "./components/molecules/Footer.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: { Navigationbar, Nologgedin, Footer },

  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<template>
  <div class="inti">
    <div>
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
      </div>
    </div> 
  </div>
  <!-- <Footer /> -->
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


</style>
