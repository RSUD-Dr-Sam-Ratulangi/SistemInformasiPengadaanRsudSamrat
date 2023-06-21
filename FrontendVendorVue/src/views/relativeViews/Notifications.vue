<template>
  <p>Page For notifications</p>
  <div>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>date</th>
          <th>Message</th>
          <th>Sender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notifikasi in notif" :key="notifikasi.id">
          <td>{{ notifikasi.id }}</td>
          <td>{{ notifikasi.createdAt }}</td>
          <td>{{ notifikasi.message }}</td>
          <td>{{ notifikasi.sender }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      notif: [],
    };
  },
  computed: {
    ...mapGetters(["vendoruuid", "vendorid"]),
  },
  created() {
    axios
      .get(
        `http://rsudsamrat.site:8990/api/v1/notifikasi/receiver/${this.vendorid}`
      )
      .then((res) => {
        console.log(res.data);
        this.notif = res.data;
      });
  },
};
</script>
