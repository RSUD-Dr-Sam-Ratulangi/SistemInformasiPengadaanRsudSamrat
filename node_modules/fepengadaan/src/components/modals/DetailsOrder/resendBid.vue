<template>
  <dialog :open="showRsBid" class="modal bg-gray-600 bg-opacity-90">
    <form method="dialog" class="modal-box">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="closeModalResend"
      >
        ✕
      </button>
      <div class="border-b border-gray-500">
        <h3 class="font-bold text-lg" v-if="orderItems">
          {{ orderItems.id }}, Mohon Kirim Bukti Barang
        </h3>
      </div>

      <div class="grid mt-3">
        <!-- Upload Picture -->
        <label class="block mb-2 text-sm font-medium text-gray-900"
          >Upload File:
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          accept="image/jpeg"
          @change="onFileChange"
        />
        <div class="flex flex-1 flex-wrap">
          <div
            class="collapse-title text-xl font-medium"
            v-if="fileImage.length > 0"
          >
            See Picture :
            <p class="text text-sm">
              <span>Upload Minimal 2 Foto, maksimal 5</span>
            </p>
          </div>
          <ul v-for="(file, index) in fileImage" :key="file.id">
            <div class="flex mt-3 mb-2">
              <button class="btn btn-primary mr-3" @click="removeFile(index)">
                X
              </button>
              <li class="border border-separate border-blue-500">
                <img
                  :src="file"
                  alt="Selected Image"
                  width="100"
                  height="100"
                />
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div class="flex justify-end items-end">
        <button
          class="btn btn-primary"
          v-if="fileImage.length >= 2"
          @click="resendRefund"
        >
          Upload
        </button>
      </div>
    </form>
  </dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    showRsBid: {
      type: Boolean,
    },
    orderItems: Object,
    orders: Object,
    employee: Object,
  },
  data() {
    return {
      fileImage: [],
    };
  },
  methods: {
    closeModalResend() {
      this.$emit("close");
    },
    resendRefund() {
      const panpenRole = this.employee[3].role;
      const panpenIds = this.employee[3].id;
      axios
        .put(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orderitems/${this.orderItems.id}/status`,
          {
            orderItemId: this.orderItems.id,
            status: "RESEND",
          }
        )
        .then((res) => {
          console.log(res);
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
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.$emit("close");
        });

      const data = this.fileImage.map((file, index) => {
        return file;
      });

      console.log(data);
      (this.fileImage = []), this.$emit("close");

      //Send Notif to panpen
      this.$emit("close");
    },
    toggleCollapse() {
      this.isOpen = !this.isOpen; // Toggle isOpen value
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (!file) {
        this.$emit("open");
      } else {
        const imageUrl = URL.createObjectURL(file);
        this.fileImage.push(imageUrl);
        console.log(file);
      }
    },
    removeFile(index) {
      this.fileImage.splice(index, 1);
    },
  },
  emits: ["close", "cancel", "open"],
};
</script>
