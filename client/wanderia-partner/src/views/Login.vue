<script>
import { mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useCounterStore, ["login"]),
    loginPost() {
      let user = {
        email: this.email,
        password: this.password,
      };
      this.login(user);
    },
  },
};
</script>

<template>
  <div class="d-flex align-self-center">
    <main class="form-signin w-100 m-auto">
      <img
        src="../assets/logo-wanderia.png"
        class="mx-auto d-block pb-4"
        alt="Wanderia"
        width="100px"
      />
      <form @submit.prevent="loginPost">
        <h1 class="h3 mb-3 fw-normal">Sign in</h1>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  </div>
</template>
