<template>
  <div>
    <h1>WELCOME {{ username }}</h1>
    {{ message }}
    {{ vendoruuid }}
    <p>test</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Homepages",
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters(["message", "username", "vendoruuid"]),
  },

  methods: {

  },
};
</script>
