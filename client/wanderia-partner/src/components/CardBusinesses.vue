<script>
export default {
  name: "CardBusinesses",
  props: ["business"],
};
</script>
<template>
  <div class="card border border-dark border-2" style="width: 18rem">
    <img
      class="card-img-top mt-2"
      style="height: 200px"
      :src="business.imageUrl"
      alt="Card image cap"
    />
    <div class="card-body">
      <h4 class="card-title font-weight-bold">
        <b>{{ business.name }}</b>
      </h4>
      <p class="card-text">{{ business.address }}</p>
    </div>
    <div class="d-flex justify-content-around mb-4">
      <RouterLink :to="`/business/${business.id}`" class="btn btn-primary"
        >Detail</RouterLink
      >
      <RouterLink :to="`/editbusiness/${business.id}`">
        <a href="#" class="btn btn-warning">Edit</a>
      </RouterLink>
      <a href="#" class="btn btn-danger">Delete</a>
    </div>
  </div>
</template>
