const express = require("express");
const BusinessController = require("../controllers/businesController");
const CategoryController = require("../controllers/categoryController");
const UserController = require("../controllers/userController");
const { authentication, authorization } = require("../middleware/auth");
const router = express.Router();

router.post("/partner/register", UserController.register);
router.post("/partner/login", UserController.login);
router.use(authentication);
router.get("/business", BusinessController.getAllBusinesses);
router.post("/business", BusinessController.createBusiness);
router.patch("/business/:id", authorization, BusinessController.editBusiness);
router.get("/categories", CategoryController.readCategory);

module.exports = router;
