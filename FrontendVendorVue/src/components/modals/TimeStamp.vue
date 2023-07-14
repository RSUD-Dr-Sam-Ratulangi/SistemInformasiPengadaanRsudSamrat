<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog :open="showShipping" class="modal bg-gray-600 bg-opacity-90">
    <div method="dialog" class="modal-box w-11/12 max-w-3xl h-full">
      <h3 class="font-bold text-lg">{{ orderId }}</h3>
      <div class="">
        <ul
          class="steps steps-vertical sm:steps-vertical lg:steps-horizontal xl:steps-horizontal"
        >
          <li
            class="step"
            v-bind:class="{ ' step-primary': hasOrderStatus('ORDER') }"
          >
            ORDER
          </li>
          <li
            class="step"
            v-bind:class="{ ' step-primary': hasOrderStatus('NEGOTIATION') }"
          >
            NEGOTIATION
          </li>
          <li
            class="step"
            v-bind:class="{ ' step-primary': hasOrderStatus('VALIDATING') }"
          >
            VALIDATING
          </li>
          <li
            class="step"
            v-bind:class="{ ' step-primary': hasOrderStatus('SHIPPING') }"
          >
            SHIPPING
          </li>
          <li
            class="step"
            v-bind:class="{ ' step-primary': hasOrderStatus('CHECKING') }"
          >
            CHECKING
          </li>
          <li
            class="step"
            v-bind:class="{ ' step-primary': hasOrderStatus('PAYMENT') }"
          >
            PAYMENT
          </li>
          <li
            class="step"
            v-bind:class="{ ' step-primary': hasOrderStatus('COMPLETE') }"
          >
            COMPLETE
          </li>
        </ul>
      </div>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn" @click="closeModal">Close</button>
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
  computed: {
    testData() {
      data.mapGetters;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  emits: ["close"],
};
</script>
