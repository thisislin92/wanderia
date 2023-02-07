import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import AddBusiness from "../views/AddBusiness.vue";
import AddPost from "../views/AddPost.vue";
import BusinessPage from "../views/BusinessPage.vue";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage,
    },
    {
      path: "/dashboard",
      name: "home",
      component: Home,
    },
    {
      path: "/business/:id",
      name: "business",
      component: BusinessPage,
    },
    {
      path: "/addbusiness",
      name: "addbusiness",
      component: AddBusiness,
    },
    {
      path: "/addpost",
      name: "addpost",
      component: AddPost,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem("access_token");

  if (to.name === "home") {
    if (access_token) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }

  if (
    to.name === "LandingPage" &&
    to.name === "login" &&
    to.name === "register"
  ) {
    if (!access_token) {
      next();
    } else {
      next({ name: "home" });
    }
  }
});

export default router;
