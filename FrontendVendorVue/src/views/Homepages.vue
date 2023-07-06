<template>
  <div class="container flex mx-auto justify-center pt-3 pb-3">
    <div class="flex border-2 rounded">
      <button
        class="flex items-center justify-center"
        @click="searchOrderId"
      ></button>
      <input
        type="text"
        class="px-4 py-2 w-80"
        placeholder="Search..."
        v-model="orderId"
        @keyup.enter="searchOrderId"
      />
    </div>
  </div>
  <div class="flex items-center justify-center">
    <ul class="steps">
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
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Homepages",
  components: { FontAwesomeIcon },
  data() {
    return {
      dataShipping: [],
      orderId: "",
    };
  },
  computed: {
    ...mapGetters(["message", "username", "vendoruuid", "vendorid"]),
    hasOrderStatus() {
      return (step) => {
        return this.dataShipping.some((data) => data.status === step);
      };
    },
  },
  created() {
    this.getShipping();
  },
  methods: {
    async getShipping() {
      try {
        const response = await axios.get(
          `http://rsudsamrat.site:8990/order-status/status-entry/486`
        );
        console.log(response.data.statusList.status);
        this.dataShipping = response.data.statusList;
      } catch (err) {
        console.log(err);
      }
    },
    searchOrderId() {
      console.log(this.orderId);
    },
  },
};
</script>
