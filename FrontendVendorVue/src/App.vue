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
  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.content {
  text-align: center;
  margin-bottom: 150px;
  margin-left: 60px;
  margin-right: 60px;
}

.contentNoLoggedin {
  text-align: center;
  padding-top: 15%;
}

footer {
  position:fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f5; /* Sesuaikan dengan warna latar belakang yang Anda inginkan */
  text-align: center;
}
</style>
