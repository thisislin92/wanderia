<script>
export default {
  name: "Register",
};
</script>

<template>
  <div class="d-flex align-self-center">
    <main class="form-register w-100 m-auto">
      <img
        src="../assets/logo-wanderia.png"
        class="mx-auto d-block pb-4"
        alt="Wanderia"
        width="100px"
      />
      <form>
        <h1 class="h3 mb-3 fw-normal">Register</h1>

        <div class="mb-3 row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="name" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="email" class="col-sm-2 col-form-label"
            >Email address</label
          >
          <div class="col-sm-10">
            <input type="email" class="form-control" id="email" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="password" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="password" />
          </div>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
      </form>
    </main>
  </div>
</template>
