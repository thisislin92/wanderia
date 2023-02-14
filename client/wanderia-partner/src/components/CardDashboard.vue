<script>
export default {
  name: "CardDashboard",
  props: ["business"],
};
</script>
<template>
  <div class="card" style="width: 10rem;">
  <img :src="business.imageUrl" :alt="business.name" class="card-img-top" style="width:200px; height: 200px;">
  <div class="card-body">
    <a href="#" class="card-link">{{ business.name }}</a>
  </div>
</div>
</template>
