<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h1 style="font-weight: bold">Penawaran</h1>
        </div>
        <div class="modal-body">
          <p>Semua penawaran dapat dilihat disini</p>
        </div>
        <button
          style="display: flex; justify-content: flex-end; margin-top: 10px"
          class="button is-warning"
          @click="$emit('close')"
        >
          close
        </button>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    orders: Object,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
