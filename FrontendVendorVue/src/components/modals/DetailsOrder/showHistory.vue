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
              <th>No</th>
              <th>Product Name</th>
              <th>Bid Price</th>
              <th>Price Change</th>
              <th>Status</th>
              <th>Messages</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(e, i) in newHistories" :key="i">
              <td>{{ i }}</td>
              <td>{{ e.productName }}</td>
              <td>{{ e.bidPrice }}</td>
              <td>{{ e.bidPriceChange }}</td>
              <td>{{ e.status }}</td>
              <td>{{ e.message }}</td>
              <td>{{ e.orderDate }}</td>
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
      newHistories: [],
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

          this.processHistory();
        }
      } catch (err) {
        console.log(err);
      }
    },
    processHistory() {
      const newHistory = [];
      this.histories.forEach((item) => {
        item.bidItems.forEach((bidItem) => {
          newHistory.push({
            ...bidItem,
            status: item.status,
            orderDate: item.orderDate,
          });
        });
      });
      this.newHistories = newHistory;
    },
  },
  emits: ["close"],
};
</script>
