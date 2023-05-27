<template>
  <div class="sidenav" :class="{ open: isOpen }">
    <div>
      <router-link to="/" class="nav-link">Home</router-link>
    </div>
    <div>
      <router-link to="/product" class="nav-link">Add Product</router-link>
    </div>
    <div>
      <router-link to="/productview" class="nav-link"
        >See Your Product</router-link
      >
    </div>
    <div>
      <router-link to="/orderDetails" class="nav-link">See Orders</router-link>
    </div>
    <div>
      <router-link to="/vendorInput" class="nav-link">Vendor</router-link>
    </div>
    <div>
      <router-link to="/vendorList" class="nav-link">List Vendor</router-link>
    </div>
    <div>
      <router-link to="/productlist/:page" class="nav-link"
        >List Product</router-link
      >
    </div>
  </div>
  <div class="menu-icon" @click="toggleNav">
    <i class="fa fa-bars"></i>
  </div>
</template>

<script>
export default {
  name: "SideNavigationBar",
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    toggleNav() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .sidenav {
    height: 100%;
    width: 150px;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 50px; /* menempatkan sidenav 50px di bawah navigation bar */
    background-color: #bcbcbc;
    color: #1a5276;
    border-top: 20px solid #929292;
    border-right: 0.2px solid #bcbcbc;
    overflow-x: hidden;
    padding-top: 10px;
    transition: all 0.3s ease;
    transform: translateX(-100%);
  }

  .sidenav.open {
    transform: translateX(0);
  }

  .sidenav a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
  }

  .sidenav a:hover {
    color: #3f3f3f;
  }
}

@media screen and (max-width: 767px) {
  .sidenav {
    display: initial;
  }
}
</style>
