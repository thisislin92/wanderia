<script>
import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import NavbarPartner from "../components/NavbarPartner.vue";
import { ALL_CATEGORIES } from "../stores/queries";

export default {
    name: "AddBusiness",
    data() {
      return {
        input: {
          name: "",
          CategoryId: 0,
          mapUrl: "",
          imageUrl: "",
          price: "",
          rating: "",
          address: "",
          access_token: localStorage.getItem("access_token"),
        },
      };
    },
    setup() {
        const { mutate: addNewPartnerBusiness } = useMutation(gql `
        mutation addNewPartnerBusiness($input: NewPartnerBusiness) {
          addNewPartnerBusiness(input: $input) {
            id
            name
            latitude
            longitude
            address
            CategoryId
            PartnerId
            status
            imageUrl
            rating
            price
          }
        }
      `);
        const { result, loading, error } = useQuery(ALL_CATEGORIES);
        return {
            addNewPartnerBusiness,
            result,
            loading,
            error,
        };
    },
    methods: {
        async handleAddBusiness() {
            try {
                let { data } = await this.addNewPartnerBusiness({
                    input: this.input,
                });
                this.$router.push("/dashboard");
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    components: { NavbarPartner }
};
</script>

<template>
  <NavbarPartner />
  <div class="d-flex align-self-center">
    <main class="form-register w-100 m-auto">
      <img
        src="../assets/logo-wanderia.png"
        class="mx-auto d-block pb-4"
        alt="Wanderia"
        width="100px"
      />
      <form @submit.prevent="handleAddBusiness">
        <h1 class="h3 mb-3 fw-normal">Add Business</h1>

        <div class="mb-3 row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.name"
              class="form-control"
              id="name"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="price" class="col-sm-2 col-form-label">Price</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.price"
              class="form-control"
              id="price"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="rating" class="col-sm-2 col-form-label">Rating</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.rating"
              class="form-control"
              id="rating"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="address" class="col-sm-2 col-form-label">Address</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.address"
              class="form-control"
              id="address"
            />
          </div>
        </div>
        <div class="mb-3 row" v-if="result">
          <label for="categoryId" class="col-sm-2 col-form-label"
            >Category ID</label
          >
          <div class="col-sm-10">
            <select
              v-model="input.CategoryId"
              class="form-select"
              aria-label="Default select example"
            >
              <option disabled value="0">Open this select menu</option>
              <option
                v-for="category in result.allPartnerCategories"
                :key="`${category.id}-1`"
                :value="+category.id"
              >
                {{ category.name }}
              </option>
              <!-- <option value="2">Two</option>
              <option value="3">Three</option> -->
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="mapUrl" class="col-sm-2 col-form-label">Map URL</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.mapUrl"
              class="form-control"
              id="mapUrl"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="imageUrl" class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.imageUrl"
              class="form-control"
              id="imageUrl"
            />
          </div>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
        <a href="/dashboard" class="w-100 btn btn-lg btn-danger mt-2">
          Cancel
        </a>
      </form>
    </main>
  </div>
</template>
