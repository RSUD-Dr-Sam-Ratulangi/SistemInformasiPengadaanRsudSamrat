<template>
  <div class="toast toast-top toast-end" v-if="showToast">
    <div class="alert alert-error">
      <span>{{ message }}</span>
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
