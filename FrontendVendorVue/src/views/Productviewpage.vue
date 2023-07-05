<template>
  <div class="pl-5 pr-5">
    <div class="flex justify-center items-center">
      <h1 class="text-lg font-bold">SMART SAMRAT PROCUREMENT</h1>
    </div>
    <div class="pr-2 pl-2">
      <div class="max-w-full overflow-x-auto">
        <table class="table table-xs">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Categories</th>
              <th>Sub Categories</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.status }}</td>
              <td v-if="product.categories && product.categories.length > 0">
                {{ product.categories[0].name }}
              </td>
              <td v-else>No category available</td>
              <td
                v-if="product.subcategories && product.subcategories.length > 0"
              >
                {{ product.subcategories[0].name }}
              </td>
              <td v-else>No Sub Category</td>
              <td>
                <button
                  class="btn btn-neutral"
                  @click="deleteProduct(product.productuuid, product.name)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button class="btn btn-primary btn-sm" @click="addProductModal()">
          Add Product
        </button>
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

  <!-- Modals Add Product -->
  <Teleport to="body">
    <!-- pakai komponen modal, passing ke prop(lihat Editproduct.vue) -->
    <modalAddProduct
      :show="showModalAddProduct"
      @close="showModalAddProduct = false"
    />
  </Teleport>
</template>

<script>
import axios from "axios";
import modal from "../components/modals/Editproduct.vue";
import modalAddProduct from "../components/modals/AddProduct.vue";
import LoadingBar from "../components/molecules/LoadingBar.vue";
import { mapGetters } from "vuex";
import { ref } from "vue";

export default {
  name: "Productpagesview",
  components: { modal, LoadingBar, modalAddProduct },

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
      if (this.searchInput === "") {
        return this.products;
      } else {
        // Filter products based on search input
        const searchTerm = this.searchInput.toLowerCase();
        return this.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );
      }
    },
  },
  created() {
    this.isLoading = true;
    axios
      .get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/vendor/${this.vendoruuid}`
      )
      .then((response) => {
        this.products = response.data;
        console.log(response.data);
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
    addProductModal() {
      this.showModalAddProduct = true;
      console.log("ok");
    },
  },
};
</script>
