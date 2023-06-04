<template>
  <img :src="image" alt="Login logo" />
</template>

<script>
import images from "../img/user-interface.png";

export default {
  name: "Userauth",

  data() {
    return {
      image: images,
    };
  },
};
</script>
