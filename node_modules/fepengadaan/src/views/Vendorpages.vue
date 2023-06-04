<template>
  <div>
    <h1>Hello user, Please Create your Vendor!!</h1>
    <form @submit.prevent="submitForm">
      <label for="name">Name :</label>
      <input
        type="text"
        class="input is-rounded"
        placeholder="Name"
        v-model="vendors.name"
      />
      <label for="address">Address :</label>
      <input
        type="text"
        class="input is-rounded"
        placeholder="Address"
        v-model="vendors.address"
      />
      <label for="phoneNumber">Phone Number :</label>
      <input
        type="number"
        class="input is-rounded"
        placeholder="Phone Number"
        v-model="vendors.phoneNumber"
      />
      <button class="button is-small">Submit</button>
    </form>
    <p>{{ message }}</p>
    <loadingBar v-if="isLoading" />
  </div>
</template>

<script>
import axios from "axios";
import loadingBar from "../components/molecules/LoadingBar.vue";

export default {
  name: "Vendorpages",
  components: { loadingBar },
  data() {
    return {
      vendors: {
        name: "",
        address: "",
        phoneNumber: "",
      },
      message: "",
      isLoading: false,
    };
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      axios
        .post(
          "http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors",
          this.vendors
        )
        .then((response) => {
          this.message = response.data;
          console.log(response.data);
        })
        .catch((err) => {
          this.message = err;
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
