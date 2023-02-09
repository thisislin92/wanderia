<script>
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  name: "Register",
  data() {
    return {
      input: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  setup() {
    const { mutate: addNewUser } = useMutation(
      gql`
        mutation addNewUser($input: NewPartnerUser) {
          addNewUser(input: $input) {
            id
            name
            email
          }
        }
      `
    );
    return {
      addNewUser,
    };
  },
  methods: {
    async handleRegister() {
      try {
        console.log('masuk handle register')
        let { data } = await this.addNewUser({
          input: this.input,
        });
        console.log("success register");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="d-flex align-self-center vh-100">
    <main class="form-signin w-100 m-auto">
      <RouterLink to="/">
        <img
          src="../assets/logo-wanderia.png"
          class="mx-auto d-block pb-4"
          alt="Wanderia"
          width="200"
        />
      </RouterLink>
      <form @submit.prevent="handleRegister">
        <h1 class="h3 mb-3 fw-normal">Register</h1>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input
            v-model="input.name"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            v-model="input.email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            v-model="input.password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button class="w-100 btn btn-lg btn-primary mb-2" type="submit">
          Register
        </button>
        <center>
          <p>Punya akun? <a href="/login">Masuk</a></p>
        </center>
      </form>
    </main>
  </div>
</template>
