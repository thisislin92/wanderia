<script>
import NavbarPartner from "../components/NavbarPartner.vue";
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
import CardBusinesses from "../components/CardBusinesses.vue";
import { useQuery } from "@vue/apollo-composable";
import { PARTNERS_BUSINESS_QUERY } from "../stores/queries";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  setup() {
    // console.log(localStorage.getItem("access_token"));
    const { result, loading, error, refetch } = useQuery(
      PARTNERS_BUSINESS_QUERY,
      {
        access_token: localStorage.getItem("access_token"),
      }
    );
    // console.log(result.partnerBusiness);
    return {
      result,
      loading,
      error,
      refetch,
    };
  },
  created() {
    this.refetch();
  },
  components: { NavbarPartner, CardBusinesses, Footer },
};
</script>
<template style="height: 100vh">
  <div class="container-fluid d-flex flex-column vh-100">
    <NavbarPartner />
    <div class="col py-3 flex-grow-1">
      <div class="container">
        <div class="d-flex justify-content-center">
          <h1>Selamat Datang Fahmi</h1>
        </div>
      </div>
      <div class="container">
        <h3>Bisnis saya</h3>
        <div class="container swiper-wrapper align-items-center">
          <div
            class="row row-cols-4 gap-5"
            v-if="result.partnerBusiness.length > 0"
          >
            <CardBusinesses
              v-for="business in result.partnerBusiness"
              :key="business.id"
              :business="business"
            />
          </div>
          <div v-else>
            <center><h3>No businesses yet...</h3></center>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
