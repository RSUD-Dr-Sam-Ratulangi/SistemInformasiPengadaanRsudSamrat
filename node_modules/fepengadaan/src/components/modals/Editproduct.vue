<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h1 style="font-weight: bold">
            Edit Product:
            <h1 style="font-style: italic; font-weight: bolder">
              {{ product.name }}
            </h1>
          </h1>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitFormEditProducts()">
            <label for="productname">Product Name:</label>
            <input type="text" v-model="products.name" class="input is-small" />
            <div>
              <label for="quantity">Quantity</label>
              <input
                type="number"
                class="input is-small"
                v-model="products.quantity"
              />
            </div>
            <div>
              <label for="price">price</label>
              <input
                type="number"
                class="input is-small"
                v-model="products.price"
              />
            </div>
            <label for="productdesc">Description:</label>
            <input
              type="text"
              v-model="products.description"
              class="input is-small"
            />
            <div class="modal-footer">
              <button class="button is-danger" @click="$emit('close')">
                save
              </button>
            </div>
          </form>
          <button class="button is-primary" @click="$emit('close')">
            close
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import axios from "axios";

export default {
  props: {
    show: Boolean,
    product: Object,
  },

  data() {
    return {
      products: { ...this.product },
    };
  },

  methods: {
    submitFormEditProducts() {
      axios
        .put(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${this.product.productuuid}`,
          this.products
        )
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style src="../../components/style/Editproduct.css" />
