<template>
  <dialog
    :open="show"
    v-if="orders"
    class="modal sm:modal-middle bg-gray-600 bg-opacity-90"
  >
    <div method="dialog" class="modal-box w-11/12 max-w-5xl">
      <h3 class="font-bold text-sm">Order Id: {{ orders.id }}</h3>

      <div class="mt-3 mb-2">
        <table class="table table-xs">
          <thead>
            <tr>
              <th>id</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Harga</th>
              <th>Total</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="orderItem in orders.orderItems" :key="orderItem.id">
              <th>
                {{ orderItem.id }}
              </th>
              <td>
                {{ orderItem.product.name }}
              </td>
              <td>{{ orderItem.quantity }}</td>
              <td>{{ orderItem.product.price }}</td>
              <td>{{ orderItem.totalAmount }}</td>
              <td>{{ orderItem.status }}</td>
              <td @click="selectItem(orderItem)">
                <div class="dropdown">
                  <label tabindex="0" class="btn m-1"
                    ><FontAwesomeIcon icon="fa-solid fa-bars"
                  /></label>
                  <ul
                    tabindex="0"
                    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                  >
                    <div v-if="orderItem.status === 'OFFER'">
                      <li>
                        <button class="btn btn-xs" @click="acceptBid">
                          ACCEPT
                        </button>
                      </li>
                      <li>
                        <button class="btn btn-xs" @click="showModalReject">
                          REJECT
                        </button>
                      </li>
                    </div>
                    <div v-if="orderItem.status === 'REFUND'">
                      <li>
                        <button class="btn btn-xs" @click="resendRefund()">
                          RESEND
                        </button>
                      </li>
                    </div>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-action">
        <!-- if there is a button, it will close the modal -->
        <div
          class="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
          v-if="orders.status === 'VALIDATING' && allItemsAccepted"
        >
          <input
            v-if="!selectedFile || selectedFile.length === 0"
            type="file"
            class="file-input file-input-primary file-input-sm items-start mr-2"
            @change="selectedFile = $event.target.files"
          />
          <button
            v-if="selectedFile.length === 1"
            class="btn btn-primary"
            @click="uploadFaktur"
          >
            Upload
          </button>
        </div>
        <button class="btn btn-warning" @click="handleCloseClick">Close</button>
        <button class="btn btn-accent" @click="showModalHistory">
          History
        </button>
      </div>
      <p v-if="selectedFile && selectedFile.length > 0">
        {{ selectedFile[0].name }}
      </p>
    </div>
  </dialog>

  <Toast :message="infoMessage" :showToast="showToasts" />

  <rejectBid
    :showRB="showRejectModal"
    :orders="orders"
    :orderItems="selectedItem"
    @close="showRejectModal = false"
    @cancel="closeAllModals"
  />

  <showHistory
    :showHistory="showHistoryModal"
    :orders="orders"
    @close="showHistoryModal = false"
  />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import rejectBid from "./DetailsOrder/rejectBid.vue";
import { mapGetters } from "vuex";
import Toast from "../molecules/Toast.vue";
import showHistory from "./DetailsOrder/showHistory.vue";
export default {
  components: { FontAwesomeIcon, rejectBid, showHistory, Toast },
  props: {
    show: Boolean,
    orders: Object,
  },
  emits: ["close"],
  data() {
    return {
      employee: [],
      selectedItem: null,
      showRejectModal: false,
      showHistoryModal: false,
      accepted: "ACCEPTED",
      rejected: "REJECTED",
      selectedFile: [],
      showToasts: false,
      infoMessage: "",
    };
  },
  computed: {
    allItemsAccepted() {
      return this.orders.orderItems.every(
        (item) => item.status === this.accepted
      );
    },
    ...mapGetters(["message", "username", "vendoruuid", "vendorid"]),
  },
  created() {
    this.getEmployee();
  },
  methods: {
    selectItem(orderItem) {
      this.selectedItem = orderItem;
      console.log(orderItem.id);
    },
    handleCloseClick() {
      this.showRejectModal = false;
      this.$emit("close");
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
    selectedFiles(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      this.selectedFile = file; // Convert FileList to an array
      formData.append("orderId", this.orders.id);
      formData.append("files", file);
      axios
        .post("http://rsudsamrat.site:8990/faktur-orders", formData)
        .then((res) => {
          console.log(res.data);
        });
      console.log(file);
    },
    uploadFaktur() {
      if (!this.selectedFile || this.selectedFile.length === 0) {
        console.log("No file selected");
        return;
      }

      const ppRole = this.employee[1].role;
      const ppIds = this.employee[1].id;
      const panpenRole = this.employee[3].role;
      const panpenIds = this.employee[3].id;

      const formData = new FormData();
      formData.append("orderId", this.orders.id);
      formData.append("files", this.selectedFile[0]);

      axios
        .post("http://rsudsamrat.site:8990/faktur-orders", formData)
        .then((res) => {
          // File uploaded successfully
          console.log(res.data);

          // Send notification to PP
          axios
            .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
              sender: this.username,
              senderId: this.vendorid,
              receiver: ppRole,
              receiverId: ppIds,
              message: `FAKTUR TELAH DIKIRIM BERSAMA FILE ${this.selectedFile[0].name}.`,
            })
            .then((res) => {
              // Send notification to panpen
              axios
                .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
                  sender: this.username,
                  senderId: this.vendorid,
                  receiver: panpenRole,
                  receiverId: panpenIds,
                  message: `${panpenRole} mendapatkan notifikasi pemeriksaan barang, order id ${this.orders.id}.`,
                })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      // Update the order status (assuming it should be done even if file upload fails)
      axios
        .put(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.orders.id}/status`,
          {
            status: "SHIPPING",
          }
        )
        .then((res) => {
          console.log(res.data);
        });

      axios
        .post(`http://rsudsamrat.site:8990/order-status`, {
          orderId: this.orders.id,
          status: "SHIPPING",
        })
        .then((response) => {
          // Handle the response
          console.log("ITEM STATUS UPDATED", response);
        })
        .catch((error) => {
          console.error(error);
        })
        .catch((err) => console.log(err));
      this.$emit("close");
      this.selectedFile = [];
    },
    async resendRefund() {
      const panpenRole = this.employee[3].role;
      const panpenIds = this.employee[3].id;
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
        .then((res) => {
          console.log("notif dikirim", res);
        })
        .catch((err) => console.log(err));
      this.$emit("close");
    },
    showToast() {
      this.showToasts = true;
      this.infoMessage = "ORDER ID TIDAK DITEMUKAN, MOHON PERIKSA KEMBALI.";
      setTimeout(() => {
        this.showToasts = false;
      }, 3000);
    },
    showModalReject() {
      this.showRejectModal = true;
    },
    showModalHistory() {
      this.showHistoryModal = true;
    },
    closeAllModals() {
      this.showRejectModal = false; // Close the child modal
      // Additional code to close the parent modal if needed
      this.$emit("close"); // Emit "close" event to close the parent modal
    },
  },
};
</script>
