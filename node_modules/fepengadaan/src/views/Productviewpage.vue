<template>
  <!-- Filter/AddProduct -->
  <div v-if="!isLoading">
    <div class="flex sm:flex-wrap justify-between items-end">
      <div class="">
        <select
          class="select select-bordered select-xs w-20 bg-neutral text text-white mt-4 ml-2"
          v-model="selectedCategory"
        >
          <option disabled selected>Filter Produk</option>
          <option value="SEMUA PRODUK">FILTER</option>
          <option>BM</option>
          <option>JASA</option>
          <option>BPH</option>
        </select>
      </div>
      <div>
        <h1 class="text text-lg font-extrabold">PRODUK</h1>
      </div>
      <div>
        <button
          class="btn sm:btn-sm btn-xs text-xs btn-neutral sm:w-auto mr-2"
          @click="addProductModal"
        >
          Tambah Produk
        </button>
      </div>
    </div>
    <!-- Product Card -->
    <div class="flex flex-wrap justify-center overflow-x-auto mt-3">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="px-2 mb-4 sm:w-1/2 md:w-1/3 lg:w-1/4"
      >
        <div class="card sm:card-normal card-bordered bg-base-500 shadow-xl">
          <figure>
            <div class="border border-gray">
              <img
                v-if="product.imageUrl"
                :src="product.imageUrl"
                :alt="product.name"
                style="height: 256px; width: 256px"
              />
              <img
                v-else
                src="https://dummyimage.com/256x256/68B2A0/fff"
                alt="Placeholder"
              />
            </div>
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              {{ product.name }}
              <div class="badge badge-primary">{{ product.vendor.name }}</div>
            </h2>
            <h1 class="text text-xs">{{ product.description }}</h1>
            <div class="card-actions justify-end flex-wrap">
              <div
                class="badge badge-outline mb-2"
                v-if="product.categories && product.categories.length > 0"
              >
                {{ product.categories[0].name }}
              </div>
              <div
                class="badge badge-outline mb-2"
                v-if="product.subcategories && product.subcategories.length > 0"
              >
                {{ product.subcategories[0].name }}
              </div>
              <button
                class="btn badger badge-outline btn-xs self-end"
                @click="deleteProduct(product.productuuid, product.name)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center items-center h-screen" v-if="isLoading">
    <LoadingBar />
  </div>

  <Teleport to="body">
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

export default {
  name: "Productpagesview",
  components: { modal, LoadingBar, modalAddProduct },

  data() {
    return {
      products: [],
      connectionFailed: false,
      showModalAddProduct: false,
      showmodaleditProduct: false,
      selectedCategory: "SEMUA PRODUK",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["vendoruuid", "username"]),
    filteredProducts() {
      if (this.selectedCategory === "SEMUA PRODUK" || !this.selectedCategory) {
        return this.products;
      } else if (this.selectedCategory) {
        return this.products.filter((product) => {
          const categoryMatch =
            product.categories &&
            product.categories.length > 0 &&
            product.categories[0].name === this.selectedCategory;
          const subcategoryMatch =
            product.subcategories &&
            product.subcategories.length > 0 &&
            product.subcategories[0].name === this.selectedCategory;
          return categoryMatch || subcategoryMatch;
        });
      } else {
        this.products;
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
