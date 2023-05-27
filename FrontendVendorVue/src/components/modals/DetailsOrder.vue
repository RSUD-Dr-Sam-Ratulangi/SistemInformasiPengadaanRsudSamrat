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
          <div v-if="selectedItem.status === 'OFFER' ">
          <button class="button is-primary" @click.prevent="acceptBid">Accept</button>
          <button class="button is-danger" @click="showModalRejected">Reject</button>
          <button class="button is-info">See Details</button>
          </div>

          <div v-if="selectedItem.status === 'PENDING' || selectedItem.status === 'REJECTED' || selectedItem.status === 'ACCEPTED' ">
            <button class="button is-info">See Details</button>
          </div>
          <!-- <div class="file has-name is-fullwidth">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" @change="uploadFaktur"
                accept="application/pdf, .doc, .docx">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Upload Faktur (PDF/DOCX)
                </span>
              </span>
              <span class="file-name">
                {{ fileName }}
              </span>
            </label>
          </div> -->
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
        <h1 style="font-weight: bold;">Tolak Penawaran</h1>
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
</template>

<script>
import axios from 'axios';

export default {
  props: {
    show: Boolean,
    orders: Object,
  },
  emits: ['close'],

  data() {
    return {
      selectedItem: null,
      accepted: "ACCEPTED",
      rejected: "REJECTED",
      showRejectModal: false,
      fileName: "",
      rejectBidInputBid: "",
    };
  },

  methods: {
    selectItem(orderItem) {
      this.selectedItem = orderItem;
    },
    acceptBid() {
      axios.put(`http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.orders.id}/items/${this.selectedItem}`, {
        orderItemId: this.selectedItem.id,
        status: this.accepted
      })
        .then((response) => {
          console.log(response.data);
          this.$emit('close')
        })
        .catch(err => console.log(err));
    },
    showModalRejected() {
      this.showRejectModal = true
    },
    closeRejectModal() {
      this.showRejectModal = false;
      this.selectedItem = null;
    },
    rejectBid() {
      axios.put(`http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.orders.id}/items/${this.selectedItem.id}`, {
        orderItemId: this.selectedItem.id,
        bidPrice: this.rejectBidInputBid,
        status: this.rejected
      }).then((response) => {
        console.log(response.data);
        this.showRejectModal = false;
        this.$emit('close')
        
      }).catch(err => console.log(err));
    },
    closeModal() {
      this.$emit('close'); // Mengemisikan event 'close' ke komponen induk
      this.selectedItem = null;
    },
    uploadFaktur(event) {
      const file = event.target.files[0]
      this.fileName = file.name
      console.log('Uploading file', file.name)
    }
  },

};
</script>

<style scoped>
.buttons {
  margin-right: 0.5em;
}
</style>
