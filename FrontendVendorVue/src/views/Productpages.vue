<template>
  <div class="containerProduct">
    <form class="box" @submit.prevent="Submitform">
      <div class="form-left">
        <div class="field">
          <label class="label">Product Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Product Name" v-model="product.name">
          </div>
        </div>
        <div class="field">
          <label class="label">Price</label>
          <div class="control">
            <input class="input" type="number" placeholder="Price" v-model="product.price">
          </div>
        </div>
        <div class="field">
          <label class="label">Quantity</label>
          <div class="control">
            <input class="input" type="number" placeholder="Quantity" v-model="product.quantity">
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input class="input is-large" type="text" placeholder="Description" v-model="product.description">
          </div>
          <p>Categories</p>
          <label class="checkbox">
            <input type="checkbox" v-model="product.categoryIds" :value="1">
            Komputer 
          </label>
          <label class="checkbox" >
            <input type="checkbox" v-model="product.categoryIds" :value="2">
            Elektronik
          </label>
        </div>
        <button class="button is-primary" type="submit">Submit</button>
      </div>
      <div class="form-right">
        <!-- <div class="file has-name is-boxed">
          <label class="file-label">
            <input class="file-input" type="file" name="resume">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Upload Image
              </span>
            </span>
            <span class="file-name">
              <FontAwesomeIcon icon="fa-solid fa-upload" />
            </span>
          </label>
        </div> -->
        <input class="input" placeholder="Isi URL" v-model="product.imageUrl" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import LoadingBar from "../components/molecules/LoadingBar.vue";
import { mapGetters, Store } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Productpages",
  components: { LoadingBar, FontAwesomeIcon },
  data() {
    return {
      isLoading: false,
      product: {
        name: "",
        price: "",
        quantity: "",
        description: "",
        imageUrl: "",
        categoryIds: [],
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
          alert(`Product dengan nama : ${this.product.name} berhasil ditambahkan`)
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

<style scoped>
.containerProduct {
  display: flex;
  justify-content: center;
  padding-top: 50px
}

.box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-left {
  display: grid;
  gap: 20px;
}

.form-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
