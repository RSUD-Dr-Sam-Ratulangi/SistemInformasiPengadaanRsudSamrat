<template>
  <div class="footer">
    <div>
      <div className="footer-buttons">
        <RouterLink to="/" className="btn btn-light">
          Dashboard
        </RouterLink>
        <RouterLink to="/productview" className="btn btn-light">
        Products
        </RouterLink>
        <RouterLink to="/orderDetails" className="btn btn-light">
        Orders
        </RouterLink>
      </div>
      <div className="footer-text1">
        <span className="footer-text-bold">Smart Samrat Procurement</span>
        <br />
        <span className="footer-text-small">
          Layanan Informasi Pengadaan Barang & Jasa Rumah Sakit Umum DR Sam
          Ratulangi Tondano
        </span>
      </div>
      <div className="footer-social-icons">
        <a href="https://instagram.com/rsud_samrat_tondano?igshid=OGQ5ZDc2ODk2ZA==">
          <FontAwesomeIcon icon="fa-brands fa-facebook" />
        </a>
        <a href="https://www.facebook.com/PageOfficialRSUDSamRatulangi?mibextid=LQQJ4d">
          <FontAwesomeIcon icon="fa-brands fa-instagram" />
        </a>
        <a href="https://rsudsamrat.site/epasien/">
          <FontAwesomeIcon icon="fa-solid fa-globe" />
        </a>
      </div>
      <div className="footer-text">
        © 2023 UPTI RSUD DR SAM RATULANGI TONDANO. Hak Cipta Dilindungi
      </div>
    </div>

  </div>
  <!-- <footer class="footer">
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
  </footer> -->
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>


<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 5px;
  text-align: center;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.2);
}

.footer-text-bold {
  font-weight: bold;
  font-size: 15px;
  color: #000000;
  /* margin-right: 200px; */
}

.footer-text-small {
  font-size: 10px;
  color: #000000;
  /* margin-right: 300px; */
}

.footer-social-icons a {
  color: #000;
  font-size: 20px;
  margin-right: 10px;
}

.footer-text {
  color: #000000;
  font-size: 10px;
}

.footer-buttons .btn {
  margin-right: 1px;
  font-size: smaller;
}
</style>