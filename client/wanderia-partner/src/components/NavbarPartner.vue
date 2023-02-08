<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "NavbarPartner",
  computed: { ...mapState(useCounterStore, ["isLogin", "name"]) },
  methods: {
    ...mapActions(useCounterStore, ["logout"]),
  },
};
</script>

<template>
    <!-- <nav class="navbar navbar-expand-lg bg-secondary bg-opacity-50">
      <div class="container-fluid gap-4">
        <RouterLink to="/dashboard">
          <img
            src="../assets/wanderia.png"
            class="mx-auto d-block pb-4"
            alt="Wanderia"
            width="100"
          />
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            <li class="nav-item">
              <RouterLink
                class="nav-link active"
                aria-current="page"
                to="/dashboard"
                >Home</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/addbusiness"
                >Add Business</RouterLink
              >
            </li>
          </ul>
          <span class="navbar-text">
            <a
              ><button
                type="button"
                class="btn btn-secondary"
                @click.prevent="logout"
              >
                Log Out
              </button></a
            >
          </span>
        </div>
      </div>
    </nav> -->
    <header id="header" class="d-flex align-items-center bg-[#000] align-items-center">
      <div class="container d-flex justify-content-between">
        <div id="logo">
          <a href="/">
            <img src="../assets/wanderia.png" class="mx-auto d-block " alt="Wanderia" width="100"/>
          </a>
        </div>

        <nav id="navbar" class="navbar container">
          <ul>
            <li><RouterLink class="nav-link active" aria-current="page" to="/dashboard">Home</RouterLink></li>
            <li><RouterLink class="nav-link" to="/addbusiness">Add Business</RouterLink></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
          <button type="button" class="btn btn-secondary" @click.prevent="logout">
            Log Out
          </button>
        </nav>
      </div>
    </header>
</template>
