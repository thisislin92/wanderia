<script>
import About from "../components/About.vue";
export default {
  name: "Hero",
  components: { About },
};
</script>

<template>
  <section id="hero">
    <div class="hero-content" data-aos="fade-up">
      <About />
      <!-- <h2>Mari <span>daftarkan bisnis anda</span><br />segera!</h2>
      <div>
        <a href="/register" class="btn-get-started scrollto">Daftar</a>
      </div> -->
    </div>

    <div class="hero-slider swiper">
    </div>
  </section>
</template>
