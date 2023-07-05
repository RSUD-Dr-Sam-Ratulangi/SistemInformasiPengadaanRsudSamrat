<template>
  <dialog
    :open="showRB"
    class="modal sm:modal-middle bg-gray-600 bg-opacity-90"
  >
    <div method="dialog" class="modal-box">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="closeModalRB"
      >
        ✕
      </button>
      <form @submit.prevent="rejectBid">
        <h3 class="font-bold text-sm">MENOLAK PENAWARAN</h3>
        <label class="label font-bold">Harga :</label>
        <input
          type="number"
          class="input input-primary input-sm"
          placeholder="Harga"
          v-model="rejectBidInputBid"
        />
        <label class="label text text-sm font-bold">Deskripsi :</label>
        <input
          type="text"
          class="input input-primary input-sm w-full"
          placeholder="Deskripsi"
          v-model="rejectBidInputMessage"
        />
        <button class="btn btn-primary btn-sm mt-2" type="submit">Tolak</button>
        <button class="btn btn-primary btn-sm mt-2 ml-2" @click="cancelModal">
          Batal
        </button>
      </form>
    </div>
  </dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    showRB: Boolean,
    orders: Object,
    orderItems: Object,
  },
  data() {
    return {
      employee: [],
      rejectBidInputBid: "",
      rejectBidInputMessage: "",
      accepted: "ACCEPTED",
      rejected: "REJECTED",
    };
  },
  created() {
    this.getEmployee();
  },
  methods: {
    rejectBid() {
      axios
        .put(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${this.orders.id}/items/${this.orderItems.id}`,
          {
            orderItemId: this.orderItems.id,
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
              message: `${this.orders.id},Your Product ${this.orderItems.product.name} Rejected `,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          this.$emit("close");
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
    closeModalRB() {
      this.$emit("close");
    },
    cancelModal() {
      this.$emit("cancel");
    },
  },
  emits: ["close", "cancel"],
};
</script>
