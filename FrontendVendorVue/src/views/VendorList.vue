<template>
  <div>
    <h1>List Vendor</h1>
    <table>
      <thead>
        <tr>
          <th>Vendor ID</th>
          <th>Vendor name</th>
          <th>Vendor address</th>
          <th>Vendor Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vendor in vendors" :key="vendor.id">
          <td @click="selectUser(vendor)">{{ vendor.id }}</td>
          <td @click="selectUser(vendor)">{{ vendor.name }}</td>
          <td>{{ vendor.address }}</td>
          <td>{{ vendor.phoneNumber }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="loadprevPage" :disabled="prevDisabled">Prev</button>
    <button @click="loadnextPage" :disabled="nextDisabled">Next</button>
    <div v-if="selectedUser">
      <p>{{ selectedUser.name }}</p>
      <button @click="editUser(selectedUser)">EDIT</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      vendors: [],
      page: 0,
      selectedUser: null,
    };
  },
  computed: {
    nextDisabled() {
      return this.vendors.length === 0;
    },
    prevDisabled() {
      return this.page === 0;
    },
  },

  created() {
    this.loadVendors();
  },

  methods: {
    loadVendors() {
      axios
        .get("http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors")
        .then((response) => {
          this.vendors = response.data;
          console.log(this.vendors);
        })
        .catch((err) => console.log(err));
    },
    selectUser(vendorsChoose) {
      this.selectedUser = vendorsChoose;
    },
    editUser(selectedUser) {
      this.$router.push({
        name: "VendorUpdate",
        params: { id: selectedUser.id, name: selectedUser.name },
      });
    },
    loadnextPage() {
      this.page += 1;
      this.loadVendors();
      console.log(`Anda berada di page ${this.page}`);
    },
    loadprevPage() {
      this.loadVendors();
      this.page -= 1;
      console.log(`Anda berada di page ${this.page}`);
    },
  },
};
</script>
