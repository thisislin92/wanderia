const express = require("express");
const BusinessController = require("../controllers/businesController");
const UserController = require("../controllers/userController");
const router = express.Router();
const postRouter = require('./postRoute')



router.use('/post', postRouter)
router.post("/partner/register", UserController.register);
router.post("/partner/login", UserController.login);
router.post("/business", BusinessController.createBusiness);
router.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = router;
