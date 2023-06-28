<template>
  <div class="display">
    <!-- ... -->
    <h1 class="text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
      SMART SAMRAT PROCUREMENT
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMyModal: false,
    };
  },
  methods: {
    showModal() {
      this.showMyModal = true;
    },
  },
};
</script>
