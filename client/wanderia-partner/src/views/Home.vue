<script>
import NavbarPartner from "../components/NavbarPartner.vue";
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
import CardBusinesses from "../components/CardBusinesses.vue";

export default {
  name: "Home",
  components: { NavbarPartner, CardBusinesses },
  computed: {
    ...mapState(useCounterStore, ["businesses"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchBusinessesPartner"]),
  },
  created() {
    this.fetchBusinessesPartner();
  },
};
</script>
<template>
  <div class="container-fluid">
    <NavbarPartner />
    <div class="col py-3">
      <div class="container">
        <div class="d-flex justify-content-center">
          <h1>Warung Makan Enak</h1>
        </div>
      </div>
      <div class="container">
        <h3>My Business</h3>
        <div class="d-grid gap-3">
          <CardBusinesses
            v-for="business in businesses"
            :key="business.id"
            :business="business"
          />
        </div>
      </div>
    </div>
  </div>
</template>
