<template>
  <div class="boxSearch">  
    <h1>Search Your Orders</h1>
    <div class="container">
      <div>
        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" placeholder="See Orders" v-model="searchInput">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="contentProduct">
    <div class="card" v-for="order in filteredOrders" :key="order.id">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">Order Id: {{ order.id }}</p>
          </div>
        </div>
        <div class="content">
          <p>OrderDate: {{ order.orderDate }}</p>
          <p>Status: {{ order.status }}</p>
          <button class="button is-primary">Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Homepages",
  data() {
    return {
      orders: [],
      searchInput: "",
    };
  },

  computed: {
    ...mapGetters(["message", "username", "vendoruuid", "vendorid"]),
    filteredOrders() {
      if (this.searchInput === '') {
        null
      } else {
        // Filter products based on search input
        const searchTerm = this.searchInput.toLowerCase();
        return this.orders.filter(order => String(order.id).toLowerCase().includes(searchTerm) || order.status.toLowerCase().includes(searchTerm))
      }
    }
  },

  created() {
    axios.get(`http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.vendorid}/vendor`)
      .then((res) => {
        this.orders = res.data;
        console.log(res.data);
      }).catch(err => console.log(err));
  },

  methods: {

  },
};
</script>


<style scoped>

.boxSearch {
  margin-top: 5%;
  padding-bottom: 5px;
  width: 100%;
  align-items: center;
  text-align: center;
  height: auto;
  background-color: rgb(255, 255, 255);
  border: #555;
}
.container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}

.card {
  width: 300px;
  margin: 30px;
  margin-left: 36%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.card-image {
  text-align: center;
}

.card-image img {
  max-width: 100%;
  max-height: 200px;
}

.card-content {
  margin-top: 10px;
}

.title {
  margin-bottom: 5px;
}

.content {
  font-size: 14px;
  color: #555;
}
</style>