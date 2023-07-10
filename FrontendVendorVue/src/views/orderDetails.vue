<template>
  <div v-if="!isLoading">
    <div class="flex justify-center">
      <div className="flex justify-between items-center pt-3 gap-6">
        <div>
          <input
            type="date"
            class="px-2 border border-gray-300 rounded-md"
            placeholder="Filter by Date"
            v-model="selectedDate"
            @change="filterByDate"
          />
        </div>
        <button class="btn btn-info btn-xs" @click="searchBydate">Cari</button>
        <div>
          <select
            class="select select-bordered select-xs w-full max-w-xs"
            v-model="selectedStatus"
          >
            <option disabled selected>Filter</option>
            <option value="SEMUA ORDER">SEMUA ORDER</option>
            <option>ORDER</option>
            <option>NEGOTIATION</option>
            <option>VALIDATING</option>
            <option>SHIPPING</option>
            <option>CHECKING</option>
            <option>CANCEL</option>
            <option>COMPLETE</option>
          </select>
        </div>
      </div>
    </div>

    <div>
      <table class="table table-xs table-zebra">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Tanggal Pesanan</th>
            <th>Status</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="datas in filteredData.slice().reverse()" :key="datas.id">
            <td>{{ datas.id }}</td>
            <td>{{ datas.orderDate }}</td>
            <td>{{ datas.status }}</td>
            <td>
              <button @click="selectOrdersItem(datas)" class="btn btn-primary">
                Detail
              </button>
            </td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td colspan="4" class="text-center">No Data</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="flex justify-center items-center h-screen" v-if="isLoading">
    <LoadingBar />
    <h1 class="text text-lg font-extrabold">Loading ...</h1>
  </div>

  <!-- <modal
    :show="showmodalSeeDetails"
    :orders="selectedOrder"
    @close="showmodalSeeDetails = false"
  /> -->

  <Toast :message="infoMessage" :showToast="showToasts" />

  <detailsOrderNew
    :show="showmodalSeeDetails"
    :orders="selectedOrder"
    @close="handleModalClose"
  />
</template>

<script>
import axios from "axios";
import Toast from "../components/molecules/Toast.vue";
import detailsOrderNew from "../components/modals/detailsOrderNew.vue";
import modal from "../components/modals/DetailsOrder.vue";
import LoadingBar from "../components/molecules/LoadingBar.vue";
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: { detailsOrderNew, FontAwesomeIcon, modal, LoadingBar, Toast },

  data() {
    return {
      data: [],
      showToasts: false,
      showmodalSeeDetails: false,
      selectedOrder: null,
      isLoading: false,
      selectedStatus: "SEMUA ORDER",
      infoMessage: "",
      selectedDate: null,
      filteredData: [],
    };
  },
  watch: {
    selectedStatus: {
      handler: "filterByStatus",
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["vendoruuid", "vendorid"]),
  },
  created() {
    this.isLoading = true;
    // const paramsOrder = this.$route.params.orderId;
    // if (paramsOrder) {
    //   this.selectOrdersItem();
    // } else {
    //   this.showToast = true;
    //   this.infoMessage = "OrderId not Found";
    //   setTimeout(() => {
    //     this.showToasts = false;
    //   }, 3000);
    // }

    axios
      .get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.vendorid}/vendor`
      ) //getorderbyvendorid
      .then((response) => {
        this.data = response.data;
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
        this.filterByStatus();
      });
  },
  methods: {
    showToast() {
      this.showToasts = true;
      this.infoMessage = "MOHON PILIH TANGGAL TERLEBIH DAHULU.";
      setTimeout(() => {
        this.showToasts = false;
      }, 3000);
    },
    selectOrdersItem(order) {
      this.showmodalSeeDetails = true;
      this.selectedOrder = order;

      if (order && order.id) {
        this.$router.push({
          name: "orderDetails",
          params: { orderId: order.id },
        });
      } else {
        // Redirect to a default route or display an error message
        this.$router.push("/defaultRoute"); // Replace with your default route or error handling logic
      }
    },
    handleModalClose() {
      this.showmodalSeeDetails = false;
      this.selectedOrder = null;
      this.$router.push("/orderDetails");
    },
    searchBydate() {
      if (this.selectedDate) {
        this.filteredData = this.data.filter((order) => {
          const orderDate = new Date(order.orderDate);
          const filterDate = new Date(this.selectedDate);
          return orderDate.toDateString() === filterDate.toDateString();
        });
      } else {
        // this.filteredData = this.data;
        this.showToast();
      }
    },
    filterByStatus() {
      if (this.selectedStatus === "SEMUA ORDER" || !this.selectedStatus) {
        this.filteredData = this.data;
      } else {
        this.filteredData = this.data.filter(
          (order) => order.status === this.selectedStatus
        );
      }
    },
  },
  emits: ["close"],
};
</script>
