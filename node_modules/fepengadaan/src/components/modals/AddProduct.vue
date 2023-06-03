<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h1 style="font-style: italic; font-weight: bolder">
            Add Product
            <span class="close-button" @click="$emit('close')">
            <FontAwesomeIcon icon="fas fa-xmark" />
          </span>
          </h1>
        </div>
        <div class="modal-body">
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
                  <label class="checkbox">
                    <input type="checkbox" v-model="product.categoryIds" :value="2">
                    Elektronik
                  </label>
                </div>
                <button class="button is-primary" type="submit">Submit</button>
              </div>
              <div class="form-right">
                <input class="input" placeholder="Isi URL" v-model="product.imageUrl" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapGetters } from 'vuex';
export default {
  props: {
    show: Boolean,
  },
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
    ...mapGetters(["vendoruuid"])
  },
  components: { FontAwesomeIcon }
}
</script>

<style scoped>
.containerProduct {
  display: flex;
  justify-content: center;
}

.box {
  display: contents;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
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

.close-button {
  justify-content: flex-end;
  cursor: pointer;
}
</style>