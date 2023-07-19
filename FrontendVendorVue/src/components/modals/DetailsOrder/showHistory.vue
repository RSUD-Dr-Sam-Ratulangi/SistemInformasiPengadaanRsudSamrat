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
    timeAgo(time) {
      const now = new Date();
      const then = new Date(time);
      const seconds = Math.round((now - then) / 1000);
      const minutes = Math.round(seconds / 60);
      const hours = Math.round(minutes / 60);
      const days = Math.round(hours / 24);
      const weeks = Math.round(days / 7);
      const months = Math.round(days / 30);
      const years = Math.round(days / 365);

      if (seconds < 60) {
        return "Just now";
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else if (days < 7) {
        return `${days} days ago`;
      } else if (weeks < 4) {
        return `${weeks} weeks ago`;
      } else if (months < 12) {
        return `${months} months ago`;
      } else {
        return `${years} years ago`;
      }
    },
  },
  emits: ["close"],
};
</script>
