<template>
  <div class="container">
    <h1>SMART PROCUREMENT</h1>
  </div>

  <!-- Dropdown -->
  <div class="dropdown" :class="{ 'is-active': isActive }">
    <div class="dropdown-trigger">
      <button class="button" @click="toggleDropdown" aria-controls="dropdown-menu3">
        <FontAwesomeIcon icon="fas fa-chevron-down" />
      </button>
    </div>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item">
          Komputer
        </a>
        <a href="#" class="dropdown-item">
          Elektronik
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  components: {FontAwesomeIcon},
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive;
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>



