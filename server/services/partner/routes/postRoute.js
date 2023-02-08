const express = require("express");
const PostControler = require("../controllers/postConstroller");
const routerPost = express.Router();

const {
    authorization,
    postAuthorization,
    authentication,
} = require("../middleware/auth");

routerPost.get("/", PostControler.getAllPost);
routerPost.use(authentication);
routerPost.get("/:BusinessId", PostControler.getPostBusiness);
routerPost.post("/add/:id", authorization, PostControler.createPost);
routerPost.delete("/:id", postAuthorization, PostControler.deletePost);

module.exports = routerPost;
