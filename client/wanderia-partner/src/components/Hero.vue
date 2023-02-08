<script>
export default {
  name: "Hero",
};
</script>

<template>
  <section id="hero">
    <div class="hero-content" data-aos="fade-up">
      <h2>Mari <span>daftarkan bisnis anda</span><br />segera!</h2>
      <div>
        <a href="/register" class="btn-get-started scrollto">Daftar</a>
      </div>
    </div>

    <div class="hero-slider swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          style="
            background-image: url('https://akcdn.detik.net.id/visual/2022/12/29/galfot-atlet-terbaik-2022_169.jpeg?w=650');
          "
        ></div>
        <div
          class="swiper-slide"
          style="
            background-image: url('https://sm.imgix.net/22/44/lionel-messi.jpeg?w=640&h=480&auto=compress,format&fit=clip');
          "
        ></div>
        <!-- <div
          class="swiper-slide"
          style="background-image: url('../assets/img/hero-carousel/3.jpg')"
        ></div>
        <div
          class="swiper-slide"
          style="background-image: url('../assets/img/hero-carousel/4.jpg')"
        ></div>
        <div
          class="swiper-slide"
          style="background-image: url('../assets/img/hero-carousel/5.jpg')"
        ></div> -->
      </div>
    </div>
  </section>
</template>
