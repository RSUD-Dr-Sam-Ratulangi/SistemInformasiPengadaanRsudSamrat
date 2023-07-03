<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog
    :open="show"
    class="modal modal-bottom sm:modal-middle bg-gray-600 bg-opacity-90 pt-5 pb-5"
  >
    <div class="relative w-full max-w-2xl max-h-full overflow-y-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            ADD PRODUCT
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="top-left-modal"
            @click="handleCloseClick"
          >
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="Submitform">
          <div class="p-6 space-y-2">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold text-white text-lg"
                  >Product Name :</span
                >
              </label>
              <input type="text" class="input input-sm" />
            </div>
            <div class="flex justify-around">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold text-white text-lg"
                    >Price:</span
                  >
                </label>
                <input type="number" class="input input-sm w-min" />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold text-white text-lg"
                    >Quantity:</span
                  >
                </label>
                <input type="number" class="input input-sm w-min" />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold text-white text-lg"
                  >Description :</span
                >
              </label>
              <input type="text" class="input input-sm" />
            </div>
            <!-- Input Images -->
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    ONLY JPG FILE (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>

            <p
              class="text-base text-center font-bold leading-relaxed text-gray-500 dark:text-gray-400"
            >
              PHOTO UPLOADED WILL APPEAR HERE
            </p>
          </div>
          <div
            class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              data-modal-hide="top-left-modal"
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
  <!-- <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h1 style="font-style: italic; font-weight: bolder">
            Add Product
            <span class="close-button" @click="handleCloseClick()">
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
                    <input
                      class="input"
                      type="text"
                      placeholder="Product Name"
                      v-model="product.name"
                      required
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Price</label>
                  <div class="control">
                    <input
                      class="input"
                      type="number"
                      placeholder="Price"
                      v-model="product.price"
                      required
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Quantity</label>
                  <div class="control">
                    <input
                      class="input"
                      type="number"
                      placeholder="Quantity"
                      v-model="product.quantity"
                      required
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Description</label>
                  <div class="control">
                    <input
                      class="input is-large"
                      type="text"
                      placeholder="Description"
                      v-model="product.description"
                      required
                    />
                  </div>
                  <div class="field">
                    <p>Categories</p>
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        v-model="product.categoryIds"
                        :value="3"
                      />
                      BHP
                    </label>
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        v-model="product.categoryIds"
                        :value="4"
                      />
                      BM
                    </label>
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        v-model="product.categoryIds"
                        :value="5"
                      />
                      JASA
                    </label>
                  </div>
                  <div class="field">
                    <div>
                      <p>Sub Categories</p>
                      <label class="checkbox">
                        <input
                          type="checkbox"
                          v-model="product.subCategoryId"
                          :value="1"
                        />
                        NON MEDIS
                      </label>
                      <label class="checkbox">
                        <input
                          type="checkbox"
                          v-model="product.subCategoryId"
                          :value="2"
                        />
                        MEDIS
                      </label>
                    </div>
                    <div>
                      <p>Sub Categories</p>
                      <label class="checkbox">
                        <input
                          type="checkbox"
                          v-model="product.subCategoryId"
                          :value="5"
                        />
                        ALKSES
                      </label>
                      <label class="checkbox">
                        <input
                          type="checkbox"
                          v-model="product.subCategoryId"
                          :value="6"
                        />
                        ALKON
                      </label>
                    </div>
                  </div>
                </div>
                <button class="button is-primary" type="submit">Submit</button>
              </div>
              <div class="form-right">
                <label class="label">Url image</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Url"
                    v-model="product.imageUrl"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition> -->
</template>

<script>
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mapGetters } from "vuex";
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      isActive: false,
      isLoading: false,
      chekedBox: null,
      product: {
        name: "",
        price: "",
        quantity: "",
        description: "",
        imageUrl: "",
        categoryIds: [],
        subCategoryId: [],
        status: "APPROVED",
      },
      message: "",
    };
  },
  computed: {
    ...mapGetters(["vendoruuid"]),
  },
  components: { FontAwesomeIcon },
  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive;
      console.log("okbro");
    },
    Submitform() {
      axios
        .post(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${this.vendoruuid}`,
          this.product
        )
        .then((response) => {
          this.$emit("close");
          location.reload();
          alert(
            `Product dengan nama : ${this.product.name} berhasil ditambahkan`
          );
          console.log(
            `Berhasil ditambahkan, Deskripsi: ${this.product.description}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCheckboxChangeCategory(checkedCategoryId) {
      this.product.categoryIds = [checkedCategoryId];
      this.product.subCategoryId = null;
    },
    handleCheckboxChangeSubCategory(checkedSubCategoryId) {
      this.product.subCategoryId = [checkedSubCategoryId];
    },
    handleCloseClick() {
      (this.product.categoryIds = []),
        (this.product.subCategoryId = null),
        this.$emit("close");
    },
  },
};
</script>
