<template>

  <div class="boxSearch">  
    <h1>Search Your Products</h1>
    <div class="container">
      <div>
        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" placeholder="Search Products" v-model="searchInput">
            <button style="margin-top: 5px;">Add Product</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="contentProduct">
    <div class="card" v-for="product in filteredProducts" :key="product.id">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <img :src="product.imageUrl"/>
            <p class="title is-4">Product Name: {{ product.name }}</p>
          </div>
        </div>
        <div class="content">
          <p>Price: {{ product.price }}</p>
          <p>Quantity: {{ product.quantity }}</p>
          <p>Description: {{ product.description }}</p>
          <p>Category: {{ product.categoryIds }}</p>
          <button class="button is-danger" @click="deleteProduct(product.productuuid, product.name)">Delete</button>
          <button class="button is-primary" style="margin-left: 10px;" @click="selectProduct(product)">Edit</button>
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
import { ref } from "vue";

export default {
  name: "Productpagesview",
  components: { modal, LoadingBar },

  data() {
    return {
      products: [],
      searchInput: ref(""),
      connectionFailed: false,
      showModalAddProduct: false,
      showmodaleditProduct: false,
      selectedProduct: null,
      selectedUser: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["vendoruuid", "username"]),
    filteredProducts() {
      if (this.searchInput === '') {
        return this.products
      } else {
        // Filter products based on search input
        const searchTerm = this.searchInput.toLowerCase();
        return this.products.filter(product => product.name.toLowerCase().includes(searchTerm))
      }
    }
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
    deleteProduct(uuidproduk, namaproduk) {
      /* hapus produk berdasaarkan produkuuid */
      if (confirm(`Are you sure want to delete "${namaproduk}"`)) {
        axios
          .delete(
            `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${uuidproduk}`
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

.card {
  width: 300px;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.media-content img {
  height: 150px;
  width: 150px;
}

.card-content {
  margin-top: 10px;
}

.title {
  margin-bottom: 5px;
}

.content {
  font-size: 14px;
  color: #555;
}

.contentProduct {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>
