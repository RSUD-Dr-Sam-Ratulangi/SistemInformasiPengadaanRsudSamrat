<template>
  <div v-if="isLoading">
    <dialog class="modal bg-gray-600 bg-opacity-90" :open="isLoading">
      <form method="dialog" class="modal-box w-auto bg-opacity-100">
        <div class="flex items-center justify-center">
          <LoadingBar />
        </div>
      </form>
    </dialog>
  </div>

  <div v-else>
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
              :disabled="isLoading"
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
                <input
                  type="text"
                  class="input input-sm"
                  v-model="product.name"
                />
              </div>
              <div class="flex justify-around">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold text-white text-lg"
                      >Price:</span
                    >
                  </label>
                  <input
                    type="number"
                    class="input input-sm w-min"
                    v-model="product.price"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold text-white text-lg"
                      >Quantity:</span
                    >
                  </label>
                  <input
                    type="number"
                    class="input input-sm w-min"
                    v-model="product.quantity"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold text-white text-lg"
                    >Description :</span
                  >
                </label>
                <input
                  type="text"
                  class="input input-sm"
                  v-model="product.description"
                />
              </div>
              <label class="label"
                >Category
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text font-bold text-black">BHP</span>
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary"
                      v-model="product.categoryIds"
                      :value="3"
                      @change="handleCheckBox(3)"
                    />
                    <span class="label-text font-bold text-black">BM</span>
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary"
                      v-model="product.categoryIds"
                      :value="4"
                      @change="handleCheckBox(4)"
                    />
                    <span class="label-text font-bold text-black">JASA</span>
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary"
                      v-model="product.categoryIds"
                      :value="5"
                      @change="handleCheckBox(5)"
                    />
                  </label>
                </div>
              </label>

              <label class="label" v-if="showSubCategoryBHP"
                >Sub Category
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text font-bold text-black">MEDIS</span>
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary"
                      v-model="product.subCategoryId"
                      :value="2"
                      @change="handleCheckBoxSubCategory(2)"
                    />
                    <span class="label-text font-bold text-black"
                      >NON MEDIS</span
                    >
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary"
                      v-model="product.subCategoryId"
                      :value="1"
                      @change="handleCheckBoxSubCategory(1)"
                    />
                  </label>
                </div>
              </label>

              <label class="label" v-if="showSubCategoryBM"
                >Sub Category
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text font-bold text-black">ALKES</span>
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary"
                      v-model="product.subCategoryId"
                      :value="5"
                      @change="handleCheckBoxSubCategory(5)"
                    />
                    <span class="label-text font-bold text-black">ALKON</span>
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary"
                      v-model="product.subCategoryId"
                      :value="6"
                      @change="handleCheckBoxSubCategory(6)"
                    />
                  </label>
                </div>
              </label>

              <!-- Input Images -->
              <div
                class="flex items-center justify-center w-full"
                v-if="!selectedImage"
              >
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
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    accept="image/jpg"
                    @change="handleImageSelect"
                  />
                </label>
              </div>
              <div v-if="selectedImage">
                <p
                  class="text-base text-center font-bold leading-relaxed text-gray-500 dark:text-gray-400"
                >
                  {{ selectedImage.name }}
                  {{ selectedImage.size }}
                </p>
                <p
                  class="text-base text-center font-bold leading-relaxed text-gray-500 dark:text-gray-400"
                >
                  Size: {{ selectedImage.size }} kb
                </p>
              </div>
            </div>
            <div
              class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <button
                data-modal-hide="top-left-modal"
                type="submit"
                :disabled="isLoading"
                class="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

import LoadingBar from "../molecules/LoadingBar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mapGetters } from "vuex";
export default {
  components: { FontAwesomeIcon, LoadingBar },
  props: {
    show: Boolean,
  },
  emits: ["close"],
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
        subCategoryId: [],
        status: "APPROVED",
      },
      message: "",
      selectedImage: null,
      selectedCategory: "",
    };
  },
  computed: {
    ...mapGetters(["vendoruuid"]),
    showSubCategoryBHP() {
      return this.product.categoryIds.includes(3);
    },
    showSubCategoryBM() {
      return this.product.categoryIds.includes(4); // Change the value according to the checkbox value for "BM"
    },
  },
  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive;
      console.log("okbro");
    },
    Submitform() {
      console.log("Product added", this.product);
      axios
        .post(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${this.vendoruuid}`,
          this.product
        )
        .then((response) => {
          alert(
            `Product dengan nama : ${this.product.name} berhasil ditambahkan`
          );
        })
        .catch((err) => {
          console.log(err);
        });
      this.$emit("close");
    },
    async handleImageSelect(event) {
      const file = event.target.files[0];
      this.selectedImage = file;
      const formData = new FormData();
      formData.append("images", file);
      formData.append("product_id", "123578");
      formData.append("product_uuid", "uuid-126366");
      this.isLoading = true;
      try {
        const response = await axios.post(
          "http://rsudsamrat.site:8990/images",
          formData
        );
        console.log(response.data);
        this.product.imageUrl = response.data.imageUrls[0];
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
      console.log(file);
    },
    handleCloseClick() {
      (this.product.categoryIds = []),
        (this.product.subCategoryId = null),
        this.$emit("close");
    },
    handleCheckBox(checkedCategoryId) {
      if (this.product.categoryIds.includes(checkedCategoryId)) {
        this.product.categoryIds = [checkedCategoryId];
      } else {
        this.product.categoryIds = [];
      }
    },
    handleCheckBoxSubCategory(checkedSubCategoryId) {
      if (this.product.subCategoryId.includes(checkedSubCategoryId)) {
        this.product.subCategoryId = [checkedSubCategoryId];
      } else {
        this.product.subCategoryId = [];
      }
    },
  },
};
</script>
