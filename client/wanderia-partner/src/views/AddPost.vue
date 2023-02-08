<script>
import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRoute } from "vue-router";
import { ALL_CATEGORIES } from "../stores/queries";

export default {
  name: "AddPost",
  data() {
    return {
      input: {
        name: "",
        photo: "",
        link: "",
        access_token: localStorage.getItem("access_token"),
      },
    };
  },
  setup() {
    const { mutate: UploadPhoto } = useMutation(
      gql`
        mutation UploadPhoto($input: NewPartnerPost) {
          uploadPhoto(input: $input) {
            BusinessId
            id
            imageUrl
            link
            name
          }
        }
      `
    );
    const { result, loading, error } = useQuery(ALL_CATEGORIES);
    return {
      UploadPhoto,
      result,
      loading,
      error,
    };
  },
  methods: {
    onFileChange(e) {
      console.log(e);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      console.log(file);
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.input.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async handleAddPost() {
      try {
        console.log("masuk");
        await this.UploadPhoto({
          input: {
            BusinessId: +this.$route.params.id,
            photo: this.input.photo,
            link: this.input.link,
            name: this.input.name,
            access_token: localStorage.access_token,
          },
        });
        this.$router.push(`/business/${this.$route.params.id}`);
      } catch (error) {
        console.log(error);
      }
    },
  },
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
      <form @submit.prevent="handleAddPost">
        <h1 class="h3 mb-3 fw-normal">Add Post</h1>

        <div class="mb-3 row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input
              v-model="input.name"
              type="text"
              class="form-control"
              id="name"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="imageUrl" class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input
              @change="onFileChange"
              type="file"
              class="form-control"
              id="imageUrl"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="imageUrl" class="col-sm-2 col-form-label"
            >Link Promosi</label
          >
          <div class="col-sm-10">
            <input
              v-model="input.link"
              type="text"
              class="form-control"
              id="name"
            />
          </div>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
        <a href="/dashboard" class="w-100 btn btn-lg btn-danger mt-2">
          Cancel
        </a>
      </form>
    </main>
  </div>
</template>
