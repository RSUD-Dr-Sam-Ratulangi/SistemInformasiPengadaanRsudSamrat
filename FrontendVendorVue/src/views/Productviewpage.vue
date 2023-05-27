<template>
  <div>
    <div class="containerCard">
      <h1>{{ username }} Products</h1>
      <LoadingBar v-if="isLoading" />
      <div v-for="product in products" :key="product.id">
        <div class="card">
          <img src="../components/img/user-interface.png" alt="Card image" />
          <div class="card-content">
            <h1>{{ product.name }}</h1>
            <p>{{ product.productuuid }}</p>
            <p>{{ product.quantity }}</p>
            <p>{{ product.price }}</p>
            <p>{{ product.description }}</p>
            <div style="margin-left: 50%">
              <button
                class="button is-danger"
                @click="deleteProduct(product.productuuid, product.name)"
              >
                Delete
              </button>
              <button class="button is-primary" @click="selectProduct(product)">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="connectionFailed && products == null" class="failedconnect">
    <h1>KONEKSI GAGAL</h1>
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

<style>
.card {
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
}
</style>
