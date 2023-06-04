<template>
  <footer class="footer">
    <div class="header">
      <div class="content has-text-left ">
      <p> SMART SAMRAT PROCUREMENT </p>
      <p>Layanan Informasi Pengadaan Barang & Jasa <br />Rumah Sakit Umum DR Sam Ratulangi<br /> Tondano</p>
      <div class="icon-brand">
      <FontAwesomeIcon icon="fa-brands fa-facebook" /> |
      <FontAwesomeIcon icon="fa-brands fa-instagram" /> |
      <FontAwesomeIcon icon="fa-solid fa-globe" />
      </div>

    </div>
    </div>

    <div class="content has-text-right">
      <div class="contact-info">
        <div>
          <FontAwesomeIcon icon="fa-solid fa-phone" />
          000-000-000
        </div>
        <div>
          <FontAwesomeIcon icon="fa-solid fa-location-dot" /> 
          Tondano
        </div>
        <div>
          <FontAwesomeIcon icon="fa-solid fa-envelope" />
          RSUD@gmail.com
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>


<style scoped>
footer {
  position:fixed;
  background-color: #a3a3a3;
  color: #fff;
  padding: 5px;
  font-size: 14px;
  bottom: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.header {
  font-weight: bold;
  font-size: small;
  padding-left: 20px;
}
.contact-info {
  display:table;
}
.contact-info div {
  margin-right: 150px;
}
.icon-brand {
  font-size: 20px;
}
</style>