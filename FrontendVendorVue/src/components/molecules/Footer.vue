<template>
  <footer
    class="footer relative footer-center items-center mt-auto text-base-content bottom-0 left-0 w-full"
  >
    <div class="flex gap-4 pt-3 justify-center">
      <div>
        <RouterLink to="/">
          <div class="nav-item">
            <p class="font-semibold text-black">Home</p>
          </div>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/productView">
          <div class="nav-item">
            <p class="font-semibold text-black">Products</p>
          </div>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/orderDetails">
          <div class="nav-item">
            <p class="font-semibold text-black">Orders</p>
          </div>
        </RouterLink>
      </div>
    </div>
    <div>
      <div class="grid grid-flow-col gap-4">
        <div class="grid">
          <h2 class="font-bold text-black">SMART SAMRAT PROCUREMENT</h2>
          <strong class="text-2x1 text-gray-700"
            >Layanan Informasi pengadaan Barang & Jasa Rumah Sakit Umum DR Sam
            Ratulangi Tondano</strong
          >
          <div class="flex flex-col items-center gap-4">
            <div class="flex gap-4">
              <div>
                <FontAwesomeIcon
                  class="text-2xl text-black"
                  icon="fa-brands fa-facebook"
                />
              </div>
              <div>
                <FontAwesomeIcon
                  class="text-2xl text-black"
                  icon="fa-brands fa-instagram"
                />
              </div>
              <div>
                <FontAwesomeIcon
                  class="text-2xl text-black"
                  icon="fa-solid fa-globe"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="font-bold text-2x1 text-black">
          Copyright © 2023 - All right reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style scoped>
.footer {
  background-color: #cde0c9;
}
</style>
