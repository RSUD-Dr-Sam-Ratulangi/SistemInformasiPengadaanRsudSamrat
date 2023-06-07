<template>
  <div>
    <p>Semua pesanan yang diminta rumah sakit akan muncul di sini.</p>
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Tanggal Pesanan</th>
          <th>Tindakan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="datas in data" :key="datas.id">
          <td>{{ datas.id }}</td>
          <td>{{ datas.orderDate }}</td>
          <td>
            <button @click="selectOrdersItem(datas)">Detail</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modals edit Product -->
  <Teleport to="body">
    <!-- pakai komponen modal, passing ke prop(lihat Editproduct.vue) -->
    <modal
      :show="showmodalSeeDetails"
      :orders="selectedOrder"
      @close="showmodalSeeDetails = false"
    />
  </Teleport>
</template>

<script>
import axios from "axios";
import modal from "../components/modals/DetailsOrder.vue";
import { mapGetters } from "vuex";

export default {
  components: { modal },

  data() {
    return {
      data: [],
      showmodalSeeDetails: false,
      selectedOrder: null,
    };
  },

  computed: {
    ...mapGetters(["vendoruuid", "vendorid"]),
  },
  created() {
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
      });
  },
  methods: {
    selectOrdersItem(order) {
      this.showmodalSeeDetails = true;
      this.selectedOrder = order;
    },
  },
};
</script>
