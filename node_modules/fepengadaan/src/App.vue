<script>
import Navigationbar from "./components/molecules/Navigationbar.vue";
import Nologgedin from "./views/relativeViews/Nologgedin.vue";
import Footer from "./components/molecules/Footer.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: { Navigationbar, Nologgedin, FontAwesomeIcon, Footer },

  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<template>
  <main class="flex flex-col min-h-screen">
    <div>
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
      </div>
    </div>
    <footer class="mt-auto">
      <Footer />
    </footer>
  </main>
</template>

<style scoped>
.contentNoLoggedin {
  text-align: center;
  padding-top: 15%;
}
</style>
