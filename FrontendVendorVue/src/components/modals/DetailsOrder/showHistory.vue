<template>
  <dialog
    :open="showHistory"
    class="modal modal-bottom sm:modal-middle bg-gray-600 bg-opacity-90"
  >
    <div method="dialog" class="modal-box">
      <h3 class="font-bold text-lg">History</h3>
      <div>
        <table class="table table-xs">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Bid Price</th>
              <th>Price Change</th>
              <th>Status</th>
              <th>Messages</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="histori in histories" :key="histori.id">
              <td v-for="bidItem in histori.bidItems">
                {{ bidItem.productName }}
              </td>
              <td v-for="bidItem in histori.bidItems">
                {{ bidItem.bidPrice }}
              </td>
              <td v-for="bidItem in histori.bidItems">
                {{ bidItem.bidPriceChange }}
              </td>
              <td>{{ histori.status }}</td>
              <td v-for="bidItem in histori.bidItems">
                {{ bidItem.messages }}
              </td>
              <td>{{ histori.orderDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn" @click="closeModal">Close</button>
    </div>
  </dialog>
</template>

<script>
import axios from "axios";

export default {
  props: {
    showHistory: Boolean,
    orders: Object,
  },
  watch: {
    orders: {
      handler() {
        this.history();
      },
      immediate: true, // Call the handler immediately on component creation
    },
  },
  data() {
    return {
      histories: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async history() {
      try {
        if (this.orders && this.orders.id) {
          const response = await axios.get(
            `http://rsudsamrat.site:8990/api/bid-exchange/history/${this.orders.id}`
          );
          this.histories = response.data;
          console.log("History", response.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  emits: ["close"],
};
</script>
