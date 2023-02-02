const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/partner/register", UserController.register);
router.post("/partner/login", UserController.login);
router.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = router;
