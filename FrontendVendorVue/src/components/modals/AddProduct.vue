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
                  <div class="field">
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
                  <!-- Dropdown -->
                  <!-- <div class="dropdown" :class="{ 'is-active': isActive }">
                    <div class="dropdown-trigger">
                      <button class="button" @click="toggleDropdown" aria-controls="dropdown-menu3">
                        <span>Category</span>
                        <FontAwesomeIcon icon="fas fa-chevron-down" />
                      </button>
                    </div>
                    <div class="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <a href="#" class="dropdown-item">
                          Komputer
                        </a>
                        <a href="#" class="dropdown-item">
                          Elektronik
                        </a>
                      </div>
                    </div>
                  </div> -->
                </div>
                <button class="button is-primary" type="submit">Submit</button>
              </div>
              <div class="form-right">
                <label class="label">Url image</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Url" v-model="product.imageUrl">
                </div>
                <!-- <div class="file has-name is-boxed">
                  <label class="file-label">
                    <input class="file-input" type="file" name="resume">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                    <span class="file-name">
                      Screen Shot 2017-07-29 at 15.54.25.png
                    </span>
                  </label>
                </div> -->

              </div>
            </form>
          </div>
        </div>
      </div>

    </div>

  </Transition>
</template>

<script>
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapGetters } from 'vuex';
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      isActive: false,
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
  components: { FontAwesomeIcon },
  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive
      console.log("okbro")
    },
    Submitform() {
      axios
        .post(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${this.vendoruuid}`,
          this.product
        )
        .then((response) => {
          this.$emit('close')
          location.reload();
          alert(`Product dengan nama : ${this.product.name} berhasil ditambahkan`)
          console.log(
            `Berhasil ditambahkan, Deskripsi: ${this.product.description}`
          );
        })
        .catch((err) => {
          console.log(err);
        })
    },
  }
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
  padding-left: 10px;
}

.close-button {
  justify-content: flex-end;
  cursor: pointer;
}

.dropdown {
  padding-top: 10px;
}
</style>