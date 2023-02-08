<script>
import About from "../components/About.vue";
import Footer from "../components/Footer.vue";
import Hero from "../components/Hero.vue";
import Navbar from "../components/Navbar.vue";
import Section from "../components/Section.vue";
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
import CardBusinesses from "../components/CardBusinesses.vue";
import CardDashboard from "../components/CardDashboard.vue";
import { useQuery } from "@vue/apollo-composable";
import { PARTNERS_QUERY } from "../stores/queries";

export default {
  name: "LandingPage",
  setup() {
    const { result, loading, error } = useQuery(PARTNERS_QUERY);
    return {
      result,
      loading,
      error,
    };
  },
  components: { Hero, About, Section, Footer, Navbar, CardDashboard },
  computed: {
    ...mapState(useCounterStore, ["businesses"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchBusinessesLanding"]),
  },
  created() {
    // this.fetchBusinessesLanding();
  },
};
</script>

<template>
  <div>
    <!-- {{ JSON.stringify(result) }} -->
    <Navbar />
    <Hero />

    <main id="main">
      <About />

      <!-- ======= Services Section ======= -->
      <Section
        id="services"
        title="Services"
        content="Berikut keuntungan yang akan anda dapatkan jika bisnis atau usaha anda bekerjasama dengan Wanderia"
      >
        <div class="row gy-4">
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div class="box">
              <div class="icon"><i class="bi bi-briefcase"></i></div>
              <h4 class="title"><a href="">Usaha Lebih Terkenal</a></h4>
              <p class="description">
                Traveller yang menggunakan aplikasi wanderia jika menggunakan
                rute yang melewati usaha anda maka aplikasi akan menampilkan
                usaha anda pada daftar object yang akan dilalui oleh pengguna
                aplikasi.
              </p>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div class="box">
              <div class="icon"><i class="bi bi-card-checklist"></i></div>
              <h4 class="title"><a href="">Promosi Usaha</a></h4>
              <p class="description">
                Anda dapat melakukan promosi usaha anda secara mandiri, yaitu
                dengan cara mengupload postingan promosi atau diskon yang dapat
                mengundang pengunjung ke usaha anda
              </p>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <div class="box">
              <div class="icon"><i class="bi bi-bar-chart"></i></div>
              <h4 class="title"><a href="">Popularitas</a></h4>
              <p class="description">
                Semakin banyak pengunjung yang melewati rute yang melewati atau
                dekat dengan usaha anda maka semakin sering usaha anda muncul
                pada aplikasi pengunjung.
              </p>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="400">
            <div class="box">
              <div class="icon"><i class="bi bi-binoculars"></i></div>
              <h4 class="title"><a href="">Banyak Bisnis</a></h4>
              <p class="description">
                Anda dapat mendaftarkan beberapa bisnis sekaligus, sehingga anda
                dapat mempromosikan berbagai bisnis yang anda geluti disini
                dalam satu akun saja.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <!-- ======= Clients Section ======= -->
      <Section
        id="clients"
        title="Clients"
        content="Berikut daftar partner bisnis yang telah bergabung bersama wanderia"
      >
        <div
          class="clients-slider swiper"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="container swiper-wrapper align-items-center">
            <div class="row row-cols-4" v-if="result">
              <!-- <div class="col swiper-slide">
                <img
                  src="../assets/img/clients/client-1.png"
                  class="img-fluid"
                  alt=""
                />
              </div> -->

              <CardDashboard
                v-for="business in result.allPartnerBusiness.slice(0, 12)"
                :key="business.id"
                :business="business"
              />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </Section>

      <!-- ======= Call To Action Section ======= -->
      <section id="call-to-action">
        <div class="container" data-aos="zoom-out">
          <div class="row">
            <div class="col-lg-9 text-center text-lg-start">
              <h3 class="cta-title">Gabung Bersama Kami</h3>
              <p class="cta-text">
                Daftarkan segera usaha anda bersama kami, sehingga traveller
                dapat dengan mudah menemukan lokasi usaha anda
              </p>
            </div>
            <div class="col-lg-3 cta-btn-container text-center">
              <a class="cta-btn align-middle" href="#">Gabung Bersama Kami</a>
            </div>
          </div>
        </div>
      </section>
      <!-- End Call To Action Section -->

      <!-- ======= Team Section ======= -->
      <Section id="team" title="Our Team">
        <div class="row row-cols-6">
          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-1.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Argi Bramantya</h4>
                <span>Chief Executive Officer</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-2.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Herlina Lim</h4>
                <span>Product Manager</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-3.jpg" alt="" />
              </div>
              <div class="details">
                <h4>M. Akbar Ridho Rizqullah</h4>
                <span>CTO</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-4.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Mukhammad Fahmi Fachrizal</h4>
                <span>Accountant</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-4.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Raihan Qowi Liansu</h4>
                <span>Accountant</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-4.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Reza Dhia Ulhaq</h4>
                <span>Accountant</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <!-- ======= Contact Section ======= -->
      <Section
        id="contact"
        title="Contact Us"
        content="Jika ingin bertanya lebih lanjut mengenai wanderia partnership anda dapat menemukan lokasi kami, atau anda juga dapat menghubungi kami dengan telepon sebagai berikut."
      >
        <div class="row contact-info">
          <div class="col-md-4">
            <div class="contact-address">
              <i class="bi bi-geo-alt"></i>
              <h3>Address</h3>
              <address>
                Jl. Arteri Pd. Indah No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby.
                Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240
              </address>
            </div>
          </div>

          <div class="col-md-4">
            <div class="contact-phone">
              <i class="bi bi-phone"></i>
              <h3>Phone Number</h3>
              <p><a href="tel:+155895548855">+62 5589 55488 55</a></p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="contact-email">
              <i class="bi bi-envelope"></i>
              <h3>Email</h3>
              <p><a href="mailto:info@example.com">wanderia@gmail.com</a></p>
            </div>
          </div>
        </div>

        <template #container>
          <div class="container mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15864.088188144957!2d106.7815368!3d-6.260826!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c3ea1f4a28bfac5!2sHacktiv8!5e0!3m2!1sid!2sid!4v1675597810745!5m2!1sid!2sid"
              width="100%"
              height="380"
              frameborder="0"
              style="border: 0"
              allowfullscreen
            ></iframe>
          </div>
        </template>
      </Section>
    </main>
    <!-- End #main -->

    <!-- ======= Footer ======= -->
    <Footer />

    <a
      href="#"
      class="back-to-top d-flex align-items-center justify-content-center"
      ><i class="bi bi-arrow-up-short"></i
    ></a>
  </div>
</template>
