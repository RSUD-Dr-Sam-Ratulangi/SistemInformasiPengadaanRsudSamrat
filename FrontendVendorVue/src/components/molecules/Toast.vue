<template>
  <div
    class="toast toast-top toast-center pt-3 md:pt-60 lg:pt-5 flex items-center justify-center"
    v-if="showToast"
  >
    <div class="alert alert-error">
      <span class="text text-xs">{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    showToast: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
