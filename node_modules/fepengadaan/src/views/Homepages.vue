<template>
  <div
    class="container flex mx-auto justify-center pt-3 pb-3"
    v-if="!isLoading"
  >
    <div class="flex border-2 rounded">
      <button
        class="flex items-center justify-center"
        @click="searchOrderId"
      ></button>
      <input
        type="number"
        class="px-4 py-2 w-80"
        placeholder="Search..."
        v-model="orderId"
        @keyup.enter="searchOrderId"
      />
    </div>
  </div>

  <div class="flex justify-center items-center h-screen" v-if="isLoading">
    <LoadingBar />
  </div>

  <TimeStamp
    :hasOrderStatus="hasOrderStatus"
    :orderId="orderId"
    :showShipping="showShipping"
    :data="dataShipping"
    @close="showShipping = false"
  />
  <Toast :message="infoMessage" :showToast="showToasts" />
</template>

<script>
import { mapGetters } from "vuex";
import TimeStamp from "../components/modals/TimeStamp.vue";
import LoadingBar from "../components/molecules/LoadingBar.vue";
import Toast from "../components/molecules/Toast.vue";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Homepages",
  components: { FontAwesomeIcon, TimeStamp, Toast, LoadingBar },
  data() {
    return {
      dataShipping: [],
      orderId: "",
      infoMessage: "",
      showToasts: false,
      showShipping: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["message", "username", "vendoruuid", "vendorid"]),
    hasOrderStatus() {
      return (step) => {
        return this.dataShipping.some((data) => data.status === step);
      };
    },
    shouldRenderTimeStamp() {
      return this.dataShipping.length > 0;
    },
  },
  methods: {
    showToast() {
      this.showToasts = true;
      this.infoMessage = "ORDER ID TIDAK DITEMUKAN, MOHON PERIKSA KEMBALI.";
      setTimeout(() => {
        this.showToasts = false;
      }, 3000);
    },
    async getShipping() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://rsudsamrat.site:8990/order-status/status-entry/${this.orderId}`
        );
        console.log(response.data.statusList);
        this.showShipping = true;
        this.dataShipping = response.data.statusList;
      } catch (err) {
        console.log(err);
        this.showToast();
      } finally {
        this.isLoading = false;
      }
    },
    searchOrderId() {
      console.log(this.orderId);
      this.getShipping();
    },
  },
};
</script>
