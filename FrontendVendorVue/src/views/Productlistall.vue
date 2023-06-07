<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody v-for="product in products" :key="product.id">
        <tr>
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.description }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="loadPreviousPage" :disabled="prevDisabled">Prev</button>
    <button @click="loadNextPage" :disabled="nextDisabled">Next</button>
    <loadingBarVue v-if="isLoading" />
  </div>
</template>

<script>
import axios from "axios";

import loadingBarVue from "../components/molecules/LoadingBar.vue";

export default {
  name: "Productpagesview",
  components: { loadingBarVue },

  data() {
    return {
      products: [],
      page: 1,
      size: 5,

      isLoading: false,
    };
  },
  created() {
    this.loadProducts();
  },
  computed: {
    nextDisabled() {
      return this.products.length === 0;
    },
    prevDisabled() {
      return this.page === 0;
    },
  },

  methods: {
    loadProducts() {
      this.isLoading = true;
      axios /* datta semua produk */
        .get(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${this.page}/${this.size}`
        )
        .then((response) => {
          this.products = response.data.content;
          console.log(response.data);
          if (this.products.length > 0) {
            console.log(
              `Berhasil mengambil ${this.products.length} produk pada halaman ${this.page}`
            );
          } else {
            console.log(`Belum ada produk yang dimuat`);
          }
        })
        .catch((err) => {
          console.log(err);
          this.connectionFailed = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loadNextPage() {
      this.page += 1;
      this.loadProducts();
    },
    loadPreviousPage() {
      if (this.page > 0) {
        this.page--;
        this.loadProducts();
      }
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
