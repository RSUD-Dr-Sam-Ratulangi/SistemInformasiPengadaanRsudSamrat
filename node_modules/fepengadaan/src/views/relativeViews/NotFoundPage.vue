<template>
  <div class="grid justify-center items-center h-screen font-bold">
    <p class="text text-lg">
      PAGE NOT FOUND, MAKE SURE YOUR PAGE IS AVALAIBLE.
    </p>
    <button class="btn btn-info" @click="backHome">Back Home</button>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",

  methods: {
    backHome() {
      this.$router.push("/");
    },
  },
};
</script>
