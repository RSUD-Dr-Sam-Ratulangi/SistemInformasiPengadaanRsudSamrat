<template>

  <div class="boxSearch">  
    <h1>Search Your Products</h1>
    <div class="container">
      <div>
        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" placeholder="Search Products" v-model="searchInput">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modals edit Product -->
  <Teleport to="body">
    <!-- pakai komponen modal, passing ke prop(lihat Editproduct.vue) -->
    <modal
      :show="showmodaleditProduct"
      :product="selectedProduct"
      @close="showmodaleditProduct = false"
    />
  </Teleport>
</template>

<script>
import axios from "axios";
import modal from "../components/modals/Editproduct.vue";
import LoadingBar from "../components/molecules/LoadingBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "Productpagesview",
  components: { modal, LoadingBar },

  data() {
    return {
      products: [],

      connectionFailed: false,
      showmodaleditProduct: false,
      selectedProduct: null,
      selectedUser: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["vendoruuid", "username"]),
  },
  created() {
    this.isLoading = true;
    axios
      .get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/vendor/${this.vendoruuid}`
      )
      .then((response) => {
        this.products = response.data;
      })
      .catch((err) => {
        console.log(`Terjadi error guyss, ${err}`);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    deleteProduct(idproduk, namaproduk) {
      /* hapus produk berdasaarkan produkuuid */
      if (confirm(`Are you sure want to delete "${namaproduk}"`)) {
        axios
          .delete(
            `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${idproduk}`
          )
          .then((response) => {
            console.log(response.data);
            window.location.reload();
            console.log(`delete ${produk}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /* Select product for edit */
    selectProduct(produk) {
      this.showmodaleditProduct = true;
      this.selectedProduct = produk;
    },
  },
};
</script>

<style scoped>
.boxSearch {
  margin-top: 5%;
  padding-bottom: 5px;
  width: 100%;
  align-items: center;
  text-align: center;
  height: auto;
  background-color: rgb(255, 255, 255);
  border: #555;
}
.container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}

/* .card {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
  overflow: hidden;
}

.card img {
  width: 50%;
  height: 300px;
}

.card-content {
  padding: 16px;
}

.card-content h2 {
  margin: 0;
  font-size: 24px;
}

.card-content p {
  margin: 16px 0;
}

.containerCard {
  padding: 350px;
  margin-top: -350px;
}

.button {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
}

.button:hover {
  background-color: #0069d9;
}

.failedconnect {
  margin-top: 20%;
} */
</style>
