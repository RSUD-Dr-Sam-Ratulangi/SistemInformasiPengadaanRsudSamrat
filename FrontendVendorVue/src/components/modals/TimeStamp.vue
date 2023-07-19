<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog :open="showShipping" class="modal bg-gray-600 bg-opacity-90">
    <div method="dialog" class="modal-box w-11/12 max-w-3xl h-full">
      <h3 class="font-bold text-lg">{{ orderId }}</h3>
      <div v-if="!hasOrderStatus('CANCEL')">
        <ul
          class="steps steps-vertical sm:steps-vertical lg:steps-horizontal xl:steps-horizontal"
        >
          <li
            class="step"
            data-content="•"
            v-bind:class="{ ' step-primary': hasOrderStatus('ORDER') }"
          >
            ORDER
          </li>
          <li
            class="step"
            data-content="•"
            v-bind:class="{ ' step-primary': hasOrderStatus('NEGOTIATION') }"
          >
            NEGOTIATION
          </li>
          <li
            class="step"
            data-content="•"
            v-bind:class="{ ' step-primary': hasOrderStatus('VALIDATING') }"
          >
            VALIDATING
          </li>
          <li
            class="step"
            data-content="•"
            v-bind:class="{ ' step-primary': hasOrderStatus('SHIPPING') }"
          >
            SHIPPING
          </li>
          <li
            class="step"
            data-content="•"
            v-bind:class="{ ' step-primary': hasOrderStatus('CHECKING') }"
          >
            CHECKING
          </li>
          <li
            class="step"
            data-content="•"
            v-bind:class="{ ' step-primary': hasOrderStatus('PAYMENT') }"
          >
            PAYMENT
          </li>
          <li
            class="step"
            data-content="•"
            v-bind:class="{ ' step-primary': hasOrderStatus('COMPLETE') }"
          >
            COMPLETE
          </li>
        </ul>
      </div>
      <div
        class="flex justify-center items-center"
        v-if="hasOrderStatus('CANCEL')"
      >
        <p class="font-bold text-2xl">THIS ORDER IS CANCELED</p>
      </div>
      <div>
        <div>
          <div class="flex">
            <ul class="steps steps-vertical">
              <li class="step" v-for="datas in data" :key="datas.id">
                <div class="flex items-center">
                  <span class="mr-2">{{ datas.status }}</span>
                  <div class="flex flex-col">
                    <span class="text-sm text-gray-500 font-bold">{{
                      timeAgo(datas.timestamp)
                    }}</span>
                    <span class="text-xs text-gray-400">{{
                      formatDataTime(datas.timestamp)
                    }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-neutral" @click="closeModal">Close</button>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  data() {
    return {
      test: [],
    };
  },
  props: {
    showShipping: {
      type: Boolean,
    },
    orderId: {
      type: String,
      required: true,
    },
    hasOrderStatus: {
      type: Function,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit("close");
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
    formatDataTime(time) {
      const date = new Date(time);
      return date.toLocaleString();
    },
    getCurrentStatus2(status, index) {
      if (index === 0) {
        return status === "CANCEL" ? "X" : "✓";
      } else {
        return "●";
      }
    },
  },
  emits: ["close"],
};
</script>
