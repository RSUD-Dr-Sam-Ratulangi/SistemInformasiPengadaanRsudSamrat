<template>
  <div class="sidenav" :class="{ open: isOpen }">
    <div>
      <RouterLink to="/">
        <div class="nav-item">
          <FontAwesomeIcon icon="fas fa-home" class="nav-icon" />
          <p v-if="!isOpen">Home</p>
        </div>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/product">
        <div class="nav-item">
          <FontAwesomeIcon icon="fas fa-plus" class="nav-icon" />
          <p v-if="!isOpen">Add Product</p>
        </div>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/productView">
        <div class="nav-item">
          <FontAwesomeIcon icon="fa-solid fa-list" class="nav-icon" />
          <p v-if="!isOpen">See Product</p>
        </div>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/orderDetails">
        <div class="nav-item">
          <FontAwesomeIcon icon="fas fa-solid fa-o"  class="nav-icon" />
          <p v-if="!isOpen">Orders</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: "SideNavigationBar",
  
  data() {
    return {
      isOpen: true,
    };
  },
  components: { FontAwesomeIcon },
};
</script>

<style scoped>
.sidenav {
  height: 100%;
  width: 60px;
  /* Ubah lebar menjadi 70px */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 50px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: translateX(-100%);
  margin-top: 15px;
  border-right: 2px solid rgb(206, 206, 206);

}

.sidenav.open {
  transform: translateX(0);
}

.sidenav div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  /* Sesuaikan tinggi dengan lebar */
}

.sidenav a {
  text-decoration: none;
  font-size: 16px;
  color: #333333;
  transition: background-color 0.3s ease;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:row;
}


.nav-icon {
  font-size: 20px;
  /* Sesuaikan ukuran ikon */
}

@media screen and (min-width: 768px) {
  .sidenav {
    top: 50px
  }
}</style>
