<script>
import { useQuery } from "@vue/apollo-composable";
import { ONE_BUSINESS } from "../stores/queries";
import { useRoute } from "vue-router";
import PostCard from "../components/PostCard.vue";
export default {
  name: "BusinessPage",
  setup() {
    const route = useRoute();
    const { result, loading, error, refetch } = useQuery(ONE_BUSINESS, {
      onePartnerBusinessId: route.params.id,
    });
    return {
      result,
      loading,
      error,
      refetch,
    };
  },
  created() {
    this.refetch();
  },
  components: { PostCard },
};
</script>
<template>
  <main id="main" v-if="result">
    <!-- ======= Breadcrumbs Section ======= -->
    <section class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h1>{{ result.onePartnerBusiness.name }}</h1>
          <ol>
            <li>
              <button type="button" class="btn btn-warning">
                <RouterLink to="/dashboard">Dashboard</RouterLink>
              </button>
            </li>
          </ol>
        </div>
      </div>
    </section>
    <!-- Breadcrumbs Section -->

    <!-- ======= Portfolio Details Section ======= -->
    <section id="portfolio-details" class="portfolio-details">
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-8">
            <div class="portfolio-details-slider swiper">
              <div class="swiper-wrapper align-items-center">
                <div class="swiper-slide">
                  <img
                    style="height: 500px; width: 800px"
                    :src="result.onePartnerBusiness.imageUrl"
                    alt=""
                  />
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="portfolio-info">
              <h3>Informasi Bisnis</h3>
              <ul>
                <li>
                  <strong>Nama Business</strong>:
                  {{ result.onePartnerBusiness.name }}
                </li>
                <li>
                  <strong>Kategori</strong>:
                  {{ result.onePartnerBusiness.category.name }}
                </li>
                <li>
                  <strong>Owner</strong>:
                  {{ result.onePartnerBusiness.author.name }}
                </li>
                <li>
                  <strong>Tanggal Didirikan</strong>:
                  {{
                    new Date(
                      result.onePartnerBusiness.createdAt
                    ).toLocaleDateString("id", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                </li>
                <li>
                  <strong>Rating</strong>:
                  {{ result.onePartnerBusiness.rating }}
                </li>
                <li>
                  <button type="button" class="btn btn-warning">
                    <RouterLink :to="`/addpost/${result.onePartnerBusiness.id}`"
                      >Add Post</RouterLink
                    >
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container swiper-wrapper align-items-center">
        <div
          class="row row-cols-4 gap-5"
          v-if="result.onePartnerBusiness.posts.length > 0"
        >
          <PostCard
            v-for="post in result.onePartnerBusiness.posts"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>
    </section>
    <!-- End Portfolio Details Section -->
  </main>
  <!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong>Wanderia</strong>. Enjoy Dengan Bisnismu
      </div>
    </div>
  </footer>
  <!-- End Footer -->
</template>
