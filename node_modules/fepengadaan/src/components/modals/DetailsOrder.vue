<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" style="overflow: auto;">
      <div class="modal-container">
        <div class="modal-header">
          <h1 style="font-weight: bold">
            ID: {{ orders.id }}, Date: {{ orders.orderDate }}
          </h1>
          <h1>Status : {{ orders.status }}</h1>
        </div>
        <div class="modal-body" style="overflow: auto;">
          <table class="table is-bordered is-striped is-narrow is-hoverable">
            <thead>
              <tr>
                <th>id:</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Harga</th>
                <th>Harga Penwaran</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orderItem in orders.orderItems">
                <th @click="selectItem(orderItem)" style="cursor: default;">{{ orderItem.id }}</th>
                <td @click="selectItem(orderItem)" style="cursor: default;">{{ orderItem.product.name }}</td>
                <td>{{ orderItem.quantity }}</td>
                <td>{{ orderItem.product.price }}</td>
                <td>{{ orderItem.totalAmount }}</td>
                <td>{{ orderItem.status }}</td>
              </tr>
            </tbody>
          </table>
          <h1>Total Harga :{{ orders.payment.amount }}</h1>
          <h1 style="font-weight: bolder;" v-if="selectedItem">Harga yang ditawar : {{ selectedItem.bidPrice }}</h1>
          <h1>Total yang akan dibayar : {{ orders.orderItems[0].totalAmount }}</h1>
        </div>

        <div class="buttons" v-if="selectedItem !== null">
          <div v-if="selectedItem.status === 'OFFER'">
            <button class="button is-primary" @click.prevent="acceptBid">Accept</button>
            <button class="button is-danger" @click="showModalRejected">Reject</button>
            <button class="button is-info">See Details</button>
            <button @click="showModalHistory" class="button is-light"> See History </button>
          </div>

          <!-- <div v-if="selectedItem.status === 'PENDING' || selectedItem.status === 'REJECTED' || selectedItem.status === 'ACCEPTED'" style="padding-right: 5px">
            <button class="button is-info">See Details<span style="font-size: 12px;">(Comming Soon)</span></button>
          </div> -->

          <div v-if="selectedItem.status === 'ACCEPTED'" style="padding-right: 5px;">
            <button class="button is-primary">Kirim <span style="font-size: 12px;">(Comming Soon)</span></button>
            <button @click="showModalHistory" class="button is-light"> See History </button>
          </div>

        </div>
        <button style="display: flex; justify-content: flex-end; margin-top: 10px" class="button is-warning"
          @click="closeModal">
          Tutup
        </button>
      </div>
    </div>
  </Transition>


  <!-- Modal reject -->
  <Transition name="modal">
    <div v-if="showRejectModal" class="modal-mask" style="overflow: auto;">
      <div class="modal-container">
        <!-- Konten modal penolakan -->
        <h1 style="font-weight: bold;">History</h1>
        <p>Apakah Anda yakin ingin menolak penawaran BARANG {{ selectedItem.product.name }}</p>
        <div class="control">
          <input class="input is-hovered" type="number" placeholder="Harga" v-model="rejectBidInputBid" required>
        </div>
        <div class="buttons">
          <button class="button is-danger" :disabled="!rejectBidInputBid" @click="rejectBid">Tolak</button>
          <button class="button is-primary" @click="closeRejectModal">Batal</button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Modal History -->
  <Transition name="modal">
    <div v-if="showHistoryModal" class="modal-mask" style="overflow: auto;">
      <div class="modal-container">
        <!-- Konten modal penolakan -->
        <h1 style="font-weight: bold;">History</h1>
        <p>{{ orders.id }}</p>
        <div class="control">
          <div v-if="history">
            <div v-if="history.length > 0">
              <table class="table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Original Price</th>
                    <th>bidPrice</th>
                    <th>bidPriceChange</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="histori in history" :key="histori.id">
                    <th>{{ histori.productName }}</th>
                    <th>{{ histori.originalPrice }}</th>
                    <th>{{ histori.bidPrice }}</th>
                    <th>{{ histori.bidPriceChange }}</th>
                    <th>{{ histori.status }}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="history.length === 0">
              <p>There is no history.</p>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="button is-primary" @click="closeHistoryModal">Close</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";

export default {
  props: {
    show: Boolean,
    orders: Object,
  },
  emits: ['close'],

  data() {
    return {
      history: [],
      selectedItem: null,
      accepted: "ACCEPTED",
      rejected: "REJECTED",
      showRejectModal: false,
      showHistoryModal: false,
      fileName: "",
      rejectBidInputBid: "",
    };
  },

  computed: {
    getUniqueVendors() {
      const vendors = [];
      for (const orderItem of this.orders.orderItems) {
        const vendorName = orderItem.product.vendor.name;
        if (!vendors.includes(vendorName)) {
          vendors.push(vendorName);
        }
      }
      return vendors;
    },
    ...mapGetters(["message", "username", "vendoruuid", "vendorid"]),
  },

  methods: {
    selectItem(orderItem) {
      this.selectedItem = orderItem;
      axios.get(`http://rsudsamrat.site:8090/api/bid-exchange/bid-items/${this.orders.id}/${this.selectedItem.id}`)
        .then((res) => {
          this.history = res.data;
          console.log(this.history);
        }).catch((err) => {
          console.log(err)
        })
    },
    acceptBid() {
      axios.put(`http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.orders.id}/items/${this.selectedItem.id}`, {
        orderItemId: this.selectedItem.id,
        status: this.accepted
      })
        .then((response) => {
          console.log(response.data);
          axios.post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
            sender: this.username,
            senderId: this.vendorid,
            receiver: this.selectedItem.product.vendor.name,
            receiverId: this.selectedItem.product.vendor.vendorid,
            message: `Your Product Is Accepted `
          }).then((res) => console.log(res.data)).catch(err => console.log(err))
          this.$emit('close')
          location.reload();
        })
        .catch(err => console.log(err));
    },
    showModalRejected() {
      this.showRejectModal = true
    },
    showModalHistory() {
      this.showHistoryModal = true;
    },
    closeRejectModal() {
      this.showRejectModal = false;
    },
    closeHistoryModal() {
      this.showHistoryModal = false;
    },
    rejectBid() {
      axios.put(`http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.orders.id}/items/${this.selectedItem.id}`, {
        orderItemId: this.selectedItem.id,
        bidPrice: this.rejectBidInputBid,
        status: this.rejected
      }).then((response) => {
        console.log(response.data);
        this.showRejectModal = false;
        axios.post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
          sender: this.username,
          senderId: this.vendorid,
          receiver: this.selectedItem.product.vendor.name,
          receiverId: this.selectedItem.product.vendor.vendorid,
          message: `Rejected from Vendor : ${this.username}`
        }).then((res) => {
          this.$emit('close')
        }).catch(err => console.log(err))
        // this.$emit('close')
      }).catch(err => console.log(err));
    },
    closeModal() {
      this.$emit('close'); // Mengemisikan event 'close' ke komponen induk
      this.selectedItem = null;
      location.reload();
    },
    uploadFaktur(event) {
      const file = event.target.files[0]
      this.fileName = file.name
      console.log('Uploading file', file.name)
    },
    getItemsByVendor(vendor) {
      return this.orders.orderItems.filter(orderItem => orderItem.product.vendor.name === vendor);
    },
  },

};
</script>

<style scoped>
.buttons {
  margin-right: 0.5em;
}

/* Modals */

.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: auto;
  margin: auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

.modal-enter-from {
  opacity: 50;
}

.modal-leave-to {
  opacity: 100;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
