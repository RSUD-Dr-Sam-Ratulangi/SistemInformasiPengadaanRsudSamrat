<template>
  <div>
    <div class="container">
      <div class="box1">
        <div class="box2">
          <form @submit.prevent="Submitform">
            <label for="name">Product Name:</label>
            <input
              type="text"
              v-model="product.name"
              placeholder="Product Name"
              id="Productname"
              class="input is-small"
              required
            />
            <label for="price">Price:</label>
            <input
              type="number"
              v-model="product.price"
              placeholder="Price"
              class="input is-small"
              required
            />
            <label for="quantity">Quantity:</label>
            <input
              type="number"
              v-model="product.quantity"
              placeholder="Quantity"
              class="input is-small"
              required
            />
            <label for="description">Description:</label>
            <input
              type="text"
              v-model="product.description"
              placeholder="Description"
              class="input is-small"
            />
            <button
              class="button is-success"
              v-if="!isLoading"
              type="submit"
              style="margin-top: 10px"
            >
              Submit
            </button>
            <button
              class="button is-success"
              v-if="isLoading"
              type="button"
              disabled
              style="margin-top: 10px"
            >
              <span class="icon">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
              <span>Loading...</span>
            </button>
          </form>
        </div>
        <p>{{ message }}</p>
        <LoadingBar v-if="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingBar from "../components/molecules/LoadingBar.vue";
import { mapGetters, Store } from "vuex";

export default {
  name: "Productpages",
  components: { LoadingBar },
  data() {
    return {
      isLoading: false,
      product: {
        name: "",
        price: "",
        quantity: "",
        description: "",
      },
      message: "",
    };
  },
  computed: {
    ...mapGetters(["vendoruuid"]),
  },
  methods: {
    Submitform() {
      this.isLoading = true;
      axios
        .post(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${this.vendoruuid}`,
          this.product
        )
        .then((response) => {
          this.message = response.data;
          this.product.name = "";
          this.product.price = "";
          this.product.quantity = "";
          this.product.description = "";
          console.log(
            `Berhasil ditambahkan, Deskripsi: ${this.product.description}`
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
.container {
  display: flex;

  justify-content: center;
  align-items: center;
  height: auto;
}
.box1 {
  padding: 10px;

  height: 100%;
}
.box2 {
  background-color: rgb(176, 176, 176);
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
}

input {
  width: 5%;
}
</style>
