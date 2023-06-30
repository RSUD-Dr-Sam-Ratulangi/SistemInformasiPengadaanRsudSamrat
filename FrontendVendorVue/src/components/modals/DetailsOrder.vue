<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" style="overflow: auto">
      <div class="modal-container">
        <div class="modal-header">
          <h1 style="font-weight: bold">
            ID: {{ orders.id }}, Date: {{ orders.orderDate }}
          </h1>
          <h1>Status : {{ orders.status }}</h1>
        </div>
        <div class="modal-body" style="overflow: auto">
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
                <th @click="selectItem(orderItem)" style="cursor: default">
                  {{ orderItem.id }}
                </th>
                <td @click="selectItem(orderItem)" style="cursor: default">
                  {{ orderItem.product.name }}
                </td>
                <td>{{ orderItem.quantity }}</td>
                <td>{{ orderItem.product.price }}</td>
                <td>{{ orderItem.totalAmount }}</td>
                <td>{{ orderItem.status }}</td>
              </tr>
            </tbody>
          </table>
          <h1>Total Harga :{{ orders.payment.amount }}</h1>
          <h1 style="font-weight: bolder" v-if="selectedItem">
            Harga yang ditawar : {{ selectedItem.bidPrice }}
          </h1>
          <h1>
            Total yang akan dibayar : {{ orders.orderItems[0].totalAmount }}
          </h1>
        </div>

        <div class="buttons" v-if="selectedItem !== null">
          <div v-if="selectedItem.status === 'OFFER'">
            <button class="btn btn-primary" @click.prevent="acceptBid">
              Accept
            </button>
            <button class="btn btn-danger" @click="showModalRejected">
              Reject
            </button>
            <button class="btn btn-info">See Details</button>
            <button @click="showModalHistory" class="button is-light">
              See History
            </button>
          </div>

          <!-- Refund upload file -->
          <div v-if="selectedItem.status === 'REFUND'">
            <p>Upload Foto, barang yang akan dikirim kembali</p>
            <label
              class="block text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
              >Upload file</label
            >
            <input
              class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              @change="uploadRefundItem"
            />
            <button
              class="btn btn-success mt-3"
              v-if="refundFile.length > 0"
              @click="uploadRefund"
            >
              Upload
            </button>
          </div>

          <div
            v-if="selectedItem.status === 'ACCEPTED'"
            style="padding-right: 5px"
          >
            <button class="btn btn-primary">
              Kirim <span style="font-size: 12px">(Comming Soon)</span>
            </button>
            <button @click="showModalHistory" class="btn btn-error">
              See History
            </button>
          </div>
        </div>
        <div style="display: flex">
          <div class="footer-modals">
            <button class="button is-warning" @click="closeModal">Tutup</button>
          </div>
          <div
            v-if="
              orders.status !== 'SHIPPING' &&
              orders.status !== 'NEGOTIATION' &&
              allItemsAccepted
            "
            class="file"
            style="padding-left: 10px"
          >
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="resume"
                @change="handleFileChange"
                :disabled="selectedFile.length === 1"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <FontAwesomeIcon icon="fas fa-upload" />
                </span>
                <span class="file-label"> Upload Faktur </span>
              </span>
            </label>
          </div>
          <div v-if="selectedFile" style="display: flex">
            <p v-if="selectedFile.length > 0">{{ selectedFile[0].name }}</p>
            <button
              v-if="selectedFile.length > 0"
              @click.prevent="uploadFaktur"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Modal reject -->
  <Transition name="modal">
    <div v-if="showRejectModal" class="modal-mask" style="overflow: auto">
      <div class="modal-container">
        <!-- Konten modal penolakan -->
        <h1 style="font-weight: bold">History</h1>
        <p>
          Apakah Anda yakin ingin menolak penawaran BARANG
          {{ selectedItem.product.name }}
        </p>
        <div class="control">
          <input
            class="input is-hovered"
            type="number"
            placeholder="Harga"
            v-model="rejectBidInputBid"
            required
          />
        </div>
        <div class="control">
          <input
            class="input is-hovered"
            type="text"
            placeholder="Message"
            v-model="rejectBidInputMessage"
            required
          />
        </div>
        <div class="buttons">
          <button
            class="button is-danger"
            :disabled="!rejectBidInputBid"
            @click="rejectBid"
          >
            Tolak
          </button>
          <button class="button is-primary" @click="closeRejectModal">
            Batal
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Modal History -->
  <Transition name="modal">
    <div v-if="showHistoryModal" class="modal-mask" style="overflow: auto">
      <div class="modal-container">
        <!-- Konten modal penolakan -->
        <h1 style="font-weight: bold">History</h1>
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
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="histori in history" :key="histori.id">
                    <th>{{ histori.productName }}</th>
                    <th>{{ histori.originalPrice }}</th>
                    <th>{{ histori.bidPrice }}</th>
                    <th>{{ histori.bidPriceChange }}</th>
                    <th>{{ histori.status }}</th>
                    <th>{{ histori.message }}</th>
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
          <button class="button is-primary" @click="closeHistoryModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: {
    show: Boolean,
    orders: Object,
  },
  emits: ["close"],
  data() {
    return {
      history: [],
      employee: [],
      selectedItem: null,
      accepted: "ACCEPTED",
      rejected: "REJECTED",
      showRejectModal: false,
      showHistoryModal: false,
      fileName: "",
      rejectBidInputBid: "",
      rejectBidInputMessage: "",
      selectedFile: [],
      refundFile: [],
    };
  },
  created() {
    this.getEmployee();
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
    allItemsAccepted() {
      return this.orders.orderItems.every(
        (item) => item.status === this.accepted
      );
    },
    ...mapGetters(["message", "username", "vendoruuid", "vendorid"]),
  },
  methods: {
    selectItem(orderItem) {
      this.selectedItem = orderItem;
      axios
        .get(
          `http://rsudsamrat.site:8090/api/bid-exchange/bid-items/${this.orders.id}/${this.selectedItem.id}`
        )
        .then((res) => {
          this.history = res.data;
          console.log(this.history);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    acceptBid() {
      axios
        .put(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.orders.id}/items/${this.selectedItem.id}`,
          {
            orderItemId: this.selectedItem.id,
            status: this.accepted,
          }
        )
        .then((response) => {
          const ppRole = this.employee[1].role;
          const ppIds = this.employee[1].id;
          console.log(response.data);
          axios
            .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
              sender: this.username,
              senderId: this.vendorid,
              receiver: ppRole,
              receiverId: ppIds,
              message: `${this.orders.id},Your Product ${this.selectedItem.product.name} Is Accepted `,
            })
            .then((res) =>
              alert(
                `${this.orders.id},Your Product ${this.selectedItem.product.name} Is Accepted `
              )
            )
            .catch((err) => console.log(err));
          this.$emit("close");
          location.reload();
        })
        .catch((err) => console.log(err));
    },
    showModalRejected() {
      this.showRejectModal = true;
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
      axios
        .put(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.orders.id}/items/${this.selectedItem.id}`,
          {
            orderItemId: this.selectedItem.id,
            bidPrice: this.rejectBidInputBid,
            status: this.rejected,
            message: this.rejectBidInputMessage,
          }
        )
        .then((response) => {
          const ppRole = this.employee[1].role;
          const ppIds = this.employee[1].id;
          console.log(response.data);
          this.showRejectModal = false;
          //Post notif
          axios
            .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
              sender: this.username,
              senderId: this.vendorid,
              receiver: ppRole,
              receiverId: ppIds,
              message: `${this.orders.id},Your Product ${this.selectedItem.product.name} Rejected `,
            })
            .then((res) =>
              confirm(
                `This Product ${this.selectedItem.product.name} will be Rejected, Are you suer? `
              )
            )
            .catch((err) => console.log(err));
          // this.$emit('close')
        })
        .catch((err) => console.log(err));
    },
    closeModal() {
      this.$emit("close"); // Mengemisikan event 'close' ke komponen induk
      this.selectedItem = null;
      location.reload();
    },
    uploadFaktur() {
      const ppRole = this.employee[1].role;
      const ppIds = this.employee[1].id;
      const panpenRole = this.employee[3].role;
      const panpenIds = this.employee[3].id;

      console.log(`File ${this.selectedFile} berhasil di upload`);
      axios
        .put(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.orders.id}/status`,
          {
            status: "SHIPPING",
          }
        )
        .then((res) => {
          //Send notif to PP
          console.log(res.data);
          axios
            .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
              sender: this.username,
              senderId: this.vendorid,
              receiver: ppRole,
              receiverId: ppIds,
              message: `FAKTUR TELAH DIKIRIM BERSAMA FILE ${this.selectedFile}. `,
            })
            .then((res) => {
              //Send Notif to panpen
              axios
                .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
                  sender: this.username,
                  senderId: this.vendorid,
                  receiver: panpenRole,
                  receiverId: panpenIds,
                  message: `${panpenRole} mendapatkan notifikasi pemeriksaan barang, order id ${this.orders.id}. `,
                })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    getItemsByVendor(vendor) {
      return this.orders.orderItems.filter(
        (orderItem) => orderItem.product.vendor.name === vendor
      );
    },
    async getEmployee() {
      try {
        const response = await axios.get(
          "http://rsudsamrat.site:8080/employee"
        );
        this.employee = response.data;
        console.log("employee", response.data);
      } catch (err) {
        console.log(err);
      }
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0];

      // Save the selected file to the array
      this.selectedFile.push(selectedFile);
      console.log(this.selectedFile);

      // Reset the input value to allow selecting the same file again
      event.target.value = "";
    },
    async uploadRefundItem(event) {
      const File = event.target.files[0];

      this.refundFile.push(File);
    },
    async uploadRefund() {
      const panpenRole = this.employee[3].role;
      const panpenIds = this.employee[3].id;
      console.log(`File ${this.refundFile[0].name} berhasil diupload`);
      try {
        const res = axios.put(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orderitems/${this.selectedItem.id}/status`,
          {
            orderItemId: this.selectedItem.id,
            status: "RESEND",
          }
        );
      } catch (err) {
        console.log(err);
      }
      //Send Notif to panpen
      axios
        .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
          sender: this.username,
          senderId: this.vendorid,
          receiver: panpenRole,
          receiverId: panpenIds,
          message: `${panpenRole} mendapatkan notifikasi orderItem sudah di kirim lagi, order id ${this.orders.id}. `,
        })
        .then((res) => console.log("notif dikirim", res))
        .catch((err) => console.log(err));
    },
  },
  components: { FontAwesomeIcon },
};
</script>

<style scoped>
.buttons {
  margin-right: 0.5em;
}

.footer-modals {
  justify-content: flex-end;
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
