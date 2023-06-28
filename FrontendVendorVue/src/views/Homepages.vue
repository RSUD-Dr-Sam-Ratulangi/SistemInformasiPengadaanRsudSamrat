<template>
  <div class="header-status">
    <h1>SMART SAMRAT PROCUREMENT</h1>
    <p>
      Layanan Informasi Pengadaan Barang & Jasa Rumah Sakit Umum DR Sam
      Ratulangi Tondano
    </p>
  </div>
  <div class="box">
    <div class="content is-fullwidth is-clearfix">
      <h1>Search Your Orders</h1>
      <div class="container">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              class="input is-small"
              type="text"
              placeholder="Find a repository"
              v-model="searchInput"
              @keyup.enter="searchOrders"
            />
          </div>
          <div class="control">
            <button @click="searchOrders" class="button is-info is-small">
              <FontAwesomeIcon icon="fa-sharp  fa-magnifying-glass" />
            </button>
          </div>
        </div>
      </div>
      <!-- Table -->
      <div>
        <table
          class="table is-bordered is-striped is-narrow is-hoverable"
          v-if="filteredOrders"
        >
          <thead>
            <tr>
              <th>OrderId</th>
              <th>OrderDate</th>
              <th>Status</th>
              <th>Other</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.orderDate }}</td>
              <td>{{ order.status }}</td>
              <td>
                <button
                  @click="selectedOrderItems(order)"
                  class="button is-primary"
                >
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modals edit Product -->
  <Teleport to="body">
    <modal
      :show="showmodalSeeDetails"
      :orders="selectedOrders"
      @close="showmodalSeeDetails = false"
    />
  </Teleport>
</template>

<script>
import { mapGetters } from "vuex";
import modal from "../components/modals/DetailsOrder.vue";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Homepages",
  components: { modal, FontAwesomeIcon },
  data() {
    return {
      orders: [],
      searchInput: "",
      showmodalSeeDetails: false,
      filteredOrders: [],
      selectedOrders: null,
    };
  },
  computed: {
    ...mapGetters(["message", "username", "vendoruuid", "vendorid"]),
  },
  created() {
    axios
      .get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.vendorid}/vendor`
      )
      .then((res) => {
        this.orders = res.data;
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    searchOrders() {
      // Perform search logic and update the filteredOrders array
      if (this.searchInput === "") {
        return null;
      } else {
        const searchTerm = this.searchInput.toLowerCase();
        this.filteredOrders = this.orders.filter(
          (order) =>
            String(order.id).toLowerCase().includes(searchTerm) ||
            order.status.toLowerCase().includes(searchTerm)
        );
      }
    },
    selectedOrderItems(orderss) {
      this.selectedOrders = orderss;
      this.showmodalSeeDetails = true;
    },
  },
};
</script>

<style scoped>
.header-status {
  padding-top: 10px;
}

.box {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* Atur bayangan sesuai kebutuhan */
  background-color: #f1f1f1;
  /* Atur warna latar belakang sesuai kebutuhan */
  margin-top: 2%;
  background-image: url("../components/img/bckgrund.jpeg");
}

.container {
  text-align: center;
  padding-bottom: 10px;
  justify-content: center;
  align-items: center;
}

.table {
  opacity: 0.8;
}
</style>
